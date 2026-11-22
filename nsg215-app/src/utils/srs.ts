import type { QuestionHistory, Question } from '../types';

const DEFAULT_EASE = 2.5;

/**
 * SuperMemo SM-2 inspired interval calculation:
 * - Again (Wrong): resets repetitions to 0, interval to 1 day, lowers easeFactor slightly.
 * - Good (Correct):
 *   - Repetition 1: 1 day
 *   - Repetition 2: 3 days
 *   - Repetition 3+: previous_interval * easeFactor
 */
export function calculateNextSRSReview(
  existingHistory?: QuestionHistory,
  isCorrect: boolean = false
): {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string;
} {
  const currentReps = existingHistory?.repetitions ?? 0;
  const currentEase = existingHistory?.easeFactor ?? DEFAULT_EASE;
  const currentInterval = existingHistory?.intervalDays ?? 0;

  let newReps = 0;
  let newInterval = 1;
  let newEase = currentEase;

  if (isCorrect) {
    newReps = currentReps + 1;
    if (newReps === 1) {
      newInterval = 1; // review tomorrow
    } else if (newReps === 2) {
      newInterval = 3; // review in 3 days
    } else {
      newInterval = Math.round(Math.max(4, currentInterval * currentEase));
    }
    // Ease factor slightly increases on consistent retention (capped at 3.0)
    newEase = Math.min(3.0, currentEase + 0.05);
  } else {
    // Incorrect answer: reset to review in 1 day
    newReps = 0;
    newInterval = 1;
    // Lower ease factor for troublesome questions (floor at 1.3)
    newEase = Math.max(1.3, currentEase - 0.2);
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  return {
    repetitions: newReps,
    intervalDays: newInterval,
    easeFactor: Math.round(newEase * 100) / 100,
    nextReviewDate: nextDate.toISOString(),
  };
}

/**
 * Check if a question is due for SRS review today.
 */
export function isQuestionDueForSRS(history?: QuestionHistory): boolean {
  if (!history || !history.nextReviewDate) {
    // If it was never reviewed, or has no SRS date, consider it due if previously attempted
    return false;
  }
  const now = new Date();
  const reviewDate = new Date(history.nextReviewDate);
  return reviewDate <= now;
}

/**
 * Filter questions that are due for SRS review, or were recently answered incorrectly.
 */
export function getDueSRSQuestions(
  questions: Question[],
  questionHistory: Record<string, QuestionHistory>
): Question[] {
  const now = new Date();

  return questions.filter((q) => {
    const hist = questionHistory[q.id];
    if (!hist) return false;

    // Last answer was wrong -> high priority for review
    if (!hist.lastCorrect) return true;

    // Has a nextReviewDate and it is due/overdue
    if (hist.nextReviewDate) {
      return new Date(hist.nextReviewDate) <= now;
    }

    return false;
  });
}
