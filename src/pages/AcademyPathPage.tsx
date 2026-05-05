import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Map, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  BookOpen,
  Clock,
  Layers,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Award,
  Zap,
  Target,
  ShieldCheck,
  Star,
  Play
} from 'lucide-react';
import { firebaseSafeGet } from '../lib/FirebaseService';
import { ref } from 'firebase/database';
import { auth, db } from '../lib/firebase';
import { useUserData } from '../hooks/useUserData';
import { Card, Badge, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { LoadingScreen } from '../components/LoadingScreen';
import { CurriculumPath, CurriculumStage, CurriculumWeek, CurriculumModule, Skill } from '../types';

export const AcademyPathPage: React.FC = () => {
  const { pathName } = useParams<{ pathName: string }>();
  const navigate = useNavigate();
  const { progress, loading: userLoading } = useUserData();
  const { user, profileReady } = useAuth();
  
  const [skill, setSkill] = useState<Skill | null>(null);
  const [path, setPath] = useState<CurriculumPath | null>(null);
  const [stages, setStages] = useState<CurriculumStage[]>([]);
  const [weeks, setWeeks] = useState<Record<string, CurriculumWeek[]>>({});
  const [modules, setModules] = useState<Record<string, CurriculumModule[]>>({});
  const [lessons, setLessons] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  
  const [expandedStages, setExpandedStages] = useState<string[]>([]);
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([]);

  useEffect(() => {
    if (!pathName || userLoading || !user || !profileReady) {
      if (!userLoading && !user) setLoading(false);
      return;
    }

    const fetchAcademyData = async () => {
      setLoading(true);
      console.log("[Academy] Fetching data for pathName:", pathName);
      try {
        const skillsRef = ref(db, 'skills');
        console.log("[Academy] Fetching skills...");
        const skillsData = await firebaseSafeGet(skillsRef, "AllSkills");
        
        if (skillsData) {
          const skillsList = Object.values(skillsData) as Skill[];
          const foundSkill = skillsList.find(s => s.title === pathName || s.id === pathName);
          
          if (foundSkill) {
            console.log("[Academy] Found skill:", foundSkill.id);
            setSkill(foundSkill);
            
            const pathRef = ref(db, `curriculum_paths/${foundSkill.id}`);
            const stagesRef = ref(db, `curriculum_stages/${foundSkill.id}`);
            // ONLY LOAD PUBLISHED LESSONS FOR STUDENTS
            const allLessonsRef = ref(db, `lessons/${foundSkill.id}`);

            console.log("[Academy] Fetching path, stages, and published lessons in parallel...");
            const [pathData, stagesDataRaw, lessonsDataRaw] = await Promise.all([
              firebaseSafeGet(pathRef, "CurriculumPath"),
              firebaseSafeGet(stagesRef, "CurriculumStages"),
              firebaseSafeGet(allLessonsRef, "CurriculumLessons")
            ]);

            if (pathData) setPath(pathData as CurriculumPath);
            
            if (stagesDataRaw) {
              const stagesData = Object.values(stagesDataRaw) as CurriculumStage[];
              const sortedStages = stagesData.sort((a, b) => a.order - b.order);
              setStages(sortedStages);
              
              if (sortedStages.length > 0) setExpandedStages([sortedStages[0].id]);

              const weeksMap: Record<string, CurriculumWeek[]> = {};
              const modulesMap: Record<string, CurriculumModule[]> = {};

              console.log("[Academy] Fetching weeks and modules for stages...");
              // We'll use Promise.all to fetch weeks for all stages in parallel
              const weekPromises = sortedStages.map(stage => 
                firebaseSafeGet(ref(db, `curriculum_weeks/${stage.id}`), `Weeks_${stage.id}`)
              );
              const weeksDataArray = await Promise.all(weekPromises);

              const modulePromises: Promise<any>[] = [];
              const weekIdsForModules: string[] = [];

              weeksDataArray.forEach((weeksData, idx) => {
                if (weeksData) {
                  const stage = sortedStages[idx];
                  const sortedWeeks = (Object.values(weeksData) as CurriculumWeek[]).sort((a, b) => a.weekNumber - b.weekNumber);
                  weeksMap[stage.id] = sortedWeeks;
                  
                  sortedWeeks.forEach(week => {
                    modulePromises.push(firebaseSafeGet(ref(db, `curriculum_modules/${week.id}`), `Modules_${week.id}`));
                    weekIdsForModules.push(week.id);
                  });
                }
              });

              const modulesDataArray = await Promise.all(modulePromises);
              modulesDataArray.forEach((modsData, idx) => {
                if (modsData) {
                  const weekId = weekIdsForModules[idx];
                  modulesMap[weekId] = (Object.values(modsData) as CurriculumModule[]).sort((a, b) => a.order - b.order);
                }
              });
              
              setWeeks(weeksMap);
              setModules(modulesMap);
            }

            if (lessonsDataRaw) {
              const lessonsData = Object.values(lessonsDataRaw) as any[];
              const lessonsMap: Record<string, any[]> = {};
              lessonsData.forEach(lesson => {
                if (!lessonsMap[lesson.moduleId]) lessonsMap[lesson.moduleId] = [];
                lessonsMap[lesson.moduleId].push(lesson);
              });
              Object.keys(lessonsMap).forEach(modId => {
                lessonsMap[modId].sort((a, b) => a.order - b.order);
              });
              setLessons(lessonsMap);
            }
          } else {
            console.warn("[Academy] Skill not found in skillsData for pathName:", pathName);
          }
        } else {
          console.error("[Academy] No skills defined in database.");
        }
      } catch (error) {
        console.error("Error fetching academy data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user && profileReady) {
      fetchAcademyData();
    }
  }, [pathName, userLoading, user, profileReady]);

  if (userLoading || loading) return <LoadingScreen message="LOADING ACADEMY PATH..." />;

  if (!skill || !path) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/20">
          <Map size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Program Not Found</h1>
          <p className="text-white/40 max-w-md mx-auto">
            We couldn't find the academy program you're looking for. It might still be under construction.
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard')} className="h-14 px-8 rounded-2xl">
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const toggleStage = (stageId: string) => {
    setExpandedStages(prev => 
      prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]
    );
  };

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks(prev => 
      prev.includes(weekId) ? prev.filter(id => id !== weekId) : [...prev, weekId]
    );
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress?.completedLessons?.includes(lessonId);
  };

  const categoryLabels: Record<string, string> = {
    'career-path': 'Career Development Program',
    'coding-languages': 'Programming Language Program',
    'development-skill': 'Development Skill Program',
    'tool-foundation': 'Tools & Foundations',
    'career-prep': 'Career Readiness'
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-3 -ml-3 hover:bg-white/5 rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={24} className="text-white/60" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tighter">OLYNQ Stack Academy</span>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto pb-40">
        <div className="max-w-5xl mx-auto p-8 md:p-16 space-y-16">
          
          {/* Program Hero */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">
                  {categoryLabels[skill.category] || 'Academy Program'}
                </Badge>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1.5">
                  {skill.category === 'career-path' ? 'Career-Ready' : 'Skill Mastery'}
                </Badge>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                {skill.title} <br />
                <span className="text-gradient">Curriculum</span>
              </h1>
              <p className="text-white/40 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                {path.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Duration', value: `${skill.estimatedWeeks} Weeks`, icon: <Clock size={20} /> },
                { label: 'Modules', value: path.totalModules, icon: <Layers size={20} /> },
                { label: 'Lessons', value: path.totalLessons, icon: <BookOpen size={20} /> },
                { label: 'Certificate', value: skill.certificateEligible ? 'Eligible' : 'N/A', icon: <Award size={20} /> }
              ].map((stat, i) => (
                <Card key={i} className="p-6 bg-white/[0.02] border-white/5 space-y-3">
                  <div className="text-emerald-500">{stat.icon}</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.label}</p>
                    <p className="text-lg font-black">{stat.value}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-emerald-500/5 border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Target size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Career Outcome</p>
                  <h3 className="text-2xl font-black tracking-tight">{skill.careerOutcome}</h3>
                  <p className="text-sm text-white/40 font-medium">Master this curriculum to become a professional in this field.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Program Status</p>
                  <p className="text-sm font-bold text-emerald-400">Active Enrollment</p>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin-slow" />
              </div>
            </Card>
          </div>

          {/* Curriculum Hierarchy */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-white/5" />
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Academy Roadmap</h2>
              <div className="h-px flex-grow bg-white/5" />
            </div>

            <div className="space-y-8">
              {stages.map((stage, sIdx) => (
                <div key={stage.id} className="space-y-4">
                  {/* Stage Header */}
                  <button 
                    onClick={() => toggleStage(stage.id)}
                    className="w-full flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Layers size={28} />
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[8px] font-black uppercase tracking-widest">Stage {sIdx + 1}</Badge>
                          <h4 className="font-black text-2xl tracking-tight">{stage.title}</h4>
                        </div>
                        <p className="text-sm text-white/40 font-medium">{stage.levelName} Level • {weeks[stage.id]?.length || 0} Weeks of Training</p>
                      </div>
                    </div>
                    <div className={`transition-transform duration-500 ${expandedStages.includes(stage.id) ? 'rotate-180' : ''}`}>
                      <ChevronDown size={24} className="text-white/20" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedStages.includes(stage.id) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-8 border-l-2 border-white/5 ml-10 space-y-6"
                      >
                        {weeks[stage.id]?.map((week) => (
                          <div key={week.id} className="space-y-4">
                            {/* Week Header */}
                            <button 
                              onClick={() => toggleWeek(week.id)}
                              className="w-full flex items-center justify-between p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all"
                            >
                              <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 font-black text-xs">
                                  W{week.weekNumber}
                                </div>
                                <div className="text-left">
                                  <h5 className="font-black text-lg tracking-tight">{week.title}</h5>
                                  <p className="text-xs text-white/30 font-medium">{week.description}</p>
                                </div>
                              </div>
                              <div className={`transition-transform duration-300 ${expandedWeeks.includes(week.id) ? 'rotate-180' : ''}`}>
                                <ChevronDown size={20} className="text-white/10" />
                              </div>
                            </button>

                            <AnimatePresence>
                              {expandedWeeks.includes(week.id) && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden pl-10 space-y-4"
                                >
                                  {modules[week.id]?.map((module) => (
                                    <div key={module.id} className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                          <BookOpen size={16} />
                                        </div>
                                        <h6 className="font-black text-base tracking-tight text-white/80">{module.title}</h6>
                                      </div>

                                      <div className="grid grid-cols-1 gap-3 pl-12">
                                        {lessons[module.id]?.map((lesson) => (
                                          <button
                                            key={lesson.id}
                                            onClick={() => navigate(`/lesson/${lesson.id}`)}
                                            className="group flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all text-left"
                                          >
                                            <div className="flex items-center gap-4">
                                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                                isLessonCompleted(lesson.id) 
                                                  ? 'bg-emerald-500 text-black' 
                                                  : 'bg-white/5 text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10'
                                              }`}>
                                                {isLessonCompleted(lesson.id) ? <CheckCircle2 size={16} /> : <Play size={16} fill="currentColor" />}
                                              </div>
                                              <div>
                                                <p className={`font-bold text-sm transition-colors ${isLessonCompleted(lesson.id) ? 'text-white/40 line-through' : 'text-white/80 group-hover:text-white'}`}>
                                                  {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-3 mt-1">
                                                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{lesson.difficulty}</span>
                                                  <span className="w-1 h-1 rounded-full bg-white/5" />
                                                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20">5 MINS</span>
                                                </div>
                                              </div>
                                            </div>
                                            <ChevronRight size={16} className="text-white/10 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                          </button>
                                        ))}
                                        {(!lessons[module.id] || lessons[module.id].length === 0) && (
                                          <div className="p-4 rounded-xl border border-dashed border-white/5 text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">Lessons coming soon</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Graduation Section */}
          <div className="pt-20">
            <Card className="p-16 border-white/5 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-transparent relative overflow-hidden text-center space-y-8">
              <div className="w-24 h-24 rounded-[2.5rem] bg-purple-500/10 flex items-center justify-center mx-auto text-purple-400 shadow-2xl shadow-purple-500/20">
                <Award size={48} />
              </div>
              <div className="space-y-4 max-w-xl mx-auto">
                <h2 className="text-4xl font-black tracking-tight">Academy Graduation</h2>
                <p className="text-white/40 font-medium text-lg leading-relaxed">
                  Complete all stages, master the weekly modules, and pass the final professional exam to earn your <span className="text-purple-400 font-black">OLYNQ Stack Academy Certificate</span>.
                </p>
              </div>
              <div className="flex justify-center gap-8 pt-6">
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Verification</p>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck size={16} />
                    <span className="text-xs font-bold">Blockchain Verified</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Career Support</p>
                  <div className="flex items-center gap-2 text-purple-400">
                    <Star size={16} />
                    <span className="text-xs font-bold">Job Placement Help</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative Background */}
              <div className="absolute -left-20 -bottom-20 opacity-[0.02] pointer-events-none">
                <Award size={400} />
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
