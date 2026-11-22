import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import { useAppStore } from '../../store/useAppStore';

export default function Layout() {
  const location = useLocation();
  const courseLoadError = useAppStore((state) => state.courseLoadError);
  return (
    <div className="flex min-h-screen flex-col bg-app">
      <Header />

      {/* Main content area */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 pb-12">
        {location.pathname.startsWith('/course/') && courseLoadError && (
          <div role="alert" className="card p-4 mb-5 border border-rose-600">
            <p className="font-semibold text-main">{courseLoadError}</p>
            <button className="btn btn-primary min-h-11 mt-3 focus-visible:ring-2" onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
