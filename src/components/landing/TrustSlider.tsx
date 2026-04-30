import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const LOGOS = [
  'Google', 'Microsoft', 'Meta', 'Amazon', 'Netflix', 'OpenAI', 'Flutter', 'Firebase', 'Vercel', 'Linear', 'Stripe', 'Apple'
];

export const TrustSlider: React.FC = () => {
  return (
    <div className="py-24 relative overflow-hidden bg-[#050506]/50 border-y border-white/5 group">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-emerald-500/40"
        >
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Partnerships</span>
        </motion.div>
        <p className="text-xl md:text-2xl font-medium text-white/20">
          Empowering the next generation of architects at the world's most <span className="text-white/40">innovative companies.</span>
        </p>
      </div>
      
      <div className="flex overflow-hidden relative">
        {/* Animated Gradient Overlays for smoother blend */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#050506] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#050506] to-transparent z-20 pointer-events-none" />

        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-24 whitespace-nowrap px-12 items-center"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <React.Fragment key={i}>
              {LOGOS.map(logo => (
                <div key={logo} className="flex items-center gap-24">
                  <span className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-white/[0.03] hover:text-emerald-500/20 transition-all cursor-default hover:scale-110 duration-700">
                    {logo}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-white/[0.02]" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Subtle depth lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};
