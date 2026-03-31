import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { firestore as db } from '../lib/firebase';
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
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    const existingCerts = userData.progress?.certificates || [];
    
    for (const certId of existingCerts) {
      const certSnap = await getDoc(doc(db, 'certificates', certId));
      if (certSnap.exists() && certSnap.data().pathName === path) {
        return certSnap.data() as Certificate;
      }
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

  const certRef = collection(db, 'certificates');
  const newCertDoc = await addDoc(certRef, {
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
    isValid: true,
    issuedBy: "MentorStack AI by OLYNQ SOCIAL"
  });

  const certId = newCertDoc.id;
  const verificationUrl = `${window.location.origin}/verify/${certId}`;
  
  await updateDoc(newCertDoc, { id: certId, verificationUrl });

  // Update user progress with new certificate ID
  const userSnap2 = await getDoc(userRef);
  if (userSnap2.exists()) {
    const userData = userSnap2.data();
    const certs = userData.progress?.certificates || [];
    await updateDoc(userRef, {
      'progress.certificates': [...certs, certId]
    });
  }

  const finalCertSnap = await getDoc(newCertDoc);
  return finalCertSnap.data() as Certificate;
};

export const getCertificate = async (certId: string): Promise<Certificate | null> => {
  const certRef = doc(db, 'certificates', certId);
  const snapshot = await getDoc(certRef);
  return snapshot.exists() ? snapshot.data() as Certificate : null;
};

export const getUserCertificates = async (userId: string): Promise<Certificate[]> => {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return [];
  
  const data = snapshot.data();
  const certIds = data.progress?.certificates || [];
  const certificates: Certificate[] = [];
  
  for (const certId of certIds) {
    const cert = await getCertificate(certId);
    if (cert) certificates.push(cert);
  }
  
  return certificates;
};
