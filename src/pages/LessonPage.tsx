import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, BookOpen, Clock, Trophy, 
  CheckCircle2, Zap, MessageSquare, Code,
  ChevronRight, Play, HelpCircle, Terminal,
  AlertCircle, Lightbulb, Target, RefreshCcw,
  Bell, User, Menu, X, Sparkles, Star, Layers
} from 'lucide-react';
import { firebaseSafeGet, firebaseSafeUpdate } from '../lib/FirebaseService';
import { ref } from 'firebase/database';
import { db } from '../lib/firebase';
import { Button, Card, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { LoadingScreen } from '../components/LoadingScreen';
import { useAuth } from '../context/AuthContext';
import { generateLesson } from '../lib/gemini';
import { LessonContent } from '../types/index';
import { MentorChat } from '../components/MentorChat';
import { AnimatePresence } from 'motion/react';

export const LessonPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const { user, profileReady } = useAuth();
  const { progress, loading: userLoading, updateProgress, addXP } = useUserData();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCodingOpen, setIsCodingOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number, total: number } | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [skillTitle, setSkillTitle] = useState<string>('');
  const [moduleTitle, setModuleTitle] = useState<string>('');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  useEffect(() => {
    if (progress?.activeProgramId && profileReady) {
      firebaseSafeGet(ref(db, `skills/${progress.activeProgramId}`), "SkillTitle").then((data: any) => {
        if (data) setSkillTitle(data.title);
      });
    }
  }, [progress, profileReady]);

  useEffect(() => {
    const fetchLesson = async () => {
      console.log("LessonPage: topic =", topic);
      console.log("LessonPage: userLoading =", userLoading);
      console.log("LessonPage: progress =", progress);

      if (userLoading || !profileReady || !user) return;

      if (!topic) {
        console.warn("LessonPage: Missing topic parameter");
        setError("Lesson topic is missing.");
        setLoading(false);
        return;
      }

      if (!progress?.selectedPath) {
        console.warn("LessonPage: Missing selectedPath, redirecting to onboarding if needed");
        if (progress && !progress.selectedPath) {
          setLoading(false);
          navigate('/onboarding');
        } else if (!progress) {
          setError("User progress not found.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log("LessonPage: Fetching lesson content for", topic);
        
        // 1. Try to fetch from approved lessons path
        let lessonData: any = null;
        if (progress.activeProgramId) {
          const categorizedRef = ref(db, `lessons/${progress.activeProgramId}/${topic}`);
          lessonData = await firebaseSafeGet(categorizedRef, "CategorizedLesson");
        }

        if (!lessonData) {
          const lessonRef = ref(db, `lessons/${topic}`);
          lessonData = await firebaseSafeGet(lessonRef, "ApprovedLesson");
        }
        
        if (lessonData && lessonData.status === 'published') {
          setLesson(lessonData as LessonContent);
          
          if ((lessonData as any).moduleId && (lessonData as any).weekId) {
            firebaseSafeGet(ref(db, `curriculum_modules/${(lessonData as any).weekId}/${(lessonData as any).moduleId}`), "ModuleTitle").then((mData: any) => {
              if (mData) setModuleTitle(mData.title);
            });
          }
          
          setLoading(false);
          return;
        }

        // 2. DISALLOW PENDING OR ON-THE-FLY FOR STUDENTS
        console.warn("LessonPage: No published lesson approved for", topic);
        setError("This lesson is pending moderation. Students cannot access it until approved.");
      } catch (error: any) {
        console.error("LessonPage: Error fetching lesson:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user && profileReady) {
      fetchLesson();
    }
  }, [progress, topic, userLoading, user, profileReady, navigate]);

  if (userLoading || loading) return <LoadingScreen message="PREPARING LESSON..." />;

  const isPlaceholder = lesson?.explanation?.includes("Draft lesson placeholder") || lesson?.status === 'generating';

  if (isPlaceholder) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-emerald-500/20" />
          <div className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-emerald-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
            <Sparkles size={24} className="animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Lesson is being generated</h1>
          <p className="text-white/40 max-w-md mx-auto">
            Please wait while our AI Academy builds your premium content. This usually takes 30-60 seconds.
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => navigate('/dashboard')}
          className="h-14 px-8 rounded-2xl border-white/10"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight">Lesson Not Found</h1>
          <p className="text-white/40 max-w-md mx-auto">
            {error || "We couldn't find the lesson you're looking for. It might be unavailable or the link could be broken."}
          </p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard')}
          className="h-14 px-8 rounded-2xl"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const logDiagnostic = async (buttonName: string, status: 'started' | 'success' | 'failed', error?: string) => {
    console.log(`[Lesson Diagnostics] Button: ${buttonName} | Topic: ${topic} | State: ${status}${error ? ` | Error: ${error}` : ''}`);
    
    // Audit logging for critical lesson progress
    const auditRef = ref(db, `lesson_audit_logs/${Date.now()}`);
    try {
      await firebaseSafeUpdate(auditRef, {
        button_name: buttonName,
        topic: topic || 'unknown',
        user_uid: user?.uid,
        timestamp: Date.now(),
        status,
        error: error || null
      }, "LessonDiagnostic");
    } catch (err) {
      console.error("Audit log failed:", err);
    }
  };

  const handleComplete = async () => {
    if (!lesson || !progress) {
      alert("Lesson data not loaded properly. Please refresh.");
      return;
    }
    
    await logDiagnostic('Complete Lesson', 'started', '');

    // Check if all quiz questions are answered correctly
    const allCorrect = lesson.quiz.every((q, idx) => selectedAnswers[idx] === q.correctIndex);
    if (!allCorrect) {
      await logDiagnostic('Complete Lesson', 'failed', 'Quiz incomplete or incorrect');
      alert("Please complete the quiz correctly before finishing the lesson!");
      return;
    }

    try {
      if (typeof addXP !== 'function' || typeof updateProgress !== 'function') {
         throw new Error("Progress tracking service unavailable.");
      }

      await addXP(50);
      
      const completedLessons = progress.completedLessons || [];
      if (!completedLessons.includes(lesson.id)) {
        await updateProgress({
          completedLessons: [...completedLessons, lesson.id]
        });
      }

      // 🔁 AUTONOMOUS ENGINE: Ensure next content is ready
      if (progress.activeProgramId && skillTitle) {
        console.log("Autonomous Engine: Checking for next content...");
        // Non-blocking trigger of the loop to ensure student is never blocked
        import('../services/CurriculumEngineService').then(m => {
          m.CurriculumEngineService.runAutonomousLoop(progress.activeProgramId!, skillTitle, (msg) => {
            console.log(`[Auto-Engine] ${msg}`);
          });
        });
      }

      await logDiagnostic('Complete Lesson', 'success', '');
      navigate('/dashboard');
    } catch (err: any) {
      await logDiagnostic('Complete Lesson', 'failed', err.message);
      console.error("Error completing lesson:", err);
      alert(`Could not save progress. ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Top Navbar - Matches Dashboard */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-lg tracking-tight">OLYNQ Stack</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-mentor-chat'))}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 active:scale-90"
          >
            <Bell size={20} />
          </button>
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer group active:scale-95"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black truncate max-w-[120px] group-hover:text-emerald-400 transition-colors">{user?.displayName || 'Developer'}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/30">
                Verified Learner
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-emerald-500/50 transition-colors">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-white/20" />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Lesson Content Scroll Area */}
      <main className="flex-grow overflow-y-auto pb-40">
        <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
          
          {/* Lesson Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                {topic?.toUpperCase().replace(/-/g, ' ') || 'BASICS'}
              </span>
              <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                <Clock size={12} />
                5 mins
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg border ${
                lesson?.difficulty?.toLowerCase() === 'intermediate' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                lesson?.difficulty?.toLowerCase() === 'advanced' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                lesson?.difficulty?.toLowerCase() === 'expert' ? 'text-purple-400 bg-purple-400/10 border-purple-400/20' :
                'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
              }`}>
                <Trophy size={12} />
                {lesson?.difficulty || 'Beginner'}
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {lesson?.title || 'Untitled Lesson'}
              </h1>
              <Card className="p-6 border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Today you are learning:</p>
                    <p className="text-lg text-white/80 font-medium leading-relaxed">{lesson?.todayYouAreLearning || 'Loading objective...'}</p>
                    {(lesson as any).objectives && (
                      <p className="text-xs text-white/40 mt-2">{(lesson as any).objectives}</p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Why it matters */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <Target size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Why it matters</h3>
            </div>
            <p className="text-lg text-white/60 leading-relaxed">
              {lesson?.whyItMatters || 'This topic is essential for your career growth.'}
            </p>
          </section>

          {/* Explanation Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <BookOpen size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Simple Explanation</h3>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/60 leading-relaxed whitespace-pre-wrap">
                {lesson?.explanation || 'Loading explanation...'}
              </p>
            </div>
          </section>

          {/* Career & Interview Tips (New) */}
          {((lesson as any).interviewTips || (lesson as any).careerTips) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(lesson as any).interviewTips && (
                <Card className="p-6 border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <MessageSquare size={16} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Interview Tip</h4>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic">"{(lesson as any).interviewTips}"</p>
                </Card>
              )}
              {(lesson as any).careerTips && (
                <Card className="p-6 border-purple-500/20 bg-purple-500/5 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400">
                    <Trophy size={16} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">Career Advice</h4>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed italic">"{(lesson as any).careerTips}"</p>
                </Card>
              )}
            </div>
          )}

          {/* Pro Tip Section */}
          <Card className="p-8 border-2 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-emerald-500/20 text-emerald-400">
                <Star size={24} fill="currentColor" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-black uppercase text-xs tracking-[0.2em] text-emerald-400">Pro Tip & Best Practices</h4>
                </div>
                <p className="text-white/70 leading-relaxed font-medium italic">
                  "{lesson?.proTip || 'Always keep your code clean and well-documented. It saves hours of debugging later.'}"
                </p>
              </div>
            </div>
          </Card>

          {/* Common Mistakes Section (New) */}
          {(lesson as any).commonMistakes && (lesson as any).commonMistakes.length > 0 && (
            <Card className="p-8 border-2 border-red-500/20 bg-red-500/5 space-y-6">
              <div className="flex items-center gap-3 text-red-500">
                <AlertCircle size={20} />
                <h4 className="font-black uppercase text-xs tracking-[0.2em]">Common Beginner Mistakes</h4>
              </div>
              <div className="space-y-3">
                {(lesson as any).commonMistakes.map((mistake: string, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/5">
                    <X size={16} className="text-red-500 shrink-0 mt-1" />
                    <p className="text-white/70 text-sm leading-relaxed font-medium">{mistake}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Analogy */}
          <Card className="p-8 border-2 border-indigo-500/20 bg-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3 text-indigo-400">
              <Lightbulb size={20} />
              <h4 className="font-black uppercase text-xs tracking-[0.2em]">Real-World Analogy</h4>
            </div>
            <p className="text-white/70 leading-relaxed italic">"{lesson?.analogy || 'This concept works similarly to real-world communication systems.'}"</p>
          </Card>

          {/* Exercises Section (New) */}
          {(lesson as any).exercises && (lesson as any).exercises.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-amber-400">
                <Target size={20} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Practice Exercises</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(lesson as any).exercises.map((ex: string, i: number) => (
                  <Card key={i} className="p-6 bg-white/[0.02] border-white/10 hover:border-amber-400/30 transition-all group">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center text-xs font-black shrink-0 group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{ex}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Code Block Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-400">
                <Terminal size={20} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Technical Implementation</h3>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(lesson?.codeImplementation || lesson?.codeExample || '');
                }}
                className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-emerald-400 transition-colors"
              >
                Copy Code
              </button>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#050505] border border-white/5 rounded-3xl p-8 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl">
                <div className="flex items-center gap-2 mb-6 opacity-30">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <pre className="text-emerald-300/90">
                  {lesson?.codeImplementation || lesson?.codeExample || '// Advanced implementation loading...'}
                </pre>
              </div>
            </div>
          </section>

          {/* Logic Decoding (Line by Line) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <Code size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Logic Decoding</h3>
            </div>
            <div className="space-y-4">
              {((Array.isArray((lesson as any).lineByLineArray) && (lesson as any).lineByLineArray.length > 0) 
                  ? (lesson as any).lineByLineArray 
                  : (lesson?.lineByLine?.split('\n') || [])
                ).filter((l: string) => l.trim().length > 0).map((line: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-emerald-500 font-mono text-xs pt-1 opacity-40">{String(i+1).padStart(2, '0')}</span>
                  <p className="text-white/70 text-sm leading-relaxed">{line}</p>
                </div>
              ))}
              {(!(Array.isArray((lesson as any).lineByLineArray) ? (lesson as any).lineByLineArray : lesson?.lineByLine) || (lesson?.lineByLine?.length === 0)) && (
                <p className="text-white/20 italic text-sm">Deep logic breakdown in progress...</p>
              )}
            </div>
          </section>

          {/* Implementation Lab / Project */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-emerald-400">
              <Layers size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Implementation Lab</h3>
            </div>
            
            <Card className="p-8 border-2 border-emerald-500/20 bg-emerald-500/5 space-y-8">
              <div className="space-y-2">
                <h4 className="text-2xl font-black tracking-tight">{((lesson as any).practicalProject?.title || (lesson as any).projectTitle || lesson?.title || 'Practical Skill Application')}</h4>
                <p className="text-white/40 text-sm italic">"{((lesson as any).practicalProject?.description || 'Real-world lab to solidify your mastery.')}"</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Implementation Steps</h5>
                  <div className="space-y-3">
                    {((lesson as any).practicalProject?.steps || (lesson as any).implementationSteps || ['Define core logic', 'Build functional component', 'Verify system output']).map((step: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <div className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0 border border-emerald-500/20 transition-all group-hover:scale-110">
                          {i + 1}
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">Career Readiness</h5>
                  <div className="space-y-3">
                    {((lesson as any).careerReadiness || ['Essential for production environments', 'High-value senior developer skill']).map((tip: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <p className="text-sm text-white/70 leading-relaxed font-medium italic">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interview Mastery Box */}
              <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-4">
                <div className="flex items-center gap-2 text-orange-400">
                  <MessageSquare size={16} />
                  <h5 className="text-[10px] font-black uppercase tracking-widest">Interview Mastery</h5>
                </div>
                <div className="space-y-3">
                   {((lesson as any).interviewMastery || ['Explain the architectural benefits', 'Discuss performance considerations']).map((tip: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-orange-500/50 text-xs font-black">TIP:</span>
                        <p className="text-sm text-white/60 leading-relaxed">{tip}</p>
                      </div>
                   ))}
                </div>
              </div>
            </Card>
          </section>

          {/* Conceptual Assessment (Quiz) */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-emerald-400">
              <HelpCircle size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Conceptual Assessment</h3>
            </div>
            <div className="space-y-4">
              {(lesson.quiz || []).map((q, qIdx) => (
                <Card key={qIdx} className="p-8 border-white/5 bg-white/[0.02] space-y-6">
                  <p className="text-xl font-bold leading-tight">{q.question}</p>
                  <div className="grid grid-cols-1 gap-3">
                    {(q.options || []).map((option, oIdx) => (
                      <button 
                        key={oIdx}
                        onClick={() => {
                          const newAnswers = [...selectedAnswers];
                          newAnswers[qIdx] = oIdx;
                          setSelectedAnswers(newAnswers);
                        }}
                        className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                          selectedAnswers[qIdx] === oIdx 
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        <span>{option}</span>
                        {selectedAnswers[qIdx] === oIdx && (
                          <CheckCircle2 size={18} className="text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedAnswers[qIdx] !== undefined && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-sm font-medium ${
                        selectedAnswers[qIdx] === q.correctIndex 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {selectedAnswers[qIdx] === q.correctIndex ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        <span className="font-black uppercase tracking-widest text-[10px]">
                          {selectedAnswers[qIdx] === q.correctIndex ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      {q.explanation}
                    </motion.div>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Summary & Next Connection (New) */}
          <Card className="p-8 border-2 border-purple-500/20 bg-purple-500/10 space-y-6">
            <div className="flex items-center gap-3 text-purple-400">
              <RefreshCcw size={20} />
              <h4 className="font-black uppercase text-xs tracking-[0.2em]">Lesson Summary</h4>
            </div>
            <div className="space-y-4">
              <p className="text-white/70 leading-relaxed">{(lesson as any).summary || lesson?.recap || 'Great job completing this lesson! You have taken another step toward mastery.'}</p>
              
              {(lesson as any).nextLessonConnection && (
                <div className="pt-4 border-t border-purple-500/10">
                  <p className="text-[10px] font-black uppercase text-purple-400/50 tracking-widest mb-2">Connecting to next lesson:</p>
                  <p className="text-sm text-white/50 italic">"{(lesson as any).nextLessonConnection}"</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>

      {/* Coding Playground Modal */}
      <AnimatePresence>
        {isCodingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCodingOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl h-[80vh] bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] p-0 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Terminal size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Interactive Playground</h3>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Practice your code</p>
                  </div>
                </div>
                <button onClick={() => setIsCodingOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 border-r border-white/5 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest">Your Task</h4>
                    <p className="text-white/60 leading-relaxed">{lesson.practice}</p>
                  </div>
                  <div className="bg-black/50 rounded-2xl p-6 font-mono text-sm border border-white/5">
                    <textarea 
                      className="w-full h-64 bg-transparent border-none focus:ring-0 text-emerald-300/90 resize-none"
                      defaultValue={lesson.codeExample}
                      spellCheck={false}
                    />
                  </div>
                </div>
                <div className="p-8 bg-black/30 space-y-6">
                  <h4 className="text-xs font-black text-white/20 uppercase tracking-widest">Output Console</h4>
                  <div className="h-64 rounded-2xl bg-black border border-white/5 p-6 font-mono text-sm text-white/40">
                    {">"} Running code...
                    <br />
                    {">"} Success!
                  </div>
                  <Button className="w-full h-14 rounded-2xl shadow-xl shadow-emerald-500/20">
                    Run Code
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar - Matches Screenshot */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0A0A0B]/80 backdrop-blur-2xl border-t border-white/5 z-40">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          <button 
            onClick={handleComplete}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-500 text-black font-black hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95"
          >
            <CheckCircle2 size={20} />
            <span className="text-[10px] uppercase tracking-widest">Complete</span>
          </button>
          
          <button 
            onClick={() => {
              if (!lesson) {
                alert("Lesson context unavailable. Reloading...");
                window.location.reload();
                return;
              }
              window.dispatchEvent(new CustomEvent('set-mentor-lesson-context', { 
                detail: { 
                  lesson: {
                    ...lesson,
                    courseTitle: skillTitle,
                    moduleTitle: moduleTitle,
                    lessonTopic: topic?.toUpperCase().replace(/-/g, ' '),
                    lesson_id: lesson.id,
                    lesson_title: lesson.title,
                    course_title: skillTitle,
                    module_title: moduleTitle,
                    lesson_topic: topic?.toUpperCase().replace(/-/g, ' '),
                    lesson_description: lesson.todayYouAreLearning,
                    lesson_content: lesson.explanation,
                    lesson_examples: lesson.codeExample,
                    exercise_questions: lesson.quiz,
                    difficulty_level: lesson.difficulty || 'Beginner'
                  } 
                } 
              }));
            }}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-emerald-400 hover:bg-white/[0.06] transition-all active:scale-95"
          >
            <Zap size={20} />
            <span className="text-[10px] uppercase tracking-widest">Ask AI</span>
          </button>
 
          <button 
            onClick={() => setIsCodingOpen(true)}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-emerald-400 hover:bg-white/[0.06] transition-all active:scale-95"
          >
            <Terminal size={20} />
            <span className="text-[10px] uppercase tracking-widest">Coding</span>
          </button>
        </div>
      </div>
      <MentorChat />
    </div>
  );
};
