import { useAuth } from '../AuthShield';

export const useAdmin = () => {
  const { isAdmin, adminReady, loading: authLoading } = useAuth();
  
  return { 
    isAdmin, 
    loading: authLoading || !adminReady 
  };
};
