import { 
  ref, 
  get, 
  onValue, 
  set, 
  update, 
  push, 
  remove, 
  query, 
  orderByChild, 
  equalTo,
  DataSnapshot,
  Query,
  DatabaseReference
} from 'firebase/database';
import { db } from './firebase';

/**
 * 🔒 HIGHER-ORDER FIREBASE SECURITY WRAPPERS
 * Centralized error handling and safe access patterns.
 */

export const firebaseSafeGet = async <T>(dbRef: DatabaseReference | Query, label: string): Promise<T | null> => {
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val() as T;
    }
    return null;
  } catch (error) {
    console.error(`[FirebaseService] Error getting ${label}:`, error);
    return null;
  }
};

export const firebaseSafeOnValue = <T>(
  dbRef: DatabaseReference | Query,
  callback: (data: T | null) => void,
  label: string
): (() => void) => {
  return onValue(
    dbRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val() as T);
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(`[FirebaseService] Listener error on ${label}:`, error.message);
      callback(null);
    }
  );
};

export const firebaseSafeUpdate = async (pathOrRef: string | DatabaseReference, data: any, label: string): Promise<boolean> => {
  try {
    const finalRef = typeof pathOrRef === 'string' ? ref(db, pathOrRef) : pathOrRef;
    await update(finalRef, data);
    return true;
  } catch (error) {
    console.error(`[FirebaseService] Error updating ${label}:`, error);
    return false;
  }
};

export const firebaseSafeSet = async (pathOrRef: string | DatabaseReference, data: any, label: string): Promise<boolean> => {
  try {
    const finalRef = typeof pathOrRef === 'string' ? ref(db, pathOrRef) : pathOrRef;
    await set(finalRef, data);
    return true;
  } catch (error) {
    console.error(`[FirebaseService] Error setting ${label}:`, error);
    return false;
  }
};

export const firebaseSafeRemove = async (pathOrRef: string | DatabaseReference, label: string): Promise<boolean> => {
  try {
    const finalRef = typeof pathOrRef === 'string' ? ref(db, pathOrRef) : pathOrRef;
    await remove(finalRef);
    return true;
  } catch (error) {
    console.error(`[FirebaseService] Error removing ${label}:`, error);
    return false;
  }
};

export const firebaseUserScopedQuery = (collectionPath: string, userId: string) => {
  return query(ref(db, collectionPath), orderByChild('user_id'), equalTo(userId));
};
