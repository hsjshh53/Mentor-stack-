import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, CheckCircle2, CreditCard, Lock, ArrowRight, Zap, AlertCircle, Landmark, 
  Upload, Image as ImageIcon, HelpCircle, RefreshCcw, RotateCcw, Crown, Star, 
  Trophy, Users, Target, MessageCircle, FileCheck, Rocket, CreditCard as PaymentIcon,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui';
import { LoadingScreen } from '../components/LoadingScreen';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../hooks/useUserData';
import { firebaseSafeOnValue, firebaseSafeGet, firebaseSafeUpdate, firebaseSafeSet, firebaseUserScopedQuery } from '../lib/FirebaseService';
import { auth, db } from '../lib/firebase';
import { ref, push } from 'firebase/database';
import { PaymentRecord, ReceiptRecord } from '../types';

export const SubscriptionPage: React.FC = () => {
  const { user, profile, profileReady, adminReady, isAdmin } = useAuth();
  const { updateProgress } = useUserData();
  const navigate = useNavigate();
  const [checkingPayment, setCheckingPayment] = useState(true);
  const [existingPayment, setExistingPayment] = useState<PaymentRecord | null>(null);
  const [existingReceipt, setExistingReceipt] = useState<ReceiptRecord | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'bank'>('online');
  const [uploading, setUploading] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  
  const isPending = paymentStatus === 'paid_pending_verification' || paymentStatus === 'initiated' || (existingReceipt?.status === 'pending');
  const isActive = paymentStatus === 'approved' || (
    profile?.progress?.subscription_status === 'active' && 
    profile?.progress?.subscription_expiry && 
    profile.progress.subscription_expiry > Date.now()
  );

  useEffect(() => {
    if ((isAdmin || isActive) && !checkingPayment && profileReady && adminReady) {
      navigate('/dashboard');
    }
  }, [isAdmin, isActive, checkingPayment, navigate, profileReady, adminReady]);

  useEffect(() => {
    if (!user || !profileReady) {
      if (profileReady) setCheckingPayment(false);
      return;
    }

    console.log("[SubscriptionShield] Syncing premium status...");
    
    // SYNC SOURCE OF TRUTH: payments collection
    const paymentsQuery = firebaseUserScopedQuery('payments', user.uid);

    const unsubscribe = firebaseSafeOnValue(paymentsQuery, (data: any) => {
      console.log("[SubscriptionShield] Payment stream updated.");
      if (data) {
        const paymentsList = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        })) as PaymentRecord[];
        
        const sorted = paymentsList.sort((a, b) => b.timestamp - a.timestamp);
        const approved = sorted.find(p => p.status === 'approved');
        const activeOrPending = approved || sorted.find(p => ['initiated', 'paid_pending_verification'].includes(p.status));
        
        if (activeOrPending) {
          setExistingPayment(activeOrPending);
          setPaymentStatus(activeOrPending.status);
          console.log("[SubscriptionShield] Status resolved:", activeOrPending.status);
        } else {
          setPaymentStatus(null);
          setExistingPayment(null);
        }
      } else {
        setPaymentStatus(null);
        setExistingPayment(null);
      }
      setCheckingPayment(false);
    }, "UserPayments");

    // Check Receipts
    const receiptsQuery = firebaseUserScopedQuery('receipts', user.uid);
    
    firebaseSafeGet(receiptsQuery, "UserReceipts").then(data => {
      if (data) {
        const receiptsList = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        })) as ReceiptRecord[];
        
        const userReceipt = receiptsList.find(r => r.status === 'pending' || r.status === 'approved');
        if (userReceipt) {
          console.log("[SubscriptionShield] Receipt found.");
          setExistingReceipt(userReceipt);
        }
      }
    }).catch(error => {
      console.error("[SubscriptionShield] Receipts lookup error:", error.message);
    });

    return () => {
      console.log("[SubscriptionShield] Terminating status monitor.");
      unsubscribe();
    };
  }, [user, profileReady]);

  const logDiagnostic = async (buttonName: string, status: 'action_started' | 'action_success' | 'failed', details?: any) => {
    console.log(`[Payment Diagnostics] Button: ${buttonName} | State: ${status} | User: ${user?.email}`, details || '');
    
    // Audit logging for critical payment steps
    const auditData = {
      button_name: buttonName,
      user_uid: user?.uid,
      user_email: user?.email,
      timestamp: Date.now(),
      status,
      details: details ? JSON.stringify(details) : null
    };

    await firebaseSafeUpdate(`payment_audit_logs/${Date.now()}`, auditData, "PaymentAuditLog");
  };

  const handleRestart = async () => {
    if (!user) return;
    if (isActive) return;

    const confirmMsg = existingReceipt?.status === 'pending' 
      ? "You already have a receipt under review. Restarting will cancel the current request and allow you to upload a corrected one. Continue?"
      : "Are you sure you want to start over? Your current payment progress will be reset.";

    if (!window.confirm(confirmMsg)) return;

    logDiagnostic('Restart Payment Flow', 'action_started');

    try {
      const updates: any = {};
      
      if (existingPayment && existingPayment.status !== 'approved') {
        updates[`payments/${existingPayment.id}/status`] = 'cancelled';
        updates[`payments/${existingPayment.id}/cancelled_at`] = Date.now();
      }

      if (existingReceipt && existingReceipt.status !== 'approved') {
        updates[`receipts/${existingReceipt.id}/status`] = 'cancelled';
        updates[`receipts/${existingReceipt.id}/cancelled_at`] = Date.now();
      }

      if (Object.keys(updates).length > 0) {
        await firebaseSafeUpdate("/", updates, "RestartPaymentFlow");
      }

      setExistingPayment(null);
      setExistingReceipt(null);
      setReceiptPreview(null);
      logDiagnostic('Restart Payment Flow', 'action_success');
      alert("Payment process restarted.");
    } catch (err: any) {
      logDiagnostic('Restart Payment Flow', 'failed', err.message);
      console.error("Error restarting flow:", err);
      alert(`Restart failed: ${err.message}`);
    }
  };

  const handlePaymentClick = async () => {
    if (!user) {
      alert("Please log in to continue.");
      return;
    }

    if (existingPayment && ['initiated', 'paid_pending_verification', 'approved'].includes(existingPayment.status)) {
      alert("A payment process is already in progress.");
      return;
    }

    logDiagnostic('Initiate Selar Payment', 'action_started');

    try {
      const randomSuffix = Math.random().toString(36).substring(2, 10).toUpperCase();
      const internalRef = `MS-${user.uid.substring(0, 4)}-${randomSuffix}`;

      const paymentsRef = ref(db, 'payments');
      const newPaymentRef = push(paymentsRef);
      const paymentData: PaymentRecord = {
        id: newPaymentRef.key!,
        user_id: user.uid,
        email: user.email || '',
        amount: 10000,
        status: 'initiated',
        payment_source: 'selar',
        timestamp: Date.now(),
        reference_id: `SELAR_PENDING_${Date.now()}`,
        payment_reference: internalRef
      };
      
      const success = await firebaseSafeSet(`payments/${newPaymentRef.key}`, paymentData, "InitiatePayment");
      if (success) {
        setExistingPayment(paymentData);
        logDiagnostic('Initiate Selar Payment', 'action_success', { paymentId: newPaymentRef.key });
        window.open('https://selar.com/73766131m1', '_blank');
      } else {
        throw new Error("Initialization failed at database level");
      }
    } catch (err: any) {
      logDiagnostic('Initiate Selar Payment', 'failed', err.message);
      console.error("Payment error:", err);
      alert(`Initialization failed: ${err.message}`);
    }
  };

  const handleConfirmPayment = async () => {
    logDiagnostic('Confirm Payment (Manual)', 'action_started');
    const refId = window.prompt('Please enter your Selar Payment Reference ID:');
    if (!refId) {
      logDiagnostic('Confirm Payment (Manual)', 'failed', 'No reference ID provided by user');
      return;
    }

    if (user && existingPayment) {
      try {
        const updateData = {
          ...existingPayment,
          status: 'paid_pending_verification',
          reference_id: refId,
          timestamp: Date.now()
        };
        const success = await firebaseSafeSet(`payments/${existingPayment.id}`, updateData, "ConfirmPaymentManual");
        
        if (success) {
          setExistingPayment(updateData as PaymentRecord);
          logDiagnostic('Confirm Payment (Manual)', 'action_success', { refId });
          alert('Payment verification request submitted!');
        }
      } catch (err: any) {
        logDiagnostic('Confirm Payment (Manual)', 'failed', err.message);
        console.error("Verification error:", err);
        alert(`Verification submission failed: ${err.message}`);
      }
    } else {
      logDiagnostic('Confirm Payment (Manual)', 'failed', 'No existing payment context found');
      alert("No active payment session found. Please start a new payment first.");
    }
  };

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    logDiagnostic('Upload Receipt', 'action_started', { fileName: file.name, fileSize: file.size });

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      setReceiptPreview(base64String);
      try {
        const receiptsRef = ref(db, 'receipts');
        const newReceiptRef = push(receiptsRef);
        const receiptData: ReceiptRecord = {
          id: newReceiptRef.key!,
          user_id: user.uid,
          email: user.email || '',
          image_url: base64String,
          amount_entered: 10000,
          status: 'pending',
          timestamp: Date.now()
        };
        const success = await firebaseSafeSet(`receipts/${newReceiptRef.key}`, receiptData, "UploadReceipt");
        if (success) {
          setExistingReceipt(receiptData);
          logDiagnostic('Upload Receipt', 'action_success', { receiptId: newReceiptRef.key });
          alert('Receipt uploaded! Verification usually takes less than 24 hours.');
        }
      } catch (err: any) {
        logDiagnostic('Upload Receipt', 'failed', err.message);
        console.error("Upload error:", err);
        alert(`Upload failed: ${err.message}`);
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      logDiagnostic('Upload Receipt', 'failed', 'FileReader error');
      setUploading(false);
      alert("Could not read file. Please try a different image.");
    };
    reader.readAsDataURL(file);
  };

  if (checkingPayment || isAdmin) {
    return <LoadingScreen message="Validating premium access..." />;
  }

  const benefits = [
    { icon: Rocket, label: 'Full Access to 50+ Career Paths', desc: 'From Web Dev to Data Science and AI.' },
    { icon: Star, label: 'AI Coding Mentor Assistant', desc: 'Real-time help with your code anytime.' },
    { icon: Target, label: 'Structured Roadmaps', desc: 'A clear path from beginner to professional.' },
    { icon: Trophy, label: 'Real-World Projects', desc: 'Build a portfolio that gets you hired.' },
    { icon: FileCheck, label: 'Industry Recognized Certificates', desc: 'Validate your skills with verifiable digital certs.' },
    { icon: Users, label: 'Career Growth Resources', desc: 'Job readiness and interview prep included.' }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 backdrop-blur-sm">
            <Crown size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">MentorStack Premium</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Career Mastery</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Unlock your full coding academy experience with AI guidance, projects, career roadmaps, and premium learning tools.
          </p>
        </motion.div>

        {isActive ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl p-10 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 backdrop-blur-3xl text-center space-y-8 shadow-2xl shadow-blue-500/10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <div className="relative w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
                <CheckCircle2 size={40} className="text-blue-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white">Premium Access Active</h3>
              <p className="text-slate-400 font-medium">
                Your subscription is active. Welcome to the elite tier of MentorStack members.
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')} fullWidth size="lg" className="rounded-2xl h-16 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 border-none font-bold text-lg">
              Go to Dashboard
            </Button>
          </motion.div>
        ) : isPending ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl p-10 rounded-[2.5rem] border border-amber-500/20 bg-amber-500/5 backdrop-blur-3xl text-center space-y-8 shadow-2xl shadow-amber-500/5"
          >
            <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Zap size={40} className="text-amber-500 animate-pulse" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white uppercase italic">Verification Pending</h3>
              <p className="text-slate-400 font-medium leading-relaxed">
                {existingReceipt ? "Receipt uploaded successfully. Your payment is awaiting manual confirmation." : "Payment received and under review."}
                This usually takes less than 24 hours.
              </p>
            </div>
            <div className="p-6 bg-amber-500/10 rounded-2xl border border-amber-500/10">
               <p className="text-[10px] uppercase font-black tracking-widest text-amber-500 mb-3">Verification Progress</p>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: '10%' }} animate={{ width: '70%' }} className="h-full bg-amber-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-4">
              <Button variant="outline" onClick={handleRestart} className="h-14 rounded-xl border-white/5 bg-white/5 text-white/60 hover:bg-white/10 flex items-center justify-center gap-2">
                <RefreshCcw size={16} />
                Upload Corrected Receipt
              </Button>
              <button onClick={handleRestart} className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                Try Again / Restart
              </button>
              <button 
                onClick={() => navigate('/support')}
                className="flex items-center justify-center gap-2 text-xs font-bold text-blue-400 border-t border-white/5 pt-6 mt-2"
              >
                <MessageCircle size={16} />
                Need help? Contact Support
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
            {/* Left Column: Benefits & Trust */}
            <div className="space-y-12">
              {/* Pricing Card */}
              <div className="p-8 lg:p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <Crown size={80} />
                </div>
                <div className="relative z-10 space-y-6">
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-100/60 mb-2">Selected Plan</h2>
                    <p className="text-3xl font-black text-white">MentorStack Monthly Premium</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tighter text-white">₦10,000</span>
                    <span className="text-blue-100/60 font-bold">/ Month</span>
                  </div>
                  <p className="text-blue-100/40 text-sm font-medium">Renews monthly unless cancelled. Non-refundable after activation.</p>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 w-fit">
                   <Sparkles size={14} className="text-blue-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/60">For only <span className="text-white">₦10,000 monthly</span>, get:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                  >
                    <benefit.icon size={24} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-black text-white mb-1">{benefit.label}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
                </div>
              </div>

              {/* Trust Section */}
              <div className="pt-8 border-t border-white/5 space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">Trusted Payment Partners</h4>
                 <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex items-center gap-2">
                      <Shield size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Encrypted Data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Manual Audit</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Payment Flow */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full" />
              <div className="relative p-8 lg:p-10 rounded-[3rem] border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl space-y-10 border-t-white/20">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-white italic">Choose Payment Method</h3>
                  <p className="text-slate-400 text-sm font-medium">Safe & secure Nigerian payment options.</p>
                </div>

                {/* Method Selector */}
                <div className="grid grid-cols-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
                  <button 
                    onClick={() => setPaymentMethod('online')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'online' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                  >
                    <PaymentIcon size={14} />
                    Online (Selar)
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('bank')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'bank' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 hover:text-white'}`}
                  >
                    <Landmark size={14} />
                    Bank Transfer
                  </button>
                </div>

                {paymentMethod === 'online' ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                          <Lock size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-blue-400">Secure Online Payment</p>
                          <p className="text-xl font-black text-white">Amount: ₦10,000</p>
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                        Pay with your ATM Card, Bank Transfer, or USSD via Selar's secure gateway. Access is typically manual, but verification is fast.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <Button 
                        fullWidth 
                        size="lg" 
                        onClick={handlePaymentClick}
                        className="h-20 bg-white text-black hover:bg-slate-100 rounded-2.5xl font-black text-lg uppercase tracking-widest group shadow-2xl flex items-center justify-center gap-3"
                      >
                        Pay with Card / Selar
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </Button>

                      <div className="flex flex-col items-center gap-4">
                        <button 
                          onClick={handleConfirmPayment}
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Already Paid? Submit Ref ID
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-8 rounded-[2rem] bg-indigo-950/20 border border-indigo-500/20 space-y-6">
                       <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Amount to Pay</span>
                          <span className="text-xl font-black text-emerald-400">₦10,000</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Bank Name</span>
                          <span className="text-sm font-bold text-white">OPAY</span>
                       </div>
                       <div className="flex justify-between items-center border-b border-white/5 pb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Account #</span>
                          <span className="text-xl font-mono font-black text-white tracking-[0.1em]">9169492893</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Account Name</span>
                          <span className="text-sm font-bold text-white uppercase italic">ABDULRASAK OLAYINKA AJIA</span>
                       </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Instruction</p>
                       <p className="text-xs font-bold text-white">Transfer ₦10,000 exactly, then upload your payment receipt.</p>
                    </div>

                    <div className="space-y-6">
                      <input 
                        type="file" 
                        accept="image/*" 
                        id="receipt-upload" 
                        className="hidden" 
                        onChange={handleReceiptUpload}
                        disabled={uploading}
                      />
                      <label 
                        htmlFor="receipt-upload"
                        className={`w-full aspect-video rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group overflow-hidden ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {receiptPreview ? (
                          <div className="relative w-full h-full p-2 animate-in zoom-in-95">
                            <img src={receiptPreview} alt="Receipt Preview" className="w-full h-full object-contain rounded-2xl" />
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="px-4 py-2 rounded-full bg-white text-black text-[10px] font-black uppercase">Change Image</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-all">
                              <Upload size={24} />
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white mb-1">
                                {uploading ? 'Uploading Evidence...' : 'Upload Payment Receipt'}
                              </p>
                              <p className="text-[10px] text-slate-500 font-medium">JPEG, PNG only • Max 5MB</p>
                            </div>
                          </>
                        )}
                      </label>

                      <div className="flex flex-col gap-4">
                        <Button 
                          fullWidth 
                          size="lg" 
                          disabled={!receiptPreview || uploading}
                          className="h-16 bg-white text-black hover:bg-slate-100 rounded-2xl font-black uppercase tracking-widest"
                        >
                          {uploading ? 'Processing...' : 'I Have Paid'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shared Bottom Section */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                   <div className="flex flex-col items-center gap-4 text-center">
                      <p className="text-[10px] font-medium text-slate-500 italic max-w-[250px]">
                        Made a mistake? No problem. You can restart the process anytime.
                      </p>
                      <div className="flex gap-4">
                        <button onClick={handleRestart} className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors underline decoration-blue-500/30 underline-offset-4">Try Again</button>
                        <button onClick={handleRestart} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Change Method</button>
                      </div>
                   </div>

                   <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5 text-center space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">Need Help?</h4>
                      <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        Having issues with payment, receipt upload, or account access? Contact support anytime.
                      </p>
                      <button 
                        onClick={() => navigate('/support')}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors pt-2"
                      >
                        <HelpCircle size={14} />
                        Help & Support
                      </button>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 text-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">MentorStack Academic Excellence</p>
        </div>
      </div>
    </div>
  );
};
