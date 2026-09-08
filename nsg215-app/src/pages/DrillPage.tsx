import { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import DrillConfig from '../components/drill/DrillConfig';
import QuizRunner from '../components/drill/QuizRunner';
import ResultsSummary from '../components/drill/ResultsSummary';

export default function DrillPage() {
  const activeQuiz = useAppStore((state) => state.activeQuiz);
  const [isRunning, setIsRunning] = useState(false);

  // If quiz is finished, show results summary
  if (activeQuiz?.completedAt) {
    return <ResultsSummary />;
  }

  // If user has actively started or resumed the drill, show the runner
  if (activeQuiz && isRunning) {
    return <QuizRunner onExit={() => setIsRunning(false)} />;
  }

  // Otherwise, show DrillConfig (which presents the Resume/Start Over prompt if an active drill exists)
  return (
    <DrillConfig
      onResumeQuiz={() => setIsRunning(true)}
      onStartQuiz={() => setIsRunning(true)}
    />
  );
}
