import type { Question, QuizConfig, QuestionHistory } from '../types';

/**
 * Shuffle an array using Fisher-Yates algorithm.
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Select questions based on quiz configuration.
 * Supports topic/difficulty filtering and smart weak-topic drilling.
 */
export function selectQuestions(
  questions: Question[],
  config: QuizConfig,
  questionHistory: Record<string, QuestionHistory>,
  topicAccuracy: Record<string, number>
): Question[] {
  // Filter by topic
  let filtered = questions;
  if (config.topics.length > 0) {
    filtered = filtered.filter((q) => config.topics.includes(q.topic));
  }

  // Filter by difficulty
  if (config.difficulties.length > 0) {
    filtered = filtered.filter((q) => config.difficulties.includes(q.difficulty));
  }

  // Determine count
  const count = config.questionCount === 'all' ? filtered.length : config.questionCount;

  // Spaced Repetition System (SRS) Filter: questions due for review or recently missed
  if (config.srsOnly) {
    const now = new Date();
    filtered = filtered.filter((q) => {
      const hist = questionHistory[q.id];
      if (!hist) return false;
      if (!hist.lastCorrect) return true;
      if (hist.nextReviewDate && new Date(hist.nextReviewDate) <= now) return true;
      return false;
    });
  }

  if (config.smartDrill) {
    // Prioritize topics with lower accuracy
    return selectSmartDrill(filtered, count, questionHistory, topicAccuracy);
  }

  // Random selection
  return shuffle(filtered).slice(0, count);
}

/**
 * Smart drill: weight questions toward weaker topics and less-seen questions.
 */
function selectSmartDrill(
  questions: Question[],
  count: number,
  questionHistory: Record<string, QuestionHistory>,
  topicAccuracy: Record<string, number>
): Question[] {
  // Score each question: lower accuracy topic + fewer attempts = higher priority
  const scored = questions.map((q) => {
    const accuracy = topicAccuracy[q.topic] ?? 0.5;
    const history = questionHistory[q.id];
    const attempts = history?.attempts ?? 0;
    const lastCorrect = history?.lastCorrect ?? false;

    // Weight: lower accuracy topics get higher weight
    let weight = 1 - accuracy;

    // Boost questions never attempted
    if (attempts === 0) weight += 0.3;

    // Boost questions last answered incorrectly
    if (!lastCorrect && attempts > 0) weight += 0.2;

    // Add some randomness to avoid exact same order
    weight += Math.random() * 0.15;

    return { question: q, weight };
  });

  // Sort by weight descending
  scored.sort((a, b) => b.weight - a.weight);

  return scored.slice(0, count).map((s) => s.question);
}

/**
 * Generate a unique quiz session ID.
 */
export function generateQuizId(): string {
  return `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Get all unique topics from the question bank.
 */
export function getUniqueTopics(questions: Question[]): string[] {
  return [...new Set(questions.map((q) => q.topic))];
}

/**
 * Get all unique difficulties from the question bank.
 */
export function getUniqueDifficulties(questions: Question[]): string[] {
  return [...new Set(questions.map((q) => q.difficulty))];
}
