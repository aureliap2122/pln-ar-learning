import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, User, Lock, ArrowRight } from 'lucide-react';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    <div className="login-container">
      <div className="login-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="login-card glass animate-fade-in">
        <div className="login-header">
          <div className="logo">
            <Zap size={48} className="logo-icon" />
          </div>
          <h1>PLN AR Learning</h1>
          <p>Masuk ke portal pembelajaran interaktif teknisi</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input type="text" placeholder="ID Pegawai / Username" required />
          </div>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input type="password" placeholder="Password" required />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Ingat Saya</span>
            </label>
            <a href="#" className="forgot-password">Lupa Password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Memproses...' : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
