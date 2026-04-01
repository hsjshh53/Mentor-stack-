import React from 'react';
import { Button, Card } from './ui';
import { X, Sparkles, CheckCircle2, Zap, ArrowRight, Star, Trophy } from 'lucide-react';

export const PaywallModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  title?: string;
  description?: string;
}> = ({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-[#0A0A0B]/80 backdrop-blur-xl">
      <Card className="p-16 w-full max-w-4xl bg-emerald-500/5 border-emerald-500/10 relative overflow-hidden group shadow-2xl">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/5 rounded-2xl text-white/40 hover:text-white transition-all">
          <X size={24} />
        </button>

        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-[120px] translate-y-1/2 -translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-500" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-16 relative">
          <div className="space-y-10 max-w-2xl">
            <div className="flex items-center gap-3 text-emerald-400 font-black text-sm uppercase tracking-widest">
              <Sparkles size={24} fill="currentColor" />
              Premium Access
            </div>
            <div className="space-y-6">
              <h2 className="text-6xl font-black tracking-tighter leading-[0.85]">Master Your <span className="text-emerald-400">Tech Career</span></h2>
              <p className="text-white/60 text-2xl font-medium leading-relaxed">Get unlimited access to all career paths, advanced AI mentoring, real-world projects, and verified certifications.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: <Zap size={24} />, text: 'Unlimited AI Mentoring' },
                { icon: <Star size={24} />, text: 'Advanced Career Paths' },
                { icon: <Trophy size={24} />, text: 'Verified Certificates' },
                { icon: <CheckCircle2 size={24} />, text: 'Priority Support' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-white/80 font-bold text-lg">
                  <div className="text-emerald-500">{feature.icon}</div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-8 bg-white/[0.02] border border-white/5 p-12 rounded-[40px] backdrop-blur-xl w-full max-w-sm">
            <div className="text-center space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Monthly Plan</div>
              <div className="text-7xl font-black tracking-tighter">$29<span className="text-2xl text-white/40">/mo</span></div>
            </div>
            <Button className="w-full px-12 py-8 text-2xl flex items-center gap-4 shadow-lg shadow-emerald-500/20">
              Upgrade Now
              <ArrowRight size={32} />
            </Button>
            <p className="text-white/20 text-xs font-black uppercase tracking-widest">Cancel anytime • No hidden fees</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
