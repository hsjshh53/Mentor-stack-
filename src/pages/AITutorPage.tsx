import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Input } from '../components/ui';
import { getMentorAdvice, TutorMode } from '../lib/gemini';
import { useUserData } from '../hooks/useUserData';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, Send, ArrowLeft, Bot, User, 
  Terminal, ShieldCheck, Zap, BookOpen, 
  Target, GraduationCap, Briefcase, 
  HelpCircle, Search, Lightbulb, MessageSquare,
  Copy, Check, Info, Layout, List, Layers,
  ChevronRight, Brain, Trophy, Activity,
  Maximize2, Minimize2, Settings2, FileCode,
  AlertTriangle, History, Star
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { ref } from 'firebase/database';
import { db } from '../lib/firebase';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { firebaseSafeGet } from '../lib/FirebaseService';

// --- Components ---

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-2xl overflow-hidden border border-white/10 bg-[#0D0D0E]">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <FileCode size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{language || 'code'}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowExplanation(!showExplanation)}
            className={`p-1.5 rounded-lg transition-all ${showExplanation ? 'bg-emerald-500/10 text-emerald-400' : 'text-white/20 hover:text-white/40'}`}
            title="Toggle Explanation"
          >
            <Info size={14} />
          </button>
          <button 
            onClick={handleCopy}
            className="p-1.5 hover:bg-white/5 rounded-lg text-white/20 hover:text-white/40 transition-all"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language || 'javascript'}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '13px',
          background: 'transparent',
          lineHeight: '1.6',
        }}
        codeTagProps={{
          style: { fontFamily: '"JetBrains Mono", monospace' }
        }}
      >
        {value}
      </SyntaxHighlighter>
      <AnimatePresence>
        {showExplanation && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-emerald-500/5 border-t border-emerald-500/10 p-4"
          >
            <p className="text-[11px] text-emerald-400/80 font-medium leading-relaxed italic">
              Pro-tip: This snippet demonstrates the core logic of the concept. Notice how the structure handles edge cases.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Custom Hook for Streaming ---

const useStreaming = (onComplete?: () => void) => {
  const [displayText, setDisplayText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const stream = async (text: string) => {
    setIsStreaming(true);
    setDisplayText('');
    
    const words = text.split(' ');
    let current = '';
    
    for (let i = 0; i < words.length; i++) {
        current += words[i] + ' ';
        setDisplayText(current);
        // Realistic variable speed
        await new Promise(r => setTimeout(r, 15 + Math.random() * 20));
    }
    
    setIsStreaming(false);
    onComplete?.();
  };

  return { displayText, isStreaming, stream };
};

export const AITutorPage: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string; mode?: TutorMode; id: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<TutorMode>('general');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchParams] = useSearchParams();
  const { progress, loading: userLoading } = useUserData();
  const { user, profileReady } = useAuth();
  
  const [contextData, setContextData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const skillId = searchParams.get('skillId') || progress?.activeProgramId;
  const lessonId = searchParams.get('lessonId');

  useEffect(() => {
    const fetchContext = async () => {
      if (!skillId) return;
      
      try {
        const [skillData, lessonData] = await Promise.all([
          firebaseSafeGet(ref(db, `skills/${skillId}`), "SkillContext"),
          lessonId ? firebaseSafeGet(ref(db, `lessons/${lessonId}`), "LessonContext") : Promise.resolve(null),
        ]);

        let finalLessonContent = lessonData;
        if (lessonId && !lessonData && skillId) {
          finalLessonContent = await firebaseSafeGet(ref(db, `ai_generated_lessons/${skillId}/${lessonId}`), "AILessonContext");
        }

        setContextData({
          skill: skillData,
          lesson: finalLessonContent
        });
      } catch (err) {
        console.error("Context Fetch Error:", err);
      }
    };

    if (!userLoading && user && profileReady) {
      fetchContext();
    }
  }, [skillId, lessonId, userLoading, user, profileReady]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial Contextual Greeting
  useEffect(() => {
    if (contextData?.lesson && messages.length === 0 && !loading) {
      const lessonTitle = contextData.lesson.title;
      const greeting = `I can see you're currently learning **${lessonTitle}**. How can I help you with this lesson?`;
      
      setMessages([{
        role: 'model',
        content: greeting,
        mode: mode,
        id: 'initial_greeting'
      }]);
    } else if (!lessonId && messages.length === 0 && !loading && !userLoading) {
      // Fallback
      setMessages([{
        role: 'model',
        content: "I’m here to help. I couldn't load full lesson context, but tell me what part you're on.",
        mode: 'general',
        id: 'initial_fallback'
      }]);
    }
  }, [contextData, lessonId, messages.length, loading, userLoading, mode]);

  const tutorContext = useMemo(() => ({
    activeProgramId: skillId || undefined,
    activeProgramTitle: contextData?.skill?.title,
    currentPath: progress?.selectedPath || undefined,
    currentStage: progress?.currentStage,
    currentLesson: contextData?.lesson?.title || lessonId || undefined,
    lessonId: lessonId || undefined,
    lessonTitle: contextData?.lesson?.title,
    courseName: contextData?.skill?.title,
    moduleName: contextData?.lesson?.moduleName || progress?.currentWeek,
    lessonTopic: contextData?.lesson?.title,
    lessonContent: contextData?.lesson,
    codeExamples: contextData?.lesson?.codeExample,
    exercises: contextData?.lesson?.quiz,
    difficultyLevel: contextData?.lesson?.level || progress?.currentStage,
    userProgressStep: progress?.currentPhaseId,
    previousLessonsCompleted: progress?.completedLessons,
    currentLanguage: contextData?.lesson?.language || 'JavaScript', // Default to JS if not specified
    learnerLevel: progress?.currentStage || 'Beginner',
    progressXP: progress?.xp,
    weakAreas: progress?.weakAreas,
    mode: mode
  }), [skillId, contextData, progress, mode, lessonId]);

  if (userLoading) return <LoadingScreen />;

  const handleSend = async (messageText?: string, overrideMode?: TutorMode) => {
    const textToSend = messageText || input;
    const activeMode = overrideMode || mode;
    
    if (!textToSend.trim() || loading) return;

    setInput('');
    const userMsgId = Date.now().toString();
    setMessages(prev => [...prev, { role: 'user', content: textToSend, mode: activeMode, id: userMsgId }]);
    setLoading(true);
    setSuggestions([]);

    try {
      const response = await getMentorAdvice(textToSend, messages, { ...tutorContext, mode: activeMode });
      
      const modelMsgId = (Date.now() + 1).toString();
      // We push an empty message first, then we could stream it if we wanted, 
      // but to keep it simple and robust, we'll just show the message and use a component-level streaming for the LAST message.
      setMessages(prev => [...prev, { role: 'model', content: response, mode: activeMode, id: modelMsgId }]);
      
      // Update suggestions based on response or context
      if (activeMode === 'quiz') setSuggestions(['Explain the answer', 'Next question', 'I am ready for the task']);
      else if (activeMode === 'debug') setSuggestions(['Examine more code', 'Explanation toggle', 'Fix it for me']);
      else setSuggestions(['Tell me more', 'Show an example', 'Next step']);

    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I'm having trouble connecting right now. Let's try again in a moment.", id: 'error' }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Explain Simpler', icon: <Zap size={14} />, mode: 'teaching' as TutorMode, prompt: 'Can you explain this in much simpler terms for an absolute beginner?' },
    { label: 'Go Deeper', icon: <Search size={14} />, mode: 'teaching' as TutorMode, prompt: 'I want to understand this more deeply. Can you explain the advanced details and architecture?' },
    { label: 'Give Example', icon: <Lightbulb size={14} />, mode: 'teaching' as TutorMode, prompt: 'Show me a real-world example of this concept.' },
    { label: 'Give Exercise', icon: <Target size={14} />, mode: 'practice' as TutorMode, prompt: 'Give me a challenging exercise to apply what I just learned.' },
    { label: 'Quiz Me', icon: <HelpCircle size={14} />, mode: 'quiz' as TutorMode, prompt: 'I am ready for a quiz. Test my knowledge!' },
    { label: 'Debug My Code', icon: <Terminal size={14} />, mode: 'debug' as TutorMode, prompt: 'I have some code that isn\'t working. Can you help me find the bug?' },
    { label: 'Help With Project', icon: <Briefcase size={14} />, mode: 'project' as TutorMode, prompt: 'How do I integrate this into my current project?' },
    { label: 'What\'s Next?', icon: <ArrowLeft size={14} />, mode: 'general' as TutorMode, prompt: 'What should I study after master this topic?', rotate: 180 },
  ];

  const modes = [
    { id: 'general', label: 'Mentor', icon: <Bot size={16} />, color: 'emerald' },
    { id: 'teaching', label: 'Teach', icon: <BookOpen size={16} />, color: 'blue' },
    { id: 'practice', label: 'Practice', icon: <Target size={16} />, color: 'orange' },
    { id: 'debug', label: 'Debug', icon: <Terminal size={16} />, color: 'red' },
    { id: 'project', label: 'Projects', icon: <Briefcase size={16} />, color: 'purple' },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={16} />, color: 'amber' },
    { id: 'career', label: 'Career', icon: <ShieldCheck size={16} />, color: 'cyan' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-[#0A0A0B]/80 backdrop-blur-3xl border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-all active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Bot size={22} />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tighter uppercase flex items-center gap-2">
                AI Tutor {contextData?.lesson?.title ? `- ${contextData.lesson.title}` : 'Mentor'}
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] tracking-widest">PREMIUM</span>
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                  {contextData?.lesson ? 'Powered by Lesson Context' : 'Live in Master Mode'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-2.5xl border border-white/5 backdrop-blur-xl">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as TutorMode)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative group ${
                mode === m.id 
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {m.icon}
              <span className="hidden xl:inline">{m.label}</span>
              {mode === m.id && (
                <motion.div layoutId="mode-pill" className="absolute inset-0 bg-emerald-500 rounded-2xl -z-10" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex gap-2 rounded-xl text-[10px]"
          >
            {isSidebarOpen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isSidebarOpen ? 'Hide Panel' : 'Context'}
          </Button>
          <div className="w-px h-8 bg-white/5 hidden md:block" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Progress</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              Lvl {progress?.level || 1} • {progress?.xp || 0} XP
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* Left Sidebar: Academy Context Panel */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden md:flex flex-col bg-[#0D0D0E]/50 border-r border-white/5 backdrop-blur-2xl shrink-0 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[300px] bg-emerald-500/[0.03] blur-[100px] pointer-events-none" />
              
              <div className="p-8 space-y-10 relative z-10 overflow-y-auto no-scrollbar h-full">
                {/* Lesson Context */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <BookOpen size={18} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Mastery Context</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Active Lesson</p>
                        <h4 className="text-xl font-black tracking-tight">{contextData?.lesson?.title || 'General Coding'}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                          Week {contextData?.lesson?.week || 1}
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest">
                          Module {contextData?.lesson?.module || 1}
                        </div>
                      </div>
                    </div>

                    {Array.isArray(contextData?.lesson?.objectives) && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest px-1">Objectives</p>
                        <div className="space-y-2">
                          {contextData.lesson.objectives.map((obj: string, i: number) => (
                            <div key={i} className="flex gap-3 text-[11px] text-white/60 leading-relaxed group">
                              <Check size={14} className="text-emerald-500 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span className="group-hover:text-white transition-colors">
                                {obj}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Learner Awareness */}
                <div className="space-y-6 pt-10 border-t border-white/5">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <GraduationCap size={18} />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Learner Stats</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-1">
                      <p className="text-[9px] font-black uppercase text-white/20 tracking-widest">Stage</p>
                      <p className="text-sm font-black text-emerald-400">{progress?.currentStage || 'Beginner'}</p>
                    </div>
                    <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-1">
                      <p className="text-[9px] font-black uppercase text-white/20 tracking-widest">Success</p>
                      <p className="text-sm font-black text-indigo-400">92%</p>
                    </div>
                  </div>

                  {progress?.weakAreas && progress.weakAreas.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Focus Areas</p>
                        <AlertTriangle size={12} className="text-amber-500/50" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {progress.weakAreas.slice(0, 3).map(wa => (
                          <span key={wa} className="px-3 py-1.5 rounded-xl bg-amber-500/5 text-amber-500/60 text-[9px] font-black uppercase tracking-widest border border-amber-500/10">
                            {wa}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Program */}
                <div className="pt-10">
                  <button 
                    onClick={() => navigate(`/academy/${progress?.selectedPath}`)}
                    className="w-full p-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 text-left group hover:from-emerald-500/30 transition-all active:scale-[0.98]"
                  >
                    <p className="text-[9px] font-black uppercase text-emerald-400/60 tracking-[0.2em] mb-2">Program Access</p>
                    <h5 className="font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-widest text-[11px] mb-4">
                      {contextData?.skill?.title || progress?.selectedPath} Academy
                    </h5>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-lg bg-white/10 border border-[#0A0A0B] flex items-center justify-center">
                            <Star size={10} className="text-amber-500/40" />
                          </div>
                        ))}
                      </div>
                      <ChevronRight size={16} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Right Content: Chat Interface */}
        <main className="flex-grow flex flex-col overflow-hidden relative">
          {/* Mobile Mode Switcher */}
          <div className="lg:hidden flex items-center gap-1 bg-white/[0.03] p-1 overflow-x-auto no-scrollbar shrink-0 border-b border-white/5 backdrop-blur-xl">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as TutorMode)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                  mode === m.id 
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                    : 'text-white/40'
                }`}
              >
                {m.icon}
                {m.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-10 space-y-10 scroll-smooth pb-48 no-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-12 py-16">
                <div className="relative">
                  <div className="absolute -inset-12 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-emerald-400 to-emerald-600 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/40 scale-110">
                    <Bot size={64} strokeWidth={2.5} />
                  </div>
                </div>
                
                <div className="space-y-5 px-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                    How can I help you <br /> master coding today?
                  </h2>
                  <p className="text-white/40 max-w-lg mx-auto leading-relaxed text-sm font-medium">
                    {contextData?.lesson 
                      ? `We are currently in the "${contextData.lesson.title}" module. I am ready to deep-dive into teaching, debugging, or project architecture.`
                      : "I am your personal academy mentor. I'm aware of your progress and current curriculum. What shall we master?"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl px-6">
                  {quickActions.slice(0, 8).map((action, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSend(action.prompt, action.mode)}
                      className="group p-6 rounded-3.5xl bg-white/[0.03] border border-white/5 text-left hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all active:scale-[0.97] flex flex-col gap-4 box-shadow-xl"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                        <div style={{ transform: action.rotate ? `rotate(${action.rotate}deg)` : 'none' }}>
                          {action.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black text-white/80 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">{action.label}</h4>
                        <p className="text-[9px] text-white/20 mt-1 leading-relaxed line-clamp-2">{action.prompt}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-5 max-w-[95%] md:max-w-[85%] lg:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-xl self-end mb-1 ${
                    msg.role === 'user' 
                      ? 'bg-white/5 text-white/20 border border-white/10' 
                      : 'bg-emerald-500 text-black shadow-emerald-500/30'
                  }`}>
                    {msg.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className={`p-8 rounded-[2.5rem] leading-relaxed text-[15px] shadow-2xl relative ${
                      msg.role === 'user' 
                        ? 'bg-emerald-500 text-black rounded-br-none shadow-emerald-500/10 font-bold' 
                        : 'bg-white/[0.03] text-white/90 border border-white/10 rounded-bl-none backdrop-blur-xl'
                    }`}>
                      {msg.role === 'model' ? (
                        <div className="markdown-body">
                          <ReactMarkdown
                            components={{
                              code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <CodeBlock
                                    language={match[1]}
                                    value={String(children).replace(/\n$/, '')}
                                    {...props}
                                  />
                                ) : (
                                  <code className={`${className} bg-white/5 px-1.5 py-0.5 rounded text-emerald-400 font-mono`} {...props}>
                                    {children}
                                  </code>
                                );
                              }
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                      
                      {msg.mode && msg.mode !== 'general' && msg.role === 'model' && (
                        <div className="absolute -top-3.5 left-6 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 shadow-xl flex items-center gap-2">
                          <Zap size={11} fill="currentColor" />
                          {msg.mode} mode active
                        </div>
                      )}
                    </div>
                    {msg.role === 'user' && msg.mode && msg.mode !== 'general' && (
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 px-4">
                        Tutor set to {msg.mode} mode
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Suggestion Chips */}
            {messages.length > 0 && !loading && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 px-16"
              >
                {suggestions.map((s, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all active:scale-95 shadow-lg shadow-emerald-500/5"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-5 max-w-[85%]">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-black flex items-center justify-center shrink-0 self-end mb-1">
                    <Bot size={24} />
                  </div>
                  <div className="bg-white/5 p-8 rounded-[2.5rem] rounded-bl-none flex gap-2.5 items-center shadow-2xl backdrop-blur-md border border-white/10">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.6s]" />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Action Bar (Sticky above input) */}
          <div className="absolute bottom-32 left-0 right-0 px-8 flex justify-center z-30 pointer-events-none">
            <div className="bg-[#0D0D0E]/80 backdrop-blur-3xl border border-white/10 p-2.5 rounded-3xl flex gap-3 overflow-x-auto no-scrollbar max-w-full pointer-events-auto shadow-2xl box-shadow-xl translate-y-4">
              {quickActions.map((action, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(action.prompt, action.mode)}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-emerald-500/20 transition-all whitespace-nowrap active:scale-95 group"
                >
                  <div className="text-white/20 group-hover:text-emerald-500 transition-colors" style={{ transform: action.rotate ? `rotate(${action.rotate}deg)` : 'none' }}>
                    {action.icon}
                  </div>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="shrink-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B] to-transparent pt-16 p-8 relative z-40">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-2 bg-emerald-500/10 rounded-[3rem] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
              <div className="relative">
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none z-10">
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)] bg-${modes.find(m => m.id === mode)?.color || 'emerald'}-500`} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 truncate max-w-[100px]">
                    {mode} mode
                  </span>
                </div>
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mode === 'debug' ? 'Paste your broken code snippets here...' : 
                    mode === 'quiz' ? 'Tell me "Ready" to start the challenge...' :
                    mode === 'career' ? 'Ask about portfolio, jobs, or market tips...' :
                    'Message your academy tutor...'
                  }
                  className="pl-32 pr-20 h-20 rounded-[2.5rem] bg-[#0D0D0E]/80 backdrop-blur-2xl border-white/5 focus:border-emerald-500/30 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-lg placeholder:text-white/10"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-3 top-3 w-14 h-14 rounded-3xl bg-emerald-500 text-black flex items-center justify-center hover:bg-emerald-400 transition-all disabled:opacity-30 shadow-xl shadow-emerald-500/10 active:scale-90 group/btn"
                >
                  <Send size={24} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </form>
            <div className="flex items-center justify-center gap-10 mt-6 opacity-40">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <ShieldCheck size={14} className="text-emerald-500" />
                Verified Mentor
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <Sparkles size={14} className="text-emerald-500" />
                Academy Aligned
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <Activity size={14} className="text-emerald-500" />
                Real-time Analysis
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
