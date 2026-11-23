const fs = require('fs');
const path = require('path');

const mdPath = 'C:/Users/IKA/.gemini/antigravity/brain/9132d844-d908-46be-b21b-c3088d445952/.user_uploaded/psy_205_complete_modules_1_8.md';
const mdContent = fs.readFileSync(mdPath, 'utf8');

// Regex to capture ~~~json ... ~~~
const blockRegex = /~~~json\r?\n([\s\S]*?)\r?\n~~~/g;
const modules = [];

let match;
while ((match = blockRegex.exec(mdContent)) !== null) {
  const jsonStr = match[1];
  try {
    const mod = JSON.parse(jsonStr);
    modules.push(mod);
  } catch (err) {
    console.error('Error parsing JSON block:', err);
    process.exit(1);
  }
}

console.log(`Extracted ${modules.length} modules.`);
if (modules.length !== 8) {
  console.error(`Expected 8 modules, but got ${modules.length}`);
  process.exit(1);
}

const targetDirs = [
  path.resolve(__dirname, '../../content/psy205'),
  path.resolve(__dirname, '../src/data/psy205')
];

for (const dir of targetDirs) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const mod of modules) {
  if (!mod.id || !mod.title || !mod.content || !mod.inTextQuestions || !mod.saqs) {
    console.error(`Module ${mod.id} is missing required fields!`);
    process.exit(1);
  }
  const formatted = JSON.stringify(mod, null, 2);
  for (const dir of targetDirs) {
    fs.writeFileSync(path.join(dir, `module${mod.id}.json`), formatted + '\n', 'utf8');
  }
  console.log(`Saved Module ${mod.id}: "${mod.title}" (Content: ${mod.content.length}, ITQs: ${mod.inTextQuestions.length}, SAQs: ${mod.saqs.length})`);
}

// Generate index.ts
const indexContent = `import type { StudySession } from '../../types';
import module1 from './module1.json';
import module2 from './module2.json';
import module3 from './module3.json';
import module4 from './module4.json';
import module5 from './module5.json';
import module6 from './module6.json';
import module7 from './module7.json';
import module8 from './module8.json';

export const psy205Modules: StudySession[] = [
  module1 as unknown as StudySession,
  module2 as unknown as StudySession,
  module3 as unknown as StudySession,
  module4 as unknown as StudySession,
  module5 as unknown as StudySession,
  module6 as unknown as StudySession,
  module7 as unknown as StudySession,
  module8 as unknown as StudySession,
];

export async function loadPsy205Sessions(): Promise<StudySession[]> {
  return psy205Modules;
}

export async function getPsy205DrillQuestions() {
  const questions = await import('./questions.json');
  return questions.default || questions;
}
`;

fs.writeFileSync(path.resolve(__dirname, '../../content/psy205/index.ts'), indexContent, 'utf8');
fs.writeFileSync(path.resolve(__dirname, '../src/data/psy205/index.ts'), indexContent, 'utf8');

console.log('Successfully wrote index.ts in both content/psy205 and src/data/psy205.');
