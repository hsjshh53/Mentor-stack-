import React from 'react';
import { Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center text-center space-y-4">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={24} />
    </div>
    <h3 className="text-xl font-bold text-white">Loading MentorStack...</h3>
  </div>
);
