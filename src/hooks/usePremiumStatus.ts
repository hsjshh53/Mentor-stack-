import { useEffect, useState } from 'react';
import { ref } from 'firebase/database';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { PaymentRecord } from '../types';
import { firebaseSafeOnValue, firebaseUserScopedQuery } from '../lib/FirebaseService';

export const usePremiumStatus = () => {
  const { user, profile, loading: authLoading, profileReady, isAdmin } = useAuth();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !profileReady) return;

    if (!user) {
      setIsPremium(false);
      setLoading(false);
      return;
    }

    if (isAdmin) {
      setIsPremium(true);
      setLoading(false);
      return;
    }

    const now = Date.now();
    if (profile?.progress?.subscription_status === 'active' && 
        profile?.progress?.subscription_expiry && 
        profile.progress.subscription_expiry > now) {
      setIsPremium(true);
      setLoading(false);
      return;
    }

    const paymentsQuery = firebaseUserScopedQuery('payments', user.uid);

    const unsubscribe = firebaseSafeOnValue(paymentsQuery, (data: any) => {
      if (data) {
        const paymentsList = Object.values(data) as PaymentRecord[];
        const approved = paymentsList.some(p => (p.status === 'approved' || p.status === 'success'));
        setIsPremium(approved);
      } else {
        setIsPremium(false);
      }
      setLoading(false);
    }, "PremiumStatus");

    return () => unsubscribe();
  }, [user, authLoading, profile, profileReady, isAdmin]);

  return { isPremium, loading };
};
