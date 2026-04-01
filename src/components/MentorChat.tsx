import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

export const MentorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-mentor-chat', handleOpen as any);
    return () => window.removeEventListener('open-mentor-chat', handleOpen as any);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-[#121214] border border-white/10 rounded-2xl shadow-2xl z-[100] flex flex-col max-h-[600px]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
            <MessageSquare size={18} />
          </div>
          <span className="font-bold">AI Mentor</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-lg">
          <X size={18} className="text-white/40" />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto min-h-[300px]">
        <p className="text-white/40 text-sm text-center italic">Ask me anything about your learning path!</p>
      </div>
      <div className="p-4 border-t border-white/5">
        <input 
          type="text" 
          placeholder="Type your message..." 
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>
    </div>
  );
};
