import React from 'react';
import { motion } from 'motion/react';
import { Brain, Cpu, Rocket, Target, Zap } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';

const STEPS = [
  {
    icon: Brain,
    title: "Guided Learning Path",
    desc: "Our system identifies your current skill level and maps a logical path to technical competence.",
  },
  {
    icon: Cpu,
    title: "Industry Standard Patterns",
    desc: "Learn the architecture used by real-world engineering teams. Build robust systems, not just simple scripts.",
  },
  {
    icon: Zap,
    title: "Real-Time AI Feedback",
    desc: "Receive instant, line-by-line guidance as you code. It's like having a senior developer assisting you as you learn.",
  },
  {
    icon: Target,
    title: "Career Readiness",
    desc: "Focus on the skills that actually matter in the job market, from technical depth to portfolio presentation.",
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="px-6 py-60 relative overflow-hidden bg-[#050506]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400"
            >
              <Rocket size={14} fill="currentColor" />
              The Engine of Excellence
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
              <AnimatedText text="How we Build" /> <br/> 
              <span className="text-emerald-500 italic"><AnimatedText text="Future Engineers." delay={0.2} /></span>
            </h2>
            
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/40 max-w-xl">
              OLYNQ Stack focuses on the core principles of software engineering, providing a structured path for continuous growth.
            </p>
          </div>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group p-8 md:p-12 rounded-[3.5rem] glass border border-white/5 hover:border-emerald-500/20 transition-all duration-700 flex gap-10 items-start"
              >
                <div className="w-16 h-16 shrink-0 rounded-[1.8rem] bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-700 border border-white/5">
                  <step.icon size={28} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white group-hover:translate-x-1 transition-transform">{step.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
