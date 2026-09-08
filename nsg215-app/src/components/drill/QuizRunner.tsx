import { useRef, useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function QuizRunner() {
  const activeQuiz = useAppStore((s) => s.activeQuiz);
  const questions = useAppStore((s) => s.questions);
  const progress = useAppStore((s) => s.progress);
  const navigateQuiz = useAppStore((s) => s.navigateQuiz);
  const submitQuiz = useAppStore((s) => s.submitQuiz);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const goToQuestion = useAppStore((s) => s.goToQuestion);

  // Timer for current question
  const timerRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [elapsed, setElapsed] = useState(0);

  // Reset timer when question changes
  useEffect(() => {
    timerRef.current = 0;
    setElapsed(0);

    intervalRef.current = setInterval(() => {
      timerRef.current += 1;
      setElapsed(timerRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeQuiz?.currentIndex]);

  if (!activeQuiz) return null;

  const currentQuestionId = activeQuiz.questionIds[activeQuiz.currentIndex];
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const currentAnswer = activeQuiz.answers[activeQuiz.currentIndex];
  const isBookmarked = progress.bookmarkedQuestionIds.includes(currentQuestionId);
  const isLastQuestion = activeQuiz.currentIndex === activeQuiz.questionIds.length - 1;

  if (!currentQuestion) return null;

  const getTimerDisplay = () => {
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-main">
          Question {activeQuiz.currentIndex + 1} of {activeQuiz.questionIds.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted font-mono">{getTimerDisplay()}</span>
          <button
            onClick={() => toggleBookmark(currentQuestionId)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: isBookmarked ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {activeQuiz.questionIds.map((qId, idx) => {
          const ans = activeQuiz.answers[idx];
          const isAnswered = ans?.selectedIndex !== null;
          const isCurrent = idx === activeQuiz.currentIndex;

          let bgColor = 'var(--color-bg-secondary)';
          let borderColor = 'var(--color-border)';

          if (isAnswered) {
            if (activeQuiz.config.mode === 'practice') {
              bgColor = ans.isCorrect ? 'var(--color-success)' : 'var(--color-danger)';
              borderColor = bgColor;
            } else {
              bgColor = 'var(--color-primary)';
              borderColor = bgColor;
            }
          }

          return (
            <button
              key={qId}
              onClick={() => goToQuestion(idx)}
              className="shrink-0 rounded-full transition-all"
              style={{
                width: 20,
                height: 20,
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                outline: isCurrent ? `2px solid var(--color-primary)` : 'none',
                outlineOffset: 2,
              }}
              aria-label={`Go to question ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        mode={activeQuiz.config.mode}
        currentAnswer={currentAnswer}
        timeElapsed={timerRef.current}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <button
          onClick={() => navigateQuiz('prev')}
          disabled={activeQuiz.currentIndex === 0}
          className="btn btn-secondary text-sm"
          style={{ opacity: activeQuiz.currentIndex === 0 ? 0.5 : 1 }}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="flex gap-2">
          {/* Always show submit button if we're past the midpoint or on last question */}
          {(isLastQuestion || activeQuiz.currentIndex >= Math.floor(activeQuiz.questionIds.length / 2)) && (
            <button
              onClick={submitQuiz}
              className="btn text-sm"
              style={{
                backgroundColor: 'var(--color-success)',
                color: 'white',
              }}
            >
              Submit Quiz
            </button>
          )}

          {!isLastQuestion && (
            <button
              onClick={() => navigateQuiz('next')}
              className="btn btn-primary text-sm"
            >
              Next
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
