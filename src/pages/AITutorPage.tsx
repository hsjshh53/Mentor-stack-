import React, { useState } from 'react';
import { Button, Card, Badge } from '../components/ui';
import { MessageSquare, Sparkles, Send, Bot, User, Code2, Terminal, BookOpen } from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your AI Tutor. How can I help you master your tech journey today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question! Let's break it down into simple steps..." }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <div className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
            <Sparkles size={20} fill="currentColor" />
          </div>
          <div className="space-y-0.5">
            <span className="font-black tracking-tighter text-xl">AI Tutor</span>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Always Online
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest text-white/40 hover:text-white transition-all">
            <BookOpen size={14} />
            Study Mode
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest text-white/40 hover:text-white transition-all">
            <Code2 size={14} />
            Code Review
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 max-w-4xl mx-auto w-full">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.role === 'assistant' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
              {msg.role === 'assistant' ? <Bot size={24} /> : <User size={24} />}
            </div>
            <div className={`space-y-2 max-w-2xl ${msg.role === 'user' ? 'text-right' : ''}`}>
              <div className={`p-6 rounded-2xl text-lg leading-relaxed ${msg.role === 'assistant' ? 'bg-white/[0.03] border border-white/5 text-white/80' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
                {msg.content}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                {msg.role === 'assistant' ? 'AI Mentor' : 'You'} • Just now
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your mentor anything..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-16 py-6 text-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
          >
            <Send size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};
