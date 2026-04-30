import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../ui/GlassButton';
import { Check, Sparkles, Rocket, Zap, Crown, Flame, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedText } from '../ui/AnimatedText';

const PLANS = [
  {
    name: "MentorStack Pro",
    price: "₦10,000",
    period: "Monthly",
    desc: "One plan. Full access. No hidden tiers. Premium engineering education for the ambitious.",
    features: [
      "Full access to all courses and AI tutor",
      "All learning paths (Frontend, Backend, etc)",
      "Dynamic Curriculum Generator",
      "Real-time AI Mentor Support",
      "Practical Projects + Quizzes",
      "Advanced Progress Tracking"
    ],
    color: "emerald",
    cta: "Become a Pro Member",
    popular: true,
    icon: <Crown size={20} />
  }
];

export const Pricing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="px-6 py-40 bg-[#050506] relative overflow-hidden">
      {/* Background cinematic lighting */}
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400"
          >
            <Sparkles size={14} className="animate-pulse" />
            Simple Transparent Pricing
          </motion.div>
          <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white">
            <AnimatedText text="Predictable" /> <br/><span className="text-emerald-500 italic"><AnimatedText text="Growth." delay={0.2} /></span>
          </h2>
          <p className="max-w-2xl mx-auto text-white/40 text-xl font-medium leading-relaxed">
            The highest cognitive return on investment in the Nigerian market. Architect your future with precision.
          </p>
        </div>

        <div className="flex justify-center">
          {PLANS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl flex flex-col p-12 lg:p-20 rounded-[4rem] group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-[#0D0D0E] to-black border border-emerald-500/40 shadow-[0_40px_120px_-30px_rgba(16,185,129,0.2)] transition-all duration-700"
            >
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-400 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity" />

              <div className="flex-1 space-y-16">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="p-5 rounded-3xl bg-emerald-500 text-black">
                       {p.icon}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 animate-pulse">
                       Full Access Protocol
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[12px] font-black uppercase tracking-[0.5em] text-white/20 mb-4">{p.name}</h4>
                    <div className="flex items-baseline gap-3">
                       <span className="text-7xl lg:text-9xl font-display font-black tracking-tighter text-white">{p.price}</span>
                       <span className="text-xl font-black uppercase tracking-[0.2em] text-white/10 italic">/ {p.period}</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-xl font-medium leading-relaxed max-w-md">{p.desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">The Pro Package:</p>
                    <div className="space-y-4">
                      {p.features.slice(0, 3).map((f, fi) => (
                        <div key={fi} className="flex items-center gap-5 group/item">
                           <Check size={16} className="text-emerald-500" />
                           <span className="text-base font-bold text-white/60 group-hover/item:text-white transition-colors tracking-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 opacity-0 md:opacity-100">.</p>
                    <div className="space-y-4">
                      {p.features.slice(3).map((f, fi) => (
                        <div key={fi} className="flex items-center gap-5 group/item">
                           <Check size={16} className="text-emerald-500" />
                           <span className="text-base font-bold text-white/60 group-hover/item:text-white transition-colors tracking-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <GlassButton 
                  onClick={() => navigate('/signup')}
                  variant="primary"
                  icon={ArrowRight}
                  className="w-full h-24 text-[12px]"
                >
                  {p.cta}
                </GlassButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
