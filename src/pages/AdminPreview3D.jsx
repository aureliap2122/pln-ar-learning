import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Loader2, AlertTriangle, Boxes } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import './AdminShared.css';
import './AdminPreview3D.css';

const AdminPreview3D = () => {
  const { models3d } = useAdminData();
  const location = useLocation();
  const containerRef = useRef(null);

  const [selectedId, setSelectedId] = useState(location.state?.modelId || models3d[0]?.id || null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error

  // Keep in sync if navigated here again with a different model pre-selected
  useEffect(() => {
    if (location.state?.modelId) {
      setSelectedId(location.state.modelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    const container = containerRef.current;
    const model = models3d.find((m) => m.id === selectedId);
    if (!container || !model) return;

    setStatus('loading');
    let disposed = false;
    let frameId = null;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1622);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.set(2, 1.4, 2.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 0.5;
    controls.maxDistance = 20;

    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(3, 5, 2);
    scene.add(dirLight);
    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.5);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const grid = new THREE.GridHelper(6, 24, 0x22384a, 0x18293a);
    scene.add(grid);

    let modelRoot = null;

    const loader = new GLTFLoader();
    loader.load(
      model.fileUrl,
      (gltf) => {
        if (disposed) return;
        modelRoot = gltf.scene;

        // Auto-fit: scale model to a consistent size, then center it above the grid
        const box = new THREE.Box3().setFromObject(modelRoot);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.6 / maxDim;
        modelRoot.scale.setScalar(scale);

        const scaledBox = new THREE.Box3().setFromObject(modelRoot);
        const center = scaledBox.getCenter(new THREE.Vector3());
        modelRoot.position.x -= center.x;
        modelRoot.position.z -= center.z;
        modelRoot.position.y -= scaledBox.min.y;

        scene.add(modelRoot);
        setStatus('ready');
      },
      undefined,
      (err) => {
        if (disposed) return;
        console.error('Gagal memuat GLB:', err);
        setStatus('error');
      }
    );

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (modelRoot) modelRoot.rotation.y += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((mat) => {
            Object.values(mat).forEach((v) => v && v.isTexture && v.dispose());
            mat.dispose();
          });
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedId, models3d]);

  const selectedModel = models3d.find((m) => m.id === selectedId);

  return (
    <div className="admin-page animate-fade-in">
      <div className="admin-page-header">
        <div>
          <h1>Preview 3D</h1>
          <p>Lihat pratinjau interaktif model sebelum dipakai dalam simulasi AR.</p>
        </div>
      </div>

      <div className="preview3d-layout">
        <aside className="preview3d-sidebar glass-card">
          <h3>Pilih Model</h3>
          {models3d.length === 0 ? (
            <div className="admin-empty" style={{ padding: '1.5rem 0.5rem' }}>
              <Boxes size={24} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p style={{ fontSize: '0.85rem' }}>Belum ada model. Unggah dulu di halaman Upload GLB.</p>
            </div>
          ) : (
            <ul className="preview3d-list">
              {models3d.map((m) => (
                <li key={m.id}>
                  <button
                    className={`preview3d-list-item ${selectedId === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedId(m.id)}
                  >
                    <span className="preview3d-item-name">{m.name}</span>
                    <span className="preview3d-item-file">{m.fileName}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="preview3d-canvas-wrap glass-card">
          <div className="preview3d-canvas" ref={containerRef}></div>

          {status === 'loading' && (
            <div className="preview3d-overlay">
              <Loader2 size={26} className="spin" />
              <span>Memuat model 3D...</span>
            </div>
          )}

          {status === 'error' && (
            <div className="preview3d-overlay error">
              <AlertTriangle size={26} />
              <span>Gagal memuat model. Pastikan file .glb valid.</span>
            </div>
          )}

          {selectedModel && status === 'ready' && (
            <div className="preview3d-caption">
              <strong>{selectedModel.name}</strong>
              <span>Seret untuk memutar &middot; scroll untuk zoom</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPreview3D;
