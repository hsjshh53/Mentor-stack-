import React, { useMemo, Suspense, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useVelocity, 
  Variants 
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlassButton } from '../ui/GlassButton';
import { AnimatedText } from '../ui/AnimatedText';
import { Hero3D } from './Hero3D';
import { ArrowRight, Play, Sparkles, Zap, Bot, Globe, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Performance optimized values for parallax
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // AI Glow Reactive Dynamics
  const glowIntensity = useTransform(scrollYProgress, [0, 0.2], [0.08, 0.15]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const glowX = useTransform(scrollYProgress, [0, 1], ['50%', '40%']);
  
  // AI Energy Pulse synchronized with scroll velocity
  const scrollVelocity = useVelocity(scrollY);
  const pulseScale = useSpring(useTransform(scrollVelocity, [-2000, 2000], [1, 1.2]), {
    stiffness: 100,
    damping: 30
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center px-6 pt-32 pb-40 overflow-hidden">
      
      {/* 💡 SCROLL REACTIVE AI CORE GLOW */}
      <motion.div 
        style={{ 
          opacity: glowIntensity, 
          scale: glowScale,
          left: glowX,
          translateZ: 0 
        }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,1)_0%,transparent_70%)] pointer-events-none -z-10 blur-[120px]"
      />

      {/* ⚡ AI ENERGY PULSE RING */}
      <motion.div 
        style={{ scale: pulseScale, translateZ: 0 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-500/20 rounded-full pointer-events-none -z-10 blur-[2px]"
      >
        <div className="absolute inset-x-0 top-0 h-2 bg-emerald-500/50 blur-sm rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-12 items-center relative z-10">
        
        {/* CONTENT AREA */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity, scale }}
          className="space-y-14 text-center lg:text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-4 px-7 py-3 rounded-full glass border border-white/10 text-[11px] font-display font-black uppercase tracking-[0.5em] text-emerald-400 backdrop-blur-3xl shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)] group"
          >
            <Sparkles size={16} fill="currentColor" className="animate-pulse" />
            Neural Logic System Active
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-10">
            <h1 className="text-[4rem] md:text-9xl lg:text-[8.5rem] font-display font-black tracking-[-0.07em] uppercase leading-[0.8] text-white">
              <AnimatedText text="Learn Tech" /> <br/> 
              <span className="text-emerald-500 italic relative">
                <AnimatedText text="Zero to Pro" delay={0.2} />
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute -bottom-2 lg:-bottom-4 left-0 right-0 h-2 bg-emerald-500 origin-left rounded-full shadow-[0_5px_30px_rgba(16,185,129,0.5)]"
                />
              </span> 
              <br/> <AnimatedText text="With AI." delay={0.4} />
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-xl font-medium leading-relaxed text-white/40">
              OLYNQ Stack builds your path, tracks your progress, and mentors you in real time. Experience engineering education reinvented.
            </p>
          </motion.div>

          <motion.div 
             variants={itemVariants}
             className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
          >
            <GlassButton 
              onClick={() => navigate('/signup')}
              icon={ArrowRight}
              className="h-24 px-16 text-[12px] group"
            >
              Start Journey
            </GlassButton>

            <button className="flex items-center gap-6 group text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-all">
               <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-all">
                  <Play size={20} fill="currentColor" className="ml-1" />
               </div>
               Watch Protocol
            </button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-12 pt-14 border-t border-white/5"
          >
            {[
              { icon: <Zap size={18} />, text: "Real-time AI" },
              { icon: <Globe size={18} />, text: "Global Standards" },
              { icon: <Bot size={18} />, text: "Neural Mentor" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/20 transition-all">
                <span className="text-emerald-500">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* CINEMATIC 3D AREA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: yTranslate, translateZ: 0 }}
          className="relative h-[600px] md:h-[900px] w-full flex items-center justify-center"
        >
          {/* Subtle parallax ring behind 3D */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-white/5 rounded-full blur-[1px]" 
          />
          
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
          
          {/* Floating UI Command Overlays (optimized) */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[15%] right-[5%] glass border border-white/10 p-6 rounded-[2.5rem] backdrop-blur-3xl hidden md:block"
          >
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                   <Cpu size={18} fill="currentColor" />
                </div>
                <div>
                  <h5 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">System_Core</h5>
                  <p className="text-lg font-display font-black text-white">ACTIVE</p>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
