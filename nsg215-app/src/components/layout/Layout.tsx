import { Outlet } from 'react-router-dom';
import Header from './Header';
import TabNav from './TabNav';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-app">
      <Header />

      {/* Desktop tab nav */}
      <div className="hidden md:block">
        <TabNav />
      </div>

      {/* Main content area */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Mobile tab nav */}
      <div className="md:hidden">
        <TabNav />
      </div>
    </div>
  );
}
