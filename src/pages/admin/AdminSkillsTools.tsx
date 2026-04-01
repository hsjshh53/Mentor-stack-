import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, Badge } from '../../components/ui';
import { 
  Wrench, 
  Plus, 
  Search, 
  Filter, 
  AlertCircle,
  Zap,
  Terminal,
  Code
} from 'lucide-react';

export const AdminSkillsTools: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Skills & Tools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-12 border-red-500/20 bg-red-500/5 text-center max-w-md">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-black tracking-tight mb-2">Error Loading Data</h2>
          <p className="text-white/60 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-red-500 text-white font-black rounded-xl hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Phase 1: Shell</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Skills & <span className="text-gradient">Tools</span>
          </h1>
          <p className="text-white/40 font-bold text-lg">Manage the global library of skills, tools, and technologies.</p>
        </div>
        <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 active:scale-95">
          <Plus size={20} />
          Add New Tool
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 space-y-8 bg-white/[0.01] border-white/[0.05]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Terminal size={20} />
            </div>
            <h3 className="font-black text-xl tracking-tight">Global Tools</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Zap size={48} className="text-white/5 mb-4" />
            <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">No tools data available yet</p>
          </div>
        </Card>

        <Card className="p-8 space-y-8 bg-white/[0.01] border-white/[0.05]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Code size={20} />
            </div>
            <h3 className="font-black text-xl tracking-tight">Global Skills</h3>
          </div>
          
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Zap size={48} className="text-white/5 mb-4" />
            <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">No skills data available yet</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
