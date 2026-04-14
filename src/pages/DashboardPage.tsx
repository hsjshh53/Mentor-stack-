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
  Heart, Map as MapIcon, AlertCircle
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
          const lessonsRef = ref(db, `ai_generated_lessons/${skill.id}`);
          
          const [pathSnap, stagesSnap, lessonsSnap] = await Promise.all([
            get(pathRef),
            get(stagesRef),
            get(lessonsRef)
          ]);

          if (pathSnap.exists()) setDynamicPath(pathSnap.val());
          if (lessonsSnap.exists()) {
            setDynamicLessons(Object.values(lessonsSnap.val()));
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
    { icon: <Zap size={20} />, label: 'AI Tutor', path: '/ai-tutor' },
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
          
          {/* Welcome Area */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Primary Path</Badge>
                <button 
                  onClick={() => setIsPathSwitcherOpen(true)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-emerald-400 transition-colors"
                >
                  <ArrowRightLeft size={12} />
                  Switch Path
                </button>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4">
                {activeSkill?.title || progress.selectedPath} <br />
                <span className="text-gradient">Academy</span>
              </h1>
              <div className="space-y-3 max-w-md">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                  <span>Journey Progress</span>
                  <span className="text-emerald-400">{allLessonsInPath.length > 0 ? Math.round((progress.completedLessons.length / allLessonsInPath.length) * 100) : 0}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/[0.05]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${allLessonsInPath.length > 0 ? (progress.completedLessons?.length / allLessonsInPath.length) * 100 : 0}%` }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
              {activeSkill && !dynamicPath && !loading && (
                <p className="text-orange-400/60 text-xs font-bold uppercase tracking-widest mt-4 flex items-center gap-2">
                  <AlertCircle size={14} />
                  Curriculum is currently being drafted by Admin
                </p>
              )}
              <p className="text-white/40 font-medium text-lg md:text-xl max-w-md leading-relaxed pt-4">
                Welcome back, <span className="text-white font-black">{user?.displayName?.split(' ')[0] || 'Developer'}</span>. You're on step <span className="text-emerald-400 font-black">{allLessonsInPath.indexOf(nextLessonId || '') + 1}</span> of <span className="text-white/60">{allLessonsInPath.length}</span>.
              </p>
            </div>

            {/* Stats Row */}
              <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              {[
                { label: 'Streak', value: `${streak} Days`, icon: <Flame size={20} fill="currentColor" />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                { label: 'XP', value: xp, icon: <Zap size={20} fill="currentColor" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                { label: 'Level', value: currentStage, icon: <Trophy size={20} fill="currentColor" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10' }
              ].map((stat) => (
                <Card 
                  key={stat.label} 
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate('/profile')}
                  className="flex-grow md:flex-none flex items-center gap-5 px-8 py-6 bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-emerald-500/20 transition-all duration-500 cursor-pointer active:scale-[0.98]"
                >
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">{stat.label}</p>
                    <p className="font-black text-xl tracking-tight">{stat.value}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="space-y-5">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em]">Current Level:</p>
                <h3 className="font-black text-2xl tracking-tight">Level {Math.floor(xp / 100) + 1} <span className="text-white/20 ml-2">/ 10</span></h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-400 tracking-tight">{xpProgress}</span>
                <span className="text-sm font-black text-white/20 uppercase tracking-widest ml-1">/ 100 XP</span>
              </div>
            </div>
            <div className="w-full h-4 bg-white/[0.03] rounded-full p-1 border border-white/[0.05]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] relative"
              >
                <div className="absolute top-0 right-0 w-8 h-full bg-white/20 blur-md rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>

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

          {/* Grid Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Progress Summary */}
            <Card className="p-10 space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-emerald-400">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Clock size={22} />
                  </div>
                  <h3 className="font-black uppercase text-sm tracking-[0.2em]">Curriculum Progress</h3>
                </div>
                <Badge className="bg-white/[0.05] text-white/40 border-white/[0.08]">Updated Today</Badge>
              </div>
              
              <div className="space-y-10">
                {(Object.values((currentPathData as any)?.levels || {}) as any[]).flatMap(l => l.modules || []).slice(0, 5).map((module: any, i: number) => (
                  <div key={module.id} className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white/60 tracking-tight">{module.title}</span>
                      </div>
                      <span className="text-xl font-black text-white tracking-tighter">{getModuleProgress(module.id)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05] p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${getModuleProgress(module.id)}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
                className="w-full h-20 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] text-sm font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center justify-center gap-4 hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap size={20} fill="currentColor" />
                </div>
                Consult AI Tutor
              </button>
            </Card>

            {/* Mastery & Skills */}
            <Card className="p-10 space-y-10">
              <div className="flex items-center gap-4 text-emerald-400">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <BrainCircuit size={22} />
                </div>
                <h3 className="font-black uppercase text-sm tracking-[0.2em]">Mastery & Skills</h3>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em]">Top Strengths</p>
                    <div className="flex-grow h-px bg-white/[0.05]" />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Logic', 'Problem Solving', 'Consistency'].map(s => (
                      <Badge key={s} className="bg-emerald-500/5 text-emerald-400/60 border-emerald-500/10 px-4 py-2 text-xs font-bold">{s}</Badge>
                    ))}
                    <p className="text-sm italic text-white/20 font-medium w-full mt-2">Complete more tests to unlock deeper insights.</p>
                  </div>
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em]">Growth Areas</p>
                    <div className="flex-grow h-px bg-white/[0.05]" />
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.1] text-center">
                    <p className="text-sm text-white/20 font-medium italic">No weak topics identified yet. <br /> Your performance is exceptionally stable.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Skill Tree Progress */}
          <Card className="p-12 space-y-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4 text-emerald-400">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Network size={22} />
                </div>
                <h3 className="font-black uppercase text-sm tracking-[0.2em]">{activeSkill?.title || progress.selectedPath} Mastery Tree</h3>
              </div>
              <Badge className="bg-emerald-500 text-black border-none font-black">
                {Math.floor(xp / 500) > 0 ? `Tier ${Math.floor(xp / 500) + 1} Active` : 'Novice Tier'}
              </Badge>
            </div>

            <div className="relative flex flex-col items-center gap-20 py-16 z-10">
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 items-center relative">
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
                        <div className="hidden md:block w-12 h-1 bg-white/5" />
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
                    <div className="hidden md:block w-24 h-1 bg-gradient-to-r from-emerald-500 to-white/5" />
                    <SkillNode 
                      label="Intermediate" 
                      locked={progress.currentStage === 'Beginner'}
                      completed={progress.currentStage === 'Advanced'}
                      progress={progress.currentStage === 'Intermediate' ? 50 : (progress.currentStage === 'Advanced' ? 100 : 0)}
                    />
                    <div className="hidden md:block w-24 h-1 bg-white/5" />
                    <SkillNode 
                      label="Advanced" 
                      locked={progress.currentStage !== 'Advanced'}
                      completed={progress.completedExams?.includes(currentPathData?.finalExamId || '')}
                      progress={progress.currentStage === 'Advanced' ? 50 : 0}
                    />
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Featured Lessons Section */}
          <div className="space-y-10 pt-12">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-black text-4xl tracking-tighter">Featured Lessons</h3>
                <p className="text-white/30 font-medium">Hand-picked curriculum for your current level.</p>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group active:scale-95"
              >
                Explore All <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><ChevronRight size={18} /></div>
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {featuredLessons.map((lesson) => (
                <Card 
                  key={lesson.id}
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                  className="p-8 flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 border-white/[0.05] hover:border-emerald-500/20"
                >
                  <div className="flex gap-10 items-center">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                      <BookOpen size={32} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-black tracking-[0.2em]">{lesson.tag}</Badge>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        <div className="flex items-center gap-2 text-white/20">
                          <Clock size={14} />
                          <span className="text-xs font-black tracking-tight">{lesson.duration}</span>
                        </div>
                      </div>
                      <h4 className="font-black text-2xl tracking-tight group-hover:text-emerald-400 transition-colors">{lesson.title}</h4>
                      <p className="text-base text-white/30 font-medium max-w-md">{lesson.desc}</p>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/10 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 group-hover:translate-x-2 transition-all duration-500">
                    <ChevronRight size={24} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          {certificates.length > 0 && (
            <div className="space-y-10 pt-12">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h3 className="font-black text-4xl tracking-tighter">Your Credentials</h3>
                  <p className="text-white/30 font-medium">Verified proof of your professional skills.</p>
                </div>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group"
                >
                  View All <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><Award size={18} /></div>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.slice(0, 2).map((cert) => (
                  <Card 
                    key={cert.id}
                    onClick={() => navigate(`/certificate/${cert.id}`)}
                    className="p-8 border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.03] to-transparent group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="flex gap-8 items-center relative z-10">
                      <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck size={40} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-500 text-black border-none text-[8px] font-black tracking-widest">{cert.tier}</Badge>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(cert.issueDate).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-black text-xl tracking-tight group-hover:text-emerald-400 transition-colors">{cert.pathName}</h4>
                        <div className="flex items-center gap-2 text-emerald-500/60 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 size={12} />
                          Verified Credential
                        </div>
                      </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                      <Award size={160} />
                    </div>
                  </Card>
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
          <div className="space-y-20 pt-20">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-black text-4xl tracking-tighter">Explore the <span className="text-gradient">Academy</span></h3>
                <p className="text-white/30 font-medium">Browse all professional programs across all categories.</p>
              </div>
              <button 
                onClick={() => navigate('/coding-languages')}
                className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group"
              >
                Programming Languages <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><Code size={18} /></div>
              </button>
              <button 
                onClick={() => setIsPathSwitcherOpen(true)}
                className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group"
              >
                Quick Switch <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><Compass size={18} /></div>
              </button>
            </div>
            
            <div className="space-y-24">
              {/* Explicitly render Programming Languages section first for prominence if it exists */}
              {(() => {
                const category = 'coding-languages';
                const categorySkills = groupedPaths[category] || [];
                const activeSkills = categorySkills.filter(s => s.status === 'active' && s.id !== progress.activeProgramId);
                
                return (
                  <div key={category} className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500/60 whitespace-nowrap">
                          {categoryLabels[category] || 'Programming Languages (0)'}
                        </h4>
                        <div className="h-px flex-grow bg-white/5" />
                      </div>
                      <p className="text-white/30 text-sm font-medium">
                        {(categoryDescriptions as any)[category] || 'Master the world\'s most popular programming languages.'}
                      </p>
                    </div>

                    {activeSkills.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeSkills.map((skill) => {
                          const pathInfo = allPaths[skill.id] || {};
                          return (
                            <Card 
                              key={skill.id}
                              onClick={() => handlePathSwitch(skill)}
                              className="p-8 space-y-6 group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 border-white/[0.05] hover:border-emerald-500/20 active:scale-[0.98] relative overflow-hidden"
                            >
                              <div className="flex justify-between items-start relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-500">
                                  <Code size={24} />
                                </div>
                                <Badge className="bg-white/5 text-white/40 border-white/10 text-[8px] uppercase tracking-widest font-black">
                                  {skill.difficultyRange}
                                </Badge>
                              </div>

                              <div className="space-y-3 relative z-10">
                                <h4 className="font-black text-xl tracking-tight group-hover:text-emerald-400 transition-colors">{skill.title}</h4>
                                <p className="text-xs text-white/30 font-medium line-clamp-2 leading-relaxed">{skill.description}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
                                <div className="space-y-1">
                                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Duration</p>
                                  <div className="flex items-center gap-1.5 text-emerald-500/60">
                                    <Clock size={12} />
                                    <span className="text-xs font-bold">{skill.estimatedWeeks} Weeks</span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Curriculum</p>
                                  <div className="flex items-center gap-1.5 text-emerald-500/60">
                                    <BookOpen size={12} />
                                    <span className="text-xs font-bold">
                                      {pathInfo.totalModules || 0} Modules • {pathInfo.totalLessons || 0} Lessons
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between relative z-10 pt-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400/60 group-hover:text-emerald-400 transition-colors">
                                  Start Learning <ChevronRight size={12} />
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="rounded-xl border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handlePathSwitch(skill);
                                  }}
                                >
                                  Switch to Path
                                </Button>
                              </div>

                              {/* Background Decoration */}
                              <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none transform rotate-12">
                                <Terminal size={120} />
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-[2rem]">
                        <p className="text-white/20 font-medium">No programming language programs available yet.</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Render other categories */}
              {Object.entries(groupedPaths).map(([category, categorySkills]) => {
                if (category === 'coding-languages') return null; // Already rendered above
                
                const activeSkills = categorySkills.filter(s => s.status === 'active' && s.id !== progress.activeProgramId);
                if (activeSkills.length === 0) return null;

                return (
                  <div key={category} className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-emerald-500/60 whitespace-nowrap">
                          {(categoryLabels as any)[category] || category}
                        </h4>
                        <div className="h-px flex-grow bg-white/5" />
                      </div>
                      <p className="text-white/30 text-sm font-medium">
                        {(categoryDescriptions as any)[category]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {activeSkills.map((skill) => {
                        const pathInfo = allPaths[skill.id] || {};
                        return (
                          <Card 
                            key={skill.id}
                            onClick={() => handlePathSwitch(skill)}
                            className="p-8 space-y-6 group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 border-white/[0.05] hover:border-emerald-500/20 active:scale-[0.98] relative overflow-hidden"
                          >
                            <div className="flex justify-between items-start relative z-10">
                              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-500">
                                <Compass size={24} />
                              </div>
                              <Badge className="bg-white/5 text-white/40 border-white/10 text-[8px] uppercase tracking-widest font-black">
                                {skill.difficultyRange}
                              </Badge>
                            </div>

                            <div className="space-y-3 relative z-10">
                              <h4 className="font-black text-xl tracking-tight group-hover:text-emerald-400 transition-colors">{skill.title}</h4>
                              <p className="text-xs text-white/30 font-medium line-clamp-2 leading-relaxed">{skill.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 relative z-10">
                              <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Duration</p>
                                <div className="flex items-center gap-1.5 text-emerald-500/60">
                                  <Clock size={12} />
                                  <span className="text-xs font-bold">{skill.estimatedWeeks} Weeks</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Curriculum</p>
                                <div className="flex items-center gap-1.5 text-emerald-500/60">
                                  <BookOpen size={12} />
                                  <span className="text-xs font-bold">
                                    {pathInfo.totalModules || 0} Modules • {pathInfo.totalLessons || 0} Lessons
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between relative z-10 pt-4">
                              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400/60 group-hover:text-emerald-400 transition-colors">
                                Explore Program <ChevronRight size={12} />
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="rounded-xl border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-[10px] font-black uppercase tracking-widest"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePathSwitch(skill);
                                }}
                              >
                                Switch to Path
                              </Button>
                            </div>
                          </Card>
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
