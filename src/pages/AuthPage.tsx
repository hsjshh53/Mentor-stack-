import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { Zap, Github, Mail, Lock } from 'lucide-react';

export const AuthPage: React.FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const navigate = useNavigate();
  const { signInWithGoogle, signInWithGithub } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithGithub();
      navigate('/dashboard');
    } catch (err) {
      console.error('Auth failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-8">
      <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
          <Zap size={20} fill="currentColor" />
        </div>
        <span className="font-black text-2xl tracking-tighter">MentorStack</span>
      </div>

      <Card className="p-10 w-full max-w-md space-y-8 border-white/[0.05] bg-white/[0.01]">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tighter">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-white/40 text-sm font-medium">Continue your learning journey today.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => handleSocialAuth('google')}
            className="w-full py-4 rounded-xl bg-white text-black font-black flex items-center justify-center gap-3 hover:bg-white/90 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          <button 
            onClick={() => handleSocialAuth('github')}
            className="w-full py-4 rounded-xl bg-white/5 text-white border border-white/10 font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
          >
            <Github size={20} />
            Continue with GitHub
          </button>
        </div>

        <div className="flex items-center gap-4 text-white/10">
          <div className="flex-grow h-px bg-white/5" />
          <span className="text-[10px] font-black uppercase tracking-widest">or</span>
          <div className="flex-grow h-px bg-white/5" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
          </div>
          <Button className="w-full py-4 text-lg shadow-lg shadow-emerald-500/20">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </div>

        <p className="text-center text-sm text-white/30 font-medium">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => navigate(mode === 'login' ? '/signup' : '/login')}
            className="text-emerald-400 font-black hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </Card>
    </div>
  );
};
