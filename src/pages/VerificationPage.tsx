import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Zap, ArrowLeft, Loader2 } from 'lucide-react';
import { getCertificate } from '../services/certificateService';
import { Certificate } from '../types';
import { CertificateView } from '../components/CertificateView';

export const VerificationPage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mx-auto" />
          <p className="text-white/40 font-medium tracking-widest uppercase text-xs">Verifying Certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#050506]/60 backdrop-blur-2xl border-b border-white/[0.05] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-gradient">MentorStack</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-500">
          <ShieldCheck size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Official Verification</span>
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
              <ShieldAlert size={48} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tighter">Verification Failed</h1>
              <p className="text-white/40 font-medium text-lg leading-relaxed">
                {error}. This certificate ID could not be verified in our database. 
                Please ensure you have the correct link.
              </p>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all mx-auto"
            >
              <ArrowLeft size={20} />
              Return to MentorStack
            </button>
          </motion.div>
        ) : certificate ? (
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                <ShieldCheck size={24} />
                <span className="text-lg font-black uppercase tracking-[0.2em]">Verified Certificate</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                Official Credential for <span className="text-gradient">{certificate.fullName}</span>
              </h1>
            </div>

            <CertificateView certificate={certificate} isPublic={true} />
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-12 text-center text-white/20">
        <p className="text-sm font-medium">© 2026 MentorStack Academy. All rights reserved.</p>
        <p className="text-[10px] font-black uppercase tracking-widest mt-2">Verified Skill Proof System</p>
      </footer>
    </div>
  );
};
