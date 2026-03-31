import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Activity,
  Clock,
  ArrowUpRight,
  Megaphone,
  ShieldAlert
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getAdminStats, getRecentActivity, AdminStats, AdminActivity } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeLearners: 0,
    lessonsCompleted: 0,
    certificatesIssued: 0
  });
  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [statsData, activityData] = await Promise.all([
          getAdminStats(),
          getRecentActivity()
        ]);
        setStats(statsData);
        setActivities(activityData);
      } catch (err: any) {
        console.error('Error fetching admin dashboard data:', err);
        setError(err.message || 'Failed to fetch dashboard data. Please check your permissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Learners', value: stats.activeLearners.toLocaleString(), icon: Activity, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Lessons Completed', value: stats.lessonsCompleted.toLocaleString(), icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Certificates Issued', value: stats.certificatesIssued.toLocaleString(), icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading dashboard data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
            <p className="text-gray-400 mt-2">Real-time statistics and platform activity.</p>
          </div>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm flex items-center gap-2">
              <ShieldAlert size={16} />
              {error}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#121214] border border-white/5 p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-green-400 relative z-10">
                  <TrendingUp size={14} />
                  <span>Live Data</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#121214] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-green-400" size={20} />
                Recent Activity
              </h2>
              <button className="text-sm text-green-400 hover:underline flex items-center gap-1">
                View all <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <div 
                    key={activity.id || index}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold text-black text-sm">
                        {activity.user[0]}
                      </div>
                      <div>
                        <p className="font-medium">
                          {activity.user} <span className="text-gray-400 font-normal">{activity.action}</span> {activity.target}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <ArrowUpRight size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No activity yet.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/admin/lesson-generator')}
                  className="w-full py-3 px-4 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen size={20} />
                  Generate Lesson
                </button>
                <button 
                  onClick={() => navigate('/admin/announcements')}
                  className="w-full py-3 px-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <Megaphone size={20} />
                  Post Announcement
                </button>
                <button 
                  onClick={() => navigate('/admin/moderation')}
                  className="w-full py-3 px-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 border border-white/10"
                >
                  <ShieldAlert size={20} />
                  Review Reports
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/20 rounded-2xl p-6">
              <h3 className="font-bold text-green-400">System Status</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">API Status</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Database</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Storage</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Optimal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
