import { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  List,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Check,
  HelpCircle,
  FileQuestion,
} from 'lucide-react';
import { studySessions } from '../data/learnContent';
import type { StudySessionContent, InTextQuestion, SAQuestion } from '../types';
import TTSButton from '../components/common/TTSButton';
import { useAppStore } from '../store/useAppStore';

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set([1]));

  // Active Practice Modal state
  const [activeModal, setActiveModal] = useState<{
    type: 'itq' | 'saq';
    session: StudySessionContent;
  } | null>(null);

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

  // Filter sessions by search query
  const filteredSessions = studySessions.filter((session) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      session.title.toLowerCase().includes(q) ||
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
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Elevated Sticky Search Bar */}
      <div className="sticky top-[3.75rem] md:top-[4.25rem] z-30 bg-app/90 backdrop-blur-md pt-1 sm:pt-2 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-slate-200/60 dark:border-slate-800/80 transition-all">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            className="search-input w-full pl-9 pr-9 py-2.5 text-sm rounded-xl"
            placeholder="Search concepts, teaching points, ITQs, SAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search study content"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* No Results */}
      {filteredSessions.length === 0 && (
        <div className="card p-8 text-center rounded-2xl">
          <Search size={32} className="mx-auto mb-3 text-slate-400" />
          <p className="text-sub font-medium">No matching content found for "{searchQuery}"</p>
        </div>
      )}

      {/* Study Session Cards */}
      <div className="space-y-5">
        {filteredSessions.map((session) => (
          <SessionCard
            key={session.sessionNumber}
            session={session}
            isExpanded={expandedSessions.has(session.sessionNumber)}
            onToggle={() => toggleSession(session.sessionNumber)}
            onOpenPractice={(type) => setActiveModal({ type, session })}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Interactive Practice Modal for ITQs & SAQs */}
      {activeModal && (
        <PracticeModal
          type={activeModal.type}
          session={activeModal.session}
          searchQuery={searchQuery}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────

/**
 * Splits body text into bite-sized, scannable teaching points.
 */
function formatToTeachingPoints(text: string): string[] {
  if (!text) return [];

  // Normalize numbered items like "1. ", "2. " to newlines
  const normalized = text
    .replace(/(?<!\d)(?<![A-Za-z])(\d+)\.\s+/g, '\n$1. ')
    .trim();

  const paragraphs = normalized.split(/\r?\n+/).map((p) => p.trim()).filter(Boolean);
  const points: string[] = [];

  for (const para of paragraphs) {
    if (/^\d+\.\s+/.test(para)) {
      points.push(para.replace(/^\d+\.\s+/, ''));
      continue;
    }

    // Split sentences if paragraph contains multiple statements
    const sentences = para
      .split(/(?<=[.?!])\s+(?=[A-Z])/g)
      .map((s) => s.trim())
      .filter(Boolean);

    if (sentences.length > 1) {
      points.push(...sentences);
    } else {
      points.push(para);
    }
  }

  return points.filter((p) => p.length > 0);
}

// ── Session Card Component ──────────────────────────────────────────

function SessionCard({
  session,
  isExpanded,
  onToggle,
  onOpenPractice,
  searchQuery,
}: {
  session: StudySessionContent;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenPractice: (type: 'itq' | 'saq') => void;
  searchQuery: string;
}) {
  const progress = useAppStore((s) => s.progress);
  const toggleSessionCompleted = useAppStore((s) => s.toggleSessionCompleted);

  const isStudied = (progress.completedSessions || []).includes(session.sessionNumber);

  const itqCount = session.inTextQuestions?.length || 0;
  const saqCount = session.saqs?.length || 0;

  return (
    <div
      className={`card overflow-hidden transition-all duration-200 border rounded-2xl ${
        isStudied
          ? 'border-emerald-500/40 dark:border-emerald-500/30'
          : 'border-slate-200 dark:border-slate-800'
      } hover:border-cyan-500 dark:hover:border-cyan-400 shadow-sm hover:shadow-md`}
    >
      {/* Header — always visible: ultra-minimalist 3 elements perfectly aligned */}
      <button
        onClick={onToggle}
        className={`flex w-full items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-all duration-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50 ${
          isExpanded ? 'bg-slate-100/50 dark:bg-slate-800/30' : ''
        }`}
        aria-expanded={isExpanded}
        aria-label={`Study Session ${session.sessionNumber}: ${session.title}`}
      >
        <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-4">
          {/* 1. Circular Session Number badge on the far left */}
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white shadow-sm transition-all ${
              isStudied
                ? 'bg-emerald-600 shadow-emerald-500/30'
                : 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-blue-500/20'
            }`}
          >
            {isStudied ? <Check size={18} className="stroke-[3]" /> : session.sessionNumber}
          </span>

          {/* 2. The Session Title */}
          <h3 className="text-base sm:text-lg font-bold text-main leading-snug break-words flex-1">
            {session.title}
          </h3>
        </div>

        {/* 3. The expand/collapse chevron icon on the far right */}
        <div className="shrink-0 p-1.5 rounded-xl text-slate-400 dark:text-slate-400 transition-colors">
          {isExpanded ? (
            <ChevronUp size={20} className="stroke-[2.5]" />
          ) : (
            <ChevronDown size={20} className="stroke-[2.5]" />
          )}
        </div>
      </button>

      {/* Content — collapsible */}
      {isExpanded && (
        <div className="border-t p-5 sm:p-6 space-y-6" style={{ borderColor: 'var(--color-border)' }}>
          {/* Core Content / Scannable Teaching Points */}
          {session.content && session.content.length > 0 && (
            <div className="space-y-4">
              {session.content.map((sec, idx) => {
                const points = formatToTeachingPoints(sec.body);
                return (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border text-sm card-glass"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200/50 dark:border-slate-800">
                      <h5 className="font-extrabold text-main text-sm sm:text-base">
                        <HighlightText text={sec.heading} query={searchQuery} />
                      </h5>
                      <TTSButton
                        id={`s${session.sessionNumber}-sec-${idx}`}
                        text={`${sec.heading}. ${sec.body}`}
                        label="Listen"
                        variant="compact"
                      />
                    </div>

                    {/* Scannable Bulleted Teaching Points */}
                    <div className="space-y-2.5">
                      {points.map((point, pIdx) => {
                        // Check if point has a colon title like "Symptoms experience: could occur..."
                        const colonIdx = point.indexOf(': ');
                        const hasPrefix = colonIdx > 0 && colonIdx < 35;

                        return (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                            <div className="flex-1">
                              {hasPrefix ? (
                                <>
                                  <strong className="text-main font-bold">
                                    <HighlightText
                                      text={point.slice(0, colonIdx + 1)}
                                      query={searchQuery}
                                    />
                                  </strong>{' '}
                                  <HighlightText
                                    text={point.slice(colonIdx + 2)}
                                    query={searchQuery}
                                  />
                                </>
                              ) : (
                                <HighlightText text={point} query={searchQuery} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Key Points */}
          <div>
            <h4 className="text-sm font-bold text-main flex items-center gap-2 mb-2">
              <Lightbulb size={16} className="text-amber-500" />
              <span>Key Points to Remember</span>
            </h4>
            <ul className="space-y-2">
              {session.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-sub">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
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
              <h4 className="text-sm font-bold text-main flex items-center gap-2 mb-2">
                <List size={16} className="text-purple-500" />
                <span>Models & Frameworks</span>
              </h4>
              <div className="space-y-3">
                {session.models.map((model) => (
                  <div
                    key={model.name}
                    className="rounded-xl p-4 border"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <h5 className="font-bold text-sm text-purple-600 dark:text-purple-400">
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
              <h4 className="text-sm font-bold text-main mb-2">Key Definitions</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {session.definitions.map((def) => (
                  <div
                    key={def.term}
                    className="rounded-xl p-3 border"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
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

          {/* ── Dedicated Action Zone Footer ──────────────────────── */}
          <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 bg-slate-100/60 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            {/* Mark as Studied Toggle Button */}
            <div>
              <button
                type="button"
                onClick={() => toggleSessionCompleted(session.sessionNumber)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  isStudied
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <CheckCircle2
                  size={16}
                  className={isStudied ? 'text-white' : 'text-slate-400'}
                />
                <span>{isStudied ? 'Session Studied ✓' : 'Mark as Studied'}</span>
              </button>
            </div>

            {/* Interactive Drill Modals Launchers */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {itqCount > 0 && (
                <button
                  type="button"
                  onClick={() => onOpenPractice('itq')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 hover:-translate-y-0.5 transition-all cursor-pointer shadow-2xs"
                >
                  <HelpCircle size={15} />
                  <span>Practice ITQs ({itqCount})</span>
                </button>
              )}

              {saqCount > 0 && (
                <button
                  type="button"
                  onClick={() => onOpenPractice('saq')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 hover:-translate-y-0.5 transition-all cursor-pointer shadow-2xs"
                >
                  <FileQuestion size={15} />
                  <span>Drill SAQs ({saqCount})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Interactive Practice Modal (ITQs & SAQs) ────────────────────────

function PracticeModal({
  type,
  session,
  searchQuery,
  onClose,
}: {
  type: 'itq' | 'saq';
  session: StudySessionContent;
  searchQuery: string;
  onClose: () => void;
}) {
  const [revealed, setRevealed] = useState<Record<string | number, boolean>>({});

  const toggleReveal = (key: string | number) => {
    setRevealed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isITQ = type === 'itq';
  const title = isITQ
    ? `Session ${session.sessionNumber}: In-Text Self-Check Questions`
    : `Session ${session.sessionNumber}: Self-Assessment Questions (SAQs)`;

  const itqs: InTextQuestion[] = session.inTextQuestions || [];
  const saqs: SAQuestion[] = session.saqs || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-card border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <span
              className={`p-2 rounded-xl text-white ${
                isITQ ? 'bg-indigo-600' : 'bg-amber-600'
              }`}
            >
              {isITQ ? <HelpCircle size={18} /> : <FileQuestion size={18} />}
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-main leading-tight">
                {title}
              </h3>
              <p className="text-xs text-sub mt-0.5">
                {isITQ
                  ? `${itqs.length} in-text question items from course manual`
                  : `${saqs.length} official short answer questions`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 text-sub hover:text-main transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Questions Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {isITQ ? (
            itqs.map((itq, idx) => {
              const isRevealed = !!revealed[idx];
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-semibold text-main flex-1">
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 mr-1.5">
                        Q{idx + 1}:
                      </span>
                      <HighlightText text={itq.question} query={searchQuery} />
                    </p>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <TTSButton
                        id={`modal-itq-${session.sessionNumber}-${idx}`}
                        text={`Question ${idx + 1}: ${itq.question}. ${
                          isRevealed ? `Answer: ${itq.answer}` : ''
                        }`}
                        variant="icon"
                        size={14}
                      />
                      <button
                        onClick={() => toggleReveal(idx)}
                        className="btn btn-secondary text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer font-bold"
                      >
                        {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                        <span>{isRevealed ? 'Hide' : 'Reveal'}</span>
                      </button>
                    </div>
                  </div>

                  {isRevealed && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm font-medium animate-fade-in flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-xl text-emerald-800 dark:text-emerald-300">
                      <strong className="font-extrabold shrink-0">Answer:</strong>
                      <span className="text-main font-normal">
                        <HighlightText text={itq.answer} query={searchQuery} />
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            saqs.map((saq) => {
              const isRevealed = !!revealed[saq.id];
              return (
                <div
                  key={saq.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="badge badge-warning text-[11px] font-bold mb-1.5">
                        SAQ {saq.id}
                      </span>
                      <p className="text-xs sm:text-sm font-extrabold text-main mt-1 leading-snug">
                        <HighlightText text={saq.question} query={searchQuery} />
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <TTSButton
                        id={`modal-saq-${session.sessionNumber}-${saq.id}`}
                        text={`Question ${saq.id}: ${saq.question}. ${
                          isRevealed ? `Model Answer: ${saq.answer}` : ''
                        }`}
                        variant="icon"
                        size={14}
                      />
                      <button
                        onClick={() => toggleReveal(saq.id)}
                        className="btn btn-secondary text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer font-bold"
                      >
                        {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                        <span>{isRevealed ? 'Hide' : 'Model Answer'}</span>
                      </button>
                    </div>
                  </div>

                  {isRevealed && (
                    <div className="mt-3.5 p-3.5 rounded-xl border border-amber-300/40 dark:border-amber-700/40 text-xs sm:text-sm leading-relaxed animate-fade-in bg-amber-50/60 dark:bg-amber-950/40 text-slate-800 dark:text-slate-200">
                      <strong className="text-amber-800 dark:text-amber-300 block mb-1 font-bold">
                        Official Model Answer:
                      </strong>
                      <HighlightText text={saq.answer} query={searchQuery} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-primary text-xs sm:text-sm font-extrabold px-5 py-2 rounded-xl"
          >
            Done Practicing
          </button>
        </div>
      </div>
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
