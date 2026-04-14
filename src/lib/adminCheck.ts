import { User } from 'firebase/auth';

export const ADMIN_EMAILS = ["hh5217924@gmail.com"];

/**
 * Checks if a user has admin privileges based on their email.
 * @param user The Firebase User object
 * @returns boolean
 */
export const isAdmin = (user: User | null | any): boolean => {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email);
};
