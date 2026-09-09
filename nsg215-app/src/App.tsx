import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CourseDashboardPage from './pages/CourseDashboardPage';
import LearnPage from './pages/LearnPage';
import ConceptsPage from './pages/ConceptsPage';
import DrillPage from './pages/DrillPage';
import TrackerPage from './pages/TrackerPage';
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

  const currentCourseId = useAppStore((s) => s.currentCourseId);
  const loadCourseQuestions = useAppStore((s) => s.loadCourseQuestions);

  // Load question bank for current course
  useEffect(() => {
    loadCourseQuestions(currentCourseId || 'nsg215');
  }, [currentCourseId, loadCourseQuestions]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="course/:courseId" element={<CourseDashboardPage />} />
          <Route path="course/:courseId/learn" element={<LearnPage />} />
          <Route path="course/:courseId/concepts" element={<ConceptsPage />} />
          <Route path="course/:courseId/drill" element={<DrillPage />} />
          <Route path="course/:courseId/tracker" element={<TrackerPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="drill" element={<DrillPage />} />
          <Route path="tracker" element={<TrackerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
