import React from 'react';
import { Button, Card } from './ui';
import { Sparkles, CheckCircle2, Zap, ArrowRight, Star, Trophy } from 'lucide-react';

export const PremiumUpsell: React.FC = () => {
  return (
    <Card className="p-10 bg-emerald-500/5 border-emerald-500/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] translate-y-1/2 -translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-500" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
        <div className="space-y-8 max-w-2xl">
          <div className="flex items-center gap-3 text-emerald-400 font-black text-sm uppercase tracking-widest">
            <Sparkles size={20} fill="currentColor" />
            Premium Access
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter leading-[0.9]">Unlock Your <span className="text-emerald-400">Full Potential</span></h2>
            <p className="text-white/60 text-xl font-medium leading-relaxed">Get unlimited access to all career paths, advanced AI mentoring, real-world projects, and verified certifications.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Zap size={20} />, text: 'Unlimited AI Mentoring' },
              { icon: <Star size={20} />, text: 'Advanced Career Paths' },
              { icon: <Trophy size={20} />, text: 'Verified Certificates' },
              { icon: <CheckCircle2 size={20} />, text: 'Priority Support' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 font-bold">
                <div className="text-emerald-500">{feature.icon}</div>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 bg-white/[0.02] border border-white/5 p-10 rounded-3xl backdrop-blur-xl">
          <div className="text-center space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Monthly Plan</div>
            <div className="text-6xl font-black tracking-tighter">$29<span className="text-2xl text-white/40">/mo</span></div>
          </div>
          <Button className="w-full px-12 py-6 text-xl flex items-center gap-3 shadow-lg shadow-emerald-500/20">
            Upgrade Now
            <ArrowRight size={24} />
          </Button>
          <p className="text-white/20 text-xs font-black uppercase tracking-widest">Cancel anytime • No hidden fees</p>
        </div>
      </div>
    </Card>
  );
};
