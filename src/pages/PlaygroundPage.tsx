import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, Play, Save, Share2, 
  Settings, ChevronRight, ArrowLeft,
  Code2, Layout, Database, Zap, X
} from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { useUserData } from '../hooks/useUserData';

export const PlaygroundPage: React.FC = () => {
  const navigate = useNavigate();
  const { loading } = useUserData();
  const [code, setCode] = useState('// Write your code here...\nconsole.log("Hello MentorStack!");');
  const [output, setOutput] = useState(['> Ready to run your code...']);

  if (loading) return <LoadingScreen />;

  const handleRun = () => {
    setOutput(prev => [...prev, `> Running code...`, `> Hello MentorStack!`, `> Success!`]);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-bold text-lg tracking-tight">Playground</h1>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Interactive Sandbox</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-4 text-xs">
            <Save size={16} className="mr-2" />
            Save
          </Button>
          <Button className="h-10 px-6 text-xs shadow-lg shadow-emerald-500/20" onClick={handleRun}>
            <Play size={16} className="mr-2" fill="currentColor" />
            Run Code
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Editor Area */}
        <div className="flex-grow flex flex-col border-r border-white/5">
          <div className="bg-white/[0.02] px-6 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-4">
              <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b-2 border-emerald-500 py-2">index.js</button>
              <button className="text-[10px] font-black text-white/20 uppercase tracking-widest py-2 hover:text-white/40 transition-colors">styles.css</button>
            </div>
            <Settings size={14} className="text-white/20" />
          </div>
          <div className="flex-grow relative">
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full bg-[#050505] p-8 font-mono text-sm text-emerald-300/90 resize-none focus:ring-0 border-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Console Area */}
        <div className="w-full md:w-96 bg-[#0A0A0B] flex flex-col shrink-0">
          <div className="bg-white/[0.02] px-6 py-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest py-2">Console Output</span>
            <button onClick={() => setOutput(['> Console cleared'])} className="text-[10px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-widest">Clear</button>
          </div>
          <div className="flex-grow p-6 font-mono text-sm space-y-2 overflow-y-auto bg-black/30">
            {output.map((line, i) => (
              <div key={i} className={line.startsWith('>') ? 'text-white/40' : 'text-emerald-400'}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
