import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Group, MathUtils } from 'three';
import { motion } from 'motion/react';

export const LaptopModel = memo(() => {
  const meshRef = useRef<Group>(null);
  const timeRef = useRef(0);
  
  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t / 2) * 0.05 + 0.5;
      meshRef.current.rotation.x = Math.sin(t / 4) * 0.05;
      meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.1);
    }
  });

  const codeSnippets = useMemo(() => [
    'import { Intelligence } from "@olynqstack/core";',
    'const brain = Intelligence.bootstrap();',
    'brain.on("complex_logic", (ast) => {',
    '  return brain.optimize(ast, { target: "BILLION_USERS" });',
    '});',
    '// Neural weights synchronized.',
    'while(engine.isRunning) {',
    '  await engine.process(stream);',
    '  console.log("Efficiency:", engine.metrics.peak);',
    '}',
    'deployToProduction("High_Performance_App");',
    '// System status: LEGENDARY'
  ], []);

  return (
    <group ref={meshRef} position={[0, 0.5, 0]}>
      {/* Screen / Lid */}
      <mesh position={[0, 1, -0.6]} rotation={[-0.4, 0, 0]}>
        <boxGeometry args={[3.2, 2.2, 0.1]} />
        <meshStandardMaterial color="#0a0a0b" roughness={0.1} metalness={0.8} />
        {/* The "Screen" Display */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial color="#000" />
          <Html transform occlude position={[0, 0, 0]} className="w-[300px] h-[200px] select-none pointer-events-none">
            <div className="w-full h-full bg-[#050506] border border-emerald-500/30 p-5 font-mono text-[8px] overflow-hidden relative rounded-sm">
              {/* Scanning Glow Line */}
              <motion.div 
                animate={{ top: ['0%', '100%'] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent blur-[2px] z-10" 
              />
              
              <div className="flex items-center justify-between mb-5 relative z-0">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="text-emerald-500/50 text-[6px] uppercase tracking-[0.3em] font-black">Secure_Connection_Active</div>
              </div>
              
              <div className="text-emerald-400/80 space-y-2 font-bold">
                {codeSnippets.map((code, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: [0, 1, 0.6] }}
                    transition={{ delay: i * 0.15, duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="flex gap-3"
                  >
                    <span className="text-white/10 w-4 text-right">{i+1}</span>
                    <span className={code.startsWith('//') ? 'text-indigo-400/40 italic' : ''}>{code}</span>
                  </motion.p>
                ))}
              </div>
              
              {/* Bottom status bar */}
              <div className="absolute bottom-4 left-5 right-5 space-y-2">
                <div className="flex justify-between text-[6px] text-white/20 uppercase tracking-widest font-black">
                   <span>Compiling_Assets...</span>
                   <span>92%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ width: ['0%', '92%', '0%'] }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.7, 1] }}
                    className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" 
                   />
                </div>
              </div>
            </div>
          </Html>
        </mesh>
      </mesh>
      
      <mesh position={[0, -0.1, 0.1]}>
        <boxGeometry args={[3.4, 0.15, 2.4]} />
        <meshStandardMaterial color="#0a0a0b" roughness={0.1} metalness={1} />
      </mesh>
    </group>
  );
});
