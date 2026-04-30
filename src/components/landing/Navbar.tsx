import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import { useNavigate } from 'react-router-dom';
import { Github, Twitter, Menu, Cpu, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass h-20 px-8 rounded-[2rem] border border-white/10 backdrop-blur-3xl pointer-events-auto shadow-2xl relative overflow-hidden group">
        {/* Subtle animated light beam across navbar */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent skew-x-[45deg] pointer-events-none"
        />
        
        <div 
          className="flex items-center gap-4 cursor-pointer group/logo relative z-10"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black group-hover/logo:rotate-[15deg] transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]">
            <Cpu size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-black tracking-[-0.05em] uppercase text-white leading-none">
              MentorStack<span className="text-emerald-500">.</span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-500/50 mt-1">Ultra Protocol</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[10px] font-display font-black uppercase tracking-[0.3em] text-white/30 relative z-10">
          {[
            { label: 'Protocols', href: '#features' },
            { label: 'Network', href: '#company' },
            { label: 'Roadmap', href: '#roadmap' },
            { label: 'Investment', href: '#pricing' }
          ].map((link, i) => (
            <a 
              key={i} 
              href={link.href} 
              className="hover:text-emerald-400 transition-all hover:scale-110 relative group/link"
            >
              {link.label}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-emerald-500 rounded-full group-hover/link:w-full transition-all" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6 relative z-10">
          <div className="hidden xl:flex items-center gap-4 px-5 py-2 rounded-full bg-white/5 border border-white/5 mr-4">
             <div className="flex items-center gap-2 group cursor-default">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Nexus Online</span>
             </div>
             <div className="w-px h-3 bg-white/10 mx-2" />
             <div className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-emerald-500/40" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">v4.0.2</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
              className="hidden sm:flex h-12 px-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border-white/5 hover:bg-white/5 hover:border-white/10 active:scale-95"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="h-12 px-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] active:scale-95"
            >
              Get Started
            </Button>
          </div>
          
          <button className="lg:hidden p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
