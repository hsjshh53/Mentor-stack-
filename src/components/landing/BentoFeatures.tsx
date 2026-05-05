import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Rocket, 
  Bot, 
  Layout,
  Terminal,
  Shield,
  Zap,
  Globe,
  Monitor,
  Cpu
} from 'lucide-react';

const FEATURES = [
  {
    title: "AI Learning Assistant",
    desc: "A personalized AI tutor available 24/7. Code reviews, step-by-step guidance, and real-time debugging assistance.",
    icon: <Bot className="text-emerald-400" />,
    className: "lg:col-span-2 lg:row-span-2 bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20",
    status: "Interactive Learning Mode"
  },
  {
    title: "Core Foundations",
    desc: "Internalize the mental frameworks of professional software engineers.",
    icon: <Layout className="text-indigo-400" />,
    className: "bg-indigo-500/5 border-indigo-500/20",
    status: "Knowledge Base"
  },
  {
    title: "Modern Tech Stacks",
    desc: "Master in-demand tools and languages with practical, deep focus.",
    icon: <Terminal className="text-amber-400" />,
    className: "bg-amber-500/5 border-amber-500/20",
    status: "Curriculum Synced"
  },
  {
    title: "Practical Projects",
    desc: "Build production-ready applications that solve real-world problems.",
    icon: <Rocket className="text-purple-400" />,
    className: "bg-purple-500/5 border-purple-500/20",
    status: "Hands-on Learning"
  },
  {
    title: "Verified Portfolio",
    desc: "Earn credentials and build a portfolio that showcases your actual skills.",
    icon: <Shield className="text-rose-400" />,
    className: "bg-rose-500/5 border-rose-500/20",
    status: "Skill Verification"
  }
];

export const BentoFeatures: React.FC = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <section id="features" className="px-6 py-40 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background cinematic accents */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      
      <div className="text-center space-y-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <Cpu size={14} fill="currentColor" />
          The Modern Engineering Protocol
        </motion.div>
        <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white">
          Architected for <br/> <span className="text-emerald-500 italic">Technical</span> Mastery
        </h2>
        <p className="max-w-2xl mx-auto text-white/40 text-xl font-medium">
          OLYNQ Stack is more than a tutorial. It is a structured learning environment designed to build professional-grade developers from the ground up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              perspective: '1000px',
            }}
            className={`p-10 lg:p-14 rounded-[4rem] border backdrop-blur-3xl group transition-all duration-700 flex flex-col justify-between glass-hover relative overflow-hidden ${f.className}`}
          >
            {/* Tilt Wrapper */}
            <motion.div
              style={{
                rotateX: (mousePos.y - 0.5) * 10,
                rotateY: (mousePos.x - 0.5) * -10,
              }}
              className="h-full flex flex-col justify-between"
            >
              {/* Inner hover glow focus */}
              <div 
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.06), transparent 40%)`,
                }}
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" 
              />
              
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start text-indigo-400">
                  <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] flex items-center justify-center group-hover:scale-110 transition-transform duration-700 border border-white/5 shadow-2xl relative">
                    {React.cloneElement(f.icon as React.ReactElement<{ size?: number }>, { size: 28 })}
                    <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/10 group-hover:text-emerald-500/40 transition-colors">
                     {f.status}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-display font-black uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-500">{f.title}</h3>
                  <p className="text-white/40 text-lg font-medium leading-relaxed">{f.desc}</p>
                </div>
              </div>
              
              <div className="mt-12 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-emerald-400 transition-colors">
                  <span>View Protocol</span>
                  <Zap size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <Monitor size={16} className="text-white/5 group-hover:text-emerald-500/20" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
