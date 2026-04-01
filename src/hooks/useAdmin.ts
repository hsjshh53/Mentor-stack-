import { useAuth } from '../context/AuthContext';
import { ADMIN_EMAILS, ADMIN_UIDS } from '../constants/admin';

export function useAdmin() {
  const { user, loading } = useAuth();

  const isAdmin = !loading && user && (
    ADMIN_EMAILS.includes(user.email || '') || 
    ADMIN_UIDS.includes(user.uid)
  );

  return { isAdmin, loading };
}
