import { ref, get, set, update, remove, push } from 'firebase/database';
import { db } from '../lib/firebase';
import { Skill } from '../types';
import { DEFAULT_SKILLS } from '../constants/skills';

const SKILLS_PATH = 'skills';

export const skillService = {
  /**
   * Initialize skills if they don't exist
   */
  async initializeSkills() {
    try {
      const skillsRef = ref(db, SKILLS_PATH);
      const snapshot = await get(skillsRef);
      
      if (!snapshot.exists()) {
        console.log('Seeding default skills...');
        const skillsMap: Record<string, Skill> = {};
        const pathsMap: Record<string, any> = {};

        DEFAULT_SKILLS.forEach(skill => {
          skillsMap[skill.id] = { ...skill, status: 'active', published: true };
          
          // Seed initial curriculum path for each skill
          pathsMap[skill.id] = {
            id: skill.id,
            skillId: skill.id,
            title: skill.category === 'coding-languages' 
              ? `Mastering ${skill.title}: The Complete Professional Guide`
              : `Professional ${skill.title} Academy Program`,
            description: skill.description,
            summary: `Master ${skill.title} through a structured ${skill.estimatedWeeks}-week program.`,
            durationWeeks: skill.estimatedWeeks,
            targetOutcome: skill.careerOutcome,
            status: 'active',
            totalModules: 0,
            totalLessons: 0,
            estimatedDuration: skill.estimatedCompletionTime,
            projectsCount: 0,
            jobOutcome: skill.careerOutcome
          };
        });

        await set(skillsRef, skillsMap);
        await set(ref(db, 'curriculum_paths'), pathsMap);
        
        return DEFAULT_SKILLS;
      }
      
      return Object.values(snapshot.val()) as Skill[];
    } catch (error) {
      console.error('Error initializing skills:', error);
      return [];
    }
  },

  /**
   * Seed missing skills from DEFAULT_SKILLS
   */
  async seedMissingSkills() {
    try {
      const skillsRef = ref(db, SKILLS_PATH);
      const snapshot = await get(skillsRef);
      const existingSkills = snapshot.exists() ? snapshot.val() : {};
      const existingSkillTitles = new Set(Object.values(existingSkills).map((s: any) => s.title.toLowerCase()));

      const skillsToSeed = DEFAULT_SKILLS.filter(skill => !existingSkillTitles.has(skill.title.toLowerCase()));

      if (skillsToSeed.length > 0) {
        console.log(`Seeding ${skillsToSeed.length} missing skills...`);
        const updates: Record<string, any> = {};
        const pathUpdates: Record<string, any> = {};

        skillsToSeed.forEach(skill => {
          updates[`${SKILLS_PATH}/${skill.id}`] = { ...skill, status: 'active', published: true };
          pathUpdates[`curriculum_paths/${skill.id}`] = {
            id: skill.id,
            skillId: skill.id,
            title: skill.category === 'coding-languages'
              ? `Mastering ${skill.title}: The Complete Professional Guide`
              : `Professional ${skill.title} Academy Program`,
            description: skill.description,
            summary: `Master ${skill.title} through a structured ${skill.estimatedWeeks}-week program.`,
            durationWeeks: skill.estimatedWeeks,
            targetOutcome: skill.careerOutcome,
            status: 'active',
            totalModules: 0,
            totalLessons: 0,
            estimatedDuration: skill.estimatedCompletionTime,
            projectsCount: 0,
            jobOutcome: skill.careerOutcome
          };
        });

        await update(ref(db), { ...updates, ...pathUpdates });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error seeding missing skills:', error);
      return false;
    }
  },

  /**
   * Get all skills
   */
  async getSkills(): Promise<Skill[]> {
    try {
      const skillsRef = ref(db, SKILLS_PATH);
      const snapshot = await get(skillsRef);
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as Skill[];
      }
      return [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },

  /**
   * Add a new skill
   */
  async addSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
    const skillsRef = ref(db, SKILLS_PATH);
    const newSkillRef = push(skillsRef);
    const id = newSkillRef.key as string;
    const newSkill = { ...skill, id };
    await set(newSkillRef, newSkill);
    return newSkill;
  },

  /**
   * Update an existing skill
   */
  async updateSkill(id: string, updates: Partial<Skill>): Promise<void> {
    const skillRef = ref(db, `${SKILLS_PATH}/${id}`);
    await update(skillRef, updates);
  },

  /**
   * Delete a skill
   */
  async deleteSkill(id: string): Promise<void> {
    const skillRef = ref(db, `${SKILLS_PATH}/${id}`);
    await remove(skillRef);
  },

  /**
   * Toggle skill status
   */
  async toggleSkillStatus(id: string, currentStatus: 'active' | 'draft'): Promise<void> {
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    await this.updateSkill(id, { status: newStatus });
  }
};
