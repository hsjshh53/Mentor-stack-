import { GoogleGenAI, Type } from "@google/genai";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  where,
  Timestamp,
  increment
} from "firebase/firestore";
import { firestore as db } from "../lib/firebase";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface GeneratedLesson {
  title: string;
  objective: string;
  explanation: string;
  whyItMatters: string;
  analogy: string;
  stepByStep: string[];
  codeExample?: {
    code: string;
    language: string;
    explanation: string;
  };
  visualExplanation: string;
  commonMistakes: string[];
  practiceTask: string;
  miniChallenge: string;
  reflectionQuestion: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface CurriculumRoadmap {
  skill: string;
  modules: {
    name: string;
    lessonStart: number;
    lessonEnd: number;
    topics: string[];
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }[];
  totalLessons: number;
}

export interface GenerationProgress {
  skill: string;
  totalLessons: number;
  completedLessons: number;
  status: 'idle' | 'generating' | 'paused' | 'completed' | 'error';
  currentModuleIndex: number;
  currentLessonNumber: number;
  error?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeLearners: number;
  lessonsCompleted: number;
  certificatesIssued: number;
}

export interface AdminActivity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: number;
}

// AI Generation Functions
export async function generateLesson(
  skill: string,
  tool: string,
  level: string,
  module: string,
  lessonNumber: number,
  previousLessonContext?: string
): Promise<GeneratedLesson> {
  const prompt = `
    Generate a high-quality, comprehensive lesson for the following:
    Skill: ${skill}
    Tool/Technology: ${tool}
    Level: ${level}
    Module: ${module}
    Lesson Number: ${lessonNumber}
    ${previousLessonContext ? `Previous Lesson Context: ${previousLessonContext}` : ''}

    The lesson must follow this exact structure:
    1. Lesson Title
    2. Learning Objective
    3. Simple Explanation
    4. Why It Matters
    5. Real-world Analogy
    6. Step-by-step Explanation
    7. Code Example (if applicable)
    8. Visual Explanation (describe what a visual aid would show)
    9. Common Mistakes
    10. Practice Task
    11. Mini Challenge
    12. Reflection Question
    13. Quiz (3–5 questions)

    Quality Rules:
    - Do NOT generate shallow lessons.
    - Each lesson must feel like a real class.
    - Lessons must build progressively.
    - Match the selected skill/tool exactly.
    - Use Markdown for formatting.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          objective: { type: Type.STRING },
          explanation: { type: Type.STRING },
          whyItMatters: { type: Type.STRING },
          analogy: { type: Type.STRING },
          stepByStep: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          codeExample: {
            type: Type.OBJECT,
            properties: {
              code: { type: Type.STRING },
              language: { type: Type.STRING },
              explanation: { type: Type.STRING }
            }
          },
          visualExplanation: { type: Type.STRING },
          commonMistakes: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          practiceTask: { type: Type.STRING },
          miniChallenge: { type: Type.STRING },
          reflectionQuestion: { type: Type.STRING },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.INTEGER },
                explanation: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer", "explanation"]
            }
          }
        },
        required: [
          "title", "objective", "explanation", "whyItMatters", "analogy", 
          "stepByStep", "visualExplanation", "commonMistakes", "practiceTask", 
          "miniChallenge", "reflectionQuestion", "quiz"
        ]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateRoadmap(skill: string): Promise<CurriculumRoadmap> {
  const prompt = `
    Generate a comprehensive curriculum roadmap for the skill: ${skill}.
    The roadmap should cover everything from absolute beginner to expert level.
    Divide the curriculum into 5-8 logical modules.
    Each module should have a name, a range of lesson numbers (e.g., 1-15), and a list of key topics covered.
    Total lessons should be around 100.

    Return the roadmap in this exact JSON structure:
    {
      "skill": "${skill}",
      "totalLessons": 100,
      "modules": [
        {
          "name": "Module Name",
          "lessonStart": 1,
          "lessonEnd": 15,
          "topics": ["Topic 1", "Topic 2"]
        }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          totalLessons: { type: Type.INTEGER },
          modules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                lessonStart: { type: Type.INTEGER },
                lessonEnd: { type: Type.INTEGER },
                topics: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                level: { 
                  type: Type.STRING,
                  enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
                }
              },
              required: ["name", "lessonStart", "lessonEnd", "topics", "level"]
            }
          }
        },
        required: ["skill", "totalLessons", "modules"]
      }
    }
  });

  const roadmap = JSON.parse(response.text);
  
  // Store roadmap in Firebase
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  await setDoc(doc(db, 'curriculum_roadmaps', skillId), {
    ...roadmap,
    updatedAt: Date.now()
  });

  return roadmap;
}

export async function getRoadmap(skill: string): Promise<CurriculumRoadmap | null> {
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  const snap = await getDoc(doc(db, 'curriculum_roadmaps', skillId));
  return snap.exists() ? snap.data() as CurriculumRoadmap : null;
}

export async function updateGenerationProgress(skill: string, progress: Partial<GenerationProgress>) {
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  await setDoc(doc(db, 'generation_progress', skillId), progress, { merge: true });
}

export async function getGenerationProgress(skill: string): Promise<GenerationProgress | null> {
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  const snap = await getDoc(doc(db, 'generation_progress', skillId));
  return snap.exists() ? snap.data() as GenerationProgress : null;
}

export async function generateModule(
  skill: string,
  moduleName: string,
  lessonStart: number,
  lessonEnd: number,
  level: string,
  topics: string[]
) {
  const skillId = skill.toLowerCase().replace(/\s+/g, '-');
  const moduleId = moduleName.toLowerCase().replace(/\s+/g, '-');

  for (let i = lessonStart; i <= lessonEnd; i++) {
    const lesson = await generateLesson(
      skill,
      skill,
      level,
      moduleName,
      i,
      `Topics: ${topics.join(', ')}`
    );

    await saveLesson(skillId, moduleId, {
      ...lesson,
      status: 'draft',
      order: i
    });
  }
}

export async function generateFullCurriculum(skill: string) {
  const roadmap = await generateRoadmap(skill);
  for (const module of roadmap.modules) {
    await generateModule(
      skill,
      module.name,
      module.lessonStart,
      module.lessonEnd,
      module.level,
      module.topics
    );
  }
}

export async function getDraftLessons(skillId: string) {
  const lessonsRef = collection(db, 'lessons');
  const q = query(
    lessonsRef, 
    where('skillId', '==', skillId),
    where('status', '==', 'draft'),
    orderBy('order', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as GeneratedLesson & { id: string }));
}

export async function publishLesson(lessonId: string) {
  const lessonRef = doc(db, 'lessons', lessonId);
  await updateDoc(lessonRef, { status: 'published' });
}

// Admin Activity Logging
export async function logAdminActivity(user: string, action: string, target: string) {
  try {
    await addDoc(collection(db, 'admin_activity'), {
      user,
      action,
      target,
      time: Date.now()
    });
  } catch (error) {
    console.error('Error logging admin activity:', error);
  }
}

export async function getRecentActivity(): Promise<AdminActivity[]> {
  try {
    const q = query(collection(db, 'admin_activity'), orderBy('time', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AdminActivity[];
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    throw error;
  }
}

// Dashboard Stats
export async function getAdminStats(): Promise<AdminStats> {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => doc.data());

    let lessonsCompleted = 0;
    let certificatesIssued = 0;
    let activeLearners = 0;

    const today = new Date().toISOString().split('T')[0];

    users.forEach((user: any) => {
      const progress = user.progress || {};
      lessonsCompleted += (progress.completedLessons || []).length;
      certificatesIssued += (progress.certificates || []).length;
      
      if (progress.lastActiveDate === today) {
        activeLearners++;
      }
    });

    return {
      totalUsers: users.length,
      activeLearners,
      lessonsCompleted,
      certificatesIssued
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
}

// User Management
export async function getAllUsers(): Promise<any[]> {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data().progress,
      email: doc.data().email || 'No email',
      name: doc.data().name || 'Anonymous'
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
}

export async function updateUserStatus(userId: string, status: string) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      'progress.status': status
    });
    await logAdminActivity('admin', 'updated_user_status', `Updated user ${userId} status to ${status}`);
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
}

// Skills & Tools
export async function getSkills(): Promise<any[]> {
  try {
    const snapshot = await getDocs(collection(db, 'skills'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
}

export async function getSkillById(skillId: string): Promise<any> {
  try {
    const snapshot = await getDoc(doc(db, 'skills', skillId));
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error('Error fetching skill by id:', error);
    throw error;
  }
}

export async function updateSkill(skillId: string, updates: any) {
  try {
    await updateDoc(doc(db, 'skills', skillId), updates);
    await logAdminActivity('admin', 'updated_skill', `Updated skill ${skillId}`);
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
}

// Curriculum & Modules
export async function getModules(skillId: string): Promise<any[]> {
  try {
    const q = query(collection(db, 'modules'), where('skillId', '==', skillId), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw error;
  }
}

export async function getModuleById(skillId: string, moduleId: string): Promise<any> {
  try {
    const snapshot = await getDoc(doc(db, 'modules', moduleId));
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error('Error fetching module by id:', error);
    throw error;
  }
}

export async function addModule(skillId: string, title: string, order: number) {
  try {
    await addDoc(collection(db, 'modules'), {
      skillId,
      title,
      order,
      lessons: []
    });
  } catch (error) {
    console.error('Error adding module:', error);
    throw error;
  }
}

export async function updateModule(skillId: string, moduleId: string, updates: any) {
  try {
    await updateDoc(doc(db, 'modules', moduleId), updates);
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
}

export async function deleteModule(skillId: string, moduleId: string) {
  try {
    await deleteDoc(doc(db, 'modules', moduleId));
  } catch (error) {
    console.error('Error deleting module:', error);
    throw error;
  }
}

// Lessons
export async function saveLesson(skillId: string, moduleId: string, lessonData: any) {
  try {
    const lessonId = lessonData.id || `lesson-${Date.now()}`;
    await setDoc(doc(db, 'lessons', lessonId), {
      ...lessonData,
      updatedAt: Date.now()
    });

    // Update module curriculum
    const moduleRef = doc(db, 'modules', moduleId);
    const moduleSnap = await getDoc(moduleRef);
    if (moduleSnap.exists()) {
      const moduleData = moduleSnap.data();
      const lessons = moduleData.lessons || [];
      const lessonIndex = lessons.findIndex((l: any) => l.id === lessonId);
      
      if (lessonIndex > -1) {
        lessons[lessonIndex] = { ...lessons[lessonIndex], ...lessonData };
      } else {
        lessons.push({
          id: lessonId,
          title: lessonData.title,
          status: lessonData.status || 'draft',
          order: lessonData.order || lessons.length + 1
        });
      }
      
      await updateDoc(moduleRef, { lessons });
    }
  } catch (error) {
    console.error('Error saving lesson:', error);
    throw error;
  }
}

// Announcements
export async function getAnnouncements(): Promise<any[]> {
  try {
    const q = query(collection(db, 'announcements'), orderBy('time', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
}

export async function addAnnouncement(announcement: any) {
  try {
    await addDoc(collection(db, 'announcements'), {
      ...announcement,
      time: Date.now()
    });
    await logAdminActivity('admin', 'created_announcement', announcement.title);
  } catch (error) {
    console.error('Error adding announcement:', error);
    throw error;
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    await deleteDoc(doc(db, 'announcements', id));
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
}

// Moderation
export async function getReports(): Promise<any[]> {
  try {
    const q = query(collection(db, 'reports'), orderBy('time', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
}

export async function updateReportStatus(id: string, status: string) {
  try {
    await updateDoc(doc(db, 'reports', id), { status });
    await logAdminActivity('admin', 'updated_report_status', `${id} to ${status}`);
  } catch (error) {
    console.error('Error updating report status:', error);
    throw error;
  }
}

export async function deleteReport(id: string) {
  try {
    await deleteDoc(doc(db, 'reports', id));
  } catch (error) {
    console.error('Error deleting report:', error);
    throw error;
  }
}

// Certificates
export async function getCertificates(): Promise<any[]> {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const certificates: any[] = [];

    usersSnapshot.docs.forEach(doc => {
      const userData = doc.data();
      const userCerts = userData.progress?.certificates || [];
      userCerts.forEach((cert: any) => {
        certificates.push({
          ...cert,
          userId: doc.id,
          userName: userData.name || 'Anonymous'
        });
      });
    });

    return certificates.sort((a: any, b: any) => b.time - a.time);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
}

export async function revokeCertificate(userId: string, certId: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const certs = userData.progress?.certificates || [];
      const updatedCerts = certs.filter((c: any) => c.id !== certId);
      await updateDoc(userRef, {
        'progress.certificates': updatedCerts
      });
      await logAdminActivity('admin', 'revoked_certificate', certId);
    }
  } catch (error) {
    console.error('Error revoking certificate:', error);
    throw error;
  }
}

// Projects
export async function getProjectSubmissions(): Promise<any[]> {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const submissions: any[] = [];

    usersSnapshot.docs.forEach(doc => {
      const userData = doc.data();
      const userProjects = userData.progress?.projects || [];
      userProjects.forEach((project: any) => {
        submissions.push({
          ...project,
          userId: doc.id,
          userName: userData.name || 'Anonymous'
        });
      });
    });

    return submissions.sort((a: any, b: any) => b.time - a.time);
  } catch (error) {
    console.error('Error fetching project submissions:', error);
    throw error;
  }
}

export async function updateProjectStatus(userId: string, projectId: string, status: string) {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const projects = userData.progress?.projects || [];
      const updatedProjects = projects.map((p: any) => {
        if (p.id === projectId) {
          return { ...p, status };
        }
        return p;
      });
      await updateDoc(userRef, {
        'progress.projects': updatedProjects
      });
      await logAdminActivity('admin', 'updated_project_status', `${projectId} to ${status}`);
    }
  } catch (error) {
    console.error('Error updating project status:', error);
    throw error;
  }
}

// Settings
export async function getPlatformSettings(): Promise<any> {
  try {
    const snapshot = await getDoc(doc(db, 'admin_settings', 'platform'));
    return snapshot.exists() ? snapshot.data() : {
      platformName: 'MentorStack',
      supportEmail: 'support@mentorstack.dev',
      maintenanceMode: false,
      twoFactorAuth: true,
      sessionTimeout: true
    };
  } catch (error) {
    console.error('Error fetching platform settings:', error);
    throw error;
  }
}

export async function updatePlatformSettings(settings: any) {
  try {
    await setDoc(doc(db, 'admin_settings', 'platform'), settings);
    await logAdminActivity('admin', 'updated_settings', 'Updated platform settings');
  } catch (error) {
    console.error('Error updating platform settings:', error);
    throw error;
  }
}

// Curriculum Editor Helpers
export async function getSkillCurriculum(skillId: string): Promise<any> {
  try {
    const snapshot = await getDoc(doc(db, 'skills', skillId));
    if (snapshot.exists()) {
      const skillData = snapshot.data();
      const modulesQ = query(collection(db, 'modules'), where('skillId', '==', skillId), orderBy('order', 'asc'));
      const modulesSnap = await getDocs(modulesQ);
      const modules = modulesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { ...skillData, modules };
    }
    return { modules: [] };
  } catch (error) {
    console.error('Error fetching skill curriculum:', error);
    throw error;
  }
}

export async function updateSkillCurriculum(skillId: string, curriculum: any) {
  try {
    const { modules, ...skillData } = curriculum;
    await updateDoc(doc(db, 'skills', skillId), skillData);
    
    // Update modules
    if (modules) {
      for (const module of modules) {
        if (module.id) {
          await setDoc(doc(db, 'modules', module.id), { ...module, skillId }, { merge: true });
        } else {
          await addDoc(collection(db, 'modules'), { ...module, skillId });
        }
      }
    }
    
    await logAdminActivity('admin', 'updated_curriculum', `Updated curriculum for ${skillId}`);
  } catch (error) {
    console.error('Error updating skill curriculum:', error);
    throw error;
  }
}

export async function deleteLessonFromModule(skillId: string, moduleId: string, lessonId: string) {
  try {
    const moduleRef = doc(db, 'modules', moduleId);
    const moduleSnap = await getDoc(moduleRef);
    if (moduleSnap.exists()) {
      const moduleData = moduleSnap.data();
      const lessons = moduleData.lessons || [];
      const updatedLessons = lessons.filter((l: any) => l.id !== lessonId);
      await updateDoc(moduleRef, { lessons: updatedLessons });
      
      // Also delete the lesson content
      await deleteDoc(doc(db, 'lessons', lessonId));
    }
  } catch (error) {
    console.error('Error deleting lesson from module:', error);
    throw error;
  }
}
