import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
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
  CreditCard,
  Landmark,
  MessageSquare,
  RefreshCw,
  Zap,
  Layout,
  Play
} from 'lucide-react';
import { ref } from 'firebase/database';
import { db } from '../../lib/firebase';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { firebaseSafeOnValue } from '../../lib/FirebaseService';
import { Button } from '../../components/ui';
import { performFullSystemReset } from '../../services/AdminService';
import { SuperGeneratorService } from '../../services/SuperGeneratorService';
import { CurriculumEngineService } from '../../services/CurriculumEngineService';
import { ACADEMY_CATALOG } from '../../constants/curriculumCatalog';

export const AdminDashboard: React.FC = () => {
  const { isAdmin, adminReady } = useAuth();
  const [resetting, setResetting] = useState(false);
  const [superGenStatus, setSuperGenStatus] = useState<string>('Idle');
  const [batchRunning, setBatchRunning] = useState(false);
  const [engineRunning, setEngineRunning] = useState(false);
  const [pathProgress, setPathProgress] = useState<Record<string, string>>({});
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLessons: 0,
    generatedLessons: 0,
    pendingApproval: 0,
    pendingPayments: 0,
    pendingReceipts: 0,
    openTickets: 0
  });

  useEffect(() => {
    if (!adminReady || !isAdmin) return;

    console.log("[AdminShield] Activating analytics streams...");
    const unsubscribers: (() => void)[] = [];

    // Safe listeners using FirebaseService
    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'users'), (data) => {
        if (data) {
          setStats(prev => ({ ...prev, totalUsers: Object.keys(data).length }));
        }
      }, "Users")
    );

    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'payments'), (data: any) => {
        if (data) {
          const pending = Object.values(data).filter((p: any) => 
            ['initiated', 'paid_pending_verification'].includes(p.status)
          ).length;
          setStats(prev => ({ ...prev, pendingPayments: pending }));
        }
      }, "Payments")
    );

    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'receipts'), (data: any) => {
        if (data) {
          const pending = Object.values(data).filter((r: any) => r.status === 'pending').length;
          setStats(prev => ({ ...prev, pendingReceipts: pending }));
        }
      }, "Receipts")
    );

    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'support_tickets'), (data: any) => {
        if (data) {
          const pending = Object.values(data).filter((t: any) => t.status === 'open').length;
          setStats(prev => ({ ...prev, openTickets: pending }));
        }
      }, "Tickets")
    );

    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'lessons'), (data) => {
        if (data) {
          setStats(prev => ({ ...prev, totalLessons: Object.keys(data).length }));
        }
      }, "Lessons")
    );

    unsubscribers.push(
      firebaseSafeOnValue(ref(db, 'ai_generated_lessons'), (data: any) => {
        if (data) {
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
      }, "AILessons")
    );

    return () => {
      console.log("[AdminShield] Releasing identity-authenticated streams...");
      unsubscribers.forEach(unsub => unsub());
    };
  }, [isAdmin, adminReady]);

  const handleSystemReset = async () => {
    if (!window.confirm("⚠️ DANGER: You are about to reset ALL users progress across the entire platform. This cannot be undone. Are you absolutely sure?")) {
      return;
    }

    setResetting(true);
    try {
      const result = await performFullSystemReset();
      alert(`Success: ${result.message}`);
    } catch (err: any) {
      alert(`Reset Failed: ${err.message}`);
    } finally {
      setResetting(false);
    }
  };

  const handleGeneratePath = async (path: typeof ACADEMY_CATALOG[0]) => {
    if (pathProgress[path.id] === 'Generating...') return;
    
    setPathProgress(prev => ({ ...prev, [path.id]: 'Generating...' }));
    try {
      const result = await SuperGeneratorService.generatePathStructure(path, (msg) => {
        setSuperGenStatus(`[${path.title}] ${msg}`);
      });
      setPathProgress(prev => ({ ...prev, [path.id]: `Done (${result.count} lessons)` }));
    } catch (err: any) {
      setPathProgress(prev => ({ ...prev, [path.id]: 'Error' }));
      alert(`Path Generation Failed: ${err.message}`);
    }
  };

  const runBatchGeneration = async () => {
    if (batchRunning) return;
    setBatchRunning(true);
    setSuperGenStatus('Batch runner started...');
    
    try {
      const count = await SuperGeneratorService.batchFillLessons(5, (msg) => {
        setSuperGenStatus(`[Batch] ${msg}`);
      });
      setSuperGenStatus(`Batch complete. Filled ${count} lessons.`);
    } catch (err: any) {
      setSuperGenStatus(`Batch error: ${err.message}`);
    } finally {
      setBatchRunning(false);
    }
  };

  const runCurriculumEngine = async () => {
    if (engineRunning) return;
    const path = ACADEMY_CATALOG[0]; 
    setEngineRunning(true);
    setSuperGenStatus(`Ultra-Speed Engine: Initializing high-speed loop for ${path.title}...`);
    
    try {
      await CurriculumEngineService.runAutonomousLoop(path.skillId, path.title, (msg) => {
        setSuperGenStatus(msg);
      });
      setSuperGenStatus(`Ultra-Speed Cycle Finished. Check AI Staging for new content.`);
    } catch (err: any) {
      setSuperGenStatus(`Speed Engine Error: ${err.message}`);
    } finally {
      setEngineRunning(false);
    }
  };

  if (!adminReady) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
          <AlertCircle size={48} className="text-rose-500" />
          <h2 className="text-2xl font-black">Access Denied</h2>
          <p className="text-white/40 max-w-md">You do not have the required permissions to view the admin dashboard.</p>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Live Lessons', value: stats.totalLessons, icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'AI Generated', value: stats.generatedLessons, icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Pending Review', value: stats.pendingApproval, icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10', link: '/admin/lessons' },
    { label: 'Selar Payments', value: stats.pendingPayments, icon: CreditCard, color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { label: 'Bank Receipts', value: stats.pendingReceipts, icon: Landmark, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    { label: 'Support Tickets', value: stats.openTickets, icon: MessageSquare, color: 'text-rose-400', bg: 'bg-rose-400/10' },
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
          {statCards.map((stat, i) => {
            const Content = (
              <Card className={`p-8 border-white/5 bg-white/[0.02] space-y-6 h-full transition-all ${stat.link ? 'cursor-pointer hover:bg-white/[0.04] active:scale-95' : ''}`}>
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={28} />
                </div>
                <div className="space-y-1">
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                </div>
              </Card>
            );

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {stat.link ? (
                  <Link to={stat.link}>
                    {Content}
                  </Link>
                ) : Content}
              </motion.div>
            );
          })}
        </div>

        {/* 🚀 ELITE CURRICULUM MISSION CONTROL */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={24} className="text-yellow-400" />
              <h2 className="text-2xl font-black tracking-tight uppercase">Elite Super Generator</h2>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-400/10 text-yellow-400 border-yellow-400/20 px-3 py-1 font-black text-[10px]">
                {superGenStatus}
              </Badge>
              <Button 
                onClick={runBatchGeneration}
                disabled={batchRunning}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] px-6 h-10 rounded-xl flex items-center gap-2"
              >
                <Play size={14} />
                {batchRunning ? 'Generating...' : 'Run Content Batch'}
              </Button>
              <Button 
                onClick={runCurriculumEngine}
                disabled={engineRunning}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] px-6 h-10 rounded-xl flex items-center gap-2"
              >
                <RefreshCw size={14} className={engineRunning ? 'animate-spin' : ''} />
                {engineRunning ? 'Engine Running...' : 'Run Sequential Engine'}
              </Button>
            </div>
          </div>

          <Card className="p-0 border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-4 px-8 text-[10px] font-black uppercase tracking-widest text-white/40">Career Path</th>
                    <th className="p-4 px-8 text-[10px] font-black uppercase tracking-widest text-white/40">Category</th>
                    <th className="p-4 px-8 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ACADEMY_CATALOG.map((path) => (
                    <tr key={path.id} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 px-8">
                        <div className="flex items-center gap-3">
                          <Layout size={16} className="text-white/20" />
                          <span className="font-bold text-sm tracking-tight">{path.title}</span>
                        </div>
                      </td>
                      <td className="p-4 px-8">
                        <Badge className="bg-white/5 text-white/40 border-white/10 text-[9px] font-black px-2 py-0.5">
                          {path.category}
                        </Badge>
                      </td>
                      <td className="p-4 px-8 text-right">
                        <span className="mr-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                          {pathProgress[path.id] || 'Idle'}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGeneratePath(path)}
                          disabled={pathProgress[path.id] === 'Generating...'}
                          className="border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 text-[10px] font-black uppercase tracking-widest h-8"
                        >
                          Build Structure
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
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

        {/* ⚠️ CRITICAL OPERATIONS AREA */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle size={24} className="text-rose-500" />
            <h3 className="text-xl font-black tracking-tight text-rose-500 uppercase">Critical System Operations</h3>
          </div>
          
          <Card className="p-10 border-rose-500/20 bg-rose-500/5 space-y-8">
            <div className="space-y-2">
              <h4 className="text-2xl font-black tracking-tight">Full Curriculum & User Reset</h4>
              <p className="text-white/40 font-medium">
                This operation will reset progress for ALL users, assigning them to the Beginner path and clearing all completion history. 
                Profile data and subscription status will be preserved.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/40 border border-rose-500/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <RefreshCw size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">System Alignment V4</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Action: users_reset_all</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-rose-500/50 text-rose-500 hover:bg-rose-500 hover:text-white h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs"
                onClick={handleSystemReset}
                disabled={resetting}
              >
                {resetting ? 'Resetting System...' : 'Execute Full Reset'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};
