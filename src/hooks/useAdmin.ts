import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { isAdmin as checkIsAdmin } from '../lib/adminCheck';

export const useAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Check admin status based on email utility
    const adminStatus = checkIsAdmin(user);
    setIsAdmin(adminStatus);
    setLoading(false);
  }, [user, authLoading]);

  return { isAdmin, loading };
};
