import { useState, useEffect, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle, XCircle, Sparkles } from 'lucide-react';
import type { Question, QuizMode, QuizAnswer } from '../../types';
import { speechService } from '../../utils/speech';
import { getRandomPhrase, CORRECT_FEEDBACK_PHRASES, INCORRECT_FEEDBACK_PHRASES } from '../../utils/voiceFeedback';
import TTSButton from '../common/TTSButton';

interface QuestionCardProps {
  question: Question;
  mode: QuizMode;
  currentAnswer: QuizAnswer;
  timeElapsed: number;
}

export default function QuestionCard({ question, mode, currentAnswer, timeElapsed }: QuestionCardProps) {
  const answerQuestion = useAppStore((s) => s.answerQuestion);
  const [shaking, setShaking] = useState(false);
  const [voiceEncouragement, setVoiceEncouragement] = useState<string>('');

  const isAnswered = currentAnswer?.selectedIndex !== null;
  const showFeedback = mode === 'practice' && isAnswered;

  // Stop speech when question changes
  useEffect(() => {
    speechService.stop();
  }, [question.id]);

  const handleSelect = (optionIndex: number) => {
    if (showFeedback) return; // In practice mode, can't change once answered
    const isCorrect = optionIndex === question.correctIndex;

    if (mode === 'practice') {
      if (isCorrect) {
        setVoiceEncouragement(getRandomPhrase(CORRECT_FEEDBACK_PHRASES));
      } else {
        setVoiceEncouragement(getRandomPhrase(INCORRECT_FEEDBACK_PHRASES));
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      }
    }

    answerQuestion(question.id, optionIndex, timeElapsed);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFeedback) return;

      const keyMap: Record<string, number> = {
        '1': 0, '2': 1, '3': 2, '4': 3,
        'a': 0, 'b': 1, 'c': 2, 'd': 3,
      };
      const idx = keyMap[e.key.toLowerCase()];
      if (idx !== undefined && idx < question.options.length) {
        handleSelect(idx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question.id, showFeedback]);

  // Build audio scripts
  const questionSpeechScript = useMemo(() => {
    const optionsScript = question.options
      .map((opt, i) => `Option ${String.fromCharCode(65 + i)}: ${opt}.`)
      .join(' ');
    return `${question.stem}. ${optionsScript}`;
  }, [question]);

  const rationaleSpeechScript = useMemo(() => {
    let script = `Rationale: ${question.explanation.correct}. `;
    if (question.explanation.distractors.length > 0) {
      script += "Distractor analysis: ";
      question.options.forEach((opt, i) => {
        if (i !== question.correctIndex) {
          let distractorIdx = i;
          if (i > question.correctIndex) distractorIdx -= 1;
          const exp = question.explanation.distractors[distractorIdx];
          if (exp) {
            script += `Option ${String.fromCharCode(65 + i)}, ${opt}: ${exp}. `;
          }
        }
      });
    }
    return script;
  }, [question]);

  // Map distractor explanation to option index
  const getDistractorExplanation = (optionIndex: number): string => {
    if (optionIndex === question.correctIndex) return '';
    let distractorIdx = optionIndex;
    if (optionIndex > question.correctIndex) distractorIdx -= 1;
    return question.explanation.distractors[distractorIdx] || '';
  };

  return (
    <div className={`card p-5 ${shaking ? 'animate-shake' : ''}`}>
      {/* Top bar with Badges & Audio Reader */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`badge ${question.type === 'scenario' ? 'badge-accent' : 'badge-primary'}`}>
            {question.type === 'scenario' ? 'Scenario' : 'Recall'}
          </span>
          <span
            className={`badge ${
              question.difficulty === 'advanced'
                ? 'badge-danger'
                : question.difficulty === 'intermediate'
                ? 'badge-warning'
                : 'badge-success'
            }`}
          >
            {question.difficulty}
          </span>
          <span className="text-xs text-muted">
            {question.subtopic}
          </span>
        </div>

        {/* Highly visible TTS button for clinical vignette */}
        <TTSButton
          id={`q-stem-${question.id}`}
          text={questionSpeechScript}
          label="Read Aloud"
        />
      </div>

      {/* Stem */}
      <div className="text-sm text-main mb-5 whitespace-pre-line leading-relaxed font-normal">
        {question.stem}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const label = String.fromCharCode(65 + idx);
          const isSelected = currentAnswer?.selectedIndex === idx;
          const isCorrect = idx === question.correctIndex;

          let borderColor = 'var(--color-border)';
          let bgColor = 'transparent';
          let textWeight = '';

          if (showFeedback) {
            if (isCorrect) {
              borderColor = 'var(--color-success)';
              bgColor = 'var(--color-success-light)';
              textWeight = 'font-semibold';
            } else if (isSelected) {
              borderColor = 'var(--color-danger)';
              bgColor = 'var(--color-danger-light)';
            }
          } else if (isSelected) {
            borderColor = 'var(--color-primary)';
            bgColor = 'var(--color-primary-light)';
            textWeight = 'font-semibold';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showFeedback}
              className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all cursor-pointer ${textWeight}`}
              style={{
                border: `2px solid ${borderColor}`,
                backgroundColor: bgColor,
                opacity: showFeedback && !isCorrect && !isSelected ? 0.6 : 1,
              }}
              aria-label={`Option ${label}: ${opt}`}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {label}
              </span>
              <span className="flex-1 text-sm text-main mt-0.5">{opt}</span>
              {showFeedback && isCorrect && (
                <CheckCircle size={18} style={{ color: 'var(--color-success)' }} className="shrink-0 mt-0.5" />
              )}
              {showFeedback && isSelected && !isCorrect && (
                <XCircle size={18} style={{ color: 'var(--color-danger)' }} className="shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation (Practice mode) */}
      {showFeedback && (
        <div
          className="mt-5 p-4 rounded-lg animate-fade-in"
          style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-accent)' }}
        >
          {/* Nigerian Student Voice Feedback Banner */}
          {voiceEncouragement && (
            <div className="flex items-center gap-2 mb-3 pb-2 border-b text-xs font-bold" style={{ borderColor: 'rgba(124, 58, 237, 0.2)', color: 'var(--color-accent)' }}>
              <Sparkles size={14} />
              <span>{voiceEncouragement}</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
              {currentAnswer.isCorrect ? '✓ Correct Rationale' : '✗ Incorrect Rationale'}
            </h4>
            <TTSButton
              id={`q-exp-${question.id}`}
              text={rationaleSpeechScript}
              variant="compact"
            />
          </div>

          <p className="text-sm text-sub mb-3">{question.explanation.correct}</p>

          {/* Why wrong options are wrong */}
          {question.explanation.distractors.length > 0 && (
            <div className="pt-3 space-y-2" style={{ borderTop: '1px solid var(--color-border)' }}>
              <h5 className="text-xs font-semibold text-muted">Distractor Analysis:</h5>
              {question.options.map((opt, i) => {
                if (i === question.correctIndex) return null;
                const explanation = getDistractorExplanation(i);
                if (!explanation) return null;
                return (
                  <div key={i} className="text-xs text-sub">
                    <span className="font-medium text-main">{String.fromCharCode(65 + i)}. {opt}:</span>{' '}
                    {explanation}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
