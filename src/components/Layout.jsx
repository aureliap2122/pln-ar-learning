import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, BookOpen, User, LogOut, Zap, Bell, Search } from 'lucide-react';
import './Layout.css';

const Sidebar = () => {
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
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <Home size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/module/1" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <BookOpen size={20} />
              <span>Modul Pembelajaran</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <User size={20} />
              <span>Profil Teknisi</span>
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

const TopBar = () => {
  return (
    <header className="topbar glass-panel">
      <div className="topbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Cari modul atau materi..." className="search-input" />
      </div>
      <div className="topbar-actions">
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge-dot"></span>
        </button>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Teknisi+PLN&background=0088CC&color=fff&bold=true" alt="Profile" className="avatar" />
          <div className="user-info">
            <span className="user-name">Teknisi PLN</span>
            <span className="user-role">Level 3</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div className="app-container">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="main-wrapper">
        <TopBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
