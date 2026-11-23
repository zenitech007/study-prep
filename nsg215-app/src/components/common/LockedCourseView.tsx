import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, BookOpen } from 'lucide-react';
import type { Course } from '../../data/courses';

interface LockedCourseViewProps {
  course: Course;
}

export default function LockedCourseView({ course }: LockedCourseViewProps) {
  return (
    <main
      className="max-w-3xl mx-auto py-10 px-4 sm:px-6 animate-fade-in"
      role="status"
      aria-label={`${course.code} is locked: previous semester course`}
    >
      <div className="card-glass rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl text-center space-y-6">
        {/* Lock Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/50 dark:border-amber-700/50 shadow-lg shadow-amber-500/10">
          <Lock size={36} aria-hidden="true" />
        </div>

        {/* Course Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 mb-1">
            <Lock size={12} className="shrink-0" aria-hidden="true" />
            <span>Previous Semester Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-main tracking-tight">
            {course.code} — {course.title}
          </h1>
          <p className="text-sm font-semibold text-sub">
            {course.department} • {course.credits} ({course.level})
          </p>
        </div>

        {/* Explanatory Message */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left max-w-xl mx-auto space-y-2.5">
          <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <BookOpen size={16} className="text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
            <span>Course Access Locked</span>
          </p>
          <p>
            <strong>{course.code}</strong> was completed during the previous semester ({course.level}). To prevent confusion with your current active semester courses, this course has been locked.
          </p>
          <p className="text-xs text-muted">
            All modules, question banks, and your saved progress remain safely preserved in the system for your records.
          </p>
        </div>

        {/* Primary CTA Back to Course Library */}
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-extrabold bg-blue-600 hover:bg-blue-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 cursor-pointer"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span>Back to Course Library</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
