import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, CreditCard, Lock, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui';
import { LoadingScreen } from '../components/LoadingScreen';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserData';
import { ref, push, set, get } from 'firebase/database';
import { db } from '../lib/firebase';
import { PaymentRecord } from '../types';

export const SubscriptionPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { updateProgress } = useUserData();
  const navigate = useNavigate();
  const [checkingPayment, setCheckingPayment] = useState(true);
  const [existingPayment, setExistingPayment] = useState<PaymentRecord | null>(null);

  const status = profile?.progress?.subscription_status;
  const isPending = status === 'pending';
  const isActive = status === 'active';

  useEffect(() => {
    const checkExistingPayments = async () => {
      if (!user) {
        setCheckingPayment(false);
        return;
      }

      try {
        const paymentsRef = ref(db, 'payments');
        // Fetch all payments and filter on client to avoid "Index not defined" error
        // as we don't have direct access to database.rules.json in this environment
        const snapshot = await get(paymentsRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const paymentsList = Object.values(data) as PaymentRecord[];
          const userPayments = paymentsList.filter(p => p.user_id === user.uid);
          
          // Use subscription_reference from profile for precise matching
          const currentRef = profile?.progress?.subscription_reference;
          const specificPayment = currentRef ? userPayments.find(p => p.payment_reference === currentRef) : null;
          
          if (specificPayment) {
            setExistingPayment(specificPayment);
          } else {
            // Fallback: Find any active or pending record
            const activeOrPending = userPayments.find(p => ['initiated', 'paid_pending_verification', 'approved'].includes(p.status));
            if (activeOrPending) {
              setExistingPayment(activeOrPending);
            }
          }
        }
      } catch (err) {
        console.error("Error checking payments:", err);
      }
      setCheckingPayment(false);
    };

    checkExistingPayments();
  }, [user]);

  useEffect(() => {
    if (isActive) {
      // If active, we still let them see the "already active" state if they hit this page, 
      // but usually the guard will allow them back to dashboard.
    }
  }, [isActive]);

  const handlePaymentClick = async () => {
    if (!user) return;

    // Check if we already have a payment to prevent duplicates
    if (existingPayment && ['initiated', 'paid_pending_verification', 'approved'].includes(existingPayment.status)) {
      alert("You already have an active or pending subscription request.");
      return;
    }

    try {
      // Generate a unique payment reference for this specific transaction
      const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
      const internalRef = `MS-${user.uid.substring(0, 4)}-${randomSuffix}`;

      const paymentsRef = ref(db, 'payments');
      const newPaymentRef = push(paymentsRef);
      const paymentData: PaymentRecord = {
        id: newPaymentRef.key!,
        user_id: user.uid,
        email: user.email || '',
        amount: 5000,
        status: 'initiated',
        payment_source: 'selar',
        timestamp: Date.now(),
        reference_id: `SELAR_PENDING_${Date.now()}`,
        payment_reference: internalRef // Unique ID generated before payment
      };
      
      // Store in payments and also bind to user profile for quick matching
      await set(newPaymentRef, paymentData);
      await updateProgress({ 
        subscription_reference: internalRef 
      });
      
      setExistingPayment(paymentData);
    } catch (err) {
      console.error("Error tracking payment initiation:", err);
    }

    // Direct to Selar
    window.open('https://selar.com/73766131m1', '_blank');
  };

  const handleConfirmPayment = async () => {
    const refId = window.prompt('Please enter your Selar Payment Reference ID:');
    if (!refId) return;

    if (user && existingPayment) {
      try {
        // Update the existing "initiated" record instead of creating a new one
        const paymentRef = ref(db, `payments/${existingPayment.id}`);
        await set(paymentRef, {
          ...existingPayment,
          status: 'paid_pending_verification',
          reference_id: refId,
          timestamp: Date.now()
        });
        
        await updateProgress({ subscription_status: 'pending' });
        
        // Refresh local state
        setExistingPayment({
          ...existingPayment,
          status: 'paid_pending_verification',
          reference_id: refId,
          timestamp: Date.now()
        });
        
        alert('Payment verification request submitted! Our admins will review it shortly.');
      } catch (err) {
        console.error("Error submitting verification request:", err);
      }
    }
  };

  if (checkingPayment) {
    return <LoadingScreen message="Checking subscription state..." />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
            <Shield size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">MentorStack Access Control</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">Career Mastery</span>
          </h1>
          <p className="text-lg text-white/40 max-w-lg mx-auto">
            You are currently locked out of our elite content. Activate your subscription to unlock roadmaps, projects, and AI mentoring.
          </p>
        </div>

        {isActive ? (
          <div className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase italic text-emerald-400">Subscription Active</h3>
              <p className="text-white/40">
                Welcome back! Your MentorStack subscription is active and you have full access to all elite content.
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')} fullWidth size="lg" className="rounded-2xl">
              Go to Dashboard
            </Button>
          </div>
        ) : isPending ? (
          <div className="p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-xl text-center space-y-6">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
              <Zap size={40} className="text-amber-500 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase italic">Waiting for Approval</h3>
              <p className="text-white/40">
                Your payment was received. Our team is manually verifying your access. 
                This usually takes less than 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '10%' }}
                  animate={{ width: '70%' }}
                  className="h-full bg-amber-500"
                />
              </div>
              <p className="text-[10px] uppercase font-black tracking-widest text-amber-500/60">Verification in progress...</p>
            </div>
          </div>
        ) : existingPayment ? (
          <div className="p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-xl text-center space-y-6">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto border border-amber-500/20">
              <AlertCircle size={40} className="text-amber-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic uppercase italic">Request in Progress</h3>
              <p className="text-white/40">
                You already have an active or pending subscription request in our system.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Internal Reference</p>
                <p className="text-lg font-mono font-black text-emerald-400">{existingPayment.payment_reference || 'NO_REF'}</p>
              </div>
              <p className="text-[10px] text-white/20 font-mono uppercase">Selar ID: {existingPayment.reference_id}</p>
            </div>
            <div className="flex flex-col gap-4">
              {existingPayment.status === 'initiated' && (
                <button 
                  onClick={handleConfirmPayment}
                  className="text-emerald-400 font-black uppercase text-xs tracking-widest hover:underline"
                >
                  Already paid? Enter Selar Receipt ID
                </button>
              )}
              <Button variant="outline" onClick={() => window.open('https://selar.com/73766131m1', '_blank')} className="rounded-xl h-12">
                Retry Payment Page
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-2xl space-y-8 overflow-hidden">
                {/* Feature List */}
                <div className="space-y-4">
                  {[
                    "Unrestricted Access to 50+ Career Paths",
                    "Deep Modular Lessons powered by Gemini 2.0",
                    "Professional Project Portfolio Builder",
                    "24/7 AI Coding Mentor Access",
                    "Industry Recognized Certificates",
                    "Job Readiness & Career Prep Library"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                      </div>
                      <span className="text-sm text-white/60 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 space-y-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black tracking-tight">Full Access</span>
                    <span className="text-white/40 text-sm mb-2 font-medium">/ Lifetime Membership</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button 
                      fullWidth 
                      size="lg" 
                      onClick={handlePaymentClick}
                      className="h-20 text-lg font-black uppercase tracking-widest rounded-2xl bg-white text-black hover:bg-white/90 group"
                    >
                      Unlock Now
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <button 
                      onClick={handleConfirmPayment}
                      className="text-emerald-400/60 hover:text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] transition-colors py-2"
                    >
                      Already paid? Tap here to verify
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-center uppercase tracking-widest text-white/20 font-black">
                    Secure checkout via Selar
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-xs text-white/20 font-medium">
            Contact support@mentorstack.academy if you have questions about your access.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
