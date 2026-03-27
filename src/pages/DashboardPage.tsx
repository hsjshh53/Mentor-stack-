import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Flame, Star, Play, ChevronRight, 
  Menu, Bell, User, Zap, Clock, BrainCircuit, 
  Network, X, LogOut, BookOpen, Terminal, 
  Target, LayoutDashboard, MessageSquare, Search,
  Sparkles, CheckCircle2, Lock, Compass, ArrowRightLeft,
  Award, ShieldCheck, ExternalLink
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { MentorChat } from '../components/MentorChat';
import { LoadingScreen } from '../components/LoadingScreen';
import { CURRICULUM } from '../constants/curriculum';
import { STAGE_TESTS } from '../constants/tests';
import { FINAL_EXAMS } from '../constants/exams';
import { LESSON_CONTENT } from '../constants/lessons';
import { CareerPath, Certificate } from '../types';
import { getUserCertificates } from '../services/certificateService';

export const DashboardPage: React.FC = () => {
  const { progress, loading, updateProgress } = useUserData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPathSwitcherOpen, setIsPathSwitcherOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    if (user) {
      getUserCertificates(user.uid).then(setCertificates);
    }
  }, [user]);

  const currentPathData = useMemo(() => {
    if (!progress?.selectedPath) return null;
    const path = progress.selectedPath as CareerPath;
    if (!CURRICULUM[path]) {
      console.error(`Path ${path} not found in CURRICULUM`);
      return null;
    }
    return CURRICULUM[path];
  }, [progress?.selectedPath]);

  const allLessonsInPath = useMemo(() => {
    if (!currentPathData) return [];
    return currentPathData.modules.flatMap(m => m.lessons || []);
  }, [currentPathData]);

  const nextLessonId = useMemo(() => {
    if (!progress || !allLessonsInPath.length) return null;
    
    // Check for next lesson
    const lessonId = allLessonsInPath.find(id => !progress.completedLessons?.includes(id));
    if (lessonId) return lessonId;

    return allLessonsInPath[0];
  }, [allLessonsInPath, progress?.completedLessons]);

  const nextExam = useMemo(() => {
    if (!progress || !currentPathData?.finalExamId) return null;
    
    // If all lessons are done, check for final exam
    const allDone = allLessonsInPath.every(id => progress.completedLessons?.includes(id));
    if (allDone && !progress.completedExams?.includes(currentPathData.finalExamId)) {
      return FINAL_EXAMS.find(e => e.id === currentPathData.finalExamId);
    }

    return null;
  }, [allLessonsInPath, currentPathData, progress?.completedLessons, progress?.completedExams]);

  const nextTest = useMemo(() => {
    if (!progress || !currentPathData) return null;
    
    for (const module of currentPathData.modules) {
      if (!module.testId) continue;
      
      const allLessonsDone = module.lessons.every(id => progress.completedLessons?.includes(id));
      const testDone = progress.completedTests?.includes(module.testId);
      
      if (allLessonsDone && !testDone) {
        return STAGE_TESTS.find(t => t.id === module.testId);
      }
    }
    return null;
  }, [currentPathData, progress?.completedLessons, progress?.completedTests]);

  const nextLesson = useMemo(() => {
    if (!nextLessonId) return null;
    return LESSON_CONTENT[nextLessonId as keyof typeof LESSON_CONTENT];
  }, [nextLessonId]);

  const groupedPaths = useMemo(() => {
    const groups: Record<string, CareerPath[]> = {};
    Object.entries(CURRICULUM).forEach(([path, data]) => {
      const category = data.category;
      if (!groups[category]) groups[category] = [];
      groups[category].push(path as CareerPath);
    });
    return groups;
  }, []);

  if (loading || !progress) return <LoadingScreen />;

  const xp = Number(progress.xp) || 0;
  const xpProgress = xp % 100;
  const streak = Number(progress.streak) || 0;
  const currentStage = progress.currentStage || 'Beginner';

  if (!progress.selectedPath || !CURRICULUM[progress.selectedPath as CareerPath]) {
    navigate('/onboarding');
    return null;
  }

  const getModuleProgress = (moduleId: string) => {
    if (!progress || !currentPathData) return 0;
    const module = currentPathData.modules.find(m => m.id === moduleId);
    if (!module || module.lessons.length === 0) return 0;
    
    const completed = module.lessons.filter(id => progress.completedLessons?.includes(id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const handlePathSwitch = async (path: CareerPath) => {
    const pathData = CURRICULUM[path];
    if (pathData.status === 'locked') return;
    
    await updateProgress({ selectedPath: path });
    setIsPathSwitcherOpen(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true, path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'Lessons', path: '/dashboard' },
    { icon: <Zap size={20} />, label: 'AI Tutor', path: '/ai-tutor' },
    { icon: <Terminal size={20} />, label: 'Playground', path: '/playground' },
    { icon: <Target size={20} />, label: 'Projects', path: '/projects' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
  ];

  const featuredLessons = [
    { 
      tag: 'RECOMMENDED', 
      id: allLessonsInPath[0] || 'what-is-coding',
      title: 'Getting Started', 
      desc: 'Begin your journey with the fundamentals.', 
      duration: '10 mins' 
    },
    { 
      tag: 'ESSENTIAL', 
      id: allLessonsInPath[5] || 'html-structure',
      title: 'Core Concepts', 
      desc: 'Master the building blocks of your path.', 
      duration: '15 mins' 
    },
    { 
      tag: 'ADVANCED', 
      id: allLessonsInPath[15] || 'js-intro',
      title: 'Deep Dive', 
      desc: 'Take your skills to the next level.', 
      duration: '20 mins' 
    }
  ];

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
              <p className="text-sm font-black tracking-tight group-hover:text-emerald-400 transition-colors">{user?.displayName || 'AJIA Abdulrasak'}</p>
              <p className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.2em]">Pro Member</p>
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
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                {progress.selectedPath} <br />
                <span className="text-gradient">Academy</span>
              </h1>
              <div className="space-y-2 max-w-md">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                  <span>Path Progress</span>
                  <span>{allLessonsInPath.length > 0 ? Math.round((progress.completedLessons.length / allLessonsInPath.length) * 100) : 0}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.completedLessons?.length / allLessonsInPath.length) * 100}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
              <p className="text-white/30 font-medium text-lg md:text-xl max-w-md leading-relaxed">
                Welcome back, {user?.displayName?.split(' ')[0] || 'Developer'}. You're on step <span className="text-emerald-400/60">{allLessonsInPath.indexOf(nextLessonId || '') + 1}</span> of your journey.
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
          <Card className="p-12 border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-transparent relative overflow-hidden group min-h-[400px] flex items-center">
            <div className="relative z-10 space-y-10 max-w-lg">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-emerald-500/10">
                <Sparkles size={14} fill="currentColor" />
                {nextTest ? 'Stage Test Available' : nextExam ? 'Final Exam Ready' : 'Recommended Next'}
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
                  {nextTest ? nextTest.title : nextExam ? nextExam.title : nextLesson?.title || 'Start Learning'}
                </h2>
                <p className="text-white/40 text-xl leading-relaxed font-medium">
                  {nextTest ? nextTest.description : nextExam ? nextExam.description : nextLesson?.todayYouAreLearning || 'Begin your journey into the world of technology with our guided curriculum.'}
                </p>
              </div>
              <Button 
                onClick={() => {
                  if (nextTest) navigate(`/test/${nextTest.id}`);
                  else if (nextExam) navigate(`/exam/${nextExam.id}`);
                  else navigate(`/lesson/${nextLessonId}`);
                }}
                className="group h-20 px-12 text-lg font-black tracking-tight shadow-2xl shadow-emerald-500/40 rounded-[2rem]"
              >
                {nextTest ? 'Start Stage Test' : nextExam ? 'Take Final Exam' : progress.completedLessons?.length ? 'Continue Learning' : 'Start First Lesson'}
                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-300 ml-3" />
              </Button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -right-20 -bottom-20 p-10 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000 pointer-events-none">
              {nextTest || (nextLesson as any)?.isExam ? <Trophy size={600} /> : <BookOpen size={600} />}
            </div>
            <div className="absolute top-1/2 right-24 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-1000" />
          </Card>

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
                {currentPathData?.modules.slice(0, 5).map((module, i) => (
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
                <h3 className="font-black uppercase text-sm tracking-[0.2em]">{progress.selectedPath} Mastery Tree</h3>
              </div>
              <Badge className="bg-emerald-500 text-black border-none font-black">
                {Math.floor(xp / 500) > 0 ? `Tier ${Math.floor(xp / 500) + 1} Active` : 'Novice Tier'}
              </Badge>
            </div>

            <div className="relative flex flex-col items-center gap-20 py-16 z-10">
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center relative">
                <SkillNode 
                  label={currentPathData?.modules[0]?.title || 'Module 1'} 
                  completed={getModuleProgress(currentPathData?.modules[0]?.id || '') === 100} 
                  progress={getModuleProgress(currentPathData?.modules[0]?.id || '')}
                />
                <div className="hidden md:block w-24 h-1 bg-gradient-to-r from-emerald-500 to-white/5" />
                <SkillNode 
                  label={currentPathData?.modules[1]?.title || 'Module 2'} 
                  locked={getModuleProgress(currentPathData?.modules[0]?.id || '') < 50}
                  completed={getModuleProgress(currentPathData?.modules[1]?.id || '') === 100}
                  progress={getModuleProgress(currentPathData?.modules[1]?.id || '')}
                />
              </div>
              <div className="w-1 h-20 bg-white/5" />
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center relative">
                <SkillNode 
                  label={currentPathData?.modules[2]?.title || 'Module 3'} 
                  locked={getModuleProgress(currentPathData?.modules[1]?.id || '') < 50}
                  completed={getModuleProgress(currentPathData?.modules[2]?.id || '') === 100}
                  progress={getModuleProgress(currentPathData?.modules[2]?.id || '')}
                />
                <div className="hidden md:block w-24 h-1 bg-white/5" />
                <SkillNode 
                  label={currentPathData?.modules[3]?.title || 'Module 4'} 
                  locked={getModuleProgress(currentPathData?.modules[2]?.id || '') < 50}
                  completed={getModuleProgress(currentPathData?.modules[3]?.id || '') === 100}
                  progress={getModuleProgress(currentPathData?.modules[3]?.id || '')}
                />
              </div>
              <div className="w-1 h-20 bg-white/5" />
              <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center relative">
                <SkillNode 
                  label={currentPathData?.modules[4]?.title || 'Module 5'} 
                  locked={getModuleProgress(currentPathData?.modules[3]?.id || '') < 50}
                  completed={getModuleProgress(currentPathData?.modules[4]?.id || '') === 100}
                  progress={getModuleProgress(currentPathData?.modules[4]?.id || '')}
                />
                <div className="hidden md:block w-24 h-1 bg-white/5" />
                <SkillNode 
                  label="Final Exam" 
                  locked={getModuleProgress(currentPathData?.modules[4]?.id || '') < 50}
                  completed={progress.completedExams?.includes(currentPathData?.finalExamId || '')}
                  progress={progress.completedExams?.includes(currentPathData?.finalExamId || '') ? 100 : 0}
                />
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
                    {Object.entries(groupedPaths).map(([category, paths]) => (
                      <div key={category} className="space-y-6">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60">{category}</h3>
                          <div className="flex-grow h-px bg-white/[0.05]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {paths.map((path) => {
                            const pathData = CURRICULUM[path];
                            const isLocked = pathData.status === 'locked';
                            const isPartial = pathData.status === 'partial';
                            const isActive = progress.selectedPath === path;

                            return (
                              <button
                                key={path}
                                onClick={() => handlePathSwitch(path)}
                                disabled={isLocked}
                                className={`p-6 rounded-2xl border transition-all text-left group relative overflow-hidden ${
                                  isActive 
                                    ? 'bg-emerald-500 border-emerald-500 text-black' 
                                    : isLocked
                                      ? 'bg-white/[0.01] border-white/[0.03] opacity-40 cursor-not-allowed'
                                      : 'bg-white/[0.02] border-white/[0.05] hover:border-emerald-500/30'
                                }`}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-black tracking-tight">{path}</h4>
                                  {isLocked && <Lock size={14} className="text-white/40" />}
                                  {isPartial && !isActive && (
                                    <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[8px] px-2 py-0">PARTIAL</Badge>
                                  )}
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${
                                  isActive ? 'text-black/60' : 'text-white/20'
                                }`}>
                                  {isActive ? 'Currently Active' : isLocked ? 'Coming Soon' : 'Switch to Path'}
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
          <div className="space-y-10 pt-12">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="font-black text-4xl tracking-tighter">Explore Other Paths</h3>
                <p className="text-white/30 font-medium">Preview what else you can learn at MentorStack.</p>
              </div>
              <button 
                onClick={() => setIsPathSwitcherOpen(true)}
                className="text-emerald-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:translate-x-2 transition-all duration-300 group"
              >
                View All <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all"><Compass size={18} /></div>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(CURRICULUM)
                .filter(p => p !== progress.selectedPath)
                .slice(0, 3)
                .map((path) => (
                  <Card 
                    key={path}
                    onClick={() => handlePathSwitch(path as CareerPath)}
                    className="p-8 space-y-6 group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 border-white/[0.05] hover:border-emerald-500/20 active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-500">
                      <Compass size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-black text-xl tracking-tight group-hover:text-emerald-400 transition-colors">{path}</h4>
                      <p className="text-xs text-white/30 font-medium line-clamp-2">Master the skills required for a career as a {path}.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400/60 group-hover:text-emerald-400 transition-colors">
                      Explore Path <ChevronRight size={12} />
                    </div>
                  </Card>
              ))}
            </div>
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
