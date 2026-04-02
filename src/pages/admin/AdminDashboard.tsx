import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, BookOpen, Award, Sparkles, 
  TrendingUp, Activity, CheckCircle2, AlertCircle,
  Zap, Clock, Target, ShieldCheck
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { ref, get } from 'firebase/database';
import { db } from '../../lib/firebase';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeLearners: 0,
    lessonsCompleted: 0,
    certificatesIssued: 0,
    generationActivity: 0,
    curriculumStatus: 'Healthy'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnap = await get(ref(db, 'users'));
        const certsSnap = await get(ref(db, 'certificates'));
        
        const usersCount = usersSnap.exists() ? Object.keys(usersSnap.val()).length : 0;
        const certsCount = certsSnap.exists() ? Object.keys(certsSnap.val()).length : 0;
        
        setStats({
          totalUsers: usersCount,
          activeLearners: Math.floor(usersCount * 0.7),
          lessonsCompleted: 1245, 
          certificatesIssued: certsCount,
          generationActivity: 12,
          curriculumStatus: 'Healthy'
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: <Users size={24} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Learners', value: stats.activeLearners, icon: <Activity size={24} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Lessons Completed', value: stats.lessonsCompleted, icon: <BookOpen size={24} />, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Certificates Issued', value: stats.certificatesIssued, icon: <Award size={24} />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Generation Activity', value: stats.generationActivity, icon: <Sparkles size={24} />, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Curriculum Status', value: stats.curriculumStatus, icon: <ShieldCheck size={24} />, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="p-8 bg-white/[0.02] border-white/[0.05] hover:border-emerald-500/20 transition-all duration-500 group">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="font-black text-3xl tracking-tight">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Activity */}
        <Card className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TrendingUp size={22} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-[0.2em]">Recent Activity</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-emerald-500 transition-colors">View All</button>
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-white/40 group-hover:text-emerald-500 transition-colors">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-tight">New Lesson Generated</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Advanced React Patterns • 2 mins ago</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">SUCCESS</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Zap size={22} />
              </div>
              <h3 className="font-black uppercase text-sm tracking-[0.2em]">System Health</h3>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">ALL SYSTEMS GO</Badge>
          </div>

          <div className="space-y-8">
            {[
              { label: 'Gemini API', status: 'Operational', latency: '240ms', health: 100 },
              { label: 'Firebase Firestore', status: 'Operational', latency: '45ms', health: 100 },
              { label: 'Auto-Generator', status: 'Active', latency: 'N/A', health: 100 },
              { label: 'Auth Service', status: 'Operational', latency: '120ms', health: 100 },
            ].map((sys, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white/60 tracking-tight">{sys.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{sys.status}</span>
                  </div>
                  <span className="text-xs font-black text-white/20 uppercase tracking-widest">{sys.latency}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${sys.health}%` }}
                    className="h-full bg-emerald-500 rounded-full" 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
