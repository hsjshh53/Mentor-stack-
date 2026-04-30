import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../ui/GlassButton';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FinalCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-60 relative overflow-hidden">
      {/* ... previous bg code */}
      <div className="absolute inset-0 bg-[#050506]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15)_0%,transparent_70%)] animate-pulse" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400 backdrop-blur-3xl"
        >
          <Sparkles size={14} fill="currentColor" className="animate-pulse" />
          Ready for the Sovereign Protocol?
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-[9rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white"
        >
          Your Future <br/> <span className="text-emerald-500 italic">Is Systemic.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl font-medium leading-relaxed text-white/40"
        >
          Join the elite 1% of engineers who are building the next decade of infrastructure. The AI Synapse is waiting for you.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10"
        >
          <GlassButton 
            onClick={() => navigate('/signup')}
            icon={ArrowRight}
            className="h-[100px] px-20 text-[13px]"
          >
            Claim Your Seat
          </GlassButton>

          <GlassButton 
            variant="secondary"
            onClick={() => navigate('/pricing')}
            className="h-[100px] px-14 text-[13px]"
          >
            Explore Access
          </GlassButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-12 pt-12 border-t border-white/5"
        >
           {[
             { icon: <Zap size={18} />, text: "Instant Onboarding" },
             { icon: <ShieldCheck size={18} />, text: "Lifetime Access" }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
               <span className="text-emerald-500/50">{item.icon}</span>
               {item.text}
             </div>
           ))}
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full animate-bounce duration-[10s] infinite" />
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full animate-bounce duration-[12s] infinite delay-1000" />
    </section>
  );
};
