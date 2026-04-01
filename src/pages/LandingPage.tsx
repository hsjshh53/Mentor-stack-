import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
          <Zap size={24} fill="currentColor" />
        </div>
        <span className="font-black text-4xl tracking-tighter">MentorStack</span>
      </div>
      <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">
        Master the <span className="text-emerald-400">Future</span> of Tech
      </h1>
      <p className="text-white/60 text-xl max-w-2xl">
        Learn with an AI mentor that understands your journey. Personalized curriculum, real projects, and verified certificates.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/signup')} className="px-12 py-6 text-xl">Get Started</Button>
        <Button onClick={() => navigate('/login')} className="px-12 py-6 text-xl bg-white/5 text-white border border-white/10 hover:bg-white/10">Sign In</Button>
      </div>
    </div>
  );
};
