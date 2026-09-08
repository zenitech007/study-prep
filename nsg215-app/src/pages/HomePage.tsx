import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Clock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getAllCourses } from '../data/courses';
import type { Course } from '../data/courses';

export default function HomePage() {
  const navigate = useNavigate();
  const progress = useAppStore((s) => s.progress);
  const questionsLoaded = useAppStore((s) => s.questionsLoaded);

  const courses = getAllCourses();

  return (
    <div className="space-y-10 animate-fade-in py-2">
      {/* Hub Hero Banner */}
      <section className="text-center py-6 sm:py-8 border-b border-slate-200/80 dark:border-slate-800/80 pb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-blue-50 dark:bg-cyan-950/50 text-blue-700 dark:text-cyan-300 border border-blue-200/80 dark:border-cyan-500/30 backdrop-blur-md shadow-xs">
          <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
          <span>University of Ibadan • Distance Learning Nursing Suite</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-200">
            NSG 215: Master Human Behavior
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
          Access high-yield study manuals, rapid cheat sheets, and smart spaced-repetition drills tailored to the University of Ibadan Nursing curriculum.
        </p>
      </section>

      {/* Course Cards Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-main flex items-center gap-2">
              <span>📚</span>
              <span>Enrolled & Available Courses</span>
            </h2>
            <p className="text-xs sm:text-sm text-sub mt-0.5">
              Select your course to open its study manual, flash facts, and quiz drill bank.
            </p>
          </div>
          <span className="badge badge-primary text-xs font-bold px-3 py-1">
            {courses.filter((c) => c.status === 'active').length} Active
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

  if (!isActive) {
    return (
      <div className="card-glass rounded-2xl p-6 sm:p-7 border border-slate-200/60 dark:border-slate-800/80 opacity-75 hover:opacity-90 transition-opacity">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {course.code.split(' ')[1]}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-extrabold text-main">{course.code}</span>
                <span className="text-xs font-semibold text-sub">• {course.credits}</span>
                <span className="text-xs font-medium text-muted">({course.level})</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-main mt-0.5">{course.title}</h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-sub leading-relaxed mb-4">
          {course.description}
        </p>

        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-muted flex items-center gap-1.5 font-medium">
          <Clock size={14} />
          <span>Curriculum syllabus integration underway. Available next semester.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/60 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-all duration-300">
      {/* Top row: Badges, Title & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25">
            {course.code.split(' ')[1]}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-black text-main">{course.code}</span>
              <span className="text-xs font-bold text-sub">• {course.credits}</span>
              <span className="text-xs font-semibold text-muted">({course.level})</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Course
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-main mt-1 tracking-tight">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Vibrant Primary Action Button with Hover Lift Effect */}
        <button
          onClick={onSelect}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-extrabold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer shrink-0 self-start sm:self-center"
        >
          <span>🚀 Enter Course</span>
          <ChevronRight size={18} className="stroke-[2.5]" />
        </button>
      </div>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-2 font-normal">
        {course.description}
      </p>

      {/* De-cluttered 3 Key Metrics Row */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 my-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-2xs">
          <span className="text-sm">📝</span>
          <span>100 Questions</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-2xs">
          <span className="text-sm">🧠</span>
          <span>Spaced Repetition</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-2xs">
          <span className="text-sm">📚</span>
          <span>8 Sessions</span>
        </div>
      </div>

      {/* Active Course Progress Bar & Fast Actions */}
      <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-main flex items-center gap-1.5">
              <span>🎯</span> Exam Readiness
            </span>
            <span className="text-cyan-600 dark:text-cyan-400 font-extrabold text-sm">{readiness}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <div className="flex gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
            <span>Accuracy: <strong className="text-slate-800 dark:text-slate-200 font-bold">{accuracy}%</strong></span>
            <span>Answered: <strong className="text-slate-800 dark:text-slate-200 font-bold">{attemptedCount}</strong></span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onQuickLearn}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shadow-2xs"
            title="Open Study Sessions Manual"
          >
            <span>📖</span>
            <span>Study Manual</span>
          </button>
          <button
            onClick={onQuickPrep}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shadow-2xs"
            title="Review Quick-Prep Flash Facts"
          >
            <span>⚡</span>
            <span>Quick-Prep</span>
          </button>
          <button
            onClick={onQuickDrill}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700/60 hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shadow-2xs"
            title="Start Clinical Practice Drill"
          >
            <span>🎯</span>
            <span>Start Drill</span>
          </button>
        </div>
      </div>
    </div>
  );
}
