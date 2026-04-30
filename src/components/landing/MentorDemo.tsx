import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Zap, Terminal, Sparkles, Send } from 'lucide-react';

export const MentorDemo: React.FC = () => {
  return (
    <section className="px-6 py-40 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute top-[10%] left-[-20%] w-[60%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-indigo-400"
          >
            <Zap size={14} fill="currentColor" />
            24/7 Neural Intelligence
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
            AI Mentorship <br/> <span className="text-indigo-500 italic">Redefined.</span>
          </h2>
          
          <p className="max-w-xl text-white/40 text-xl font-medium leading-relaxed">
            Stop searching StackOverflow. Our AI Synapse is trained on the architectural decisions of the world's top 1% engineers. It doesn't just give answers—it builds your intuition.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-6">
            {[
              { label: "Response Latency", value: "85ms" },
              { label: "Knowledge Depth", value: "Doctoral" },
              { label: "Mentor Persona", value: "Staff Lead" },
              { label: "Synaptic Sync", value: "Real-time" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                 <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</h5>
                 <p className="text-3xl font-display font-black text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          {/* Animated Glow Backdrops */}
          <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] -z-10 group-hover:bg-indigo-500/20 transition-colors duration-1000" />
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[3rem] border border-white/10 bg-[#0A0A0B] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="h-16 border-b border-white/5 bg-white/[0.03] flex items-center justify-between px-8">
               <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-black shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                   <Bot size={18} fill="currentColor" />
                 </div>
                 <div>
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">AI Synapse Mentor</h4>
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500/60">Sovereign Active</span>
                   </div>
                 </div>
               </div>
               <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
               </div>
            </div>

            {/* Chat Body */}
            <div className="p-8 space-y-8 h-[450px] overflow-hidden relative">
               <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 shrink-0 mt-1 flex items-center justify-center text-white/40">
                     <MessageSquare size={16} />
                  </div>
                  <div className="space-y-3">
                     <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/5 text-sm font-medium text-white/70 max-w-[85%]">
                        How should I architect a distributed real-time messaging system using WebSockets? I want to ensure absolute horizontal scalability.
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-2">Sent 09:41 AM</span>
                  </div>
               </div>

               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className="flex gap-5 flex-row-reverse"
               >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-black shrink-0 mt-1 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                     <Sparkles size={20} fill="currentColor" />
                  </div>
                  <div className="space-y-3 items-end flex flex-col">
                     <div className="px-6 py-4 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-sm font-medium text-indigo-100 max-w-[85%] leading-relaxed shadow-2xl">
                        To achieve sovereign scalability, you must decouple the WebSocket handling from the business logic layer. <br/><br/>
                        1. Use a <span className="text-emerald-400 font-black">Redis Pub/Sub</span> backbone for inter-node communication.<br/>
                        2. Implement a <span className="text-emerald-400 font-black">Sticky Session</span> protocol at the load balancer level.<br/>
                        3. Utilize a stateless API for authentication before upgrading the connection.
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400/40 mr-2">Synapse AI Prototype</span>
                  </div>
               </motion.div>

               <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0B] to-transparent pointer-events-none" />
            </div>

            {/* Input Overlay Fake */}
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center gap-4">
               <div className="flex-1 h-14 bg-white/5 border border-white/10 rounded-2xl px-6 flex items-center justify-between group/input">
                  <div className="flex items-center gap-4">
                    <Terminal size={16} className="text-white/20 group-hover/input:text-indigo-400 transition-colors" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20">Ask the Synapse...</span>
                  </div>
                  <div className="flex gap-2">
                     {[Zap, MessageSquare].map((Icon, i) => (
                       <div key={i} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                          <Icon size={14} />
                       </div>
                     ))}
                  </div>
               </div>
               <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center text-black hover:bg-indigo-400 transition-all cursor-pointer group shadow-[0_10px_20px_-5px_rgba(99,102,241,0.5)]">
                  <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
