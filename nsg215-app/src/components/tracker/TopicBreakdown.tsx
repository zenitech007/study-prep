import { useAppStore } from '../../store/useAppStore';
import { BarChart3, Clock } from 'lucide-react';

export default function TopicBreakdown() {
  const progress = useAppStore((s) => s.progress);

  const topics = [...progress.topicStats].sort((a, b) => {
    // Unattempted last, then by accuracy ascending
    if (a.attempted === 0 && b.attempted === 0) return 0;
    if (a.attempted === 0) return 1;
    if (b.attempted === 0) return -1;
    return a.accuracy - b.accuracy;
  });

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'var(--color-success)';
    if (accuracy >= 50) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={20} style={{ color: 'var(--color-primary)' }} />
        <h2 className="text-lg font-semibold text-main">Topic Breakdown</h2>
      </div>

      {topics.length === 0 ? (
        <p className="text-sub text-center py-6">
          Complete a quiz to see your per-topic performance here.
        </p>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.topic}>
              <div className="flex justify-between items-end mb-1">
                <div>
                  <h3 className="text-sm font-medium text-main">{topic.topic}</h3>
                  <div className="text-xs text-muted flex items-center gap-2 mt-0.5">
                    <span>{topic.attempted} attempted</span>
                    {topic.attempted > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {topic.avgTimePerQuestion}s avg
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  {topic.attempted > 0 ? (
                    <span
                      className="font-bold text-sm"
                      style={{ color: getAccuracyColor(topic.accuracy) }}
                    >
                      {topic.accuracy}%
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Not attempted</span>
                  )}
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${topic.attempted > 0 ? Math.max(topic.accuracy, 2) : 0}%`,
                    backgroundColor: topic.attempted > 0 ? getAccuracyColor(topic.accuracy) : 'var(--color-bg-secondary)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
