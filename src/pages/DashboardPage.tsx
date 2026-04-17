import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Flame, Star, Play, ChevronRight, 
  Menu, Bell, User, Zap, Clock, BrainCircuit, 
  Network, X, LogOut, BookOpen, Terminal, Code,
  Target, LayoutDashboard, MessageSquare, Search,
  Sparkles, CheckCircle2, Lock, Compass, ArrowRightLeft,
  Award, ShieldCheck, ExternalLink, Users, TrendingUp,
  Heart, Map as MapIcon, AlertCircle, Bot
} from 'lucide-react';
import { ref, get } from 'firebase/database';
import { db, auth } from '../lib/firebase';
import { MentorChat } from '../components/MentorChat';
import { LoadingScreen } from '../components/LoadingScreen';
import { CURRICULUM } from '../constants/curriculum';
import { STAGE_TESTS } from '../constants/tests';
import { FINAL_EXAMS } from '../constants/exams';
import { LESSON_CONTENT } from '../constants/lessons';
import { 
  CareerPath, 
  Certificate, 
  CurriculumPath, 
  CurriculumStage, 
  CurriculumModule,
  CurriculumWeek,
  DetailedProject,
  Skill 
} from '../types';
import { getUserCertificates } from '../services/certificateService';
import { DEFAULT_SKILLS } from '../constants/skills';

export const DashboardPage: React.FC = () => {
  const { progress, loading, updateProgress } = useUserData();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPathSwitcherOpen, setIsPathSwitcherOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [allPaths, setAllPaths] = useState<Record<string, any>>({});
  const [dynamicPath, setDynamicPath] = useState<CurriculumPath | null>(null);
  const [dynamicStages, setDynamicStages] = useState<CurriculumStage[]>([]);
  const [dynamicModules, setDynamicModules] = useState<Record<string, CurriculumModule[]>>({});
  const [dynamicWeeks, setDynamicWeeks] = useState<CurriculumWeek[]>([]);
  const [dynamicProjects, setDynamicProjects] = useState<DetailedProject[]>([]);
  const [dynamicLessons, setDynamicLessons] = useState<any[]>([]);
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const groupedPaths = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    const skillsToGroup = allSkills.length > 0 ? allSkills : DEFAULT_SKILLS;
    
    skillsToGroup.forEach(skill => {
      const category = (skill.category as string) || 'Other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
    });
    return groups;
  }, [allSkills]);

  const categoryLabels = useMemo(() => ({
    'career-path': `Career Paths (${groupedPaths['career-path']?.length || 0})`,
    'coding-languages': `Programming Languages (${groupedPaths['coding-languages']?.length || 0})`,
    'programming-language': `Programming Languages (${groupedPaths['programming-language']?.length || 0})`,
    'development-skill': `Development Skill Programs (${groupedPaths['development-skill']?.length || 0})`,
    'tool-foundation': `Tools & Foundations (${groupedPaths['tool-foundation']?.length || 0})`,
    'career-prep': `Career Readiness (${groupedPaths['career-prep']?.length || 0})`
  }), [groupedPaths]);

  const categoryDescriptions = useMemo(() => ({
    'career-path': 'Comprehensive programs designed to take you from zero to a professional role in a specific field.',
    'coding-languages': 'Learn core coding languages like HTML, CSS, JavaScript, Python, Java, C++, and more.',
    'programming-language': 'Learn core coding languages like HTML, CSS, JavaScript, Python, Java, C++, and more.',
    'development-skill': 'Master core development domains like Frontend, Backend, or DevOps with deep-dive programs.',
    'tool-foundation': 'Master essential tools and foundational concepts like Git, Databases, and System Design.',
    'career-prep': 'Prepare for the job market with resume building, interview prep, and professional networking.'
  }), []);

  useEffect(() => {
    if (user) {
      getUserCertificates(user.uid).then(setCertificates);
    }
  }, [user]);

  useEffect(() => {
    const fetchDynamicCurriculum = async () => {
      const skillsRef = ref(db, 'skills');
      const pathsRef = ref(db, 'curriculum_paths');
      
      const [skillsSnapshot, pathsSnapshot] = await Promise.all([
        get(skillsRef),
        get(pathsRef)
      ]);

      let skills = DEFAULT_SKILLS;
      
      if (skillsSnapshot.exists()) {
        skills = Object.values(skillsSnapshot.val()) as Skill[];
      }
      
      if (pathsSnapshot.exists()) {
        setAllPaths(pathsSnapshot.val());
      }
      
      setAllSkills(skills);
      
      // Find active skill by ID or Title
        let skill = skills.find(s => s.id === progress?.activeProgramId);
        if (!skill && progress?.selectedPath) {
          skill = skills.find(s => s.title === progress.selectedPath);
        }
        
        // Fallback to first active skill if none selected
        if (!skill) {
          skill = skills.find(s => s.status === 'active');
        }

        if (skill) {
          setActiveSkill(skill);
          const pathRef = ref(db, `curriculum_paths/${skill.id}`);
          const stagesRef = ref(db, `curriculum_stages/${skill.id}`);
          const weeksRef = ref(db, `curriculum_weeks/${skill.id}`);
          const projectsRef = ref(db, `curriculum_projects/${skill.id}`);
          const lessonsRef = ref(db, `ai_generated_lessons/${skill.id}`);
          
          const [pathSnap, stagesSnap, weeksSnap, projectsSnap, lessonsSnap] = await Promise.all([
            get(pathRef),
            get(stagesRef),
            get(weeksRef),
            get(projectsRef),
            get(lessonsRef)
          ]);

          if (pathSnap.exists()) setDynamicPath(pathSnap.val());
          if (lessonsSnap.exists()) {
            setDynamicLessons(Object.values(lessonsSnap.val()));
          }
          if (weeksSnap.exists()) {
            setDynamicWeeks((Object.values(weeksSnap.val()) as CurriculumWeek[]).sort((a, b) => a.weekNumber - b.weekNumber));
          }
          if (projectsSnap.exists()) {
            setDynamicProjects(Object.values(projectsSnap.val()) as DetailedProject[]);
          }

          if (stagesSnap.exists()) {
            const stagesData = Object.values(stagesSnap.val()) as CurriculumStage[];
            const sortedStages = stagesData.sort((a, b) => a.order - b.order);
            setDynamicStages(sortedStages);

            // Fetch modules for each stage
            const modulesMap: Record<string, CurriculumModule[]> = {};
            for (const stage of sortedStages) {
              const modsRef = ref(db, `curriculum_modules/${stage.id}`);
              const modsSnap = await get(modsRef);
              if (modsSnap.exists()) {
                modulesMap[stage.id] = (Object.values(modsSnap.val()) as CurriculumModule[]).sort((a, b) => a.order - b.order);
              }
            }
            setDynamicModules(modulesMap);
          }
        }
    };

    fetchDynamicCurriculum();
  }, [progress?.selectedPath, progress?.activeProgramId]);

  const currentPathData = useMemo(() => {
    if (dynamicPath && dynamicStages.length > 0) {
      return {
        ...dynamicPath,
        finalExamId: `exam_${dynamicPath.id}`,
        levels: dynamicStages.reduce((acc: any, stage) => {
          const levelKey = stage.levelName.toLowerCase() as any;
          acc[levelKey] = {
            id: levelKey,
            title: stage.title,
            description: '',
            modules: dynamicModules[stage.id] || [],
            projects: []
          };
          return acc;
        }, {} as any)
      } as any;
    }

    return null;
  }, [dynamicPath, dynamicStages, dynamicModules]);

  const allLessonsInPath = useMemo(() => {
    if (dynamicLessons.length > 0) {
      return dynamicLessons.sort((a, b) => a.order - b.order).map(l => l.id);
    }
    return [];
  }, [dynamicLessons]);

  const nextLessonId = useMemo(() => {
    if (!progress || !allLessonsInPath.length) return null;
    const lessonId = allLessonsInPath.find(id => !progress.completedLessons?.includes(id));
    return lessonId || allLessonsInPath[0];
  }, [allLessonsInPath, progress?.completedLessons]);

  const nextLesson = useMemo(() => {
    if (!nextLessonId) return null;
    return dynamicLessons.find(l => l.id === nextLessonId);
  }, [nextLessonId, dynamicLessons]);

  const currentWeek = useMemo(() => {
    if (!nextLesson || !dynamicWeeks.length) return 1;
    const week = dynamicWeeks.find(w => w.id === nextLesson.weekId);
    return week ? week.weekNumber : 1;
  }, [nextLesson, dynamicWeeks]);

  const featuredLessons = useMemo(() => {
    if (dynamicLessons.length > 0) {
      return dynamicLessons
        .filter(l => !progress?.completedLessons?.includes(l.id))
        .slice(0, 3)
        .map((l, i) => ({
          tag: i === 0 ? 'RECOMMENDED' : i === 1 ? 'ESSENTIAL' : 'ADVANCED',
          id: l.id,
          title: l.title,
          desc: l.summary || l.todayYouAreLearning || 'Continue your learning journey.',
          duration: l.estimatedDuration || '15 mins'
        }));
    }

    return [];
  }, [dynamicLessons, progress?.completedLessons]);

  const nextExam = useMemo(() => {
    if (!progress || !currentPathData?.finalExamId) return null;
    
    // If all lessons are done, check for final exam
    const allDone = allLessonsInPath.length > 0 && allLessonsInPath.every(id => progress.completedLessons?.includes(id));
    if (allDone && !progress.completedExams?.includes(currentPathData.finalExamId)) {
      // Try to find in dynamic data or fallback to constants if needed for now
      return FINAL_EXAMS.find(e => e.id === currentPathData.finalExamId);
    }

    return null;
  }, [allLessonsInPath, currentPathData, progress?.completedLessons, progress?.completedExams]);

  const nextTest = useMemo(() => {
    if (!progress || !currentPathData) return null;
    
    const path = currentPathData as any;
    for (const level of Object.values(path.levels || {})) {
      const l = level as any;
      for (const module of (l.modules || [])) {
        const m = module as any;
        if (!m.testId) continue;
        
        const allLessonsDone = (m.lessons || []).length > 0 && (m.lessons || []).every((id: string) => progress.completedLessons?.includes(id));
        const testDone = progress.completedTests?.includes(m.testId);
        
        if (allLessonsDone && !testDone) {
          return STAGE_TESTS.find(t => t.id === m.testId);
        }
      }
    }
    return null;
  }, [currentPathData, progress?.completedLessons, progress?.completedTests]);

  if (loading || !progress) return <LoadingScreen />;

  const xp = Number(progress.xp) || 0;
  const xpProgress = xp % 100;
  const streak = Number(progress.streak) || 0;
  const currentStage = progress.currentStage || 'Beginner';

  const getModuleProgress = (moduleId: string) => {
    if (!progress || !currentPathData) return 0;
    
    let module: any;
    const path = currentPathData as any;
    for (const level of Object.values(path.levels || {})) {
      const l = level as any;
      module = (l.modules || []).find((m: any) => m.id === moduleId);
      if (module) break;
    }

    if (!module || !module.lessons || module.lessons.length === 0) return 0;
    
    const completed = module.lessons.filter((id: string) => progress.completedLessons?.includes(id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const handlePathSwitch = async (skill: Skill) => {
    if (skill.status === 'draft' && !isAdmin) return;
    
    await updateProgress({ 
      selectedPath: skill.title as CareerPath,
      activeProgramId: skill.id
    });
    setIsPathSwitcherOpen(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true, path: '/dashboard' },
    { icon: <Code size={20} />, label: 'Programming Languages', path: '/coding-languages' },
    { icon: <BookOpen size={20} />, label: 'Lessons', path: '/dashboard' },
    { icon: <Zap size={20} />, label: 'AI Tutor', path: '/tutor' },
    { icon: <Terminal size={20} />, label: 'Playground', path: '/playground' },
    { icon: <Target size={20} />, label: 'Projects', path: '/projects' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
  ];

  if (isAdmin) {
    menuItems.push({ 
      icon: <ShieldCheck size={20} />, 
      label: 'Admin Panel', 
      path: '/admin' 
    });
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Top Navbar - Matches Screenshot */}
      <header className="sticky top-0 z-50 bg-[#050506]/60 backdrop-blur-2xl border-b border-white/[0.05] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 -ml-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
          >
            <Menu size={26} className="text-white/60" />
          </button>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gradient">MentorStack</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
            className="p-3 hover:bg-white/[0.05] rounded-2xl transition-all text-white/30 hover:text-white/60 relative active:scale-90"
          >
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#050506]" />
          </button>
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-4 pl-6 border-l border-white/[0.08] cursor-pointer group active:scale-95"
          >
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-2">
                {isAdmin && <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-2 py-0 text-[8px] font-black uppercase tracking-widest">Admin</Badge>}
                <p className="text-sm font-black tracking-tight group-hover:text-emerald-400 transition-colors">{user?.displayName || 'Developer'}</p>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                Verified Learner
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1 group-hover:border-emerald-500/40 transition-all duration-500">
              <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-white/[0.05]">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={22} className="text-white/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer - Matches Screenshot */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60]"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#050506] border-r border-white/[0.05] z-[70] p-10 flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">MentorStack</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
                >
                  <X size={26} className="text-white/40" />
                </button>
              </div>

              <nav className="space-y-3 flex-grow">
                {menuItems.map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => {
                      navigate(item.path);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] transition-all duration-300 group ${
                      item.active 
                        ? 'bg-emerald-500 text-black font-black shadow-2xl shadow-emerald-500/30 scale-[1.02]' 
                        : 'text-white/30 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className={`transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-black' : 'text-white/30 group-hover:text-white'}`}>
                      {item.icon}
                    </span>
                    <span className="text-base font-bold tracking-tight">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-10 border-t border-white/[0.05]">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] text-red-400/60 hover:text-red-400 hover:bg-red-400/[0.05] transition-all font-black tracking-tight"
                >
                  <LogOut size={22} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Scroll Area */}
      <main className="flex-grow overflow-y-auto relative">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto p-8 md:p-16 space-y-16 relative z-10">
          
          {/* Premium Hero / command Center */}
          <div className="relative group">
            {/* Ambient Background Glow for Hero */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <Card className="glass-premium p-10 md:p-14 overflow-hidden relative border-white/10">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/[0.03] to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                {/* Left side: Greeting & Main Progress */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 backdrop-blur-md">Primary Track</Badge>
                      <button 
                        onClick={() => setIsPathSwitcherOpen(true)}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-all active:scale-95"
                      >
                        <ArrowRightLeft size={12} />
                        Change Path
                      </button>
                    </div>
                    <div>
                      <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-2 drop-shadow-2xl">
                        {activeSkill?.title || progress.selectedPath} <br />
                        <span className="text-gradient drop-shadow-none">Academy</span>
                      </h1>
                      <p className="text-white/40 font-medium text-lg md:text-2xl max-w-lg leading-tight pt-2">
                        Welcome back, <span className="text-white font-black">{user?.displayName?.split(' ')[0] || 'Developer'}</span>. You're entering <span className="text-emerald-400 font-black tracking-tight underline decoration-emerald-500/30 underline-offset-4">Week {currentWeek}</span> of your professional journey.
                      </p>
                    </div>
                  </div>

                  {/* Main Journey Progress Segmented bar */}
                  <div className="space-y-4 max-w-xl p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Career Transformation Progress</p>
                        <h4 className="font-black text-xl tracking-tighter">Level {currentStage} Professional</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-4xl font-black text-emerald-400 tracking-tighter">{allLessonsInPath.length > 0 ? Math.round((progress.completedLessons.length / allLessonsInPath.length) * 100) : 0}%</span>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Complete</p>
                      </div>
                    </div>
                    <div className="flex gap-1 h-3">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const segmentProgress = (allLessonsInPath.length > 0 ? (progress.completedLessons?.length / allLessonsInPath.length) : 0) * 20;
                        const isActive = i < segmentProgress;
                        return (
                          <div 
                            key={i} 
                            className={`flex-grow rounded-full transition-all duration-1000 delay-${i * 50} ${
                              isActive 
                                ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
                                : 'bg-white/5'
                            }`}
                          />
                        );
                      })}
                    </div>
                    {activeSkill && !dynamicPath && !loading && (
                      <div className="flex items-center gap-2 pt-2 text-orange-400/60 text-[10px] font-black uppercase tracking-widest">
                        <AlertCircle size={14} />
                        Curriculum updates pending from Admin
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Modern Stats Grid */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { 
                        label: 'Current Streak', 
                        value: `${streak} Days`, 
                        icon: <Flame size={24} fill="currentColor" />, 
                        color: 'text-orange-400', 
                        bg: 'bg-orange-400/10',
                        border: 'border-orange-500/20'
                      },
                      { 
                        label: 'Academy XP', 
                        value: xp, 
                        icon: <Zap size={24} fill="currentColor" />, 
                        color: 'text-emerald-400', 
                        bg: 'bg-emerald-400/10',
                        border: 'border-emerald-500/20'
                      },
                      { 
                        label: 'Stage Rank', 
                        value: `Top 5%`, 
                        icon: <Trophy size={24} fill="currentColor" />, 
                        color: 'text-indigo-400', 
                        bg: 'bg-indigo-400/10',
                        border: 'border-indigo-500/20'
                      },
                      { 
                        label: 'Certificates', 
                        value: certificates.length, 
                        icon: <Award size={24} />, 
                        color: 'text-purple-400', 
                        bg: 'bg-purple-400/10',
                        border: 'border-purple-500/20'
                      }
                    ].map((stat) => (
                      <div 
                        key={stat.label}
                        onClick={() => navigate('/profile')}
                        className={`group/stat glass p-6 rounded-[2rem] border ${stat.border} hover:bg-white/[0.05] transition-all cursor-pointer active:scale-95`}
                      >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4 group-hover/stat:scale-110 transition-transform duration-500`}>
                          {stat.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="font-black text-2xl tracking-tighter">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/profile')}
                    className="w-full mt-6 h-14 rounded-2xl border-white/5 bg-white/[0.02] hover:bg-white/5 font-black text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all"
                  >
                    View Mastery Profile
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Roadmap Section */}
          {dynamicWeeks.length > 0 && (
            <div className="space-y-10 pt-8">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="font-black text-4xl tracking-tighter">Your <span className="text-gradient">Roadmap</span></h3>
                  <p className="text-white/30 font-medium">Clear path to your professional career goal.</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Current</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Upcoming</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dynamicWeeks.map((week) => {
                  const isCurrent = week.weekNumber === currentWeek;
                  const isPast = week.weekNumber < currentWeek;
                  
                  return (
                    <div 
                      key={week.id}
                      className="group/week relative"
                    >
                      {isCurrent && (
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-emerald-500 to-emerald-800 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition" />
                      )}
                      <Card 
                        className={`h-full p-8 rounded-[2.5rem] border-white/[0.08] relative overflow-hidden transition-all duration-700 ${
                          isCurrent 
                            ? 'bg-[#0A0A0B]/80 backdrop-blur-3xl border-emerald-500/40' 
                            : isPast 
                              ? 'bg-white/[0.01] border-white/[0.02] opacity-50' 
                              : 'bg-white/[0.02] border-white/[0.05]'
                        }`}
                      >
                        <div className="space-y-6 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className={`px-4 py-2 rounded-2xl ${isCurrent ? 'bg-emerald-500 text-black font-black shadow-lg shadow-emerald-500/30' : 'bg-white/5 text-white/40'}`}>
                              <span className="text-[10px] font-black uppercase tracking-widest">Week {week.weekNumber}</span>
                            </div>
                            {isPast ? (
                              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <CheckCircle2 size={18} />
                              </div>
                            ) : !isCurrent ? (
                              <Lock size={16} className="text-white/10" />
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className={`text-xl font-black tracking-tight leading-tight ${isCurrent ? 'text-white' : 'text-white/60'}`}>{week.title}</h4>
                            <p className="text-xs font-medium text-white/30 line-clamp-2 leading-relaxed">{week.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {week.learningGoals?.slice(0, 3).map((goal: string, idx: number) => (
                              <span key={idx} className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-[8px] font-bold uppercase tracking-wider text-white/20">{goal}</span>
                            ))}
                          </div>
                        </div>
                        
                        {isCurrent && (
                          <div className="absolute -right-8 -bottom-8 p-12 opacity-[0.03] transform rotate-12 group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
                            <Zap size={160} fill="currentColor" className="text-emerald-500" />
                          </div>
                        )}
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommended Next Card */}
          <div className="grid grid-cols-1 gap-10">
            {(!nextLesson && !nextTest && !nextExam && !loading) ? (
              <Card className="p-12 border-white/[0.08] bg-white/[0.02] text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto text-white/20">
                  <MapIcon size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">Ready to start your journey?</h3>
                  <p className="text-white/40 max-w-sm mx-auto font-medium">Select a path and start your professional training in the MentorStack Academy.</p>
                </div>
                <Button onClick={() => setIsPathSwitcherOpen(true)} className="h-14 px-8 rounded-2xl">
                  Explore Academy Paths
                </Button>
              </Card>
            ) : (
              <Card className="p-12 border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.1] via-transparent to-transparent relative overflow-hidden group min-h-[450px] flex items-center">
                <div className="relative z-10 space-y-10 max-w-lg">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-emerald-500/10">
                    <Sparkles size={14} fill="currentColor" />
                    {nextTest ? 'Stage Test Available' : nextExam ? 'Final Exam Ready' : 'Academy Focus'}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                      {nextTest ? nextTest.title : nextExam ? nextExam.title : nextLesson?.title || (activeSkill ? `Start ${activeSkill.title}` : 'Start Learning')}
                    </h2>
                    <p className="text-white/50 text-xl leading-relaxed font-medium">
                      {nextTest ? nextTest.description : nextExam ? nextExam.description : nextLesson?.todayYouAreLearning || (activeSkill ? `Begin your professional journey in ${activeSkill.title} with our structured academy curriculum.` : 'Begin your professional journey with our structured academy curriculum.')}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      onClick={() => {
                        if (nextTest) navigate(`/test/${nextTest.id}`);
                        else if (nextExam) navigate(`/exam/${nextExam.id}`);
                        else if (nextLessonId) navigate(`/lesson/${nextLessonId}`);
                        else setIsPathSwitcherOpen(true);
                      }}
                      className="group h-20 px-12 text-lg font-black tracking-tight rounded-[2rem] shadow-xl shadow-emerald-500/20"
                    >
                      {nextTest ? 'Start Stage Test' : nextExam ? 'Take Final Exam' : progress.completedLessons?.length ? 'Continue Program' : 'Start First Lesson'}
                      <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300 ml-3" />
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/academy/${progress.selectedPath}`)}
                      className="h-20 px-10 text-lg font-black tracking-tight rounded-[2rem] border-white/10 hover:bg-white/5"
                    >
                      <MapIcon size={20} className="mr-3" />
                      View Path
                    </Button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -right-20 -bottom-20 p-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 pointer-events-none">
                  {nextTest || (nextLesson as any)?.isExam ? <Trophy size={600} /> : <BookOpen size={600} />}
                </div>
                <div className="absolute top-1/2 right-24 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000" />
              </Card>
            )}

            {/* Value Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: "Structured Learning",
                  desc: "Follow a clear path from beginner to professional with step-by-step guidance.",
                  icon: <Compass size={24} />,
                },
                {
                  title: "AI Mentor Guidance",
                  desc: "Learn with a smart AI mentor that explains, corrects, and guides you in real-time.",
                  icon: <BrainCircuit size={24} />,
                },
                {
                  title: "Real Projects",
                  desc: "Build real-world applications and create a portfolio that proves your skills.",
                  icon: <Code size={24} />,
                },
                {
                  title: "Job-Ready Skills",
                  desc: "Gain practical skills used by real developers in the industry.",
                  icon: <Target size={24} />,
                },
                {
                  title: "Verified Certificates",
                  desc: "Earn certificates backed by real projects and verifiable proof.",
                  icon: <Award size={24} />,
                }
              ].map((item, i) => (
                <Card key={i} className="p-8 space-y-6 bg-white/[0.01] border-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-black text-lg tracking-tight group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-white/40 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none transform rotate-12 scale-150">
                     {item.icon}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dynamic Growth Engine Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Left: Progress & Mastery (4 cols) */}
            <div className="xl:col-span-4 space-y-10">
              {/* Specialized Curriculum Progress */}
              <Card className="glass-premium p-10 space-y-10 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-emerald-400">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-glow">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-black uppercase text-xs tracking-[0.3em]">Curriculum</h3>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-0.5">Real-time completion</p>
                    </div>
                  </div>
                  <Badge className="bg-white/[0.05] text-white/40 border-white/[0.08] backdrop-blur-md">Live Sync</Badge>
                </div>
                
                <div className="space-y-10 relative z-10">
                  {(Object.values((currentPathData as any)?.levels || {}) as any[]).flatMap(l => l.modules || []).slice(0, 4).map((module: any, i: number) => (
                    <div key={module.id} className="space-y-4 group/module">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black text-white/40 tracking-widest uppercase group-hover/module:text-emerald-400/60 transition-colors">Module {i + 1}</span>
                          <span className="text-sm font-black text-white/80 tracking-tight line-clamp-1">{module.title}</span>
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter">{getModuleProgress(module.id)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${getModuleProgress(module.id)}%` }}
                          transition={{ duration: 1.5, delay: i * 0.1 }}
                          className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
                  className="w-full h-16 rounded-2xl border border-white/5 bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center justify-center gap-4 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all duration-500 group"
                >
                   Ask AI to explain progress
                </button>
              </Card>

              {/* Advanced Skill Analytics */}
              <Card className="glass-premium p-10 space-y-8 border-white/5">
                <div className="flex items-center gap-4 text-emerald-400">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-xs tracking-[0.3em]">Mastery Analytics</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-0.5">Algorithm identified</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-3">
                    {['Logic', 'Architecture', 'Problem Solving', 'Consistency'].map(s => (
                      <div key={s} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all group/chip">
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-wider mb-2 group-hover/chip:text-emerald-400/40 transition-colors">{s}</p>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow" />
                          <span className="text-xs font-black text-white/60 uppercase">Elite Level</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-dashed border-emerald-500/20 text-center relative overflow-hidden group/growth">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover/growth:scale-125 transition-transform duration-1000">
                        <TrendingUp size={60} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-3">Next Milestone</p>
                    <p className="text-sm text-white/60 font-medium leading-relaxed">Complete <span className="text-emerald-400">Module 4</span> to unlock <br /> Senior Architecture badge.</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Premium AI Tutor Hub (8 cols) */}
            <div className="xl:col-span-8">
              <Card className="glass-premium h-full p-12 space-y-12 relative overflow-hidden group border-white/10">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.1] transition-all duration-1000 transform group-hover:-rotate-6 pointer-events-none">
                  <Bot size={450} fill="currentColor" />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-emerald-500/[0.02] to-transparent pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-800 flex items-center justify-center text-black shadow-2xl shadow-emerald-500/40 transform group-hover:scale-110 transition-all duration-700">
                        <Bot size={40} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-[#0A0A0B] animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-black text-4xl tracking-tighter">Academy AI <span className="text-emerald-400 underline decoration-emerald-500/20 underline-offset-8">Mentor</span></h3>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Context Aware</span>
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Always active • ready for deep dive</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="h-10 px-6 rounded-full bg-white/5 border-white/10 text-white/40 font-black text-[10px] uppercase tracking-widest backdrop-blur-xl">Version 4.2 Elite</Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black tracking-tight leading-tight">
                        Deep-dive into <br />
                        <span className="text-white/40">{activeSkill?.title || 'your path'}</span> with your <br />
                        <span className="text-emerald-500">Professional Mentor.</span>
                      </h4>
                      <p className="text-white/30 text-lg font-medium leading-relaxed max-w-sm">
                        Integrated with the curriculum. Your mentor understands your progress, current lesson complexities, and upcoming challenges.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Real-time help', icon: <Zap size={14} /> },
                        { label: 'Code Review', icon: <Code size={14} /> },
                        { label: 'Quizzes', icon: <Sparkles size={14} /> },
                        { label: 'Exam Prep', icon: <Trophy size={14} /> }
                      ].map(f => (
                        <div key={f.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                           <div className="text-emerald-500/40">{f.icon}</div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">Recommended Interventions</p>
                    {[
                      { label: "Explain current concepts", prompt: `I'm currently on the lesson "${nextLesson?.title || 'my course'}". Can you explain the core concepts of this lesson in a simple way?`, color: 'hover:text-emerald-400 hover:border-emerald-500/40' },
                      { label: "Launch mini-quiz on this", prompt: `I want to test my knowledge of the current topic. Can you give me a 3-question quiz?`, color: 'hover:text-blue-400 hover:border-blue-500/40' },
                      { label: "Give me a coding exercise", prompt: `I want to practice what I've learned in "${nextLesson?.title || 'my course'}". Can you give me a coding exercise?`, color: 'hover:text-purple-400 hover:border-purple-500/40' },
                      { label: "Career Prep Advice", prompt: `Based on my current progress in ${activeSkill?.title}, what should I focus on to become job-ready faster?`, color: 'hover:text-orange-400 hover:border-orange-500/40' }
                    ].map((btn) => (
                      <button 
                        key={btn.label}
                        onClick={() => window.dispatchEvent(new CustomEvent('mentor-chat-prompt', { detail: { prompt: btn.prompt } }))}
                        className={`w-full p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/5 ${btn.color} transition-all duration-300 text-left flex items-center justify-between group/qbtn`}
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{btn.label}</span>
                        <ChevronRight size={18} className="text-white/10 group-hover/qbtn:translate-x-1 transition-all" />
                      </button>
                    ))}
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
                      className="w-full h-20 mt-4 rounded-[1.5rem] bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                    >
                      <MessageSquare size={18} />
                      Open Full Session
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Academy Projects Section */}
          <div className="space-y-10 pt-12">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-black text-4xl tracking-tighter">Academy <span className="text-gradient">Projects</span></h3>
                <p className="text-white/30 font-medium">Build real-world applications to showcase your professional growth.</p>
              </div>
              <button 
                onClick={() => navigate('/projects')}
                className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group"
              >
                Project Hub <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><Terminal size={18} /></div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {dynamicProjects.length > 0 ? (
                dynamicProjects.map((project) => (
                  <div key={project.id} className="group/project relative">
                    <Card 
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="h-full glass-premium p-10 space-y-8 cursor-pointer hover:bg-white/[0.04] transition-all duration-700 border-white/5 hover:border-emerald-500/20 active:scale-[0.98] relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start relative z-10">
                        <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/5 group-hover/project:bg-emerald-500/10 flex items-center justify-center text-emerald-500/40 group-hover/project:text-emerald-500 transition-all duration-700 group-hover/project:scale-110 group-hover/project:rotate-3 shadow-inner">
                          <Target size={28} />
                        </div>
                        <Badge className={`${project.difficulty === 'Advanced' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-white/5 text-white/40 border-white/10'} text-[9px] uppercase tracking-[0.2em] font-black px-4 py-1.5 rounded-full backdrop-blur-md`}>
                          {project.difficulty}
                        </Badge>
                      </div>

                      <div className="space-y-4 relative z-10">
                        <h4 className="font-black text-2xl tracking-tighter group-hover/project:text-emerald-400 transition-colors uppercase leading-none">{project.title}</h4>
                        <p className="text-sm text-white/30 font-medium line-clamp-2 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 relative z-10">
                        {project.skillsUsed?.slice(0, 3).map((skill: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[9px] font-bold tracking-widest text-white/20 uppercase">{skill}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between relative z-10 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3 text-emerald-400/60 font-black text-[10px] uppercase tracking-[0.2em] group-hover/project:text-emerald-400 transition-colors">
                          {progress.completedProjects?.includes(project.id) ? (
                            <>
                              <CheckCircle2 size={14} className="text-emerald-500 shadow-glow" />
                              Project Certified
                            </>
                          ) : (
                            <>
                              <Play size={14} fill="currentColor" />
                              Initiate Project
                            </>
                          )}
                        </div>
                        <div className="text-right">
                           <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">Reward</p>
                           <span className="text-xs font-black text-white/40 group-hover/project:text-emerald-400 transition-colors">+{project.xpReward} XP</span>
                        </div>
                      </div>
                      
                      {/* Hover Decoration */}
                      <div className="absolute -right-12 -bottom-12 p-16 opacity-[0.01] group-hover/project:opacity-[0.04] transition-all duration-1000 transform group-hover/project:scale-125 pointer-events-none">
                         <Terminal size={200} />
                      </div>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center glass-premium border-dashed border-white/10 rounded-[3rem] flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10">
                    <LogOut className="rotate-90" size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/40 text-xl font-black tracking-tight">Expansion in Progress</p>
                    <p className="text-white/20 font-medium max-w-xs mx-auto">Our senior architects are currently drafting custom capstone challenges for this path.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Academy Mastery Tree */}
          <Card className="glass-premium p-12 md:p-20 space-y-20 relative overflow-hidden border-white/5">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex items-center gap-6 text-emerald-400">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-glow">
                  <Network size={28} />
                </div>
                <div>
                  <h3 className="font-black text-3xl tracking-tighter uppercase">{activeSkill?.title || progress.selectedPath} <span className="text-white/20">/</span> Mastery Tree</h3>
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-1">Hierarchical Skill Progression</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Ranking</p>
                    <p className="text-lg font-black text-emerald-400 tracking-tight">Top {Math.max(1, 100 - Math.floor(xp/100))}% Learner</p>
                 </div>
                 <Badge className="h-12 px-8 bg-emerald-500 text-black border-none font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-500/20">
                   {Math.floor(xp / 500) > 0 ? `Tier ${Math.floor(xp / 500) + 1}` : 'Novice Tier'}
                 </Badge>
              </div>
            </div>

            <div className="relative flex flex-col items-center py-20 z-10">
              <div className="flex flex-wrap justify-center gap-12 md:gap-32 items-center relative">
                {dynamicStages.length > 0 ? (
                  dynamicStages.map((stage, idx) => (
                    <React.Fragment key={stage.id}>
                      <SkillNode 
                        label={stage.levelName} 
                        completed={
                          idx < dynamicStages.findIndex(s => s.levelName === progress.currentStage) ||
                          (progress.currentStage === 'Final Exam' && (stage.levelName as string) !== 'Final Exam')
                        } 
                        progress={progress.currentStage === stage.levelName ? 50 : (idx < dynamicStages.findIndex(s => s.levelName === progress.currentStage) ? 100 : 0)}
                      />
                      {idx < dynamicStages.length - 1 && (
                        <div className="hidden md:block w-20 h-px bg-white/10 relative overflow-hidden">
                           <div className="absolute inset-0 bg-emerald-500/50 blur-sm" />
                        </div>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    <SkillNode 
                      label="Beginner" 
                      completed={progress.currentStage === 'Intermediate' || progress.currentStage === 'Advanced'} 
                      progress={progress.currentStage === 'Beginner' ? 50 : 100}
                    />
                    <div className="hidden md:block w-32 h-px bg-white/10" />
                    <SkillNode 
                      label="Intermediate" 
                      locked={progress.currentStage === 'Beginner'}
                      completed={progress.currentStage === 'Advanced'}
                      progress={progress.currentStage === 'Intermediate' ? 50 : (progress.currentStage === 'Advanced' ? 100 : 0)}
                    />
                    <div className="hidden md:block w-32 h-px bg-white/10" />
                    <SkillNode 
                      label="Advanced" 
                      locked={progress.currentStage !== 'Advanced'}
                      completed={progress.completedExams?.includes(currentPathData?.finalExamId || '')}
                      progress={progress.currentStage === 'Advanced' ? 50 : 0}
                    />
                  </>
                )}
              </div>
              <div className="mt-24 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl text-center max-w-xl">
                 <p className="text-white/40 text-sm font-medium leading-relaxed italic">
                   "Mastery is not a destination, but a continuous journey of Refinement. Every lesson completed strengthens the roots of your professional foundation."
                 </p>
              </div>
            </div>
          </Card>

          {/* Featured Lessons Section */}
          <div className="space-y-12 pt-16">
            <div className="flex justify-between items-end">
              <div className="space-y-3">
                <h3 className="font-black text-5xl tracking-tighter">Featured <span className="text-gradient">Lessons</span></h3>
                <p className="text-white/30 text-lg font-medium">Precision curriculum curated for your current mastery level.</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all active:scale-95"
              >
                Explore Full Curriculum <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {featuredLessons.map((lesson) => (
                <div key={lesson.id} className="group/lesson relative">
                  <Card 
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                    className="p-10 glass-premium flex flex-col md:flex-row md:items-center justify-between gap-10 group cursor-pointer hover:bg-white/[0.04] transition-all duration-700 border-white/5 hover:border-emerald-500/20 active:scale-[0.99] relative overflow-hidden"
                  >
                    <div className="flex gap-10 items-center">
                      <div className="w-24 h-24 rounded-[2rem] bg-white/[0.03] flex items-center justify-center text-white/10 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-inner ring-1 ring-white/5">
                        <BookOpen size={40} />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-5">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full">{lesson.tag}</Badge>
                          <div className="flex items-center gap-2 text-white/20">
                            <Clock size={16} />
                            <span className="text-[11px] font-black uppercase tracking-tighter">{lesson.duration}</span>
                          </div>
                          <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
                          <div className="hidden md:flex items-center gap-2 text-white/20">
                            <Sparkles size={16} />
                            <span className="text-[11px] font-black uppercase tracking-tighter">High ROI</span>
                          </div>
                        </div>
                        <h4 className="font-black text-3xl tracking-tighter group-hover:text-emerald-400 transition-colors">{lesson.title}</h4>
                        <p className="text-lg text-white/30 font-medium max-w-xl leading-relaxed">{lesson.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden sm:block">
                         <p className="text-[9px] font-black text-white/10 uppercase tracking-widest">Level</p>
                         <p className="text-sm font-black text-white/40">{progress.currentStage}</p>
                      </div>
                      <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.03] flex items-center justify-center text-white/10 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 group-hover:translate-x-2 transition-all duration-700 border border-white/5">
                        <ChevronRight size={28} />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="space-y-12 pt-20">
              <div className="flex justify-between items-end">
                <div className="space-y-3">
                  <h3 className="font-black text-5xl tracking-tighter">Your <span className="text-gradient">Credentials</span></h3>
                  <p className="text-white/30 text-lg font-medium">Verified proof of your technical excellence and professional skills.</p>
                </div>
                <button 
                  onClick={() => navigate('/profile')}
                  className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl text-xs font-black uppercase tracking-[0.3em] text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                >
                  Manage Portfolio <Award size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {certificates.slice(0, 2).map((cert) => (
                  <div key={cert.id} className="group/cert relative">
                    <Card 
                      onClick={() => navigate(`/certificate/${cert.id}`)}
                      className="p-10 glass-premium border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.03] to-transparent group cursor-pointer hover:bg-white/[0.05] transition-all duration-700 relative overflow-hidden active:scale-[0.98]"
                    >
                      <div className="flex gap-10 items-center relative z-10">
                        <div className="w-24 h-24 rounded-[2rem] bg-emerald-500/5 ring-1 ring-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover/cert:scale-110 group-hover/cert:rotate-3 transition-transform duration-700 shadow-glow">
                          <ShieldCheck size={48} />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Badge className="bg-emerald-500 text-black border-none text-[10px] font-black tracking-widest px-4 py-1 rounded-full">{cert.tier}</Badge>
                            <span className="text-[11px] font-black text-white/30 uppercase tracking-widest">{new Date(cert.issueDate).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-black text-2xl tracking-tighter group-hover/cert:text-emerald-400 transition-colors uppercase leading-none">{cert.pathName}</h4>
                          <div className="flex items-center gap-3 text-emerald-500/60 text-[11px] font-black uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow" />
                            Verified Academic Credential
                          </div>
                        </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover/cert:opacity-[0.08] group-hover/cert:scale-125 transition-all duration-1000 transform rotate-12 pointer-events-none">
                        <Award size={200} fill="currentColor" />
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Path Switcher Modal */}
          <AnimatePresence>
            {isPathSwitcherOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsPathSwitcherOpen(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative w-full max-w-4xl bg-[#0A0A0B] border border-white/[0.08] rounded-[3rem] p-12 overflow-hidden shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-12">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-black tracking-tighter">Switch Your <span className="text-gradient">Focus</span></h2>
                      <p className="text-white/40 font-medium">Your progress in other paths is saved automatically.</p>
                    </div>
                    <button 
                      onClick={() => setIsPathSwitcherOpen(false)}
                      className="p-4 hover:bg-white/[0.05] rounded-2xl transition-all"
                    >
                      <X size={24} className="text-white/40" />
                    </button>
                  </div>

                  <div className="space-y-12 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                    {Object.entries(groupedPaths).map(([category, categorySkills]) => (
                      <div key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60">{categoryLabels[category] || category}</h3>
                          <div className="flex-grow h-px bg-white/[0.05]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {categorySkills.map((skill) => {
                            const isDraft = skill.status === 'draft';
                            const isActive = progress.activeProgramId === skill.id;

                            return (
                              <button
                                key={skill.id}
                                onClick={() => handlePathSwitch(skill)}
                                disabled={isDraft && !isAdmin}
                                className={`p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${
                                  isActive 
                                    ? 'bg-emerald-500 border-emerald-500 text-black' 
                                    : isDraft && !isAdmin
                                      ? 'bg-white/[0.01] border-white/[0.03] opacity-40 cursor-not-allowed'
                                      : 'bg-white/[0.02] border-white/[0.05] hover:border-emerald-500/30'
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-black tracking-tight">{skill.title}</h4>
                                  {isDraft && !isAdmin && <Lock size={14} className="text-white/40" />}
                                  {isDraft && isAdmin && (
                                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[8px] px-2 py-0">DRAFT</Badge>
                                  )}
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                  isActive ? 'text-black/60' : 'text-white/20'
                                }`}>
                                  {isActive ? 'Currently Active' : isDraft && !isAdmin ? 'Coming Soon' : 'Switch to Path'}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Explore Other Paths Section */}
          <div className="space-y-20 pt-32 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-3">
                <h3 className="font-black text-6xl tracking-tighter">Expand Your <span className="text-gradient">Empire</span></h3>
                <p className="text-white/30 text-xl font-medium max-w-2xl">Browse the full academy scope. Discover new technologies, master new paradigms, and build a multi-faceted career.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setIsPathSwitcherOpen(true)}
                  className="h-16 px-10 rounded-2xl bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-emerald-500/20 hover:scale-[1.05] transition-all flex items-center gap-3"
                >
                  <Compass size={18} /> Quick Selector
                </button>
                <button 
                  onClick={() => navigate('/coding-languages')}
                  className="h-16 px-8 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-[0.2em] text-xs hover:border-emerald-500/30 hover:text-emerald-400 transition-all flex items-center gap-3"
                >
                  Catalog <Code size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-32">
              {Object.entries(groupedPaths).map(([category, categorySkills]) => {
                const activeSkills = categorySkills.filter(s => s.status === 'active' && s.id !== progress.activeProgramId);
                if (activeSkills.length === 0) return null;

                return (
                  <div key={category} className="space-y-12">
                    <div className="relative">
                      <div className="flex items-center gap-10">
                        <div className="w-1.5 h-12 bg-emerald-500/20 rounded-full" />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-[0.5em] text-emerald-500">
                             {categoryLabels[category] || category}
                          </h4>
                          <p className="text-white/20 text-xs font-black uppercase tracking-widest mt-1">Available Programs • {activeSkills.length} Track(s)</p>
                        </div>
                        <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {activeSkills.map((skill) => {
                        const pathInfo = allPaths[skill.id] || {};
                        return (
                          <div key={skill.id} className="group/catalog relative">
                            <Card 
                              onClick={() => handlePathSwitch(skill)}
                              className="h-full glass-premium p-10 space-y-10 cursor-pointer hover:bg-white/[0.04] transition-all duration-700 border-white/5 hover:border-emerald-500/20 active:scale-[0.98] relative overflow-hidden"
                            >
                              <div className="flex justify-between items-start relative z-10">
                                <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] flex items-center justify-center text-white/20 group-hover/catalog:text-emerald-500 group-hover/catalog:bg-emerald-500/10 transition-all duration-700 shadow-inner">
                                  {skill.id.includes('python') || skill.id.includes('java') || skill.id.includes('script') || skill.id.includes('c-') ? <Code size={32} /> : <Compass size={32} />}
                                </div>
                                <div className="text-right">
                                  <Badge className="bg-white/5 text-white/40 border-white/10 text-[9px] uppercase tracking-widest font-black px-4 py-1 rounded-full mb-2">
                                    {skill.difficultyRange}
                                  </Badge>
                                  <p className="text-[10px] items-center gap-1 justify-end flex font-black text-emerald-500/40 uppercase tracking-widest">
                                    <Clock size={10} /> {skill.estimatedWeeks} Wks
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4 relative z-10">
                                <h4 className="font-black text-3xl tracking-tighter group-hover/catalog:text-emerald-400 transition-colors uppercase leading-none">{skill.title}</h4>
                                <p className="text-sm text-white/30 font-medium line-clamp-3 leading-relaxed">{skill.description}</p>
                              </div>

                              <div className="space-y-4 pt-10 border-t border-white/5 relative z-10">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-2 text-white/20">
                                      <BookOpen size={14} />
                                      <span className="text-[10px] font-black uppercase tracking-widest">{pathInfo.totalModules || 8} Modules</span>
                                   </div>
                                   <div className="flex items-center gap-2 text-white/20">
                                      <Terminal size={14} />
                                      <span className="text-[10px] font-black uppercase tracking-widest">12+ Projects</span>
                                   </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePathSwitch(skill);
                                  }}
                                  className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover/catalog:bg-emerald-500 group-hover/catalog:text-black group-hover/catalog:border-emerald-500 transition-all duration-500"
                                >
                                  Switch to Path
                                </button>
                              </div>

                              {/* Background Decoration */}
                              <div className="absolute -right-8 -bottom-8 opacity-[0.01] group-hover/catalog:opacity-[0.04] transition-all duration-1000 transform group-hover/catalog:scale-125 pointer-events-none">
                                <Code size={200} />
                              </div>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivation Card */}
          <div className="pt-12">
            <Card className="p-12 border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <Heart size={160} className="text-emerald-500" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-6 max-w-xl">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Your Journey</Badge>
                  <h2 className="text-4xl font-black tracking-tight leading-tight">
                    You're on the <span className="text-emerald-400">right path</span>
                  </h2>
                  <p className="text-white/40 text-lg font-medium">
                    Keep learning, build projects, and grow your skills step by step. You're ahead of most beginners already.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate(`/lesson/${nextLessonId}`)}
                  className="h-16 px-10 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 min-w-[240px]"
                >
                  Continue Learning
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <MentorChat />
    </div>

  );
};

const SkillNode = ({ label, locked, completed, progress }: { label: string; locked?: boolean; completed?: boolean; progress?: number }) => (
  <div className="flex flex-col items-center gap-4">
    <div className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center transition-all duration-500 relative ${
      locked 
        ? 'border-white/5 bg-white/[0.02] text-white/10' 
        : completed
          ? 'border-emerald-500 bg-emerald-500 text-black shadow-[0_0_40px_rgba(16,185,129,0.4)]'
          : 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
    }`}>
      {/* Progress Ring */}
      {!locked && !completed && progress !== undefined && (
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={2 * Math.PI * 44}
            strokeDashoffset={2 * Math.PI * 44 * (1 - progress / 100)}
            className="opacity-20"
          />
        </svg>
      )}
      <div className={`p-4 rounded-2xl ${completed ? 'bg-black/10' : 'bg-white/5'}`}>
        {locked ? <Lock size={28} /> : completed ? <CheckCircle2 size={28} /> : <Zap size={28} />}
      </div>
    </div>
    <div className="text-center space-y-1">
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${locked ? 'text-white/20' : 'text-white/60'}`}>{label}</span>
      {!locked && progress !== undefined && progress > 0 && progress < 100 && (
        <p className="text-[9px] font-bold text-emerald-500/60">{progress}%</p>
      )}
    </div>
  </div>
);
