import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ParallaxSystem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax layers speed configuration
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  // Smooth out the movement
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative isolate">
      {/* Cinematic Parallax Layers */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#050506]">
        {/* Layer 1: Base Gradient (Static but deep) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(99,102,241,0.03)_0%,transparent_40%)]" />

        {/* Layer 2: Moving Noise/Grid Texture */}
        <motion.div 
          style={{ y: smoothY1, translateZ: 0 }}
          className="absolute inset-0 opacity-[0.03] bg-grid"
        />

        {/* Layer 3: Floating Particles / Depth Accents */}
        <motion.div 
          style={{ y: smoothY2, translateZ: 0 }}
          className="absolute inset-[10%] opacity-[0.05] blur-[100px]"
        >
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-emerald-500 rounded-full" />
          <div className="absolute bottom-[30%] right-[10%] w-[500px] h-[500px] bg-indigo-500 rounded-full" />
        </motion.div>

        {/* Layer 4: High Speed Subtle Details */}
        <motion.div 
          style={{ y: smoothY3, translateZ: 0 }}
          className="absolute inset-0 opacity-[0.02]"
        >
           <div className="absolute top-[80%] left-[40%] w-[300px] h-[300px] bg-white rounded-full blur-[150px]" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
