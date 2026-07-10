import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Boxes, Eye, UploadCloud, LogOut, Zap, Bell, Search } from 'lucide-react';
import '../components/Layout.css';
import './AdminLayout.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <Zap size={24} className="logo-icon" />
          </div>
          <h2 className="logo-text">PLN<span>Learn</span></h2>
        </div>
        <span className="admin-badge">PANEL ADMIN</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/modules" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <BookOpen size={20} />
              <span>Kelola Modul</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/models" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Boxes size={20} />
              <span>Kelola 3D Model</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/preview" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <Eye size={20} />
              <span>Preview 3D</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/upload" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <UploadCloud size={20} />
              <span>Upload GLB</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
};

const AdminTopBar = () => {
  return (
    <header className="topbar glass-panel">
      <div className="topbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Cari modul, model, atau pengguna..." className="search-input" />
      </div>
      <div className="topbar-actions">
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin+PLN&background=001F33&color=FFD100&bold=true" alt="Profile" className="avatar" />
          <div className="user-info">
            <span className="user-name">Admin PLN</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const AdminLayout = () => {
  return (
    <div className="app-container">
      <div className="sidebar-wrapper">
        <AdminSidebar />
      </div>
      <div className="main-wrapper">
        <AdminTopBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
