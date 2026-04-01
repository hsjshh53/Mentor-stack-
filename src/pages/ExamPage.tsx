import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { Trophy, Timer, CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [score, setScore] = useState(0);

  const startExam = () => setStep('quiz');
  const finishExam = () => {
    setScore(92);
    setStep('result');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-8">
      {step === 'intro' && (
        <Card className="p-12 w-full max-w-3xl space-y-12 text-center border-white/[0.05] bg-white/[0.01]">
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center text-black mx-auto shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={48} />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">Final <span className="text-emerald-400">Certification</span></h1>
              <p className="text-white/40 text-lg font-medium max-w-xl mx-auto">Complete this comprehensive exam to earn your verified Frontend Development certificate.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <Timer className="mx-auto text-emerald-500" size={32} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Duration</div>
              <div className="text-2xl font-black">60 Min</div>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <CheckCircle2 className="mx-auto text-emerald-500" size={32} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Questions</div>
              <div className="text-2xl font-black">50 Total</div>
            </div>
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <Trophy className="mx-auto text-emerald-500" size={32} />
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Passing</div>
              <div className="text-2xl font-black">90% Score</div>
            </div>
          </div>

          <div className="space-y-6">
            <Button onClick={startExam} className="w-full py-8 text-2xl shadow-lg shadow-emerald-500/20">Begin Final Exam</Button>
            <button onClick={() => navigate(-1)} className="text-white/40 font-black text-sm uppercase tracking-widest hover:text-white transition-all">Cancel Exam</button>
          </div>
        </Card>
      )}

      {step === 'quiz' && (
        <div className="w-full max-w-4xl space-y-12">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Question 1 of 50</div>
              <h2 className="text-3xl font-black tracking-tighter">Explain the React Reconciliation process in detail.</h2>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <Timer size={24} className="text-emerald-500" />
              <span className="font-mono text-xl font-bold">59:42</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              'Virtual DOM diffing algorithm',
              'Direct DOM manipulation',
              'Server-side rendering only',
              'Static site generation'
            ].map((option, i) => (
              <button 
                key={i}
                onClick={finishExam}
                className="w-full p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-left text-xl font-medium hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group flex items-center justify-between"
              >
                {option}
                <ArrowRight size={24} className="text-white/0 group-hover:text-emerald-500 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'result' && (
        <Card className="p-16 w-full max-w-3xl space-y-12 text-center border-white/[0.05] bg-white/[0.01]">
          <div className="space-y-6">
            <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-black mx-auto shadow-lg shadow-emerald-500/20">
              <Trophy size={64} />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">Exam <span className="text-emerald-400">Mastered!</span></h1>
              <p className="text-white/40 text-lg font-medium">You've earned your Frontend Development certification.</p>
            </div>
          </div>

          <div className="text-8xl font-black tracking-tighter text-emerald-400">{score}%</div>

          <div className="space-y-6">
            <Button onClick={() => navigate('/certificate/frontend')} className="w-full py-8 text-2xl shadow-lg shadow-emerald-500/20">View Certificate</Button>
            <button onClick={() => navigate('/dashboard')} className="text-white/40 font-black text-sm uppercase tracking-widest hover:text-white transition-all">Back to Dashboard</button>
          </div>
        </Card>
      )}
    </div>
  );
};
