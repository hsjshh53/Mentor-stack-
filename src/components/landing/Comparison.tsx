import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Sparkles } from 'lucide-react';

const TRADITIONAL = [
  "Static YouTube tutorials",
  "No structured accountability",
  "Isolated learning environment",
  "Zero career guidance",
  "Fragmented curriculum"
];

const MENTORSTACK = [
  "24/7 AI Synapse Mentoring",
  "Cinematic Career Pathing",
  "Global Peer Network",
  "Job-Ready Performance",
  "Production Ecosystems"
];

export const Comparison: React.FC = () => {
  return (
    <section className="px-6 py-40 bg-[#050506] relative overflow-hidden">
      {/* Background cinemagraph effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400 shadow-emerald-500/10 shadow-lg"
          >
            <Shield size={14} className="text-emerald-500" />
            Strategic Comparison
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85]">
            Engineered for <br/> <span className="text-emerald-500 italic">Excellence.</span>
          </h2>
          <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto">
            Traditional methods focus on consumption. MentorStack focuses on total cognitive acceleration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Traditional Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 relative group hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-12">
               <div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">The Legacy Way</h4>
                 <h3 className="text-3xl font-display font-black uppercase">Standard Learning</h3>
               </div>
               <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20">
                  <X size={32} />
               </div>
            </div>
            
            <ul className="space-y-8">
              {TRADITIONAL.map((item, i) => (
                <li key={i} className="flex items-center gap-5 text-white/30 font-bold group-hover:text-white/40 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-16 pt-8 border-t border-white/5 text-[11px] font-black uppercase tracking-[0.2em] text-white/10">
               Efficiency Level: 12%
            </div>
          </motion.div>

          {/* MentorStack Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(16,185,129,0.1)]"
          >
            {/* Inner highlights */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
            
            <div className="flex items-center justify-between mb-12">
               <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">
                    Active Protocol
                 </div>
                 <h3 className="text-4xl md:text-5xl font-display font-black uppercase text-white">MentorStack Ultra</h3>
               </div>
               <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center text-black">
                  <Sparkles size={36} fill="currentColor" />
               </div>
            </div>
            
            <ul className="space-y-8">
              {MENTORSTACK.map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-6 text-emerald-400/90 font-black group"
                >
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                  <span className="group-hover:text-white transition-colors">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-16 flex items-center justify-between">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400/40">
                 Efficiency Level: 94%
              </div>
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white animate-pulse">
                <Zap size={14} fill="currentColor" className="text-emerald-500" />
                Synaptic Peak Active
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
