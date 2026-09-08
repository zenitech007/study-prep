import { create } from 'zustand';
import type {
  AppState,
  Question,
  QuizConfig,
  QuizSession,
  ProgressData,
  ThemeMode,
  FontSize,
} from '../types';
import { storage } from './storage';
import {
  selectQuestions,
  generateQuizId,
} from '../utils/quiz';
import {
  calcAccuracy,
  calcPreparedness,
  updateTopicStats,
  updateQuestionHistory,
  getMissedQuestionIds,
  updateStreak,
  getTopicAccuracyMap,
} from '../utils/analytics';

const DEFAULT_PROGRESS: ProgressData = {
  totalAttempted: 0,
  totalCorrect: 0,
  accuracy: 0,
  sessionCount: 0,
  preparedness: 0,
  currentStreak: 0,
  bestStreak: 0,
  topicStats: [],
  missedQuestionIds: [],
  bookmarkedQuestionIds: [],
  questionHistory: {},
  completedSessions: [],
};

export const useAppStore = create<AppState>((set, get) => ({
  // ── Initial state ───────────────────────────────────────────
  theme: storage.getTheme(),
  fontSize: storage.getFontSize(),
  questions: [],
  questionsLoaded: false,
  activeQuiz: null,
  progress: storage.getProgress(),

  // ── Theme & Accessibility ───────────────────────────────────
  setTheme: (theme: ThemeMode, saveManual: boolean = true) => {
    if (saveManual) {
      storage.saveTheme(theme);
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },

  setFontSize: (fontSize: FontSize) => {
    storage.saveFontSize(fontSize);
    const sizes = { small: '14px', medium: '16px', large: '18px' };
    document.documentElement.style.setProperty('--base-font-size', sizes[fontSize]);
    set({ fontSize });
  },

  // ── Questions ───────────────────────────────────────────────
  loadQuestions: (questions: Question[]) => {
    set({ questions, questionsLoaded: true });
  },

  // ── Quiz Lifecycle ──────────────────────────────────────────
  startQuiz: (config: QuizConfig) => {
    const { questions, progress } = get();
    const topicAccuracy = getTopicAccuracyMap(progress.topicStats);
    const selected = selectQuestions(questions, config, progress.questionHistory, topicAccuracy);

    const quiz: QuizSession = {
      id: generateQuizId(),
      config,
      questionIds: selected.map((q) => q.id),
      answers: selected.map((q) => ({
        questionId: q.id,
        selectedIndex: null,
        isCorrect: false,
        timeSpent: 0,
      })),
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      bookmarkedIds: [],
    };

    storage.saveActiveQuiz(quiz);
    set({ activeQuiz: quiz });
  },

  answerQuestion: (questionId: string, selectedIndex: number, timeSpent: number) => {
    const { activeQuiz, questions } = get();
    if (!activeQuiz) return;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    const isCorrect = question.correctIndex === selectedIndex;

    const updatedAnswers = activeQuiz.answers.map((a) =>
      a.questionId === questionId
        ? { ...a, selectedIndex, isCorrect, timeSpent }
        : a
    );

    const updatedQuiz = { ...activeQuiz, answers: updatedAnswers };
    storage.saveActiveQuiz(updatedQuiz);
    set({ activeQuiz: updatedQuiz });
  },

  navigateQuiz: (direction: 'next' | 'prev') => {
    const { activeQuiz } = get();
    if (!activeQuiz) return;

    const newIndex =
      direction === 'next'
        ? Math.min(activeQuiz.currentIndex + 1, activeQuiz.questionIds.length - 1)
        : Math.max(activeQuiz.currentIndex - 1, 0);

    const updatedQuiz = { ...activeQuiz, currentIndex: newIndex };
    storage.saveActiveQuiz(updatedQuiz);
    set({ activeQuiz: updatedQuiz });
  },

  goToQuestion: (index: number) => {
    const { activeQuiz } = get();
    if (!activeQuiz) return;
    if (index < 0 || index >= activeQuiz.questionIds.length) return;

    const updatedQuiz = { ...activeQuiz, currentIndex: index };
    storage.saveActiveQuiz(updatedQuiz);
    set({ activeQuiz: updatedQuiz });
  },

  submitQuiz: () => {
    const { activeQuiz, progress, questions } = get();
    if (!activeQuiz) return;

    const answeredQuestions = activeQuiz.answers.filter((a) => a.selectedIndex !== null);
    const correctCount = answeredQuestions.filter((a) => a.isCorrect).length;

    const newTopicStats = updateTopicStats(progress.topicStats, answeredQuestions, questions);
    const newQuestionHistory = updateQuestionHistory(progress.questionHistory, answeredQuestions);
    const newMissed = getMissedQuestionIds(progress.missedQuestionIds, answeredQuestions);
    const { currentStreak, bestStreak } = updateStreak(
      progress.currentStreak,
      progress.bestStreak,
      answeredQuestions
    );

    const totalAttempted = progress.totalAttempted + answeredQuestions.length;
    const totalCorrect = progress.totalCorrect + correctCount;

    const uniqueTopics = [...new Set(questions.map((q) => q.topic))].length;

    const updatedProgress: ProgressData = {
      ...progress,
      totalAttempted,
      totalCorrect,
      accuracy: calcAccuracy(totalCorrect, totalAttempted),
      sessionCount: progress.sessionCount + 1,
      preparedness: 0, // calculated below
      currentStreak,
      bestStreak,
      topicStats: newTopicStats,
      missedQuestionIds: newMissed,
      bookmarkedQuestionIds: progress.bookmarkedQuestionIds,
      questionHistory: newQuestionHistory,
      completedSessions: progress.completedSessions || [],
    };

    updatedProgress.preparedness = calcPreparedness(
      updatedProgress,
      uniqueTopics,
      questions.length
    );

    storage.saveProgress(updatedProgress);
    storage.clearActiveQuiz();

    set({
      activeQuiz: {
        ...activeQuiz,
        completedAt: new Date().toISOString(),
      },
      progress: updatedProgress,
    });
  },

  toggleBookmark: (questionId: string) => {
    const { progress, activeQuiz } = get();
    const bookmarks = new Set(progress.bookmarkedQuestionIds);

    if (bookmarks.has(questionId)) {
      bookmarks.delete(questionId);
    } else {
      bookmarks.add(questionId);
    }

    const updatedProgress = {
      ...progress,
      bookmarkedQuestionIds: Array.from(bookmarks),
    };

    storage.saveProgress(updatedProgress);

    // Also update the active quiz's bookmark list
    if (activeQuiz) {
      const quizBookmarks = new Set(activeQuiz.bookmarkedIds);
      if (quizBookmarks.has(questionId)) {
        quizBookmarks.delete(questionId);
      } else {
        quizBookmarks.add(questionId);
      }
      const updatedQuiz = { ...activeQuiz, bookmarkedIds: Array.from(quizBookmarks) };
      storage.saveActiveQuiz(updatedQuiz);
      set({
        progress: updatedProgress,
        activeQuiz: updatedQuiz,
      });
    } else {
      set({ progress: updatedProgress });
    }
  },

  resetQuiz: () => {
    storage.clearActiveQuiz();
    set({ activeQuiz: null });
  },

  resumeSavedQuiz: () => {
    const saved = storage.getActiveQuiz();
    if (saved) {
      set({ activeQuiz: saved });
    }
  },

  discardSavedQuiz: () => {
    storage.clearActiveQuiz();
    set({ activeQuiz: null });
  },

  // ── Session Completion Tracking ─────────────────────────────
  toggleSessionCompleted: (sessionNum: number) => {
    const currentProgress = get().progress;
    const existing = currentProgress.completedSessions || [];
    const updatedSessions = existing.includes(sessionNum)
      ? existing.filter((n) => n !== sessionNum)
      : [...existing, sessionNum];

    const updatedProgress: ProgressData = {
      ...currentProgress,
      completedSessions: updatedSessions,
    };

    storage.saveProgress(updatedProgress);
    set({ progress: updatedProgress });
  },

  // ── Data Portability ────────────────────────────────────────
  exportProgress: (courseId?: string): string => {
    return storage.exportAll(courseId);
  },

  importProgress: (json: string, courseId?: string): boolean => {
    const success = storage.importAll(json, courseId);
    if (success) {
      set({
        progress: storage.getProgress(courseId),
        theme: storage.getTheme(),
        fontSize: storage.getFontSize(),
      });
    }
    return success;
  },

  resetProgress: (courseId?: string) => {
    storage.resetProgress(courseId);
    storage.clearActiveQuiz();
    set({ progress: { ...DEFAULT_PROGRESS }, activeQuiz: null });
  },
}));

// Continuous state persistence subscription
useAppStore.subscribe((state) => {
  storage.saveProgress(state.progress);
});
