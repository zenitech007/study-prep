const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const contentDir = path.join(root, 'content', 'ana214');
const appDir = path.join(__dirname, '..', 'src', 'data', 'ana214');
const sessions = Array.from({ length: 7 }, (_, index) => {
  const module = JSON.parse(fs.readFileSync(path.join(contentDir, `module${index + 1}.json`), 'utf8'));
  const expected = ['id', 'title', 'introduction', 'learningOutcomes', 'content', 'inTextQuestions', 'saqs'];
  if (module.id !== index + 1 || expected.some((key) => !(key in module))) throw new Error(`Invalid module ${index + 1}`);
  return module;
});

function clean(value) {
  return value.replace(/\[cite:[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();
}

const stop = new Set('a an and are as at be been by for from has have in into is it its of on or that the their them these this those to was were which while with within'.split(' '));
const sentences = sessions.flatMap((module) => module.content.flatMap((section, sectionIndex) => {
  const body = clean(section.body);
  return (body.match(/[^.!?]+[.!?]*/g) || [])
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length >= 45)
    .map((sentence, sentenceIndex) => ({
      moduleId: module.id, topic: module.title, sectionIndex, sentenceIndex,
      heading: clean(section.heading), sentence,
    }));
}));

const frequency = new Map();
for (const { sentence } of sentences) {
  for (const match of sentence.toLowerCase().matchAll(/[a-z][a-z'-]+/g)) {
    if (!stop.has(match[0])) frequency.set(match[0], (frequency.get(match[0]) || 0) + 1);
  }
}

function candidates(sentence) {
  const words = Array.from(sentence.matchAll(/[A-Za-z][A-Za-z'-]*|\d+(?:st|nd|rd|th)?/g), (match) => ({
    word: match[0], start: match.index, end: match.index + match[0].length,
  }));
  const choices = [];
  for (const length of [4, 3]) {
    for (let start = 0; start + length <= words.length; start++) {
      const window = words.slice(start, start + length);
      const first = window[0].word.toLowerCase();
      const last = window[length - 1].word.toLowerCase();
      if (stop.has(first) || stop.has(last)) continue;
      if (window.some((word, index) => index > 0 && !/^\s+$/.test(sentence.slice(window[index - 1].end, word.start)))) continue;
      const contentWords = window.map(({ word }) => word.toLowerCase()).filter((word) => !stop.has(word));
      if (contentWords.length < 2) continue;
      const score = contentWords.reduce((total, word) => total + 1 / Math.sqrt(frequency.get(word) || 1), 0);
      choices.push({ start: window[0].start, end: window[length - 1].end,
        phrase: sentence.slice(window[0].start, window[length - 1].end), length, score });
    }
  }
  return choices.sort((a, b) => b.score - a.score || b.length - a.length);
}

const contentCandidates = sentences.flatMap((entry) => {
  const spans = candidates(entry.sentence);
  if (!spans.length) return [];
  const first = spans[0];
  const second = spans.find((span) => span.end <= first.start || span.start >= first.end);
  return [first, second].filter(Boolean).map((span, variant) => ({ ...entry, span, variant }));
});

const bank = [];
const seenStems = new Set();
function add(question) {
  const key = question.stem.toLowerCase().replace(/\s+/g, ' ');
  if (seenStems.has(key)) return;
  if (new Set(question.options.map((option) => option.toLowerCase())).size !== 4) return;
  seenStems.add(key);
  bank.push(question);
}
function arrange(correct, alternatives, seed) {
  const correctIndex = seed % 4;
  const options = [...alternatives];
  options.splice(correctIndex, 0, correct);
  return { options, correctIndex };
}

for (const module of sessions) {
  const prompts = [
    ...module.inTextQuestions.map((item, index) => ({ ...item, kind: 'itq', index })),
    ...module.saqs.map((item, index) => ({ ...item, kind: 'saq', index })),
  ];
  for (const item of prompts) {
    const answer = clean(item.answer);
    const alternatives = prompts.filter((other) => other !== item && other.kind === item.kind)
      .map((other) => clean(other.answer)).filter((other) => other !== answer)
      .sort((a, b) => Math.abs(a.length - answer.length) - Math.abs(b.length - answer.length)).slice(0, 3);
    if (alternatives.length !== 3) throw new Error(`Not enough source answers in module ${module.id}`);
    const { options, correctIndex } = arrange(answer, alternatives, bank.length);
    add({
      id: `ana214-${item.kind}-m${module.id}-${item.index + 1}`,
      moduleId: module.id, topic: module.title,
      subtopic: item.kind === 'itq' ? 'In-Text Self-Check' : `SAQ ${item.id}`,
      difficulty: item.kind === 'itq' ? 'beginner' : 'intermediate',
      type: item.kind === 'itq' ? 'recall' : 'scenario',
      stem: clean(item.question), options, correctIndex,
      explanation: {
        correct: answer,
        distractors: alternatives.map(() => 'This answer addresses a different prompt in the same module.'),
      },
      sourceTag: 'manual',
    });
  }
}

const needed = 300 - bank.length;
const primary = contentCandidates.filter((item) => item.variant === 0);
const secondary = contentCandidates.filter((item) => item.variant === 1)
  .sort((a, b) => b.sentence.length - a.sentence.length);
if (primary.length + secondary.length < needed) throw new Error('Insufficient content statements for 300 items');

for (const item of [...primary, ...secondary]) {
  if (bank.length >= 300) break;
  const answer = item.span.phrase;
  const alternatives = contentCandidates
    .filter((other) => other.moduleId === item.moduleId && other.sentence !== item.sentence && other.span.length === item.span.length)
    .sort((a, b) => Number(b.sectionIndex === item.sectionIndex) - Number(a.sectionIndex === item.sectionIndex))
    .map((other) => other.span.phrase)
    .filter((phrase) => phrase.toLowerCase() !== answer.toLowerCase() && !item.sentence.toLowerCase().includes(phrase.toLowerCase()));
  const distinct = [...new Map(alternatives.map((phrase) => [phrase.toLowerCase(), phrase])).values()];
  if (distinct.length < 3) continue;
  const offset = (item.sectionIndex * 7 + item.sentenceIndex * 3 + item.variant) % distinct.length;
  const distractors = [...distinct.slice(offset), ...distinct.slice(0, offset)].slice(0, 3);
  const { options, correctIndex } = arrange(answer, distractors, bank.length);
  const blank = `${item.sentence.slice(0, item.span.start)}____${item.sentence.slice(item.span.end)}`;
  add({
    id: `ana214-content-m${item.moduleId}-s${item.sectionIndex + 1}-q${item.sentenceIndex + 1}-v${item.variant + 1}`,
    moduleId: item.moduleId, topic: item.topic, subtopic: item.heading,
    difficulty: item.variant === 0 ? 'beginner' : 'intermediate', type: 'recall',
    stem: `Complete this statement about ${item.heading}: ${blank}`,
    options, correctIndex,
    explanation: {
      correct: `${item.heading}: ${item.sentence}`,
      distractors: distractors.map(() => 'The source statement uses a different phrase at this position.'),
    },
    sourceTag: 'manual',
  });
}

if (bank.length !== 300) throw new Error(`Expected 300 unique questions; found ${bank.length}`);
const output = `${JSON.stringify(bank, null, 2)}\n`;
fs.writeFileSync(path.join(contentDir, 'questions.json'), output);
fs.writeFileSync(path.join(appDir, 'questions.json'), output);
console.log(`Built ${bank.length} unique ANA 214 questions (${bank.filter((q) => q.id.includes('-content-')).length} from content statements).`);
