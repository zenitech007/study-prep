import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import DrillConfig from '../components/drill/DrillConfig';
import QuizRunner from '../components/drill/QuizRunner';
import ResultsSummary from '../components/drill/ResultsSummary';
import DrillResumeModal from '../components/drill/DrillResumeModal';
import { COURSES } from '../data/courses';

export default function DrillPage() {
  const { courseId: paramCourseId } = useParams<{ courseId?: string }>();
  const [searchParams] = useSearchParams();

  const currentCourseId = useAppStore((state) => state.currentCourseId);
  const setCurrentCourse = useAppStore((state) => state.setCurrentCourse);
  const activeQuiz = useAppStore((state) => state.activeQuiz);
  const resumeSavedQuiz = useAppStore((state) => state.resumeSavedQuiz);
  const discardSavedQuiz = useAppStore((state) => state.discardSavedQuiz);
  const questions = useAppStore((state) => state.questions);
  const questionsLoaded = useAppStore((state) => state.questionsLoaded);
  const courseLoadError = useAppStore((state) => state.courseLoadError);

  const [isRunning, setIsRunning] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(true);

  const topicParam = searchParams.get('topic') || undefined;
  const autoStartParam = searchParams.get('autoStart') === 'true';

  useEffect(() => {
    setCurrentCourse((paramCourseId || currentCourseId || 'nsg215').toLowerCase());
  }, [paramCourseId, currentCourseId, setCurrentCourse]);

  const activeCourse = COURSES.find(
    (c) => c.id === (paramCourseId || currentCourseId || 'nsg215').toLowerCase()
  );
  const activeId = (paramCourseId || currentCourseId || 'nsg215').toLowerCase();
  if ((activeId === 'ana214' || activeId === 'gce204' || activeId === 'nsg222') && courseLoadError) return null;
  if ((activeId === 'ana214' || activeId === 'gce204' || activeId === 'nsg222') && !questionsLoaded) return <div role="status" aria-label="Loading drill" className="space-y-4"><div className="card h-24 animate-pulse bg-slate-100 dark:bg-slate-800" /><div className="card h-48 animate-pulse bg-slate-100 dark:bg-slate-800" /></div>;
  if ((activeId === 'gce204' || activeId === 'nsg222') && questions.length === 0) return <section className="card p-8"><h1 className="text-xl font-bold">Drill questions are pending</h1><p className="mt-3 text-sub">The 300-question bank is being prepared.</p><Link to="/" className="btn btn-primary inline-flex items-center min-h-11 mt-4">Back to Course Library</Link></section>;

  // If quiz is finished, show results summary
  if (activeQuiz?.completedAt) {
    return <ResultsSummary />;
  }

  // If user has actively started or resumed the drill, show the runner
  if (activeQuiz && isRunning) {
    return <QuizRunner onExit={() => setIsRunning(false)} />;
  }

  return (
    <>
      {/* Resume modal if user navigated away and returned with an unfinished drill */}
      {activeQuiz && !isRunning && showResumeModal && (
        <DrillResumeModal
          quiz={activeQuiz}
          courseCode={activeCourse?.code || 'Course'}
          onResume={() => {
            resumeSavedQuiz();
            setIsRunning(true);
            setShowResumeModal(false);
          }}
          onDiscard={() => {
            discardSavedQuiz();
            setShowResumeModal(false);
          }}
          onClose={() => setShowResumeModal(false)}
        />
      )}

      <DrillConfig
        onResumeQuiz={() => setIsRunning(true)}
        onStartQuiz={() => setIsRunning(true)}
        initialTopic={topicParam}
        autoStart={autoStartParam}
      />
    </>
  );
}
