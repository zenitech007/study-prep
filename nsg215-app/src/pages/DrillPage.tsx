import { useAppStore } from '../store/useAppStore';
import DrillConfig from '../components/drill/DrillConfig';
import QuizRunner from '../components/drill/QuizRunner';
import ResultsSummary from '../components/drill/ResultsSummary';

export default function DrillPage() {
  const activeQuiz = useAppStore((state) => state.activeQuiz);

  if (!activeQuiz) {
    return <DrillConfig />;
  }

  if (activeQuiz.completedAt) {
    return <ResultsSummary />;
  }

  return <QuizRunner />;
}
