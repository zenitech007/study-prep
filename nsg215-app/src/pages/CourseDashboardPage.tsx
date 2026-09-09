import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BookOpen, Target, Brain, TrendingUp, AlertTriangle, Zap, Award, RotateCcw, Sparkles, ArrowLeft } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { getDueSRSQuestions } from '../utils/srs';
import { getCourse, COURSES } from '../data/courses';

export default function CourseDashboardPage() {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const questions = useAppStore((s) => s.questions);
  const progress = useAppStore((s) => s.progress);
  const questionsLoaded = useAppStore((s) => s.questionsLoaded);
  const setCurrentCourse = useAppStore((s) => s.setCurrentCourse);

  const course = getCourse(courseId || 'nsg215') || COURSES[0];
  const isAvailable = course.status === 'active';

  // Sync active course on load
  useEffect(() => {
    if (course && course.id) {
      setCurrentCourse(course.id);
    }
  }, [course, setCurrentCourse]);

  const dueSRSQuestions = getDueSRSQuestions(questions, progress.questionHistory);

  // Find the weakest topics (lowest accuracy with at least some attempts)
  const weakTopics = [...progress.topicStats]
    .filter((t) => t.attempted > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  if (!questionsLoaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Brain className="mx-auto mb-4 animate-pulse-soft" size={48} style={{ color: 'var(--color-primary)' }} />
          <p className="text-lg font-medium text-sub">Loading course materials...</p>
        </div>
      </div>
    );
  }

  if (!isAvailable) {
    return (
      <div className="card p-8 text-center max-w-xl mx-auto my-12 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto mb-4 font-bold text-lg">
          {course.code.split(' ')[1]}
        </div>
        <h2 className="text-2xl font-bold text-main mb-2">{course.code} – {course.title}</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 mb-4">
          Module In Preparation (Coming Soon)
        </span>
        <p className="text-sm text-sub mb-6 leading-relaxed">
          {course.description} Course syllabus and question bank are currently being digitized according to the University of Ibadan curriculum.
        </p>
        <Link to="/" className="btn btn-primary inline-flex items-center gap-2 text-sm">
          <ArrowLeft size={16} />
          Back to Course Library
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sub hover:text-main transition-colors p-1 rounded-lg hover:bg-card-hover"
        >
          <ArrowLeft size={14} />
          <span>Course Library</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="badge badge-primary text-xs">{course.credits}</span>
          <span className="badge badge-accent text-xs">{course.level}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
          <Sparkles size={14} />
          <span>{course.department}</span>
        </div>
        <h1 className="text-3xl font-extrabold text-main mb-2">
          {course.code} — {course.title}
        </h1>
        <p className="text-base text-sub max-w-xl mx-auto leading-relaxed">
          {course.aim}
        </p>
      </section>

      {/* Spaced Repetition Due Reminder */}
      {dueSRSQuestions.length > 0 && (
        <div
          className="p-4 rounded-xl flex items-center justify-between gap-4 card"
          style={{
            backgroundColor: 'var(--color-accent-light)',
            borderColor: 'var(--color-accent)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/50">
              <RotateCcw size={22} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-main">
                {dueSRSQuestions.length} Question{dueSRSQuestions.length === 1 ? '' : 's'} Due for Spaced Review!
              </h3>
              <p className="text-xs text-sub mt-0.5">
                Keep your memory sharp! Review items scheduled for today before memory decay sets in.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/course/${course.id}/drill`)}
            className="btn text-xs font-semibold shrink-0 py-2 px-3 text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Review Now
          </button>
        </div>
      )}

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
            {questions.length}
          </div>
          <div className="text-xs text-muted mt-1">Questions</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
            {course.sessionCount}
          </div>
          <div className="text-xs text-muted mt-1">{course.id === 'ana213' ? 'Modules' : 'Study Sessions'}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>
            {progress.accuracy}%
          </div>
          <div className="text-xs text-muted mt-1">Accuracy</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>
            {progress.preparedness}%
          </div>
          <div className="text-xs text-muted mt-1">Readiness</div>
        </div>
      </section>

      {/* CTA Drill & Learn Buttons */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <button
          onClick={() => navigate(`/course/${course.id}/learn`)}
          className="card p-5 text-left transition-all hover:scale-[1.02] cursor-pointer"
          style={{ borderLeft: course.accentColor === 'emerald' ? '4px solid #10b981' : '4px solid var(--color-primary)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={22} className={course.accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500'} />
            <h3 className="text-base font-semibold text-main">Study Manual</h3>
          </div>
          <p className="text-xs text-sub leading-relaxed">
            Read all {course.sessionCount} {course.id === 'ana213' ? 'modules' : 'sessions'} with learning outcomes, section summaries, ITQs, and official SAQs.
          </p>
        </button>

        <button
          onClick={() => navigate(`/course/${course.id}/concepts`)}
          className="card p-5 text-left transition-all hover:scale-[1.02] cursor-pointer"
          style={{ borderLeft: '4px solid var(--color-accent)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Brain size={22} style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-base font-semibold text-main">Quick-Prep Notes</h3>
          </div>
          <p className="text-xs text-sub leading-relaxed">
            High-yield memory cards, clinical models, and exam cheat sheets to memorize rapidly.
          </p>
        </button>

        <button
          onClick={() => navigate(`/course/${course.id}/drill`)}
          className="card p-5 text-left transition-all hover:scale-[1.02] cursor-pointer"
          style={{ borderLeft: '4px solid var(--color-success)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Target size={22} style={{ color: 'var(--color-success)' }} />
            <h3 className="text-base font-semibold text-main">Start Drilling</h3>
          </div>
          <p className="text-xs text-sub leading-relaxed">
            Drill clinical vignettes with instant rationale feedback and SuperMemo spaced repetition.
          </p>
        </button>
      </section>

      {/* Streak / Recent Activity */}
      {progress.sessionCount > 0 && (
        <section className="card p-5">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            Your Performance Record
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award size={16} style={{ color: 'var(--color-warning)' }} />
                <span className="text-xl font-bold text-main">{progress.sessionCount}</span>
              </div>
              <div className="text-xs text-muted">Quizzes Taken</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={16} style={{ color: 'var(--color-warning)' }} />
                <span className="text-xl font-bold text-main">{progress.currentStreak}</span>
              </div>
              <div className="text-xs text-muted">Current Streak</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target size={16} style={{ color: 'var(--color-success)' }} />
                <span className="text-xl font-bold text-main">{progress.totalAttempted}</span>
              </div>
              <div className="text-xs text-muted">Questions Answered</div>
            </div>
          </div>
        </section>
      )}

      {/* Danger Zones — Weak Topics */}
      {weakTopics.length > 0 && (
        <section className="card p-5">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3 flex items-center gap-2">
            <AlertTriangle size={16} style={{ color: 'var(--color-danger)' }} />
            High-Yield Danger Zones
          </h3>
          <p className="text-xs text-sub mb-3">
            These topics need the most attention. Consider a focused drill session!
          </p>
          <div className="space-y-3">
            {weakTopics.map((topic) => (
              <div key={topic.topic} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-main truncate">{topic.topic}</p>
                  <div className="progress-bar mt-1">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${topic.accuracy}%`,
                        backgroundColor:
                          topic.accuracy < 50
                            ? 'var(--color-danger)'
                            : topic.accuracy < 80
                            ? 'var(--color-warning)'
                            : 'var(--color-success)',
                      }}
                    />
                  </div>
                </div>
                <span
                  className="ml-3 text-sm font-semibold"
                  style={{
                    color:
                      topic.accuracy < 50
                        ? 'var(--color-danger)'
                        : topic.accuracy < 80
                        ? 'var(--color-warning)'
                        : 'var(--color-success)',
                  }}
                >
                  {topic.accuracy}%
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate(`/course/${course.id}/drill`)}
            className="btn btn-primary mt-4 w-full text-sm"
          >
            <Target size={16} />
            Drill Weak Topics
          </button>
        </section>
      )}

      {/* First-time user encouragement */}
      {progress.sessionCount === 0 && (
        <section className="card p-5 text-center" style={{ borderColor: 'var(--color-primary)', borderWidth: '1px', borderStyle: 'dashed' }}>
          <Brain size={32} className="mx-auto mb-2" style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-lg font-semibold text-main mb-1">Ready to start studying?</h3>
          <p className="text-sm text-sub mb-4">
            Start with a quick 10-question practice drill or review the official study session manual.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button onClick={() => navigate(`/course/${course.id}/learn`)} className="btn btn-secondary text-sm">
              <BookOpen size={16} />
              Open Manual
            </button>
            <button onClick={() => navigate(`/course/${course.id}/drill`)} className="btn btn-primary text-sm">
              <Target size={16} />
              Quick Drill
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
