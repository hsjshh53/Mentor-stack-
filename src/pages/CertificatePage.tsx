import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Zap, ArrowLeft, Loader2, Award, Share2, Download, Copy } from 'lucide-react';
import { getCertificate } from '../services/certificateService';
import { Certificate } from '../types';
import { CertificateView } from '../components/CertificateView';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { Button } from '../components/ui';

export const CertificatePage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { progress, loading: userLoading } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!certificateId) return;
      try {
        const cert = await getCertificate(certificateId);
        if (cert) {
          setCertificate(cert);
        } else {
          setError('Certificate not found');
        }
      } catch (err) {
        setError('Invalid certificate ID');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
          <p className="text-white/40 font-medium tracking-widest uppercase text-xs">Loading Certificate...</p>
        </div>
      </div>
    );
  }

  const isOwner = user?.uid === certificate?.userId;

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#050506]/60 backdrop-blur-2xl border-b border-white/[0.05] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-3 -ml-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={26} className="text-white/60" />
          </button>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-gradient">OLYNQ Stack</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black tracking-tight">{user?.displayName || 'Developer'}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
              Verified Learner
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1">
            <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-white/[0.05]">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Award size={22} className="text-white/20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8 md:p-16 space-y-12">
        {error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center space-y-8 py-20"
          >
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto border border-red-500/20">
              <Award size={48} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tighter">Certificate Error</h1>
              <p className="text-white/40 font-medium text-lg leading-relaxed">
                {error}. This certificate ID could not be found. 
                Please ensure you have the correct link.
              </p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all mx-auto"
            >
              <ArrowLeft size={20} />
              Return to Dashboard
            </button>
          </motion.div>
        ) : certificate ? (
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-emerald-500/10">
                  <Award size={14} fill="currentColor" />
                  Certificate Unlocked
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                  Your <span className="text-gradient">{certificate.pathName}</span> <br />
                  Credential
                </h1>
                <p className="text-white/40 text-xl leading-relaxed font-medium max-w-lg">
                  Congratulations! You've successfully completed the program and demonstrated your skills through assessment and project work.
                </p>
              </div>
            </div>

            <div className="relative">
              <CertificateView certificate={certificate} isPublic={!isOwner} />
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-12 text-center text-white/20">
        <p className="text-sm font-medium">© 2026 OLYNQ Stack Academy. All rights reserved.</p>
        <p className="text-[10px] font-black uppercase tracking-widest mt-2">Verified Skill Proof System</p>
      </footer>
    </div>
  );
};
