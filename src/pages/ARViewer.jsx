import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, RotateCw, ZoomIn, ZoomOut, Info, CheckCircle } from 'lucide-react';
import './ARViewer.css';

const steps = [
  { id: 1, title: 'Persiapan Tiang Utama', desc: 'Pastikan tiang utama berdiri tegak (90 derajat) dan pondasi kuat.' },
  { id: 2, title: 'Pemasangan Isolator', desc: 'Pasang isolator tumpu pada bagian atas tiang.' },
  { id: 3, title: 'Pemasangan Trafo', desc: 'Pasang transformator distribusi pada dudukan yang telah disiapkan.' }
];

const partDescriptions = {
  'Tiang Utama': 'Tiang penyangga utama untuk seluruh komponen jaringan distribusi. Biasanya terbuat dari beton atau besi.',
  'Trafo': 'Transformator Distribusi berfungsi untuk menurunkan tegangan dari Jaringan Tegangan Menengah (JTM) menjadi Jaringan Tegangan Rendah (JTR).',
  'Isolator': 'Berfungsi sebagai penyekat/isolasi antara kawat bertegangan dengan tiang penyangga.'
};

const ARViewer = () => {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'MODEL_LOADED') {
        setIsLoaded(true);
      } else if (event.data.type === 'PART_CLICKED') {
        setSelectedPart({
          name: event.data.partId,
          desc: partDescriptions[event.data.partId] || 'Bagian tiang listrik.'
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const sendToAR = (message) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

  const handleRotate = (val) => sendToAR({ type: 'ROTATE', value: val });
  const handleZoom = (val) => sendToAR({ type: 'ZOOM', value: val });
  const handleStepChange = (stepId) => {
    setActiveStep(stepId);
    sendToAR({ type: 'SET_STEP', step: stepId });
    setSelectedPart(null); // Reset selection
  };

  return (
    <div className="ar-viewer-container">
      {/* AR iframe */}
      <iframe 
        ref={iframeRef}
        src="/ar.html" 
        className="ar-iframe"
        allow="camera"
        title="AR View"
      ></iframe>

      {/* Top Navigation */}
      <div className="ar-top-nav">
        <button className="btn glass btn-icon-text" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>
        <div className="ar-status glass">
          <div className="status-indicator active"></div>
          <span>AR Aktif (Scan Hiro Marker)</span>
        </div>
      </div>

      {/* Part Info Overlay (Appears when a part is clicked) */}
      {selectedPart && (
        <div className="part-info-overlay glass animate-fade-in">
          <button className="close-btn" onClick={() => setSelectedPart(null)}>×</button>
          <div className="part-icon">
            <Info size={24} />
          </div>
          <h3>{selectedPart.name}</h3>
          <p>{selectedPart.desc}</p>
        </div>
      )}

      {/* Side Controls */}
      <div className="ar-side-controls">
        <button className="control-btn glass tooltip" data-tooltip="Putar Kiri" onClick={() => handleRotate(-45)}>
          <RotateCcw size={24} />
        </button>
        <button className="control-btn glass tooltip" data-tooltip="Putar Kanan" onClick={() => handleRotate(45)}>
          <RotateCw size={24} />
        </button>
        <button className="control-btn glass tooltip" data-tooltip="Perbesar" onClick={() => handleZoom(1.2)}>
          <ZoomIn size={24} />
        </button>
        <button className="control-btn glass tooltip" data-tooltip="Perkecil" onClick={() => handleZoom(0.8)}>
          <ZoomOut size={24} />
        </button>
      </div>

      {/* Bottom Step-by-step Panel */}
      <div className="ar-bottom-panel glass">
        <h3 className="panel-title">Simulasi Instalasi</h3>
        <div className="steps-container">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`step-card ${activeStep === step.id ? 'active' : ''} ${activeStep > step.id ? 'completed' : ''}`}
              onClick={() => handleStepChange(step.id)}
            >
              <div className="step-number">
                {activeStep > step.id ? <CheckCircle size={16} /> : step.id}
              </div>
              <div className="step-content">
                <h4>{step.title}</h4>
                {activeStep === step.id && <p className="animate-fade-in">{step.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
