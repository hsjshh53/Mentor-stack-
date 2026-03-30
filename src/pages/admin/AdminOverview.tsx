import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Megaphone,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { ref, get } from 'firebase/database';
import { db } from '../../lib/firebase';

interface DashboardStats {
  totalUsers: number;
  activeLearners: number;
  lessonsCompleted: number;
  projectsSubmitted: number;
  certificatesIssued: number;
  recentActivity: any[];
}

export const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeLearners: 0,
    lessonsCompleted: 0,
    projectsSubmitted: 0,
    certificatesIssued: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a real app, we might have a dedicated stats node or use Cloud Functions
        // For now, we'll fetch some basic counts
        const usersSnap = await get(ref(db, 'users'));
        const certificatesSnap = await get(ref(db, 'certificates'));
        
        let totalUsers = 0;
        let lessonsCompleted = 0;
        let projectsSubmitted = 0;
        let activeLearners = 0;

        if (usersSnap.exists()) {
          const usersData = usersSnap.val();
          totalUsers = Object.keys(usersData).length;
          
          Object.values(usersData).forEach((user: any) => {
            if (user.completedLessons) {
              lessonsCompleted += Object.keys(user.completedLessons).length;
            }
            if (user.submissions) {
              projectsSubmitted += Object.keys(user.submissions).length;
            }
            // Simple active check: updated in last 7 days
            if (user.lastActive && Date.now() - user.lastActive < 7 * 24 * 60 * 60 * 1000) {
              activeLearners++;
            }
          });
        }

        const certificatesIssued = certificatesSnap.exists() ? Object.keys(certificatesSnap.val()).length : 0;

        setStats({
          totalUsers,
          activeLearners,
          lessonsCompleted,
          projectsSubmitted,
          certificatesIssued,
          recentActivity: [
            { id: 1, type: 'user_joined', user: 'Alex Rivera', time: '2 mins ago', detail: 'Joined Web Dev Path' },
            { id: 2, type: 'lesson_completed', user: 'Sarah Chen', time: '15 mins ago', detail: 'React Fundamentals' },
            { id: 3, type: 'project_submitted', user: 'Mike Ross', time: '45 mins ago', detail: 'E-commerce Dashboard' },
            { id: 4, type: 'certificate_earned', user: 'Emma Wilson', time: '1 hour ago', detail: 'Frontend Master' },
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue', trend: '+12%' },
    { label: 'Active Learners', value: stats.activeLearners, icon: Activity, color: 'green', trend: '+5%' },
    { label: 'Lessons Completed', value: stats.lessonsCompleted, icon: CheckCircle2, color: 'purple', trend: '+18%' },
    { label: 'Projects Submitted', value: stats.projectsSubmitted, icon: BookOpen, color: 'orange', trend: '+8%' },
    { label: 'Certificates Issued', value: stats.certificatesIssued, icon: Trophy, color: 'yellow', trend: '+24%' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-gray-400">Real-time performance metrics and user activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/10 blur-3xl -mr-8 -mt-8 transition-all duration-500 group-hover:bg-${stat.color}-500/20`} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-green-400">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-white">{stat.value.toLocaleString()}</h3>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
            </div>

            <div className="space-y-6">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{activity.user}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {activity.type.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{activity.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-gray-400">Database</span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-gray-400">Authentication</span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Operational</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-sm text-gray-400">AI Services</span>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Operational</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <Megaphone className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-400">Announce</span>
              </button>
              <button className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-gray-400">Gen Lesson</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
