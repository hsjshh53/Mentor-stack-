import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  X, 
  HelpCircle,
  Filter,
  CreditCard,
  Target,
  Zap,
  MoreVertical
} from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { ref, push } from 'firebase/database';
import { db } from '../lib/firebase';
import { SupportTicket, TicketCategory } from '../types';
import { firebaseSafeOnValue, firebaseSafeSet, firebaseUserScopedQuery } from '../lib/FirebaseService';

export const SupportPage: React.FC = () => {
  const { user, profileReady } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [category, setCategory] = useState<TicketCategory>('technical');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user || !profileReady) return;
    console.log("[SupportShield] Syncing ticket history...");
    
    const ticketsQuery = firebaseUserScopedQuery('support_tickets', user.uid);
    
    const unsubscribe = firebaseSafeOnValue(ticketsQuery, (data: any) => {
      console.log("[SupportShield] Tickets data refreshed.");
      if (data) {
        const userTickets = Object.values(data) as SupportTicket[];
        setTickets(userTickets.sort((a, b) => b.timestamp - a.timestamp));
      } else {
        setTickets([]);
      }
      setLoading(false);
    }, "SupportTickets");

    return () => {
      console.log("[SupportShield] Terminating ticket stream.");
      unsubscribe();
    };
  }, [user, profileReady]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    setSubmitting(true);
    try {
      const ticketsRef = ref(db, 'support_tickets');
      const newTicketRef = push(ticketsRef);
      
      const ticketData = {
        id: newTicketRef.key || '',
        user_id: user.uid || '',
        email: user.email || '',
        category: category || 'other',
        message: message || '',
        image_attachment: image || null,
        status: 'open',
        timestamp: Date.now()
      };

      const verifiedData = Object.fromEntries(
        Object.entries(ticketData).filter(([_, v]) => v !== undefined)
      );

      const success = await firebaseSafeSet(`support_tickets/${newTicketRef.key}`, verifiedData, "SubmitTicket");
      if (success) {
        setIsCreating(false);
        setMessage('');
        setImage(null);
        alert('Ticket submitted successfully.');
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Error submitting ticket:", err);
      alert('Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories: { id: TicketCategory; label: string; icon: any }[] = [
    { id: 'payment', label: 'Payment Issue', icon: CreditCard },
    { id: 'access', label: 'Access Problem', icon: Target },
    { id: 'technical', label: 'Technical Error', icon: Zap },
    { id: 'other', label: 'Other', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight italic uppercase italic">
              Help & <span className="text-emerald-400">Support</span>
            </h1>
            <p className="text-white/40 font-medium">Resolution hub for MentorStack members.</p>
          </div>
          <Button 
            onClick={() => setIsCreating(true)}
            className="rounded-xl h-14 px-8 bg-emerald-500 text-black font-black uppercase tracking-widest text-xs"
          >
            New Support Request
          </Button>
        </div>

        {/* Categories Quick Links */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              onClick={() => { setCategory(cat.id); setIsCreating(true); }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
                <cat.icon size={20} />
              </div>
              <p className="text-sm font-black uppercase tracking-widest">{cat.label}</p>
            </div>
          ))}
        </div>

        {/* Ticket List */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/20">Your Active Requests</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="py-12 text-center text-white/20 italic">Loading requests...</div>
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => (
                <Card key={ticket.id} className="p-6 border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-grow space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-white/10 h-6 text-[8px] font-black tracking-tighter rounded-md">
                            {ticket.category.toUpperCase()}
                          </Badge>
                          <span className="text-[10px] font-mono text-white/40">{new Date(ticket.timestamp).toLocaleString()}</span>
                        </div>
                        <Badge className={`h-6 text-[8px] font-black uppercase tracking-tighter ${
                          ticket.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' :
                          ticket.status === 'in_progress' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-white/5 text-white/60'
                        }`}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <p className="text-sm font-medium leading-relaxed">{ticket.message}</p>
                      
                      {ticket.admin_response && (
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <MessageSquare size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Admin Response</span>
                          </div>
                          <p className="text-sm text-white/80">{ticket.admin_response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center rounded-3xl border border-dashed border-white/5 bg-white/[0.01]">
                <HelpCircle size={40} className="mx-auto text-white/10 mb-4" />
                <p className="text-white/20 font-medium italic">No support requests yet. We're here to help.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Create Ticket */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0A0A0B] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight italic">Submit <span className="text-emerald-400">Problem</span></h2>
                    <p className="text-xs text-white/40 font-medium">Provide details and evidence for faster resolution.</p>
                  </div>
                  <button onClick={() => setIsCreating(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                    <X size={20} className="text-white/40" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Issue Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id)}
                          className={`h-12 rounded-xl flex items-center gap-3 px-4 transition-all border ${
                            category === cat.id ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'
                          }`}
                        >
                          <cat.icon size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Detailed Message</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe exactly what happened..."
                      className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/30 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Attachment (Optional Screenshot)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      id="ticket-image" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                    <label 
                      htmlFor="ticket-image"
                      className="w-full h-24 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all overflow-hidden"
                    >
                      {image ? (
                        <img src={image} alt="Attachment" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Upload size={18} className="text-white/20" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Drop evidence here</span>
                        </>
                      )}
                    </label>
                  </div>

                  <Button 
                    fullWidth 
                    size="lg" 
                    type="submit"
                    disabled={submitting}
                    className="h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm"
                  >
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
