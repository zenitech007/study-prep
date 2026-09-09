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
import { studySessions as nsg215Sessions } from '../data/learnContent';
import { ana213Sessions } from '../data/ana213Content';
import { aggregateSessionQuestions, mergeQuestionBanks } from '../utils/questionAggregation';

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
  currentCourseId: 'nsg215',
  theme: storage.getTheme(),
  fontSize: storage.getFontSize(),
  questions: [],
  questionsLoaded: false,
  activeQuiz: null,
  progress: storage.getProgress('nsg215'),

  // ── Course Management ───────────────────────────────────────
  setCurrentCourse: (courseId: string) => {
    const normalized = courseId.toLowerCase();
    if (get().currentCourseId === normalized) return;
    const newProgress = storage.getProgress(normalized);
    const newActiveQuiz = storage.getActiveQuiz(normalized);
    set({
      currentCourseId: normalized,
      progress: newProgress,
      activeQuiz: newActiveQuiz,
    });
    get().loadCourseQuestions(normalized);
  },

  loadCourseQuestions: async (courseId: string) => {
    const normalized = courseId.toLowerCase();
    const url =
      normalized === 'ana213'
        ? '/data/ANA213-question-bank.json'
        : '/data/NSG215-question-bank-starter.json';
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Question[] = await res.json();
      const sessions = normalized === 'ana213' ? ana213Sessions : nsg215Sessions;
      const aggregated = aggregateSessionQuestions(sessions, normalized);
      const combined = mergeQuestionBanks(data, aggregated);
      set({ questions: combined, questionsLoaded: true });
    } catch (err) {
      console.error(`Failed to load question bank for ${normalized}:`, err);
    }
  },

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

    const courseId = get().currentCourseId || 'nsg215';
    storage.saveActiveQuiz(quiz, courseId);
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
    const courseId = get().currentCourseId || 'nsg215';
    storage.saveActiveQuiz(updatedQuiz, courseId);
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
    const courseId = get().currentCourseId || 'nsg215';
    storage.saveActiveQuiz(updatedQuiz, courseId);
    set({ activeQuiz: updatedQuiz });
  },

  goToQuestion: (index: number) => {
    const { activeQuiz } = get();
    if (!activeQuiz) return;
    if (index < 0 || index >= activeQuiz.questionIds.length) return;

    const updatedQuiz = { ...activeQuiz, currentIndex: index };
    const courseId = get().currentCourseId || 'nsg215';
    storage.saveActiveQuiz(updatedQuiz, courseId);
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

    const courseId = get().currentCourseId || 'nsg215';
    storage.saveProgress(updatedProgress, courseId);
    storage.clearActiveQuiz(courseId);

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
    const courseId = get().currentCourseId || 'nsg215';
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

    storage.saveProgress(updatedProgress, courseId);

    // Also update the active quiz's bookmark list
    if (activeQuiz) {
      const quizBookmarks = new Set(activeQuiz.bookmarkedIds);
      if (quizBookmarks.has(questionId)) {
        quizBookmarks.delete(questionId);
      } else {
        quizBookmarks.add(questionId);
      }
      const updatedQuiz = { ...activeQuiz, bookmarkedIds: Array.from(quizBookmarks) };
      storage.saveActiveQuiz(updatedQuiz, courseId);
      set({
        progress: updatedProgress,
        activeQuiz: updatedQuiz,
      });
    } else {
      set({ progress: updatedProgress });
    }
  },

  resetQuiz: () => {
    const courseId = get().currentCourseId || 'nsg215';
    storage.clearActiveQuiz(courseId);
    set({ activeQuiz: null });
  },

  resumeSavedQuiz: () => {
    const courseId = get().currentCourseId || 'nsg215';
    const saved = storage.getActiveQuiz(courseId);
    if (saved) {
      set({ activeQuiz: saved });
    }
  },

  discardSavedQuiz: () => {
    const courseId = get().currentCourseId || 'nsg215';
    storage.clearActiveQuiz(courseId);
    set({ activeQuiz: null });
  },

  // ── Session Completion Tracking ─────────────────────────────
  toggleSessionCompleted: (sessionNum: number) => {
    const currentProgress = get().progress;
    const courseId = get().currentCourseId || 'nsg215';
    const existing = currentProgress.completedSessions || [];
    const updatedSessions = existing.includes(sessionNum)
      ? existing.filter((n) => n !== sessionNum)
      : [...existing, sessionNum];

    const updatedProgress: ProgressData = {
      ...currentProgress,
      completedSessions: updatedSessions,
    };

    storage.saveProgress(updatedProgress, courseId);
    set({ progress: updatedProgress });
  },

  // ── Data Portability ────────────────────────────────────────
  exportProgress: (courseId?: string): string => {
    const targetCourse = courseId || get().currentCourseId || 'nsg215';
    return storage.exportAll(targetCourse);
  },

  importProgress: (json: string, courseId?: string): boolean => {
    const targetCourse = courseId || get().currentCourseId || 'nsg215';
    const success = storage.importAll(json, targetCourse);
    if (success) {
      set({
        progress: storage.getProgress(targetCourse),
        theme: storage.getTheme(),
        fontSize: storage.getFontSize(),
      });
    }
    return success;
  },

  resetProgress: (courseId?: string) => {
    const targetCourse = courseId || get().currentCourseId || 'nsg215';
    storage.resetProgress(targetCourse);
    storage.clearActiveQuiz(targetCourse);
    set({ progress: { ...DEFAULT_PROGRESS }, activeQuiz: null });
  },
}));

// Continuous state persistence subscription
useAppStore.subscribe((state) => {
  storage.saveProgress(state.progress, state.currentCourseId || 'nsg215');
});
