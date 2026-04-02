import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Play, Pause, Square, 
  Settings, AlertCircle, CheckCircle2, 
  Clock, RefreshCw, ChevronRight, 
  Zap, BookOpen, Target, ShieldCheck,
  Layout, Database, Smartphone, BarChart, Cpu, Shield, Globe
} from 'lucide-react';
import { Card, Button, Badge } from '../../components/ui';
import { TECH_TOOLS } from '../../constants/techStack';
import { CURRICULUM } from '../../constants/curriculum';
import { ref, onValue, set, update, push } from 'firebase/database';
import { db } from '../../lib/firebase';
import { generateFullCurriculum } from '../../services/generatorService';

export const AdminGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    totalLessons: 120,
    generated: 0,
    published: 0,
    failed: 0,
    targetLessons: 120,
    currentModule: '',
    currentLesson: '',
    status: 'Idle'
  });
  const [batchSize, setBatchSize] = useState(3);
  const [targetCount, setTargetCount] = useState(120);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Listen to generation status in Realtime Database
    const statusRef = ref(db, 'admin/generation_status');
    const unsub = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsGenerating(data.isGenerating || false);
        setIsPaused(data.isPaused || false);
        setSelectedSkill(data.selectedSkill || null);
        if (data.batchSize) setBatchSize(data.batchSize);
        if (data.progress) setProgress(data.progress);
        
        if (data.logs) {
          const logsArray = Object.entries(data.logs).map(([id, log]: [string, any]) => ({ id, ...log }));
          setLogs(logsArray.sort((a, b) => b.timestamp - a.timestamp));
        }

        // Watchdog logic: if isGenerating is true but lastHeartbeat is older than 2 minutes
        if (data.isGenerating && !data.isPaused && data.lastHeartbeat) {
          const now = Date.now();
          const diff = now - data.lastHeartbeat;
          if (diff > 120000) { // 2 minutes
            update(statusRef, { 
              'progress/status': 'Stalled',
              isGenerating: false,
              isPaused: false
            });
            push(ref(db, 'admin/generation_status/logs'), {
              message: '[WATCHDOG] Generation appears stalled. Stopping.',
              type: 'error',
              timestamp: now
            });
          }
        }
      }
    });

    return () => unsub();
  }, []);

  const handleStartGeneration = async () => {
    if (!selectedSkill) return;
    
    try {
      await update(ref(db, 'admin/generation_status'), {
        isGenerating: true,
        isPaused: false,
        selectedSkill,
        batchSize,
        targetCount,
        lastHeartbeat: Date.now(),
        progress: {
          totalLessons: 120,
          generated: 0,
          published: 0,
          failed: 0,
          targetLessons: targetCount,
          currentModule: 'Initializing...',
          currentLesson: 'Starting...',
          status: 'Running'
        }
      });

      // Clear old logs
      await set(ref(db, 'admin/generation_status/logs'), null);

      // Start the generation process in the background
      generateFullCurriculum(selectedSkill, batchSize, targetCount);
    } catch (error) {
      console.error('Error starting generation:', error);
    }
  };

  const handlePause = async () => {
    await update(ref(db, 'admin/generation_status'), { isPaused: !isPaused });
  };

  const handleStop = async () => {
    await update(ref(db, 'admin/generation_status'), { 
      isGenerating: false, 
      isPaused: false,
      'progress/status': 'Stopped'
    });
  };

  return (
    <div className="space-y-10">
      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="font-black text-2xl tracking-tight">Auto-Generator Control</h3>
                <p className="text-sm text-white/30 font-medium">Manage automated curriculum generation.</p>
              </div>
            </div>
            <Badge className={isGenerating ? 'bg-emerald-500/10 text-emerald-500 animate-pulse' : 'bg-white/5 text-white/20'}>
              {isGenerating ? (isPaused ? 'PAUSED' : 'GENERATING') : 'IDLE'}
            </Badge>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Select Skill to Generate</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(CURRICULUM).map(skill => (
                  <button 
                    key={skill}
                    onClick={() => setSelectedSkill(skill)}
                    disabled={isGenerating}
                    className={`p-4 rounded-2xl border transition-all text-xs font-bold tracking-tight text-center ${
                      selectedSkill === skill 
                        ? 'bg-emerald-500 border-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                        : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-emerald-500/30'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Batch Size (Concurrency)</label>
                <div className="flex gap-4">
                  {[1, 3, 5].map(size => (
                    <button 
                      key={size}
                      onClick={() => setBatchSize(size)}
                      disabled={isGenerating}
                      className={`px-6 py-3 rounded-xl border transition-all text-xs font-bold tracking-tight ${
                        batchSize === size 
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                          : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-blue-500/30'
                      }`}
                    >
                      {size} {size === 1 ? 'Lesson' : 'Lessons'}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/20 font-medium italic">Higher batch size generates faster but may hit API limits.</p>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Target Lesson Count</label>
                <div className="flex gap-4">
                  {[100, 120, 150].map(count => (
                    <button 
                      key={count}
                      onClick={() => setTargetCount(count)}
                      disabled={isGenerating}
                      className={`px-6 py-3 rounded-xl border transition-all text-xs font-bold tracking-tight ${
                        targetCount === count 
                          ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                          : 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:border-purple-500/30'
                      }`}
                    >
                      {count} Lessons
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/20 font-medium italic">Target number of lessons to generate for the full curriculum.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {!isGenerating ? (
                <Button 
                  onClick={handleStartGeneration}
                  disabled={!selectedSkill}
                  className="h-16 px-10 rounded-2xl font-black tracking-tight gap-3 shadow-xl shadow-emerald-500/20"
                >
                  <Play size={20} fill="currentColor" />
                  Start Auto Generation
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={handlePause}
                    variant="outline"
                    className="h-16 px-10 rounded-2xl font-black tracking-tight gap-3 border-white/[0.1] bg-white/[0.02]"
                  >
                    {isPaused ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button 
                    onClick={handleStop}
                    variant="outline"
                    className="h-16 px-10 rounded-2xl font-black tracking-tight gap-3 border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10"
                  >
                    <Square size={20} fill="currentColor" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Settings size={22} />
            </div>
            <h3 className="font-black uppercase text-sm tracking-[0.2em]">Gen Settings</h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div>
                <p className="text-xs font-bold tracking-tight">Auto-Publish</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Live to users</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 flex justify-end">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div>
                <p className="text-xs font-bold tracking-tight">Deep Lessons</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Enhanced quality</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 flex justify-end">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div>
                <p className="text-xs font-bold tracking-tight">Retry on Failure</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Max 3 attempts</p>
              </div>
              <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 flex justify-end">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-10 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Target size={22} />
              </div>
              <div>
                <h3 className="font-black uppercase text-sm tracking-[0.2em]">Generation Progress</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 mt-1">{progress.status}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black tracking-tight">{progress.generated}</span>
              <span className="text-xs font-black text-white/20 uppercase tracking-widest ml-2">/ {progress.totalLessons} Lessons</span>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <div className="w-full h-4 bg-white/[0.03] rounded-full p-1 border border-white/[0.05]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress.generated / progress.totalLessons) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                <span>Overall Completion</span>
                <span className="text-emerald-500">{Math.round((progress.generated / progress.totalLessons) * 100)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Current Module</p>
                <p className="text-sm font-bold tracking-tight text-emerald-400 truncate">{progress.currentModule || 'N/A'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Current Lesson</p>
                <p className="text-sm font-bold tracking-tight text-blue-400 truncate">{progress.currentLesson || 'N/A'}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Published</p>
                <p className="text-sm font-bold tracking-tight text-purple-400">{progress.published} Lessons</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Failed</p>
                <p className="text-sm font-bold tracking-tight text-red-400">{progress.failed} Lessons</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Clock size={22} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-[0.2em]">Activity Logs</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-emerald-500 transition-colors">Clear</button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/[0.02] flex items-center justify-center mx-auto text-white/10">
                  <AlertCircle size={24} />
                </div>
                <p className="text-xs font-medium text-white/20 italic">No activity logged yet.</p>
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={log.id} className="flex gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] group">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                    log.type === 'error' ? 'bg-red-500' : 
                    log.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`} />
                  <div className="space-y-1">
                    <p className={`text-xs font-bold tracking-tight ${log.type === 'error' ? 'text-red-400' : 'text-white/80'}`}>
                      {log.message}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
