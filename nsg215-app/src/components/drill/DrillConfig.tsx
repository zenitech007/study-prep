import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getUniqueTopics } from '../../utils/quiz';
import { getDueSRSQuestions } from '../../utils/srs';
import type { QuizConfig, Difficulty } from '../../types';
import { Brain, Settings, Play, Target, Zap, Clock, RotateCcw } from 'lucide-react';

export default function DrillConfig() {
  const questions = useAppStore((s) => s.questions);
  const progress = useAppStore((s) => s.progress);
  const startQuiz = useAppStore((s) => s.startQuiz);

  const uniqueTopics = useMemo(() => getUniqueTopics(questions), [questions]);
  const dueSRSQuestions = useMemo(
    () => getDueSRSQuestions(questions, progress.questionHistory),
    [questions, progress.questionHistory]
  );

  const [config, setConfig] = useState<QuizConfig>({
    questionCount: 20,
    topics: [],
    difficulties: [],
    mode: 'practice',
    smartDrill: false,
    srsOnly: false,
  });

  const handleTopicToggle = (topic: string) => {
    setConfig((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((t) => t !== topic)
        : [...prev.topics, topic],
    }));
  };

  const handleDifficultyToggle = (diff: Difficulty) => {
    setConfig((prev) => ({
      ...prev,
      difficulties: prev.difficulties.includes(diff)
        ? prev.difficulties.filter((d) => d !== diff)
        : [...prev.difficulties, diff],
    }));
  };

  const matchingCount = useMemo(() => {
    let list = questions;
    if (config.srsOnly) {
      const now = new Date();
      list = list.filter((q) => {
        const hist = progress.questionHistory[q.id];
        if (!hist) return false;
        if (!hist.lastCorrect) return true;
        if (hist.nextReviewDate && new Date(hist.nextReviewDate) <= now) return true;
        return false;
      });
    }
    return list.filter((q) => {
      const topicMatch = config.topics.length === 0 || config.topics.includes(q.topic);
      const diffMatch = config.difficulties.length === 0 || config.difficulties.includes(q.difficulty);
      return topicMatch && diffMatch;
    }).length;
  }, [questions, config.topics, config.difficulties, config.srsOnly, progress.questionHistory]);

  const handleStart = () => {
    if (matchingCount === 0) return;
    startQuiz(config);
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
  };

  const countOptions: (number | 'all')[] = [10, 20, 50, 'all'];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <Settings size={28} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-2xl font-bold text-main">Configure Drill</h2>
        </div>

        {/* Spaced Repetition (SRS) Due Banner */}
        {dueSRSQuestions.length > 0 && (
          <div
            className="mb-6 p-4 rounded-xl flex items-center justify-between gap-4 animate-fade-in"
            style={{
              backgroundColor: 'var(--color-accent-light)',
              border: '1px solid var(--color-accent)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <RotateCcw size={22} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-main">
                  Spaced Repetition: {dueSRSQuestions.length} Question{dueSRSQuestions.length === 1 ? '' : 's'} Due for Review!
                </h4>
                <p className="text-xs text-sub mt-0.5">
                  Anki-style memory scheduling ensures you review facts before you forget them.
                </p>
              </div>
            </div>
            <button
              onClick={handleStartSRS}
              className="btn text-xs font-semibold shrink-0 py-2 px-3 text-white shadow-sm"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Drill Due Items ({dueSRSQuestions.length})
            </button>
          </div>
        )}

        {/* Question Count */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-main uppercase tracking-wide mb-3">Question Count</h3>
          <div className="flex flex-wrap gap-2">
            {countOptions.map((count) => (
              <button
                key={String(count)}
                onClick={() => setConfig((prev) => ({ ...prev, questionCount: count }))}
                className={`btn text-sm ${config.questionCount === count ? 'btn-primary' : 'btn-secondary'}`}
              >
                {count === 'all' ? `All (${matchingCount})` : count}
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-main uppercase tracking-wide mb-3">
            Topics
            {config.topics.length > 0 && (
              <span className="ml-2 badge badge-primary">{config.topics.length} selected</span>
            )}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {uniqueTopics.map((topic) => (
              <label
                key={topic}
                className="flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors"
                style={{ backgroundColor: config.topics.includes(topic) ? 'var(--color-primary-light)' : undefined }}
              >
                <input
                  type="checkbox"
                  checked={config.topics.includes(topic)}
                  onChange={() => handleTopicToggle(topic)}
                  className="rounded"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm text-main">{topic}</span>
              </label>
            ))}
          </div>
          {config.topics.length > 0 && (
            <button
              onClick={() => setConfig((prev) => ({ ...prev, topics: [] }))}
              className="text-xs mt-2 cursor-pointer underline"
              style={{ color: 'var(--color-primary)' }}
            >
              Clear all topics
            </button>
          )}
        </div>

        {/* Difficulty */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-main uppercase tracking-wide mb-3">Difficulty</h3>
          <div className="flex flex-wrap gap-3">
            {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((diff) => (
              <label key={diff} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.difficulties.includes(diff)}
                  onChange={() => handleDifficultyToggle(diff)}
                  className="rounded"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm text-main capitalize">{diff}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-main uppercase tracking-wide mb-3">Mode</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setConfig((prev) => ({ ...prev, mode: 'practice' }))}
              className="card p-4 text-left cursor-pointer transition-all"
              style={{
                borderColor: config.mode === 'practice' ? 'var(--color-primary)' : undefined,
                borderWidth: config.mode === 'practice' ? '2px' : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Brain size={18} style={{ color: 'var(--color-primary)' }} />
                <span className="font-semibold text-main">Practice</span>
              </div>
              <p className="text-xs text-sub">Instant feedback after each answer. Great for learning.</p>
            </button>
            <button
              onClick={() => setConfig((prev) => ({ ...prev, mode: 'exam' }))}
              className="card p-4 text-left cursor-pointer transition-all"
              style={{
                borderColor: config.mode === 'exam' ? 'var(--color-primary)' : undefined,
                borderWidth: config.mode === 'exam' ? '2px' : undefined,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Target size={18} style={{ color: 'var(--color-warning)' }} />
                <span className="font-semibold text-main">Exam</span>
              </div>
              <p className="text-xs text-sub">Feedback only after submitting. Simulates exam conditions.</p>
            </button>
          </div>
        </div>

        {/* Smart Drill & Spaced Repetition toggles */}
        <div className="mb-8 space-y-3">
          <label
            className="flex items-center gap-3 cursor-pointer p-3 rounded-lg"
            style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <input
              type="checkbox"
              checked={config.smartDrill}
              onChange={(e) => setConfig((prev) => ({ ...prev, smartDrill: e.target.checked }))}
              className="rounded"
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <div>
              <span className="text-sm font-medium text-main flex items-center gap-1">
                <Zap size={14} style={{ color: 'var(--color-warning)' }} />
                Smart Weak-Topic Drilling
              </span>
              <span className="text-xs text-sub block mt-0.5">
                Prioritizes questions from topics where you've scored lower.
              </span>
            </div>
          </label>

          <label
            className="flex items-center gap-3 cursor-pointer p-3 rounded-lg"
            style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}
          >
            <input
              type="checkbox"
              checked={Boolean(config.srsOnly)}
              onChange={(e) => setConfig((prev) => ({ ...prev, srsOnly: e.target.checked }))}
              className="rounded"
              style={{ accentColor: 'var(--color-accent)' }}
            />
            <div>
              <span className="text-sm font-medium text-main flex items-center gap-1">
                <Clock size={14} style={{ color: 'var(--color-accent)' }} />
                Spaced Repetition Review Only (Due for recall)
              </span>
              <span className="text-xs text-sub block mt-0.5">
                Only show questions due for review based on memory retention intervals.
              </span>
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <span className="text-sm text-sub">
            <strong className="text-main">{matchingCount}</strong> questions match filters
          </span>
          <button
            onClick={handleStart}
            disabled={matchingCount === 0}
            className="btn btn-primary"
          >
            <Play size={18} />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
