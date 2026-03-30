import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FileText, 
  Briefcase, 
  Award, 
  AlertTriangle, 
  CreditCard, 
  Megaphone, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BookOpen, label: 'Curriculum', path: '/admin/curriculum' },
  { icon: FileText, label: 'Lessons', path: '/admin/lessons' },
  { icon: Sparkles, label: 'Lesson Generator', path: '/admin/generator' },
  { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
  { icon: Award, label: 'Certificates', path: '/admin/certificates' },
  { icon: AlertTriangle, label: 'Reports', path: '/admin/reports' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? '280px' : '80px',
          x: 0
        }}
        className={`fixed lg:relative z-50 h-screen bg-[#111111]/80 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 ${!isSidebarOpen ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 whitespace-nowrap"
              >
                MentorStack <span className="text-blue-500 text-xs uppercase tracking-widest ml-1">Admin</span>
              </motion.span>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}
              `}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isSidebarOpen ? '' : 'mx-auto'}`} />
              {isSidebarOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
          >
            <ChevronRight className="w-5 h-5 shrink-0 rotate-180" />
            {isSidebarOpen && <span className="text-sm font-medium">Back to App</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-white/90">Control Center</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
