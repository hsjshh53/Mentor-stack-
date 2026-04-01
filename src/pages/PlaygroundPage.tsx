import React from 'react';
import { Card } from '../components/ui';
import { Code2, Play, Save, Share2 } from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black">
            <Code2 size={18} />
          </div>
          <span className="font-black tracking-tighter">Code Playground</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
            <Share2 size={18} />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
            <Save size={18} />
          </button>
          <button className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-lg font-black text-sm hover:bg-emerald-400 transition-all">
            <Play size={16} fill="currentColor" />
            Run Code
          </button>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-px bg-white/5">
        <div className="bg-[#0A0A0B] p-6 font-mono text-sm">
          <pre className="text-emerald-400/80">
            <code>{`// Start coding here...
function helloWorld() {
  console.log("Hello, MentorStack!");
}

helloWorld();`}</code>
          </pre>
        </div>
        <div className="bg-[#0A0A0B] p-6 flex flex-col">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">
            Console Output
          </div>
          <div className="flex-1 font-mono text-sm text-white/60">
            {`> Hello, MentorStack!`}
          </div>
        </div>
      </div>
    </div>
  );
};
