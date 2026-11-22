import { useState, useMemo, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { storage } from '../../store/storage';
import { getUniqueTopics } from '../../utils/quiz';
import { getDueSRSQuestions } from '../../utils/srs';
import type { QuizConfig, Difficulty, QuizSession } from '../../types';
import { Settings, Play, ChevronDown, RotateCcw } from 'lucide-react';

interface DrillConfigProps {
  onResumeQuiz?: () => void;
  onStartQuiz?: () => void;
  initialTopic?: string;
  autoStart?: boolean;
}

export default function DrillConfig({
  onResumeQuiz,
  onStartQuiz,
  initialTopic,
  autoStart,
}: DrillConfigProps) {
  const currentCourseId = useAppStore((s) => s.currentCourseId);
  const questions = useAppStore((s) => s.questions);
  const questionsLoaded = useAppStore((s) => s.questionsLoaded);
  const progress = useAppStore((s) => s.progress);
  const startQuiz = useAppStore((s) => s.startQuiz);
  const resumeSavedQuiz = useAppStore((s) => s.resumeSavedQuiz);
  const discardSavedQuiz = useAppStore((s) => s.discardSavedQuiz);

  const [savedQuiz, setSavedQuiz] = useState<QuizSession | null>(() =>
    storage.getActiveQuiz(currentCourseId || 'nsg215')
  );

  useEffect(() => {
    setSavedQuiz(storage.getActiveQuiz(currentCourseId || 'nsg215'));
  }, [currentCourseId]);

  const uniqueTopics = useMemo(() => getUniqueTopics(questions), [questions]);
  const dueSRSQuestions = useMemo(
    () => getDueSRSQuestions(questions, progress.questionHistory),
    [questions, progress.questionHistory]
  );

  const [config, setConfig] = useState<QuizConfig>({
    questionCount: 20,
    topics: initialTopic ? [initialTopic] : [],
    difficulties: [],
    mode: 'practice',
    smartDrill: false,
    srsOnly: false,
  });

  // Auto-select initial topic if passed and not yet set
  useEffect(() => {
    if (initialTopic) {
      setConfig((prev) => ({
        ...prev,
        topics: [initialTopic],
      }));
    }
  }, [initialTopic]);

  // Handle auto-start if requested and questions are loaded with no conflicting active quiz
  useEffect(() => {
    if (autoStart && questionsLoaded && !savedQuiz && questions.length > 0) {
      const activeTopic = initialTopic ? [initialTopic] : [];
      startQuiz({
        questionCount: 'all',
        topics: activeTopic,
        difficulties: [],
        mode: 'practice',
        smartDrill: false,
        srsOnly: false,
      });
      if (onStartQuiz) onStartQuiz();
    }
  }, [autoStart, questionsLoaded, savedQuiz, questions.length, initialTopic, startQuiz, onStartQuiz]);

  const matchingCount = useMemo(() => {
    return questions.filter((q) => {
      const topicMatch = config.topics.length === 0 || config.topics.includes(q.topic);
      const diffMatch = config.difficulties.length === 0 || config.difficulties.includes(q.difficulty);
      return topicMatch && diffMatch;
    }).length;
  }, [questions, config.topics, config.difficulties]);

  const handleStart = () => {
    if (matchingCount === 0) return;
    startQuiz(config);
    if (onStartQuiz) onStartQuiz();
  };

  const handleStartSRS = () => {
    startQuiz({
      questionCount: 'all',
      topics: [],
      difficulties: [],
      mode: 'practice',
      smartDrill: false,
      srsOnly: true,
    });
    if (onStartQuiz) onStartQuiz();
  };

  const handleResumeSavedQuiz = () => {
    resumeSavedQuiz();
    if (onResumeQuiz) onResumeQuiz();
  };

  const handleDiscardSavedQuiz = () => {
    discardSavedQuiz();
    setSavedQuiz(null);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-5">
      {/* Active Drill In-Progress Prompt */}
      {savedQuiz && (
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-cyan-500/50 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-teal-500/10 shadow-lg shadow-cyan-500/5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 shrink-0 font-bold shadow-sm">
                <Play size={20} className="fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-main">
                    You have an active drill in progress.
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                    {savedQuiz.config.mode === 'exam' ? 'Exam Mode' : 'Practice Mode'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-sub mt-1">
                  Question <strong className="text-main">{savedQuiz.currentIndex + 1}</strong> of{' '}
                  <strong className="text-main">{savedQuiz.questionIds.length}</strong> •{' '}
                  {savedQuiz.answers.filter((a) => a.selectedIndex !== null).length} answered (
                  {savedQuiz.answers.filter((a) => a.isCorrect).length} correct)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto">
              <button
                type="button"
                onClick={handleDiscardSavedQuiz}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Start Over</span>
              </button>
              <button
                type="button"
                onClick={handleResumeSavedQuiz}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-md shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Play size={14} className="fill-current" />
                <span>Resume Drill</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spaced Repetition (SRS) Due Notice (if any) */}
      {dueSRSQuestions.length > 0 && (
        <div className="p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-500/10 border border-purple-500/30 text-xs">
          <div className="flex items-center gap-2.5 text-purple-700 dark:text-purple-300 font-semibold">
            <RotateCcw size={16} className="shrink-0 text-purple-500" />
            <span>
              <strong>{dueSRSQuestions.length}</strong> Spaced Repetition question{dueSRSQuestions.length === 1 ? '' : 's'} due for review!
            </span>
          </div>
          <button
            type="button"
            onClick={handleStartSRS}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-sm"
          >
            Drill Due Items ({dueSRSQuestions.length})
          </button>
        </div>
      )}

      {/* Main Inline Configuration Card */}
      <div className="card p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400">
              <Settings size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-main">Configure Drill</h2>
              <p className="text-xs text-sub">Custom quiz setup — instant practice or timed exam simulation.</p>
            </div>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 w-fit">
            <strong className="text-cyan-600 dark:text-cyan-400 font-bold">{matchingCount}</strong> questions match
          </div>
        </div>

        {/* Inline Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end gap-3.5">
          {/* 1. Question Count */}
          <div className="flex-1 min-w-[120px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Question Count
            </label>
            <div className="relative">
              <select
                value={config.questionCount}
                onChange={(e) => {
                  const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                  setConfig((prev) => ({ ...prev, questionCount: val }));
                }}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 pr-8 text-sm font-semibold text-main focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="300">300</option>
                <option value="all">All ({questions.length > 0 ? questions.length : 300})</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* 2. Topics */}
          <div className="flex-1 min-w-[170px] sm:col-span-1 lg:flex-[1.4]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Topics
            </label>
            <div className="relative">
              <select
                value={config.topics.length === 1 ? config.topics[0] : 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  setConfig((prev) => ({
                    ...prev,
                    topics: val === 'all' ? [] : [val],
                  }));
                }}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 pr-8 text-sm font-semibold text-main focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm truncate"
              >
                <option value="all">All Topics</option>
                {uniqueTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* 3. Difficulty */}
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Difficulty
            </label>
            <div className="relative">
              <select
                value={config.difficulties.length === 1 ? config.difficulties[0] : 'all'}
                onChange={(e) => {
                  const val = e.target.value;
                  setConfig((prev) => ({
                    ...prev,
                    difficulties: val === 'all' ? [] : [val as Difficulty],
                  }));
                }}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 pr-8 text-sm font-semibold text-main focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm capitalize"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* 4. Mode */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
              Mode
            </label>
            <div className="relative">
              <select
                value={config.mode}
                onChange={(e) => {
                  const val = e.target.value as 'practice' | 'exam';
                  setConfig((prev) => ({ ...prev, mode: val }));
                }}
                className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 pr-8 text-sm font-semibold text-main focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer shadow-sm"
              >
                <option value="practice">Practice Mode</option>
                <option value="exam">Exam Mode</option>
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* 5. Start Quiz Button */}
          <div className="sm:col-span-2 lg:col-span-1 shrink-0 pt-1 sm:pt-0">
            <button
              onClick={handleStart}
              disabled={matchingCount === 0}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none cursor-pointer"
            >
              <Play size={16} className="fill-current" />
              <span>Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
