import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wand2, 
  Sparkles, 
  Save, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight,
  Code2,
  BookOpen,
  Plus,
  Settings2,
  Play,
  Pause,
  Square,
  RefreshCcw,
  ListOrdered,
  Layers,
  Zap
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { 
  generateLesson, 
  GeneratedLesson, 
  saveLesson, 
  getSkillById, 
  getModuleById,
  generateRoadmap,
  getRoadmap,
  CurriculumRoadmap,
  GenerationProgress,
  updateGenerationProgress,
  getGenerationProgress,
  getDraftLessons,
  publishLesson
} from '../../services/adminService';
import { TECH_TOOLS } from '../../constants/techStack';
import ReactMarkdown from 'react-markdown';

const SKILLS = [
  'Frontend Development',
  'Backend Development',
  'Full-Stack Development',
  'Mobile App Development',
  'Data Analyst',
  'AI Engineer',
  'Cybersecurity',
  'DevOps Engineer',
  'UI/UX Design',
  'Blockchain/Web3 Development',
  'Game Development',
  'AR/VR Development',
  'Embedded Systems (IoT)',
  'Product Design',
  'Interaction Design',
  'Web3 Developer',
  'AI Automation Engineer',
  'Prompt Engineer',
  'Robotics Engineer'
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const AdminLessonGenerator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'single' | 'module' | 'full'>('single');
  const [skill, setSkill] = useState(SKILLS[0]);
  const [tool, setTool] = useState('');
  const [level, setLevel] = useState(LEVELS[0]);
  const [module, setModule] = useState('');
  const [lessonNumber, setLessonNumber] = useState(1);
  const [context, setContext] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<GeneratedLesson | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'saving' | 'saved' | 'timeout'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-generation state
  const [roadmap, setRoadmap] = useState<CurriculumRoadmap | null>(null);
  const [progress, setProgress] = useState<GenerationProgress | null>(null);
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldStop, setShouldStop] = useState(false);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(null);
  const [drafts, setDrafts] = useState<(GeneratedLesson & { id: string })[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);

  const isPausedRef = useRef(false);
  const shouldStopRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    shouldStopRef.current = shouldStop;
  }, [shouldStop]);

  useEffect(() => {
    const skillId = searchParams.get('skill');
    const moduleId = searchParams.get('module');
    const lessonId = searchParams.get('lesson');

    if (skillId) {
      getSkillById(skillId).then(s => {
        if (s) setSkill(s.name);
      });
      getRoadmap(skillId).then(r => setRoadmap(r));
      getGenerationProgress(skillId).then(p => setProgress(p));
    }

    if (skillId && moduleId) {
      getModuleById(skillId, moduleId).then(m => {
        if (m) setModule(m.title);
      });
    }
  }, [searchParams]);

  const handleGenerateRoadmap = async () => {
    console.log('AdminLessonGenerator: Starting roadmap generation for', skill);
    setIsGenerating(true);
    setStatus('idle');
    setErrorMessage(null);
    
    const timeoutId = setTimeout(() => {
      if (isGenerating) {
        console.error('AdminLessonGenerator: Roadmap generation timed out after 60s');
        setIsGenerating(false);
        setStatus('timeout');
        setErrorMessage('Roadmap generation took too long. Please try again.');
      }
    }, 60000);

    try {
      const r = await generateRoadmap(skill);
      console.log('AdminLessonGenerator: Roadmap generated successfully.');
      setRoadmap(r);
      setStatus('success');
      
      const initialProgress: GenerationProgress = {
        skill: skill,
        totalLessons: r.totalLessons,
        completedLessons: 0,
        status: 'idle',
        currentModuleIndex: 0,
        currentLessonNumber: 1
      };
      await updateGenerationProgress(skill, initialProgress);
      setProgress(initialProgress);
    } catch (error: any) {
      console.error('AdminLessonGenerator: Roadmap generation failed:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to generate roadmap.');
    } finally {
      clearTimeout(timeoutId);
      setIsGenerating(false);
      console.log('AdminLessonGenerator: Roadmap generation process finished.');
    }
  };

  const handleReviewDrafts = async () => {
    const skillId = skill.toLowerCase().replace(/\s+/g, '-');
    const lessons = await getDraftLessons(skillId);
    setDrafts(lessons);
    setIsReviewing(true);
  };

  const handlePublish = async (lessonId: string) => {
    await publishLesson(lessonId);
    setDrafts(prev => prev.filter(d => d.id !== lessonId));
  };

  const startAutoGeneration = async () => {
    if (!roadmap) {
      console.error('AdminLessonGenerator: Cannot start auto-generation without a roadmap.');
      return;
    }
    
    console.log('AdminLessonGenerator: Starting full auto-generation...');
    setIsAutoGenerating(true);
    setIsPaused(false);
    setShouldStop(false);
    isPausedRef.current = false;
    shouldStopRef.current = false;
    setErrorMessage(null);

    const skillId = skill.toLowerCase().replace(/\s+/g, '-');
    let currentProgress = progress || {
      skill: skill,
      totalLessons: roadmap.totalLessons,
      completedLessons: 0,
      status: 'generating',
      currentModuleIndex: mode === 'module' && selectedModuleIndex !== null ? selectedModuleIndex : 0,
      currentLessonNumber: mode === 'module' && selectedModuleIndex !== null ? roadmap.modules[selectedModuleIndex].lessonStart : 1
    };

    if (mode === 'module' && selectedModuleIndex !== null) {
      currentProgress = {
        ...currentProgress,
        currentModuleIndex: selectedModuleIndex,
        currentLessonNumber: roadmap.modules[selectedModuleIndex].lessonStart
      };
    }

    await updateGenerationProgress(skill, { ...currentProgress, status: 'generating' });

    try {
      const startMIdx = currentProgress.currentModuleIndex;
      const endMIdx = mode === 'module' && selectedModuleIndex !== null ? selectedModuleIndex : roadmap.modules.length - 1;

      for (let mIdx = startMIdx; mIdx <= endMIdx; mIdx++) {
        const module = roadmap.modules[mIdx];
        const start = mIdx === startMIdx ? currentProgress.currentLessonNumber : module.lessonStart;
        const moduleId = module.name.toLowerCase().replace(/\s+/g, '-');

        console.log(`AdminLessonGenerator: Processing module: ${module.name}`);

        for (let lNum = start; lNum <= module.lessonEnd; lNum++) {
          if (shouldStopRef.current) {
            console.log('AdminLessonGenerator: Auto-generation stopped by user.');
            await updateGenerationProgress(skill, { status: 'idle' });
            setIsAutoGenerating(false);
            return;
          }

          while (isPausedRef.current) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (shouldStopRef.current) {
              await updateGenerationProgress(skill, { status: 'idle' });
              setIsAutoGenerating(false);
              return;
            }
          }

          console.log(`AdminLessonGenerator: Generating lesson ${lNum} of ${roadmap.totalLessons}...`);
          
          // Individual lesson timeout protection
          const lessonTimeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Lesson ${lNum} generation timed out`)), 60000)
          );

          try {
            const lessonPromise = generateLesson(
              skill,
              tool || skill,
              module.level,
              module.name,
              lNum,
              `Previous topics: ${module.topics.join(', ')}`
            );

            const lesson = await Promise.race([lessonPromise, lessonTimeoutPromise]) as GeneratedLesson;
            
            const validatedLesson = validateLesson(lesson);
            if (!validatedLesson) {
              throw new Error(`Lesson ${lNum} was malformed`);
            }

            // Save as draft
            await saveLesson(skillId, moduleId, {
              ...validatedLesson,
              skillId,
              moduleId,
              status: 'draft',
              order: lNum,
              createdAt: Date.now(),
              updatedAt: Date.now()
            });

            // Update progress
            currentProgress = {
              ...currentProgress,
              completedLessons: currentProgress.completedLessons + 1,
              currentModuleIndex: mIdx,
              currentLessonNumber: lNum + 1 > module.lessonEnd ? (mIdx + 1 <= endMIdx ? roadmap.modules[mIdx + 1].lessonStart : lNum) : lNum + 1
            };
            setProgress(currentProgress);
            await updateGenerationProgress(skill, currentProgress);
            
            console.log(`AdminLessonGenerator: Lesson ${lNum} generated and saved.`);
          } catch (err: any) {
            console.error(`AdminLessonGenerator: Failed to generate lesson ${lNum}:`, err);
            if (err.message?.includes('quota') || err.message?.includes('API key')) {
              throw err; // Critical error, stop auto-generation
            }
            // For other errors, we might want to continue or retry?
            // For now, let's just log and continue to next lesson
          }
        }
      }
      console.log('AdminLessonGenerator: Full auto-generation completed successfully.');
      await updateGenerationProgress(skill, { status: 'completed' });
    } catch (error: any) {
      console.error('AdminLessonGenerator: Auto-generation failed:', error);
      setErrorMessage(error.message || 'Auto-generation failed. Please check logs.');
      await updateGenerationProgress(skill, { status: 'error', error: String(error) });
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const validateLesson = (lesson: any): GeneratedLesson | null => {
    console.log('AdminLessonGenerator: Validating lesson object...', lesson);
    const requiredFields = [
      'title',
      'objective',
      'explanation',
      'whyItMatters',
      'analogy',
      'stepByStep',
      'practiceTask',
      'quiz'
    ];

    const missingFields = requiredFields.filter(field => !lesson[field]);
    
    if (missingFields.length > 0) {
      console.error('AdminLessonGenerator: Validation failed. Missing fields:', missingFields);
      return null;
    }

    // Ensure quiz has required structure
    if (!Array.isArray(lesson.quiz) || lesson.quiz.length === 0) {
      console.error('AdminLessonGenerator: Validation failed. Quiz is missing or empty.');
      return null;
    }

    // Apply safe defaults for optional fields
    return {
      ...lesson,
      visualExplanation: lesson.visualExplanation || 'No visual description provided.',
      commonMistakes: Array.isArray(lesson.commonMistakes) ? lesson.commonMistakes : [],
      miniChallenge: lesson.miniChallenge || 'Try to apply what you learned in a new context.',
      reflectionQuestion: lesson.reflectionQuestion || 'How can you use this in your next project?',
      stepByStep: Array.isArray(lesson.stepByStep) ? lesson.stepByStep : []
    };
  };

  const handleGenerate = async () => {
    console.log('AdminLessonGenerator: Starting single lesson generation for:', { skill, tool, level, module, lessonNumber });
    setIsGenerating(true);
    setStatus('idle');
    setErrorMessage(null);
    setGeneratedLesson(null);
    
    const timeoutId = setTimeout(() => {
      if (isGenerating) {
        console.error('AdminLessonGenerator: Generation timed out after 60s');
        setIsGenerating(false);
        setStatus('timeout');
        setErrorMessage('Lesson generation took too long. The AI might be overloaded. Please try again.');
      }
    }, 60000);

    try {
      const lesson = await generateLesson(skill, tool, level, module, lessonNumber, context);
      console.log('AdminLessonGenerator: AI response received.');
      
      const validatedLesson = validateLesson(lesson);
      if (validatedLesson) {
        console.log('AdminLessonGenerator: Lesson validated and ready for preview.');
        setGeneratedLesson(validatedLesson);
        setStatus('success');
      } else {
        console.error('AdminLessonGenerator: Generated lesson was malformed.');
        setStatus('error');
        setErrorMessage('The AI generated a malformed lesson. Please try again.');
      }
    } catch (error: any) {
      console.error('AdminLessonGenerator: Generation failed with error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred during generation.');
    } finally {
      clearTimeout(timeoutId);
      setIsGenerating(false);
      console.log('AdminLessonGenerator: Generation process finished.');
    }
  };

  const handleSave = async (publish: boolean = false) => {
    if (!generatedLesson) {
      console.error('AdminLessonGenerator: Cannot save. No lesson generated.');
      return;
    }
    
    console.log(`AdminLessonGenerator: ${publish ? 'Publishing' : 'Saving'} lesson...`);
    setIsSaving(true);
    setStatus('saving');
    setErrorMessage(null);

    try {
      const skillId = searchParams.get('skill') || skill.toLowerCase().replace(/\s+/g, '-');
      const moduleId = searchParams.get('module') || module.toLowerCase().replace(/\s+/g, '-');
      
      const lessonToSave = {
        ...generatedLesson,
        skillId,
        moduleId,
        tool,
        level,
        status: publish ? 'published' : 'draft',
        order: lessonNumber,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await saveLesson(skillId, moduleId, lessonToSave);
      
      console.log(`AdminLessonGenerator: Lesson ${publish ? 'published' : 'saved'} successfully.`);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 3000);
      
      alert(publish ? 'Lesson published live!' : 'Lesson saved as draft!');
    } catch (error: any) {
      console.error('AdminLessonGenerator: Save failed:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to save the lesson. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lesson Auto-Generator</h1>
            <p className="text-gray-400 mt-2">Create high-quality curriculum content using AI.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setGeneratedLesson(null)}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              title="Clear all"
            >
              <Trash2 size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <Settings2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Mode Selection */}
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-2 flex gap-1">
              {[
                { id: 'single', label: 'Single', icon: Wand2 },
                { id: 'module', label: 'Module', icon: Layers },
                { id: 'full', label: 'Full Auto', icon: Zap }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    mode === m.id ? 'bg-green-500 text-black' : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <m.icon size={14} />
                  {m.label}
                </button>
              ))}
            </div>

            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings2 className="text-green-400" size={20} />
                Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Development Skill</label>
                  <select 
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                  >
                    {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {mode === 'single' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Tool / Technology</label>
                      <input 
                        type="text"
                        value={tool}
                        onChange={(e) => setTool(e.target.value)}
                        placeholder="e.g. React, Docker, Figma"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Level</label>
                        <select 
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                        >
                          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Lesson #</label>
                        <input 
                          type="number"
                          value={lessonNumber}
                          onChange={(e) => setLessonNumber(parseInt(e.target.value))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Module Name</label>
                      <input 
                        type="text"
                        value={module}
                        onChange={(e) => setModule(e.target.value)}
                        placeholder="e.g. Advanced State Management"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Previous Context (Optional)</label>
                      <textarea 
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="What did the user learn just before this?"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all resize-none"
                      />
                    </div>
                  </>
                )}

                {(mode === 'module' || mode === 'full') && (
                  <div className="space-y-4">
                    {!roadmap ? (
                      <button
                        onClick={handleGenerateRoadmap}
                        disabled={isGenerating}
                        className="w-full py-4 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-400 transition-all disabled:opacity-50"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <RefreshCcw size={20} />}
                        Generate Roadmap
                      </button>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Roadmap Ready</span>
                            <button onClick={() => setRoadmap(null)} className="text-[10px] text-blue-400 hover:underline">Re-generate</button>
                          </div>
                          <p className="text-sm font-bold">{roadmap.totalLessons} Lessons • {roadmap.modules.length} Modules</p>
                        </div>

                        {progress && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                              <span className="text-gray-400">Generation Progress</span>
                              <span className="text-green-400">{Math.round((progress.completedLessons / progress.totalLessons) * 100)}%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 transition-all duration-500"
                                style={{ width: `${(progress.completedLessons / progress.totalLessons) * 100}%` }}
                              />
                            </div>
                            <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">
                              {progress.completedLessons} / {progress.totalLessons} Lessons Generated
                            </p>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          {!isAutoGenerating ? (
                            <>
                              <button
                                onClick={startAutoGeneration}
                                disabled={mode === 'module' && selectedModuleIndex === null}
                                className="flex-1 py-3 rounded-xl bg-green-500 text-black font-bold flex items-center justify-center gap-2 hover:bg-green-400 transition-all disabled:opacity-50"
                              >
                                <Play size={16} fill="currentColor" />
                                {mode === 'module' ? 'Start Module' : 'Start Auto'}
                              </button>
                              <button
                                onClick={handleReviewDrafts}
                                className="flex-1 py-3 rounded-xl bg-white/5 text-white border border-white/10 font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                              >
                                <Eye size={16} />
                                Review Drafts
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => setIsPaused(!isPaused)}
                                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                  isPaused ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white'
                                }`}
                              >
                                {isPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
                                {isPaused ? 'Resume' : 'Pause'}
                              </button>
                              <button
                                onClick={() => setShouldStop(true)}
                                className="flex-1 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
                              >
                                <Square size={16} fill="currentColor" />
                                Stop
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {mode === 'single' && (
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !tool || !module}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isGenerating 
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-500 text-black hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generating Lesson...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Lesson
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Roadmap Preview */}
            {roadmap && (
              <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <ListOrdered size={18} className="text-blue-400" />
                  Curriculum Roadmap
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {roadmap.modules.map((m, i) => (
                    <div 
                      key={i} 
                      onClick={() => mode === 'module' && setSelectedModuleIndex(i)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        selectedModuleIndex === i && mode === 'module' 
                          ? 'bg-blue-500/10 border-blue-500/50' 
                          : 'bg-white/5 border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{m.level}</span>
                        <span className="text-[10px] text-gray-500">{m.lessonStart}-{m.lessonEnd}</span>
                      </div>
                      <h4 className="text-sm font-bold">{m.name}</h4>
                      <div className="flex flex-wrap gap-1">
                        {m.topics.slice(0, 3).map(t => (
                          <span key={t} className="text-[8px] px-1.5 py-0.5 bg-white/10 rounded-md text-gray-400">{t}</span>
                        ))}
                        {m.topics.length > 3 && <span className="text-[8px] text-gray-500">+{m.topics.length - 3} more</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Checklist */}
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold mb-4">Quality Standards</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  Comprehensive explanations
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  Real-world analogies included
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  Interactive quiz components
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  Progressive difficulty matching
                </li>
              </ul>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#121214] border border-white/5 rounded-2xl min-h-[600px] flex flex-col overflow-hidden">
              {/* Toolbar */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300">
                    <Eye size={14} />
                    Preview Mode
                  </div>
                  {(status === 'success' || status === 'saved') && (
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      {status === 'saved' ? 'Saved successfully' : 'Ready to publish'}
                    </span>
                  )}
                  {status === 'saving' && (
                    <span className="text-xs text-blue-400 flex items-center gap-1">
                      <Loader2 className="animate-spin" size={14} />
                      Saving...
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    disabled={!generatedLesson || isSaving}
                    onClick={() => handleSave(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={16} />
                    Save Draft
                  </button>
                  <button 
                    disabled={!generatedLesson || isSaving}
                    onClick={() => handleSave(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black hover:bg-green-400 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Publish Live
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Crafting your lesson...</h3>
                        <p className="text-gray-400 mt-1">Our AI is building a high-quality educational experience.</p>
                      </div>
                    </motion.div>
                  ) : status === 'error' || status === 'timeout' ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-6 p-12"
                    >
                      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                        <AlertCircle size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                          {status === 'timeout' ? 'Generation Timed Out' : 'Generation Failed'}
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          {errorMessage || 'Something went wrong while generating the lesson content. Please try again.'}
                        </p>
                      </div>
                      <button 
                        onClick={handleGenerate}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center gap-2"
                      >
                        <RefreshCcw size={18} />
                        Retry Generation
                      </button>
                    </motion.div>
                  ) : generatedLesson ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-12"
                    >
                      {/* Lesson Content */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <span className="text-green-400 text-sm font-bold tracking-wider uppercase">Lesson {lessonNumber}</span>
                          <h2 className="text-4xl font-bold">{generatedLesson.title}</h2>
                        </div>

                        <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                          <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} />
                            Learning Objective
                          </h4>
                          <p className="text-gray-200">{generatedLesson.objective}</p>
                        </div>

                        <div className="prose prose-invert max-w-none">
                          <h3 className="text-2xl font-bold mb-4">Simple Explanation</h3>
                          <div className="text-gray-300 leading-relaxed text-lg">
                            <ReactMarkdown>{generatedLesson.explanation}</ReactMarkdown>
                          </div>
                          
                          <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <h4 className="font-bold text-blue-400 mb-2">Why It Matters</h4>
                            <p className="text-gray-300 italic">{generatedLesson.whyItMatters}</p>
                          </div>

                          <h3 className="text-2xl font-bold mb-4">Real-world Analogy</h3>
                          <p className="text-gray-300 leading-relaxed">{generatedLesson.analogy}</p>

                          <h3 className="text-2xl font-bold mt-12 mb-6">Step-by-Step Breakdown</h3>
                          <div className="space-y-4">
                            {generatedLesson.stepByStep.map((step, i) => (
                              <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center font-bold shrink-0">
                                  {i + 1}
                                </div>
                                <p className="text-gray-300">{step}</p>
                              </div>
                            ))}
                          </div>

                          {generatedLesson.codeExample && (
                            <div className="mt-12 space-y-4">
                              <h3 className="text-2xl font-bold">Code Example</h3>
                              <div className="bg-[#0A0A0B] rounded-2xl border border-white/10 overflow-hidden">
                                <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                                  <span className="text-xs font-mono text-gray-400 uppercase">{generatedLesson.codeExample.language}</span>
                                  <Code2 size={14} className="text-gray-400" />
                                </div>
                                <pre className="p-6 overflow-x-auto font-mono text-sm text-green-400">
                                  <code>{generatedLesson.codeExample.code}</code>
                                </pre>
                              </div>
                              <p className="text-sm text-gray-400 italic">{generatedLesson.codeExample.explanation}</p>
                            </div>
                          )}

                          <h3 className="text-2xl font-bold mt-12 mb-4">Visual Explanation</h3>
                          <div className="p-6 bg-white/5 border border-dashed border-white/20 rounded-2xl text-center">
                            <p className="text-gray-400 italic">{generatedLesson.visualExplanation}</p>
                          </div>

                          <h3 className="text-2xl font-bold mt-12 mb-4">Common Mistakes</h3>
                          <ul className="space-y-3">
                            {generatedLesson.commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex items-start gap-3 text-red-400">
                                <AlertCircle size={18} className="shrink-0 mt-1" />
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                              <h4 className="font-bold text-purple-400 mb-2">Practice Task</h4>
                              <p className="text-gray-300 text-sm">{generatedLesson.practiceTask}</p>
                            </div>
                            <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                              <h4 className="font-bold text-yellow-400 mb-2">Mini Challenge</h4>
                              <p className="text-gray-300 text-sm">{generatedLesson.miniChallenge}</p>
                            </div>
                          </div>

                          <div className="mt-12 pt-12 border-t border-white/5">
                            <h3 className="text-2xl font-bold mb-8">Knowledge Check</h3>
                            <div className="space-y-8">
                              {generatedLesson.quiz.map((q, qIdx) => (
                                <div key={qIdx} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                                  <h4 className="font-bold text-lg">{qIdx + 1}. {q.question}</h4>
                                  <div className="grid grid-cols-1 gap-3">
                                    {q.options.map((opt, oIdx) => (
                                      <div 
                                        key={oIdx} 
                                        className={`p-4 rounded-xl border text-sm transition-all ${
                                          oIdx === q.correctAnswer 
                                            ? 'bg-green-500/10 border-green-500/50 text-green-400' 
                                            : 'bg-white/5 border-white/5 text-gray-400'
                                        }`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span>{opt}</span>
                                          {oIdx === q.correctAnswer && <CheckCircle2 size={16} />}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400">
                                    <strong>Explanation:</strong> {q.explanation}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
                            <h4 className="font-bold text-gray-400 mb-2">Reflection Question</h4>
                            <p className="text-gray-200 text-lg">{generatedLesson.reflectionQuestion}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500"
                    >
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                        <BookOpen size={40} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-300">No Lesson Preview</h3>
                        <p className="max-w-xs mx-auto">Select a skill and module, then click "Generate Lesson" to begin crafting your curriculum.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Review Modal */}
        <AnimatePresence>
          {isReviewing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#121214] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Review Generated Drafts</h2>
                  <button onClick={() => setIsReviewing(false)} className="p-2 hover:bg-white/5 rounded-lg">
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {drafts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No drafts found for this skill.</div>
                  ) : (
                    drafts.map((draft) => (
                      <div key={draft.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg">{draft.title}</h3>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setGeneratedLesson(draft);
                                setIsReviewing(false);
                              }}
                              className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500/20"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => handlePublish(draft.id)}
                              className="px-3 py-1.5 bg-green-500 text-black rounded-lg text-xs font-bold hover:bg-green-400"
                            >
                              Publish
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{draft.objective}</p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};
