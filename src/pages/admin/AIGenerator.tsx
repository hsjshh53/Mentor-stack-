import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Button, Badge } from '../../components/ui';
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
import { generateRoadmap, generateFullCurriculum, GenerationMode } from '../../services/aiGeneratorService';
import { ref, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';
import { Skill } from '../../types';

export const AIGenerator: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genType, setGenType] = useState<'roadmap' | 'full'>('roadmap');
  const [mode, setMode] = useState<GenerationMode>('missing');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const skillsRef = ref(db, 'skills');
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      if (snapshot.exists()) {
        const skillsData = Object.values(snapshot.val()) as Skill[];
        setSkills(skillsData);
        
        // Handle query param
        const params = new URLSearchParams(window.location.search);
        const skillId = params.get('skill');
        if (skillId) {
          setSelectedSkillId(skillId);
          setGenType('full');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 100));
  };

  const handleGenerate = async () => {
    const skill = skills.find(s => s.id === selectedSkillId);
    if (!skill) return;
    
    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    setStatus(`Initializing ${genType} generation in ${mode} mode...`);
    addLog(`Starting ${genType} design for ${skill.title} (Mode: ${mode})...`);

    try {
      if (genType === 'roadmap') {
        await generateRoadmap(skill, (p, s) => {
          setProgress(p);
          setStatus(s);
          addLog(s);
        }, mode);
        setStatus('Roadmap complete!');
        addLog('Career roadmap, stages, and modules processed.');
      } else {
        await generateFullCurriculum(skill, (p, s) => {
          setProgress(Math.round(p));
          setStatus(s);
          addLog(s);
        }, mode);
        setStatus('Full curriculum complete!');
        addLog('Roadmap and lessons processed and saved.');
      }
    } catch (error: any) {
      console.error(error);
      setStatus('Generation failed.');
      addLog(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">Academy AI Engine</h1>
            <p className="text-white/40 font-medium">Bulk generate high-quality academy programs and structured lessons using Gemini AI.</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/admin/curriculum'}
            className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest"
          >
            <Map size={16} className="mr-2" />
            Manage Curriculum
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <Card className="p-8 border-white/5 bg-white/[0.02] space-y-8 h-fit">
            <div className="flex items-center gap-3 text-emerald-400">
              <Settings2 size={20} />
              <h3 className="font-black uppercase text-xs tracking-[0.2em]">Configuration</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-white/40">Select Program</label>
                <select 
                  value={selectedSkillId}
                  onChange={(e) => setSelectedSkillId(e.target.value)}
                  disabled={isGenerating}
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 font-bold focus:border-emerald-500 transition-colors outline-none appearance-none"
                >
                  <option value="">Choose a program...</option>
                  {skills.map(skill => (
                    <option key={skill.id} value={skill.id}>{skill.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-white/40">Generation Mode</label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setMode('missing')}
                    disabled={isGenerating}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      mode === 'missing' 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                        : 'border-white/5 bg-white/[0.02] text-white/40 hover:border-white/20'
                    }`}
                  >
                    <PlusCircle size={16} />
                    <div>
                      <p className="text-[10px] font-black uppercase">Generate Missing Only</p>
                      <p className="text-[9px] opacity-60">Skip existing items, only add new ones.</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setMode('update')}
                    disabled={isGenerating}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      mode === 'update' 
                        ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                        : 'border-white/5 bg-white/[0.02] text-white/40 hover:border-white/20'
                    }`}
                  >
                    <RefreshCw size={16} />
                    <div>
                      <p className="text-[10px] font-black uppercase">Update Existing</p>
                      <p className="text-[9px] opacity-60">Refresh metadata for existing items.</p>
                    </div>
                  </button>
                  <button
                    onClick={() => setMode('regenerate')}
                    disabled={isGenerating}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                      mode === 'regenerate' 
                        ? 'border-red-500 bg-red-500/10 text-red-400' 
                        : 'border-white/5 bg-white/[0.02] text-white/40 hover:border-white/20'
                    }`}
                  >
                    <AlertCircle size={16} />
                    <div>
                      <p className="text-[10px] font-black uppercase text-red-400">Regenerate Program</p>
                      <p className="text-[9px] opacity-60">Wipe and rebuild everything from scratch.</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-white/40">Generation Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGenType('roadmap')}
                    disabled={isGenerating}
                    className={`p-4 rounded-2xl border-2 transition-all text-left space-y-1 ${
                      genType === 'roadmap' 
                        ? 'border-emerald-500 bg-emerald-500/10' 
                        : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-black uppercase">Curriculum</p>
                    <p className="text-[10px] text-white/40">Stages, Weeks & Modules</p>
                  </button>
                  <button
                    onClick={() => setGenType('full')}
                    disabled={isGenerating}
                    className={`p-4 rounded-2xl border-2 transition-all text-left space-y-1 ${
                      genType === 'full' 
                        ? 'border-purple-500 bg-purple-500/10' 
                        : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <p className="text-xs font-black uppercase">Full Academy</p>
                    <p className="text-[10px] text-white/40">Curriculum + ~150 Lessons</p>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Duplicate Protection</span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                  {mode === 'missing' 
                    ? 'Smart check enabled. Existing stages, weeks, modules, and lessons will be preserved.'
                    : mode === 'update'
                    ? 'Existing items will be updated with fresh AI content without creating duplicates.'
                    : 'WARNING: This will delete all existing curriculum data for this program before generating.'}
                </p>
              </div>

              <Button 
                fullWidth 
                size="lg" 
                onClick={handleGenerate}
                disabled={!selectedSkillId || isGenerating}
                className={`h-16 rounded-2xl shadow-xl transition-all ${
                  genType === 'full' 
                    ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20' 
                    : 'shadow-emerald-500/20'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Generating Academy...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="mr-2" />
                    {genType === 'roadmap' ? 'Generate Curriculum' : 'Generate Full Academy'}
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Progress & Status */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 border-white/5 bg-white/[0.02] space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-400">
                  <Sparkles size={20} />
                  <h3 className="font-black uppercase text-xs tracking-[0.2em]">Generation Status</h3>
                </div>
                <Badge className={`${isGenerating ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-white/20'} px-4 py-1 rounded-lg font-black uppercase tracking-widest text-[10px]`}>
                  {isGenerating ? 'Processing' : 'Idle'}
                </Badge>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
                    <span className="text-white/40">{status}</span>
                    <span className="text-emerald-400">{progress}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Success</p>
                      <p className="text-sm font-bold">{Math.floor((progress / 100) * 100)}% Complete</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                      <AlertCircle size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Errors</p>
                      <p className="text-sm font-bold">0 Issues</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Logs */}
            <Card className="p-8 border-white/5 bg-white/[0.02] space-y-6">
              <div className="flex items-center gap-3 text-white/40">
                <Database size={20} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Generation Logs</h3>
              </div>
              <div className="h-64 overflow-y-auto space-y-2 font-mono text-[10px] text-white/30 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="italic">Waiting for generation to start...</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-emerald-500/30">[{new Date().toLocaleTimeString()}]</span>
                      <span>{log}</span>
                    </div>
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
