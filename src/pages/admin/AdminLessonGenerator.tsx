import React, { useState } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Eye, 
  Save, 
  RefreshCcw, 
  CheckCircle2,
  BookOpen,
  Layout,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { ref, set } from 'firebase/database';
import { db } from '../../lib/firebase';
import { CURRICULUM } from '../../constants/curriculum';
import { LessonContent } from '../../types';
import Markdown from 'react-markdown';

export const AdminLessonGenerator: React.FC = () => {
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('beginner');
  const [lessonNumber, setLessonNumber] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [generatedLesson, setGeneratedLesson] = useState<LessonContent | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const generateLesson = async () => {
    if (!skill) return;
    setGenerating(true);
    setGeneratedLesson(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const prompt = `
        Generate a comprehensive, high-quality educational lesson for a platform called MentorStack.
        
        Skill: ${skill}
        Level: ${level}
        Lesson Number: ${lessonNumber}
        
        The lesson must follow this exact JSON structure:
        {
          "id": "slug-id-here",
          "title": "Engaging Title",
          "todayYouAreLearning": "One sentence summary of the learning objective",
          "whyItMatters": "One sentence explaining the real-world importance",
          "explanation": "Detailed explanation in Markdown format. Use clear headings, bullet points, and bold text for emphasis. Make it professional yet accessible.",
          "analogy": "A relatable real-world analogy to explain the concept",
          "codeExample": "A clear, concise code example relevant to the lesson",
          "lineByLine": "A brief explanation of what the code example does",
          "commonMistakes": ["Mistake 1", "Mistake 2", "Mistake 3"],
          "practice": "A small task for the student to try immediately",
          "challenge": "A more complex challenge to test their understanding",
          "quiz": [
            {
              "question": "Question text",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctIndex": 0,
              "explanation": "Why this answer is correct"
            },
            {
              "question": "Another question",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctIndex": 1,
              "explanation": "Why this answer is correct"
            }
          ],
          "recap": "A final summary sentence"
        }
        
        Return ONLY the JSON.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const lessonData = JSON.parse(response.text || '{}');
      setGeneratedLesson(lessonData);
    } catch (error) {
      console.error('Error generating lesson:', error);
      alert('Failed to generate lesson. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedLesson) return;
    setSaving(true);
    try {
      await set(ref(db, `lessons/${generatedLesson.id}`), generatedLesson);
      alert('Lesson saved to curriculum successfully!');
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-blue-400" />
          AI Lesson Generator
        </h1>
        <p className="text-gray-400">Use Gemini to automatically generate high-quality curriculum content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Select Skill</label>
              <select 
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-white"
              >
                <option value="" className="bg-[#111111]">Choose a skill...</option>
                {Object.keys(CURRICULUM).map(key => (
                  <option key={key} value={key} className="bg-[#111111]">{CURRICULUM[key as any].title}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Level</label>
              <div className="grid grid-cols-2 gap-2">
                {['beginner', 'intermediate', 'advanced', 'expert'].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${level === l ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lesson Number</label>
              <input 
                type="number" 
                min="1"
                value={lessonNumber}
                onChange={(e) => setLessonNumber(parseInt(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all text-white"
              />
            </div>

            <button
              onClick={generateLesson}
              disabled={generating || !skill}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
            >
              {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              {generating ? 'Generating Content...' : 'Generate Lesson'}
            </button>
          </div>

          {generatedLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-green-500/10 border border-green-500/20 backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle2 className="w-6 h-6" />
                <h3 className="font-bold">Generation Complete</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The lesson "{generatedLesson.title}" has been generated and is ready for review.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save to DB
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <div className="h-full min-h-[600px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold">Lesson Preview</h2>
              </div>
              {generatedLesson && (
                <span className="text-xs font-mono text-gray-500">ID: {generatedLesson.id}</span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {generatedLesson ? (
                <div className="max-w-2xl mx-auto space-y-12">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white leading-tight">{generatedLesson.title}</h1>
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                      <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Today you are learning
                      </h3>
                      <p className="text-gray-300">{generatedLesson.todayYouAreLearning}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Why it matters</h2>
                    <p className="text-lg text-gray-400 leading-relaxed">{generatedLesson.whyItMatters}</p>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Explanation</h2>
                    <div className="prose prose-invert max-w-none">
                      <Markdown>{generatedLesson.explanation}</Markdown>
                    </div>
                  </div>

                  {generatedLesson.codeExample && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold text-white">Code Example</h2>
                      <pre className="p-6 rounded-2xl bg-black/50 border border-white/10 font-mono text-sm overflow-x-auto">
                        <code>{generatedLesson.codeExample}</code>
                      </pre>
                      {generatedLesson.lineByLine && (
                        <p className="text-sm text-gray-500 italic">{generatedLesson.lineByLine}</p>
                      )}
                    </div>
                  )}

                  <div className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                    <h3 className="text-xl font-bold">Analogy</h3>
                    <p className="text-gray-400 italic">"{generatedLesson.analogy}"</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <Wand2 className="w-10 h-10 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-400">No Content Generated</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">Configure the lesson details on the left and click generate to start.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
