import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, AlertCircle, 
  Trophy, Zap, Target, HelpCircle,
  ChevronRight, RefreshCcw, BookOpen
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { useUserData } from '../hooks/useUserData';
import { LoadingScreen } from '../components/LoadingScreen';
import { STAGE_TESTS } from '../constants/tests';
import { StageTest } from '../types';

export const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { progress, loading: userLoading, updateProgress, addXP } = useUserData();
  const [test, setTest] = useState<StageTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const foundTest = STAGE_TESTS.find(t => t.id === testId);
    if (foundTest) {
      setTest(foundTest);
    }
  }, [testId]);

  if (userLoading || !test) return <LoadingScreen message="PREPARING TEST..." />;

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIdx;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, idx) => {
      return answer === test.questions[idx].correctIndex ? score + 1 : score;
    }, 0);
  };

  const handleFinish = async () => {
    const score = calculateScore();
    const passed = score >= test.minScoreToPass;

    if (passed && progress) {
      await addXP(test.xpReward);
      await updateProgress({
        completedTests: [...progress.completedTests, test.id]
      });
    }
    setShowResults(true);
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score >= test.minScoreToPass;

    return (
      <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full space-y-8 text-center"
        >
          <div className={`w-24 h-24 rounded-3xl mx-auto flex items-center justify-center ${passed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
            {passed ? <Trophy size={48} /> : <AlertCircle size={48} />}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight">
              {passed ? 'Stage Passed!' : 'Try Again'}
            </h1>
            <p className="text-white/40">
              You scored {score} out of {test.questions.length}
            </p>
          </div>

          <Card className="p-6 bg-white/[0.02] border-white/5 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/40">XP Earned</span>
              <span className="font-bold text-emerald-400">+{passed ? test.xpReward : 0} XP</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/40">Status</span>
              <span className={`font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
                {passed ? 'COMPLETED' : 'FAILED'}
              </span>
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            {passed ? (
              <Button onClick={() => navigate('/dashboard')} fullWidth className="h-14 rounded-2xl">
                Back to Dashboard
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()} fullWidth className="h-14 rounded-2xl">
                <RefreshCcw size={18} className="mr-2" />
                Retry Test
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate('/dashboard')} fullWidth className="h-14 rounded-2xl border-white/10">
              Exit
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg tracking-tight">{test.title}</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Question {currentQuestion + 1} of {test.questions.length}</p>
          </div>
        </div>
        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / test.questions.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          <motion.div
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                      : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  {selectedAnswers[currentQuestion] === idx && (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="pt-8 flex justify-end">
            <Button 
              disabled={selectedAnswers[currentQuestion] === undefined}
              onClick={isFinished ? handleFinish : nextQuestion}
              className="h-14 px-12 rounded-2xl shadow-xl shadow-emerald-500/20"
            >
              {isFinished ? 'Finish Test' : 'Next Question'}
              <ChevronRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};
