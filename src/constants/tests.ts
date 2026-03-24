import { StageTest } from '../types';

export const STAGE_TESTS: StageTest[] = [
  {
    id: 'foundations-test',
    title: 'Foundations Test',
    stage: 'Beginner',
    path: 'Frontend Developer',
    description: 'Test your understanding of the absolute basics of coding and the web.',
    questions: [
      {
        question: 'What is the primary purpose of HTML?',
        options: ['To add interactivity', 'To style the page', 'To define the structure of the page', 'To store data'],
        correctIndex: 2,
        explanation: 'HTML provides the skeleton or structure of a web page.'
      },
      {
        question: 'Which of these is a valid real-world analogy for CSS?',
        options: ['The wooden frame of a house', 'The paint and furniture in a house', 'The electricity in a house', 'The foundation of a house'],
        correctIndex: 1,
        explanation: 'CSS is like the paint and furniture; it makes the structure look good.'
      },
      {
        question: 'What does a computer CPU actually understand at the lowest level?',
        options: ['English', 'JavaScript', 'Binary (1s and 0s)', 'Python'],
        correctIndex: 2,
        explanation: 'CPUs process binary instructions.'
      }
    ],
    minScoreToPass: 2,
    xpReward: 200
  }
];
