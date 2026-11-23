import type { StudySessionContent, Question } from '../../types';

export type StudySession = Required<Pick<StudySessionContent,
  'id' | 'title' | 'introduction' | 'learningOutcomes' | 'content' | 'inTextQuestions' | 'saqs'>>;

export type Psy205Question = Question & { moduleId: number };

const modules = [
  () => import('./module1.json'),
  () => import('./module2.json'),
  () => import('./module3.json'),
  () => import('./module4.json'),
  () => import('./module5.json'),
  () => import('./module6.json'),
  () => import('./module7.json'),
  () => import('./module8.json'),
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

export async function loadPsy205Sessions(): Promise<StudySession[]> {
  const loaded = await Promise.all(modules.map((load) => load()));
  return loaded.map(({ default: module }, index) => {
    const value: unknown = module;
    if (!isSession(value, index + 1)) throw new Error(`PSY 205 module ${index + 1} is invalid.`);
    return value;
  });
}

function isPsy205Question(value: unknown): value is Psy205Question {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string' && value.id.startsWith('psy205-')
    && Number.isInteger(value.moduleId) && Number(value.moduleId) >= 1 && Number(value.moduleId) <= 8
    && typeof value.stem === 'string' && value.stem.length > 0
    && Array.isArray(value.options) && value.options.length === 4
    && value.options.every((option) => typeof option === 'string' && option.length > 0)
    && typeof value.correctIndex === 'number' && value.correctIndex >= 0 && value.correctIndex < 4
    && typeof value.explanation === 'object' && value.explanation !== null;
}

export async function getPsy205DrillQuestions(sessions: StudySession[]): Promise<Psy205Question[]> {
  const { default: raw } = await import('./questions.json');
  const items: unknown = raw;
  if (!Array.isArray(items)) {
    throw new Error('PSY 205 question bank is incomplete or invalid.');
  }
  if (items.length === 0) {
    return [];
  }
  if (items.length !== 300 || !items.every(isPsy205Question)) {
    throw new Error('PSY 205 question bank is incomplete or invalid.');
  }
  const questions: Psy205Question[] = items;
  if (
    new Set(questions.map((question) => question.id)).size !== 300 ||
    new Set(questions.map((question) => question.stem.toLowerCase())).size !== 300
  ) {
    throw new Error('PSY 205 question bank contains duplicate questions.');
  }
  for (const session of sessions) {
    const extracted = questions.filter((question) => question.moduleId === session.id);
    if (
      extracted.filter((question) => question.id.startsWith('psy205-itq-')).length !== session.inTextQuestions.length ||
      extracted.filter((question) => question.id.startsWith('psy205-saq-')).length !== session.saqs.length
    ) {
      throw new Error(`PSY 205 module ${session.id} practice questions do not match the source.`);
    }
  }
  return questions;
}
