import type { ProgressData, QuizAnswer, QuestionHistory, TopicStats, Question } from '../types';
import { calculateNextSRSReview } from './srs';

/**
 * Calculate overall accuracy percentage.
 */
export function calcAccuracy(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Calculate preparedness score (0-100).
 * Weighted formula:
 * - 40% overall accuracy
 * - 30% topic coverage (% of topics attempted)
 * - 20% recent performance (last 20 questions)
 * - 10% consistency (sessions completed)
 */
export function calcPreparedness(
  progress: ProgressData,
  totalTopics: number,
  totalQuestions: number
): number {
  if (progress.totalAttempted === 0) return 0;

  const accuracyScore = progress.accuracy;
  const topicsCovered = progress.topicStats.filter((t) => t.attempted > 0).length;
  const coverageScore = totalTopics > 0 ? (topicsCovered / totalTopics) * 100 : 0;

  // Question coverage — what fraction of questions have been seen
  const questionsSeen = Object.keys(progress.questionHistory).length;
  const questionCoverage = totalQuestions > 0 ? (questionsSeen / totalQuestions) * 100 : 0;

  // Session consistency
  const consistencyScore = Math.min(progress.sessionCount * 10, 100);

  return Math.round(
    accuracyScore * 0.35 +
    coverageScore * 0.25 +
    questionCoverage * 0.25 +
    consistencyScore * 0.15
  );
}

/**
 * Update topic stats from quiz answers.
 */
export function updateTopicStats(
  existingStats: TopicStats[],
  answers: QuizAnswer[],
  questions: Question[]
): TopicStats[] {
  const statsMap = new Map<string, TopicStats>();

  // Load existing stats
  for (const stat of existingStats) {
    statsMap.set(stat.topic, { ...stat });
  }

  // Build question lookup
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  // Process answers
  for (const answer of answers) {
    if (answer.selectedIndex === null) continue;

    const question = questionMap.get(answer.questionId);
    if (!question) continue;

    const stat = statsMap.get(question.topic) || {
      topic: question.topic,
      attempted: 0,
      correct: 0,
      accuracy: 0,
      avgTimePerQuestion: 0,
    };

    const totalTime = stat.avgTimePerQuestion * stat.attempted;
    stat.attempted += 1;
    if (answer.isCorrect) stat.correct += 1;
    stat.accuracy = calcAccuracy(stat.correct, stat.attempted);
    stat.avgTimePerQuestion = Math.round((totalTime + answer.timeSpent) / stat.attempted);

    statsMap.set(question.topic, stat);
  }

  return Array.from(statsMap.values());
}

/**
 * Update question history from quiz answers with Spaced Repetition (SRS) metadata.
 */
export function updateQuestionHistory(
  existingHistory: Record<string, QuestionHistory>,
  answers: QuizAnswer[]
): Record<string, QuestionHistory> {
  const history = { ...existingHistory };

  for (const answer of answers) {
    if (answer.selectedIndex === null) continue;

    const existing = history[answer.questionId];
    const srsReview = calculateNextSRSReview(existing, answer.isCorrect);

    history[answer.questionId] = {
      questionId: answer.questionId,
      attempts: (existing?.attempts ?? 0) + 1,
      correctCount: (existing?.correctCount ?? 0) + (answer.isCorrect ? 1 : 0),
      lastAttemptedAt: new Date().toISOString(),
      lastCorrect: answer.isCorrect,
      repetitions: srsReview.repetitions,
      intervalDays: srsReview.intervalDays,
      easeFactor: srsReview.easeFactor,
      nextReviewDate: srsReview.nextReviewDate,
    };
  }

  return history;
}

/**
 * Get missed question IDs from recent quiz answers.
 */
export function getMissedQuestionIds(
  existingMissed: string[],
  answers: QuizAnswer[]
): string[] {
  const missedSet = new Set(existingMissed);

  for (const answer of answers) {
    if (answer.selectedIndex === null) continue;
    if (answer.isCorrect) {
      missedSet.delete(answer.questionId);
    } else {
      missedSet.add(answer.questionId);
    }
  }

  return Array.from(missedSet);
}

/**
 * Update streak based on sequential correct answers.
 */
export function updateStreak(
  currentStreak: number,
  bestStreak: number,
  answers: QuizAnswer[]
): { currentStreak: number; bestStreak: number } {
  let streak = currentStreak;
  let best = bestStreak;

  for (const answer of answers) {
    if (answer.selectedIndex === null) continue;
    if (answer.isCorrect) {
      streak += 1;
      best = Math.max(best, streak);
    } else {
      streak = 0;
    }
  }

  return { currentStreak: streak, bestStreak: best };
}

/**
 * Get topic accuracy map for smart drill weighting.
 */
export function getTopicAccuracyMap(topicStats: TopicStats[]): Record<string, number> {
  const map: Record<string, number> = {};
  for (const stat of topicStats) {
    map[stat.topic] = stat.attempted > 0 ? stat.accuracy / 100 : 0.5;
  }
  return map;
}
