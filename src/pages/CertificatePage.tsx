import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../components/ui';
import { Award, Download, Share2, Globe, ShieldCheck, Zap, User, Calendar, CheckCircle2 } from 'lucide-react';

export const CertificatePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-12 space-y-12 flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-6xl">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter leading-[0.9]">Your <span className="text-emerald-400">Certificate</span></h1>
          <p className="text-white/40 text-lg font-medium">Congratulations on your achievement!</p>
        </div>
        <div className="flex gap-4">
          <Button className="px-8 py-4 text-lg flex items-center gap-3 shadow-lg shadow-emerald-500/20">
            <Download size={20} />
            Download PDF
          </Button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black text-lg hover:bg-white/10 transition-all">
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>

      <Card className="p-20 w-full max-w-6xl aspect-[1.414/1] border-white/[0.05] bg-white/[0.01] relative overflow-hidden flex flex-col items-center justify-center text-center space-y-16">
        <div className="absolute top-0 left-0 w-full h-4 bg-emerald-500" />
        <div className="absolute bottom-0 left-0 w-full h-4 bg-emerald-500" />
        <div className="absolute top-12 left-12 text-emerald-500/10">
          <Award size={240} />
        </div>

        <div className="space-y-6 relative">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="font-black text-3xl tracking-tighter">MentorStack Academy</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">Certificate of Completion</div>
          <h2 className="text-7xl font-black tracking-tighter leading-[0.8] mb-8">Frontend <span className="text-emerald-400">Development</span></h2>
          <p className="text-white/40 text-xl font-medium max-w-2xl mx-auto">This is to certify that Alex Johnson has successfully completed the comprehensive Frontend Development curriculum with a final score of 92%.</p>
        </div>

        <div className="grid grid-cols-3 gap-24 w-full pt-16 border-t border-white/5 relative">
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Issue Date</div>
            <div className="text-2xl font-black tracking-tighter">April 1, 2026</div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Credential ID</div>
            <div className="text-2xl font-black tracking-tighter">MS-772-991-X</div>
          </div>
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Verification</div>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <ShieldCheck size={20} />
              <span className="text-xl font-black tracking-tighter">Verified</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-8 text-white/20 font-black text-sm uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Verified by AI Mentor
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Blockchain Secured
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          Industry Recognized
        </div>
      </div>
    </div>
  );
};
