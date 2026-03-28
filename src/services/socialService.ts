import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  onSnapshot,
  getDoc
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Activity } from '../types';

export const recordActivity = async (activity: Omit<Activity, 'id' | 'timestamp'>) => {
  const path = 'activities';
  try {
    await addDoc(collection(db, path), {
      ...activity,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getLeaderboard = async (limitCount: number = 50) => {
  const path = 'users';
  try {
    const q = query(
      collection(db, path),
      orderBy('progress.xp', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    const users: any[] = [];
    snapshot.forEach((child) => {
      const data = child.data();
      users.push({
        uid: child.id,
        displayName: data.displayName || 'Anonymous',
        photoURL: data.photoURL,
        xp: data.progress?.xp || 0,
        level: data.progress?.level || 1,
        streak: data.progress?.streak || 0
      });
    });

    return users;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const followUser = async (currentUserId: string, targetUserId: string) => {
  const currentUserPath = `users/${currentUserId}`;
  const targetUserPath = `users/${targetUserId}`;
  try {
    const currentUserRef = doc(db, 'users', currentUserId);
    const targetUserRef = doc(db, 'users', targetUserId);

    await updateDoc(currentUserRef, {
      'progress.following': arrayUnion(targetUserId)
    });

    await updateDoc(targetUserRef, {
      'progress.followers': arrayUnion(currentUserId)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${currentUserId} or ${targetUserId}`);
  }
};

export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
  try {
    const currentUserRef = doc(db, 'users', currentUserId);
    const targetUserRef = doc(db, 'users', targetUserId);

    await updateDoc(currentUserRef, {
      'progress.following': arrayRemove(targetUserId)
    });

    await updateDoc(targetUserRef, {
      'progress.followers': arrayRemove(currentUserId)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${currentUserId} or ${targetUserId}`);
  }
};

export const getActivities = (callback: (activities: Activity[]) => void) => {
  const path = 'activities';
  const q = query(collection(db, path), orderBy('timestamp', 'desc'), limit(20));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const activities: Activity[] = [];
    snapshot.forEach((child) => {
      activities.push({ id: child.id, ...child.data() } as Activity);
    });
    callback(activities);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, path);
  });

  return unsubscribe;
};
