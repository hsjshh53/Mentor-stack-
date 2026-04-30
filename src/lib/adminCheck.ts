import { User } from 'firebase/auth';

export const ADMIN_EMAILS = ["hh5217924@gmail.com", "harunabilikis8@gmail.com"];

/**
 * Checks if a user has admin privileges based on their email or role.
 * @param user The Firebase User object or Profile object
 * @returns boolean
 */
export const isAdmin = (user: any): boolean => {
  if (!user) return false;
  
  // Check email
  const email = user.email || (user.progress && user.email);
  if (email && ADMIN_EMAILS.includes(email)) return true;
  
  // Check role in profile/progress
  if (user.progress?.role === 'admin' || user.role === 'admin') return true;
  if (user.is_admin || user.is_super_admin) return true;

  return false;
};
