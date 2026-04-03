import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { CareerPath, CareerCategory } from '../types/index';
import { useUserData } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { LoadingScreen } from '../components/LoadingScreen';
import { ALL_CAREER_PATHS } from '../constants/allPaths';

const categories: CareerCategory[] = [
  'Core Software Development',
  'Data & AI',
  'Security',
  'Infrastructure & Systems',
  'Specialized Development',
  'Product & Design',
  'Emerging High-Income Skills'
];

const categoryDescriptions: Record<string, string> = {
  'Core Software Development': 'Master the fundamentals of building modern web, mobile, and desktop applications.',
  'Data & AI': 'Harness the power of data, machine learning, and artificial intelligence to solve complex problems.',
  'Security': 'Protect systems, networks, and applications from digital threats and cyber attacks.',
  'Infrastructure & Systems': 'Build and manage the scalable infrastructure that powers the modern web.',
  'Specialized Development': 'Dive into niche fields like game development, AR/VR, and blockchain technology.',
  'Product & Design': 'Create beautiful, intuitive, and user-centered digital experiences.',
  'Emerging High-Income Skills': 'Stay ahead of the curve with the most in-demand skills in the modern tech landscape.'
};

const IconComponent = ({ name }: { name?: string }) => {
  const Icon = (Icons as any)[name || 'HelpCircle'] || Icons.HelpCircle;
  return <Icon size={24} strokeWidth={2.5} />;
};

export const OnboardingPage: React.FC = () => {
  const [selected, setSelected] = useState<CareerPath | null>(null);
  const { updateProgress, loading } = useUserData();
  const navigate = useNavigate();

  const handleComplete = async () => {
    if (!selected) return;
    await updateProgress({ 
      selectedPath: selected,
      unlockedPaths: [selected]
    });
    navigate('/dashboard');
  };

  if (loading) return <LoadingScreen />;

  const allPaths = ALL_CAREER_PATHS;

  return (
    <div className="min-h-screen bg-[#050506] text-white px-6 py-32 flex flex-col items-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-32 relative z-10"
      >
        <Badge className="mb-8 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-8 py-2.5 rounded-full font-black tracking-widest">
          Career Path Selection
        </Badge>
        <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tight text-gradient leading-[1.05]">
          Choose your <br /> <span className="text-emerald-400">Main Path</span>
        </h1>
        <p className="text-white/40 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-medium">
          MentorStack will guide your journey step-by-step. <br className="hidden md:block" />
          You can explore other skills later.
        </p>
      </motion.div>

      <div className="w-full max-w-7xl relative z-10 mb-48 space-y-32">
        {categories.map((category, catIdx) => (
          <motion.div 
            key={category} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-500/40 font-black text-sm tracking-widest uppercase">0{catIdx + 1}</span>
                  <h2 className="text-4xl font-black tracking-tight text-white/90">{category}</h2>
                </div>
                <p className="text-white/30 text-lg font-medium max-w-xl">{categoryDescriptions[category]}</p>
              </div>
              <div className="h-px hidden md:block flex-grow bg-white/[0.05] mx-12 mb-4" />
              <Badge className="bg-white/[0.03] text-white/20 border-white/[0.05] px-6 py-2 h-fit">
                {allPaths.filter(p => p.category === category).length} Paths Available
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {allPaths.filter(p => p.category === category).map((path, i) => (
                <motion.div
                  key={path.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card 
                    onClick={() => path.status !== 'locked' && setSelected(path.title as CareerPath)}
                    className={`h-full flex flex-col p-10 relative group transition-all duration-700 rounded-[3rem] ${
                      path.status === 'locked' ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'
                    } ${
                      selected === path.title 
                        ? 'bg-emerald-500/[0.1] border-emerald-500/50 ring-1 ring-emerald-500/30 shadow-[0_40px_80px_-15px_rgba(16,185,129,0.2)]' 
                        : path.recommended 
                          ? 'border-white/[0.15] bg-white/[0.06] hover:bg-white/[0.08]' 
                          : 'border-white/[0.08] hover:border-white/[0.15]'
                    }`}
                  >
                    {path.recommended && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-emerald-500 text-black border-none font-black shadow-2xl shadow-emerald-500/40 px-6 py-2 rounded-full">Recommended</Badge>
                      </div>
                    )}
                    
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 transition-all duration-700 ${
                      selected === path.title 
                        ? 'bg-emerald-500 text-black shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] scale-110 rotate-3' 
                        : 'bg-white/[0.05] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white/80 group-hover:scale-105 group-hover:-rotate-3'
                    }`}>
                      <IconComponent name={path.icon} />
                    </div>
                    
                    <div className="space-y-4 mb-8">
                      <h3 className={`text-2xl font-black tracking-tight transition-colors duration-700 ${selected === path.title ? 'text-emerald-400' : 'text-white'}`}>
                        {path.title}
                      </h3>
                      <p className="text-base text-white/30 leading-relaxed font-medium line-clamp-3">
                        {path.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2.5 mt-auto">
                      {path.skills?.slice(0, 3).map(skill => (
                        <Badge 
                          key={skill} 
                          className={`transition-colors duration-700 border-none ${
                            selected === path.title 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-white/[0.04] text-white/40'
                          }`}
                        >
                          {skill}
                        </Badge>
                      ))}
                      {(path.skills?.length || 0) > 3 && (
                        <span className="text-[10px] font-black text-white/20 self-center ml-1">+{path.skills!.length - 3}</span>
                      )}
                    </div>

                    <div className={`absolute bottom-8 right-8 transition-all duration-700 ${selected === path.title ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                        <Icons.Check size={20} strokeWidth={3} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50"
          >
            <div className="glass-premium p-6 rounded-[3rem] border border-emerald-500/30 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex items-center gap-8">
              <div className="hidden md:flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">Selected Path</span>
                <span className="text-xl font-black text-white truncate max-w-[200px]">{selected}</span>
              </div>
              <Button fullWidth onClick={handleComplete} className="group h-20 text-xl font-black tracking-tight shadow-2xl shadow-emerald-500/40 rounded-[2rem] flex-grow">
                Start My Journey
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
