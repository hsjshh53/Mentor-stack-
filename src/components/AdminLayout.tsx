import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Wand2, 
  Settings, 
  ArrowLeft,
  Briefcase,
  Award,
  AlertTriangle,
  Megaphone,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BookOpen, label: 'Curriculum', path: '/admin/curriculum' },
  { icon: Wand2, label: 'Lesson Generator', path: '/admin/lesson-generator' },
  { icon: Layers, label: 'Skills', path: '/admin/skills' },
  { icon: Briefcase, label: 'Projects', path: '/admin/projects' },
  { icon: Award, label: 'Certificates', path: '/admin/certificates' },
  { icon: AlertTriangle, label: 'Moderation', path: '/admin/moderation' },
  { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-emerald-500 font-bold text-xl">
            <ArrowLeft className="w-5 h-5" />
            MentorStack Admin
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 text-gray-400">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs truncate">olynqsociallimited@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
