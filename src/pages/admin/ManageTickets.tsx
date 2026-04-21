import React, { useState, useEffect } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { db } from '../../lib/firebase';
import { SupportTicket, PaymentRecord, ReceiptRecord } from '../../types';
import { Card, Button, Badge } from '../../components/ui';
import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  User, 
  AlertCircle, 
  ChevronRight,
  ExternalLink,
  History,
  ShieldCheck
} from 'lucide-react';

export const ManageTickets: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [userContext, setUserContext] = useState<{
    payments: PaymentRecord[];
    receipts: ReceiptRecord[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('open');
  const [response, setResponse] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const ticketsRef = ref(db, 'support_tickets');
    const unsubscribe = onValue(ticketsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.values(data) as SupportTicket[];
        setTickets(list.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        setTickets([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserContext = async (userId: string) => {
    const paymentsRef = ref(db, 'payments');
    const receiptsRef = ref(db, 'receipts');

    const [pSnap, rSnap] = await Promise.all([get(paymentsRef), get(receiptsRef)]);
    
    let payments: PaymentRecord[] = [];
    let receipts: ReceiptRecord[] = [];

    if (pSnap.exists()) {
      payments = (Object.values(pSnap.val()) as PaymentRecord[])
        .filter(p => p.user_id === userId)
        .sort((a, b) => b.timestamp - a.timestamp);
    }
    if (rSnap.exists()) {
      receipts = (Object.values(rSnap.val()) as ReceiptRecord[])
        .filter(r => r.user_id === userId)
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    setUserContext({ payments, receipts });
  };

  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setResponse(ticket.admin_response || '');
    fetchUserContext(ticket.user_id);
  };

  const handleUpdateStatus = async (status: 'in_progress' | 'resolved') => {
    if (!selectedTicket) return;
    setUpdating(true);
    try {
      const updates: any = {};
      updates[`support_tickets/${selectedTicket.id}/status`] = status;
      updates[`support_tickets/${selectedTicket.id}/admin_response`] = response;
      if (status === 'resolved') {
        updates[`support_tickets/${selectedTicket.id}/resolved_at`] = Date.now();
      }

      await update(ref(db), updates);
      alert(`Ticket marked as ${status.replace('_', ' ')}`);
      if (status === 'resolved') setSelectedTicket(null);
    } catch (err) {
      console.error("Error updating ticket:", err);
    } finally {
      setUpdating(false);
    }
  };

  const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

  if (loading) return <div className="text-white/20 text-center py-20">Loading tickets...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh]">
      {/* Sidebar List */}
      <div className="w-full lg:w-[400px] space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase italic tracking-tight text-white">Tickets</h2>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shrink-0">
              {(['open', 'in_progress', 'resolved', 'all'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
          {filteredTickets.map(ticket => (
            <div 
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                selectedTicket?.id === ticket.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <Badge className="bg-white/5 text-[8px] font-black uppercase tracking-tighter text-white/40">
                  {ticket.category}
                </Badge>
                <Badge className={`text-[8px] font-black uppercase tracking-tighter ${
                  ticket.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' :
                  ticket.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-white/10 text-white/60'
                }`}>
                  {ticket.status.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-xs font-bold text-white mb-1 truncate">{ticket.email}</p>
              <p className="text-[10px] text-white/40 line-clamp-2">{ticket.message}</p>
            </div>
          ))}
          {filteredTickets.length === 0 && (
            <div className="text-center py-10 text-white/20 italic text-sm">No tickets found.</div>
          )}
        </div>
      </div>

      {/* Detail View */}
      <div className="flex-grow">
        {selectedTicket ? (
          <Card className="p-8 border-white/10 bg-black/40 backdrop-blur-3xl space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/5">
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{selectedTicket.email}</h3>
                    <p className="text-[10px] font-mono text-white/40">UID: {selectedTicket.user_id}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-white/40">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest underline decoration-emerald-500">Member Complaint</span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed italic text-white/80">"{selectedTicket.message}"</p>
                  {selectedTicket.image_attachment && (
                    <div className="mt-4 rounded-xl border border-white/10 overflow-hidden bg-black/20">
                      <p className="text-[8px] font-black uppercase tracking-widest p-2 border-b border-white/5 bg-white/5 text-white/20">Attachment Provided</p>
                      <img src={selectedTicket.image_attachment} alt="Evidence" className="max-h-[300px] w-full object-contain p-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div className="flex flex-col gap-3 min-w-[200px]">
                <button 
                  disabled={updating}
                  onClick={() => handleUpdateStatus('resolved')}
                  className="h-14 rounded-2xl bg-emerald-500 text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <CheckCircle2 size={16} />
                  Resolve Issue
                </button>
                <button 
                  disabled={updating}
                  onClick={() => handleUpdateStatus('in_progress')}
                  className="h-14 rounded-2xl border border-amber-500/20 text-amber-500 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-amber-500/10 transition-all disabled:opacity-50"
                >
                  <Clock size={16} />
                  Mark In Progress
                </button>
              </div>
            </div>

            {/* Context: Payments & Receipts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/40 border-b border-white/5 pb-2">
                  <History size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Payment Context</span>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto text-[10px] pr-2 custom-scrollbar">
                  {userContext?.payments.map(p => (
                    <div key={p.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                      <div>
                        <p className="font-bold">{p.reference_id}</p>
                        <p className="text-white/20">{new Date(p.timestamp).toLocaleDateString()}</p>
                      </div>
                      <Badge className={p.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}>{p.status}</Badge>
                    </div>
                  ))}
                  {userContext?.payments.length === 0 && <p className="text-white/10 italic">No payments found.</p>}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white/40 border-b border-white/5 pb-2">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Bank Transfers</span>
                </div>
                <div className="space-y-2 max-h-[200px] overflow-y-auto text-[10px] pr-2 custom-scrollbar">
                  {userContext?.receipts.map(r => (
                    <div key={r.id} className="p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-white/10 overflow-hidden bg-black flex items-center justify-center">
                           <img src={r.image_url} alt="Rec" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-white/20">{new Date(r.timestamp).toLocaleDateString()}</p>
                      </div>
                      <Badge className={r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}>{r.status}</Badge>
                    </div>
                  ))}
                  {userContext?.receipts.length === 0 && <p className="text-white/10 italic">No transfers found.</p>}
                </div>
              </div>
            </div>

            {/* Response Form */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/40">
                <MessageSquare size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Response to Member</span>
              </div>
              <textarea 
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/30 transition-all resize-none"
              />
              <p className="text-[8px] uppercase tracking-widest text-white/20 font-black italic">User will be notified: "Your support request has been updated"</p>
            </div>
          </Card>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01] p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-white/10 mb-6">
              <MessageSquare size={40} />
            </div>
            <h3 className="text-xl font-black text-white/40 uppercase tracking-tight">Select a ticket to begin resolution</h3>
            <p className="text-white/20 text-sm max-w-xs mt-2">Member context like payment history will be loaded automatically.</p>
          </div>
        )}
      </div>
    </div>
  );
};
