import { CURRICULUM } from './src/constants/curriculum';
import { LESSON_CONTENT } from './src/constants/lessons';

const curriculumIds = Object.values(CURRICULUM).flat().map(step => step.id);
const lessonContentIds = Object.keys(LESSON_CONTENT);

const missingIds = curriculumIds.filter(id => !lessonContentIds.includes(id) && id !== 'coming-soon');

console.log('Missing IDs:', missingIds);
