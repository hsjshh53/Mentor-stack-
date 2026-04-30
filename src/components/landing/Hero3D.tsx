import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { PCFShadowMap } from 'three';

const HeroScene = lazy(() => import('./3d/scenes/HeroScene'));

export const Hero3D: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[600px] md:min-h-[800px] pointer-events-auto relative group">
      {/* Cinematic Fallback / Background Glow */}
      <div className="absolute inset-0 bg-[#050506] rounded-[4rem] overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      </div>
      
      <Canvas 
        shadows={{ type: PCFShadowMap }} 
        dpr={[1, 1.5]} 
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.5, 10], fov: 35 }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
};
