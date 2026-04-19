import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Card, Badge } from '../../components/ui';
import { 
  Users, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard
} from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    generatedLessons: 0,
    pendingApproval: 0,
    pendingPayments: 0
  });

  useEffect(() => {
    // Fetch stats from database
    const usersRef = ref(db, 'users');
    const lessonsRef = ref(db, 'lessons');
    const aiLessonsRef = ref(db, 'ai_generated_lessons');
    const paymentsRef = ref(db, 'payments');

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setStats(prev => ({ ...prev, totalUsers: Object.keys(snapshot.val()).length }));
      }
    });

    onValue(paymentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const pending = Object.values(data).filter((p: any) => 
          ['initiated', 'paid_pending_verification'].includes(p.status)
        ).length;
        setStats(prev => ({ ...prev, pendingPayments: pending }));
      }
    });

    onValue(lessonsRef, (snapshot) => {
      if (snapshot.exists()) {
        setStats(prev => ({ ...prev, totalLessons: Object.keys(snapshot.val()).length }));
      }
    });

    onValue(aiLessonsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let total = 0;
        let pending = 0;
        Object.values(data).forEach((skill: any) => {
          Object.values(skill).forEach((lesson: any) => {
            total++;
            if (lesson.status === 'pending') pending++;
          });
        });
        setStats(prev => ({ ...prev, generatedLessons: total, pendingApproval: pending }));
      }
    });
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Live Lessons', value: stats.totalLessons, icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'AI Generated', value: stats.generatedLessons, icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Pending Payments', value: stats.pendingPayments, icon: CreditCard, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight">System Overview</h1>
            <p className="text-white/40 font-medium">Real-time statistics and system status.</p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[10px]">
            System Online
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-8 border-white/5 bg-white/[0.02] space-y-6">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-8 border-white/5 bg-white/[0.02] space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp size={20} className="text-emerald-400" />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Recent Activity</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">View All</button>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold">New Lesson Approved</p>
                    <p className="text-xs text-white/40">"Introduction to React Hooks" was published.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/20">2m ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-white/5 bg-white/[0.02] space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-purple-400" />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">AI Generation Queue</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Manage Queue</button>
            </div>

            <div className="space-y-6">
              {['Python', 'Docker', 'GraphQL'].map((skill, i) => (
                <div key={skill} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                    <Sparkles size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold">Generating {skill} Path</p>
                    <div className="mt-2 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-2/3" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-purple-500">65%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
