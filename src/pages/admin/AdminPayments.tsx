import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  DollarSign,
  User,
  Calendar,
  MoreVertical,
  Download,
  FileText,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ref, get, set, update, onValue } from 'firebase/database';
import { db } from '../../lib/firebase';

interface PaymentRecord {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: string;
  planId: string;
  createdAt: number;
  transactionId: string;
  receiptUrl?: string;
}

export const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const paymentsRef = ref(db, 'payments');
    const unsubscribe = onValue(paymentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const paymentList: PaymentRecord[] = [];
        for (const id in data) {
          paymentList.push({ ...data[id], id });
        }
        paymentList.sort((a, b) => b.createdAt - a.createdAt);
        setPayments(paymentList);
      } else {
        setPayments([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleVerify = async (id: string, status: 'completed' | 'failed') => {
    setVerifying(true);
    try {
      await update(ref(db, `payments/${id}`), {
        status,
        verifiedAt: Date.now(),
        verifiedBy: 'admin'
      });
      
      // If completed, unlock user features?
      if (status === 'completed') {
        const payment = payments.find(p => p.id === id);
        if (payment) {
          await update(ref(db, `users/${payment.userId}`), {
            isPremium: true,
            premiumPlan: payment.planId,
            premiumSince: Date.now()
          });
        }
      }

      setSelectedPayment(null);
      alert(`Payment marked as ${status}.`);
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Failed to verify payment.');
    } finally {
      setVerifying(false);
    }
  };

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.userId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <CreditCard className="w-8 h-8 text-blue-400" />
            Financial Records
          </h1>
          <p className="text-gray-400">Monitor platform revenue and manage user payment transactions.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-all w-full md:w-64 text-sm"
            />
          </div>
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            {(['all', 'completed', 'pending', 'failed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${statusFilter === s ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +12.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Total Revenue</p>
            <h3 className="text-4xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +8.2%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Subscriptions</p>
            <h3 className="text-4xl font-bold text-white mt-1">{payments.filter(p => p.status === 'completed').length}</h3>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-400">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" />
              -2.4%
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Pending Verifications</p>
            <h3 className="text-4xl font-bold text-white mt-1">{payments.filter(p => p.status === 'pending').length}</h3>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">User</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{payment.userEmail}</p>
                        <p className="text-xs text-gray-500">{payment.userId.substring(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white text-sm">${payment.amount}</p>
                    <p className="text-xs text-gray-500 uppercase">{payment.currency}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      payment.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                      payment.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                      'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {payment.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> :
                       payment.status === 'failed' ? <XCircle className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-blue-400 bg-blue-400/5 px-2 py-1 rounded border border-blue-400/10 tracking-wider">
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedPayment(payment)}
                      className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      <AnimatePresence>
        {selectedPayment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !verifying && setSelectedPayment(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Transaction Details</h2>
                </div>
                <button 
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Transaction ID</p>
                    <p className="text-white font-mono text-sm">{selectedPayment.transactionId}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">User Email</p>
                    <p className="text-white font-bold text-sm">{selectedPayment.userEmail}</p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span className="text-2xl font-bold text-white">${selectedPayment.amount} {selectedPayment.currency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Payment Method</span>
                    <span className="text-white font-bold">{selectedPayment.method}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="text-white font-bold capitalize">{selectedPayment.planId.replace(/-/g, ' ')}</span>
                  </div>
                </div>

                {selectedPayment.receiptUrl && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Proof of Payment</h3>
                    <a 
                      href={selectedPayment.receiptUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        <span className="text-sm font-medium">View Receipt / Screenshot</span>
                      </div>
                      <Download className="w-4 h-4 text-gray-500" />
                    </a>
                  </div>
                )}
              </div>

              {selectedPayment.status === 'pending' && (
                <div className="p-6 border-t border-white/10 bg-[#161616] flex items-center gap-4">
                  <button 
                    onClick={() => handleVerify(selectedPayment.id, 'failed')}
                    disabled={verifying}
                    className="flex-1 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Payment
                  </button>
                  <button 
                    onClick={() => handleVerify(selectedPayment.id, 'completed')}
                    disabled={verifying}
                    className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Verify & Unlock
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
