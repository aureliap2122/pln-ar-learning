import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import ARViewer from './pages/ARViewer';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminModules from './pages/AdminModules';
import AdminModels from './pages/AdminModels';
import AdminPreview3D from './pages/AdminPreview3D';
import AdminUploadGLB from './pages/AdminUploadGLB';
import { AdminDataProvider } from './context/AdminDataContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (using Layout) - Karyawan */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="module/:id" element={<ModuleDetail />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminDataProvider>
              <AdminLayout />
            </AdminDataProvider>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="modules" element={<AdminModules />} />
          <Route path="models" element={<AdminModels />} />
          <Route path="preview" element={<AdminPreview3D />} />
          <Route path="upload" element={<AdminUploadGLB />} />
        </Route>
        
        {/* AR Viewer without Sidebar Layout for full screen experience */}
        <Route path="/ar/:id" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
