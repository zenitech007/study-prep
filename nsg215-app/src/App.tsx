import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Layout from './components/layout/Layout';
const HomePage = lazy(() => import('./pages/HomePage'));
const CourseDashboardPage = lazy(() => import('./pages/CourseDashboardPage'));
const LearnPage = lazy(() => import('./pages/LearnPage'));
const ConceptsPage = lazy(() => import('./pages/ConceptsPage'));
const DrillPage = lazy(() => import('./pages/DrillPage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage'));
import CourseRouteGuard from './components/layout/CourseRouteGuard';
import { useAppStore } from './store/useAppStore';
import { storage } from './store/storage';

function App() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const fontSize = useAppStore((s) => s.fontSize);

  // Apply theme and font size on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    const sizes = { small: '14px', medium: '16px', large: '18px' } as const;
    document.documentElement.style.setProperty('--base-font-size', sizes[fontSize]);
  }, [theme, fontSize]);

  // System-synced theme listener
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't set an explicit manual override
      if (!storage.hasManualTheme()) {
        setTheme(e.matches ? 'dark' : 'light', false /* don't lock manual override */);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [setTheme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div role="status" aria-label="Loading course view" className="mx-auto max-w-5xl space-y-4 p-6"><div className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" /><div className="h-40 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" /></div>}><Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="course/:courseId" element={<CourseRouteGuard />}>
            <Route index element={<CourseDashboardPage />} />
            <Route path="learn" element={<LearnPage />} />
            <Route path="concepts" element={<ConceptsPage />} />
            <Route path="drill" element={<DrillPage />} />
            <Route path="tracker" element={<TrackerPage />} />
          </Route>
          <Route path="learn" element={<LearnPage />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="drill" element={<DrillPage />} />
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
      </Routes></Suspense>
    </BrowserRouter>
  );
}

export default App;
