import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, CheckCircle2, Zap, 
  Rocket, ShieldCheck, MessageSquare, 
  Trophy, Star, ArrowRight
} from 'lucide-react';
import { Button, Card, Badge } from './ui';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ 
  isOpen, 
  onClose,
  title = "Unlock Your Full Potential",
  description = "Get unlimited access to everything OLYNQ Stack has to offer."
}) => {
  const benefits = [
    { icon: <Rocket className="text-emerald-400" />, title: "Full Career Paths", desc: "Access all 26+ structured learning paths from zero to hired." },
    { icon: <Code2 className="text-blue-400" />, title: "Premium Projects", desc: "Build production-grade apps for your professional portfolio." },
    { icon: <MessageSquare className="text-purple-400" />, title: "24/7 AI Mentor", desc: "Get instant code reviews and guidance whenever you're stuck." },
    { icon: <ShieldCheck className="text-amber-400" />, title: "Verified Certificates", desc: "Earn credentials that prove your skills to employers." },
    { icon: <Zap className="text-emerald-400" />, title: "Priority Support", desc: "Get your questions answered faster by our technical team." }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0D0D0E] border border-white/10 rounded-[3rem] p-0 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-emerald-500/10 to-transparent relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40"
              >
                <X size={24} />
              </button>
              
              <div className="space-y-4 max-w-md">
                <Badge className="bg-emerald-500 text-black border-none px-3 py-1 rounded-lg font-black uppercase text-[10px] tracking-widest">
                  <Sparkles size={12} className="mr-2" fill="currentColor" />
                  OLYNQ Stack Pro
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.9]">{title}</h2>
                <p className="text-white/40 font-medium">{description}</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="p-8 md:p-12 space-y-8 flex-grow overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-1 gap-6">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-emerald-500/30 transition-colors">
                      {benefit.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{benefit.title}</h4>
                      <p className="text-sm text-white/40 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="p-8 md:p-12 bg-white/[0.02] border-t border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black tracking-tighter text-emerald-500">₦10,000</span>
                    <span className="text-xs text-white/20 font-black uppercase tracking-widest">/ month</span>
                  </div>
                  <p className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Less than ₦350/day</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Limited Time Offer</p>
                  <p className="text-xs font-bold text-emerald-500 italic">Early access pricing</p>
                </div>
              </div>

              <Button 
                variant="premium"
                fullWidth
                className="h-20 rounded-3xl shadow-2xl shadow-emerald-500/20 text-lg"
                onClick={() => {
                  // In a real app, this would trigger the payment flow
                  window.location.href = '/profile';
                }}
              >
                Unlock Full Access
                <ArrowRight size={20} className="ml-3" />
              </Button>
              
              <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-widest">
                Cancel anytime • Secure payment • Instant access
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper for icons used in benefits
const Code2 = ({ className }: { className?: string }) => <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>;
