import React, { createContext, useContext, useState, useCallback } from 'react';

const AdminDataContext = createContext(null);

let nextModuleId = 4;
let nextModelId = 4;

const initialModules = [
  {
    id: 1,
    title: 'Instalasi Tiang Listrik TM',
    category: 'Distribusi',
    description: 'Pelajari komponen dan langkah-langkah instalasi tiang listrik Tegangan Menengah (TM).',
    duration: '45 Menit',
    tags: ['Distribusi', 'AR Ready'],
  },
  {
    id: 2,
    title: 'Pengenalan Trafo Distribusi',
    category: 'Tegangan Menengah',
    description: 'Memahami fungsi, bagian-bagian, dan cara kerja transformator distribusi dengan detail.',
    duration: '30 Menit',
    tags: ['Tegangan Menengah', 'Komponen'],
  },
  {
    id: 3,
    title: 'K3 Kelistrikan',
    category: 'Keselamatan',
    description: 'Prosedur Keselamatan dan Kesehatan Kerja dalam instalasi kelistrikan PLN.',
    duration: '60 Menit',
    tags: ['Keselamatan', 'Sertifikasi'],
  },
];

// Seeded from the real .glb files that already live in public/assets/models
const initialModels = [
  {
    id: 1,
    name: 'Laptop PLN (Perawatan Lapangan)',
    fileUrl: '/assets/models/LAPTOP_PLN.glb',
    fileName: 'LAPTOP_PLN.glb',
    marker: 'marker_trafo.png',
    moduleId: 2,
    sizeLabel: '0.7 MB',
    isBlob: false,
  },
  {
    id: 2,
    name: 'Gearbox Assembly',
    fileUrl: '/assets/models/GearboxAssy.glb',
    fileName: 'GearboxAssy.glb',
    marker: 'marker_gearbox.png',
    moduleId: 1,
    sizeLabel: '4.9 MB',
    isBlob: false,
  },
  {
    id: 3,
    name: 'Buggy (Aset Uji Coba)',
    fileUrl: '/assets/models/Buggy.glb',
    fileName: 'Buggy.glb',
    marker: '-',
    moduleId: null,
    sizeLabel: '7.5 MB',
    isBlob: false,
  },
];

export const AdminDataProvider = ({ children }) => {
  const [modules, setModules] = useState(initialModules);
  const [models3d, setModels3d] = useState(initialModels);

  const addModule = useCallback((mod) => {
    setModules((prev) => [...prev, { ...mod, id: nextModuleId++ }]);
  }, []);

  const updateModule = useCallback((id, updates) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  const deleteModule = useCallback((id) => {
    setModules((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const addModel = useCallback((model) => {
    setModels3d((prev) => [...prev, { ...model, id: nextModelId++ }]);
  }, []);

  const deleteModel = useCallback((id) => {
    setModels3d((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target?.isBlob && target.fileUrl) {
        URL.revokeObjectURL(target.fileUrl);
      }
      return prev.filter((m) => m.id !== id);
    });
  }, []);

  const value = {
    modules,
    addModule,
    updateModule,
    deleteModule,
    models3d,
    addModel,
    deleteModel,
  };

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
};

export const useAdminData = () => {
  const ctx = useContext(AdminDataContext);
  if (!ctx) {
    throw new Error('useAdminData harus dipakai di dalam <AdminDataProvider>');
  }
  return ctx;
};
