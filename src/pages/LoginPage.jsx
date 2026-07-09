import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CreditCard,
  HelpCircle,
  Award,
} from 'lucide-react';
import heroImg from '../assets/hero.png';
import './LoginPage.css';

const ROLES = {
  karyawan: {
    label: 'Karyawan',
    icon: User,
    idLabel: 'ID PEGAWAI',
    idPlaceholder: 'PLN-2026-XXXXX',
    heading: 'Portal Akses Teknisi',
    subtitle: 'Masuk dengan kredensial pegawai untuk melanjutkan modul pelatihan AR Anda.',
  },
  admin: {
    label: 'Admin',
    icon: ShieldCheck,
    idLabel: 'ID ADMIN',
    idPlaceholder: 'ADM-XXXXX',
    heading: 'Portal Administrator',
    subtitle: 'Masuk dengan kredensial admin untuk mengelola modul dan data teknisi.',
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('karyawan');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const activeRole = ROLES[role];
  const RoleIcon = activeRole.icon;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <div className="login-topbar-logo">
          <div className="login-topbar-logo-icon">
            <Zap size={18} />
          </div>
          <span>PLN AR Learning</span>
        </div>
        <a href="#" className="login-topbar-help">
          <HelpCircle size={18} />
          <span>Pusat Bantuan</span>
        </a>
      </header>

      <main className="login-main">
        <div className="login-card animate-fade-in">
          {/* Left brand panel */}
          <div className="login-brand-panel">
            <div className="brand-glow brand-glow-1"></div>
            <div className="brand-glow brand-glow-2"></div>

            <div className="brand-panel-content">
              <h1 className="brand-title">
                PLN AR
                <br />
                LEARNING
              </h1>

              <span className="brand-badge">OTENTIKASI SISTEM</span>

              <p className="brand-desc">
                Masukkan kredensial teknisi Anda untuk mengakses modul pelatihan
                Augmented Reality pemeliharaan jaringan PLN.
              </p>

              <div className="brand-device">
                <div className="brand-device-bar">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <img src={heroImg} alt="Pratinjau modul AR PLN" />
              </div>
            </div>

            <div className="brand-stat-card">
              <div className="brand-stat-icon">
                <Award size={18} />
              </div>
              <div>
                <strong>1.240+</strong>
                <span>Teknisi Tersertifikasi</span>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="login-form-panel">
            <h2>{activeRole.heading}</h2>
            <p className="login-form-subtitle">{activeRole.subtitle}</p>

            <div className="role-switch" role="tablist" aria-label="Pilih peran">
              {Object.entries(ROLES).map(([key, r]) => {
                const Icon = r.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={role === key}
                    className={`role-tab ${role === key ? 'active' : ''}`}
                    onClick={() => setRole(key)}
                  >
                    <Icon size={16} />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-field">
                <label htmlFor="employee-id">{activeRole.idLabel}</label>
                <div className="input-group">
                  <RoleIcon className="input-icon" size={18} />
                  <input id="employee-id" type="text" placeholder={activeRole.idPlaceholder} required />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="password">KATA SANDI</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="input-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Ingat perangkat ini</span>
                </label>
                <a href="#" className="forgot-password">Lupa kata sandi?</a>
              </div>

              <button type="submit" className="btn btn-yellow login-btn" disabled={loading}>
                {loading ? (
                  <span>Memverifikasi...</span>
                ) : (
                  <>
                    <span>Masuk Sekarang</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="login-divider">
                <span>ATAU MASUK DENGAN</span>
              </div>

              <button type="button" className="btn btn-outline login-alt-btn">
                <CreditCard size={18} />
                <span>Kartu Pegawai (NFC)</span>
              </button>
            </form>

            <p className="login-terms">
              Dengan masuk, Anda menyetujui Ketentuan Penggunaan dan Kebijakan
              Privasi PLN.
            </p>
          </div>
        </div>
      </main>

      <footer className="login-footer">
        <span>AR PLN &copy; 2026. Dibangun untuk keandalan jaringan.</span>
        <nav className="login-footer-links">
          <a href="#">Manual K3</a>
          <a href="#">Bantuan</a>
          <a href="#">Privasi</a>
          <a href="#">Ketentuan</a>
        </nav>
      </footer>
    </div>
  );
};

export default LoginPage;