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
  generateEliteCurriculum, 
  generateEliteLesson,
} from '../../services/aiGeneratorService';
import { ref, onValue, get } from 'firebase/database';
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
  const [genType, setGenType] = useState<'roadmap' | 'modular_lessons'>('roadmap');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      if (snapshot.exists()) {
        const skillsData = Object.values(snapshot.val()) as Skill[];
        setSkills(skillsData);
        const skillId = localStorage.getItem('lastSelectedSkillId');
        if (skillId) setSelectedSkillId(skillId);
      }
    }, (error) => {
      console.error("[AIGenerator] Skills listener error:", error);
    });
    return () => unsubscribe();
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  };

  const handleGenerate = async () => {
    const skill = skills.find(s => s.id === selectedSkillId);
    if (!skill) return;

    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    setStatus(`Initializing Elite V3 Engine for ${skill.title}...`);
    addLog(`Initiating career-focused generation for ${skill.title}`);

    try {
      if (genType === 'roadmap') {
        await generateEliteCurriculum(skill.id, skill.title, (s) => {
          setStatus(s);
          addLog(s);
          setProgress(prev => Math.min(prev + 15, 95));
        });
        setProgress(100);
        setStatus("Academy Roadmap Finalized!");
        addLog("Curriculum Architecture persisted to database.");
      } else {
        setStatus("Scanning roadmap modules...");
        const stagesSnap = await get(ref(db, `curriculum_stages/${skill.id}`));
        if (!stagesSnap.exists()) throw new Error("No roadmap found. Please generate Curriculum first.");
        
        const stages = Object.values(stagesSnap.val()) as any[];
        const mods: any[] = [];

        for (const stage of stages) {
          const weeksSnap = await get(ref(db, `curriculum_weeks/${stage.id}`));
          const weeks = weeksSnap.exists() ? Object.values(weeksSnap.val()) : [];
          for (const week of weeks as any[]) {
            const modulesSnap = await get(ref(db, `curriculum_modules/${week.id}`));
            if (modulesSnap.exists()) mods.push(...Object.values(modulesSnap.val() || {}));
          }
        }

        addLog(`Found ${mods.length} modules. Initializing deep content production...`);
        for (let i = 0; i < mods.length; i++) {
          const mod = mods[i];
          const titles = mod.lessonTitles || [mod.title];
          setStatus(`Crafting Module: ${mod.title}`);
          
          for (const t of titles) {
            addLog(`Generating Elite Lesson: ${t}`);
            await generateEliteLesson(skill.id, skill.title, mod.title, t, mod.id);
          }
          setProgress(Math.round(((i + 1) / mods.length) * 100));
        }
        setStatus("Elite Content Generation Complete!");
        addLog("All lessons produced at Premium level.");
      }
    } catch (error: any) {
      console.error(error);
      setStatus('Elite Generation FAILED.');
      addLog(`❌ ERROR: ${error.message}`);
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
                <div className="h-12 px-6 flex items-center justify-center rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-white/40">
                  <Loader2 size={14} className="mr-2 animate-spin" />
                  Engine Busy
                </div>
              ) : status === 'Elite Generation FAILED.' ? (
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
                displayValue={(skills || []).find(s => s.id === selectedSkillId)?.title}
                onChange={(e) => setSelectedSkillId(e.target.value)}
                disabled={isGenerating}
              >
                <option value="">Choose program...</option>
                {(skills || []).map((skill, index) => (
                  <option key={`${skill.id}-${index}`} value={skill.id}>{skill.title}</option>
                ))}
              </Select>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Generation Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'roadmap', label: 'Curriculum Roadmap', sub: 'Elite V3 career-defining structure', color: 'emerald' },
                    { id: 'modular_lessons', label: 'Premium Lesson Batch', sub: 'Generate high-density expert content', color: 'purple' }
                  ].map((t, idx) => (
                    <button
                      key={`${t.id}-${idx}`}
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

              <Button 
                fullWidth 
                size="lg" 
                onClick={handleGenerate}
                disabled={!selectedSkillId || isGenerating}
                className="h-16 rounded-2xl shadow-xl shadow-emerald-500/10 bg-emerald-500 hover:bg-emerald-600"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Generating Elite Content...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    Launch Elite Engine
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
                  <h3 className="font-black uppercase text-xs tracking-[0.2em]">V3 Live Telemetry</h3>
                </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Provider', value: 'Gemini 1.5 Pro', color: 'emerald' },
                    { label: 'Architecture', value: 'V3 Elite Engine', color: 'purple' },
                    { label: 'Status', value: isGenerating ? 'RUNNING' : 'IDLE', color: isGenerating ? 'emerald' : 'blue' }
                  ].map((s, idx) => (
                    <div key={`${s.label}-${idx}`} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{s.label}</p>
                      <p className={`text-sm font-black text-${s.color}-400`}>{s.value}</p>
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
              
              <div className="h-64 overflow-y-auto space-y-1 font-mono text-[9px] text-white/40 custom-scrollbar pr-4">
                {logs.length === 0 ? (
                  <p className="italic text-white/10">No logs streaming yet...</p>
                ) : (
                  logs.map((log, i) => (
                    <motion.div 
                      key={`log-${log}-${i}`} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      className="flex gap-3 py-1 border-b border-white/[0.02]"
                    >
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
