import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Badge } from '../components/ui';
import { ShieldCheck, CheckCircle2, User, Calendar, Award, Globe, ExternalLink, Zap } from 'lucide-react';

export const VerificationPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-8 space-y-12">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="font-black text-2xl tracking-tighter">MentorStack</span>
      </div>

      <Card className="p-16 w-full max-w-4xl space-y-12 border-white/[0.05] bg-white/[0.01] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
        <div className="absolute top-8 right-8 text-emerald-500/10">
          <ShieldCheck size={160} />
        </div>

        <div className="space-y-8 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-emerald-400 font-black text-sm uppercase tracking-widest">
              <ShieldCheck size={20} />
              Verified Credential
            </div>
            <h1 className="text-6xl font-black tracking-tighter leading-[0.9]">Frontend <span className="text-emerald-400">Development</span></h1>
            <p className="text-white/40 text-xl font-medium">Credential ID: {id || 'MS-772-991-X'}</p>
          </div>

          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Recipient</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                    <User size={20} />
                  </div>
                  <div className="text-2xl font-black tracking-tighter">Alex Johnson</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Issue Date</div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-emerald-500" size={20} />
                  <div className="text-xl font-bold">April 1, 2026</div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Issuer</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <div className="text-2xl font-black tracking-tighter">MentorStack Academy</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Status</div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <div className="text-xl font-bold text-emerald-400">Active & Verified</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
                <Globe size={18} />
                Public Profile
              </button>
              <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-black text-sm hover:bg-white/10 transition-all">
                <ExternalLink size={18} />
                View on Blockchain
              </button>
            </div>
            <Badge className="bg-emerald-500/10 border-emerald-500/20 text-emerald-400 px-4 py-2 text-xs">Level 4 Certified</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
