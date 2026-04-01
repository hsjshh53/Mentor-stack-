import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { CheckCircle2, XCircle, ArrowRight, Timer, Trophy, BookOpen } from 'lucide-react';

export const TestPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [score, setScore] = useState(0);

  const startTest = () => setStep('quiz');
  const finishTest = () => {
    setScore(85);
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-8">
      {step === 'intro' && (
        <Card className="p-12 w-full max-w-2xl space-y-10 text-center border-white/[0.05] bg-white/[0.01]">
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center text-black mx-auto shadow-lg shadow-emerald-500/20">
              <BookOpen size={40} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter">Module <span className="text-emerald-400">Assessment</span></h1>
              <p className="text-white/40 text-lg font-medium">Verify your knowledge of HTML Fundamentals.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <Timer className="mx-auto text-emerald-500" size={24} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Duration</div>
              <div className="text-xl font-black">15 Min</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <CheckCircle2 className="mx-auto text-emerald-500" size={24} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Questions</div>
              <div className="text-xl font-black">10 Total</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <Trophy className="mx-auto text-emerald-500" size={24} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Passing</div>
              <div className="text-xl font-black">80% Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <Button onClick={startTest} className="w-full py-6 text-xl shadow-lg shadow-emerald-500/20">Start Assessment</Button>
            <button onClick={() => navigate(-1)} className="text-white/40 font-black text-sm uppercase tracking-widest hover:text-white transition-all">Go Back</button>
          </div>
        </Card>
      )}

      {step === 'quiz' && (
        <div className="w-full max-w-3xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Question 1 of 10</div>
              <h2 className="text-2xl font-black tracking-tighter">What does HTML stand for?</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              <Timer size={18} className="text-emerald-500" />
              <span className="font-mono font-bold">14:52</span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              'Hyper Text Markup Language',
              'High Tech Modern Language',
              'Hyper Transfer Markup Link',
              'Home Tool Markup Language'
            ].map((option, i) => (
              <button 
                key={i}
                onClick={finishTest}
                className="w-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left text-lg font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group flex items-center justify-between"
              >
                {option}
                <ArrowRight size={20} className="text-white/0 group-hover:text-emerald-500 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && (
        <Card className="p-12 w-full max-w-2xl space-y-10 text-center border-white/[0.05] bg-white/[0.01]">
          <div className="space-y-4">
            <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-black mx-auto shadow-lg shadow-emerald-500/20">
              <Trophy size={48} />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter">Assessment <span className="text-emerald-400">Passed!</span></h1>
              <p className="text-white/40 text-lg font-medium">You've successfully completed the HTML Basics module.</p>
            </div>
          </div>

          <div className="text-6xl font-black tracking-tighter text-emerald-400">{score}%</div>

          <div className="space-y-4">
            <Button onClick={() => navigate('/dashboard')} className="w-full py-6 text-xl shadow-lg shadow-emerald-500/20">Continue Journey</Button>
            <button onClick={() => setStep('intro')} className="text-white/40 font-black text-sm uppercase tracking-widest hover:text-white transition-all">Review Answers</button>
          </div>
        </Card>
      )}
    </div>
  );
};
