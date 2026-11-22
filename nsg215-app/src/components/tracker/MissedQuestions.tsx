import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Target, Bookmark, ChevronDown, ChevronUp, CheckCircle, XCircle, Play } from 'lucide-react';

export default function MissedQuestions() {
  const questions = useAppStore((s) => s.questions);
  const progress = useAppStore((s) => s.progress);
  const startQuiz = useAppStore((s) => s.startQuiz);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const [activeTab, setActiveTab] = useState<'missed' | 'bookmarked'>('missed');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const missedQuestions = questions.filter((q) =>
    progress.missedQuestionIds.includes(q.id)
  );

  const bookmarkedQuestions = questions.filter((q) =>
    progress.bookmarkedQuestionIds.includes(q.id)
  );

  const displayList = activeTab === 'missed' ? missedQuestions : bookmarkedQuestions;

  const handleDrill = () => {
    if (displayList.length === 0) return;
    startQuiz({
      questionCount: displayList.length,
      topics: [],
      difficulties: [],
      mode: 'practice',
      smartDrill: false,
    });
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'advanced': return 'badge-danger';
      case 'intermediate': return 'badge-warning';
      default: return 'badge-success';
    }
  };

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-main flex items-center gap-2">
          <Target size={20} style={{ color: 'var(--color-primary)' }} />
          Review & Drill
        </h2>
        <div className="flex p-1 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
          <button
            onClick={() => setActiveTab('missed')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'missed' ? 'bg-card text-main shadow-sm' : 'text-sub'
            }`}
          >
            Missed ({missedQuestions.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarked')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bookmarked' ? 'bg-card text-main shadow-sm' : 'text-sub'
            }`}
          >
            Bookmarked ({bookmarkedQuestions.length})
          </button>
        </div>
      </div>

      {displayList.length > 0 ? (
        <>
          <button
            onClick={handleDrill}
            className="btn btn-primary text-sm w-full sm:w-auto mb-4"
          >
            <Play size={16} />
            Drill {activeTab === 'missed' ? 'Missed' : 'Bookmarked'} Questions
          </button>

          <div className="space-y-2">
            {displayList.map((q) => {
              const isExpanded = expandedId === q.id;
              const isBookmarked = progress.bookmarkedQuestionIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="p-3 cursor-pointer flex items-start gap-3 transition-colors"
                    style={{ backgroundColor: 'var(--color-bg-card)' }}
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(q.id); }}
                      className="mt-0.5 shrink-0"
                      style={{ color: isBookmarked ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                    >
                      <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="badge badge-accent text-[10px]">{q.topic}</span>
                        <span className={`badge ${getDifficultyBadge(q.difficulty)} text-[10px]`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-main line-clamp-2">{q.stem}</p>
                    </div>

                    <div className="shrink-0 mt-1 text-muted">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                      <p className="text-sm text-main whitespace-pre-line mb-3">{q.stem}</p>
                      <div className="space-y-1.5 mb-3">
                        {q.options.map((opt, i) => {
                          const isCorrect = i === q.correctIndex;
                          return (
                            <div
                              key={i}
                              className="flex items-start gap-2 p-2 rounded-md text-sm"
                              style={{
                                backgroundColor: isCorrect ? 'var(--color-success-light)' : 'transparent',
                                border: `1px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-border)'}`,
                              }}
                            >
                              {isCorrect ? (
                                <CheckCircle size={16} style={{ color: 'var(--color-success)' }} className="shrink-0 mt-0.5" />
                              ) : (
                                <XCircle size={16} className="text-muted shrink-0 mt-0.5" />
                              )}
                              <span className="text-main">{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}>
                        <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>Explanation</h4>
                        <p className="text-sm text-sub">{q.explanation.correct}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center py-8 px-4 rounded-lg" style={{ border: '1px dashed var(--color-border)' }}>
          <CheckCircle size={36} className="mx-auto mb-3 opacity-50" style={{ color: 'var(--color-success)' }} />
          <h3 className="text-base font-medium text-main mb-1">
            {activeTab === 'missed' ? 'No missed questions!' : 'No bookmarked questions'}
          </h3>
          <p className="text-sm text-sub">
            {activeTab === 'missed'
              ? "Great job! You don't have any incorrectly answered questions to review."
              : "You haven't bookmarked any questions yet. Tap the bookmark icon during a quiz!"}
          </p>
        </div>
      )}
    </div>
  );
}
