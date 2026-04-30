import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { Mesh } from 'three';

const NeuralCube = memo(() => {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(0);
  useFrame((_state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={8} rotationIntensity={3} floatIntensity={4}>
      <mesh ref={meshRef} position={[-3.5, 3, -1.5]}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial 
          color="#6366f1" 
          wireframe 
          emissive="#6366f1" 
          emissiveIntensity={8} 
          transparent
          opacity={0.8}
        />
        <pointLight intensity={5} distance={6} color="#6366f1" />
      </mesh>
    </Float>
  );
});

const ConstellationNode = memo(({ position }: { position: [number, number, number] }) => {
  const ref = useRef<Mesh>(null);
  const timeRef = useRef(0);
  useFrame((_state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (ref.current) {
      ref.current.position.y += Math.sin(t + position[0]) * 0.002;
    }
  });
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
    </mesh>
  );
});

export const FloatingElements = memo(() => {
  const points = useMemo(() => {
    return Array.from({ length: 50 }).map(() => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 5
    ] as [number, number, number]);
  }, []);

  return (
    <group>
      <NeuralCube />
      <Stars radius={15} depth={60} count={5000} factor={4} saturation={0} fade speed={2} />
      {points.map((p, i) => (
        <ConstellationNode key={i} position={p} />
      ))}
    </group>
  );
});
