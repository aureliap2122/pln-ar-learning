import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, AlertCircle, Maximize, FileText, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import './ModuleDetail.css';

// Mock data updated with step-by-step structure
const moduleData = {
  id: 1,
  title: 'Instalasi Tiang Listrik TM',
  category: 'Distribusi',
  description: 'Pelajari komponen dan langkah-langkah instalasi tiang listrik Tegangan Menengah (TM).',
  duration: '45 Menit',
  image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
  steps: [
    {
      title: 'Pendahuluan',
      content: `
        <p>Instalasi tiang listrik Tegangan Menengah (TM) adalah salah satu bagian paling kritis dalam sistem distribusi kelistrikan PLN. Tiang ini bertugas menyangga penghantar udara, isolator, dan perlengkapan lainnya agar tetap berada pada jarak aman dari permukaan tanah dan rintangan lainnya.</p>
        <p>Tujuan utama dari instalasi yang benar adalah memastikan keandalan penyaluran energi listrik dan menjaga keselamatan masyarakat sekitar serta teknisi pemeliharaan.</p>
      `
    },
    {
      title: 'Komponen Utama',
      content: `
        <p>Sebelum melakukan instalasi, seorang teknisi harus memahami komponen-komponen berikut:</p>
        <ul>
          <li><strong>Tiang Beton/Besi:</strong> Standar tinggi biasanya 11, 12, atau 13 meter.</li>
          <li><strong>Cross Arm (Travers):</strong> Lengan silang tempat memasang isolator.</li>
          <li><strong>Isolator Tumpu (Pin Insulator):</strong> Menyangga kabel tegangan menengah.</li>
          <li><strong>Isolator Tarik (Suspension Insulator):</strong> Digunakan pada tiang sudut atau tiang ujung.</li>
          <li><strong>Guy Wire (Trekschoor):</strong> Kawat penopang untuk menyeimbangkan tarikan kabel.</li>
        </ul>
      `
    },
    {
      title: 'Prosedur Keselamatan Kerja (K3)',
      content: `
        <p>Keselamatan adalah prioritas utama (Safety First). Sebelum terjun ke lapangan, pastikan Anda mematuhi poin-poin berikut:</p>
        <ul>
          <li>Gunakan <strong>Alat Pelindung Diri (APD)</strong> lengkap: Helm Safety, Sarung Tangan Dielektrik, Sabuk Pengaman (Safety Belt/Full Body Harness), dan Sepatu Safety.</li>
          <li>Lakukan <strong>Briefing K3</strong> (Toolbox Meeting) sebelum memulai pekerjaan.</li>
          <li>Pastikan area kerja aman dari lalu lalang warga dan dipasang *safety cone* atau *barricade line*.</li>
          <li>Lakukan pengujian tegangan menggunakan <em>Voltage Detector</em> sebelum menyentuh jaringan.</li>
        </ul>
      `
    },
    {
      title: 'Langkah-langkah Instalasi',
      content: `
        <p>Berikut adalah garis besar prosedur instalasi tiang TM di lapangan:</p>
        <ol>
          <li>Penentuan lokasi titik pancang sesuai gambar kerja (survey).</li>
          <li>Penggalian lubang pondasi (kedalaman minimal 1/6 dari tinggi tiang).</li>
          <li>Mendirikan tiang menggunakan crane atau metode manual dengan alat bantu (takel/gin pole).</li>
          <li>Pemasangan material atas tiang (cross arm, isolator) menggunakan tangga atau mobil skylift.</li>
          <li>Penarikan kawat penghantar dan pengikatan (stringing & sagging).</li>
        </ol>
      `
    },
    {
      title: 'Simulasi Augmented Reality',
      content: `
        <p>Kini Anda telah memahami teori dan prosedur dasar. Untuk memvisualisasikan bagaimana komponen-komponen tersebut terpasang pada tiang sesungguhnya, mari kita gunakan teknologi <strong>Augmented Reality (AR)</strong>.</p>
        <p>Silakan pindai kode QR yang berada di layar (atau klik tautan yang tersedia) untuk memunculkan model 3D tiang listrik di ruangan Anda!</p>
      `
    }
  ]
};

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const data = moduleData;
  // Mengarah ke aplikasi AR gabungan di /ar.html, dihitung dari domain
  // tempat aplikasi ini di-deploy (bukan lagi link placeholder).
  const arUrl = `${window.location.origin}/ar.html`;
  const totalSteps = data.steps.length;
  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll ke area konten
    } else {
      // Logika ketika modul selesai
      alert('Selamat! Anda telah menyelesaikan modul ini.');
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="module-detail animate-fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>Kembali ke Dashboard</span>
      </button>

      <div className="module-header glass-card">
        <div className="module-header-image" style={{ backgroundImage: `url(${data.image})` }}>
          <div className="header-overlay"></div>
        </div>
        <div className="module-header-content">
          <span className="category-badge">{data.category}</span>
          <h1 className="module-title">{data.title}</h1>
          <p className="module-desc">{data.description}</p>

          <div className="module-meta">
            <div className="meta-item">
              <Clock size={18} />
              <span>Estimasi: {data.duration}</span>
            </div>
            <div className="meta-item">
              <BookOpen size={18} />
              <span>{totalSteps} Langkah Pembelajaran</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper UI */}
      <div className="stepper-container glass-panel">
        <div className="stepper-info">
          <span>Progres Belajar</span>
          <span className="stepper-percentage">{progressPercentage}%</span>
        </div>
        <div className="stepper-bar-bg">
          <div
            className="stepper-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="stepper-dots">
          {data.steps.map((_, index) => (
            <div
              key={index}
              className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              onClick={() => index < currentStep && setCurrentStep(index)}
              title={data.steps[index].title}
            ></div>
          ))}
        </div>
      </div >

      <div className="module-body">
        <div className="content-section glass-panel">
          <div className="section-title-wrapper">
            <div className="step-indicator">
              Langkah {currentStep + 1}
            </div>
            <h2>{data.steps[currentStep].title}</h2>
          </div>

          <div
            className="html-content step-content animate-fade-in"
            key={currentStep} // Memaksa re-render animasi saat step berubah
            dangerouslySetInnerHTML={{ __html: data.steps[currentStep].content }}
          />

          {/* Navigasi Langkah */}
          <div className="step-navigation">
            <button
              className="btn btn-outline nav-btn"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={20} /> Sebelumnya
            </button>
            <button
              className={`btn ${isLastStep ? 'btn-yellow' : 'btn-primary'} nav-btn`}
              onClick={handleNext}
            >
              {isLastStep ? (
                <><CheckCircle2 size={20} /> Selesaikan Modul</>
              ) : (
                <>Selanjutnya <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </div>

        <aside className="sidebar-section">
          {/* Tampilkan QR Code AR hanya di langkah terakhir, atau biarkan statis? 
              Lebih baik statis di samping agar teknisi tahu bahwa modul ini punya AR */}
          <div className={`ar-card glass-panel ${isLastStep ? 'highlight-ar' : ''}`}>
            <div className="ar-card-header">
              <Maximize size={24} className="ar-icon" />
              <h3>Simulasi AR 3D</h3>
            </div>
            <p className="ar-instruction">
              Pindai kode QR ini menggunakan kamera HP Anda untuk melihat komponen interaktif secara 3D.
            </p>

            <div className="qr-container">
              <QRCode
                value={arUrl}
                size={180}
                bgColor="#ffffff"
                fgColor="#003B5C"
                level="Q"
              />
            </div>

            <div className="qr-fallback">
              <span>Atau buka tautan berikut di HP Anda:</span>
              <a href={arUrl} target="_blank" rel="noopener noreferrer">{arUrl}</a>
            </div>
          </div>

          {/* Warning Card */}
          <div className="warning-card glass-card">
            <AlertCircle size={24} className="warning-icon" />
            <div className="warning-content">
              <h4>Perhatian K3</h4>
              <p>Selalu utamakan keselamatan. Gunakan APD lengkap sebelum mempraktekkan materi ini di lapangan.</p>
            </div>
          </div>
        </aside >
      </div >
    </div >
  );
};

export default ModuleDetail;