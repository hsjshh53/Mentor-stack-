import React, { Suspense, memo, useRef } from 'react';
import { 
  PerspectiveCamera, 
  PresentationControls,
  ContactShadows,
  Environment,
  Float
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LaptopModel } from '../components/LaptopModel';
import { AIRobot } from '../components/AIRobot';

const HeroScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle breathing animation for the whole group
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1 - 0.5;
    }
  });

  return (
    <Suspense fallback={null}>
      {/* Optimized Camera Settings */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      <Environment preset="night" blur={0.8} />
      
      <ambientLight intensity={0.2} />
      
      {/* Optimized Lights - No shadows on minor lights for perf */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        color="#ffffff" 
      />
      
      {/* Rim Lighting for Cinematic Depth */}
      <pointLight position={[-10, 5, -5]} intensity={6} color="#6366f1" />
      <pointLight position={[10, 5, 2]} intensity={4} color="#10b981" />
      
      <PresentationControls
        global
        snap
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 10, Math.PI / 10]}
        azimuth={[-Math.PI / 6, Math.PI / 6]}
      >
        <group ref={groupRef} position={[0, -0.5, 0]}>
          <Float 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            <LaptopModel />
          </Float>

          <Float 
            speed={3} 
            rotationIntensity={1} 
            floatIntensity={1}
            position={[2, 1, 1]}
          >
            <AIRobot />
          </Float>
          
          <ContactShadows 
            position={[0, -1.8, 0]} 
            opacity={0.3} 
            scale={15} 
            blur={2.5} 
            far={10} 
            color="#000000"
          />
        </group>
      </PresentationControls>
    </Suspense>
  );
};

export default memo(HeroScene);
