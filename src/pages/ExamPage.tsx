import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, 
  Trophy, Zap, Target, HelpCircle,
  ChevronRight, RefreshCcw, BookOpen,
  Terminal, Code, Play, Star, Award, Sparkles
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { LoadingScreen } from '../components/LoadingScreen';
import { FINAL_EXAMS } from '../constants/exams';
import { FinalExam, QuizQuestion } from '../types';
import { checkCertificateEligibility, generateCertificate } from '../services/certificateService';
import { useAuth } from '../context/AuthContext';

export const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, loading: userLoading, updateProgress, addXP } = useUserData();
  const [exam, setExam] = useState<FinalExam | null>(null);
  const [currentSection, setCurrentSection] = useState<'theory' | 'practical' | 'debugging' | 'coding'>('theory');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number[]>>({
    theory: [],
    practical: [],
    debugging: []
  });
  const [codingSolution, setCodingSolution] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [earnedCertificate, setEarnedCertificate] = useState<any>(null);

  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<string[]>([]);

  useEffect(() => {
    const foundExam = FINAL_EXAMS.find(e => e.id === examId);
    if (foundExam) {
      setExam(foundExam);
      setCodingSolution(foundExam.codingTask.starterCode);
    }
  }, [examId]);

  if (userLoading || !exam) return <LoadingScreen message="PREPARING FINAL EXAM..." />;

  const handleAnswer = (optionIdx: number) => {
    if (showFeedback) return;
    const newAnswers = { ...selectedAnswers };
    newAnswers[currentSection][currentQuestion] = optionIdx;
    setSelectedAnswers(newAnswers);
    setShowFeedback(true);

    const questions = currentSection === 'theory' ? exam.theoryQuestions : 
                      currentSection === 'practical' ? exam.practicalQuestions : 
                      exam.debuggingQuestions;

    if (optionIdx !== questions[currentQuestion].correctIndex) {
      setWrongQuestions(prev => [...prev, questions[currentQuestion].question]);
    }
  };

  const nextStep = () => {
    setShowFeedback(false);
    const sections: ('theory' | 'practical' | 'debugging' | 'coding')[] = ['theory', 'practical', 'debugging', 'coding'];
    const currentIdx = sections.indexOf(currentSection);
    
    const questions = currentSection === 'theory' ? exam.theoryQuestions : 
                      currentSection === 'practical' ? exam.practicalQuestions : 
                      currentSection === 'debugging' ? exam.debuggingQuestions : [];

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentIdx < sections.length - 1) {
      setCurrentSection(sections[currentIdx + 1]);
      setCurrentQuestion(0);
    } else {
      handleFinish();
    }
  };

  const calculateScore = () => {
    let score = 0;
    let total = 0;

    ['theory', 'practical', 'debugging'].forEach(section => {
      const questions = section === 'theory' ? exam.theoryQuestions : 
                        section === 'practical' ? exam.practicalQuestions : 
                        exam.debuggingQuestions;
      
      questions.forEach((q, idx) => {
        if (selectedAnswers[section][idx] === q.correctIndex) {
          score++;
        }
        total++;
      });
    });

    return { score, total };
  };

  const handleFinish = async () => {
    const { score, total } = calculateScore();
    const finalScore = Math.round((score / total) * 100);
    const passed = finalScore >= 70;

    if (progress) {
      const newWeakAreas = [...new Set([...progress.weakAreas, ...wrongQuestions])];
      const newCompletedExams = passed ? [...progress.completedExams, exam.id] : progress.completedExams;
      
      await updateProgress({
        completedExams: newCompletedExams,
        weakAreas: newWeakAreas.slice(0, 10)
      });
      
      if (passed) {
        await addXP(exam.xpReward);

        // Check for certificate eligibility
        if (progress.selectedPath) {
          const isEligible = checkCertificateEligibility({
            ...progress,
            completedExams: newCompletedExams
          }, progress.selectedPath);

          if (isEligible) {
            const cert = await generateCertificate(
              user!.uid,
              user!.displayName || 'Learner',
              progress.selectedPath,
              finalScore,
              progress
            );
            setEarnedCertificate(cert);
            setIsSuccessModalOpen(true);
          }
        }
      }
    }
    setShowResults(true);
  };

  if (showResults) {
    const { score, total } = calculateScore();
    const passed = score / total >= 0.7;

    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full space-y-8 text-center"
        >
          <div className={`w-32 h-32 rounded-[2.5rem] mx-auto flex items-center justify-center ${passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
            {passed ? <Star size={64} fill="currentColor" /> : <AlertCircle size={64} />}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight">
              {passed ? 'Congratulations!' : 'Almost There'}
            </h1>
            <p className="text-white/40 text-lg">
              You've completed the {exam.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-white/[0.02] border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Score</p>
              <p className="text-2xl font-bold">{Math.round((score / total) * 100)}%</p>
            </Card>
            <Card className="p-6 bg-white/[0.02] border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">XP Earned</p>
              <p className="text-2xl font-bold text-emerald-400">+{passed ? exam.xpReward : 0}</p>
            </Card>
            <Card className="p-6 bg-white/[0.02] border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
              <p className={`text-2xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
                {passed ? 'CERTIFIED' : 'FAILED'}
              </p>
            </Card>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => navigate('/dashboard')} fullWidth className="h-16 rounded-3xl text-lg shadow-2xl shadow-emerald-500/20">
              Return to Dashboard
            </Button>
            {!passed && (
              <Button onClick={() => window.location.reload()} variant="outline" fullWidth className="h-16 rounded-3xl border-white/10">
                Retry Exam
              </Button>
            )}
          </div>
        </motion.div>

        {/* Certificate Success Modal */}
        <AnimatePresence>
          {isSuccessModalOpen && earnedCertificate && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
              />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-xl text-center space-y-10"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 flex items-center justify-center opacity-20"
                  >
                    <Sparkles size={300} className="text-emerald-500" />
                  </motion.div>
                  <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-black mx-auto relative z-10 shadow-[0_0_50px_rgba(16,185,129,0.5)]">
                    <Trophy size={64} />
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <h2 className="text-5xl font-black tracking-tighter">Congratulations!</h2>
                  <p className="text-white/60 text-xl font-medium">
                    You've just unlocked your <span className="text-emerald-400 font-bold">{earnedCertificate.pathName}</span> Professional Certificate.
                  </p>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <Button 
                    onClick={() => navigate(`/certificate/${earnedCertificate.id}`)}
                    className="h-20 rounded-[2rem] text-xl font-black tracking-tight shadow-2xl shadow-emerald-500/40"
                  >
                    View Certificate
                    <Award size={24} className="ml-3" />
                  </Button>
                  <button 
                    onClick={() => setIsSuccessModalOpen(false)}
                    className="text-white/40 font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-colors"
                  >
                    Close and Continue
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const questions = currentSection === 'theory' ? exam.theoryQuestions : 
                    currentSection === 'practical' ? exam.practicalQuestions : 
                    currentSection === 'debugging' ? exam.debuggingQuestions : [];
  
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg tracking-tight">{exam.title}</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">
              Section: {currentSection.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {['theory', 'practical', 'debugging', 'coding'].map(s => (
            <div 
              key={s}
              className={`w-12 h-1.5 rounded-full ${currentSection === s ? 'bg-emerald-500' : 'bg-white/5'}`}
            />
          ))}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          {currentSection === 'coding' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tight">Final Coding Task</h2>
                <p className="text-white/40 text-lg leading-relaxed">{exam.codingTask.prompt}</p>
              </div>
              <div className="bg-[#050505] border border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="bg-white/[0.02] px-6 py-3 border-b border-white/5 flex items-center gap-2">
                  <Terminal size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Solution.tsx</span>
                </div>
                <textarea 
                  value={codingSolution}
                  onChange={(e) => setCodingSolution(e.target.value)}
                  className="w-full h-96 bg-transparent p-8 font-mono text-sm text-emerald-300/90 focus:ring-0 border-none resize-none"
                  spellCheck={false}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleFinish} className="h-16 px-12 rounded-3xl shadow-2xl shadow-emerald-500/20">
                  Submit Final Exam
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${currentSection}-${currentQuestion}`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 rounded-xl font-bold">
                  Question {currentQuestion + 1} of {questions.length}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  {question.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={showFeedback}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-8 rounded-3xl border text-left transition-all flex items-center justify-between group ${
                      selectedAnswers[currentSection][currentQuestion] === idx
                        ? idx === question.correctIndex 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                          : 'bg-red-500/10 border-red-500 text-red-400'
                        : showFeedback && idx === question.correctIndex
                          ? 'bg-emerald-500/5 border-emerald-500/50 text-emerald-400'
                          : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg font-bold">{option}</span>
                    {selectedAnswers[currentSection][currentQuestion] === idx && (
                      idx === question.correctIndex 
                        ? <CheckCircle2 size={24} className="text-emerald-500" />
                        : <AlertCircle size={24} className="text-red-500" />
                    )}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${
                    selectedAnswers[currentSection][currentQuestion] === question.correctIndex 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedAnswers[currentSection][currentQuestion] === question.correctIndex ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span className="font-black uppercase tracking-widest text-[10px]">
                      {selectedAnswers[currentSection][currentQuestion] === question.correctIndex ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{question.explanation}</p>
                </motion.div>
              )}

              <div className="pt-8 flex justify-end">
                <Button 
                  disabled={selectedAnswers[currentSection][currentQuestion] === undefined}
                  onClick={nextStep}
                  className="h-16 px-12 rounded-3xl shadow-2xl shadow-emerald-500/20"
                >
                  Next Step
                  <ChevronRight size={20} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};
