import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Trash2, Boxes, UploadCloud } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './AdminShared.css';

const AdminModels = () => {
  const { models3d, modules, deleteModel } = useAdminData();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const moduleTitle = (moduleId) => modules.find((m) => m.id === moduleId)?.title || null;

  const filteredModels = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models3d;
    return models3d.filter((m) => m.name.toLowerCase().includes(q));
  }, [models3d, query]);

  const handleDelete = (model) => {
    if (window.confirm(`Hapus model "${model.name}"? File ini akan dihapus dari daftar.`)) {
      deleteModel(model.id);
    }
  };

  const handlePreview = (model) => {
    navigate('/admin/preview', { state: { modelId: model.id } });
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1>Kelola 3D Model</h1>
          <p>Semua aset model 3D (.glb) yang dipakai dalam simulasi AR, beserta modul terkaitnya.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari nama model..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/admin/upload')}>
          <UploadCloud size={18} />
          <span>Upload GLB</span>
        </button>
      </div>

      <div className="admin-table-card glass-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Model</th>
                <th>File</th>
                <th>Marker</th>
                <th>Modul Terkait</th>
                <th>Ukuran</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredModels.map((model) => {
                const linkedModule = moduleTitle(model.moduleId);
                return (
                  <tr key={model.id}>
                    <td className="cell-title">{model.name}</td>
                    <td>{model.fileName}</td>
                    <td>{model.marker !== '-' ? model.marker : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}</td>
                    <td>
                      {linkedModule ? (
                        <span className="admin-tag">{linkedModule}</span>
                      ) : (
                        <span className="admin-tag muted">Belum ditautkan</span>
                      )}
                    </td>
                    <td>{model.sizeLabel}</td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="admin-icon-btn" onClick={() => handlePreview(model)} aria-label="Preview 3D">
                          <Eye size={16} />
                        </button>
                        <button className="admin-icon-btn danger" onClick={() => handleDelete(model)} aria-label="Hapus model">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredModels.length === 0 && (
            <div className="admin-empty">
              <Boxes size={28} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p>Tidak ada model yang cocok dengan pencarian "{query}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModels;
