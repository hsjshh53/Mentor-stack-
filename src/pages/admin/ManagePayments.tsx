import React, { useEffect, useState } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import { PaymentRecord } from '../../types';
import { motion } from 'motion/react';
import { Card, Button, Badge } from '../../components/ui';
import { CreditCard, CheckCircle2, XCircle, Clock, ExternalLink, Search, RefreshCcw, User } from 'lucide-react';

export const ManagePayments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'cancelled'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [userContext, setUserContext] = useState<PaymentRecord[]>([]);

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
      if (snapshot.exists()) {
        const data = snapshot.val();
        const paymentsList = Object.values(data) as PaymentRecord[];
        setPayments(paymentsList.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        setPayments([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (payment: PaymentRecord) => {
    if (!window.confirm(`Approve payment from ${payment.email}? This will activate their 30-day subscription.`)) return;

    try {
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const expiry = now + thirtyDays;

      const updates: any = {};
      updates[`payments/${payment.id}/status`] = 'approved';
      updates[`users/${payment.user_id}/progress/subscription_status`] = 'active';
      updates[`users/${payment.user_id}/progress/subscription_start_date`] = now;
      updates[`users/${payment.user_id}/progress/subscription_expiry_date`] = expiry;
      
      await update(ref(db), updates);
      alert(`Your ₦10,000 MentorStack Premium subscription is now active. Expires on ${new Date(expiry).toLocaleDateString()}.`);
    } catch (err) {
      console.error("Error approving payment:", err);
      alert('Error updating payment status.');
    }
  };

  const handleReject = async (payment: PaymentRecord) => {
    if (!window.confirm(`Reject payment from ${payment.email}?`)) return;

    try {
      const updates: any = {};
      updates[`payments/${payment.id}/status`] = 'rejected';
      updates[`users/${payment.user_id}/progress/subscription_status`] = 'inactive';
      updates[`users/${payment.user_id}/progress/subscription_reference`] = null;
      
      await update(ref(db), updates);
      alert('Payment rejected.');
    } catch (err) {
      console.error("Error rejecting payment:", err);
    }
  };

  const filteredPayments = payments.filter(p => {
    // 1. Status Filter
    let matchesStatus = true;
    if (filter === 'pending') matchesStatus = ['initiated', 'paid_pending_verification'].includes(p.status);
    else if (filter !== 'all') matchesStatus = p.status === filter;

    // 2. Search Filter (Email, Internal Reference, or Selar Reference)
    const matchesSearch = !searchTerm || 
      p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.payment_reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference_id?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white italic uppercase">
            Payment <span className="text-emerald-400">Management</span>
          </h2>
          <p className="text-white/40 font-medium italic">Match payment references manually for instant activation.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
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
          {loading ? (
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
                            {payment.status.replace(/_/g, ' ').toUpperCase()}
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
                            onClick={(e) => { e.stopPropagation(); handleApprove(payment); }}
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl"
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => { e.stopPropagation(); handleReject(payment); }}
                            className="border-red-500/50 hover:bg-red-500 hover:text-white text-red-400 font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl"
                          >
                            Reject
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
