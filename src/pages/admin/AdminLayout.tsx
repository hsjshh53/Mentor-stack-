import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Wrench, 
  Settings, 
  Menu, 
  X, 
  Zap, 
  LogOut,
  ChevronRight,
  User,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <BookOpen size={20} />, label: 'Curriculum', path: '/admin/curriculum' },
    { icon: <Sparkles size={20} />, label: 'Lesson Generator', path: '/admin/generator' },
    { icon: <Wrench size={20} />, label: 'Skills & Tools', path: '/admin/skills' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#050506]/60 backdrop-blur-2xl border-b border-white/[0.05] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 -ml-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90 lg:hidden"
          >
            <Menu size={26} className="text-white/60" />
          </button>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/admin')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <Zap size={20} fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-gradient leading-none">MentorStack</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mt-1">Admin Console</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 pl-6 border-l border-white/[0.08]">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black tracking-tight">{user?.displayName || 'Admin'}</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
                System Administrator
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1">
              <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-white/[0.05]">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={22} className="text-white/20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-[#050506] border-r border-white/[0.05] p-8 flex-col">
          <nav className="space-y-2 flex-grow">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button 
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-emerald-500 text-black font-black shadow-lg shadow-emerald-500/20' 
                      : 'text-white/30 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-black' : 'text-white/30 group-hover:text-white'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </button>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/[0.05]">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-400/[0.05] transition-all font-black tracking-tight text-sm"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden"
              />
              <motion.aside 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 left-0 w-80 bg-[#050506] border-r border-white/[0.05] z-[70] p-10 flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between mb-16">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter">Admin</span>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-3 hover:bg-white/[0.05] rounded-2xl transition-all active:scale-90"
                  >
                    <X size={26} className="text-white/40" />
                  </button>
                </div>

                <nav className="space-y-3 flex-grow">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button 
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] transition-all duration-300 group ${
                          isActive 
                            ? 'bg-emerald-500 text-black font-black shadow-2xl shadow-emerald-500/30 scale-[1.02]' 
                            : 'text-white/30 hover:text-white hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-black' : 'text-white/30 group-hover:text-white'}`}>
                          {item.icon}
                        </span>
                        <span className="text-base font-bold tracking-tight">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-10 border-t border-white/[0.05]">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-5 px-6 py-5 rounded-[1.5rem] text-red-400/60 hover:text-red-400 hover:bg-red-400/[0.05] transition-all font-black tracking-tight"
                  >
                    <LogOut size={22} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Admin Environment Warning */}
          {!process.env.GEMINI_API_KEY && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-8 py-3 flex items-center justify-center gap-3 text-amber-500 text-xs font-black uppercase tracking-widest relative z-50">
              <AlertTriangle size={14} />
              <span>Critical Warning: GEMINI_API_KEY is missing. AI Tutor and Lesson Generation are disabled.</span>
            </div>
          )}
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-emerald-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto p-8 md:p-12 relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
