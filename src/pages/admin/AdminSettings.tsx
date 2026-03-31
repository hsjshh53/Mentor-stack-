import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Shield, 
  Globe, 
  Bell, 
  Database, 
  Cpu, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { getPlatformSettings, updatePlatformSettings } from '../../services/adminService';

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getPlatformSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePlatformSettings(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'General', icon: Globe },
    { id: 'Security', icon: Shield },
    { id: 'Notifications', icon: Bell },
    { id: 'System', icon: Cpu },
    { id: 'Database', icon: Database },
  ];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 className="animate-spin mb-4" size={40} />
          <p>Loading settings...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
            <p className="text-gray-400 mt-2">Configure platform-wide settings and system parameters.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1 space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id 
                    ? 'bg-green-500 text-black font-bold' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon size={20} />
                {tab.id}
              </button>
            ))}
          </div>

          {/* Main Settings Area */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#121214] border border-white/5 rounded-2xl p-8 space-y-8"
            >
              {activeTab === 'General' && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">General Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Platform Name</label>
                        <input 
                          type="text" 
                          value={settings.platformName} 
                          onChange={e => setSettings({...settings, platformName: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Support Email</label>
                        <input 
                          type="email" 
                          value={settings.supportEmail} 
                          onChange={e => setSettings({...settings, supportEmail: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Maintenance Mode</h3>
                    <div className="flex items-center justify-between p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="text-yellow-500" size={24} />
                        <div>
                          <p className="font-bold">Enable Maintenance Mode</p>
                          <p className="text-sm text-gray-400">Only administrators will be able to access the platform.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenanceMode ? 'bg-yellow-500' : 'bg-white/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Security' && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold">Security Policies</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="font-bold">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400">Require 2FA for all administrator accounts.</p>
                        </div>
                        <button 
                          onClick={() => setSettings({...settings, twoFactorAuth: !settings.twoFactorAuth})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-green-500' : 'bg-white/10'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div>
                          <p className="font-bold">Session Timeout</p>
                          <p className="text-sm text-gray-400">Automatically logout inactive users after 30 minutes.</p>
                        </div>
                        <button 
                          onClick={() => setSettings({...settings, sessionTimeout: !settings.sessionTimeout})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.sessionTimeout ? 'bg-green-500' : 'bg-white/10'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-black transition ${settings.sessionTimeout ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'System' && (
                <div className="flex items-center justify-center py-20 text-gray-500 italic">
                  System configuration options will appear here.
                </div>
              )}
              
              {activeTab === 'Notifications' && (
                <div className="flex items-center justify-center py-20 text-gray-500 italic">
                  Notification settings will appear here.
                </div>
              )}

              {activeTab === 'Database' && (
                <div className="flex items-center justify-center py-20 text-gray-500 italic">
                  Database management tools will appear here.
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
