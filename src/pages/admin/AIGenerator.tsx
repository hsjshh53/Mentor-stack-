import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Badge, Select } from '../../components/ui';
import { 
  Sparkles, 
  Play, 
  Settings2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Database,
  Map,
  ShieldCheck,
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  generateRoadmap, 
  generateFullCurriculum, 
  generateMissingLessons,
  GenerationMode,
  cancelGeneration 
} from '../../services/aiGeneratorService';
import { ref, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';
import { Skill } from '../../types';

interface GenerationStats {
  modulesTotal: number;
  modulesDone: number;
  lessonsCreated: number;
  lessonsUpdated: number;
  lessonsSkipped: number;
  startTime: number;
}

export const AIGenerator: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genType, setGenType] = useState<'roadmap' | 'full' | 'lessons'>('roadmap');
  const [mode, setMode] = useState<GenerationMode>('missing');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState<GenerationStats | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    if (isGenerating && stats && stats.modulesDone > 0) {
      const elapsed = Date.now() - stats.startTime;
      const avgPerModule = elapsed / stats.modulesDone;
      const remaining = (stats.modulesTotal - stats.modulesDone) * avgPerModule;
      
      if (remaining > 0) {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setEstimatedTime(`${mins}m ${secs}s`);
      }
    } else {
      setEstimatedTime('');
    }
  }, [stats, stats?.modulesDone, isGenerating]);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      if (snapshot.exists()) {
        const skillsData = Object.values(snapshot.val()) as Skill[];
        setSkills(skillsData);
        
        // Handle query param or localStorage
        const params = new URLSearchParams(window.location.search);
        const skillId = params.get('skill') || localStorage.getItem('lastSelectedSkillId');
        if (skillId) {
          setSelectedSkillId(skillId);
          if (params.get('skill')) setGenType('full');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedSkillId) {
      localStorage.setItem('lastSelectedSkillId', selectedSkillId);
    }
  }, [selectedSkillId]);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 100));
  };

  const handleCancel = () => {
    cancelGeneration();
    setIsGenerating(false);
    setStatus('Generation cancelled.');
    addLog('User requested termination. Cleaning up workers...');
  };

  const handleGenerate = async () => {
    const skill = skills.find(s => s.id === selectedSkillId);
    if (!skill) return;
    
    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    setStats(null);
    setStatus(`Initializing ${genType} generation...`);
    addLog(`Starting ${genType} automation for ${skill.title}...`);

    try {
      if (genType === 'roadmap') {
        const result = await generateRoadmap(skill, (p, s) => {
          setProgress(p);
          setStatus(s);
          addLog(s);
        }, mode);
        if (result) {
          setStatus('Roadmap complete!');
          addLog('Architecture and modules finalized.');
        }
      } else if (genType === 'full') {
        const result = await generateFullCurriculum(skill, (p, s, st) => {
          setProgress(Math.round(p));
          setStatus(s);
          addLog(s);
          if (st) setStats({ ...st });
        }, mode);
        if (result) {
          setStatus('Full academy ready!');
          addLog('Massive generation success.');
        }
      } else if (genType === 'lessons') {
        await generateMissingLessons(skill.id, (p, s, st) => {
          setProgress(Math.round(p));
          setStatus(s);
          addLog(s);
          if (st) setStats({ ...st });
        });
        setStatus('Missing lessons generated!');
      }
    } catch (error: any) {
      console.error(error);
      setStatus('Generation failed.');
      addLog(`CRITICAL ERROR: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">AI Academy Engine</h1>
            <p className="text-white/40 font-medium italic">High-performance parallel curriculum generation with status tracking.</p>
          </div>
            <div className="flex gap-4">
              {isGenerating ? (
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  Cancel Task
                </Button>
              ) : status === 'Generation failed.' ? (
                <Button 
                  onClick={handleGenerate}
                  className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Retry Task
                </Button>
              ) : null}
              <Button 
                variant="outline" 
              onClick={() => window.location.href = '/admin/curriculum'}
              className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              <Map size={16} className="mr-2" />
              Manifest View
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <Card className="p-8 border-white/5 bg-white/[0.01] backdrop-blur-3xl space-y-8 h-fit ring-1 ring-white/5">
            <div className="flex items-center gap-3 text-emerald-400">
              <Settings2 size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Engine Control</h3>
            </div>

            <div className="space-y-6">
              <Select 
                label="Target Program"
                placeholder="Choose program..."
                value={selectedSkillId}
                displayValue={skills.find(s => s.id === selectedSkillId)?.title}
                onChange={(e) => setSelectedSkillId(e.target.value)}
                disabled={isGenerating}
              >
                <option value="">Choose program...</option>
                {skills.map(skill => (
                  <option key={skill.id} value={skill.id}>{skill.title}</option>
                ))}
              </Select>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Generation Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'roadmap', label: 'Curriculum Only', sub: 'Stages, weeks, and modules', color: 'emerald' },
                    { id: 'full', label: 'Full Academy', sub: 'Roadmap + Batch lessons', color: 'purple' },
                    { id: 'lessons', label: 'Missing Lessons', sub: 'Fill gaps in roadmap', color: 'blue' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setGenType(t.id as any)}
                      disabled={isGenerating}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        genType === t.id 
                          ? `border-${t.color}-500 bg-${t.color}-500/10` 
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-black uppercase">{t.label}</p>
                      <p className="text-[10px] text-white/40">{t.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {genType !== 'lessons' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Delta Mode</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'missing', label: 'Missing Only', icon: PlusCircle },
                      { id: 'update', label: 'Overwrite Metadata', icon: RefreshCw },
                      { id: 'regenerate', label: 'Deep Rebuild (Wipe)', icon: AlertCircle, destructive: true }
                    ].map(m => (
                      <button
                        key={m.id}
                        onClick={() => setMode(m.id as any)}
                        disabled={isGenerating}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                          mode === m.id 
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                            : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                        }`}
                      >
                        <m.icon size={16} className={m.destructive ? 'text-red-500' : ''} />
                        <span className={`text-[10px] font-black uppercase ${m.destructive && mode === m.id ? 'text-red-400' : ''}`}>{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                fullWidth 
                size="lg" 
                onClick={handleGenerate}
                disabled={!selectedSkillId || isGenerating}
                className="h-16 rounded-2xl shadow-xl shadow-emerald-500/10"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Crunching Data...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    Initialize Engine
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-white/5 bg-white/[0.01] backdrop-blur-3xl ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-emerald-400">
                  <RefreshCw size={20} className={isGenerating ? 'animate-spin' : ''} />
                  <h3 className="font-black uppercase text-xs tracking-[0.2em]">Live Telemetry</h3>
                </div>
                {estimatedTime && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-none font-black text-[10px]">
                    EST: {estimatedTime}
                  </Badge>
                )}
              </div>

              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Active Process</p>
                      <p className="text-xl font-black tracking-tight">{status || 'Engines Standby'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black text-emerald-500">{progress}%</p>
                    </div>
                  </div>
                  
                  <div className="relative h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-purple-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Modules Processed', value: stats ? `${stats.modulesDone}/${stats.modulesTotal}` : '0/0', color: 'blue' },
                    { label: 'Lessons Born', value: stats?.lessonsCreated || 0, color: 'emerald' },
                    { label: 'Lessons Refined', value: stats?.lessonsUpdated || 0, color: 'purple' },
                    { label: 'Conflicts Saved', value: stats?.lessonsSkipped || 0, color: 'amber' }
                  ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{s.label}</p>
                      <p className={`text-xl font-black text-${s.color}-400`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 border-white/5 bg-black/20 backdrop-blur-3xl ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-white/40">
                  <Database size={20} />
                  <h3 className="font-black uppercase text-xs tracking-[0.2em]">Engine Logs</h3>
                </div>
                <button 
                  onClick={() => setLogs([])}
                  className="text-[10px] font-black uppercase text-white/20 hover:text-white transition-colors"
                >
                  Flush Logs
                </button>
              </div>
              
              <div className="h-48 overflow-y-auto space-y-1 font-mono text-[9px] text-white/40 custom-scrollbar pr-4">
                {logs.length === 0 ? (
                  <p className="italic text-white/10">No logs streaming yet...</p>
                ) : (
                  logs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="flex gap-3 py-1 border-b border-white/[0.02]"
                    >
                      <span className="text-emerald-500/20 tabular-nums">[{new Date().toLocaleTimeString()}]</span>
                      <span className="text-white/60">{log}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
