import { NavLink } from 'react-router-dom';
import { Layers, BookOpen, Brain, Target, BarChart3 } from 'lucide-react';

const tabs = [
  { to: '/', label: '📚 Courses', icon: Layers },
  { to: '/learn', label: '📖 Learn', icon: BookOpen },
  { to: '/concepts', label: '⚡ Quick-Prep', icon: Brain },
  { to: '/drill', label: '🎯 Drill', icon: Target },
  { to: '/tracker', label: '📊 Tracker', icon: BarChart3 },
];

export default function TabNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card no-print md:static md:border-t-0 md:border-b"
      style={{ borderColor: 'var(--color-border)' }}
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-1 md:justify-center md:gap-2 md:py-0">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            role="tab"
            className={({ isActive }) =>
              `tab-item ${isActive ? 'active' : ''}`
            }
            aria-label={label}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
