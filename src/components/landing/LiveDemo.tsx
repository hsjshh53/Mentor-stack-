import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code, Sparkles, ChevronRight, Check } from 'lucide-react';
import { AnimatedText } from '../ui/AnimatedText';

const CODE_STEPS = [
  {
    lang: "typescript",
    name: "engine.ts",
    code: `import { NeuralSync } from "@olynqstack/core";

const engine = new NeuralSync({
  latency: "ULTRA_LOW",
  model: "SYNAPSE_v5"
});

export const bootstrap = async () => {
  await engine.initialize();
  return engine.optimize(process.cwd());
};`
  },
  {
    lang: "json",
    name: "manifest.json",
    code: `{
  "id": "BILLION_DOLLAR_APP",
  "protocols": ["HIGH_AVAILABILITY", "NEURAL_CACHING"],
  "security": "MILITARY_GRADE",
  "status": "LEGENDARY"
}`
  }
];

export const LiveDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [typedCode, setTypedCode] = useState("");
  
  useEffect(() => {
    let currentCode = CODE_STEPS[activeStep].code;
    let i = 0;
    setTypedCode("");
    
    const interval = setInterval(() => {
      setTypedCode(currentCode.slice(0, i));
      i++;
      if (i > currentCode.length) clearInterval(interval);
    }, 20);
    
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <section className="px-6 py-40 bg-[#050506]">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400"
          >
            <Terminal size={14} fill="currentColor" />
            Zero-Latency Generation
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
            <AnimatedText text="See it in" /> <br/> 
            <span className="text-emerald-500 italic"><AnimatedText text="Action." delay={0.2} /></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            {CODE_STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-full p-8 rounded-[2.5rem] border transition-all duration-500 text-left group relative overflow-hidden ${
                  activeStep === i 
                  ? 'bg-emerald-500 border-transparent shadow-[0_20px_40px_-5px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                }`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeStep === i ? 'bg-black text-emerald-500' : 'bg-white/5 text-white/20'
                    }`}>
                      <Code size={20} />
                    </div>
                    <div>
                      <h4 className={`text-lg font-display font-black uppercase tracking-tight ${
                        activeStep === i ? 'text-black' : 'text-white'
                      }`}>{step.name}</h4>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        activeStep === i ? 'text-black/50' : 'text-white/20'
                      }`}>{step.lang}</p>
                    </div>
                  </div>
                  {activeStep === i && <Check size={20} className="text-black" />}
                </div>
              </button>
            ))}
            
            <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6 mt-12">
               <div className="flex items-center gap-4 text-indigo-400">
                  <Sparkles size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">AI Analysis</span>
               </div>
               <p className="text-sm font-medium text-white/40 leading-relaxed">
                  "This architecture implements recursive optimization patterns that ensure linear performance even at planetary scale."
               </p>
            </div>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-8">
            <div className="rounded-[4rem] border border-white/10 bg-[#0A0A0B] overflow-hidden shadow-2xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-transparent to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="h-14 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-10 relative z-10">
                <div className="flex gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                   <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                   Neural_Editor_v5 // {CODE_STEPS[activeStep].name}
                </div>
              </div>
              
              <div className="p-10 font-mono text-sm md:text-lg leading-relaxed relative z-10 min-h-[400px]">
                <pre className="text-emerald-400/90 whitespace-pre-wrap">
                  <code>{typedCode}</code>
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 H-5 bg-emerald-500 align-middle ml-1"
                  />
                </pre>
              </div>

              <div className="absolute bottom-6 right-10 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 relative z-10">
                 <ChevronRight size={14} />
                 Ready to Deploy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
