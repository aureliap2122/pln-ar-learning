import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, PlayCircle, Zap, Activity, ArrowRight, Award } from 'lucide-react';
import './Dashboard.css';

const modules = [
  {
    id: 1,
    title: 'Instalasi Tiang Listrik TM',
    description: 'Pelajari komponen dan langkah-langkah instalasi tiang listrik Tegangan Menengah (TM).',
    progress: 0,
    status: 'Belum Dimulai',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    tags: ['Distribusi', 'AR Ready']
  },
  {
    id: 2,
    title: 'Pengenalan Trafo Distribusi',
    description: 'Memahami fungsi, bagian-bagian, dan cara kerja transformator distribusi dengan detail.',
    progress: 45,
    status: 'Sedang Berjalan',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    tags: ['Tegangan Menengah', 'Komponen']
  },
  {
    id: 3,
    title: 'K3 Kelistrikan',
    description: 'Prosedur Keselamatan dan Kesehatan Kerja dalam instalasi kelistrikan PLN.',
    progress: 100,
    status: 'Selesai',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    tags: ['Keselamatan', 'Sertifikasi']
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard animate-fade-in">
      {/* Hero Banner Section */}
      <section className="hero-banner delay-100 animate-fade-in-up">
        <div className="hero-content">
          <h1>Tingkatkan Keahlian Anda!</h1>
          <p>Lanjutkan pembelajaran interaktif dengan modul Augmented Reality terbaru.</p>
          <button className="btn btn-yellow hero-btn">
            Lanjutkan Belajar <ArrowRight size={18} />
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
            <h3>3</h3>
            <p>Total Modul</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper yellow">
            <Activity size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Sedang Dipelajari</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon-wrapper green">
            <Award size={24} className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>1</h3>
            <p>Modul Selesai</p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section delay-300 animate-fade-in-up">
        <div className="section-header">
          <h2 className="section-title">Modul Pembelajaran</h2>
          <a href="#" className="view-all">Lihat Semua</a>
        </div>
        
        <div className="modules-grid">
          {modules.map((mod) => (
            <div key={mod.id} className="module-card glass-card">
              <div className="module-image-container">
                <div className="module-image" style={{ backgroundImage: `url(${mod.image})` }}></div>
                <div className="module-overlay"></div>
                <div className="module-status badge">
                  {mod.progress === 100 ? (
                    <><CheckCircle size={14} /> Selesai</>
                  ) : mod.progress > 0 ? (
                    <><Clock size={14} /> Sedang Berjalan</>
                  ) : (
                    <><PlayCircle size={14} /> Belum Dimulai</>
                  )}
                </div>
              </div>
              
              <div className="module-content">
                <div className="module-tags">
                  {mod.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <h3>{mod.title}</h3>
                <p>{mod.description}</p>
                
                <div className="progress-container">
                  <div className="progress-info">
                    <span>Progress Belajar</span>
                    <span className="progress-percentage">{mod.progress}%</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${mod.progress}%`, 
                        background: mod.progress === 100 
                          ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' 
                          : 'linear-gradient(90deg, var(--pln-blue) 0%, var(--pln-teal) 100%)' 
                      }}
                    ></div>
                  </div>
                </div>
                
                <button 
                  className={`btn ${mod.progress > 0 ? 'btn-primary' : 'btn-outline'} module-btn`}
                  onClick={() => navigate(`/module/${mod.id}`)}
                >
                  {mod.progress > 0 ? 'Lanjutkan Modul' : 'Mulai Belajar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
