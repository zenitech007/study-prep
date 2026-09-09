import { Play, RotateCcw, X, Clock, HelpCircle } from 'lucide-react';
import type { QuizSession } from '../../types';

interface DrillResumeModalProps {
  quiz: QuizSession;
  courseCode?: string;
  onResume: () => void;
  onDiscard: () => void;
  onClose?: () => void;
}

export default function DrillResumeModal({
  quiz,
  courseCode = 'Course',
  onResume,
  onDiscard,
  onClose,
}: DrillResumeModalProps) {
  const answeredCount = quiz.answers.filter((a) => a.selectedIndex !== null).length;
  const totalCount = quiz.questionIds.length;
  const correctCount = quiz.answers.filter((a) => a.isCorrect).length;
  const currentQNum = quiz.currentIndex + 1;
  const isExam = quiz.config.mode === 'exam';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Active Drill Session"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 overflow-hidden animate-scale-up">
        {/* Accent Top Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400" />

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400">
                <Play size={24} className="fill-current" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Active Session Saved
                </span>
                <h3 className="text-lg font-black text-main leading-tight">
                  Resume your {courseCode} drill?
                </h3>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-xl text-sub hover:text-main hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-sub leading-relaxed mb-5">
            You navigated away while in the middle of an active drill session. All of your responses and timer progress have been preserved in offline storage.
          </p>

          {/* Stats Snapshot */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 mb-6 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-sub flex items-center gap-1.5">
                <HelpCircle size={14} className="text-cyan-500" />
                Current Question:
              </span>
              <strong className="text-main">
                Question {currentQNum} of {totalCount}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-sub flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                Mode & Progress:
              </span>
              <span className="text-main">
                {isExam ? 'Exam Mode' : 'Practice Mode'} • {answeredCount} answered ({correctCount} correct)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((answeredCount / totalCount) * 100)}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onDiscard}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Start Fresh</span>
            </button>

            <button
              type="button"
              onClick={onResume}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Play size={14} className="fill-current" />
              <span>Resume Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
