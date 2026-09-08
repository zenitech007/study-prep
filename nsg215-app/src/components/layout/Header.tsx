import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Type, Layers } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { FontSize } from '../../types';

const fontSizeLabels: Record<FontSize, string> = {
  small: 'A-',
  medium: 'A',
  large: 'A+',
};

const fontSizeCycle: FontSize[] = ['small', 'medium', 'large'];

export default function Header() {
  const location = useLocation();
  const theme = useAppStore((s) => s.theme);
  const fontSize = useAppStore((s) => s.fontSize);
  const setTheme = useAppStore((s) => s.setTheme);
  const setFontSize = useAppStore((s) => s.setFontSize);

  const isHubHome = location.pathname === '/';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light', true /* save manual override */);
  };

  const cycleFontSize = () => {
    const currentIdx = fontSizeCycle.indexOf(fontSize);
    const nextIdx = (currentIdx + 1) % fontSizeCycle.length;
    setFontSize(fontSizeCycle[nextIdx]);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur-md no-print transition-colors"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            title="Go to Course Library"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-sm shadow-blue-500/20">
              UI
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold leading-tight tracking-tight text-main">
                StudyPrep <span className="text-cyan-500 dark:text-cyan-400">Hub</span>
              </span>
              <span className="text-[10px] font-semibold text-muted leading-tight">
                Distance Learning
              </span>
            </div>
          </Link>

          {!isHubHome && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <Link
                to="/course/nsg215"
                className="text-xs font-semibold px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors"
              >
                NSG 215
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Courses Hub link if not already on hub */}
          {!isHubHome && (
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-card-hover text-sub hover:text-main transition-colors"
              title="View All Courses"
            >
              <Layers size={13} />
              <span>All Courses</span>
            </Link>
          )}

          {/* Font size toggle */}
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm transition-colors bg-card-hover cursor-pointer"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={`Font size: ${fontSize}. Click to change.`}
            title={`Font size: ${fontSize}`}
          >
            <Type size={14} />
            <span className="text-xs font-medium">{fontSizeLabels[fontSize]}</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-colors bg-card-hover cursor-pointer"
            style={{ color: 'var(--color-text-secondary)' }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
