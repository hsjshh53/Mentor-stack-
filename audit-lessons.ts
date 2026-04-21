
import { LESSON_CONTENT } from './src/constants/lessons';

const badLessons: string[] = [];
const findings: string[] = [];

Object.entries(LESSON_CONTENT).forEach(([id, lesson]: [string, any]) => {
  let isBad = false;
  let reason = '';

  // Check for placeholder titles or IDs
  if (id === 'coming-soon' || (lesson.title && lesson.title.toLowerCase().includes('coming soon'))) {
    isBad = true;
    reason = 'Placeholder "Coming Soon" content';
  }

  // Check for missing core sections
  const requiredFields = ['title', 'todayYouAreLearning', 'whyItMatters', 'explanation'];
  for (const field of requiredFields) {
    if (!lesson[field] || lesson[field].trim().length === 0) {
      isBad = true;
      reason = `Missing required field: ${field}`;
      break;
    }
  }

  // Check for very short explanation
  if (!isBad && lesson.explanation.length < 200) {
    isBad = true;
    reason = 'Explanation too short to be useful for learning (< 200 chars)';
  }

  // Check for placeholder text like TODO or unfinished sentences
  if (!isBad) {
    const textToSearch = JSON.stringify(lesson).toLowerCase();
    if (textToSearch.includes('todo') || textToSearch.includes('implement me') || textToSearch.includes('...')) {
        // ... might be okay, but TODO usually isn't
        if (textToSearch.includes('todo')) {
            isBad = true;
            reason = 'Contains placeholder TODO text';
        }
    }
  }

  if (isBad) {
    badLessons.push(id);
    findings.push(`DELETE: ${lesson.title || id} (${id}) -> ${reason}`);
  } else {
    findings.push(`KEEP: ${lesson.title} (${id})`);
  }
});

console.log(findings.join('\n'));
console.log('\n--- SUMMARY ---');
console.log(`Total lessons evaluated: ${Object.keys(LESSON_CONTENT).length}`);
console.log(`✅ KEEP: ${Object.keys(LESSON_CONTENT).length - badLessons.length}`);
console.log(`❌ DELETE: ${badLessons.length}`);
