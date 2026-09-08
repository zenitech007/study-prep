import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Type } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { FontSize } from '../../types';

const fontSizeLabels: Record<FontSize, string> = {
  small: 'A-',
  medium: 'A',
  large: 'A+',
};

const fontSizeCycle: FontSize[] = ['small', 'medium', 'large'];

const navLinks = [
  { to: '/', label: 'Courses', icon: '📚' },
  { to: '/learn', label: 'Learn', icon: '📖' },
  { to: '/concepts', label: 'Quick-Prep', icon: '⚡' },
  { to: '/drill', label: 'Drill', icon: '🎯' },
  { to: '/tracker', label: 'Tracker', icon: '📊' },
];

export default function Header() {
  const theme = useAppStore((s) => s.theme);
  const fontSize = useAppStore((s) => s.fontSize);
  const setTheme = useAppStore((s) => s.setTheme);
  const setFontSize = useAppStore((s) => s.setFontSize);

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
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
        {/* Left: App Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity shrink-0"
          title="Go to Course Library"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-xs shadow-sm shadow-blue-500/20">
            UI
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black leading-tight tracking-tight text-main">
              StudyPrep <span className="text-cyan-500 dark:text-cyan-400">Hub</span>
            </span>
            <span className="text-[10px] font-semibold text-muted leading-tight hidden xs:inline">
              Distance Learning
            </span>
          </div>
        </Link>

        {/* Center: Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                }`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right: Settings (Theme & Font Size) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={cycleFontSize}
            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold transition-colors bg-card-hover text-sub hover:text-main cursor-pointer"
            aria-label={`Font size: ${fontSize}. Click to change.`}
            title={`Font size: ${fontSize}`}
          >
            <Type size={14} />
            <span>{fontSizeLabels[fontSize]}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 transition-colors bg-card-hover text-sub hover:text-main cursor-pointer"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar inside the same single sticky header */}
      <div className="md:hidden border-t border-slate-200/60 dark:border-slate-800/80 px-2 py-1.5 overflow-x-auto no-scrollbar">
        <nav className="flex items-center justify-around min-w-max gap-1 mx-auto">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60 dark:border-cyan-800/60 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
