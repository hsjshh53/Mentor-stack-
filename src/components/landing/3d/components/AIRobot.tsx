import React, { useRef, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { Group } from 'three';

export const AIRobot = memo(() => {
  const groupRef = useRef<Group>(null);
  const timeRef = useRef(0);
  
  const eyeRef = useRef<Group>(null);
  
  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.4 + 3.2;
      groupRef.current.position.x = Math.sin(t * 0.5) * 0.6 + 3.8;
      groupRef.current.rotation.y = Math.sin(t) * 0.1;
      
      // Cursor reaction for "face"
      if (eyeRef.current) {
        eyeRef.current.position.x = state.mouse.x * 0.1;
        eyeRef.current.position.y = state.mouse.y * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.45, 32, 32]} />
        <MeshWobbleMaterial color="#0a0a0b" factor={0.2} speed={3} roughness={0} metalness={1} />
      </mesh>
      <group ref={eyeRef} position={[0, 0, 0.4]}>
        <mesh>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial color="#10b981" />
          <pointLight intensity={10} distance={4} color="#10b981" />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2.5, 0.2, 0]}>
        <torusGeometry args={[0.8, 0.02, 16, 120]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.5, -0.4, 0.5]}>
        <torusGeometry args={[0.9, 0.01, 16, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.3} />
      </mesh>
    </group>
  );
});
