import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Flag, 
  BookOpen, 
  Briefcase, 
  Award, 
  CreditCard, 
  Megaphone, 
  Settings,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Menu,
  X,
  LogOut,
  ArrowLeft,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, onValue, update, get, push, set } from 'firebase/database';
import { db, auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { Card, Button, Badge, Input } from '../components/ui';

type AdminTab = 
  | 'overview' 
  | 'users' 
  | 'reports' 
  | 'curriculum' 
  | 'projects' 
  | 'certificates' 
  | 'payments' 
  | 'announcements' 
  | 'settings';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeLearners: 0,
    lessonsCompleted: 0,
    projectsSubmitted: 0,
    certificatesIssued: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAdmin) return;

    // Fetch stats
    const statsRef = ref(db, 'stats');
    onValue(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        setStats(snapshot.val());
      }
    });

    // Fetch users
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        const usersList = Object.keys(usersData).map(uid => ({
          uid,
          ...usersData[uid]
        }));
        setUsers(usersList);
      }
    });

    // Fetch submissions
    const submissionsRef = ref(db, 'submissions');
    onValue(submissionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const subsData = snapshot.val();
        const subsList = Object.keys(subsData).map(id => ({
          id,
          ...subsData[id]
        }));
        setSubmissions(subsList);
      }
    });
  }, [isAdmin]);

  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishAnnouncement = async () => {
    if (!announcementTitle || !announcementMessage) return;
    
    setIsPublishing(true);
    try {
      const announcementsRef = ref(db, 'announcements');
      const newAnnouncementRef = push(announcementsRef);
      await set(newAnnouncementRef, {
        id: newAnnouncementRef.key,
        title: announcementTitle,
        message: announcementMessage,
        createdAt: Date.now(),
        authorId: user?.uid
      });
      setAnnouncementTitle('');
      setAnnouncementMessage('');
      alert('Announcement published successfully!');
    } catch (error) {
      console.error('Error publishing announcement:', error);
      alert('Failed to publish announcement.');
    } finally {
      setIsPublishing(false);
    }
  };

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/dashboard" />;

  const handleLogout = () => signOut(auth);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'settings', label: 'Platform Settings', icon: Settings },
  ];

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050506] text-white flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-[#050506] border-r border-white/[0.05] flex flex-col z-50 p-8"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-black shadow-lg shadow-blue-500/20">
                <ShieldCheck size={20} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter">MentorStack</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Admin Panel</span>
              </div>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 group ${
                    activeTab === item.id 
                      ? 'bg-blue-500 text-black font-black shadow-2xl shadow-blue-500/30 scale-[1.02]' 
                      : 'text-white/30 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-black' : 'text-white/30 group-hover:text-white'}`}>
                    <item.icon size={20} />
                  </span>
                  <span className="text-base font-bold tracking-tight">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="pt-8 border-t border-white/[0.05] space-y-4">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => navigate('/dashboard')}
                className="rounded-[1.5rem] py-4"
              >
                <ArrowLeft size={18} className="mr-2" />
                Back to Dashboard
              </Button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] text-red-400/60 hover:text-red-400 hover:bg-red-400/[0.05] transition-all font-black tracking-tight"
              >
                <LogOut size={22} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-blue-500/[0.03] blur-[150px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-24 border-b border-white/[0.05] bg-[#050506]/60 backdrop-blur-2xl flex items-center justify-between px-10 relative z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
            >
              {isSidebarOpen ? <X size={24} className="text-white/40" /> : <Menu size={24} className="text-white/40" />}
            </button>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black tracking-tighter">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">System Management</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pl-6 border-l border-white/[0.08]">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black tracking-tight">{user.email}</p>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mt-1">Owner Admin</Badge>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1">
                <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-black text-xl">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
                    { label: 'Active Learners', value: stats.activeLearners, icon: BookOpen, color: 'emerald' },
                    { label: 'Lessons Done', value: stats.lessonsCompleted, icon: CheckCircle, color: 'purple' },
                    { label: 'Projects', value: stats.projectsSubmitted, icon: Briefcase, color: 'orange' },
                    { label: 'Certificates', value: stats.certificatesIssued, icon: Award, color: 'yellow' },
                  ].map((stat, i) => (
                    <Card key={i} className="flex flex-col gap-4 group">
                      <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-400 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-3xl font-black tracking-tight">{stat.value.toLocaleString()}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Recent Submissions */}
                  <Card className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-blue-400">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <Activity size={22} />
                        </div>
                        <h3 className="font-black uppercase text-sm tracking-[0.2em]">Recent Submissions</h3>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab('projects')}>View All</Button>
                    </div>

                    <div className="space-y-4">
                      {submissions.slice(0, 5).map((sub, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] rounded-[1.5rem] border border-white/[0.05] hover:bg-white/[0.04] transition-all duration-300">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                              <Briefcase size={22} />
                            </div>
                            <div>
                              <p className="font-black text-lg tracking-tight">{sub.projectId}</p>
                              <p className="text-xs font-medium text-white/30">User ID: {sub.userId.substring(0, 12)}...</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setActiveTab('projects')}>Review</Button>
                        </div>
                      ))}
                      {submissions.length === 0 && (
                        <div className="text-center py-12 bg-white/[0.01] rounded-[1.5rem] border border-dashed border-white/[0.1]">
                          <p className="text-white/20 italic font-medium">No recent submissions to display.</p>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* System Status */}
                  <Card className="space-y-8">
                    <div className="flex items-center gap-4 text-emerald-400">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <TrendingUp size={22} />
                      </div>
                      <h3 className="font-black uppercase text-sm tracking-[0.2em]">System Status</h3>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: 'Database', status: 'Healthy', color: 'emerald' },
                        { label: 'Authentication', status: 'Healthy', color: 'emerald' },
                        { label: 'Storage', status: 'Healthy', color: 'emerald' },
                        { label: 'AI Services', status: 'Healthy', color: 'emerald' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-sm font-bold text-white/40">{item.label}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-${item.color}-500 animate-pulse`} />
                            <span className={`text-xs font-black uppercase tracking-widest text-${item.color}-400`}>{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/[0.05]">
                      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Admin Note</p>
                        <p className="text-sm text-white/40 leading-relaxed italic">
                          "Platform scaling is currently stable. Next scheduled maintenance in 12 days."
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter">User Directory</h2>
                    <p className="text-white/30 font-medium">Manage all registered learners on the platform.</p>
                  </div>
                  <div className="relative w-full md:w-[400px]">
                    <Input 
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                  </div>
                </div>

                <Card className="p-0 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/[0.05] bg-white/[0.02]">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">User Profile</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Career Path</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Progress</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Tier</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {filteredUsers.map((u, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center font-black text-lg group-hover:border-blue-500/30 transition-all">
                                  {u.displayName?.[0] || u.email?.[0]}
                                </div>
                                <div>
                                  <p className="font-black tracking-tight group-hover:text-blue-400 transition-colors">{u.displayName || 'Unnamed User'}</p>
                                  <p className="text-xs font-medium text-white/20">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <Badge className="bg-white/[0.05] text-white/60 border-white/[0.08]">
                                {u.progress?.selectedPath || 'Not Selected'}
                              </Badge>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex flex-col gap-2">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                                  <span>{u.progress?.completedLessons?.length || 0} Lessons</span>
                                </div>
                                <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden p-0.5 border border-white/[0.05]">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                                    style={{ width: `${Math.min((u.progress?.completedLessons?.length || 0) / 20 * 100, 100)}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <Badge className={u.isPremium ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-white/[0.05] text-white/20 border-white/[0.08]'}>
                                {u.isPremium ? 'Premium' : 'Free'}
                              </Badge>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button className="p-3 hover:bg-white/[0.05] rounded-xl transition-all text-white/20 hover:text-white active:scale-90">
                                <MoreVertical size={20} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter">Project Submissions</h2>
                    <p className="text-white/30 font-medium">Review and approve student project work.</p>
                  </div>
                  <Button variant="outline" size="sm">Export Data</Button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {submissions.map((sub, i) => (
                    <Card key={i} className="p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                          <Briefcase size={32} />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Submission</Badge>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <h4 className="font-black text-2xl tracking-tight group-hover:text-blue-400 transition-colors">{sub.projectId}</h4>
                          <p className="text-sm font-medium text-white/30">Author UID: {sub.userId}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(sub.githubLink, '_blank')}
                        >
                          GitHub Repo
                        </Button>
                        {sub.liveLink && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => window.open(sub.liveLink, '_blank')}
                          >
                            Live Demo
                          </Button>
                        )}
                        <div className="w-px h-10 bg-white/[0.05] mx-2 hidden lg:block" />
                        <Button 
                          variant={sub.status === 'approved' ? 'outline' : 'primary'}
                          size="md"
                          onClick={() => {
                            const subRef = ref(db, `submissions/${sub.id}`);
                            update(subRef, { status: 'approved' });
                          }}
                          className={sub.status === 'approved' ? 'border-emerald-500/30 text-emerald-400' : ''}
                        >
                          {sub.status === 'approved' ? <><CheckCircle size={18} className="mr-2" /> Approved</> : 'Approve Project'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {submissions.length === 0 && (
                    <div className="text-center py-32 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/[0.1]">
                      <div className="w-20 h-20 rounded-full bg-white/[0.03] flex items-center justify-center text-white/10 mx-auto mb-6">
                        <Briefcase size={40} />
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-white/40">No projects to review</h3>
                      <p className="text-white/20 mt-2">Check back later for new student submissions.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'announcements' && (
              <motion.div
                key="announcements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter">Announcements</h2>
                    <p className="text-white/30 font-medium">Broadcast messages to all platform users.</p>
                  </div>
                </div>

                <Card className="p-12 max-w-3xl mx-auto space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Megaphone size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">Create New Broadcast</h3>
                      <p className="text-white/40 font-medium">This will appear on the user dashboard immediately.</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <Input 
                      label="Announcement Title" 
                      placeholder="e.g., New UI/UX Path Released!" 
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                    />
                    <div className="space-y-3">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 ml-1">Message Content</label>
                      <textarea 
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 h-40 resize-none"
                        placeholder="Write your message here..."
                        value={announcementMessage}
                        onChange={(e) => setAnnouncementMessage(e.target.value)}
                      />
                    </div>
                    <Button 
                      fullWidth 
                      variant="premium" 
                      className="h-20 text-lg"
                      onClick={handlePublishAnnouncement}
                      disabled={isPublishing || !announcementTitle || !announcementMessage}
                    >
                      {isPublishing ? 'Publishing...' : 'Publish Announcement'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'overview' && activeTab !== 'users' && activeTab !== 'projects' && activeTab !== 'announcements' && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-32 h-32 rounded-[2rem] bg-white/[0.03] flex items-center justify-center text-white/10 relative">
                  <Settings size={60} className="animate-spin-slow" />
                  <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter text-white/40 uppercase">Module Under Construction</h2>
                  <p className="text-white/20 font-medium max-w-md mx-auto leading-relaxed">
                    The <span className="text-blue-400 font-bold">{activeTab}</span> management system is currently being integrated with the platform's core services.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setActiveTab('overview')}>Return to Overview</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
