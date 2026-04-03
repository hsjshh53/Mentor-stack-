import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db, sanitizeFirebaseKey } from '../lib/firebase';
import { CURRICULUM } from '../constants/curriculum';
import { CareerPath, PathCurriculum } from '../types';

export const useCurriculum = (path: CareerPath | null) => {
  const [curriculum, setCurriculum] = useState<PathCurriculum | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurriculum = async () => {
      if (!path) {
        setCurriculum(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      // 1. Check local constants first
      if (CURRICULUM[path]) {
        setCurriculum(CURRICULUM[path]);
        setLoading(false);
        return;
      }

      // 2. Check Firebase
      try {
        const pathId = sanitizeFirebaseKey(path);
        const pathRef = ref(db, `curriculum/${pathId}`);
        const snapshot = await get(pathRef);
        
        if (snapshot.exists()) {
          setCurriculum(snapshot.val() as PathCurriculum);
        } else {
          setError(`Curriculum for ${path} not found.`);
        }
      } catch (err: any) {
        console.error("Error fetching curriculum from Firebase:", err);
        setError(err.message || "Failed to load curriculum.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, [path]);

  return { curriculum, loading, error };
};
