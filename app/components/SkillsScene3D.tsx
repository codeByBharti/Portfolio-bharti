"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// ─── Orbit Ring Component ───────────────────────────────────────────────────
function OrbitRing({ rx, ry }: { rx: number; ry: number }) {
  const points = useMemo(() => {
    const arr = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      arr.push(new THREE.Vector3(Math.cos(theta) * rx, Math.sin(theta) * ry, 0));
    }
    return arr;
  }, [rx, ry]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.06} transparent depthWrite={false} />
    </line>
  );
}

// ─── Orbiting Sphere Component ───────────────────────────────────────────────
interface OrbitData {
  rx: number;
  ry: number;
  rotation: [number, number, number];
  speed: number;
  color: string;
  size: number;
  offset: number;
}

function OrbitingSphere({ data }: { data: OrbitData }) {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      const angle = time * data.speed + data.offset;
      // Orbit in the 2D plane of the rotated parent group
      sphereRef.current.position.x = Math.cos(angle) * data.rx;
      sphereRef.current.position.y = Math.sin(angle) * data.ry;
      
      // Minor secondary spin on the sphere itself
      sphereRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[data.size, 16, 16]} />
      <meshStandardMaterial
        color={data.color}
        emissive={data.color}
        emissiveIntensity={1.8}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
}

// ─── Central Core Sphere Component ──────────────────────────────────────────
function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const colorViolet = useMemo(() => new THREE.Color("#8B5CF6"), []);
  const colorMagenta = useMemo(() => new THREE.Color("#F43F9E"), []);
  const colorCyan = useMemo(() => new THREE.Color("#22D3EE"), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.12;
      coreRef.current.rotation.x = time * 0.06;
    }

    if (materialRef.current) {
      // Color cycle through design system colors
      const cycle = (time * 0.15) % 3;
      const targetColor = new THREE.Color();
      if (cycle < 1) {
        targetColor.lerpColors(colorViolet, colorMagenta, cycle);
      } else if (cycle < 2) {
        targetColor.lerpColors(colorMagenta, colorCyan, cycle - 1);
      } else {
        targetColor.lerpColors(colorCyan, colorViolet, cycle - 2);
      }
      
      materialRef.current.emissive.copy(targetColor);
      
      // Breathing glow pulse
      const pulse = Math.sin(time * 1.8) * 0.2 + 1.0;
      materialRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <mesh ref={coreRef}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#080811"
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
}

// ─── Main Scene Component ────────────────────────────────────────────────────
export default function SkillsScene3D() {
  const orbitData: OrbitData[] = useMemo(
    () => [
      {
        rx: 1.8,
        ry: 1.2,
        rotation: [0.4, 0.5, 0.2],
        speed: 0.8,
        color: "#8B5CF6", // Violet
        size: 0.11,
        offset: 0,
      },
      {
        rx: 2.5,
        ry: 1.7,
        rotation: [-0.5, 0.3, 0.6],
        speed: -0.6,
        color: "#F43F9E", // Magenta
        size: 0.13,
        offset: Math.PI / 3,
      },
      {
        rx: 3.1,
        ry: 2.1,
        rotation: [0.3, -0.6, -0.4],
        speed: 0.45,
        color: "#22D3EE", // Cyan
        size: 0.12,
        offset: (2 * Math.PI) / 3,
      },
      {
        rx: 3.8,
        ry: 2.6,
        rotation: [0.6, 0.4, -0.7],
        speed: -0.3,
        color: "#8B5CF6", // Violet
        size: 0.15,
        offset: Math.PI,
      },
      {
        rx: 4.4,
        ry: 3.0,
        rotation: [-0.3, -0.2, 0.9],
        speed: 0.25,
        color: "#F43F9E", // Magenta
        size: 0.12,
        offset: (4 * Math.PI) / 3,
      },
    ],
    []
  );

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30 select-none">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={8} color="#8B5CF6" />
        <pointLight position={[-6, -6, 6]} intensity={8} color="#F43F9E" />
        
        {/* Core and Orbiting systems */}
        <CentralCore />
        {orbitData.map((data, idx) => (
          <group key={idx} rotation={data.rotation}>
            <OrbitRing rx={data.rx} ry={data.ry} />
            <OrbitingSphere data={data} />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
