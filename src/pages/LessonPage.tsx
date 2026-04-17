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
import { ref, get } from 'firebase/database';
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
  const { user } = useAuth();
  const { progress, loading: userLoading, updateProgress, addXP } = useUserData();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCodingOpen, setIsCodingOpen] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number, total: number } | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      console.log("LessonPage: topic =", topic);
      console.log("LessonPage: userLoading =", userLoading);
      console.log("LessonPage: progress =", progress);

      if (userLoading) return;

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
          // This case shouldn't happen if userLoading is false, but just in case
          setError("User progress not found.");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log("LessonPage: Fetching lesson content for", topic);
        
        // 1. Try to fetch from approved lessons first
        const lessonRef = ref(db, `lessons/${topic}`);
        const lessonSnap = await get(lessonRef);
        
        if (lessonSnap.exists()) {
          console.log("LessonPage: Approved lesson found in DB");
          setLesson(lessonSnap.val());
          setLoading(false);
          return;
        }

        // 2. Try to fetch from pending AI lessons (for preview/review if needed, or fallback)
        if (progress.activeProgramId) {
          const pendingRef = ref(db, `ai_generated_lessons/${progress.activeProgramId}/${topic}`);
          const pendingSnap = await get(pendingRef);
          if (pendingSnap.exists()) {
            console.log("LessonPage: Pending AI lesson found in DB");
            setLesson(pendingSnap.val());
            setLoading(false);
            return;
          }
        }

        // 3. Fallback to on-the-fly generation if enabled (or if it's a legacy topic)
        console.log("LessonPage: No DB lesson found, falling back to on-the-fly generation");
        const content = await generateLesson(progress.selectedPath, progress.currentStage, topic, progress.activeProgramId);
        
        if (content) {
          setLesson(content);
        } else {
          console.error("LessonPage: No content returned for", topic);
          setError("Could not load lesson content.");
        }
      } catch (error: any) {
        console.error("LessonPage: Error fetching lesson:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [progress, topic, userLoading, navigate]);

  if (userLoading || loading) return <LoadingScreen message="PREPARING LESSON..." />;

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

  const handleComplete = async () => {
    if (!lesson || !progress) return;
    
    // Check if all quiz questions are answered correctly
    const allCorrect = lesson.quiz.every((q, idx) => selectedAnswers[idx] === q.correctIndex);
    if (!allCorrect) {
      alert("Please complete the quiz correctly before finishing the lesson!");
      return;
    }

    await addXP(50);
    await updateProgress({
      completedLessons: [...progress.completedLessons, lesson.id]
    });

    navigate('/dashboard');
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
          <span className="font-bold text-lg tracking-tight">MentorStack</span>
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
              <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                <Trophy size={12} />
                Beginner
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
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
              <Sparkles size={120} />
            </div>
          </Card>

          {/* Analogy */}
          <Card className="p-8 border-2 border-indigo-500/20 bg-indigo-500/10 space-y-4">
            <div className="flex items-center gap-3 text-indigo-400">
              <Lightbulb size={20} />
              <h4 className="font-black uppercase text-xs tracking-[0.2em]">Real-World Analogy</h4>
            </div>
            <p className="text-white/70 leading-relaxed italic">"{lesson?.analogy || 'Think of it like learning a new language.'}"</p>
          </Card>

          {/* Code Block Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-emerald-400">
                <Terminal size={20} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Code Example</h3>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(lesson?.codeExample || '');
                  // Add toast notification here if available
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
                  {lesson?.codeExample || '// Code example loading...'}
                </pre>
              </div>
            </div>
          </section>

          {/* Line by Line */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <Code size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Line-by-Line Explanation</h3>
            </div>
            <p className="text-lg text-white/60 leading-relaxed whitespace-pre-wrap">
              {lesson?.lineByLine || 'Loading breakdown...'}
            </p>
          </section>

          {/* Teaching Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Common Mistakes */}
            <Card className="p-8 border-2 border-red-500/20 bg-red-500/10 space-y-4">
              <div className="flex items-center gap-3 text-red-400">
                <AlertCircle size={20} />
                <h4 className="font-black uppercase text-xs tracking-[0.2em]">Common Mistakes</h4>
              </div>
              <div className="space-y-3">
                {(lesson.commonMistakes || []).map((mistake, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <p className="text-white/70 leading-relaxed">{mistake}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Practice Exercise */}
            <Card className="p-8 border-2 border-emerald-500/20 bg-emerald-500/10 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <Target size={20} />
                <h4 className="font-black uppercase text-xs tracking-[0.2em]">Practice Exercise</h4>
              </div>
              <p className="text-white/70 leading-relaxed">{lesson?.practice || 'Try to implement the code above in your own editor.'}</p>
            </Card>

            {/* Mini Challenge */}
            <Card className="p-8 border-2 border-orange-500/20 bg-orange-500/10 space-y-4">
              <div className="flex items-center gap-3 text-orange-400">
                <Zap size={20} />
                <h4 className="font-black uppercase text-xs tracking-[0.2em]">Mini Challenge</h4>
              </div>
              <p className="text-white/70 leading-relaxed">{lesson?.challenge || 'Can you modify the code to do something slightly different?'}</p>
            </Card>

            {/* Project Section (New) */}
            {(lesson as any).project && (
              <Card className="p-8 border-2 border-emerald-500/20 bg-emerald-500/5 space-y-6">
                <div className="flex items-center gap-3 text-emerald-400">
                  <Layers size={20} />
                  <h4 className="font-black uppercase text-xs tracking-[0.2em]">Module Project</h4>
                </div>
                <div className="space-y-4">
                  <h5 className="text-xl font-black">{(lesson as any).project.title}</h5>
                  <p className="text-white/60 leading-relaxed">{(lesson as any).project.description}</p>
                  <div className="space-y-3 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Implementation Steps:</p>
                    {((lesson as any).project.steps || []).map((step: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0 border border-emerald-500/20">
                          {i + 1}
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

          {/* Test (Quiz) Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-emerald-400">
              <HelpCircle size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Test Your Knowledge</h3>
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

          {/* Recap */}
          <Card className="p-8 border-2 border-purple-500/20 bg-purple-500/10 space-y-4">
            <div className="flex items-center gap-3 text-purple-400">
              <RefreshCcw size={20} />
              <h4 className="font-black uppercase text-xs tracking-[0.2em]">Recap</h4>
            </div>
            <p className="text-white/70 leading-relaxed">{lesson?.recap || 'Great job completing this lesson!'}</p>
          </Card>
          </div>
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
            onClick={() => navigate(`/tutor?skillId=${progress?.activeProgramId}&lessonId=${topic}`)}
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
