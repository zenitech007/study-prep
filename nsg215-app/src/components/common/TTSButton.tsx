import { useEffect, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import type { SpeechState } from '../../utils/speech';
import { speechService } from '../../utils/speech';

interface TTSButtonProps {
  id: string;
  text: string;
  label?: string;
  size?: number;
  className?: string;
  variant?: 'pill' | 'icon' | 'compact';
}

export default function TTSButton({
  id,
  text,
  label,
  size = 15,
  className = '',
  variant = 'pill',
}: TTSButtonProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(speechService.getState());

  useEffect(() => {
    return speechService.subscribe((state) => {
      setSpeechState(state);
    });
  }, []);

  if (!speechService.isSupported()) return null;

  const isCurrentActive = speechState.isSpeaking && speechState.currentId === id;
  const voiceDesc = speechService.getVoiceDescription();

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent collapsing parent accordion if inside header
    speechService.toggle(id, text);
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          isCurrentActive
            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400 animate-pulse'
            : 'text-sub hover:text-main hover:bg-card-hover'
        } ${className}`}
        title={isCurrentActive ? `Stop audio (${voiceDesc})` : `Read aloud with ${voiceDesc}`}
        aria-label={isCurrentActive ? 'Stop reading' : 'Read text aloud'}
      >
        {isCurrentActive ? <Square size={size} fill="currentColor" /> : <Volume2 size={size} />}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
          isCurrentActive
            ? 'bg-blue-600 text-white shadow-xs animate-pulse'
            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-sub hover:text-main'
        } ${className}`}
        title={isCurrentActive ? `Stop audio (${voiceDesc})` : `Read aloud with ${voiceDesc}`}
        aria-label={isCurrentActive ? 'Stop reading' : 'Read text aloud'}
      >
        {isCurrentActive ? <Square size={12} fill="currentColor" /> : <Volume2 size={12} />}
        <span>{isCurrentActive ? 'Stop' : 'Listen'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
        isCurrentActive
          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300 dark:ring-blue-800 animate-pulse'
          : 'bg-card-hover text-sub hover:text-main border border-slate-200/80 dark:border-slate-700'
      } ${className}`}
      title={isCurrentActive ? `Stop audio (${voiceDesc})` : `Listen aloud with ${voiceDesc}`}
      aria-label={isCurrentActive ? 'Stop audio reading' : 'Play audio reading'}
    >
      {isCurrentActive ? (
        <>
          <Square size={size} fill="currentColor" />
          <span>{label || 'Playing...'}</span>
        </>
      ) : (
        <>
          <Volume2 size={size} />
          <span>{label || 'Listen'}</span>
        </>
      )}
    </button>
  );
}
