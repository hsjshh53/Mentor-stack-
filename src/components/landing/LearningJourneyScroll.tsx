import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Circle, Zap, Brain, Rocket, Award } from 'lucide-react';

const STAGES = [
  {
    icon: Brain,
    title: "Beginner",
    desc: "Neural foundations & logic mapping.",
    color: "from-emerald-500 to-emerald-700",
    shadow: "shadow-emerald-500/20"
  },
  {
    icon: Zap,
    title: "Intermediate",
    desc: "Architecture & core protocols.",
    color: "from-indigo-500 to-blue-700",
    shadow: "shadow-indigo-500/20"
  },
  {
    icon: Rocket,
    title: "Advanced",
    desc: "Unicorn-scale system design.",
    color: "from-purple-500 to-purple-700",
    shadow: "shadow-purple-500/20"
  },
  {
    icon: Award,
    title: "Pro",
    desc: "Career nexus & placement verified.",
    color: "from-amber-400 to-amber-600",
    shadow: "shadow-amber-500/20"
  }
];

export const LearningJourneyScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-20">
      {/* Visual Timeline Path */}
      <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2">
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute inset-0 bg-gradient-to-b from-emerald-500 via-indigo-500 to-purple-600"
        />
        
        {/* Glow Trail */}
        <motion.div 
          style={{ top: useTransform(scaleY, [0, 1], ['0%', '100%']) }}
          className="absolute left-1/2 -translate-x-1/2 w-4 h-24 bg-gradient-to-b from-white to-transparent blur-md opacity-50"
        />
      </div>

      <div className="space-y-48 relative z-10">
        {STAGES.map((stage, i) => {
          const isComplete = i / (STAGES.length - 1);
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.2, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Panel */}
              <div className={`flex-1 space-y-6 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                <div className={`text-[10px] font-black uppercase tracking-[0.4em] text-white/20`}>
                  System Level 0{i + 1}
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tighter leading-none">
                  {stage.title}
                </h3>
                <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                  {stage.desc}
                </p>
              </div>

              {/* Central Marker Node */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                 <motion.div
                    style={{
                      backgroundColor: useTransform(scrollYProgress, [i / STAGES.length, (i + 0.5) / STAGES.length], ['rgba(255,255,255,0.05)', 'rgba(16,185,129,1)']),
                      scale: useTransform(scrollYProgress, [i / STAGES.length, (i + 0.5) / STAGES.length], [0.8, 1.2]),
                      boxShadow: useTransform(scrollYProgress, [i / STAGES.length, (i + 0.5) / STAGES.length], ['0 0 0px transparent', '0 0 30px rgba(16,185,129,0.5)'])
                    }}
                    className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center relative z-20`}
                 >
                    <stage.icon size={18} className="text-white" />
                 </motion.div>
                 
                 {/* Adaptive Glow Pulse */}
                 <motion.div 
                   style={{ 
                     opacity: useTransform(scrollYProgress, [i / STAGES.length, (i + 0.5) / STAGES.length], [0, 0.3]),
                     scale: useTransform(scrollYProgress, [i / STAGES.length, (i + 0.5) / STAGES.length], [1, 2.5])
                   }}
                   className={`absolute inset-0 rounded-full bg-emerald-500 blur-xl`}
                 />
              </div>

              {/* Visual Card / Placeholder */}
              <div className="flex-1 w-full md:w-auto">
                <div className={`p-8 rounded-[3rem] glass border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors group relative overflow-hidden`}>
                   <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />
                   
                   <div className="flex items-center gap-6 mb-8">
                      <div className="flex -space-x-3">
                         {[1,2,3].map(j => (
                           <div key={j} className="w-8 h-8 rounded-full border-2 border-[#050506] bg-white/5 opacity-40" />
                         ))}
                      </div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">
                         {Math.floor(Math.random() * 50) + 50} Active Pros
                      </div>
                   </div>

                   <div className="space-y-4">
                      {[1,2].map(j => (
                        <div key={j} className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${Math.random() * 40 + 60}%` }}
                             transition={{ duration: 1.5, delay: 0.5 }}
                             className={`h-full bg-gradient-to-r ${stage.color}`}
                           />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
