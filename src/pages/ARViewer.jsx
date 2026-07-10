import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './ARViewer.css';

// Catatan: pengalaman AR (marker tracking, model 3D, kontrol gesture, panel
// info komponen) sepenuhnya ditangani oleh aplikasi statis di /ar.html
// (dibangun terpisah oleh tim AR memakai MindAR + A-Frame). Halaman React
// ini hanya membungkusnya di dalam LMS dan menyediakan jalan kembali ke
// dashboard, supaya kedua project tetap bisa dikembangkan terpisah.
const ARViewer = () => {
  const navigate = useNavigate();

  return (
    <div className="ar-viewer-container">
      <iframe
        src="/ar.html"
        className="ar-iframe"
        allow="camera"
        title="AR View"
      ></iframe>

      <button className="ar-back-btn glass" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        <span>Kembali ke Modul</span>
      </button>
    </div>
  );
};

export default ARViewer;
