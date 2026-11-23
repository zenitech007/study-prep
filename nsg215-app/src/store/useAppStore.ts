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
  currentCourseId: 'gce204',
  theme: storage.getTheme(),
  fontSize: storage.getFontSize(),
  questions: [],
  questionsLoaded: false,
  courseLoadError: null,
  activeQuiz: null,
  progress: storage.getProgress('gce204'),

  // ── Course Management ───────────────────────────────────────
  setCurrentCourse: (courseId: string) => {
    const normalized = courseId.toLowerCase();
    if (get().currentCourseId === normalized) {
      if (!get().questionsLoaded && !get().courseLoadError) get().loadCourseQuestions(normalized);
      return;
    }
    const newProgress = storage.getProgress(normalized);
    const newActiveQuiz = storage.getActiveQuiz(normalized);
    set({
      currentCourseId: normalized,
      progress: newProgress,
      activeQuiz: newActiveQuiz,
      questions: [], questionsLoaded: false, courseLoadError: storage.lastError,
    });
    get().loadCourseQuestions(normalized);
  },

  loadCourseQuestions: async (courseId: string) => {
    const normalized = courseId.toLowerCase();
    if (storage.lastError) {
      const recoveredProgress = storage.getProgress(normalized);
      const recoveredQuiz = storage.getActiveQuiz(normalized);
      if (!storage.lastError) set({ progress: recoveredProgress, activeQuiz: recoveredQuiz });
    }
    set({ questionsLoaded: false, courseLoadError: storage.lastError });
    try {
      if (normalized === 'ana214') {
        const { loadAna214Sessions, getAna214DrillQuestions } = await import('../data/ana214');
        const sessions = await loadAna214Sessions();
        const questions = await getAna214DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'gce204') {
        const { loadGce204Sessions, getGce204DrillQuestions } = await import('../data/gce204');
        const sessions = await loadGce204Sessions();
        const questions = await getGce204DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'nsg222') {
        const { loadNsg222Sessions, getNsg222DrillQuestions } = await import('../data/nsg222');
        const sessions = await loadNsg222Sessions();
        const questions = await getNsg222DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'nsg223') {
        const { loadNsg223Sessions, getNsg223DrillQuestions } = await import('../data/nsg223');
        const sessions = await loadNsg223Sessions();
        const questions = await getNsg223DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'nsg225') {
        const { loadNsg225Sessions, getNsg225DrillQuestions } = await import('../data/nsg225');
        const sessions = await loadNsg225Sessions();
        const questions = await getNsg225DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'nsg229') {
        const { loadNsg229Sessions, getNsg229DrillQuestions } = await import('../data/nsg229');
        const sessions = await loadNsg229Sessions();
        const questions = await getNsg229DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'nsg232') {
        const { loadNsg232Sessions, getNsg232DrillQuestions } = await import('../data/nsg232');
        const sessions = await loadNsg232Sessions();
        const questions = await getNsg232DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'pio206') {
        const { loadPio206Sessions, getPio206DrillQuestions } = await import('../data/pio206');
        const sessions = await loadPio206Sessions();
        const questions = await getPio206DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'psy205') {
        const { loadPsy205Sessions, getPsy205DrillQuestions } = await import('../data/psy205');
        const sessions = await loadPsy205Sessions();
        const questions = await getPsy205DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      if (normalized === 'psm201') {
        const { loadPsm201Sessions, getPsm201DrillQuestions } = await import('../data/psm201');
        const sessions = await loadPsm201Sessions();
        const questions = await getPsm201DrillQuestions(sessions);
        if (get().currentCourseId === normalized) set({ questions, questionsLoaded: true });
        return;
      }
      const url = normalized === 'ana213' ? '/data/ANA213-question-bank.json' : '/data/NSG215-question-bank-starter.json';
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Question[] = await res.json();
      const sessions = normalized === 'ana213'
        ? (await import('../data/ana213Content')).ana213Sessions
        : (await import('../data/learnContent')).studySessions;
      const aggregated = aggregateSessionQuestions(sessions, normalized);
      const combined = mergeQuestionBanks(data, aggregated);
      if (get().currentCourseId === normalized) set({ questions: combined, questionsLoaded: true });
    } catch (err) {
      console.error(`Failed to load question bank for ${normalized}:`, err);
      if (get().currentCourseId === normalized) set({ courseLoadError: 'Course material could not be loaded. Check your connection and retry.', questionsLoaded: true, questions: [] });
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
    if (courseId === 'ana214' || courseId === 'gce204' || courseId === 'nsg222' || courseId === 'nsg223' || courseId === 'nsg225' || courseId === 'nsg229' || courseId === 'nsg232' || courseId === 'pio206' || courseId === 'psy205' || courseId === 'psm201') storage.saveStudiedSessions(updatedSessions, courseId);
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
useAppStore.subscribe((state, previous) => {
  if (state.currentCourseId === previous.currentCourseId && state.progress !== previous.progress) {
    storage.saveProgress(state.progress, state.currentCourseId || 'nsg215');
  }
});
