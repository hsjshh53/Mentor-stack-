import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ADMIN_EMAIL = 'olynqsociallimited@gmail.com';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};
