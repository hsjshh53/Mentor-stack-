import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui';
import { Rocket, GraduationCap, Code2, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-sm font-medium mb-8"
        >
          <Sparkles size={16} />
          <span>Built under OLYNQ SOCIAL by Ajis Abdulrasak Olayinka</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          Mentor<span className="text-emerald-500">Stack</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Learn coding with a real AI mentor, not just a chatbot. Your personal coding mentor guiding you from beginner to full-stack step by step.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={() => navigate('/signup')}
            className="group px-10 py-5 text-lg"
          >
            Start Your Journey
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="secondary"
            onClick={() => navigate('/login')}
            className="px-10 py-5 text-lg"
          >
            Sign In
          </Button>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <GraduationCap />, title: "Structured Paths", desc: "From Frontend to Full-Stack, we have a clear roadmap for your career." },
            { icon: <Code2 />, title: "Hands-on Projects", desc: "Build real-world applications and build a portfolio that gets you hired." },
            { icon: <Trophy />, title: "Gamified Learning", desc: "Earn XP, level up, and maintain streaks to stay motivated every day." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/5 text-center text-white/30 text-sm">
        <p>© 2026 MentorStack. All rights reserved.</p>
        <p className="mt-2">Built under OLYNQ SOCIAL by Ajis Abdulrasak Olayinka</p>
      </footer>
    </div>
  );
};
