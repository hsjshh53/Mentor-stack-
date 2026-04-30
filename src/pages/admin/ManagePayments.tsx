import React, { useEffect, useState } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { PaymentRecord, UserProfile } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Card, Button, Badge } from '../../components/ui';
import { CreditCard, CheckCircle2, XCircle, Clock, ExternalLink, Search, RefreshCcw, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { isAdmin as checkAdmin } from '../../lib/adminCheck';

export const ManagePayments: React.FC = () => {
  const { profile, user: currentUser, refreshAuthToken } = useAuth();
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'cancelled'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [userContext, setUserContext] = useState<PaymentRecord[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Auto-clear feedback
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Permission check helper - strict source of truth
  const ALLOWED_ADMINS = ['hh5217924@gmail.com', 'harunabilikis8@gmail.com'];
  const isAdmin = currentUser?.email && (ALLOWED_ADMINS.includes(currentUser.email) || checkAdmin(currentUser) || profile?.is_admin);

  const checkAdminAuth = () => {
    if (!isAdmin) {
      setFeedback({ msg: "UNAUTHORIZED SOURCE DETECTED: ACCESS DENIED.", type: 'error' });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (selectedPayment) {
      const history = payments.filter(p => p.user_id === selectedPayment.user_id && p.id !== selectedPayment.id);
      setUserContext(history.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      setUserContext([]);
    }
  }, [selectedPayment, payments]);

  useEffect(() => {
    const paymentsRef = ref(db, 'payments');
    const unsubscribe = onValue(paymentsRef, (snapshot) => {
      console.log("[ManagePayments] PAYMENTS SNAPSHOT:", snapshot.val());
      try {
        if (snapshot.exists()) {
          const data = snapshot.val() || {};
          const paymentsList = Object.keys(data).map(key => ({
            ...data[key],
            id: key
          })) as PaymentRecord[];
          setPayments(paymentsList.sort((a, b) => b.timestamp - a.timestamp));
        } else {
          setPayments([]);
        }
      } catch (err) {
        console.error("[ManagePayments] Data mapping error:", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("[ManagePayments] Permission error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logStage = (recordId: string, stage: string, status: 'started' | 'success' | 'failed', error?: string) => {
    const logMsg = `[PAYMENT ENGINE] ID: ${recordId} | Stage: ${stage} | Status: ${status}${error ? ` | Error: ${error}` : ''}`;
    console.log(logMsg);
    
    // Optional: write to firebase audit
    const auditRef = ref(db, `payment_audit_logs/${Date.now()}`);
    update(auditRef, {
      record_id: recordId,
      stage,
      status,
      admin_email: currentUser?.email,
      timestamp: Date.now(),
      error: error || null
    }).catch(() => {});
  };

  const validatePayment = (payment: PaymentRecord) => {
    if (!payment.user_id) throw new Error("Safety Guard: User ID missing.");
    if (!payment.amount || payment.amount <= 0) throw new Error("Safety Guard: Invalid amount.");
    
    // Check for duplicate reference
    const duplicates = payments.filter(p => p.id !== payment.id && p.status === 'approved' && p.payment_reference === payment.payment_reference);
    if (duplicates.length > 0) throw new Error("Safety Guard: Duplicate reference detected.");
    
    return true;
  };

  const handleApprove = async (payment: PaymentRecord) => {
    logStage(payment.id, 'Approve clicked', 'started');
    if (!checkAdminAuth()) return;

    try {
      validatePayment(payment);
      logStage(payment.id, 'Safety validation passed', 'success');

      log("Confirmation accepted");
      setProcessingId(payment.id);
      logStage(payment.id, 'Database type detected: Realtime Database', 'success');

      const now = Date.now();
      const expiry = now + (30 * 24 * 60 * 60 * 1000); // 30 days
      const adminEmail = currentUser?.email || 'admin';

      const updates: any = {};
      
      // Payment Record Update
      updates[`payments/${payment.id}/status`] = 'approved';
      updates[`payments/${payment.id}/reviewed_by`] = adminEmail;
      updates[`payments/${payment.id}/reviewed_at`] = now;
      updates[`payments/${payment.id}/decision`] = 'approve';
      updates[`payments/${payment.id}/updated_at`] = now;

      // User Access Update
      updates[`users/${payment.user_id}/progress/subscription_status`] = 'active';
      updates[`users/${payment.user_id}/progress/premium_access`] = true;
      updates[`users/${payment.user_id}/progress/subscription_plan`] = 'monthly';
      updates[`users/${payment.user_id}/progress/subscription_start`] = now;
      updates[`users/${payment.user_id}/progress/subscription_expiry`] = expiry;

      logStage(payment.id, 'Database update started', 'started');
      await update(ref(db), updates);
      
      logStage(payment.id, 'Payment update success', 'success');
      logStage(payment.id, 'User update success', 'success');
      logStage(payment.id, 'UI refresh success', 'success');

      setFeedback({ msg: "Approved successfully", type: 'success' });
    } catch (err: any) {
      logStage(payment.id, 'Approve flow', 'failed', err.message);
      setFeedback({ msg: `Approval Failed: ${err.message}`, type: 'error' });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (payment: PaymentRecord) => {
    logStage(payment.id, 'Reject clicked', 'started');
    if (!checkAdminAuth()) return;

    log("Confirmation accepted");
    setProcessingId(payment.id);

    try {
      const now = Date.now();
      const adminEmail = currentUser?.email || 'admin';

      logStage(payment.id, 'Database type detected: Realtime Database', 'success');

      const updates: any = {};
      updates[`payments/${payment.id}/status`] = 'rejected';
      updates[`payments/${payment.id}/reviewed_by`] = adminEmail;
      updates[`payments/${payment.id}/reviewed_at`] = now;
      updates[`payments/${payment.id}/decision`] = 'reject';
      updates[`payments/${payment.id}/updated_at`] = now;

      logStage(payment.id, 'Payment update started', 'started');
      await update(ref(db), updates);
      
      logStage(payment.id, 'Payment update success', 'success');
      logStage(payment.id, 'UI refresh success', 'success');

      setFeedback({ msg: 'Payment rejected', type: 'success' });
    } catch (err: any) {
      logStage(payment.id, 'Reject flow', 'failed', err.message);
      setFeedback({ msg: `Reject failed: ${err.message}`, type: 'error' });
    } finally {
      setProcessingId(null);
    }
  };

  const bulkAction = async (action: 'approve' | 'reject') => {
    const pending = filteredPayments.filter(p => ['initiated', 'paid_pending_verification'].includes(p.status));
    if (pending.length === 0) return;

    log("Confirmation accepted (Bulk)");
    const actionText = action === 'approve' ? 'Approve All Valid' : 'Reject All Fraudulent';

    setIsBulkProcessing(true);
    let successCount = 0;

    for (const payment of pending) {
      try {
        if (action === 'approve') validatePayment(payment);
        
        const now = Date.now();
        const expiry = now + (30 * 24 * 60 * 60 * 1000);
        const adminEmail = currentUser?.email || 'admin';

        const updates: any = {};
        if (action === 'approve') {
          updates[`payments/${payment.id}/status`] = 'approved';
          updates[`payments/${payment.id}/reviewed_by`] = adminEmail;
          updates[`payments/${payment.id}/reviewed_at`] = now;
          updates[`payments/${payment.id}/decision`] = 'approve';
          updates[`users/${payment.user_id}/progress/subscription_status`] = 'active';
          updates[`users/${payment.user_id}/progress/premium_access`] = true;
          updates[`users/${payment.user_id}/progress/subscription_plan`] = 'monthly';
          updates[`users/${payment.user_id}/progress/subscription_start`] = now;
          updates[`users/${payment.user_id}/progress/subscription_expiry`] = expiry;
        } else {
          updates[`payments/${payment.id}/status`] = 'rejected';
          updates[`payments/${payment.id}/reviewed_by`] = adminEmail;
          updates[`payments/${payment.id}/reviewed_at`] = now;
          updates[`payments/${payment.id}/decision`] = 'reject';
        }

        await update(ref(db), updates);
        successCount++;
      } catch (err) {
        console.error(`Bulk failure for ${payment.id}:`, err);
      }
    }

    setFeedback({ msg: `${actionText}: ${successCount} processed.`, type: 'success' });
    setIsBulkProcessing(false);
  };

  const filteredPayments = payments.filter(p => {
    let matchesStatus = true;
    if (filter === 'pending') matchesStatus = ['initiated', 'paid_pending_verification'].includes(p.status);
    else if (filter !== 'all') matchesStatus = p.status === filter;

    const matchesSearch = !searchTerm || 
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.payment_reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference_id?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const log = (msg: string) => console.log(`[PAYMENT LOG]: ${msg}`);

  return (
    <div className="space-y-8">
      {/* Feedback Alert */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              feedback.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
            } flex items-center gap-3 font-black uppercase text-[10px] tracking-widest`}
          >
            {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white italic uppercase">
            Payment <span className="text-emerald-400">Management</span>
          </h2>
          <p className="text-white/40 font-medium italic">Match payment references manually for instant activation.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            onClick={() => bulkAction('approve')}
            disabled={isBulkProcessing || loading || filteredPayments.length === 0}
            className="h-12 px-6 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-black tracking-widest hover:bg-emerald-500 hover:text-black transition-all shrink-0"
          >
            {isBulkProcessing ? (
              <RefreshCcw size={14} className="mr-2 animate-spin" />
            ) : (
              <CheckCircle2 size={14} className="mr-2" />
            )}
            Approve All Valid
          </Button>

          <Button 
            onClick={() => bulkAction('reject')}
            disabled={isBulkProcessing || loading || filteredPayments.length === 0}
            className="h-12 px-6 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] uppercase font-black tracking-widest hover:bg-red-500 hover:text-white transition-all shrink-0"
          >
            <XCircle size={14} className="mr-2" />
            Reject All Fraudulent
          </Button>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-emerald-400 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search Reference or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
            />
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
            {(['pending', 'approved', 'rejected', 'cancelled', 'all'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow space-y-4">
          {loading && payments.length === 0 ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white/20">
                <CreditCard size={32} />
              </div>
              <p className="text-white/40 font-black italic uppercase">No payments found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredPayments.map((payment) => (
                <div 
                  key={payment.id} 
                  onClick={() => setSelectedPayment(payment)}
                  className={`p-6 border-2 transition-all cursor-pointer rounded-[2rem] bg-black/40 backdrop-blur-xl group ${
                    selectedPayment?.id === payment.id ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        payment.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                        payment.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                        payment.status === 'cancelled' ? 'bg-white/5 text-white/20' :
                        payment.status === 'paid_pending_verification' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {payment.status === 'approved' ? <CheckCircle2 size={24} /> :
                         payment.status === 'rejected' ? <XCircle size={24} /> :
                         payment.status === 'cancelled' ? <RefreshCcw size={24} /> :
                         payment.status === 'paid_pending_verification' ? <Clock size={24} className="animate-pulse" /> :
                         <CreditCard size={24} className="animate-pulse" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-black text-white">{payment.email}</h4>
                          <Badge className={
                            payment.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                            payment.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            payment.status === 'cancelled' ? 'bg-white/10 text-white/20 border-white/5' :
                            payment.status === 'paid_pending_verification' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            'bg-amber-500/10 text-amber-400 border-amber-400/20'
                          }>
                            {payment.status.replace(/_/g, ' ').toUpperCase()} {payment.status === 'approved' && '✅'}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/40 font-medium font-mono uppercase tracking-widest">
                          <span className={`font-black ${payment.amount === 10000 ? 'text-emerald-400' : 'text-amber-500 underline decoration-wavy'}`}>
                            ₦{payment.amount?.toLocaleString() || '0'}
                          </span>
                          <span className="text-emerald-400/60">Internal: {payment.payment_reference || 'MANUAL'}</span>
                          <span>Selar: {payment.reference_id}</span>
                          <span>{new Date(payment.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 lg:border-l border-white/5 lg:pl-6 shrink-0">
                      {['initiated', 'paid_pending_verification'].includes(payment.status) && (
                        <>
                          <Button 
                            size="sm" 
                            variant="primary"
                            disabled={processingId === payment.id}
                            onClick={(e) => { e.stopPropagation(); handleApprove(payment); }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl min-w-[120px]"
                          >
                            {processingId === payment.id ? "Approving..." : "Approve"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={processingId === payment.id}
                            onClick={(e) => { e.stopPropagation(); handleReject(payment); }}
                            className="border-red-500/50 hover:bg-red-500 hover:text-white text-red-400 font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl"
                          >
                            {processingId === payment.id ? "..." : "Reject"}
                          </Button>
                        </>
                      )}
                      {!['initiated', 'paid_pending_verification'].includes(payment.status) && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">
                          Processed at {new Date(payment.timestamp).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Context Sidebar */}
        {selectedPayment && (
          <div className="w-full lg:w-[350px] space-y-6 animate-in fade-in slide-in-from-right-4">
            <Card className="p-6 border-white/10 bg-white/[0.02] sticky top-24 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Payment <span className="text-emerald-400">History</span></h3>
                <button onClick={() => setSelectedPayment(null)} className="text-white/20 hover:text-white"><XCircle size={16} /></button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white truncate">{selectedPayment.email}</p>
                    <p className="text-[10px] text-white/40">UID: {selectedPayment.user_id.substring(0, 8)}...</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">All Transactions</p>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {userContext.map(p => (
                      <div key={p.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-white/60">{p.payment_reference || 'MANUAL'}</span>
                          <Badge className={`text-[8px] h-4 ${
                            p.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                            p.status === 'cancelled' ? 'bg-white/5 text-white/20 line-through' :
                            'bg-white/5 text-white/40'
                          }`}>
                            {p.status}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-white/20">{new Date(p.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                    {userContext.length === 0 && <p className="text-[10px] text-white/10 italic text-center py-4">No other transactions found.</p>}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
