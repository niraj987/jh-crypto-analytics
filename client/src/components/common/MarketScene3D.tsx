'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MarketScene3DProps {
  symbol?: string;
  price?: number;
}

export default function MarketScene3D({ symbol = 'BTC', price = 67850 }: MarketScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isRotatingRef = useRef(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 38);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Warm, ambient and rim lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.2);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const mintLight = new THREE.PointLight(0x10b981, 1.5, 60);
    mintLight.position.set(-15, 10, 15);
    scene.add(mintLight);

    const skyLight = new THREE.PointLight(0x0284c7, 1.4, 60);
    skyLight.position.set(15, -10, -15);
    scene.add(skyLight);

    // Group for the entire market model
    const marketGroup = new THREE.Group();
    scene.add(marketGroup);

    // 1. Innovative Floating 3D Candlestick Helix
    const numCandles = 28;
    const helixRadius = 12;
    const candleMeshes: THREE.Group[] = [];

    const greenMat = new THREE.MeshPhysicalMaterial({
      color: 0x059669,
      emissive: 0x10b981,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });

    const redMat = new THREE.MeshPhysicalMaterial({
      color: 0xe11d48,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });

    const wickMat = new THREE.MeshBasicMaterial({ color: 0x475569 });

    for (let i = 0; i < numCandles; i++) {
      const angle = (i / numCandles) * Math.PI * 2.8;
      const x = Math.cos(angle) * (helixRadius + Math.sin(i * 0.4) * 2);
      const z = Math.sin(angle) * (helixRadius + Math.sin(i * 0.4) * 2);
      const y = (i - numCandles / 2) * 0.9 + Math.sin(i * 0.5) * 2.5;

      const candleGroup = new THREE.Group();
      candleGroup.position.set(x, y, z);

      const isUp = (i % 3 !== 0);
      const bodyH = 1.2 + Math.abs(Math.sin(i * 0.7)) * 2.4;
      const wickH = bodyH + 1.8;

      // Wick
      const wickGeo = new THREE.CylinderGeometry(0.04, 0.04, wickH, 8);
      const wick = new THREE.Mesh(wickGeo, wickMat);
      candleGroup.add(wick);

      // Body (Box)
      const bodyGeo = new THREE.BoxGeometry(0.85, bodyH, 0.85);
      const body = new THREE.Mesh(bodyGeo, isUp ? greenMat : redMat);
      candleGroup.add(body);

      marketGroup.add(candleGroup);
      candleMeshes.push(candleGroup);
    }

    // 2. Oscillating Quantum Price Surface Wave (Grid Mesh)
    const waveGeo = new THREE.PlaneGeometry(36, 36, 28, 28);
    waveGeo.rotateX(-Math.PI / 2);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.position.y = -7;
    scene.add(waveMesh);

    // 3. Volumetric Particle Aura
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 32;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 32;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      targetX = ((clientX / width) - 0.5) * 0.8;
      targetY = ((clientY / height) - 0.5) * 0.8;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        marketGroup.rotation.y += deltaX * 0.01;
        marketGroup.rotation.x += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Auto rotation
      if (isRotatingRef.current && !isDragging) {
        marketGroup.rotation.y += 0.007;
      }

      // Smooth tilt towards target
      camera.position.x += (targetX * 24 - camera.position.x) * 0.05;
      camera.position.y += (18 - targetY * 14 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Oscillate 3D Candlesticks floating heights
      candleMeshes.forEach((cg, idx) => {
        cg.position.y += Math.sin(elapsed * 2 + idx * 0.4) * 0.012;
      });

      // Animate Quantum Waveform plane vertices
      const pos = waveGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getZ(i);
        const z = Math.sin(u * 0.25 + elapsed * 1.5) * Math.cos(v * 0.25 + elapsed * 1.2) * 1.4;
        pos.setY(i, z);
      }
      pos.needsUpdate = true;

      // Rotate particle aura
      particles.rotation.y = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
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
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] rounded-3xl bg-gradient-to-br from-white/90 via-slate-50/80 to-emerald-50/40 border border-slate-200/80 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)] overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

