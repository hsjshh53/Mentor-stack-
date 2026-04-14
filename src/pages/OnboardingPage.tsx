import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { CareerPath, ProgramCategory } from '../types/index';
import { useUserData } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ChevronRight, Target, Zap, Code, Rocket, CheckCircle2, Star, Trophy, Briefcase, GraduationCap } from 'lucide-react';
import { ref, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { LoadingScreen } from '../components/LoadingScreen';
import { CURRICULUM } from '../constants/curriculum';
import { useMemo, useEffect } from 'react';
import { DEFAULT_SKILLS } from '../constants/skills';

const categories: ProgramCategory[] = [
  'career-path',
  'coding-languages',
  'development-skill',
  'tool-foundation',
  'career-prep'
];

const categoryLabels: Record<string, string> = {
  'career-path': 'Career Development Programs',
  'coding-languages': 'Programming Languages',
  'programming-language': 'Programming Languages',
  'development-skill': 'Development Skill Programs',
  'tool-foundation': 'Tools & Foundations',
  'career-prep': 'Career Readiness'
};

const categoryDescriptions: Record<string, string> = {
  'career-path': 'Comprehensive programs designed to take you from zero to a professional role in a specific field.',
  'coding-languages': 'Learn core coding languages like HTML, CSS, JavaScript, Python, Java, C++, and more.',
  'programming-language': 'Learn core coding languages like HTML, CSS, JavaScript, Python, Java, C++, and more.',
  'development-skill': 'Master core development domains like Frontend, Backend, or DevOps with deep-dive programs.',
  'tool-foundation': 'Master essential tools and foundational concepts like Git, Databases, and System Design.',
  'career-prep': 'Prepare for the job market with resume building, interview prep, and professional networking.'
};

const IconComponent = ({ name }: { name?: string }) => {
  const Icon = (Icons as any)[name || 'HelpCircle'] || Icons.HelpCircle;
  return <Icon size={24} strokeWidth={2.5} />;
};

export const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [experience, setExperience] = useState('');
  const [selected, setSelected] = useState<CareerPath | null>(null);
  const [setupProgress, setSetupProgress] = useState(0);
  const { updateProgress, loading, progress } = useUserData();
  const navigate = useNavigate();
  const [dynamicSkills, setDynamicSkills] = useState<any[]>([]);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    get(skillsRef).then(snapshot => {
      if (snapshot.exists()) {
        setDynamicSkills(Object.values(snapshot.val()));
      }
    });
  }, []);

  const handleComplete = async () => {
    if (!selected) return;
    
    // Update user data with onboarding info
    const skill = dynamicSkills.find(s => s.title === selected);
    await updateProgress({ 
      selectedPath: selected,
      activeProgramId: skill?.id || '',
      unlockedPaths: progress?.unlockedPaths ? [...new Set([...progress.unlockedPaths, selected])] : [selected],
      goal,
      experienceLevel: experience
    });

    // Find the first lesson
    // First check dynamic curriculum
    if (skill) {
      // Redirect to the new Academy Path page for the selected program
      navigate(`/academy/${selected}`);
      return;
    }

    // Fallback to hardcoded curriculum
    const pathCurriculum = CURRICULUM[selected];
    const firstLessonId = pathCurriculum?.levels?.beginner?.modules?.[0]?.lessons?.[0];

    if (firstLessonId) {
      navigate(`/lesson/${firstLessonId}`);
    } else {
      navigate('/dashboard');
    }
  };

  const startSetup = () => {
    setStep(6);
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setSetupProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          handleComplete();
        }, 1000);
      }
    }, 40);
  };

  const allPaths = useMemo(() => {
    // Start with default skills as the base for all available paths
    const basePaths = DEFAULT_SKILLS.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category,
      icon: s.icon,
      status: s.status || 'active'
    }));

    // Merge with dynamic skills from Firebase
    const dynamic = dynamicSkills.map(s => ({
      id: s.id,
      title: s.title,
      description: s.description,
      category: s.category || 'career-path',
      icon: s.icon || 'Code',
      status: s.status || 'active'
    }));
    
    const merged = [...basePaths];
    dynamic.forEach(ds => {
      if (!merged.find(m => m.title === ds.title)) {
        merged.push(ds as any);
      }
    });
    return merged;
  }, [dynamicSkills]);

  const categoryLabelsWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = allPaths.filter(p => p.category === cat && p.status === 'active').length;
    });

    return {
      'career-path': `Career Development Programs (${counts['career-path'] || 0})`,
      'coding-languages': `Programming Languages (${counts['coding-languages'] || 0})`,
      'programming-language': `Programming Languages (${counts['programming-language'] || 0})`,
      'development-skill': `Development Skill Programs (${counts['development-skill'] || 0})`,
      'tool-foundation': `Tools & Foundations (${counts['tool-foundation'] || 0})`,
      'career-prep': `Career Readiness (${counts['career-prep'] || 0})`
    };
  }, [allPaths]);

  if (loading) return <LoadingScreen />;

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Welcome
        return (
          <motion.div 
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-3xl w-full text-center space-y-12"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)]">
                <Rocket size={48} className="text-black" />
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight text-gradient leading-tight">
                Welcome to <br /> <span className="text-emerald-400">MentorStack</span>
              </h1>
              <p className="text-white/40 text-xl md:text-2xl font-medium max-w-xl mx-auto leading-relaxed">
                Your AI mentor will guide you from beginner to job-ready developer.
              </p>
            </div>

            <Button 
              size="lg" 
              onClick={() => setStep(2)}
              className="h-20 px-12 text-xl font-black rounded-[2rem] group"
            >
              Get Started
              <ChevronRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        );

      case 2: // Goal Selection
        const goals = [
          { id: 'job', label: 'Get a tech job', icon: Briefcase },
          { id: 'earning', label: 'Start earning online', icon: Zap },
          { id: 'coding', label: 'Learn coding', icon: Code },
          { id: 'apps', label: 'Build my own apps', icon: Rocket }
        ];
        return (
          <motion.div 
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl w-full space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2 rounded-full font-black tracking-widest uppercase text-xs">
                Step 02/07
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
                What is your <span className="text-emerald-400">goal?</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((g) => (
                <Card
                  key={g.id}
                  onClick={() => {
                    setGoal(g.label);
                    setStep(3);
                  }}
                  className={`p-8 cursor-pointer group transition-all duration-500 rounded-[2.5rem] border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] flex items-center gap-6 ${
                    goal === g.label ? 'border-emerald-500 bg-emerald-500/[0.05]' : ''
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition-all duration-500">
                    <g.icon size={28} />
                  </div>
                  <span className="text-2xl font-black text-white/90 group-hover:text-white transition-colors">{g.label}</span>
                </Card>
              ))}
            </div>
          </motion.div>
        );

      case 3: // Experience Level
        const levels = [
          { id: 'beginner', label: 'Beginner', desc: 'No prior coding experience', icon: GraduationCap },
          { id: 'some', label: 'Some experience', desc: 'Know the basics of HTML/CSS', icon: Star },
          { id: 'intermediate', label: 'Intermediate', desc: 'Can build simple applications', icon: Trophy }
        ];
        return (
          <motion.div 
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl w-full space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2 rounded-full font-black tracking-widest uppercase text-xs">
                Step 03/07
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
                What’s your <span className="text-emerald-400">experience?</span>
              </h2>
            </div>

            <div className="space-y-6">
              {levels.map((l) => (
                <Card
                  key={l.id}
                  onClick={() => {
                    setExperience(l.label);
                    setStep(4);
                  }}
                  className={`p-8 cursor-pointer group transition-all duration-500 rounded-[2.5rem] border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] flex items-center gap-8 ${
                    experience === l.label ? 'border-emerald-500 bg-emerald-500/[0.05]' : ''
                  }`}
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.05] group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center transition-all duration-500 shrink-0">
                    <l.icon size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white/90 group-hover:text-white transition-colors">{l.label}</h3>
                    <p className="text-white/40 font-medium">{l.desc}</p>
                  </div>
                  <ChevronRight size={24} className="ml-auto text-white/20 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                </Card>
              ))}
            </div>
          </motion.div>
        );

      case 4: // Path Selection
        return (
          <motion.div 
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-7xl space-y-20"
          >
            <div className="text-center space-y-6">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2 rounded-full font-black tracking-widest uppercase text-xs">
                Step 04/07
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
                Select your <span className="text-emerald-400">Path</span>
              </h2>
              <p className="text-white/40 text-xl font-medium">You can explore other skills later.</p>
            </div>

            <div className="space-y-32">
              {categories.map((category, catIdx) => (
                <div key={category} className="space-y-12">
                  <div className="flex items-center gap-6 px-4">
                    <span className="text-emerald-500/40 font-black text-sm tracking-widest uppercase">0{catIdx + 1}</span>
                    <div className="flex flex-col">
                      <h3 className="text-3xl font-black tracking-tight text-white/90">{(categoryLabelsWithCounts as any)[category]}</h3>
                      <p className="text-white/40 text-sm font-medium">{categoryDescriptions[category]}</p>
                    </div>
                    <div className="h-px flex-grow bg-white/[0.05]" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allPaths.filter(p => p.category === category && p.status === 'active').length > 0 ? (
                      allPaths.filter(p => p.category === category && p.status === 'active').map((path) => (
                        <Card
                          key={path.title}
                          onClick={() => setSelected(path.title as CareerPath)}
                          className={`p-8 rounded-[2.5rem] cursor-pointer transition-all duration-500 group relative ${
                            selected === path.title 
                              ? 'border-emerald-500 bg-emerald-500/[0.05] ring-1 ring-emerald-500/30' 
                              : 'border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                            selected === path.title ? 'bg-emerald-500 text-black' : 'bg-white/[0.05] text-white/40'
                          }`}>
                            <IconComponent name={path.icon} />
                          </div>
                          <h4 className={`text-xl font-black mb-3 transition-colors ${selected === path.title ? 'text-emerald-400' : 'text-white'}`}>
                            {path.title}
                          </h4>
                          <p className="text-sm text-white/30 font-medium line-clamp-2 mb-6">
                            {path.description}
                          </p>
                          <Button 
                            variant={selected === path.title ? 'primary' : 'outline'}
                            fullWidth
                            className="rounded-2xl font-black text-xs uppercase tracking-widest"
                          >
                            {selected === path.title ? 'Selected' : 'Select Path'}
                          </Button>
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full p-16 rounded-[3rem] border border-dashed border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10">
                          <Icons.Search size={40} />
                        </div>
                        <div className="space-y-2">
                          <p className="text-white/60 text-xl font-black">No programs available yet</p>
                          <p className="text-white/20 font-medium max-w-xs mx-auto">We're currently designing professional programs for this category.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selected && (
              <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50">
                <Button 
                  fullWidth 
                  onClick={() => setStep(5)}
                  className="h-20 text-xl font-black rounded-[2rem] shadow-2xl shadow-emerald-500/40"
                >
                  Continue
                  <ChevronRight size={24} className="ml-2" />
                </Button>
              </div>
            )}
          </motion.div>
        );

      case 5: // Commitment Screen
        const benefits = [
          { title: 'Build Real Projects', desc: 'Create a portfolio that proves your skills to employers.', icon: Rocket },
          { title: 'Learn Industry Tools', desc: 'Master the exact tools used by top tech companies.', icon: Code },
          { title: 'AI Mentor Support', desc: 'Get 24/7 guidance and instant feedback on your code.', icon: Zap }
        ];
        return (
          <motion.div 
            key="step5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl w-full space-y-16"
          >
            <div className="text-center space-y-6">
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-6 py-2 rounded-full font-black tracking-widest uppercase text-xs">
                Step 05/07
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
                You're enrolling in <br />
                <span className="text-emerald-400">{selected} Academy</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-8 rounded-[2.5rem] border-white/[0.08] bg-white/[0.02] h-full space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <b.icon size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-white">{b.title}</h4>
                      <p className="text-sm text-white/40 font-medium leading-relaxed">{b.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="glass-premium p-10 rounded-[3rem] border border-emerald-500/30 text-center space-y-8">
              <div className="flex items-center justify-center gap-3 text-emerald-400">
                <CheckCircle2 size={24} />
                <span className="text-lg font-black uppercase tracking-widest">Enrollment Ready</span>
              </div>
              <p className="text-2xl font-black text-white">
                Your academy path is prepared. <br />
                Let's start your professional training.
              </p>
              <Button 
                size="lg" 
                fullWidth 
                onClick={startSetup}
                className="h-20 text-xl font-black rounded-[2rem] shadow-2xl shadow-emerald-500/40 group"
              >
                Enter Academy
                <Rocket size={24} className="ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        );

      case 6: // AI Mentor Setup
        const setupSteps = [
          { threshold: 0, text: 'Initializing AI Mentor...' },
          { threshold: 25, text: 'Personalizing your curriculum...' },
          { threshold: 50, text: 'Analyzing industry requirements...' },
          { threshold: 75, text: 'Setting up your workspace...' },
          { threshold: 90, text: 'Ready to launch!' }
        ];
        const currentSetupStep = setupSteps.filter(s => setupProgress >= s.threshold).pop();

        return (
          <motion.div 
            key="step6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl w-full text-center space-y-12"
          >
            <div className="relative inline-block">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl rounded-full"
              />
              <div className="relative w-32 h-32 bg-black border-2 border-emerald-500/30 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Zap size={56} className="text-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight text-white uppercase">
                  Setting up your <br />
                  <span className="text-emerald-400">AI Mentor</span>
                </h2>
                <p className="text-white/40 font-medium tracking-widest uppercase text-xs animate-pulse">
                  {currentSetupStep?.text}
                </p>
              </div>

              <div className="relative h-3 bg-white/[0.05] rounded-full overflow-hidden max-w-md mx-auto border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${setupProgress}%` }}
                  className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                />
              </div>

              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                {setupProgress}% Complete
              </p>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050506] text-white px-6 py-32 flex flex-col items-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/[0.02] blur-[120px] rounded-full pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};
