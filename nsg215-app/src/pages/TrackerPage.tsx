import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import OverviewStats from '../components/tracker/OverviewStats';
import TopicBreakdown from '../components/tracker/TopicBreakdown';
import MissedQuestions from '../components/tracker/MissedQuestions';
import DataPortability from '../components/tracker/DataPortability';
import { getCourse } from '../data/courses';
import LockedCourseView from '../components/common/LockedCourseView';

export default function TrackerPage() {
  const { courseId: paramCourseId } = useParams<{ courseId?: string }>();
  const currentCourseId = useAppStore((s) => s.currentCourseId);
  const setCurrentCourse = useAppStore((s) => s.setCurrentCourse);
  const progress = useAppStore((s) => s.progress);

  const activeCourseId = (paramCourseId || currentCourseId || 'gce204').toLowerCase();
  const courseConfig = getCourse(activeCourseId);

  useEffect(() => {
    if (courseConfig && courseConfig.status === 'active') {
      setCurrentCourse(activeCourseId);
    }
  }, [paramCourseId, currentCourseId, setCurrentCourse, courseConfig, activeCourseId]);

  if (courseConfig && courseConfig.status === 'locked') {
    return <LockedCourseView course={courseConfig} />;
  }

  const isPendingCourse = activeCourseId === 'gce204' || activeCourseId === 'nsg222' || activeCourseId === 'nsg223' || activeCourseId === 'nsg225' || activeCourseId === 'nsg229' || activeCourseId === 'nsg232' || activeCourseId === 'pio206' || activeCourseId === 'psy205' || activeCourseId === 'psm201';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-main">Performance Tracker</h1>
        <p className="text-sm text-sub mt-1">
          Monitor your progress, review missed concepts, and manage your data.
        </p>
      </div>

      {isPendingCourse && progress.totalAttempted === 0 && !progress.completedSessions?.length && (
        <div className="card p-5" role="status"><p className="font-semibold text-main">No {activeCourseId.toUpperCase()} progress yet</p><p className="text-sm text-sub mt-1">Study a module to begin tracking progress. Course questions are pending.</p><Link to="/" className="btn btn-primary inline-flex min-h-11 items-center mt-3">Back to Course Library</Link></div>
      )}

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
