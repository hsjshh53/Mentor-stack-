import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Save, 
  Eye, 
  ChevronRight, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  BookOpen,
  Code2,
  Lightbulb,
  Target,
  History,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateLesson } from '../lib/gemini';
import { saveGeneratedLesson, updateSkillStatus, getSkillStatuses } from '../services/curriculumService';
import { LessonContent } from '../types';

const SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 
  'Python', 'UI/UX Design', 'Git & GitHub', 'Firebase', 'APIs'
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const InternalLessonGenerator: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0]);
  const [lessonNumber, setLessonNumber] = useState(1);
  const [previousContext, setPreviousContext] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<LessonContent | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [skillStatuses, setSkillStatuses] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchStatuses = async () => {
      const statuses = await getSkillStatuses();
      setSkillStatuses(statuses);
    };
    fetchStatuses();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatus(null);
    try {
      const lesson = await generateLesson(selectedSkill, selectedLevel, lessonNumber, previousContext);
      if (lesson) {
        setGeneratedLesson(lesson);
        setPreviewMode(true);
      } else {
        setStatus({ type: 'error', message: 'Failed to generate lesson content.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred during generation.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedLesson) return;
    setIsSaving(true);
    try {
      await saveGeneratedLesson(selectedSkill, selectedLevel, lessonNumber, generatedLesson);
      setStatus({ type: 'success', message: 'Lesson saved successfully to curriculum!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save lesson.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStatus = async (skill: string, newStatus: 'coming-soon' | 'in-progress' | 'completed') => {
    try {
      await updateSkillStatus(skill, newStatus);
      const updated = await getSkillStatuses();
      setSkillStatuses(updated);
      setStatus({ type: 'success', message: `${skill} status updated to ${newStatus}` });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update skill status.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-6 pb-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              to="/dashboard"
              className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white"
            >
              <LayoutDashboard className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Internal Curriculum Tool
              </h1>
              <p className="text-gray-400 mt-1">Generate and manage MentorStack lessons</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setPreviewMode(!previewMode)}
              disabled={!generatedLesson}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50"
            >
              {previewMode ? <Settings className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {previewMode ? 'Edit Config' : 'Preview Lesson'}
            </button>
            <button 
              onClick={handleSave}
              disabled={!generatedLesson || isSaving}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Lesson
            </button>
          </div>
        </header>

        {status && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl border flex items-center gap-3 ${
              status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {status.message}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Config Panel */}
          <div className={`space-y-8 ${previewMode ? 'hidden lg:block' : ''}`}>
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" />
                Lesson Config
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Skill</label>
                  <select 
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50"
                  >
                    {SKILLS.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Level</label>
                  <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50"
                  >
                    {LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Lesson Number</label>
                  <input 
                    type="number"
                    value={lessonNumber}
                    onChange={(e) => setLessonNumber(parseInt(e.target.value))}
                    min="1"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Previous Context (Optional)</label>
                  <textarea 
                    value={previousContext}
                    onChange={(e) => setPreviousContext(e.target.value)}
                    placeholder="Briefly describe what was taught in the last lesson..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 h-24 focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {isGenerating ? 'Generating...' : 'Generate AI Lesson'}
                </button>
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                Skill Status
              </h2>
              <div className="space-y-3">
                {SKILLS.map(skill => {
                  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
                  const currentStatus = skillStatuses[skillId]?.status || 'coming-soon';
                  
                  return (
                    <div key={skill} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5">
                      <span className="text-sm font-medium">{skill}</span>
                      <select 
                        value={currentStatus}
                        onChange={(e) => handleUpdateStatus(skill, e.target.value as any)}
                        className="bg-transparent text-xs text-emerald-400 focus:outline-none"
                      >
                        <option value="coming-soon">Coming Soon</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {previewMode && generatedLesson ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                    <div className="flex items-center gap-3 text-emerald-400 mb-4">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm font-bold tracking-widest uppercase">Lesson Preview</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-6">{generatedLesson.title}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="flex items-center gap-2 text-emerald-400 mb-3">
                          <Target className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">Objective</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{generatedLesson.todayYouAreLearning}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                        <div className="flex items-center gap-2 text-cyan-400 mb-3">
                          <Lightbulb className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">Why it Matters</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{generatedLesson.whyItMatters}</p>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-8">
                      <section>
                        <h3 className="text-xl font-bold mb-4 text-white">Explanation</h3>
                        <p className="text-gray-400 leading-relaxed">{generatedLesson.explanation}</p>
                      </section>

                      <section className="p-6 rounded-2xl bg-white/5 border border-white/10 italic text-gray-400">
                        <span className="block text-xs font-bold text-emerald-400 uppercase not-italic mb-2">Analogy</span>
                        "{generatedLesson.analogy}"
                      </section>

                      {generatedLesson.codeExample && (
                        <section>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                              <Code2 className="w-5 h-5 text-emerald-400" />
                              Code Example
                            </h3>
                          </div>
                          <pre className="p-6 rounded-2xl bg-black/60 border border-white/10 overflow-x-auto">
                            <code className="text-emerald-400 font-mono text-sm">{generatedLesson.codeExample}</code>
                          </pre>
                        </section>
                      )}

                      <section>
                        <h3 className="text-xl font-bold mb-4 text-white">Step-by-Step</h3>
                        <div className="space-y-4">
                          {generatedLesson.stepByStep?.split('\n').map((step, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </span>
                              <p className="text-gray-300 text-sm">{step.replace(/^\d+\.\s*/, '')}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[600px] flex flex-col items-center justify-center text-center p-10 bg-white/5 border border-white/10 border-dashed rounded-3xl"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Sparkles className="w-10 h-10 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-400">No Lesson Generated</h3>
                  <p className="text-gray-500 mt-2 max-w-sm">
                    Configure the lesson details on the left and click generate to see the AI-powered curriculum content.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
