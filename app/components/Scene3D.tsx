"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function RotatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Define shifting target colors matching the design system
  const colorViolet = new THREE.Color("#8B5CF6");
  const colorMagenta = new THREE.Color("#F43F9E");
  const colorCyan = new THREE.Color("#22D3EE");

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Slow automatic rotation
    const baseRotationX = time * 0.12;
    const baseRotationY = time * 0.15;

    // 2. Parallax tilt based on mouse coordinates
    const targetX = state.mouse.y * 0.35;
    const targetY = state.mouse.x * 0.35;

    // Lerp rotation smoothly for lag/inertia effect
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX + baseRotationX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY + baseRotationY, 0.05);

    // 3. Shifting color over time
    const cycle = (time * 0.3) % 3;
    let targetColor = new THREE.Color();
    if (cycle < 1) {
      targetColor.lerpColors(colorViolet, colorMagenta, cycle);
    } else if (cycle < 2) {
      targetColor.lerpColors(colorMagenta, colorCyan, cycle - 1);
    } else {
      targetColor.lerpColors(colorCyan, colorViolet, cycle - 2);
    }
    materialRef.current.color.copy(targetColor);
    
    // Set subtle self-emission glow
    materialRef.current.emissive.copy(targetColor).multiplyScalar(0.2);
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <torusKnotGeometry args={[1.2, 0.38, 64, 8]} />
      <meshStandardMaterial
        ref={materialRef}
        wireframe
        roughness={0.1}
        metalness={0.9}
        emissiveIntensity={1}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-[350px]">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        
        {/* 3 Point lights for violet, magenta, and cyan accent colors */}
        <pointLight position={[3, 4, 3]} intensity={12} color="#8B5CF6" />
        <pointLight position={[-3, -4, 3]} intensity={12} color="#F43F9E" />
        <pointLight position={[0, 3, -4]} intensity={8} color="#22D3EE" />

        <RotatingMesh />
      </Canvas>
    </div>
  );
}
