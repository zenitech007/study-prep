import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { Award, Clock, RotateCcw, Home, CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../../utils/confetti';
import { getCompletionPhrase } from '../../utils/voiceFeedback';

export default function ResultsSummary() {
  const navigate = useNavigate();
  const activeQuiz = useAppStore((s) => s.activeQuiz);
  const questions = useAppStore((s) => s.questions);
  const resetQuiz = useAppStore((s) => s.resetQuiz);
  const [filter, setFilter] = useState<'all' | 'missed'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!activeQuiz) return null;

  const quizQuestions = useMemo(
    () => activeQuiz.questionIds.map((id) => questions.find((q) => q.id === id)!).filter(Boolean),
    [activeQuiz.questionIds, questions]
  );

  const answeredCount = activeQuiz.answers.filter((a) => a.selectedIndex !== null).length;
  const correctCount = activeQuiz.answers.filter((a) => a.isCorrect).length;
  const scorePct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const totalTime = activeQuiz.answers.reduce((sum, a) => sum + a.timeSpent, 0);
  const avgTime = answeredCount > 0 ? Math.round(totalTime / answeredCount) : 0;

  // Group by topic
  const topicStats = useMemo(() => {
    const stats: Record<string, { total: number; correct: number }> = {};
    activeQuiz.answers.forEach((ans) => {
      const question = questions.find((q) => q.id === ans.questionId);
      if (!question) return;
      if (!stats[question.topic]) stats[question.topic] = { total: 0, correct: 0 };
      stats[question.topic].total += 1;
      if (ans.isCorrect) stats[question.topic].correct += 1;
    });
    return stats;
  }, [activeQuiz.answers, questions]);

  const displayQuestions = useMemo(() => {
    return quizQuestions.filter((q) => {
      if (filter === 'missed') {
        const ans = activeQuiz.answers.find((a) => a.questionId === q.id);
        return ans && !ans.isCorrect;
      }
      return true;
    });
  }, [quizQuestions, filter, activeQuiz.answers]);

  // Trigger confetti burst on high score (75%+)
  useEffect(() => {
    if (scorePct >= 75) {
      triggerConfetti();
    }
  }, [scorePct]);

  const cheerPhrase = useMemo(() => getCompletionPhrase(scorePct), [scorePct]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Score Header */}
      <div className="card p-8 text-center">
        <Award size={48} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
        <h2 className="text-2xl font-bold text-main mb-2">Quiz Complete!</h2>
        <div
          className="text-5xl font-extrabold mb-2"
          style={{ color: scorePct >= 70 ? 'var(--color-success)' : scorePct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)' }}
        >
          {scorePct}%
        </div>
        {/* Nigerian Student Cheer */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 text-sm font-semibold" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
          <Sparkles size={16} />
          <span>{cheerPhrase}</span>
        </div>
        <p className="text-sub text-sm">
          {scorePct >= 80
            ? "Excellent work! You're really mastering this material."
            : scorePct >= 60
            ? 'Good progress! Keep practicing to strengthen weak areas.'
            : "Don't worry — review the explanations below and try again!"}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs text-sub">Score</div>
            <div className="text-lg font-bold text-main">{correctCount}/{answeredCount}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs text-sub">Mode</div>
            <div className="text-lg font-bold text-main capitalize">{activeQuiz.config.mode}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs text-sub flex items-center gap-1"><Clock size={12} /> Total</div>
            <div className="text-lg font-bold text-main">{Math.floor(totalTime / 60)}m {totalTime % 60}s</div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <div className="text-xs text-sub">Avg/Question</div>
            <div className="text-lg font-bold text-main">{avgTime}s</div>
          </div>
        </div>
      </div>

      {/* Topic Breakdown */}
      <div className="card p-5">
        <h3 className="text-lg font-semibold text-main mb-4">Performance by Topic</h3>
        <div className="space-y-3">
          {Object.entries(topicStats).map(([topic, stats]) => {
            const pct = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-main font-medium">{topic}</span>
                  <span className="text-sub">{stats.correct}/{stats.total} ({pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: pct >= 75 ? 'var(--color-success)' : pct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div className="card p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-main">Review Questions</h3>
          <div className="flex p-1 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-card text-main shadow-sm' : 'text-sub'}`}
            >
              All ({quizQuestions.length})
            </button>
            <button
              onClick={() => setFilter('missed')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${filter === 'missed' ? 'bg-card text-main shadow-sm' : 'text-sub'}`}
            >
              Missed ({activeQuiz.answers.filter((a) => !a.isCorrect && a.selectedIndex !== null).length})
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {displayQuestions.map((q, idx) => {
            const ans = activeQuiz.answers.find((a) => a.questionId === q.id);
            const isExpanded = expandedId === q.id;

            return (
              <div key={q.id} className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="w-full flex items-center justify-between p-3 text-left transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--color-bg-card)' }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-muted font-mono w-6">#{idx + 1}</span>
                    {ans?.isCorrect ? (
                      <CheckCircle size={18} style={{ color: 'var(--color-success)' }} className="shrink-0" />
                    ) : (
                      <XCircle size={18} style={{ color: 'var(--color-danger)' }} className="shrink-0" />
                    )}
                    <span className="text-sm text-main truncate">{q.stem}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={16} className="text-muted shrink-0" /> : <ChevronDown size={16} className="text-muted shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                    <p className="text-sm text-main whitespace-pre-line mb-4">{q.stem}</p>

                    <div className="space-y-2 mb-4">
                      {q.options.map((opt, i) => {
                        const isCorrect = i === q.correctIndex;
                        const isSelected = ans?.selectedIndex === i;
                        let borderColor = 'var(--color-border)';
                        let bgColor = 'transparent';

                        if (isCorrect) {
                          borderColor = 'var(--color-success)';
                          bgColor = 'var(--color-success-light)';
                        } else if (isSelected && !isCorrect) {
                          borderColor = 'var(--color-danger)';
                          bgColor = 'var(--color-danger-light)';
                        }

                        return (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2.5 rounded-lg text-sm"
                            style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor }}
                          >
                            <span className="font-bold text-muted w-6 shrink-0">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            <span className="text-main flex-1">{opt}</span>
                            {isCorrect && <CheckCircle size={16} style={{ color: 'var(--color-success)' }} className="shrink-0 mt-0.5" />}
                            {isSelected && !isCorrect && <XCircle size={16} style={{ color: 'var(--color-danger)' }} className="shrink-0 mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
                      <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>Explanation</h4>
                      <p className="text-sm text-sub mb-2">{q.explanation.correct}</p>
                      {ans && !ans.isCorrect && ans.selectedIndex !== null && (
                        <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                          <p className="text-xs text-muted mb-1">Why your answer was wrong:</p>
                          <p className="text-sm text-sub">
                            {/* Map selectedIndex to the distractors array */}
                            {(() => {
                              let distractorIdx = ans.selectedIndex;
                              if (ans.selectedIndex > q.correctIndex) distractorIdx -= 1;
                              return q.explanation.distractors[distractorIdx] || '';
                            })()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pb-4">
        <button
          onClick={() => { resetQuiz(); navigate('/'); }}
          className="btn btn-secondary"
        >
          <Home size={18} />
          Home
        </button>
        <button
          onClick={() => resetQuiz()}
          className="btn btn-primary"
        >
          <RotateCcw size={18} />
          New Quiz
        </button>
      </div>
    </div>
  );
}
