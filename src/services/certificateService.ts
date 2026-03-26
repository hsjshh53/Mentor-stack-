import { ref, set, get, push, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { Certificate, UserProgress, CareerPath, CertificateTier } from '../types';
import { CURRICULUM } from '../constants/curriculum';

export const checkCertificateEligibility = (progress: UserProgress, path: CareerPath): boolean => {
  const pathData = CURRICULUM[path];
  if (!pathData) return false;

  // 1. All lessons completed
  const allLessons = pathData.modules.flatMap(m => m.lessons);
  const allLessonsCompleted = allLessons.every(id => progress.completedLessons?.includes(id));

  // 2. All module tests passed
  const allTests = pathData.modules.filter(m => m.testId).map(m => m.testId!);
  const allTestsPassed = allTests.every(id => progress.completedTests?.includes(id));

  // 3. Final exam passed
  const examPassed = progress.completedExams?.includes(pathData.finalExamId);

  // 4. At least one capstone project completed
  // Assuming projects are linked to modules or the path
  const pathProjects = pathData.modules.filter(m => m.projectId).map(m => m.projectId!);
  const projectCompleted = pathProjects.some(id => progress.completedProjects?.includes(id));

  return allLessonsCompleted && allTestsPassed && examPassed && projectCompleted;
};

export const generateCertificate = async (
  userId: string,
  fullName: string,
  path: CareerPath,
  score: number,
  projectTitle: string,
  tier: CertificateTier = 'Professional'
): Promise<Certificate> => {
  const pathData = CURRICULUM[path];
  
  // Check if user already has a certificate for this path
  const userCertsRef = ref(db, `users/${userId}/progress/certificates`);
  const userCertsSnapshot = await get(userCertsRef);
  const userCertIds = userCertsSnapshot.exists() ? userCertsSnapshot.val() : [];
  
  // Fetch existing certificates to check for path
  for (const certId of userCertIds) {
    const certRef = ref(db, `certificates/${certId}`);
    const certSnapshot = await get(certRef);
    if (certSnapshot.exists() && certSnapshot.val().pathName === path) {
      return certSnapshot.val();
    }
  }

  const certsRef = ref(db, 'certificates');
  const newCertRef = push(certsRef);
  const certId = newCertRef.key!;

  const certificate: Certificate = {
    id: certId,
    userId,
    fullName,
    pathName: path,
    tier,
    issueDate: new Date().toISOString(),
    finalScore: score,
    projectTitle,
    skills: pathData.skills || [],
    verificationUrl: `${window.location.origin}/verify/${certId}`,
    isValid: true
  };

  await set(newCertRef, certificate);

  // Update user progress with new certificate ID
  await set(userCertsRef, [...userCertIds, certId]);

  return certificate;
};

export const getCertificate = async (certId: string): Promise<Certificate | null> => {
  const certRef = ref(db, `certificates/${certId}`);
  const snapshot = await get(certRef);
  return snapshot.exists() ? snapshot.val() : null;
};

export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  const userCertsRef = ref(db, `users/${userId}/progress/certificates`);
  const snapshot = await get(userCertsRef);
  if (!snapshot.exists()) return [];
  
  const certIds = snapshot.val();
  const certificates: Certificate[] = [];
  
  for (const certId of certIds) {
    const cert = await getCertificate(certId);
    if (cert) certificates.push(cert);
  }
  
  return certificates;
};
