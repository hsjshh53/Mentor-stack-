import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Input } from './ui';
import { getMentorAdvice } from '../lib/gemini';
import { useUserData } from '../hooks/useUserData';
import { Sparkles, Send, X, MessageSquare, Bot } from 'lucide-react';

export const MentorChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { progress } = useUserData();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-mentor-chat', handleOpen);
    return () => window.removeEventListener('open-mentor-chat', handleOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-8 w-16 h-16 rounded-2xl bg-emerald-500 text-black shadow-2xl shadow-emerald-500/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-0 right-0 md:bottom-28 md:right-8 w-full md:w-[400px] h-full md:h-[600px] z-[60]"
          >
            <Card className="h-full flex flex-col p-0 overflow-hidden border-white/20 shadow-2xl shadow-black/50">
              {/* Header */}
              <div className="p-6 bg-emerald-500 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center text-black">
                    <Bot size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">MentorStack AI</h3>
                    <p className="text-[10px] font-bold uppercase text-black/60 tracking-widest">Your Personal Mentor</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-black/10 text-black transition-all">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#0A0A0B]">
                {messages.length === 0 && (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-white/20">
                      <Sparkles size={32} />
                    </div>
                    <p className="text-white/40 text-sm max-w-[200px] mx-auto leading-relaxed">
                      "I am MentorStack, your personal coding mentor. Ask me anything about your current path!"
                    </p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-emerald-500 text-black rounded-tr-none shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-6 bg-[#0A0A0B] border-t border-white/5">
                <div className="relative">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="pr-14 h-14"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-600 transition-all disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
