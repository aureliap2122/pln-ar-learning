import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Boxes, Users, Award, ArrowRight, Zap, UploadCloud, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './Dashboard.css';
import './AdminDashboard.css';

const recentActivity = [
  { id: 1, text: 'Teknisi Budi S. menyelesaikan modul "K3 Kelistrikan"', time: '12 menit lalu', icon: CheckCircle2, tone: 'green' },
  { id: 2, text: 'Model 3D "Gearbox Assembly" diunggah ke sistem', time: '1 jam lalu', icon: UploadCloud, tone: 'blue' },
  { id: 3, text: '8 teknisi baru mendaftar minggu ini', time: '3 jam lalu', icon: Users, tone: 'yellow' },
  { id: 4, text: 'Modul "Pengenalan Trafo Distribusi" diperbarui', time: 'Kemarin', icon: BookOpen, tone: 'blue' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { modules, models3d } = useAdminData();

  return (
    <div className="dashboard admin-dashboard animate-fade-in">
      {/* Hero Banner */}
      <section className="hero-banner delay-100 animate-fade-in-up">
        <div className="hero-content">
          <h1>Kelola Platform Pembelajaran AR</h1>
          <p>Pantau modul, model 3D, dan progres teknisi dari satu tempat.</p>
          <button className="btn btn-yellow hero-btn" onClick={() => navigate('/admin/modules')}>
            Tambah Modul Baru <ArrowRight size={18} />
          </button>
        </div>
        <div className="hero-illustration">
          <Zap className="hero-icon" size={120} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section delay-200 animate-fade-in-up">
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper blue">
            <BookOpen size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>{modules.length}</h3>
            <p>Total Modul</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper purple">
            <Boxes size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>{models3d.length}</h3>
            <p>Total Model 3D</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper yellow">
            <Users size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>128</h3>
            <p>Teknisi Terdaftar</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper green">
            <Award size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>42</h3>
            <p>Sertifikat Diterbitkan</p>
          </div>
        </div>
      </section>

      <div className="admin-dashboard-grid delay-300 animate-fade-in-up">
        {/* Recent modules table */}
        <section className="admin-dashboard-panel glass-card">
          <div className="section-header">
            <h2 className="section-title">Modul Terbaru</h2>
            <a href="#" className="view-all" onClick={(e) => { e.preventDefault(); navigate('/admin/modules'); }}>Kelola Semua</a>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Kategori</th>
                  <th>Durasi</th>
                  <th>Model 3D</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((mod) => {
                  const hasModel = models3d.some((m) => m.moduleId === mod.id);
                  return (
                    <tr key={mod.id}>
                      <td className="cell-title">{mod.title}</td>
                      <td>{mod.category}</td>
                      <td>{mod.duration}</td>
                      <td>
                        <span className={`admin-tag ${hasModel ? '' : 'muted'}`}>
                          {hasModel ? 'Tersedia' : 'Belum Ada'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recent activity feed */}
        <section className="admin-dashboard-panel glass-card">
          <div className="section-header">
            <h2 className="section-title">Aktivitas Terbaru</h2>
          </div>
          <ul className="admin-activity-feed">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <div className={`admin-activity-icon ${item.tone}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p>{item.text}</p>
                    <span>{item.time}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
