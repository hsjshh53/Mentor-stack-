import React, { useEffect, useState } from 'react';
import { aiGeneratorService, GenerationProgress } from '../services/aiGeneratorService';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export const AILessonGenerator: React.FC = () => {
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    // Start generation in the background
    aiGeneratorService.startBackgroundGeneration((p) => {
      setProgress(p);
      setIsVisible(true);
    });
  }, []);

  if (!isVisible || !progress) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isMinimized ? (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 p-3 rounded-full shadow-lg hover:bg-emerald-500/20 transition-all group"
          >
            <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="bg-gray-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl w-72"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm font-medium text-white">AI Generator</span>
              </div>
              <button 
                onClick={() => setIsMinimized(true)}
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                Minimize
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                  <span>Current Path</span>
                  <span className="text-emerald-400">Active</span>
                </div>
                <div className="text-sm text-white font-medium truncate">
                  {progress.currentPath}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] text-gray-400 mb-1 uppercase tracking-wider font-semibold">
                  <span>Status</span>
                  <span>{Math.round((progress.count / progress.total) * 100)}%</span>
                </div>
                <div className="text-xs text-gray-300 mb-2">
                  {progress.status}
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.count / progress.total) * 100}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Generating lessons in background...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
