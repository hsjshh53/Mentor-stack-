import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ref, get, update, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from '../lib/firebase';
import { LoadingScreen } from './LoadingScreen';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

import { isAdmin as checkAdmin } from '../lib/adminCheck';

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { user, profile, loading: authLoading } = useAuth();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!user || authLoading) {
      if (!authLoading) setLoading(false);
      return;
    }

    console.log("[SubscriptionShield] Verifying access for:", user.uid);
    
    // Admin checking
    const isAdmin = checkAdmin(profile) || checkAdmin(user);
    if (isAdmin) {
      console.log("[SubscriptionShield] Admin bypass activated.");
      setIsWhitelisted(true);
      setLoading(false);
      return; // CRITICAL: Stop here to prevent unauthorized query logs
    }

    const paymentsRef = ref(db, 'payments');
    const paymentsQuery = query(paymentsRef, orderByChild('user_id'), equalTo(user.uid));

    const unsubscribe = onValue(paymentsQuery, (snapshot) => {
      console.log("[SubscriptionShield] Payment data hydrated.");
      let approved = false;
      
      if (snapshot.exists()) {
        const paymentsData = snapshot.val();
        const paymentsList = Object.values(paymentsData) as any[];
        approved = paymentsList.some(p => p.status === 'approved');
      }

      const now = Date.now();
      const isProfileActive = profile?.progress?.subscription_status === 'active' && 
                              profile?.progress?.subscription_expiry && 
                              profile.progress.subscription_expiry > now;

      const latestAdminStatus = checkAdmin(profile) || checkAdmin(user);
      
      setIsWhitelisted(approved || isProfileActive || latestAdminStatus);
      setLoading(false);
    }, (error) => {
      console.error("[SubscriptionShield] Permission leak or query error:", error.message);
      
      // Secondary fallback
      const currentAdminStatus = checkAdmin(profile) || checkAdmin(user);
      if (currentAdminStatus) {
        setIsWhitelisted(true);
      }
      
      setLoading(false);
    });

    return () => {
      console.log("[SubscriptionShield] Closing verification stream.");
      unsubscribe();
    };
  }, [user, profile, authLoading]);

  if (authLoading || loading) {
    return <LoadingScreen message="Verifying access..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ALLOW ACCESS TO SUBSCRIPTION PAGE ITSELF
  if (location.pathname === '/subscription') {
    return <>{children}</>;
  }

  // FINAL SOURCE OF TRUTH CHECK
  if (isWhitelisted) {
    return <>{children}</>;
  }

  // IF NOT APPROVED, redirect to subscription page
  return <Navigate to="/subscription" replace />;
};
