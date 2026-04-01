import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, Badge } from '../../components/ui';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database,
  Lock,
  AlertCircle
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-white/40 font-black uppercase tracking-widest text-xs">Loading Settings...</p>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: 'General Settings',
      icon: <Globe size={20} />,
      items: [
        { label: 'Platform Name', value: 'MentorStack', type: 'text' },
        { label: 'Support Email', value: 'support@mentorstack.com', type: 'text' },
        { label: 'Maintenance Mode', value: false, type: 'toggle' },
      ]
    },
    {
      title: 'Security & Access',
      icon: <Shield size={20} />,
      items: [
        { label: 'Admin Access List', value: '1 Admin', type: 'info' },
        { label: 'Two-Factor Auth', value: 'Required', type: 'info' },
        { label: 'Session Timeout', value: '2 Hours', type: 'text' },
      ]
    },
    {
      title: 'Database & Storage',
      icon: <Database size={20} />,
      items: [
        { label: 'Firestore Region', value: 'europe-west2', type: 'info' },
        { label: 'Storage Bucket', value: 'mentorstack-prod.appspot.com', type: 'info' },
        { label: 'Backup Frequency', value: 'Daily', type: 'text' },
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5">Phase 1: Shell</Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Admin <span className="text-gradient">Settings</span>
          </h1>
          <p className="text-white/40 font-bold text-lg">Configure global platform parameters and security.</p>
        </div>
        <button className="px-8 py-4 bg-emerald-500 text-black rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3 active:scale-95">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {sections.map((section, i) => (
          <Card key={section.title} className="p-10 space-y-8 bg-white/[0.01] border-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="font-black text-xl tracking-tight">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-emerald-500/20 transition-all">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{item.label}</p>
                    <p className="text-sm font-bold text-white/60">{item.value.toString()}</p>
                  </div>
                  {item.type === 'toggle' ? (
                    <div className="w-12 h-6 bg-white/5 rounded-full relative p-1 border border-white/10">
                      <div className="w-4 h-4 bg-white/20 rounded-full" />
                    </div>
                  ) : item.type === 'info' ? (
                    <Lock size={16} className="text-white/10" />
                  ) : (
                    <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500/40 hover:text-emerald-500 transition-colors">Edit</button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
