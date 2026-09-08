import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Brain, Sparkles, ChevronRight, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getAllCourses } from '../data/courses';
import type { Course } from '../data/courses';

export default function HomePage() {
  const navigate = useNavigate();
  const progress = useAppStore((s) => s.progress);
  const questionsLoaded = useAppStore((s) => s.questionsLoaded);

  const courses = getAllCourses();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hub Hero Banner */}
      <section className="text-center py-6 border-b pb-8" style={{ borderColor: 'var(--color-border)' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/40">
          <Sparkles size={14} />
          <span>University of Ibadan • Distance Learning Nursing Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-main mb-3 tracking-tight">
          Course Library & Exam Prep
        </h1>
        <p className="text-base text-sub max-w-2xl mx-auto leading-relaxed">
          Access course manuals, high-yield cheat sheets, and smart spaced-repetition drills tailored to the University of Ibadan Nursing Science curriculum.
        </p>
      </section>

      {/* Course Cards Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-main">Enrolled & Available Courses</h2>
            <p className="text-xs text-sub mt-0.5">Select a course to open its study manual, flash facts, and drill bank.</p>
          </div>
          <span className="badge badge-primary text-xs">
            {courses.filter(c => c.status === 'active').length} Active Course
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={() => navigate(course.route)}
              onQuickDrill={() => navigate('/drill')}
              onQuickLearn={() => navigate('/learn')}
              onQuickPrep={() => navigate('/concepts')}
              readiness={progress.preparedness}
              accuracy={progress.accuracy}
              attemptedCount={progress.totalAttempted}
              isLoaded={questionsLoaded}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
  onQuickDrill: () => void;
  onQuickLearn: () => void;
  onQuickPrep: () => void;
  readiness: number;
  accuracy: number;
  attemptedCount: number;
  isLoaded: boolean;
}

function CourseCard({
  course,
  onSelect,
  onQuickDrill,
  onQuickLearn,
  onQuickPrep,
  readiness,
  accuracy,
  attemptedCount,
}: CourseCardProps) {
  const isActive = course.status === 'active';

  return (
    <div
      className={`card overflow-hidden transition-all duration-200 border ${
        isActive
          ? 'border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md'
          : 'border-slate-200/60 dark:border-slate-800/60 opacity-80'
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {course.code.split(' ')[1]}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-extrabold text-main">{course.code}</span>
                <span className="text-xs font-semibold text-sub">• {course.credits}</span>
                <span className="text-xs font-medium text-muted">({course.level})</span>
                {isActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Active Course
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    Coming Soon
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-main mt-0.5">{course.title}</h3>
            </div>
          </div>

          {isActive && (
            <button
              onClick={onSelect}
              className="btn btn-primary text-xs sm:text-sm font-semibold shrink-0 py-2 px-4 inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Enter Course</span>
              <ChevronRight size={16} />
            </button>
          )}
        </div>

        <p className="text-sm text-sub leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <span className="badge badge-primary text-xs">
            {course.questionCount} Practice Questions
          </span>
          <span className="badge badge-accent text-xs">
            {course.sessionCount} Study Sessions
          </span>
          {isActive && (
            <span className="badge badge-success text-xs">
              Spaced Repetition (SRS)
            </span>
          )}
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-normal text-muted bg-slate-100 dark:bg-slate-800"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Active Course Progress Bar & Fast Actions */}
        {isActive ? (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-main">Exam Readiness</span>
                <span style={{ color: 'var(--color-primary)' }}>{readiness}%</span>
              </div>
              <div className="progress-bar h-2">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${readiness}%` }}
                />
              </div>
              <div className="flex gap-3 text-[11px] text-muted mt-1">
                <span>Accuracy: <strong className="text-main">{accuracy}%</strong></span>
                <span>Answered: <strong className="text-main">{attemptedCount}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onQuickLearn}
                className="btn btn-secondary text-xs px-2.5 py-1.5 inline-flex items-center gap-1"
                title="Open Study Sessions Manual"
              >
                <BookOpen size={14} />
                <span>Manual</span>
              </button>
              <button
                onClick={onQuickPrep}
                className="btn btn-secondary text-xs px-2.5 py-1.5 inline-flex items-center gap-1"
                title="Review Quick-Prep Flash Facts"
              >
                <Brain size={14} />
                <span>Quick-Prep</span>
              </button>
              <button
                onClick={onQuickDrill}
                className="btn btn-secondary text-xs px-2.5 py-1.5 inline-flex items-center gap-1"
                title="Start Clinical Practice Drill"
              >
                <Target size={14} />
                <span>Drill</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-muted flex items-center gap-1.5">
            <Clock size={14} />
            <span>Curriculum syllabus integration underway. Available next semester.</span>
          </div>
        )}
      </div>
    </div>
  );
}
