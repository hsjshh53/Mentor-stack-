import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Globe, Send, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProjectSubmissionModalProps {
  projectId: string;
  projectTitle: string;
  onClose: () => void;
  onSubmit: (githubLink: string, liveLink: string) => Promise<void>;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({
  projectId,
  projectTitle,
  onClose,
  onSubmit
}) => {
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubLink || !liveLink) {
      setError('Please provide both links.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit(githubLink, liveLink);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#050505] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-wider">Submit Project</h3>
            <p className="text-xs text-white/40 uppercase tracking-widest">{projectTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold uppercase tracking-wider">Submission Successful!</h4>
                <p className="text-sm text-white/40 uppercase tracking-widest">Your project has been received.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Github className="w-3 h-3" />
                    GitHub Repository Link
                  </label>
                  <input
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26] transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    Live Project Link
                  </label>
                  <input
                    type="url"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    placeholder="https://your-project.netlify.app"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F27D26] transition-colors"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-[#F27D26] hover:bg-[#F27D26]/90 text-white font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Project
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
