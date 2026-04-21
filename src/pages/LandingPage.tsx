import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../components/ui';
import { 
  Rocket, 
  GraduationCap, 
  Code2, 
  Trophy, 
  ArrowRight, 
  Sparkles,
  Star,
  Database,
  Palette,
  Target,
  Bot
} from 'lucide-react';
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
                <p className="text-sm font-bold text-white/40 italic">"Join 10,000+ students learning for free"</p>
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

      {/* Testimonials Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Success Stories</Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">From Student to <span className="text-emerald-500">Professional.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "Software Engineer @ Google", text: "MentorStack changed my career. The AI mentor is like having a private tutor from Silicon Valley on call 24/7." },
            { name: "Sarah Smith", role: "Frontend Lead @ Vercel", text: "The curriculum is so deep. I learned more in 3 months here than I did in 4 years of college." },
            { name: "David Chen", role: "Full Stack Dev @ Stripe", text: "The projects are world-class. My portfolio stood out immediately when applying for top-tier roles." }
          ].map((t, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-6 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
                <Sparkles size={100} />
              </div>
              <div className="flex gap-1 text-emerald-500">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-lg font-medium text-white/70 leading-relaxed italic shrink-0 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-black font-black uppercase tracking-tighter shadow-lg shadow-emerald-500/20">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-[11px]">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-black">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the AI Mentors Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto bg-white/[0.01] border-y border-white/5 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Mentor Collective</Badge>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">Meet Your <br/><span className="text-emerald-500">Elite</span> Collective.</h2>
              <p className="text-white/40 text-xl font-medium leading-relaxed max-w-lg">
                Your AI mentor is not just one bot—it's a collective intelligence trained on the world's most successful engineering workflows, architectural patterns, and career strategies.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Architect Master", icon: <Database />, desc: "Focuses on system design, microservices, and database optimization." },
                { title: "UI Alchemist", icon: <Palette />, desc: "Expert in animation, accessibility, and high-fidelity frontend engineering." },
                { title: "Career Strategist", icon: <Target />, desc: "Hiring manager insights for resumes, interviews, and salary negotiation." }
              ].map((m, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 active:scale-[0.98] transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-widest text-[11px] mb-2">{m.title}</h4>
                    <p className="text-[9px] uppercase tracking-widest text-white/30 font-black">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-20 bg-emerald-500/10 blur-[150px] group-hover:bg-emerald-500/20 transition-all duration-1000" />
            <div className="relative w-full aspect-square rounded-[4rem] bg-gradient-to-br from-[#0D0D0E] to-[#161618] border border-white/5 p-12 flex items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center gap-8 text-center">
                <div className="w-40 h-40 rounded-[3rem] bg-emerald-500 flex items-center justify-center text-black shadow-2xl shadow-emerald-500/40 relative z-10">
                   <Bot size={80} strokeWidth={2.5} />
                   <div className="absolute -bottom-4 right-0 px-4 py-2 rounded-2xl bg-black border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-xl">LIVE STATUS: ACTIVE</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tighter uppercase whitespace-nowrap">MentorStack AI V2.0</h3>
                  <p className="text-white/20 font-black uppercase tracking-[0.3em] text-[10px]">Silicon Valley Collective Intel</p>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="w-1 h-8 rounded-full bg-emerald-500/40 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="p-16 md:p-24 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] -z-10" />
          <div className="max-w-2xl space-y-10 relative z-10">
            <div className="space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 font-black uppercase text-[10px] tracking-[0.3em] rounded-full">Academy Insights</Badge>
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">Stay Ahead in <br/><span className="text-emerald-500">Tech.</span></h2>
              <p className="text-white/40 text-lg font-medium max-w-lg">Get weekly professional insights, new curriculum updates, and early access to academy programs.</p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your professional email"
                className="flex-grow h-20 px-10 rounded-3xl bg-white/5 border border-white/5 focus:border-emerald-500/30 transition-all text-lg font-medium placeholder:text-white/10"
              />
              <Button className="h-20 px-12 text-[10px] font-black uppercase tracking-[0.2em] rounded-3xl shrink-0 shadow-2xl shadow-emerald-500/40">
                Join Waitlist
              </Button>
            </form>
            <p className="text-[11px] font-medium text-white/20 uppercase tracking-widest">No spam. Only high-caliber technical wisdom.</p>
          </div>
          
          <div className="absolute -bottom-20 -right-20 opacity-10 rotate-12 pointer-events-none">
             <Rocket size={400} />
          </div>
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
        <p className="mt-2">Built under OLYNQ SOCIAL by Ajia Abdulrasak Olayinka</p>
      </footer>
    </div>
  );
};
