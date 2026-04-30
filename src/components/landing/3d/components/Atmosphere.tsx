import React, { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Atmosphere = memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for(let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <group>
      <fog attach="fog" args={['#050506', 5, 15]} />
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#10b981"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Cinematic Floor Grid */}
      <gridHelper 
        args={[40, 40, '#10b981', '#0a0a0b']} 
        position={[0, -2, 0]} 
      />
    </group>
  );
});
