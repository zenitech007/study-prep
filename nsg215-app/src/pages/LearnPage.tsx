import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  List,
  GraduationCap,
  HelpCircle,
  FileQuestion,
  Eye,
  EyeOff,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { studySessions, courseInfo } from '../data/learnContent';
import type { StudySessionContent } from '../types';
import TTSButton from '../components/common/TTSButton';

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set([1]));

  const toggleSession = (num: number) => {
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(num)) {
        next.delete(num);
      } else {
        next.add(num);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSessions(new Set(studySessions.map((s) => s.sessionNumber)));
  };

  const collapseAll = () => {
    setExpandedSessions(new Set());
  };

  // Filter sessions by search query
  const filteredSessions = studySessions.filter((session) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      session.title.toLowerCase().includes(q) ||
      session.overview.toLowerCase().includes(q) ||
      session.introduction?.toLowerCase().includes(q) ||
      session.learningOutcomes?.some((lo) => lo.toLowerCase().includes(q)) ||
      session.content?.some(
        (c) => c.heading.toLowerCase().includes(q) || c.body.toLowerCase().includes(q)
      ) ||
      session.keyPoints.some((kp) => kp.toLowerCase().includes(q)) ||
      session.models?.some(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.components.some((c) => c.toLowerCase().includes(q))
      ) ||
      session.definitions?.some(
        (d) =>
          d.term.toLowerCase().includes(q) ||
          d.definition.toLowerCase().includes(q)
      ) ||
      session.inTextQuestions?.some(
        (itq) =>
          itq.question.toLowerCase().includes(q) ||
          itq.answer.toLowerCase().includes(q)
      ) ||
      session.saqs?.some(
        (saq) =>
          saq.question.toLowerCase().includes(q) ||
          saq.answer.toLowerCase().includes(q) ||
          saq.id.toLowerCase().includes(q)
      )
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-main flex items-center gap-2">
            <BookOpen size={24} style={{ color: 'var(--color-primary)' }} />
            Learn
          </h1>
          <p className="text-sm text-sub mt-1">
            Review all 8 study sessions from the official {courseInfo.code} course manual.
          </p>
        </div>
      </div>

      {/* Course Info Banner */}
      <div
        className="card p-5 border-l-4"
        style={{
          borderLeftColor: 'var(--color-primary)',
          backgroundColor: 'var(--color-bg-card)',
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <GraduationCap size={20} style={{ color: 'var(--color-primary)' }} />
            <h2 className="text-base font-bold text-main">
              {courseInfo.code} — {courseInfo.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-primary text-xs">{courseInfo.credits}</span>
            <span className="badge badge-accent text-xs">{courseInfo.level}</span>
          </div>
        </div>
        <p className="text-xs text-sub leading-relaxed">
          <strong className="text-main">Course Aim: </strong>
          {courseInfo.aim}
        </p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--color-text-muted)' }}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Search concepts, outcomes, ITQs, SAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search study content"
          />
        </div>
        <div className="flex gap-2">
          <button onClick={expandAll} className="btn btn-secondary text-xs px-3 py-1.5">
            Expand All
          </button>
          <button onClick={collapseAll} className="btn btn-secondary text-xs px-3 py-1.5">
            Collapse All
          </button>
        </div>
      </div>

      {/* No Results */}
      {filteredSessions.length === 0 && (
        <div className="card p-8 text-center">
          <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
          <p className="text-sub">No matching content found for "{searchQuery}"</p>
        </div>
      )}

      {/* Study Session Cards */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <SessionCard
            key={session.sessionNumber}
            session={session}
            isExpanded={expandedSessions.has(session.sessionNumber)}
            onToggle={() => toggleSession(session.sessionNumber)}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  isExpanded,
  onToggle,
  searchQuery,
}: {
  session: StudySessionContent;
  isExpanded: boolean;
  onToggle: () => void;
  searchQuery: string;
}) {
  const [revealedITQs, setRevealedITQs] = useState<Record<number, boolean>>({});
  const [revealedSAQs, setRevealedSAQs] = useState<Record<string, boolean>>({});

  const toggleITQ = (idx: number) => {
    setRevealedITQs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const [showFullContent, setShowFullContent] = useState(true);

  const toggleSAQ = (id: string) => {
    setRevealedSAQs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="card overflow-hidden animate-slide-up border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-200">
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors duration-200"
        style={{ backgroundColor: isExpanded ? 'var(--color-bg-secondary)' : undefined }}
        aria-expanded={isExpanded}
        aria-label={`Study Session ${session.sessionNumber}: ${session.title}`}
      >
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1 pr-3">
          {/* Circular number badge nicely aligned */}
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm mt-0.5 sm:mt-0"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {session.sessionNumber}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-main leading-snug break-words">{session.title}</h3>
            {/* Badges in flex-wrap container with gap-2, whitespace-nowrap, and soft legible styling */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/40">
                {session.sourceTag === 'slide' ? 'Core Material' : 'Extension'}
              </span>
              {session.learningOutcomes && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/40">
                  {session.learningOutcomes.length} Outcomes
                </span>
              )}
              {session.content && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/40">
                  {session.content.length} Sections
                </span>
              )}
              {session.saqs && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/40">
                  {session.saqs.length} SAQs
                </span>
              )}
              {session.inTextQuestions && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-700/40">
                  {session.inTextQuestions.length} ITQs
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Chevron icon pushed cleanly to the far right with ml-auto */}
        <div className="ml-auto shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          {isExpanded ? (
            <ChevronUp size={20} className="text-slate-400 dark:text-slate-400" />
          ) : (
            <ChevronDown size={20} className="text-slate-400 dark:text-slate-400" />
          )}
        </div>
      </button>

      {/* Content — collapsible */}
      {isExpanded && (
        <div className="border-t p-5 space-y-6" style={{ borderColor: 'var(--color-border)' }}>
          {/* Introduction & Overview */}
          <div className="space-y-3">
            {session.introduction && (
              <div
                className="p-3.5 rounded-lg border text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-semibold text-main text-xs sm:text-sm">Session Introduction:</span>
                  <TTSButton
                    id={`s${session.sessionNumber}-intro`}
                    text={session.introduction}
                    label="Listen"
                    variant="compact"
                  />
                </div>
                <p className="text-sub italic leading-relaxed">
                  "<HighlightText text={session.introduction} query={searchQuery} />"
                </p>
              </div>
            )}
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-sub leading-relaxed flex-1">
                <HighlightText text={session.overview} query={searchQuery} />
              </p>
              <TTSButton
                id={`s${session.sessionNumber}-overview`}
                text={session.overview}
                variant="icon"
                size={14}
              />
            </div>
          </div>

          {/* Learning Outcomes */}
          {session.learningOutcomes && session.learningOutcomes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-main flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                  Learning Outcomes
                </h4>
                <TTSButton
                  id={`s${session.sessionNumber}-outcomes`}
                  text={`Learning Outcomes: ${session.learningOutcomes.join('. ')}`}
                  label="Listen"
                  variant="compact"
                />
              </div>
              <ul className="space-y-1.5">
                {session.learningOutcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-sub p-2 rounded-md"
                    style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                  >
                    <span className="font-bold text-primary-color shrink-0">✓</span>
                    <span>
                      <HighlightText text={outcome} query={searchQuery} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reading Material / Content Sections */}
          {session.content && session.content.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-main flex items-center gap-2">
                  <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                  Course Manual Reading Material ({session.content.length} Sections)
                </h4>
                <button
                  onClick={() => setShowFullContent(!showFullContent)}
                  className="btn btn-secondary text-xs px-2.5 py-1"
                >
                  {showFullContent ? 'Collapse Reading' : 'Expand Reading'}
                </button>
              </div>
              {showFullContent && (
                <div className="space-y-3 mt-2">
                  {session.content.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg border text-sm"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h5 className="font-bold text-main text-sm">
                          <HighlightText text={sec.heading} query={searchQuery} />
                        </h5>
                        <TTSButton
                          id={`s${session.sessionNumber}-sec-${idx}`}
                          text={`${sec.heading}. ${sec.body}`}
                          label="Listen"
                          variant="compact"
                        />
                      </div>
                      <p className="text-sub text-xs leading-relaxed whitespace-pre-line">
                        <HighlightText text={sec.body} query={searchQuery} />
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Key Points */}
          <div>
            <h4 className="text-sm font-semibold text-main flex items-center gap-2 mb-2">
              <Lightbulb size={16} style={{ color: 'var(--color-warning)' }} />
              Key Points
            </h4>
            <ul className="space-y-2">
              {session.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm text-sub">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <span>
                    <HighlightText text={point} query={searchQuery} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          {session.models && session.models.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-main flex items-center gap-2 mb-2">
                <List size={16} style={{ color: 'var(--color-accent)' }} />
                Models & Frameworks
              </h4>
              <div className="space-y-3">
                {session.models.map((model) => (
                  <div
                    key={model.name}
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <h5 className="font-medium text-sm" style={{ color: 'var(--color-accent)' }}>
                      <HighlightText text={model.name} query={searchQuery} />
                    </h5>
                    <p className="text-xs text-sub mt-1 mb-2">
                      <HighlightText text={model.description} query={searchQuery} />
                    </p>
                    <ul className="space-y-1">
                      {model.components.map((comp, i) => (
                        <li key={i} className="text-xs text-sub flex gap-2">
                          <span className="text-muted">•</span>
                          <HighlightText text={comp} query={searchQuery} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Definitions */}
          {session.definitions && session.definitions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-main mb-2">Key Definitions</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {session.definitions.map((def) => (
                  <div
                    key={def.term}
                    className="rounded-lg p-3"
                    style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <HighlightText text={def.term} query={searchQuery} />
                    </span>
                    <p className="text-xs text-sub mt-1">
                      <HighlightText text={def.definition} query={searchQuery} />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* In-Text Questions (Self-Check) */}
          {session.inTextQuestions && session.inTextQuestions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-main flex items-center gap-2 mb-2">
                <HelpCircle size={16} style={{ color: 'var(--color-primary)' }} />
                In-Text Questions (Self-Check)
              </h4>
              <div className="space-y-2.5">
                {session.inTextQuestions.map((itq, idx) => {
                  const isRevealed = !!revealedITQs[idx];
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border transition-all"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-main flex-1">
                          <span className="font-bold text-primary-color mr-1">Q{idx + 1}:</span>
                          <HighlightText text={itq.question} query={searchQuery} />
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <TTSButton
                            id={`s${session.sessionNumber}-itq-${idx}`}
                            text={`In-Text Question ${idx + 1}: ${itq.question}. ${isRevealed ? `Answer: ${itq.answer}` : ''}`}
                            variant="icon"
                            size={13}
                          />
                          <button
                            onClick={() => toggleITQ(idx)}
                            className="btn btn-secondary text-xs px-2 py-1 shrink-0 flex items-center gap-1 cursor-pointer"
                          >
                            {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                            {isRevealed ? 'Hide' : 'Reveal'}
                          </button>
                        </div>
                      </div>
                      {isRevealed && (
                        <div
                          className="mt-2 pt-2 border-t text-xs font-semibold animate-fade-in flex items-center gap-1.5"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-success)',
                          }}
                        >
                          <span>Answer:</span>
                          <span className="text-main font-normal">
                            <HighlightText text={itq.answer} query={searchQuery} />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Self-Assessment Questions (SAQs) */}
          {session.saqs && session.saqs.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-main flex items-center gap-2 mb-2">
                <FileQuestion size={16} style={{ color: 'var(--color-warning)' }} />
                Self-Assessment Questions (Official Manual SAQs)
              </h4>
              <div className="space-y-3">
                {session.saqs.map((saq) => {
                  const isRevealed = !!revealedSAQs[saq.id];
                  return (
                    <div
                      key={saq.id}
                      className="p-3.5 rounded-lg border"
                      style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <span className="badge badge-warning text-[10px] mb-1">
                            SAQ {saq.id}
                          </span>
                          <p className="text-xs font-semibold text-main mt-0.5">
                            <HighlightText text={saq.question} query={searchQuery} />
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <TTSButton
                            id={`s${session.sessionNumber}-saq-${saq.id}`}
                            text={`Short Answer Question ${saq.id}: ${saq.question}. ${isRevealed ? `Model Answer: ${saq.answer}` : ''}`}
                            variant="icon"
                            size={14}
                          />
                          <button
                            onClick={() => toggleSAQ(saq.id)}
                            className="btn btn-secondary text-xs px-2.5 py-1 shrink-0 flex items-center gap-1 cursor-pointer"
                          >
                            {isRevealed ? <EyeOff size={12} /> : <Eye size={12} />}
                            {isRevealed ? 'Hide Model Answer' : 'Model Answer'}
                          </button>
                        </div>
                      </div>
                      {isRevealed && (
                        <div
                          className="mt-3 p-2.5 rounded-md border text-xs text-sub leading-relaxed animate-fade-in"
                          style={{
                            backgroundColor: 'var(--color-bg-secondary)',
                            borderColor: 'var(--color-border)',
                          }}
                        >
                          <strong className="text-main block mb-1">Official Model Answer:</strong>
                          <HighlightText text={saq.answer} query={searchQuery} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Highlights search query matches within text.
 */
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="rounded px-0.5"
            style={{
              backgroundColor: 'var(--color-warning-light)',
              color: 'var(--color-warning)',
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
