import OverviewStats from '../components/tracker/OverviewStats';
import TopicBreakdown from '../components/tracker/TopicBreakdown';
import MissedQuestions from '../components/tracker/MissedQuestions';
import DataPortability from '../components/tracker/DataPortability';

export default function TrackerPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-main">Performance Tracker</h1>
        <p className="text-sm text-sub mt-1">
          Monitor your progress, review missed concepts, and manage your data.
        </p>
      </div>

      <OverviewStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MissedQuestions />
          <DataPortability />
        </div>
        <div className="lg:col-span-1">
          <TopicBreakdown />
        </div>
      </div>
    </div>
  );
}
