import React, { useEffect, useState } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../lib/firebase';
import { PaymentRecord } from '../../types';
import { motion } from 'motion/react';
import { Card, Button, Badge } from '../../components/ui';
import { CreditCard, CheckCircle2, XCircle, Clock, ExternalLink, Search } from 'lucide-react';

export const ManagePayments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');

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
      alert(`Payment approved. Subscription expires on ${new Date(expiry).toLocaleDateString()}.`);
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
            {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
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
            <Card key={payment.id} className="p-6 border-white/10 bg-black/40 backdrop-blur-xl group hover:border-emerald-500/50 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    payment.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                    payment.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                    payment.status === 'paid_pending_verification' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {payment.status === 'approved' ? <CheckCircle2 size={24} /> :
                     payment.status === 'rejected' ? <XCircle size={24} /> :
                     payment.status === 'paid_pending_verification' ? <Clock size={24} className="animate-pulse" /> :
                     <CreditCard size={24} className="animate-pulse" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-black text-white">{payment.email}</h4>
                      <Badge className={
                        payment.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        payment.status === 'rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        payment.status === 'paid_pending_verification' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-400/20'
                      }>
                        {payment.status.replace(/_/g, ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/40 font-medium font-mono uppercase tracking-widest">
                      <span className="text-emerald-400/60">Internal: {payment.payment_reference || 'MANUAL'}</span>
                      <span>Selar: {payment.reference_id}</span>
                      <span>{new Date(payment.timestamp).toLocaleString()}</span>
                      <span>Source: {payment.payment_source}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:border-l border-white/5 lg:pl-6">
                  {['initiated', 'paid_pending_verification'].includes(payment.status) && (
                    <>
                      <Button 
                        size="sm" 
                        variant="primary"
                        onClick={() => handleApprove(payment)}
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl"
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleReject(payment)}
                        className="border-red-500/50 hover:bg-red-500 hover:text-white text-red-400 font-black uppercase text-[10px] tracking-widest h-10 px-6 rounded-xl"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {!['initiated', 'paid_pending_verification'].includes(payment.status) && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">
                      Processed on {new Date(payment.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
