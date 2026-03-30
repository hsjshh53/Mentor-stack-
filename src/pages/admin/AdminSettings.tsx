import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Layout, 
  Star, 
  ShieldCheck, 
  Bell, 
  Globe,
  ChevronRight,
  Sparkles,
  Zap,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, update, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface PlatformSettings {
  onboarding: {
    welcomeMessage: string;
    showTutorial: boolean;
  };
  dashboard: {
    showFeaturedPath: boolean;
    featuredPathId: string;
    showPremiumCard: boolean;
    premiumMessage: string;
  };
  visibility: {
    showCommunity: boolean;
    showCertificates: boolean;
    showProjects: boolean;
    showLeaderboard: boolean;
  };
  maintenance: {
    isUnderMaintenance: boolean;
    maintenanceMessage: string;
  };
}

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<PlatformSettings>({
    onboarding: { welcomeMessage: '', showTutorial: true },
    dashboard: { showFeaturedPath: true, featuredPathId: '', showPremiumCard: true, premiumMessage: '' },
    visibility: { showCommunity: true, showCertificates: true, showProjects: true, showLeaderboard: true },
    maintenance: { isUnderMaintenance: false, maintenanceMessage: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'dashboard' | 'visibility' | 'maintenance'>('general');

  useEffect(() => {
    const settingsRef = ref(db, 'settings');
    const unsubscribe = onValue(settingsRef, (snapshot) => {
      if (snapshot.exists()) {
        setSettings(snapshot.val());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await set(ref(db, 'settings'), settings);
      alert('Platform settings updated successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-400" />
            Platform Settings
          </h1>
          <p className="text-gray-400">Configure global platform behavior, visibility, and messaging.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save All Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tabs */}
        <div className="space-y-2">
          {[
            { id: 'general', label: 'General & Onboarding', icon: MessageSquare },
            { id: 'dashboard', label: 'Dashboard Config', icon: Layout },
            { id: 'visibility', label: 'Section Visibility', icon: Eye },
            { id: 'maintenance', label: 'Maintenance Mode', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all border ${
                activeTab === tab.id 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-8"
            >
              {activeTab === 'general' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Onboarding Experience</h3>
                      <p className="text-sm text-gray-500">Customize the first-time user experience.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Welcome Message</label>
                      <textarea 
                        rows={4}
                        value={settings.onboarding.welcomeMessage}
                        onChange={(e) => setSettings({ ...settings, onboarding: { ...settings.onboarding, welcomeMessage: e.target.value } })}
                        placeholder="Welcome to MentorStack! Let's start your journey..."
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <div>
                          <p className="text-sm font-bold text-white">Show Tutorial</p>
                          <p className="text-xs text-gray-500">Display the interactive tutorial for new users.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSettings({ ...settings, onboarding: { ...settings.onboarding, showTutorial: !settings.onboarding.showTutorial } })}
                        className={`w-12 h-6 rounded-full transition-all relative ${settings.onboarding.showTutorial ? 'bg-blue-600' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.onboarding.showTutorial ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Dashboard Configuration</h3>
                      <p className="text-sm text-gray-500">Manage cards and featured content on the user dashboard.</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-yellow-400" />
                          <p className="text-sm font-bold text-white">Show Featured Path</p>
                        </div>
                        <button 
                          onClick={() => setSettings({ ...settings, dashboard: { ...settings.dashboard, showFeaturedPath: !settings.dashboard.showFeaturedPath } })}
                          className={`w-12 h-6 rounded-full transition-all relative ${settings.dashboard.showFeaturedPath ? 'bg-blue-600' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.dashboard.showFeaturedPath ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Featured Path ID</label>
                        <input 
                          type="text" 
                          value={settings.dashboard.featuredPathId}
                          onChange={(e) => setSettings({ ...settings, dashboard: { ...settings.dashboard, featuredPathId: e.target.value } })}
                          placeholder="e.g. full-stack-dev"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-blue-400" />
                          <p className="text-sm font-bold text-white">Show Premium Card</p>
                        </div>
                        <button 
                          onClick={() => setSettings({ ...settings, dashboard: { ...settings.dashboard, showPremiumCard: !settings.dashboard.showPremiumCard } })}
                          className={`w-12 h-6 rounded-full transition-all relative ${settings.dashboard.showPremiumCard ? 'bg-blue-600' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.dashboard.showPremiumCard ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Premium Message</label>
                        <textarea 
                          rows={3}
                          value={settings.dashboard.premiumMessage}
                          onChange={(e) => setSettings({ ...settings, dashboard: { ...settings.dashboard, premiumMessage: e.target.value } })}
                          placeholder="Unlock all paths and certificates with MentorStack Pro."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all resize-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visibility' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
                      <Eye className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Section Visibility</h3>
                      <p className="text-sm text-gray-500">Toggle platform features on or off globally.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'showCommunity', label: 'Community Section', icon: Globe },
                      { id: 'showCertificates', label: 'Certificates System', icon: ShieldCheck },
                      { id: 'showProjects', label: 'Project Submissions', icon: Layout },
                      { id: 'showLeaderboard', label: 'Global Leaderboard', icon: TrendingUp },
                    ].map((item) => (
                      <div key={item.id} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-400" />
                          <p className="text-sm font-bold text-white">{item.label}</p>
                        </div>
                        <button 
                          onClick={() => setSettings({ 
                            ...settings, 
                            visibility: { 
                              ...settings.visibility, 
                              [item.id]: !settings.visibility[item.id as keyof typeof settings.visibility] 
                            } 
                          })}
                          className={`w-12 h-6 rounded-full transition-all relative ${settings.visibility[item.id as keyof typeof settings.visibility] ? 'bg-blue-600' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.visibility[item.id as keyof typeof settings.visibility] ? 'right-1' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'maintenance' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-red-500/10 text-red-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">Temporarily disable platform access for updates.</p>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="font-bold text-white">Enable Maintenance Mode</p>
                          <p className="text-sm text-gray-500">Users will see a maintenance message and won't be able to log in.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSettings({ ...settings, maintenance: { ...settings.maintenance, isUnderMaintenance: !settings.maintenance.isUnderMaintenance } })}
                        className={`w-14 h-7 rounded-full transition-all relative ${settings.maintenance.isUnderMaintenance ? 'bg-red-600' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${settings.maintenance.isUnderMaintenance ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Maintenance Message</label>
                      <textarea 
                        rows={3}
                        value={settings.maintenance.maintenanceMessage}
                        onChange={(e) => setSettings({ ...settings, maintenance: { ...settings.maintenance, maintenanceMessage: e.target.value } })}
                        placeholder="MentorStack is currently undergoing scheduled maintenance. We'll be back shortly!"
                        className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-red-500/50 outline-none transition-all resize-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
