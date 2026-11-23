import type { StudySessionContent, Question } from '../../types';

export type StudySession = Required<Pick<StudySessionContent,
  'id' | 'title' | 'introduction' | 'learningOutcomes' | 'content' | 'inTextQuestions' | 'saqs'>>;

export type Nsg222Question = Question & { moduleId: number };

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

export async function loadNsg222Sessions(): Promise<StudySession[]> {
  const loaded = await Promise.all(modules.map((load) => load()));
  return loaded.map(({ default: module }, index) => {
    const value: unknown = module;
    if (!isSession(value, index + 1)) throw new Error(`NSG 222 module ${index + 1} is invalid.`);
    return value;
  });
}

function isNsg222Question(value: unknown): value is Nsg222Question {
  if (!isRecord(value)) return false;
  return typeof value.id === 'string' && value.id.startsWith('nsg222-')
    && Number.isInteger(value.moduleId) && Number(value.moduleId) >= 1 && Number(value.moduleId) <= 8
    && typeof value.stem === 'string' && value.stem.length > 0
    && Array.isArray(value.options) && value.options.length === 4
    && value.options.every((option) => typeof option === 'string' && option.length > 0)
    && typeof value.correctIndex === 'number' && value.correctIndex >= 0 && value.correctIndex < 4
    && typeof value.explanation === 'object' && value.explanation !== null;
}

export async function getNsg222DrillQuestions(sessions: StudySession[]): Promise<Nsg222Question[]> {
  const { default: raw } = await import('./questions.json');
  const items: unknown = raw;
  if (!Array.isArray(items) || items.length !== 300 || !items.every(isNsg222Question)) {
    throw new Error('NSG 222 question bank is incomplete or invalid.');
  }
  const questions: Nsg222Question[] = items;
  if (
    new Set(questions.map((question) => question.id)).size !== 300 ||
    new Set(questions.map((question) => question.stem.toLowerCase())).size !== 300
  ) {
    throw new Error('NSG 222 question bank contains duplicate questions.');
  }
  for (const session of sessions) {
    const extracted = questions.filter((question) => question.moduleId === session.id);
    if (
      extracted.filter((question) => question.id.startsWith('nsg222-itq-')).length !== session.inTextQuestions.length ||
      extracted.filter((question) => question.id.startsWith('nsg222-saq-')).length !== session.saqs.length
    ) {
      throw new Error(`NSG 222 module ${session.id} practice questions do not match the source.`);
    }
  }
  return questions;
}
