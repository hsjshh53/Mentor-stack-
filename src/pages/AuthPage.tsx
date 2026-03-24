import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Input, Card } from '../components/ui';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const AuthPage: React.FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center px-6">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors">
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-white/50">{mode === 'login' ? 'Continue your coding journey' : 'Start your journey to becoming a developer'}</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <Button fullWidth type="submit" disabled={loading}>
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-white/40">
            {mode === 'login' ? (
              <p>Don't have an account? <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium">Sign up</Link></p>
            ) : (
              <p>Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium">Log in</Link></p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
