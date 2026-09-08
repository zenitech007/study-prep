import type { ProgressData } from '../types';

const STORAGE_KEYS = {
  progress: 'nsg215-progress',
  theme: 'nsg215-theme',
  fontSize: 'nsg215-fontSize',
} as const;

export const DEFAULT_PROGRESS: ProgressData = {
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
};

/**
 * Storage abstraction layer.
 * 100% offline-first and persisted in localStorage.
 * Designed to support multi-course progression with no backend required.
 */
export const storage = {
  // ── Progress ──────────────────────────────────────────────
  getProgress(courseId: string = 'nsg215'): ProgressData {
    try {
      const courseKey = courseId === 'nsg215' ? STORAGE_KEYS.progress : `studyprep-progress-${courseId}`;
      const raw = localStorage.getItem(courseKey) || (courseId === 'nsg215' ? localStorage.getItem('studyprep-progress-nsg215') : null);
      if (!raw) return { ...DEFAULT_PROGRESS };
      return JSON.parse(raw) as ProgressData;
    } catch {
      return { ...DEFAULT_PROGRESS };
    }
  },

  saveProgress(progress: ProgressData, courseId: string = 'nsg215'): void {
    try {
      const courseKey = courseId === 'nsg215' ? STORAGE_KEYS.progress : `studyprep-progress-${courseId}`;
      localStorage.setItem(courseKey, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  },

  // ── Theme (System-Synced with Manual Override) ─────────────
  getTheme(): 'light' | 'dark' {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.theme);
      // If manual preference is saved, respect it
      if (raw === 'dark' || raw === 'light') return raw;

      // Otherwise adopt the user's system / device preference
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light';
    } catch {
      return 'light';
    }
  },

  hasManualTheme(): boolean {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.theme);
      return raw === 'dark' || raw === 'light';
    } catch {
      return false;
    }
  },

  saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e);
    }
  },

  clearManualTheme(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.theme);
    } catch (e) {
      console.error('Failed to clear manual theme:', e);
    }
  },

  // ── Font Size ─────────────────────────────────────────────
  getFontSize(): 'small' | 'medium' | 'large' {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.fontSize);
      if (raw === 'small' || raw === 'medium' || raw === 'large') return raw;
      return 'medium';
    } catch {
      return 'medium';
    }
  },

  saveFontSize(size: 'small' | 'medium' | 'large'): void {
    try {
      localStorage.setItem(STORAGE_KEYS.fontSize, size);
    } catch (e) {
      console.error('Failed to save font size:', e);
    }
  },

  // ── Export / Import ───────────────────────────────────────
  exportAll(courseId: string = 'nsg215'): string {
    const data = {
      version: 1,
      courseId,
      exportedAt: new Date().toISOString(),
      progress: this.getProgress(courseId),
      theme: this.getTheme(),
      fontSize: this.getFontSize(),
    };
    return JSON.stringify(data, null, 2);
  },

  importAll(json: string, courseId: string = 'nsg215'): boolean {
    try {
      const data = JSON.parse(json);
      if (!data.progress) return false;
      this.saveProgress(data.progress, courseId);
      if (data.theme) this.saveTheme(data.theme);
      if (data.fontSize) this.saveFontSize(data.fontSize);
      return true;
    } catch {
      return false;
    }
  },

  // ── Reset Course Progress ─────────────────────────────────
  resetProgress(courseId: string = 'nsg215'): void {
    try {
      const courseKey = courseId === 'nsg215' ? STORAGE_KEYS.progress : `studyprep-progress-${courseId}`;
      localStorage.removeItem(courseKey);
      if (courseId === 'nsg215') {
        localStorage.removeItem('studyprep-progress-nsg215');
      }
      this.saveProgress({ ...DEFAULT_PROGRESS }, courseId);
    } catch (e) {
      console.error('Failed to reset course progress in localStorage:', e);
    }
  },
};
