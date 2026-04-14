import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui';
import { Rocket, GraduationCap, Code2, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/ui';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden selection:bg-indigo-500/30">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-20 max-w-7xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-xl shadow-emerald-500/5"
        >
          <Sparkles size={14} fill="currentColor" />
          <span>The Future of Tech Education</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] uppercase"
        >
          Become a <span className="text-emerald-500 text-gradient">Job-Ready</span> <br/>
          Developer with AI Guidance
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Master full career paths or specific programming languages. <br/>
          Learn step-by-step, build real projects, and create a portfolio that gets you hired.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button 
            onClick={() => navigate('/signup')}
            className="group h-20 px-12 text-sm font-black uppercase tracking-[0.2em] rounded-3xl bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
          >
            Start Your Career
            <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/login')}
            className="h-20 px-12 text-xs font-black uppercase tracking-[0.2em] rounded-3xl border-white/10 hover:bg-white/5 transition-all active:scale-95"
          >
            Sign In
          </Button>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-12 border-t border-white/5"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">Trusted by developers from</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-20 grayscale">
            {['Google', 'Meta', 'Amazon', 'Netflix', 'Apple'].map(company => (
              <span key={company} className="text-2xl font-black tracking-tighter uppercase">{company}</span>
            ))}
          </div>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Value Stack Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Learning Experience</Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">The Value Stack</h2>
          <p className="text-white/40 text-lg font-medium">Everything you need to go from zero to hired.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { icon: <Sparkles size={24} />, title: "AI Mentor (24/7)", desc: "Instant help, code reviews, and guidance whenever you need it." },
            { icon: <Code2 size={24} />, title: "Real Projects", desc: "Build production-grade apps that prove your technical skills." },
            { icon: <Rocket size={24} />, title: "Portfolio System", desc: "Automatically generate a professional portfolio as you learn." },
            { icon: <GraduationCap size={24} />, title: "Structured Career Path", desc: "A clear, step-by-step roadmap tailored to industry demands." },
            { icon: <Trophy size={24} />, title: "Verified Certificate", desc: "Earn credentials that employers actually trust and verify." }
          ].map((item, i) => (
            <div 
              key={i}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl group hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between min-h-[300px]"
            >
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black tracking-tight group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                <p className="text-sm text-white/40 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Achievement Section */}
      <section className="px-6 py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">What You'll <br/><span className="text-emerald-500">Achieve.</span></h2>
              <p className="text-white/40 text-xl font-medium leading-relaxed">MentorStack isn't just about watching videos. It's about transformation.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Build real projects",
                "Create portfolio",
                "Learn real tools",
                "Become job-ready"
              ].map((achievement, i) => (
                <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ArrowRight size={16} />
                  </div>
                  <span className="font-bold text-lg">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Limited Time Access</p>
                <h3 className="text-4xl font-black tracking-tighter uppercase">Free for Early Adopters</h3>
                <p className="text-white/40 font-medium">Join the next generation of developers today.</p>
              </div>
              
              <div className="py-8 border-y border-white/5">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter text-emerald-500">FREE</span>
                  <span className="text-xl text-white/20 font-black uppercase tracking-widest">/ forever</span>
                </div>
                <p className="mt-4 text-emerald-400/60 font-black uppercase tracking-[0.2em] text-xs">Start your journey today</p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-white/40 italic">"Join 5,000+ students learning for free"</p>
                <Button 
                  onClick={() => navigate('/signup')}
                  fullWidth
                  className="h-20 rounded-3xl shadow-2xl shadow-emerald-500/20"
                >
                  Start Learning Now
                </Button>
              </div>
            </div>
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[120px] -z-10" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <GraduationCap />, title: "Career Paths", desc: "From Frontend to Full-Stack, we have a clear roadmap for your career." },
            { icon: <Code2 />, title: "Programming Languages", desc: "Master HTML, CSS, JavaScript, Python, Rust, and 15+ other languages." },
            { icon: <Rocket />, title: "Real Projects", desc: "Build real-world applications and build a portfolio that gets you hired." },
            { icon: <Trophy />, title: "Gamified Learning", desc: "Earn XP, level up, and maintain streaks to stay motivated every day." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed text-lg font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 max-w-5xl mx-auto text-center">
        <div className="p-16 rounded-[4rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 border border-white/5 relative overflow-hidden group">
          <div className="relative z-10 space-y-8">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-[0.3em]">Start Today</Badge>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Unlock Your <br/>Full Potential.</h2>
            <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium leading-relaxed">Get unlimited AI mentoring, premium projects, verified certificates, and priority job placement assistance.</p>
            <Button 
              onClick={() => navigate('/signup')}
              className="h-20 px-16 text-xs font-black uppercase tracking-[0.2em] rounded-3xl shadow-2xl shadow-emerald-500/20"
            >
              Start Your Journey
              <Sparkles size={20} className="ml-3" />
            </Button>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
            <Sparkles size={400} />
          </div>
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
