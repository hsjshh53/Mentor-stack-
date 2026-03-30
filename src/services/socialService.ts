import { collection, doc, addDoc, getDocs, query, orderBy, limit, setDoc, serverTimestamp, onSnapshot, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Activity } from '../types';

export const recordActivity = async (activity: Omit<Activity, 'id' | 'timestamp'>) => {
  const activitiesRef = collection(db, 'activities');
  await addDoc(activitiesRef, {
    ...activity,
    timestamp: serverTimestamp()
  });
};

export const getLeaderboard = async (limitCount: number = 50) => {
  // In Firestore, we should probably have a separate 'leaderboard' collection or query users.
  // For now, let's query the 'progress' subcollection of all users.
  // Actually, Firestore doesn't support global subcollection queries easily without collectionGroup.
  // A better way is to store a summary in the user document.
  
  const usersRef = collection(db, 'users');
  // This is a bit tricky with the current structure. 
  // Let's assume we store a summary in /users/{userId}
  const q = query(usersRef, orderBy('xp', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  
  const users: any[] = [];
  snapshot.forEach((child) => {
    const data = child.data();
    users.push({
      uid: child.id,
      displayName: data.displayName || 'Anonymous',
      photoURL: data.photoURL,
      xp: data.xp || 0,
      level: data.level || 1,
      streak: data.streak || 0
    });
  });

  return users;
};

export const followUser = async (currentUserId: string, targetUserId: string) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const targetUserRef = doc(db, 'users', targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUserId)
  });

  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUserId)
  });
};

export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
  const currentUserRef = doc(db, 'users', currentUserId);
  const targetUserRef = doc(db, 'users', targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId)
  });

  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId)
  });
};

export const getActivities = (callback: (activities: Activity[]) => void) => {
  const activitiesRef = collection(db, 'activities');
  const q = query(activitiesRef, orderBy('timestamp', 'desc'), limit(20));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const activities: Activity[] = [];
    snapshot.forEach((child) => {
      activities.push({ id: child.id, ...child.data() } as Activity);
    });
    callback(activities);
  });

  return unsubscribe;
};
