import { doc, setDoc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
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
  const userProgressRef = doc(db, "users", userId, "progress", "data");
  const userProgressSnapshot = await getDoc(userProgressRef);
  const userCertIds = userProgressSnapshot.exists() ? (userProgressSnapshot.data().certificates || []) : [];
  
  // Fetch existing certificates to check for path
  for (const certId of userCertIds) {
    const cert = await getCertificate(certId);
    if (cert && cert.pathName === path) {
      return cert;
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

  const certsRef = collection(db, 'certificates');
  const newCertDoc = await addDoc(certsRef, {
    userId,
    fullName,
    pathName: path,
    tier,
    level: 'Advanced',
    issueDate: new Date().toISOString(),
    finalScore: score,
    skills: pathData.skills || [],
    projectTitle: certProjects[certProjects.length - 1]?.title || 'Capstone Project',
    projects: certProjects,
    verificationUrl: '', // Will update after getting ID
    isValid: true,
    issuedBy: "MentorStack AI by OLYNQ SOCIAL"
  });

  const certId = newCertDoc.id;
  const verificationUrl = `${window.location.origin}/verify/${certId}`;
  
  await updateDoc(newCertDoc, { 
    id: certId,
    verificationUrl 
  });

  const certificate: Certificate = {
    id: certId,
    userId,
    fullName,
    pathName: path,
    tier,
    level: 'Advanced',
    issueDate: new Date().toISOString(),
    finalScore: score,
    skills: pathData.skills || [],
    projectTitle: certProjects[certProjects.length - 1]?.title || 'Capstone Project',
    projects: certProjects,
    verificationUrl,
    isValid: true,
    issuedBy: "MentorStack AI by OLYNQ SOCIAL"
  };

  // Update user progress with new certificate ID
  await updateDoc(userProgressRef, {
    certificates: [...userCertIds, certId]
  });

  return certificate;
};

export const getCertificate = async (certId: string): Promise<Certificate | null> => {
  const certRef = doc(db, 'certificates', certId);
  const snapshot = await getDoc(certRef);
  return snapshot.exists() ? snapshot.data() as Certificate : null;
};

export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  const userProgressRef = doc(db, "users", userId, "progress", "data");
  const snapshot = await getDoc(userProgressRef);
  if (!snapshot.exists()) return [];
  
  const certIds = snapshot.data().certificates || [];
  const certificates: Certificate[] = [];
  
  for (const certId of certIds) {
    const cert = await getCertificate(certId);
    if (cert) certificates.push(cert);
  }
  
  return certificates;
};
