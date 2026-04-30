import React from 'react';
import { motion } from 'framer-motion';
import { Map, Zap, CheckCircle2, Circle } from 'lucide-react';

const PHASES = [
  {
    title: "Phase 0: Cognitive Foundational",
    desc: "Neural mapping and computational logic basics.",
    items: ["Mental Model Alignment", "Syntax Synapse", "Execution Flow Controls"],
    accent: "bg-emerald-500"
  },
  {
    title: "Phase 1: Architecture Core",
    desc: "Design patterns and system scalability protocols.",
    items: ["Component Architecture", "Sovereign State", "Engine Optimization"],
    accent: "bg-indigo-500"
  },
  {
    title: "Phase 2: Employment Nexus",
    desc: "Rigorous job-ready projects and networking.",
    items: ["Unicorn Labs", "Career Nexus Protocol", "Elite Networking"],
    accent: "bg-purple-500"
  }
];

export const CurriculumRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="px-6 py-40 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-[30%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="text-center space-y-8 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400"
        >
          <Map size={14} fill="currentColor" />
          The Sovereignty Pipeline
        </motion.div>
        <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white">
          The <span className="text-emerald-500 italic">Mastery</span> <br/> Roadmap
        </h2>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-[34px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-indigo-600 to-purple-800 opacity-20" />
        
        <div className="space-y-40">
          {PHASES.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-20 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`space-y-8 ${i % 2 === 1 ? 'md:order-2 md:pl-20' : 'md:pr-20 md:text-right'}`}>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Roadmap Protocol 0{i + 1}</h4>
                 <h3 className="text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight leading-none">{phase.title}</h3>
                 <p className="max-w-md ml-auto mr-auto md:ml-0 md:mr-0 text-white/40 text-lg font-medium leading-relaxed">{phase.desc}</p>
                 
                 <div className={`flex flex-wrap gap-4 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {phase.items.map((item, j) => (
                      <div key={j} className="px-5 py-2.5 rounded-full glass border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/60">
                        {item}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Central Marker */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                 <div className={`w-8 h-8 rounded-full ${phase.accent} flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,0,0,1)] ring-8 ring-[#050506]`}>
                    <Zap size={14} fill="currentColor" />
                 </div>
              </div>

              <div className={`${i % 2 === 1 ? 'md:order-1' : ''}`}>
                 <div className="rounded-[4rem] border border-white/5 bg-white/[0.01] p-10 backdrop-blur-3xl group hover:border-white/10 transition-colors">
                    <div className="space-y-6">
                       {[1,2,3].map(step => (
                         <div key={step} className="flex items-center gap-6 group/item">
                            <div className="w-12 h-12 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover/item:text-emerald-500 group-hover/item:border-emerald-500/30 transition-all">
                               <CheckCircle2 size={20} />
                            </div>
                            <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: '100%' }}
                                 transition={{ delay: 0.5 + step * 0.1, duration: 1.5 }}
                                 className={`h-full ${phase.accent}`} 
                                />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
