import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ref, get, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { LoadingScreen } from './LoadingScreen';

interface SubscriptionGuardProps {
  children: React.ReactNode;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ children }) => {
  const { user, profile, loading: authLoading } = useAuth();
  const [isWhitelisted, setIsWhitelisted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !profile) {
        if (!authLoading) setLoading(false);
        return;
      }

      try {
        // 1. Expiry Check
        if (profile.progress.subscription_status === 'active' && profile.progress.subscription_expiry_date) {
          if (Date.now() > profile.progress.subscription_expiry_date) {
            // Update status to inactive in DB
            await update(ref(db, `users/${user.uid}/progress`), {
              subscription_status: 'inactive'
            });
            // Profile is still stale in current render, but the next render/refresh will catch it.
            // For now we continue with the logic.
          }
        }

        // 2. Whitelist Check
        const whitelistRef = ref(db, 'subscription/whitelist');
        const snapshot = await get(whitelistRef);
        
        if (snapshot.exists()) {
          const whitelist = snapshot.val();
          const emails = Object.values(whitelist) as string[];
          if (emails.map(e => e.toLowerCase()).includes(user.email?.toLowerCase() || '')) {
            setIsWhitelisted(true);
            setLoading(false);
            return;
          }
        }
        setIsWhitelisted(false);
      } catch (error) {
        console.error("Error checking access details:", error);
        setIsWhitelisted(false);
      }
      setLoading(false);
    };

    if (!authLoading && profile) {
      checkAccess();
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading, profile]);

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

  // 1. ADMIN OVERRIDE (Specific Email or Role)
  if (user.email === 'hh5217924@gmail.com' || profile?.progress?.role === 'admin') {
    return <>{children}</>;
  }

  // 2. WHITELISTED (Flag or Email List)
  if (profile?.progress?.is_whitelisted === true || isWhitelisted) {
    return <>{children}</>;
  }

  // 3. SUBSCRIPTION STATUS CHECK
  const status = profile?.progress?.subscription_status;

  if (status === 'active') {
    // Double check expiry just in case the update above is pending
    if (profile.progress.subscription_expiry_date && Date.now() > profile.progress.subscription_expiry_date) {
       return <Navigate to="/subscription" replace />;
    }
    return <>{children}</>;
  }

  // IF PENDING, allow access to subscription page handles the "Waiting" view
  // But we need to redirect them away from core pages
  return <Navigate to="/subscription" replace />;
};
