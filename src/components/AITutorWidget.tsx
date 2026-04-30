import React, { useState } from 'react';
import { Send, Bot, Sparkles, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const AITutorWidget: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Dispatch event to open full chat with this prompt
    window.dispatchEvent(new CustomEvent('mentor-chat-prompt', { 
      detail: { prompt: query } 
    }));
    setQuery('');
  };

  return (
    <div className="glass-premium p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
        <Bot size={120} />
      </div>
      
      <div className="space-y-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="font-black text-xl tracking-tighter uppercase">AI Technical Support</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Ask anything about your curriculum</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask MentorStack AI (e.g. 'How do React hooks work?')"
            className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Send size={18} />
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          {['Explain Closure', 'CSS Flexbox help', 'SQL Join types'].map((q) => (
            <button 
              key={q}
              onClick={() => {
                window.dispatchEvent(new CustomEvent('mentor-chat-prompt', { 
                  detail: { prompt: q } 
                }));
              }}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
