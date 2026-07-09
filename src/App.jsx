import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ModuleDetail from './pages/ModuleDetail';
import ARViewer from './pages/ARViewer';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (using Layout) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="module/:id" element={<ModuleDetail />} />
        </Route>
        
        {/* AR Viewer without Sidebar Layout for full screen experience */}
        <Route path="/ar/:id" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
