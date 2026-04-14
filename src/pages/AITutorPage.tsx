import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Input } from '../components/ui';
import { getMentorAdvice } from '../lib/gemini';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Send, X, MessageSquare, Bot, ArrowLeft, Zap, BrainCircuit, Terminal, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';

export const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { progress, loading: userLoading } = useUserData();
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (userLoading) return <LoadingScreen />;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await getMentorAdvice(userMsg, messages, progress);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Let's try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Explain React hooks",
    "How do I center a div?",
    "What is an API?",
    "Debug my code"
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-black text-lg tracking-tighter uppercase">AI Tutor</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Powered by MentorStack AI</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {progress.isPremium && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={12} fill="currentColor" />
              Pro Mode Active
            </div>
          )}
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden max-w-4xl mx-auto w-full">
        {/* Messages Area */}
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-8 scroll-smooth">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-[2rem] bg-emerald-500 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                  <Bot size={48} />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tight">Ready to level up?</h2>
                <p className="text-white/40 max-w-md mx-auto leading-relaxed">
                  "I am your MentorStack AI mentor, here to guide you step-by-step. I am a strict but friendly coach. Type your first question below to start."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {suggestions.map((s) => (
                  <button 
                    key={s}
                    onClick={() => setInput(s)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold text-white/40 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div 
              key={`${msg.role}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-white/5 text-white/20 border border-white/10' 
                    : 'bg-emerald-500 text-black shadow-emerald-500/20'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`p-6 rounded-3xl leading-relaxed text-sm whitespace-pre-wrap shadow-2xl ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-black rounded-tr-none shadow-emerald-500/10 font-medium' 
                    : 'bg-white/[0.03] text-white/80 border border-white/10 rounded-tl-none backdrop-blur-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="bg-white/5 p-6 rounded-3xl rounded-tl-none flex gap-2 items-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 shrink-0">
          <form onSubmit={handleSend} className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-emerald-500/20 rounded-[2rem] blur-xl opacity-0 focus-within:opacity-100 transition-opacity" />
            <div className="relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="pr-16 h-16 rounded-[2rem] bg-[#0D0D0E] border-white/10 focus:border-emerald-500/50"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2.5 top-2.5 w-11 h-11 rounded-2xl bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <p className="text-center text-[10px] text-white/20 mt-4 font-black uppercase tracking-widest">
            MentorStack AI can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </div>
  );
};
