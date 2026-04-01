import { CareerPath } from '../types';

export const CURRICULUM: Record<string, any> = {
  'Frontend Development': {
    category: 'Web Development',
    status: 'active',
    levels: {
      'Beginner': {
        modules: [
          { id: 'm1', title: 'HTML Basics', lessons: ['l1', 'l2'], testId: 't1' }
        ]
      }
    },
    finalExamId: 'exam1'
  },
  'Backend Development': {
    category: 'Web Development',
    status: 'active',
    levels: {
      'Beginner': {
        modules: [
          { id: 'm2', title: 'Node.js Intro', lessons: ['l3', 'l4'], testId: 't2' }
        ]
      }
    },
    finalExamId: 'exam2'
  }
};

export const PROJECTS = [
  { id: 'p1', title: 'Personal Portfolio' },
  { id: 'p2', title: 'Task Manager API' },
  { id: 'p3', title: 'E-commerce App' }
];
