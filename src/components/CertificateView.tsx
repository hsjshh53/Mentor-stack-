import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Share2, Download, Copy, ExternalLink, Zap } from 'lucide-react';
import { Certificate } from '../types';
import { format } from 'date-fns';

interface CertificateViewProps {
  certificate: Certificate;
  isPublic?: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ certificate, isPublic = false }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.verificationUrl);
    alert('Verification link copied to clipboard!');
  };

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `OLYNQ Stack Certificate - ${certificate.fullName}`,
        text: `Check out my ${certificate.pathName} certificate from OLYNQ Stack!`,
        url: certificate.verificationUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-8">
      {/* Certificate Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-[1.414/1] w-full bg-[#050506] border-[12px] border-[#1A1A1B] rounded-[2rem] overflow-hidden shadow-2xl print:shadow-none print:border-black"
        id="certificate-content"
      >
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10B981_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,#ffffff05_0px,#ffffff05_1px,transparent_1px,transparent_10px)]" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-between p-12 sm:p-20 text-center">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-3xl font-black tracking-tighter text-white">OLYNQ Stack</span>
          </div>

          {/* Title Section */}
          <div className="space-y-4">
            <h2 className="text-emerald-500 font-black uppercase tracking-[0.4em] text-sm sm:text-base">
              {certificate.tier} Certificate of Achievement
            </h2>
            <p className="text-white/40 font-medium italic text-lg">This certifies that</p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white py-4">
              {certificate.fullName}
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              has successfully completed the OLYNQ Stack <span className="text-emerald-400 font-bold">{certificate.pathName}</span> program 
              and demonstrated competency through lessons, tests, and project work.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full border-t border-white/[0.05] pt-12 mt-8">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Final Score</p>
              <p className="text-xl font-black text-emerald-400">{certificate.finalScore}%</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Issue Date</p>
              <p className="text-xl font-black text-white">{format(new Date(certificate.issueDate), 'MMM dd, yyyy')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Certificate ID</p>
              <p className="text-xl font-black text-white/40 font-mono text-sm uppercase">{certificate.id.slice(0, 8)}...</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Verification</p>
              <div className="flex items-center justify-center gap-2 text-emerald-500">
                <ShieldCheck size={18} />
                <span className="text-sm font-black uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end w-full mt-12">
            <div className="text-left space-y-2">
              <div className="w-48 h-px bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Program Director</p>
              <p className="font-serif italic text-white/60">OLYNQ Stack Academy</p>
            </div>
            
            {/* Seal */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-pulse" />
              <div className="absolute inset-2 border-2 border-dashed border-emerald-500/20 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
                <Award className="size-12 sm:size-16 opacity-20 absolute" />
                <Award className="size-8 sm:size-12" />
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="w-48 h-px bg-white/20" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Verification URL</p>
              <p className="text-[10px] font-mono text-white/20">{certificate.verificationUrl.replace('https://', '')}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Summary */}
      <Card className="p-8 bg-white/[0.02] border-white/[0.05]">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              Mastered Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {certificate.skills.map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <ExternalLink className="text-emerald-500" size={20} />
              Capstone Project
            </h3>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-sm font-black text-white mb-1">{certificate.projectTitle}</p>
              <p className="text-xs text-white/40">Demonstrated competency through practical implementation.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      {!isPublic && (
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black hover:bg-emerald-500 transition-all active:scale-95"
          >
            <Download size={20} />
            Download PDF
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all active:scale-95"
          >
            <Share2 size={20} />
            Share Certificate
          </button>
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black hover:bg-white/10 transition-all active:scale-95"
          >
            <Copy size={20} />
            Copy Verification Link
          </button>
        </div>
      )}

      {isPublic && (
        <div className="text-center">
          <p className="text-white/40 text-sm font-medium">
            This is a public verification page for a OLYNQ Stack certificate. 
            <br />
            OLYNQ Stack certificates are earned through rigorous assessment and project work.
          </p>
        </div>
      )}
    </div>
  );
};

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`rounded-[2rem] overflow-hidden ${className}`}>
    {children}
  </div>
);
