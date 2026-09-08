// ── Question Bank Types ──────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type QuestionType = 'recall' | 'scenario';
export type SourceTag = 'slide' | 'manual' | 'extension';

export interface QuestionExplanation {
  correct: string;
  distractors: string[];
}

export interface Question {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  type: QuestionType;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: QuestionExplanation;
  sourceTag: SourceTag;
}

// ── Quiz Session Types ───────────────────────────────────────────

export type QuizMode = 'practice' | 'exam';

export interface QuizConfig {
  questionCount: number | 'all';
  topics: string[];
  difficulties: Difficulty[];
  mode: QuizMode;
  smartDrill: boolean;
  srsOnly?: boolean; // When true, drills questions due for spaced repetition review
}

export interface QuizAnswer {
  questionId: string;
  selectedIndex: number | null;
  isCorrect: boolean;
  timeSpent: number; // seconds
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questionIds: string[];
  answers: QuizAnswer[];
  currentIndex: number;
  startedAt: string;
  completedAt: string | null;
  bookmarkedIds: string[];
}

// ── Spaced Repetition System (SRS) Types ─────────────────────────

export interface SRSItem {
  questionId: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string; // ISO date string
  lastReviewedAt: string; // ISO date string
}

// ── Progress / Analytics Types ───────────────────────────────────

export interface TopicStats {
  topic: string;
  attempted: number;
  correct: number;
  accuracy: number;
  avgTimePerQuestion: number;
}

export interface ProgressData {
  totalAttempted: number;
  totalCorrect: number;
  accuracy: number;
  sessionCount: number;
  preparedness: number;
  currentStreak: number;
  bestStreak: number;
  topicStats: TopicStats[];
  missedQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  questionHistory: Record<string, QuestionHistory>;
  srsData?: Record<string, SRSItem>;
  completedSessions?: number[];
}

export interface QuestionHistory {
  questionId: string;
  attempts: number;
  correctCount: number;
  lastAttemptedAt: string;
  lastCorrect: boolean;
  // SRS metadata
  repetitions?: number;
  intervalDays?: number;
  easeFactor?: number;
  nextReviewDate?: string;
}

// ── Learn / Concepts Content Types ───────────────────────────────

export interface InTextQuestion {
  question: string;
  answer: string;
}

export interface SAQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface CourseInfo {
  code: string;
  title: string;
  credits: string;
  level: string;
  aim: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface StudySessionContent {
  sessionNumber: number;
  title: string;
  overview: string;
  introduction?: string;
  learningOutcomes?: string[];
  content?: ContentSection[];
  keyPoints: string[];
  models?: ModelContent[];
  definitions?: DefinitionContent[];
  inTextQuestions?: InTextQuestion[];
  saqs?: SAQuestion[];
  sourceTag: SourceTag;
}

export interface ModelContent {
  name: string;
  description: string;
  components: string[];
}

export interface DefinitionContent {
  term: string;
  definition: string;
}

export interface ConceptItem {
  sessionNumber: number;
  category: string;
  items: {
    term: string;
    definition: string;
    details?: string;
  }[];
}

// ── Application State ────────────────────────────────────────────

export type ThemeMode = 'light' | 'dark';
export type FontSize = 'small' | 'medium' | 'large';

export interface AppState {
  // Theme & Accessibility
  theme: ThemeMode;
  fontSize: FontSize;
  setTheme: (theme: ThemeMode, saveManual?: boolean) => void;
  setFontSize: (fontSize: FontSize) => void;

  // Questions
  questions: Question[];
  questionsLoaded: boolean;
  loadQuestions: (questions: Question[]) => void;

  // Active Quiz
  activeQuiz: QuizSession | null;
  startQuiz: (config: QuizConfig) => void;
  answerQuestion: (questionId: string, selectedIndex: number, timeSpent: number) => void;
  navigateQuiz: (direction: 'next' | 'prev') => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  toggleBookmark: (questionId: string) => void;

  // Progress
  progress: ProgressData;
  toggleSessionCompleted: (sessionNum: number) => void;
  resetProgress: (courseId?: string) => void;
  exportProgress: (courseId?: string) => string;
  importProgress: (jsonData: string, courseId?: string) => boolean;
}
