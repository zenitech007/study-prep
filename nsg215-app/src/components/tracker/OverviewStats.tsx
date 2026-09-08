import { useAppStore } from '../../store/useAppStore';
import { Brain, Target, Flame, Award, Activity } from 'lucide-react';

export default function OverviewStats() {
  const progress = useAppStore((s) => s.progress);

  const getMessage = () => {
    if (progress.totalAttempted === 0) return "Ready to start your NSG 215 journey?";
    if (progress.preparedness >= 80) return "You're doing fantastic! Keep up the great work.";
    if (progress.preparedness >= 50) return "Solid progress! Keep practicing to boost that score.";
    return "Every question is a learning opportunity. Keep going!";
  };

  const stats = [
    {
      label: 'Questions Attempted',
      value: progress.totalAttempted,
      icon: Activity,
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary-light)',
    },
    {
      label: 'Overall Accuracy',
      value: `${progress.accuracy}%`,
      icon: Target,
      color: 'var(--color-success)',
      bgColor: 'var(--color-success-light)',
    },
    {
      label: 'Readiness',
      value: `${progress.preparedness}%`,
      icon: Brain,
      color: 'var(--color-accent)',
      bgColor: 'var(--color-accent-light)',
    },
    {
      label: 'Current Streak',
      value: progress.currentStreak,
      icon: Flame,
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning-light)',
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-2">
          <Award size={24} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-xl font-bold text-main">Your Progress</h2>
        </div>
        <p className="text-sub text-sm">{getMessage()}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4 flex flex-col items-center text-center gap-2">
              <div
                className="p-2.5 rounded-full"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}
              >
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-main">{stat.value}</p>
              <p className="text-[10px] font-medium text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Additional stats row */}
      {progress.totalAttempted > 0 && (
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-3 text-center">
            <p className="text-lg font-bold text-main">{progress.sessionCount}</p>
            <p className="text-[10px] text-muted uppercase">Sessions</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-lg font-bold text-main">{progress.bestStreak}</p>
            <p className="text-[10px] text-muted uppercase">Best Streak</p>
          </div>
          <div className="card p-3 text-center">
            <p className="text-lg font-bold text-main">{Object.keys(progress.questionHistory).length}</p>
            <p className="text-[10px] text-muted uppercase">Unique Seen</p>
          </div>
        </div>
      )}
    </div>
  );
}
