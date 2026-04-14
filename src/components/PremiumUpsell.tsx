import React from 'react';
import { motion } from 'motion/react';
import { Card, Button, Badge } from './ui';
import { Check, Sparkles, Zap } from 'lucide-react';

interface PremiumUpsellProps {
  onUpgrade?: () => void;
  className?: string;
}

export const PremiumUpsell: React.FC<PremiumUpsellProps> = ({ onUpgrade, className = '' }) => {
  const benefits = [
    'Unlock all 26+ Professional Career Paths',
    'Access to Real-World Capstone Projects',
    'Industry-Recognized Verified Certificates',
    'Priority AI Mentor Support (24/7)',
    'Advanced Skills Assessment & Tests',
    'GitHub Portfolio Integration'
  ];

  return (
    <Card className={`relative overflow-hidden border-emerald-500/30 bg-emerald-500/[0.02] ${className}`}>
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles size={120} className="text-emerald-500" />
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-grow space-y-6">
          <Badge className="bg-emerald-500 text-black border-none font-black">MentorStack Pro</Badge>
          <h2 className="text-4xl font-black tracking-tight leading-tight">
            Accelerate your career <br /> with <span className="text-emerald-400">Pro Access</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl font-medium">
            Go beyond the basics. Build real-world projects, earn verified certificates, and get the complete MentorStack experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 text-white/60">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-emerald-500" />
                </div>
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-auto flex flex-col gap-4 min-w-[280px]">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] text-center space-y-4">
            <div className="text-white/40 text-sm font-bold uppercase tracking-widest">Monthly Plan</div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-black">$29</span>
              <span className="text-white/30 font-medium">/month</span>
            </div>
            <Button variant="premium" fullWidth onClick={onUpgrade} className="h-16 rounded-2xl">
              <Zap size={18} fill="currentColor" />
              Upgrade Now
            </Button>
            <p className="text-[10px] text-white/20 font-medium">Cancel anytime. 7-day money back guarantee.</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
