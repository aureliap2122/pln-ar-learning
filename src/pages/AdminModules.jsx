import React, { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2, X, BookOpen } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './AdminShared.css';

const emptyForm = { title: '', category: '', description: '', duration: '', tags: '' };

const AdminModules = () => {
  const { modules, addModule, updateModule, deleteModule } = useAdminData();
  const [query, setQuery] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredModules = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) =>
      m.title.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
    );
  }, [modules, query]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (mod) => {
    setEditingId(mod.id);
    setForm({
      title: mod.title,
      category: mod.category,
      description: mod.description,
      duration: mod.duration,
      tags: mod.tags.join(', '),
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      duration: form.duration.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (editingId) {
      updateModule(editingId, payload);
    } else {
      addModule(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = (mod) => {
    if (window.confirm(`Hapus modul "${mod.title}"? Tindakan ini tidak bisa dibatalkan.`)) {
      deleteModule(mod.id);
    }
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1>Kelola Modul</h1>
          <p>Tambah, ubah, atau hapus modul pelatihan yang tersedia untuk teknisi.</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Cari judul atau kategori modul..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} />
          <span>Tambah Modul</span>
        </button>
      </div>

      <div className="admin-table-card glass-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul Modul</th>
                <th>Kategori</th>
                <th>Durasi</th>
                <th>Tag</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredModules.map((mod) => (
                <tr key={mod.id}>
                  <td>
                    <span className="cell-title">{mod.title}</span>
                    <span className="cell-sub">{mod.description.slice(0, 60)}{mod.description.length > 60 ? '…' : ''}</span>
                  </td>
                  <td>{mod.category}</td>
                  <td>{mod.duration}</td>
                  <td>
                    {mod.tags.map((tag, i) => (
                      <span key={i} className="admin-tag muted" style={{ marginRight: '0.35rem' }}>{tag}</span>
                    ))}
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-icon-btn" onClick={() => openEditModal(mod)} aria-label="Edit modul">
                        <Pencil size={16} />
                      </button>
                      <button className="admin-icon-btn danger" onClick={() => handleDelete(mod)} aria-label="Hapus modul">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredModules.length === 0 && (
            <div className="admin-empty">
              <BookOpen size={28} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p>Tidak ada modul yang cocok dengan pencarian "{query}".</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={closeModal}>
          <div className="admin-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{editingId ? 'Edit Modul' : 'Tambah Modul Baru'}</h2>
              <button className="admin-modal-close" onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-field">
                <label htmlFor="title">Judul Modul</label>
                <input
                  id="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="cth. Instalasi Tiang Listrik TM"
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-field">
                  <label htmlFor="category">Kategori</label>
                  <input
                    id="category"
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="cth. Distribusi"
                  />
                </div>
                <div className="admin-form-field">
                  <label htmlFor="duration">Durasi</label>
                  <input
                    id="duration"
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="cth. 45 Menit"
                  />
                </div>
              </div>

              <div className="admin-form-field">
                <label htmlFor="description">Deskripsi</label>
                <textarea
                  id="description"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Jelaskan singkat isi modul ini..."
                />
              </div>

              <div className="admin-form-field">
                <label htmlFor="tags">Tag (pisahkan dengan koma)</label>
                <input
                  id="tags"
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="cth. Distribusi, AR Ready"
                />
              </div>

              <div className="admin-form-actions">
                <button type="button" className="btn btn-outline" onClick={closeModal}>Batal</button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Simpan Perubahan' : 'Tambah Modul'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminModules;
