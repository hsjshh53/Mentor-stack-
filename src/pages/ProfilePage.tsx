import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Settings, Shield, Bell, 
  CreditCard, HelpCircle, LogOut, 
  ChevronRight, Camera, Zap, Trophy, 
  Flame, BookOpen, Terminal, Target,
  ArrowLeft, Mail, MapPin, Link as LinkIcon,
  Twitter, Github, Award, ExternalLink, ShieldCheck,
  CheckCircle2, X, Star, Sparkles, Globe, Briefcase
} from 'lucide-react';
import { Card, Button, Badge, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { useUserData } from '../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { LoadingScreen } from '../components/LoadingScreen';
import { PremiumUpsell } from '../components/PremiumUpsell';
import { PaywallModal } from '../components/PaywallModal';
import { getUserCertificates } from '../services/certificateService';
import { Certificate } from '../types';

import { usePremiumStatus } from '../hooks/usePremiumStatus';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { progress, loading } = useUserData();
  const { isPremium, loading: premiumLoading } = usePremiumStatus();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    if (user) {
      getUserCertificates(user.uid).then(setCertificates);
    }
  }, [user]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [profileName, setProfileName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateProfileName } = useUserData();

  useEffect(() => {
    if (user?.displayName) setProfileName(user.displayName);
  }, [user]);

  if (loading || !progress) return <LoadingScreen />;

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      await updateProfileName(profileName);
      setActiveModal(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const stats = [
    { label: 'Streak', value: `${progress.streak} Days`, icon: <Flame size={20} fill="currentColor" />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'XP', value: progress.xp, icon: <Zap size={20} fill="currentColor" />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Level', value: progress.currentStage, icon: <Trophy size={20} fill="currentColor" />, color: 'text-indigo-400', bg: 'bg-indigo-400/10' }
  ];

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { id: 'personal', icon: <User size={20} />, label: 'Personal Information', desc: 'Update your name and profile photo' },
        { id: 'email', icon: <Mail size={20} />, label: 'Email & Password', desc: 'Manage your login credentials' },
        { id: 'privacy', icon: <Shield size={20} />, label: 'Privacy & Security', desc: 'Control your data and account safety' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications', desc: 'Manage your alerts and reminders' },
        { id: 'goals', icon: <Target size={20} />, label: 'Learning Goals', desc: 'Set your daily study targets' },
        { id: 'ide', icon: <Terminal size={20} />, label: 'IDE Settings', desc: 'Customize your coding environment' }
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', icon: <HelpCircle size={20} />, label: 'Help Center', desc: 'Get support and find answers' },
        { id: 'subscription', icon: <CreditCard size={20} />, label: 'Subscription', desc: 'Manage your premium benefits' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold text-lg tracking-tight">Profile</span>
        </div>
        <button 
          onClick={() => setActiveModal('personal')}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/40 active:scale-90"
        >
          <Settings size={20} />
        </button>
      </header>

      <main className="flex-grow overflow-y-auto pb-20">
        <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
          
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-white/20" />
                )}
              </div>
              <button 
                onClick={() => setActiveModal('personal')}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-110 transition-transform active:scale-90"
              >
                <Camera size={18} />
              </button>
            </div>

            <div className="space-y-4 flex-grow">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-4xl font-black tracking-tighter">{user?.displayName || 'Developer'}</h1>
                  {isPremium && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 size={14} fill="currentColor" />
                    </div>
                  )}
                </div>
                <p className="text-white/40 font-medium text-lg">{user?.email}</p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px]">
                  {progress.selectedPath || 'Full-Stack Developer'}
                </Badge>
                <Badge className="bg-white/5 text-white/40 border-white/10 px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px]">
                  Level {Math.floor(progress.xp / 100) + 1}
                </Badge>
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-black border-none px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-500/20">
                    PRO MEMBER
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Premium Status Card */}
          {!isPremium && (
            <Card className="p-8 border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] to-transparent relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={12} fill="currentColor" />
                    Unlock Your Potential
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Upgrade to MentorStack <span className="text-emerald-400">Pro</span></h3>
                  <p className="text-white/40 font-medium max-w-md">Get unlimited access to all 26+ career paths, AI-powered code reviews, and verified professional certificates.</p>
                </div>
                <Button 
                  variant="premium"
                  onClick={() => setActiveModal('subscription')}
                  className="h-14 px-10 rounded-2xl font-black tracking-tight shadow-xl shadow-emerald-500/20"
                >
                  Upgrade Now
                </Button>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
                <Zap size={200} fill="currentColor" />
              </div>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 flex flex-col items-center gap-3 bg-white/[0.02] border-white/5 text-center">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">{stat.label}</p>
                  <p className="font-bold text-lg">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Certificates Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">Professional Certifications</h3>
              {!isPremium && (
                <button 
                  onClick={() => setShowPaywall(true)}
                  className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline"
                >
                  Unlock All
                </button>
              )}
            </div>
            
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {certificates.map((cert) => (
                  <Card 
                    key={cert.id}
                    onClick={() => navigate(`/certificate/${cert.id}`)}
                    className="p-8 border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.03] to-transparent group cursor-pointer hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="flex gap-8 items-center relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                        <ShieldCheck size={32} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-emerald-500 text-black border-none text-[8px] font-black tracking-widest">{cert.tier}</Badge>
                          <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{new Date(cert.issueDate).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-black text-xl tracking-tight group-hover:text-emerald-400 transition-colors">{cert.pathName}</h4>
                        <div className="flex items-center gap-2 text-emerald-500/60 text-[10px] font-black uppercase tracking-widest">
                          <CheckCircle2 size={12} />
                          Verified Credential
                        </div>
                      </div>
                      <div className="ml-auto">
                        <ChevronRight size={24} className="text-white/10 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                      <Award size={140} />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card 
                onClick={() => setShowPaywall(true)}
                className="p-12 border-dashed border-white/10 bg-white/[0.01] text-center space-y-6 group cursor-pointer hover:border-emerald-500/30 transition-all"
              >
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10 mx-auto group-hover:text-emerald-500/50 transition-colors">
                  <Award size={40} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-xl">No Certificates Yet</h4>
                  <p className="text-sm text-white/40 max-w-xs mx-auto leading-relaxed">
                    Complete a career path to earn your first verified professional certificate.
                  </p>
                </div>
                {!isPremium && (
                  <Button variant="outline" className="h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 group-hover:border-emerald-500/50">
                    Unlock Verified Certificates
                  </Button>
                )}
              </Card>
            )}
          </div>

          {/* Portfolio & Trust Section */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.2em] px-2">Portfolio & Trust</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 space-y-4 bg-white/[0.01] border-white/5 hover:border-emerald-500/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <Globe size={20} />
                  </div>
                  <h4 className="font-bold tracking-tight">Public Portfolio</h4>
                </div>
                <p className="text-sm text-white/40 font-medium">Your public profile is currently <span className="text-emerald-400">active</span> and visible to recruiters.</p>
                <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-black uppercase tracking-widest border-white/10 hover:bg-white/5">
                  View Portfolio <ExternalLink size={14} className="ml-2" />
                </Button>
              </Card>
              <Card className="p-6 space-y-4 bg-white/[0.01] border-white/5 hover:border-emerald-500/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <Briefcase size={20} />
                  </div>
                  <h4 className="font-bold tracking-tight">Job Readiness</h4>
                </div>
                <p className="text-sm text-white/40 font-medium">Complete <span className="text-white font-bold">3 more projects</span> to unlock job placement assistance.</p>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-orange-500" />
                </div>
              </Card>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-black text-white/20 uppercase tracking-[0.2em] px-2">{section.title}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {section.items.map((item) => (
                    <Card 
                      key={item.id}
                      onClick={() => setActiveModal(item.id)}
                      className="p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all border-white/5 active:scale-[0.98]"
                    >
                      <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-all">
                          {item.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">{item.label}</h4>
                          <p className="text-sm text-white/40">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-white/10 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="pt-8 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full h-16 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-400 font-bold flex items-center justify-center gap-3 hover:bg-red-500/10 transition-all active:scale-[0.98]"
            >
              <LogOut size={20} />
              Sign Out from MentorStack
            </button>
          </div>

        </div>
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-[#0A0A0B] border border-white/[0.08] rounded-[3rem] p-10 overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black tracking-tight">
                  {sections.flatMap(s => s.items).find(i => i.id === activeModal)?.label || 'Settings'}
                </h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                  <X size={24} className="text-white/40" />
                </button>
              </div>

              <div className="space-y-6">
                {activeModal === 'personal' && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center gap-6 mb-8">
                       <div className="relative group">
                        <div className="w-24 h-24 rounded-[2rem] bg-white/5 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                          {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User size={40} className="text-white/20" />
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 p-2 rounded-lg bg-emerald-500 text-black">
                          <Camera size={14} />
                        </div>
                      </div>
                    </div>
                    <Input 
                      label="Full Name"
                      placeholder="e.g. Ajia Abdulrasak Olayinka"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                    <div className="pt-4">
                      <Button 
                        fullWidth 
                        onClick={handleUpdateProfile}
                        disabled={isUpdating}
                        className="h-14 rounded-2xl"
                      >
                        {isUpdating ? 'Saving Changes...' : 'Save Profile Changes'}
                      </Button>
                    </div>
                  </div>
                )}

                {activeModal === 'subscription' && !isPremium ? (
                  <div className="space-y-8">
                    <PremiumUpsell />
                  </div>
                ) : (
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-dashed border-white/10 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mx-auto">
                      <Zap size={32} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">Feature Coming Soon</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        We're currently polishing the {sections.flatMap(s => s.items).find(i => i.id === activeModal)?.label?.toLowerCase() || 'this'} settings. This will be available in the next update!
                      </p>
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={() => setActiveModal(null)}
                  fullWidth 
                  className="h-14 rounded-2xl"
                >
                  Got it
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <PaywallModal 
        isOpen={showPaywall} 
        onClose={() => setShowPaywall(false)}
        title="Verified Certificates"
        description="Earn credentials that employers trust. Unlock professional certificates with MentorStack Pro."
      />
    </div>
  );
};
