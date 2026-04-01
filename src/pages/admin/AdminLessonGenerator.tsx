import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Save, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Sparkles,
  Eye,
  Edit3,
  Trash2,
  Plus,
  BookOpen,
  Code,
  Lightbulb,
  Target,
  HelpCircle,
  Check,
  Play,
  Pause,
  Square,
  RefreshCw,
  List
} from 'lucide-react';
import { curriculumService } from '../../services/curriculumService';
import { aiService } from '../../services/aiService';
import { PathCurriculum, LessonContent, Roadmap, GenerationProgress, RoadmapModule } from '../../types';
import { Badge } from '../../components/ui';
import Markdown from 'react-markdown';

export const AdminLessonGenerator: React.FC = () => {
  const [paths, setPaths] = useState<PathCurriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mode State
  const [isAutoMode, setIsAutoMode] = useState(false);

  // Form State
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedModule, setSelectedModule] = useState('');
  const [tool, setTool] = useState('');
  const [lessonNumber, setLessonNumber] = useState(1);
  const [context, setContext] = useState('');

  // Auto Mode State
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const generationRef = useRef<boolean>(false);
  const pauseRef = useRef<boolean>(false);

  // Generated Lesson State
  const [generatedLesson, setGeneratedLesson] = useState<LessonContent | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  useEffect(() => {
    const loadPaths = async () => {
      try {
        const data = await curriculumService.getAllPaths();
        setPaths(data);
        if (data.length > 0) {
          setSelectedPath(data[0].id);
          setSelectedModule(data[0].levels.beginner.modules[0]?.id || '');
        }
      } catch (err) {
        setError('Failed to load curriculum data');
      } finally {
        setLoading(false);
      }
    };
    loadPaths();
  }, []);

  // Subscribe to progress if in auto mode
  useEffect(() => {
    if (isAutoMode && selectedPath) {
      const unsubscribe = curriculumService.subscribeToGenerationProgress(selectedPath, (p) => {
        setProgress(p);
      });
      return () => unsubscribe();
    }
  }, [isAutoMode, selectedPath]);

  const handlePathChange = (pathId: string) => {
    setSelectedPath(pathId);
    const path = paths.find(p => p.id === pathId);
    if (path) {
      setSelectedModule(path.levels[selectedLevel].modules[0]?.id || '');
    }
    // Reset roadmap and progress when path changes
    setRoadmap(null);
    setProgress(null);
  };

  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedLevel(level);
    const path = paths.find(p => p.id === selectedPath);
    if (path) {
      setSelectedModule(path.levels[level].modules[0]?.id || '');
    }
  };

  const handleGenerate = async () => {
    if (!selectedPath || !selectedModule || !tool) {
      setError('Please fill in all required fields');
      return;
    }

    setGenerating(true);
    setError(null);
    setSuccess(null);
    setGeneratedLesson(null);

    try {
      const path = paths.find(p => p.id === selectedPath);
      const module = path?.levels[selectedLevel].modules.find(m => m.id === selectedModule);
      
      const lesson = await aiService.generateLesson({
        skill: path?.title || selectedPath,
        tool,
        level: selectedLevel,
        module: module?.title || selectedModule,
        lessonNumber,
        totalLessonsInModule: 10, // Default for single gen
        context
      });

      // Add ID and initial status
      const lessonWithId: LessonContent = {
        ...lesson,
        id: `lesson-${Date.now()}`,
        status: 'draft'
      };

      setGeneratedLesson(lessonWithId);
      setSuccess('Lesson generated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate lesson. Please check your GEMINI_API_KEY.');
    } finally {
      setGenerating(false);
    }
  };

  // Auto Mode Functions
  const startAutoGeneration = async () => {
    if (!selectedPath || !tool) {
      setError('Please select a skill and tool');
      return;
    }

    setGenerating(true);
    setError(null);
    generationRef.current = true;
    pauseRef.current = false;

    try {
      // 1. Generate Roadmap if not exists
      let currentRoadmap = await curriculumService.getRoadmap(selectedPath);
      if (!currentRoadmap) {
        setSuccess('Generating Roadmap...');
        const roadmapData = await aiService.generateRoadmap(selectedPath, tool);
        currentRoadmap = {
          id: `roadmap-${selectedPath}`,
          skillId: selectedPath,
          tool,
          modules: roadmapData.modules,
          createdAt: Date.now()
        };
        await curriculumService.saveRoadmap(currentRoadmap);
      }
      setRoadmap(currentRoadmap);

      // 2. Initialize Progress
      let currentProgress = await curriculumService.getGenerationProgress(selectedPath);
      if (!currentProgress || currentProgress.status === 'completed') {
        currentProgress = {
          id: `progress-${selectedPath}`,
          skillId: selectedPath,
          tool,
          status: 'generating_lessons',
          currentModuleIndex: 0,
          currentLessonIndex: 0,
          totalLessons: currentRoadmap.modules.reduce((acc, m) => acc + m.targetCount, 0),
          completedLessons: 0,
          failedLessons: 0,
          errors: [],
          lastUpdated: Date.now()
        };
        await curriculumService.saveGenerationProgress(currentProgress);
      }

      // 3. Start Lesson Generation Loop
      await runGenerationLoop(currentRoadmap, currentProgress);

    } catch (err: any) {
      setError(err.message || 'Auto generation failed');
      setGenerating(false);
    }
  };

  const runGenerationLoop = async (roadmap: Roadmap, initialProgress: GenerationProgress) => {
    let currentProgress = { ...initialProgress };

    for (let mIdx = currentProgress.currentModuleIndex; mIdx < roadmap.modules.length; mIdx++) {
      if (!generationRef.current) break;

      const module = roadmap.modules[mIdx];
      
      for (let lIdx = currentProgress.currentLessonIndex; lIdx < module.targetCount; lIdx++) {
        if (!generationRef.current) break;
        
        // Handle Pause
        while (pauseRef.current) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (!generationRef.current) break;
        }

        try {
          // Generate Lesson
          const lesson = await aiService.generateLesson({
            skill: roadmap.skillId,
            tool: roadmap.tool,
            level: module.level,
            module: module.name,
            lessonNumber: lIdx + 1,
            totalLessonsInModule: module.targetCount,
            context: lIdx > 0 ? `Previously covered lesson ${lIdx} of ${module.name}` : undefined
          });

          const lessonWithId: LessonContent = {
            ...lesson,
            id: `lesson-${roadmap.skillId}-${module.id}-${lIdx + 1}-${Date.now()}`,
            status: 'generated'
          };

          // Save to Firebase as draft
          await curriculumService.saveLesson(lessonWithId);

          // Update Progress
          currentProgress.completedLessons++;
          currentProgress.currentLessonIndex = lIdx + 1;
          currentProgress.lastUpdated = Date.now();
          
          await curriculumService.saveGenerationProgress(currentProgress);
          
        } catch (err: any) {
          currentProgress.failedLessons++;
          currentProgress.errors.push(`Module ${module.name} Lesson ${lIdx + 1}: ${err.message}`);
          await curriculumService.saveGenerationProgress(currentProgress);
          // Continue to next lesson if possible
        }
      }

      if (generationRef.current) {
        currentProgress.currentModuleIndex = mIdx + 1;
        currentProgress.currentLessonIndex = 0;
        await curriculumService.saveGenerationProgress(currentProgress);
      }
    }

    if (generationRef.current) {
      currentProgress.status = 'completed';
      await curriculumService.saveGenerationProgress(currentProgress);
      setSuccess('Full curriculum generation completed!');
    }
    
    setGenerating(false);
    generationRef.current = false;
  };

  const togglePause = async () => {
    pauseRef.current = !pauseRef.current;
    if (progress) {
      await curriculumService.saveGenerationProgress({
        ...progress,
        status: pauseRef.current ? 'paused' : 'generating_lessons'
      });
    }
  };

  const stopGeneration = async () => {
    generationRef.current = false;
    pauseRef.current = false;
    if (progress) {
      await curriculumService.saveGenerationProgress({
        ...progress,
        status: 'idle'
      });
    }
    setGenerating(false);
  };

  const handleSaveDraft = async () => {
    if (!generatedLesson) return;
    setSaving(true);
    try {
      await curriculumService.saveLesson({ ...generatedLesson, status: 'draft' });
      setSuccess('Draft saved successfully!');
    } catch (err) {
      setError('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedLesson) return;
    setSaving(true);
    try {
      const lessonToSave = { ...generatedLesson, status: 'published' as const };
      await curriculumService.saveLesson(lessonToSave);
      await curriculumService.publishLesson(lessonToSave.id, selectedPath, selectedLevel, selectedModule);
      setSuccess('Lesson published live!');
      setGeneratedLesson(lessonToSave);
    } catch (err) {
      setError('Failed to publish lesson');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Loading Curriculum...</p>
      </div>
    );
  }

  const currentPath = paths.find(p => p.id === selectedPath);
  const currentModules = currentPath?.levels[selectedLevel].modules || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Sparkles size={20} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Lesson Generator</h1>
          </div>
          <p className="text-white/40 font-medium">Generate high-quality lessons using AI for your curriculum.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-white/[0.03] border border-white/[0.08] p-1 rounded-2xl">
          <button
            onClick={() => setIsAutoMode(false)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              !isAutoMode ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-white/40 hover:text-white'
            }`}
          >
            Single Mode
          </button>
          <button
            onClick={() => setIsAutoMode(true)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isAutoMode ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-white/40 hover:text-white'
            }`}
          >
            Auto Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
              <Zap size={18} className="text-emerald-500" />
              {isAutoMode ? 'Auto Generation' : 'Configuration'}
            </h3>

            <div className="space-y-4">
              {/* Skill Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Development Skill</label>
                <select 
                  value={selectedPath}
                  onChange={(e) => handlePathChange(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-colors"
                >
                  {paths.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              {/* Tool / Technology */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Tool / Technology</label>
                <input 
                  type="text"
                  value={tool}
                  onChange={(e) => setTool(e.target.value)}
                  placeholder="e.g. React, Python, Docker"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>

              {!isAutoMode && (
                <>
                  {/* Level Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Level</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['beginner', 'intermediate', 'advanced'] as const).map(l => (
                        <button
                          key={l}
                          onClick={() => handleLevelChange(l)}
                          className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                            selectedLevel === l 
                              ? 'bg-emerald-500 text-black' 
                              : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.05]'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Module Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Module</label>
                    <select 
                      value={selectedModule}
                      onChange={(e) => setSelectedModule(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-colors"
                    >
                      {currentModules.map(m => (
                        <option key={m.id} value={m.id}>{m.title}</option>
                      ))}
                      {currentModules.length === 0 && <option value="">No modules found</option>}
                    </select>
                  </div>

                  {/* Lesson Number */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Lesson Number</label>
                    <input 
                      type="number"
                      value={lessonNumber}
                      onChange={(e) => setLessonNumber(parseInt(e.target.value))}
                      min="1"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  {/* Previous Context */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Previous Context (Optional)</label>
                    <textarea 
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Mention what was covered in the previous lesson..."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-emerald-500/50 transition-colors h-24 resize-none"
                    />
                  </div>
                </>
              )}

              {isAutoMode ? (
                <div className="space-y-3">
                  {!generating && (!progress || progress.status === 'idle' || progress.status === 'completed' || progress.status === 'failed') ? (
                    <button
                      onClick={startAutoGeneration}
                      disabled={!tool}
                      className="w-full bg-emerald-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                      <Play size={20} fill="currentColor" />
                      <span>Start Auto Generation</span>
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={togglePause}
                        className="bg-white/[0.05] hover:bg-white/[0.1] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
                      >
                        {progress?.status === 'paused' ? <Play size={20} fill="currentColor" /> : <Pause size={20} fill="currentColor" />}
                        <span>{progress?.status === 'paused' ? 'Resume' : 'Pause'}</span>
                      </button>
                      <button
                        onClick={stopGeneration}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all"
                      >
                        <Square size={20} fill="currentColor" />
                        <span>Stop</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGenerate}
                  disabled={generating || !tool}
                  className="w-full bg-emerald-500 text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>Generate Lesson</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Progress Display (Auto Mode) */}
          {isAutoMode && progress && (
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 space-y-6">
              <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                <RefreshCw size={18} className={`text-emerald-500 ${generating ? 'animate-spin' : ''}`} />
                Progress
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</p>
                    <p className="text-sm font-bold text-emerald-500 uppercase tracking-tight">{progress.status.replace('_', ' ')}</p>
                  </div>
                  <p className="text-2xl font-black tracking-tighter">
                    {Math.round((progress.completedLessons / progress.totalLessons) * 100) || 0}%
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.completedLessons / progress.totalLessons) * 100}%` }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/[0.03] p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Completed</p>
                    <p className="text-xl font-black">{progress.completedLessons}</p>
                  </div>
                  <div className="bg-white/[0.03] p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Failed</p>
                    <p className="text-xl font-black text-red-400">{progress.failedLessons}</p>
                  </div>
                </div>

                {progress.errors.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.05]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2">Recent Errors</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                      {progress.errors.slice(-3).map((err, i) => (
                        <p key={i} className="text-[10px] text-white/30 leading-tight">• {err}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3"
              >
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-red-500">{error}</p>
              </motion.div>
            )}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-emerald-500">{success}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl overflow-hidden flex flex-col min-h-[600px]">
            {/* Preview Header */}
            <div className="bg-white/[0.03] border-b border-white/[0.05] px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    isPreviewMode ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setIsPreviewMode(false)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    !isPreviewMode ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  Raw JSON
                </button>
                {isAutoMode && (
                  <button
                    onClick={() => setIsPreviewMode(true)} // Toggle to roadmap view if needed
                    className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <List size={14} />
                    Roadmap
                  </button>
                )}
              </div>

              {generatedLesson && !isAutoMode && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveDraft}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    Save Draft
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={saving || generatedLesson.status === 'published'}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50 ${
                      generatedLesson.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-500 cursor-default'
                        : 'bg-emerald-500 text-black hover:scale-[1.05]'
                    }`}
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                    {generatedLesson.status === 'published' ? 'Published' : 'Publish Live'}
                  </button>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className="flex-1 p-8 overflow-y-auto max-h-[800px]">
              {isAutoMode && roadmap ? (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tighter">Curriculum Roadmap</h2>
                    <p className="text-white/40 font-medium">Automatically generated roadmap for {roadmap.skillId} using {roadmap.tool}.</p>
                  </div>

                  <div className="space-y-4">
                    {roadmap.modules.map((m, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl flex items-center gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center text-xl font-black shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-black tracking-tight">{m.name}</h4>
                            <Badge className="bg-white/[0.05] text-white/40 text-[8px]">{m.level}</Badge>
                          </div>
                          <p className="text-xs text-white/40 leading-relaxed">{m.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Lessons</p>
                          <p className="text-lg font-black">{m.targetCount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : !generatedLesson ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center">
                    <BookOpen size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight">No Lesson Generated</p>
                    <p className="text-sm font-medium">Configure and click generate to see the magic.</p>
                  </div>
                </div>
              ) : isPreviewMode ? (
                <div className="space-y-12">
                  {/* Lesson Title & Status */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Badge className={generatedLesson.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}>
                        {generatedLesson.status?.toUpperCase()}
                      </Badge>
                      <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">
                        {selectedLevel} • {tool}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black tracking-tighter leading-tight">{generatedLesson.title}</h2>
                  </div>

                  {/* Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Target size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Objective</span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{generatedLesson.todayYouAreLearning}</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl space-y-3">
                      <div className="flex items-center gap-2 text-blue-500">
                        <HelpCircle size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Why It Matters</span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{generatedLesson.whyItMatters}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section className="space-y-4">
                      <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <BookOpen size={20} className="text-emerald-500" />
                        Explanation
                      </h4>
                      <div className="prose prose-invert max-w-none text-white/70">
                        <Markdown>{generatedLesson.explanation}</Markdown>
                      </div>
                    </section>

                    <section className="bg-emerald-500/[0.03] border border-emerald-500/10 p-8 rounded-3xl space-y-4">
                      <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <Lightbulb size={20} className="text-emerald-500" />
                        The Analogy
                      </h4>
                      <p className="text-white/80 italic leading-relaxed">"{generatedLesson.analogy}"</p>
                    </section>

                    {generatedLesson.codeExample && (
                      <section className="space-y-4">
                        <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Code size={20} className="text-emerald-500" />
                          Code Example
                        </h4>
                        <div className="bg-black/40 rounded-2xl p-6 font-mono text-sm border border-white/[0.05]">
                          <pre className="text-emerald-400 overflow-x-auto">
                            <code>{generatedLesson.codeExample}</code>
                          </pre>
                        </div>
                        <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05] space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Line by Line</span>
                          <p className="text-sm text-white/60">{generatedLesson.lineByLine}</p>
                        </div>
                      </section>
                    )}

                    <section className="space-y-4">
                      <h4 className="text-lg font-black tracking-tight text-red-400 flex items-center gap-2">
                        <AlertCircle size={20} />
                        Common Mistakes
                      </h4>
                      <ul className="space-y-2">
                        {generatedLesson.commonMistakes.map((m, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                            <span className="w-5 h-5 rounded-full bg-red-400/10 flex items-center justify-center text-red-400 text-[10px] font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <section className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl space-y-4">
                        <h4 className="text-sm font-black tracking-tight uppercase tracking-[0.2em] text-emerald-500">Practice Task</h4>
                        <p className="text-sm text-white/70">{generatedLesson.practice}</p>
                      </section>
                      <section className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl space-y-4">
                        <h4 className="text-sm font-black tracking-tight uppercase tracking-[0.2em] text-blue-500">Mini Challenge</h4>
                        <p className="text-sm text-white/70">{generatedLesson.challenge}</p>
                      </section>
                    </div>

                    <section className="bg-white/[0.03] border border-white/[0.08] p-8 rounded-3xl space-y-6">
                      <h4 className="text-lg font-black tracking-tight flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-emerald-500" />
                        Quiz Check
                      </h4>
                      <div className="space-y-6">
                        {generatedLesson.quiz.map((q, i) => (
                          <div key={i} className="space-y-3">
                            <p className="text-sm font-bold">{q.question}</p>
                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((opt, optIdx) => (
                                <div 
                                  key={optIdx}
                                  className={`p-3 rounded-xl border text-xs font-medium ${
                                    optIdx === q.correctIndex 
                                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                                      : 'bg-white/[0.02] border-white/[0.05] text-white/40'
                                  }`}
                                >
                                  {opt}
                                </div>
                              ))}
                            </div>
                            <p className="text-[10px] text-white/30 italic">Explanation: {q.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="bg-black/40 rounded-2xl p-8 font-mono text-xs border border-white/[0.05] h-full overflow-y-auto">
                  <pre className="text-emerald-400/80">
                    <code>{JSON.stringify(generatedLesson, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
