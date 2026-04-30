import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, ShieldCheck, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Lateefat Abdullahi",
    role: "University Student, Ilorin",
    content: "I used to be confused about where to start with Web Development, but MentorStack broke everything down for me. Now I can build simple website layouts with HTML and CSS confidently.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lateefat",
    stats: "Frontend Foundations"
  },
  {
    name: "Chinedu Okeke",
    role: "NYSC Member, Ilorin",
    content: "The structured learning here is exactly what I needed during my service year. I went from zero coding knowledge to finally understanding how JavaScript functions work without feeling overwhelmed.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chinedu",
    stats: "Logic Specialist"
  },
  {
    name: "Samuel Adebayo",
    role: "Secondary School Graduate, Ilorin",
    content: "I wanted to learn a skill before heading to Uni, and MentorStack has been so helpful. The step-by-step approach helped me stay consistent with my practice every single day.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samuel",
    stats: "Pre-Degree Mastery"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="px-6 py-40 bg-[#050506]/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.4em] text-emerald-400"
          >
            <ShieldCheck size={14} fill="currentColor" />
            Verified Member Experiences
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.85] text-white">
            Built for the <br/> <span className="text-emerald-500 italic">Ambitious.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03)_0%,transparent_70%)] pointer-events-none" />
          
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -15, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.15, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1],
                y: { duration: 0.4, ease: "easeOut" },
                scale: { duration: 0.4, ease: "easeOut" }
              }}
              className="p-10 md:p-14 rounded-[4rem] glass border border-white/10 hover:border-emerald-500/30 group transition-all duration-700 relative overflow-hidden flex flex-col justify-between backdrop-blur-2xl shadow-2xl shadow-black/50"
            >
              <div className="absolute top-0 right-0 p-10 text-white/[0.02] group-hover:text-emerald-500/10 transition-colors pointer-events-none">
                <Quote size={120} fill="currentColor" />
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={14} fill="#10b981" className="text-emerald-500/80" />
                  ))}
                </div>
                
                <p className="text-xl font-medium leading-relaxed text-white/70 italic-none">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-16 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-[2rem] overflow-hidden border border-white/10 scale-95 group-hover:scale-100 transition-transform duration-700">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   <div>
                      <h4 className="text-lg font-display font-black uppercase tracking-tight text-white mb-0.5">{t.name}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{t.role}</p>
                   </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:bg-emerald-500 group-hover:text-black group-hover:border-transparent transition-all">
                   {t.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/10 max-w-2xl mx-auto"
        >
          Community-reported member experiences. Results vary based on individual effort, prior background, and professional focus. Portfolio and project verification outcomes are reflective of personal dedication to the MentorStack curriculum.
        </motion.p>
      </div>
    </section>
  );
};
