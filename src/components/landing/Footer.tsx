import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Instagram, ArrowUpRight, Cpu, Globe, Zap, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="px-6 py-40 bg-[#050506] border-t border-white/5 relative overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-20 lg:gap-12 pb-32">
          
          <div className="lg:col-span-2 space-y-12">
            <div 
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-14 h-14 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center text-black shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)] group-hover:rotate-12 transition-transform duration-500">
                <Cpu size={28} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-display font-black tracking-[-0.05em] uppercase text-white leading-none">
                  OLYNQ Stack<span className="text-emerald-500">.</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/50 mt-1">Global Academy v4.0</span>
              </div>
            </div>

            <p className="max-w-xs text-white/40 text-lg font-medium leading-relaxed">
              The elite acceleration protocol architected for the next generation of sovereign engineers. Engineering excellence as a standard, not an option.
            </p>

            <div className="flex items-center gap-4">
              {[Github, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all active:scale-95 group"
                >
                  <Icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>

            <div className="pt-8 flex items-center gap-6">
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
                  <Globe size={12} />
                  System Online
               </div>
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400">
                  <ShieldCheck size={12} />
                  Verified Nexus
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 lg:col-span-4 gap-12 lg:gap-8">
            <div>
              <h4 className="text-[11px] font-display font-black uppercase tracking-[0.4em] text-white/20 mb-10">Protocols</h4>
              <ul className="space-y-6 text-white/40 font-bold">
                <FooterLink href="#features">AI Synapse</FooterLink>
                <FooterLink href="#roadmap">Career Nexus</FooterLink>
                <FooterLink href="#pricing">Investments</FooterLink>
                <FooterLink href="/academy">Elite Academy</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-display font-black uppercase tracking-[0.4em] text-white/20 mb-10">Resources</h4>
              <ul className="space-y-6 text-white/40 font-bold">
                <FooterLink href="/docs">Global Docs</FooterLink>
                <FooterLink href="/blog">Engineering Logs</FooterLink>
                <FooterLink href="/community">Community Grid</FooterLink>
                <FooterLink href="/career">Candidate Portal</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-display font-black uppercase tracking-[0.4em] text-white/20 mb-10">Network</h4>
              <ul className="space-y-6 text-white/40 font-bold">
                <FooterLink href="/partners">Strategic Allies</FooterLink>
                <FooterLink href="/enterprise">Enterprise Tier</FooterLink>
                <FooterLink href="/status">System Status</FooterLink>
                <FooterLink href="/nexus">The Nexus API</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-display font-black uppercase tracking-[0.4em] text-white/20 mb-10">Philosophy</h4>
              <ul className="space-y-6 text-white/40 font-bold">
                <FooterLink href="/privacy">Privacy Trust</FooterLink>
                <FooterLink href="/terms">Service Protocols</FooterLink>
                <FooterLink href="/security">Security Grid</FooterLink>
                <FooterLink href="/values">Mastery Manual</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12 text-[10px] font-display font-black uppercase tracking-[0.5em] text-white/10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <p>© 2026 OLYNQ STACK ULTRA — THE PREEMINENT ENGINEERING ACCELERATOR</p>
            <div className="flex items-center gap-6">
               <span className="hover:text-white/40 cursor-pointer transition-colors">Global Presence</span>
               <span className="w-1 h-1 rounded-full bg-white/10" />
               <span className="hover:text-white/40 cursor-pointer transition-colors">Distributed Nexus</span>
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 text-emerald-500/40 hover:text-emerald-400 transition-colors cursor-pointer px-4 py-2 rounded-xl border border-emerald-500/10 hover:border-emerald-500/30"
          >
             <Zap size={14} fill="currentColor" />
             Synchronized Peak
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="flex items-center gap-1 group hover:text-emerald-400 transition-all duration-300 hover:translate-x-2"
    >
      {children}
      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 text-emerald-500 ml-1" />
    </a>
  </li>
);
