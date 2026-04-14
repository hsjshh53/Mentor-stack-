import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export const LoadingScreen: React.FC<{ message?: string }> = ({ message = "LOADING MENTORSTACK" }) => {
  return (
    <div className="fixed inset-0 bg-[#0A0A0B] z-[100] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-24 h-24 rounded-[2rem] bg-emerald-500 flex items-center justify-center text-black mb-8 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
      >
        <Zap size={48} fill="currentColor" />
      </motion.div>
      
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
        </div>
        <p className="text-emerald-500 font-black tracking-[0.2em] text-sm uppercase">
          {message}
        </p>
      </div>
    </div>
  );
};
