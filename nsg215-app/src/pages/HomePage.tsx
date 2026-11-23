import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, Clock, Lock } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { storage } from '../store/storage';
import { getAllCourses } from '../data/courses';
import type { Course } from '../data/courses';

export default function HomePage() {
  const navigate = useNavigate();
  const setCurrentCourse = useAppStore((s) => s.setCurrentCourse);
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
            StudyPrep Hub
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
          {courses.map((course) => {
            const courseProgress = storage.getProgress(course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={() => { setCurrentCourse(course.id); navigate(course.route); }}
                onQuickDrill={() => { setCurrentCourse(course.id); navigate(`/course/${course.id}/drill`); }}
                onQuickLearn={() => { setCurrentCourse(course.id); navigate(`/course/${course.id}/learn`); }}
                onQuickPrep={() => { setCurrentCourse(course.id); navigate(`/course/${course.id}/concepts`); }}
                readiness={courseProgress.preparedness}
                accuracy={courseProgress.accuracy}
                attemptedCount={courseProgress.totalAttempted}
                isLoaded={questionsLoaded}
              />
            );
          })}
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
  const isEmerald = course.accentColor === 'emerald';
  const isAmber = course.accentColor === 'amber';
  const isRose = course.accentColor === 'rose';
  const isTeal = course.accentColor === 'teal' || course.accentToken === 'teal';
  const isFuchsia = course.accentColor === 'fuchsia' || course.accentToken === 'fuchsia';
  const isIndigo = course.accentColor === 'indigo' || course.accentToken === 'indigo';
  const isViolet = course.accentColor === 'violet' || course.accentToken === 'violet';
  const isSky = course.accentColor === 'sky' || course.accentToken === 'sky';
  const isOrange = course.accentColor === 'orange' || course.accentToken === 'orange';
  const isCyan = course.accentColor === 'cyan' || course.accentToken === 'cyan';
  const isPurple = course.accentColor === 'purple' || course.accentToken === 'purple';

  if (course.status === 'locked') {
    return (
      <div className="card-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 opacity-80 shadow-md">
        {/* Top row: Badges, Title & Disabled Action */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              <Lock size={24} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-black text-main">{course.code}</span>
                <span className="text-xs font-bold text-sub">• {course.credits}</span>
                <span className="text-xs font-semibold text-muted">({course.level})</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
                  <Lock size={12} className="shrink-0" aria-hidden="true" />
                  <span>Last Semester</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-main mt-1 tracking-tight">
                {course.title}
              </h3>
            </div>
          </div>

          {/* Disabled CTA Button: >=44px height, disabled, aria-disabled */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-bold bg-slate-200/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700/60 cursor-not-allowed opacity-75 shrink-0 self-start sm:self-center"
          >
            <Lock size={16} aria-hidden="true" />
            <span>Locked</span>
          </button>
        </div>

        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl mb-2 font-normal">
          {course.description}
        </p>

        {/* Minimalist 3-Metric Row */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 my-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 backdrop-blur-sm">
            <span className="text-sm">📝</span>
            <span>{course.questionCount} Questions</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 backdrop-blur-sm">
            <span className="text-sm">🧠</span>
            <span>Spaced Repetition</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/70 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 backdrop-blur-sm">
            <span className="text-sm">📚</span>
            <span>{course.sessionCount} Sessions</span>
          </div>
        </div>

        {/* Informative Lock Notice */}
        <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
          <Lock size={14} className="shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
          <span>This course is archived from a previous semester. Questions and modules are preserved for past records.</span>
        </div>
      </div>
    );
  }

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

  // Accent styles based on course accentColor
  const badgeGradient = isRose ? 'bg-rose-700 dark:bg-rose-400 text-white dark:text-slate-950'
    : isAmber ? 'bg-amber-700 dark:bg-amber-500 text-white dark:text-slate-950'
    : isTeal ? 'bg-teal-700 dark:bg-teal-400 text-white dark:text-slate-950 shadow-md shadow-teal-500/25'
    : isFuchsia ? 'bg-fuchsia-700 dark:bg-fuchsia-400 text-white dark:text-slate-950 shadow-md shadow-fuchsia-500/25'
    : isIndigo ? 'bg-indigo-700 dark:bg-indigo-400 text-white dark:text-slate-950 shadow-md shadow-indigo-500/25'
    : isViolet ? 'bg-violet-700 dark:bg-violet-400 text-white dark:text-slate-950 shadow-md shadow-violet-500/25'
    : isSky ? 'bg-sky-700 dark:bg-sky-400 text-white dark:text-slate-950 shadow-md shadow-sky-500/25'
    : isOrange ? 'bg-orange-700 dark:bg-orange-400 text-white dark:text-slate-950 shadow-md shadow-orange-500/25'
    : isCyan ? 'bg-cyan-700 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-md shadow-cyan-500/25'
    : isPurple ? 'bg-purple-700 dark:bg-purple-400 text-white dark:text-slate-950 shadow-md shadow-purple-500/25'
    : isEmerald
    ? 'bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25'
    : 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25';

  const cardBorderHover = isRose ? 'hover:border-rose-700 dark:hover:border-rose-400'
    : isAmber ? 'hover:border-amber-700 dark:hover:border-amber-400'
    : isTeal ? 'hover:border-teal-700 dark:hover:border-teal-400'
    : isFuchsia ? 'hover:border-fuchsia-700 dark:hover:border-fuchsia-400'
    : isIndigo ? 'hover:border-indigo-700 dark:hover:border-indigo-400'
    : isViolet ? 'hover:border-violet-700 dark:hover:border-violet-400'
    : isSky ? 'hover:border-sky-700 dark:hover:border-sky-400'
    : isOrange ? 'hover:border-orange-700 dark:hover:border-orange-400'
    : isCyan ? 'hover:border-cyan-700 dark:hover:border-cyan-400'
    : isPurple ? 'hover:border-purple-700 dark:hover:border-purple-400'
    : isEmerald
    ? 'hover:border-emerald-500/40 dark:hover:border-emerald-400/40'
    : 'hover:border-cyan-500/40 dark:hover:border-cyan-400/40';

  const enterButtonClass = isRose ? 'bg-rose-700 hover:bg-rose-800 text-white dark:bg-rose-400 dark:hover:bg-rose-300 dark:text-slate-950'
    : isAmber ? 'bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950'
    : isTeal ? 'bg-teal-700 hover:bg-teal-800 text-white dark:bg-teal-400 dark:hover:bg-teal-300 dark:text-slate-950 shadow-md shadow-teal-700/20 hover:shadow-lg hover:shadow-teal-700/35'
    : isFuchsia ? 'bg-fuchsia-700 hover:bg-fuchsia-800 text-white dark:bg-fuchsia-400 dark:hover:bg-fuchsia-300 dark:text-slate-950 shadow-md shadow-fuchsia-700/20 hover:shadow-lg hover:shadow-fuchsia-700/35'
    : isIndigo ? 'bg-indigo-700 hover:bg-indigo-800 text-white dark:bg-indigo-400 dark:hover:bg-indigo-300 dark:text-slate-950 shadow-md shadow-indigo-700/20 hover:shadow-lg hover:shadow-indigo-700/35'
    : isViolet ? 'bg-violet-700 hover:bg-violet-800 text-white dark:bg-violet-400 dark:hover:bg-violet-300 dark:text-slate-950 shadow-md shadow-violet-700/20 hover:shadow-lg hover:shadow-violet-700/35'
    : isSky ? 'bg-sky-700 hover:bg-sky-800 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-slate-950 shadow-md shadow-sky-700/20 hover:shadow-lg hover:shadow-sky-700/35'
    : isOrange ? 'bg-orange-700 hover:bg-orange-800 text-white dark:bg-orange-400 dark:hover:bg-orange-300 dark:text-slate-950 shadow-md shadow-orange-700/20 hover:shadow-lg hover:shadow-orange-700/35'
    : isCyan ? 'bg-cyan-700 hover:bg-cyan-800 text-white dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 shadow-md shadow-cyan-700/20 hover:shadow-lg hover:shadow-cyan-700/35'
    : isPurple ? 'bg-purple-700 hover:bg-purple-800 text-white dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-slate-950 shadow-md shadow-purple-700/20 hover:shadow-lg hover:shadow-purple-700/35'
    : isEmerald
    ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-400/20 hover:shadow-lg hover:shadow-emerald-400/35'
    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-400/20 hover:shadow-lg hover:shadow-cyan-400/35';

  const enterButtonRing = isRose ? 'focus-visible:ring-rose-700 dark:focus-visible:ring-rose-300'
    : isAmber ? 'focus-visible:ring-amber-700 dark:focus-visible:ring-amber-300'
    : isTeal ? 'focus-visible:ring-teal-700 dark:focus-visible:ring-teal-300'
    : isFuchsia ? 'focus-visible:ring-fuchsia-700 dark:focus-visible:ring-fuchsia-300'
    : isIndigo ? 'focus-visible:ring-indigo-700 dark:focus-visible:ring-indigo-300'
    : isViolet ? 'focus-visible:ring-violet-700 dark:focus-visible:ring-violet-300'
    : isSky ? 'focus-visible:ring-sky-700 dark:focus-visible:ring-sky-300'
    : isOrange ? 'focus-visible:ring-orange-700 dark:focus-visible:ring-orange-300'
    : isCyan ? 'focus-visible:ring-cyan-700 dark:focus-visible:ring-cyan-300'
    : isPurple ? 'focus-visible:ring-purple-700 dark:focus-visible:ring-purple-300'
    : 'focus-visible:ring-cyan-600 dark:focus-visible:ring-cyan-300';

  const readinessTextColor = isRose ? 'text-rose-700 dark:text-rose-300'
    : isAmber ? 'text-amber-800 dark:text-amber-300'
    : isTeal ? 'text-teal-700 dark:text-teal-300'
    : isFuchsia ? 'text-fuchsia-700 dark:text-fuchsia-300'
    : isIndigo ? 'text-indigo-700 dark:text-indigo-300'
    : isViolet ? 'text-violet-700 dark:text-violet-300'
    : isSky ? 'text-sky-700 dark:text-sky-300'
    : isOrange ? 'text-orange-700 dark:text-orange-300'
    : isCyan ? 'text-cyan-800 dark:text-cyan-300'
    : isPurple ? 'text-purple-700 dark:text-purple-300'
    : isEmerald
    ? 'text-emerald-600 dark:text-emerald-400'
    : 'text-cyan-600 dark:text-cyan-400';

  const progressBarGradient = isRose ? 'bg-rose-600 dark:bg-rose-400'
    : isAmber ? 'bg-amber-500'
    : isTeal ? 'bg-teal-600 dark:bg-teal-400'
    : isFuchsia ? 'bg-fuchsia-600 dark:bg-fuchsia-400'
    : isIndigo ? 'bg-indigo-600 dark:bg-indigo-400'
    : isViolet ? 'bg-violet-600 dark:bg-violet-400'
    : isSky ? 'bg-sky-600 dark:bg-sky-400'
    : isOrange ? 'bg-orange-600 dark:bg-orange-400'
    : isCyan ? 'bg-cyan-600 dark:bg-cyan-400'
    : isPurple ? 'bg-purple-600 dark:bg-purple-400'
    : isEmerald
    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
    : 'bg-gradient-to-r from-blue-500 to-cyan-400';

  const drillButtonClass = isRose ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-700'
    : isAmber ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
    : isTeal ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 border-teal-300 dark:border-teal-700'
    : isFuchsia ? 'bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-900 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-700'
    : isIndigo ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700'
    : isViolet ? 'bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200 border-violet-300 dark:border-violet-700'
    : isSky ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-700'
    : isOrange ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700'
    : isCyan ? 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700'
    : isPurple ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700'
    : isEmerald
    ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-700/60'
    : 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-700/60';

  const moduleMetricText = course.id.startsWith('ana') || course.id === 'gce204' || course.id === 'nsg222' || course.id === 'nsg223' || course.id === 'nsg225' || course.id === 'nsg229' || course.id === 'nsg232' || course.id === 'pio206' || course.id === 'psy205' || course.id === 'psm201' ? `${course.sessionCount} Modules` : `${course.sessionCount} Sessions`;

  return (
    <div className={`card-glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl dark:shadow-black/60 ${cardBorderHover} transition-all duration-300`}>
      {/* Top row: Badges, Title & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3.5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shrink-0 ${badgeGradient}`}>
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
          className={`inline-flex min-h-11 items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm sm:text-base font-extrabold ${enterButtonClass} focus-visible:outline-none focus-visible:ring-4 ${enterButtonRing} hover:-translate-y-1 active:translate-y-0 motion-reduce:transform-none transition-all duration-200 cursor-pointer shrink-0 self-start sm:self-center`}
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
          <span>{course.questionCount} Questions</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-2xs">
          <span className="text-sm">🧠</span>
          <span>Spaced Repetition</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-2xs">
          <span className="text-sm">📚</span>
          <span>{moduleMetricText}</span>
        </div>
      </div>

      {/* Active Course Progress Bar & Fast Actions */}
      <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-main flex items-center gap-1.5">
              <span>🎯</span> Exam Readiness
            </span>
            <span className={`${readinessTextColor} font-extrabold text-sm`}>{readiness}%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-700/50">
            <div
              className={`h-full rounded-full ${progressBarGradient} transition-all duration-500`}
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold ${drillButtonClass} hover:-translate-y-0.5 transition-all duration-150 cursor-pointer shadow-2xs`}
            title="Start Practice Drill"
          >
            <span>🎯</span>
            <span>Start Drill</span>
          </button>
        </div>
      </div>
    </div>
  );
}
