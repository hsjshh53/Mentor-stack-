import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Settings, 
  Users, 
  Sparkles, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Database,
  Layers,
  CreditCard,
  Landmark,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { LoadingScreen } from './LoadingScreen';
import { skillService } from '../services/skillService';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth() as any; // Cast to any if logout is not in type
  const { isAdmin, loading } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    if (isAdmin) {
      skillService.initializeSkills();
    }
  }, [isAdmin]);

  if (loading) return <LoadingScreen message="VERIFYING ADMIN ACCESS..." />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#050506] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
          <X size={40} />
        </div>
        <h1 className="text-3xl font-black mb-2">Access Denied</h1>
        <p className="text-white/40 mb-8 max-w-md">You do not have permission to access the admin panel.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="px-8 h-14 bg-emerald-500 text-black font-black rounded-2xl hover:bg-emerald-400 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Layers, label: 'Manage Skills', path: '/admin/skills' },
    { icon: BookOpen, label: 'Manage Lessons', path: '/admin/lessons' },
    { icon: Database, label: 'Curriculum', path: '/admin/curriculum' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Landmark, label: 'Bank Receipts', path: '/admin/receipts' },
    { icon: MessageSquare, label: 'Support Tickets', path: '/admin/support' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: Sparkles, label: 'AI Generator', path: '/admin/generator' },
  ];

  return (
    <div className="min-h-screen bg-[#050506] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A0A0B] border-r border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-black">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="font-black text-lg tracking-tight">Admin Panel</h2>
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">MentorStack</p>
            </div>
          </div>

          <nav className="flex-grow space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 h-14 rounded-2xl transition-all group ${
                    isActive 
                      ? 'bg-emerald-500 text-black font-black shadow-lg shadow-emerald-500/20' 
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} className={isActive ? 'text-black' : 'group-hover:text-emerald-400'} />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-4 px-4 h-14 w-full rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogOut size={20} />
              <span className="text-sm font-bold tracking-tight">Exit Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#0A0A0B]/50 backdrop-blur-xl sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black">{user?.displayName || 'Admin'}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <Users size={20} className="text-white/20" />
              )}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
