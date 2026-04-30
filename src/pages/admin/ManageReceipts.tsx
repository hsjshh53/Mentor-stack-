import React, { useEffect, useState } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { ReceiptRecord } from '../../types';
import { Card, Button, Badge } from '../../components/ui';
import { CheckCircle2, XCircle, Clock, Search, Image as ImageIcon, ExternalLink, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { isAdmin as checkAdmin } from '../../lib/adminCheck';

export const ManageReceipts: React.FC = () => {
  const { profile, user: currentUser } = useAuth();
  const [receipts, setReceipts] = useState<ReceiptRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptRecord | null>(null);
  const [userReceipts, setUserReceipts] = useState<ReceiptRecord[]>([]);

  // Permission check helper
  const isAdmin = checkAdmin(profile) || checkAdmin(currentUser);

  useEffect(() => {
    if (selectedReceipt) {
      const history = receipts.filter(r => r.user_id === selectedReceipt.user_id && r.id !== selectedReceipt.id);
      setUserReceipts(history.sort((a, b) => b.timestamp - a.timestamp));
    } else {
      setUserReceipts([]);
    }
  }, [selectedReceipt, receipts]);

  useEffect(() => {
    console.log("[AdminShield] Syncing global receipts...");
    const receiptsRef = ref(db, 'receipts');
    
    // Enterprise Shield Listener
    const unsubscribe = onValue(receiptsRef, (snapshot) => {
      console.log("[AdminShield] Receipts data hydrated:", snapshot.val());
      try {
        if (snapshot.exists()) {
          const data = snapshot.val() || {};
          const receiptsList = Object.keys(data).map(id => ({ ...data[id], id })) as ReceiptRecord[];
          setReceipts(receiptsList.sort((a, b) => b.timestamp - a.timestamp));
        } else {
          setReceipts([]);
        }
      } catch (err) {
        console.error("[AdminShield] Receipts processing error:", err);
      } finally {
        setLoading(false);
      }
    }, (error) => {
      console.error("[AdminShield] Receipts stream blocked:", error.message);
      setLoading(false);
    });

    return () => {
      console.log("[AdminShield] Releasing receipts stream.");
      unsubscribe();
    };
  }, []);

  const logDiagnostic = (buttonName: string, recordId: string, status: 'action_started' | 'action_success' | 'failed', error?: string) => {
    console.log(`[Admin Diagnostics] Button: ${buttonName} | ID: ${recordId} | State: ${status} | User: ${currentUser?.email}${error ? ` | Error: ${error}` : ''}`);
    
    // Audit logging
    const auditRef = ref(db, `admin_audit_logs/${Date.now()}`);
    update(auditRef, {
      button_name: buttonName,
      clicked: true,
      record_id: recordId,
      admin_uid: currentUser?.uid,
      admin_email: currentUser?.email,
      timestamp: Date.now(),
      status,
      error: error || null
    }).catch(err => console.error("Failed to write audit log:", err));
  };

  const handleApprove = async (receipt: ReceiptRecord) => {
    if (!isAdmin) {
      alert("Unauthorized: Your admin role is not synced. Please re-login.");
      return;
    }

    if (!receipt.id) {
      alert("ID Error: Receipt ID is missing.");
      return;
    }

    if (!window.confirm(`Approve bank transfer from ${receipt.email}?`)) return;

    logDiagnostic('Approve Receipt', receipt.id, 'action_started');

    try {
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const expiry = now + thirtyDays;

      const updates: any = {};
      updates[`receipts/${receipt.id}/status`] = 'approved';
      updates[`receipts/${receipt.id}/processed_by`] = currentUser?.uid;
      updates[`receipts/${receipt.id}/updated_at`] = now;
      
      updates[`users/${receipt.user_id}/progress/subscription_status`] = 'active';
      updates[`users/${receipt.user_id}/progress/subscription_start_date`] = now;
      updates[`users/${receipt.user_id}/progress/subscription_expiry_date`] = expiry;
      updates[`users/${receipt.user_id}/progress/isPremium`] = true;
      updates[`users/${receipt.user_id}/progress/subscription_reference`] = receipt.id;
      
      await update(ref(db), updates);
      
      logDiagnostic('Approve Receipt', receipt.id, 'action_success');
      alert('Payment approved successfully. Subscription activated.');
    } catch (err: any) {
      logDiagnostic('Approve Receipt', receipt.id, 'failed', err.message);
      console.error("Error approving receipt:", err);
      alert(`Could not approve receipt. ${err.message}`);
    }
  };

  const handleReject = async (receipt: ReceiptRecord) => {
    if (!isAdmin) {
      alert("Unauthorized: Your admin role is not synced. Please re-login.");
      return;
    }

    if (!receipt.id) {
      alert("ID Error: Receipt ID is missing.");
      return;
    }

    if (!window.confirm(`Reject bank transfer from ${receipt.email}?`)) return;

    logDiagnostic('Reject Receipt', receipt.id, 'action_started');

    try {
      const updates: any = {};
      updates[`receipts/${receipt.id}/status`] = 'rejected';
      updates[`receipts/${receipt.id}/processed_by`] = currentUser?.uid;
      updates[`receipts/${receipt.id}/updated_at`] = Date.now();
      
      updates[`users/${receipt.user_id}/progress/subscription_status`] = 'inactive';
      updates[`users/${receipt.user_id}/progress/isPremium`] = false;
      
      await update(ref(db), updates);
      
      logDiagnostic('Reject Receipt', receipt.id, 'action_success');
      alert('Payment rejected.');
    } catch (err: any) {
      logDiagnostic('Reject Receipt', receipt.id, 'failed', err.message);
      console.error("Error rejecting receipt:", err);
      alert(`Could not reject receipt. ${err.message}`);
    }
  };

  const filteredReceipts = receipts.filter(r => 
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.status.toLowerCase() === searchTerm.toLowerCase()
  );

  if (loading && receipts.length === 0) {
    return <div className="text-white/40 text-center py-12">Loading receipts...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white italic uppercase">
            Bank Transfer <span className="text-emerald-400">Verification</span>
          </h2>
          <p className="text-white/40 font-medium italic">Manually check uploaded receipts and activate subscriptions.</p>
        </div>

        <div className="relative group min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text"
            placeholder="Search email or status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReceipts.map((receipt) => (
          <Card key={receipt.id} className="p-6 border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white uppercase italic">{receipt.email}</h4>
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                  <Calendar size={12} />
                  {new Date(receipt.timestamp).toLocaleString()}
                </div>
              </div>
              <Badge className={
                receipt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                receipt.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                'bg-amber-500/10 text-amber-400'
              }>
                {receipt.status.toUpperCase()}
              </Badge>
            </div>

            <div 
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-black cursor-pointer group"
              onClick={() => setSelectedReceipt(receipt)}
            >
              <img src={receipt.image_url} alt="Receipt" className="w-full h-full object-cover p-2" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase text-white flex items-center gap-2">
                  <ExternalLink size={14} />
                  View Full Size
                </span>
              </div>
            </div>

            {receipt.status === 'pending' && (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleApprove(receipt)}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl h-12 text-xs font-black uppercase"
                >
                  Approve
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleReject(receipt)}
                  className="border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl h-12 text-xs font-black uppercase"
                >
                  Reject
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredReceipts.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-white/20 italic font-medium">
          No receipts found matching your search.
        </div>
      )}

      {selectedReceipt && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col lg:flex-row p-4 lg:p-12 gap-8 overflow-auto"
          onClick={() => setSelectedReceipt(null)}
        >
          <div className="relative flex-grow flex items-center justify-center min-h-[50vh]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedReceipt(null)}
              className="absolute -top-10 left-0 text-white/40 hover:text-white flex items-center gap-2 uppercase text-[10px] font-black tracking-widest"
            >
              <XCircle size={18} />
              Close
            </button>
            <img src={selectedReceipt.image_url} alt="Full Receipt" className="max-w-full max-h-full rounded-3xl border border-white/10 shadow-2xl object-contain" />
          </div>

          <div className="w-full lg:w-[400px] bg-black/40 border border-white/10 rounded-[2rem] p-8 space-y-8 overflow-y-auto h-fit lg:max-h-full scrollbar-hide" onClick={e => e.stopPropagation()}>
            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase italic italic text-white">Member <span className="text-emerald-400">Context</span></h3>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                <p className="text-[8px] font-black uppercase text-white/40 tracking-widest">Email Address</p>
                <p className="text-sm font-bold truncate">{selectedReceipt.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white/40 mb-2">
                <Clock size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest underline decoration-emerald-400">Previous Receipt History</span>
              </div>
              <div className="space-y-3">
                {userReceipts.map(prev => (
                  <div key={prev.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-black rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                      <img src={prev.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] font-bold text-white/80">{new Date(prev.timestamp).toLocaleDateString()}</p>
                      <Badge className={`text-[8px] h-5 ${
                        prev.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                        prev.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                        prev.status === 'cancelled' ? 'bg-white/5 text-white/20 line-through' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {prev.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
                {userReceipts.length === 0 && (
                  <p className="text-[10px] text-white/20 italic p-4 border border-dashed border-white/5 rounded-xl text-center">
                    No previous history found for this user.
                  </p>
                )}
              </div>
            </div>

            {selectedReceipt.status === 'pending' && (
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => handleApprove(selectedReceipt)}
                  className="bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl h-14 text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                >
                  Approve
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleReject(selectedReceipt)}
                  className="border-red-500/20 text-red-500 hover:bg-red-500/10 rounded-xl h-14 text-xs font-black uppercase tracking-widest"
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
