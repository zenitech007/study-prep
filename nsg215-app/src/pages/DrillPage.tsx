import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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

  const [isRunning, setIsRunning] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(true);

  const topicParam = searchParams.get('topic') || undefined;
  const autoStartParam = searchParams.get('autoStart') === 'true';

  useEffect(() => {
    if (paramCourseId && paramCourseId.toLowerCase() !== currentCourseId) {
      setCurrentCourse(paramCourseId.toLowerCase());
    }
  }, [paramCourseId, currentCourseId, setCurrentCourse]);

  const activeCourse = COURSES.find(
    (c) => c.id === (paramCourseId || currentCourseId || 'nsg215').toLowerCase()
  );

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
