import type { StudySessionContent, Question } from '../../types';

export type StudySession = Required<Pick<StudySessionContent, 'id' | 'title' | 'introduction' | 'learningOutcomes' | 'content' | 'inTextQuestions' | 'saqs'>>;
export type Ana214Question = Question & { moduleId: number };

const modules = [
  () => import('./module1.json'), () => import('./module2.json'),
  () => import('./module3.json'), () => import('./module4.json'),
  () => import('./module5.json'), () => import('./module6.json'),
  () => import('./module7.json'),
];

export async function loadAna214Sessions(): Promise<StudySession[]> {
  const loaded = await Promise.all(modules.map((load) => load()));
  return loaded.map(({ default: module }, index) => ({
    ...module,
    id: index + 1,
    learningOutcomes: module.learningOutcomes as string[],
    content: module.content as StudySession['content'],
    inTextQuestions: module.inTextQuestions as StudySession['inTextQuestions'],
    saqs: module.saqs as StudySession['saqs'],
  }));
}

function isAna214Question(value: unknown): value is Ana214Question {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && item.id.startsWith('ana214-')
    && Number.isInteger(item.moduleId) && Number(item.moduleId) >= 1 && Number(item.moduleId) <= 7
    && typeof item.stem === 'string' && item.stem.length > 0
    && Array.isArray(item.options) && item.options.length === 4
    && item.options.every((option) => typeof option === 'string' && option.length > 0)
    && typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex < 4
    && typeof item.explanation === 'object' && item.explanation !== null;
}

export async function getAna214DrillQuestions(sessions: StudySession[]): Promise<Ana214Question[]> {
  const { default: raw } = await import('./questions.json');
  const items: unknown = raw;
  if (!Array.isArray(items) || items.length !== 300 || !items.every(isAna214Question)) {
    throw new Error('ANA 214 question bank is incomplete or invalid.');
  }
  const questions: Ana214Question[] = items;
  if (new Set(questions.map((question) => question.id)).size !== 300
      || new Set(questions.map((question) => question.stem.toLowerCase())).size !== 300) {
    throw new Error('ANA 214 question bank contains duplicate questions.');
  }
  for (const session of sessions) {
    const extracted = questions.filter((question) => question.moduleId === session.id);
    if (extracted.filter((question) => question.id.startsWith('ana214-itq-')).length !== session.inTextQuestions.length
        || extracted.filter((question) => question.id.startsWith('ana214-saq-')).length !== session.saqs.length) {
      throw new Error(`ANA 214 module ${session.id} practice questions do not match the source.`);
    }
  }
  return questions;
}
