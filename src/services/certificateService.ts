import { ref, set, get, push, update } from 'firebase/database';
import { db } from '../lib/firebase';
import { Certificate, UserProgress, CareerPath, CertificateTier } from '../types';
import { CURRICULUM, PROJECTS } from '../constants/curriculum';

export const checkCertificateEligibility = (progress: UserProgress, path: CareerPath): boolean => {
  const pathData = CURRICULUM[path];
  if (!pathData) return false;

  // 1. All lessons completed
  const allLessons = Object.values(pathData.levels).flatMap(level => 
    level.modules.flatMap(m => m.lessons)
  );
  const allLessonsCompleted = allLessons.every(id => progress.completedLessons?.includes(id));

  // 2. All module tests passed
  const allTests = Object.values(pathData.levels).flatMap(level => 
    level.modules.filter(m => m.testId).map(m => m.testId!)
  );
  const allTestsPassed = allTests.every(id => progress.completedTests?.includes(id));

  // 3. Final exam passed
  const examPassed = progress.completedExams?.includes(pathData.finalExamId);

  // 4. All projects in the path must be submitted with a GitHub link
  const pathProjectIds = Object.values(pathData.levels).flatMap(level => 
    level.modules.filter(m => m.projectId).map(m => m.projectId!)
  );
  const allProjectsSubmitted = pathProjectIds.every(id => {
    const submission = progress.submissions?.[id];
    return submission && submission.githubLink && submission.githubLink.trim() !== '';
  });

  return allLessonsCompleted && allTestsPassed && examPassed && allProjectsSubmitted;
};

export const generateCertificate = async (
  userId: string,
  fullName: string,
  path: CareerPath,
  score: number,
  progress: UserProgress,
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

  // Get project details from submissions
  const pathProjectIds = Object.values(pathData.levels).flatMap(level => 
    level.modules.filter(m => m.projectId).map(m => m.projectId!)
  );
  const certProjects = pathProjectIds.map(id => {
    const submission = progress.submissions[id];
    const project = PROJECTS.find(p => p.id === id);
    return {
      title: project?.title || 'Unknown Project',
      githubLink: submission.githubLink,
      liveLink: submission.liveLink
    };
  });

  const certsRef = ref(db, 'certificates');
  const newCertRef = push(certsRef);
  const certId = newCertRef.key!;

  const certificate: Certificate = {
    id: certId,
    userId,
    fullName,
    pathName: path,
    tier,
    level: 'Advanced', // Defaulting to Advanced for path completion
    issueDate: new Date().toISOString(),
    finalScore: score,
    skills: pathData.skills || [],
    projectTitle: certProjects[certProjects.length - 1]?.title || 'Capstone Project',
    projects: certProjects,
    verificationUrl: `${window.location.origin}/verify/${certId}`,
    isValid: true,
    issuedBy: "OLYNQ Stack AI by OLYNQ SOCIAL"
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
