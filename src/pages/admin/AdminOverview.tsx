import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, Badge } from '../../components/ui';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
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
          <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Overview...</p>
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

  const stats = [
    { label: 'Total Users', value: '0', icon: <Users size={20} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Paths', value: '0', icon: <TrendingUp size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Lessons Completed', value: '0', icon: <BookOpen size={20} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Avg. Session', value: '0m', icon: <Clock size={20} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Phase 1: Shell</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Admin <span className="text-gradient">Overview</span>
          </h1>
          <p className="text-white/40 font-bold text-lg">System-wide performance and engagement metrics.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
            Export Data
          </button>
          <button className="px-6 py-3 bg-emerald-500 text-black rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20">
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-8 bg-white/[0.01] border-white/[0.05] hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{stat.label}</p>
              </div>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-black tracking-tighter leading-none">{stat.value}</h3>
                <div className="flex items-center gap-1 text-white/10 text-[10px] font-black uppercase tracking-widest">
                  <Activity size={12} />
                  <span>No Data</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart Placeholder */}
        <Card className="lg:col-span-2 p-10 space-y-8 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tight">User Activity</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Last 30 days engagement</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Zap size={48} className="text-white/5 mb-4" />
            <p className="text-white/20 font-black uppercase tracking-[0.2em] text-xs">No activity data available yet</p>
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-10 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <h3 className="font-black text-xl tracking-tight">System Status</h3>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Firebase Auth', status: 'Healthy', color: 'text-emerald-400' },
              { label: 'Firestore DB', status: 'Healthy', color: 'text-emerald-400' },
              { label: 'AI Services', status: 'Healthy', color: 'text-emerald-400' },
              { label: 'Storage', status: 'Healthy', color: 'text-emerald-400' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-sm font-bold text-white/60">{item.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse`} />
                  <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <p className="text-xs text-emerald-400/60 font-medium leading-relaxed">
              All systems are operational. Phase 1 monitoring is active.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
