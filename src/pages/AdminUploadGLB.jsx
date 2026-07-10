import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileBox, X, CheckCircle2 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './AdminShared.css';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 KB';
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
};

const AdminUploadGLB = () => {
  const { modules, addModel } = useAdminData();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [name, setName] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const pickFile = (selected) => {
    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith('.glb')) {
      alert('Format file harus .glb');
      return;
    }
    setFile(selected);
    if (!name) {
      setName(selected.name.replace(/\.glb$/i, ''));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Pilih file .glb terlebih dahulu.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    addModel({
      name: name.trim() || file.name,
      fileUrl: objectUrl,
      fileName: file.name,
      marker: '-',
      moduleId: moduleId ? Number(moduleId) : null,
      sizeLabel: formatBytes(file.size),
      isBlob: true,
    });

    setSubmitted(true);
  };

  const resetForm = () => {
    setFile(null);
    setName('');
    setModuleId('');
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (submitted) {
    return (
      <div className="admin-page animate-fade-in">
        <div className="admin-table-card glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="admin-dropzone-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
            <CheckCircle2 size={28} />
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Model Berhasil Diunggah</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
            "{name}" sudah tersedia di halaman Kelola 3D Model dan siap di-preview.
          </p>
          <div className="admin-form-actions" style={{ justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={resetForm}>Upload Model Lain</button>
            <button className="btn btn-primary" onClick={() => navigate('/admin/models')}>Lihat Kelola 3D Model</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1>Upload GLB</h1>
          <p>Unggah aset model 3D baru untuk dipakai dalam simulasi AR.</p>
        </div>
      </div>

      <div className="admin-table-card glass-card" style={{ padding: '2rem', maxWidth: '640px' }}>
        <form className="admin-form" onSubmit={handleSubmit}>
          {!file ? (
            <label
              className={`admin-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <div className="admin-dropzone-icon">
                <UploadCloud size={26} />
              </div>
              <h3>Tarik &amp; lepas file .glb di sini</h3>
              <p>atau klik untuk memilih file dari perangkat kamu</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".glb"
                onChange={(e) => pickFile(e.target.files?.[0])}
              />
            </label>
          ) : (
            <div className="admin-file-chip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileBox size={20} />
                <div>
                  <div>{file.name}</div>
                  <div style={{ fontWeight: 400, fontSize: '0.78rem', opacity: 0.8 }}>{formatBytes(file.size)}</div>
                </div>
              </div>
              <button type="button" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} aria-label="Hapus file">
                <X size={18} />
              </button>
            </div>
          )}

          <div className="admin-form-field">
            <label htmlFor="model-name">Nama Model</label>
            <input
              id="model-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="cth. Trafo Distribusi 20kV"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="module-link">Tautkan ke Modul (opsional)</label>
            <select id="module-link" value={moduleId} onChange={(e) => setModuleId(e.target.value)}>
              <option value="">— Belum ditautkan —</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.id}>{mod.title}</option>
              ))}
            </select>
            <span className="admin-form-hint">Model akan muncul sebagai "Tersedia" pada modul yang dipilih.</span>
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="btn btn-primary">
              <UploadCloud size={18} />
              <span>Unggah Model</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadGLB;
