import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X, RefreshCcw } from 'lucide-react';
import { Button } from './ui';

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  pathName: string;
}

export const ResetProgressModal: React.FC<ResetProgressModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  pathName
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async () => {
    if (confirmText !== 'RESET') return;
    
    setLoading(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (err: any) {
      setError(err.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-md bg-[#0D0D0E] border border-white/10 rounded-[2.5rem] p-10 relative z-10 overflow-hidden shadow-2xl"
          >
            {/* Warning Background Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-500/10 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-start mb-8 relative">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                <AlertTriangle size={32} />
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl transition-all text-white/40"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-3xl font-black tracking-tighter text-white uppercase">Dangerous Action</h3>
              <p className="text-white/40 leading-relaxed font-medium">
                Are you sure you want to restart your journey in <span className="text-white font-bold">{pathName}</span>? 
                This will reset all lesson progress, XP, and streaks. This action is <span className="text-red-400 font-bold uppercase">irreversible</span>.
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/30 flex gap-3 items-center">
                 <RefreshCcw size={14} className="text-red-500" />
                 Your account and subscription will remain safe.
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  Type <span className="text-white">RESET</span> to confirm
                </label>
                <input 
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-6 font-black text-xl tracking-widest text-white focus:border-red-500/50 outline-none transition-all placeholder:text-white/5"
                  placeholder="RESET"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs font-bold text-center bg-red-400/5 py-3 rounded-xl border border-red-400/10">
                  {error}
                </p>
              )}

              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-16 rounded-2xl border-white/10 font-bold"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleReset}
                  disabled={confirmText !== 'RESET' || loading}
                  className={`flex-1 h-16 rounded-2xl font-black transition-all ${
                    confirmText === 'RESET' 
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' 
                      : 'bg-white/5 text-white/20'
                  }`}
                >
                  {loading ? 'Resetting...' : 'Reset Progress'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
