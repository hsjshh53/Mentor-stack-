import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, Sparkles, 
  Settings, Bell, Award, ShieldAlert, Zap,
  Menu, X, LogOut, ChevronRight, Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAdmin) {
    return null; // Should be handled by ProtectedRoute
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
    { icon: <BookOpen size={20} />, label: 'Curriculum', path: '/admin/curriculum' },
    { icon: <Sparkles size={20} />, label: 'Lesson Generator', path: '/admin/generator' },
    { icon: <Zap size={20} />, label: 'Skills & Tools', path: '/admin/skills' },
    { icon: <Award size={20} />, label: 'Certificates', path: '/admin/certificates' },
    { icon: <ShieldAlert size={20} />, label: 'Moderation', path: '/admin/moderation' },
    { icon: <Bell size={20} />, label: 'Announcements', path: '/admin/announcements' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 80 }}
        className="fixed inset-y-0 left-0 bg-[#050506] border-r border-white/[0.05] z-50 flex flex-col transition-all duration-300"
      >
        <div className="p-8 flex items-center justify-between">
          <div className={`flex items-center gap-4 ${!isSidebarOpen && 'hidden'}`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter">Admin Panel</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/[0.05] rounded-xl transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button 
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${
                  isActive 
                    ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20' 
                    : 'text-white/40 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className={isActive ? 'text-black' : 'text-white/40 group-hover:text-white'}>
                  {item.icon}
                </span>
                {isSidebarOpen && <span className="text-sm font-bold">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/[0.05]">
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-emerald-400 hover:bg-emerald-400/10 transition-all font-bold text-sm"
          >
            <Globe size={20} />
            {isSidebarOpen && <span>Back to App</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/[0.05] transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-20'}`}>
        <header className="sticky top-0 z-40 bg-[#050506]/60 backdrop-blur-xl border-b border-white/[0.05] px-8 py-6 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black tracking-tight">{user?.email}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Owner</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
              <ShieldAlert size={20} className="text-emerald-500" />
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
