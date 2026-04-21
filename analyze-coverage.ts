
import { CURRICULUM } from './src/constants/curriculum';
import { LESSON_CONTENT } from './src/constants/lessons';

const allLessonIds = new Set<string>();

Object.values(CURRICULUM).forEach((path: any) => {
  if (path.levels) {
    Object.values(path.levels).forEach((level: any) => {
      if (level.modules) {
        level.modules.forEach((module: any) => {
          if (module.lessons) {
            module.lessons.forEach((lessonId: string) => {
              allLessonIds.add(lessonId);
            });
          }
        });
      }
    });
  }
});

const lessonContentIds = Object.keys(LESSON_CONTENT);
const missingInConstants = Array.from(allLessonIds).filter(id => !lessonContentIds.includes(id));
const inConstantsButNotCurriculum = lessonContentIds.filter(id => !allLessonIds.has(id));

console.log('Total unique lessons in Curriculum:', allLessonIds.size);
console.log('Total lessons in LESSON_CONTENT:', lessonContentIds.length);
console.log('Lessons in CURRICULUM but NOT in LESSON_CONTENT:', missingInConstants.length);
console.log('Sample missing:', missingInConstants.slice(0, 10));
console.log('Lessons in LESSON_CONTENT but NOT in CURRICULUM:', inConstantsButNotCurriculum.length);
