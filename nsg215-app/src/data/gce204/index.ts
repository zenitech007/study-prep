import type { StudySessionContent, Question } from '../../types';

export type StudySession = Required<Pick<StudySessionContent,
  'id' | 'title' | 'introduction' | 'learningOutcomes' | 'content' | 'inTextQuestions' | 'saqs'>>;

const modules = [
  () => import('./module1.json'), () => import('./module2.json'),
  () => import('./module3.json'), () => import('./module4.json'),
  () => import('./module5.json'), () => import('./module6.json'),
  () => import('./module7.json'), () => import('./module8.json'),
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isSession(value: unknown, expectedId: number): value is StudySession {
  if (!isRecord(value)) return false;
  const item = value;
  return item.id === expectedId && typeof item.title === 'string'
    && typeof item.introduction === 'string'
    && Array.isArray(item.learningOutcomes) && item.learningOutcomes.every((entry: unknown) => typeof entry === 'string')
    && Array.isArray(item.content) && item.content.every((entry: unknown) =>
      isRecord(entry) && typeof entry.heading === 'string' && typeof entry.body === 'string')
    && Array.isArray(item.inTextQuestions) && item.inTextQuestions.every((entry: unknown) =>
      isRecord(entry) && typeof entry.question === 'string' && typeof entry.answer === 'string')
    && Array.isArray(item.saqs) && item.saqs.every((entry: unknown) =>
      isRecord(entry) && typeof entry.id === 'string'
        && typeof entry.question === 'string' && typeof entry.answer === 'string');
}

export async function loadGce204Sessions(): Promise<StudySession[]> {
  const loaded = await Promise.all(modules.map((load) => load()));
  return loaded.map(({ default: module }, index) => {
    const value: unknown = module;
    if (!isSession(value, index + 1)) throw new Error(`GCE 204 module ${index + 1} is invalid.`);
    return value;
  });
}

export function getGce204DrillQuestions(sessions: StudySession[]): Question[] {
  const prompts = sessions.flatMap((session) => [
    ...session.inTextQuestions.map((item, index) => ({ ...item, moduleId: session.id,
      topic: session.title, id: `gce204-itq-m${session.id}-${index + 1}`, type: 'recall' as const })),
    ...session.saqs.map((item, index) => ({ ...item, moduleId: session.id,
      topic: session.title, id: `gce204-saq-m${session.id}-${index + 1}`, type: 'scenario' as const })),
  ]);
  return prompts.flatMap((item, index): Question[] => {
    const distractors = prompts.filter((other) => other.id !== item.id && other.answer !== item.answer)
      .slice(0, 3).map((other) => other.answer);
    if (!item.question.trim() || !item.answer.trim() || distractors.length < 3) return [];
    const correctIndex = index % 4;
    const options = [...distractors];
    options.splice(correctIndex, 0, item.answer);
    return [{ id: item.id, moduleId: item.moduleId, topic: item.topic,
      subtopic: item.type === 'recall' ? 'In-Text Self-Check' : 'Self-Assessment',
      difficulty: item.type === 'recall' ? 'beginner' : 'intermediate',
      type: item.type, stem: item.question, options, correctIndex,
      explanation: { correct: item.answer,
        distractors: distractors.map(() => 'This answer belongs to another course question.') },
      sourceTag: 'manual' }];
  });
}
