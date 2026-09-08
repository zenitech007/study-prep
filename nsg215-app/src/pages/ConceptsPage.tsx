import { useState, useRef } from 'react';
import { Search, Brain, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { conceptItems } from '../data/learnContent';
import TTSButton from '../components/common/TTSButton';

export default function ConceptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(conceptItems.map((c) => c.category))
  );
  const printRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  // Filter concepts by search
  const filteredConcepts = conceptItems
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.term.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          category.category.toLowerCase().includes(q)
        );
      }),
    }))
    .filter((c) => c.items.length > 0);

  const handlePrint = () => {
    window.print();
  };

  // Group by session number
  const groupedBySession = filteredConcepts.reduce<Record<number, typeof filteredConcepts>>(
    (acc, item) => {
      if (!acc[item.sessionNumber]) acc[item.sessionNumber] = [];
      acc[item.sessionNumber].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-main flex items-center gap-2">
            <Brain size={24} style={{ color: 'var(--color-accent)' }} />
            Quick-Prep <span className="text-base font-medium text-sub">(Core Facts & Cheat Sheet)</span>
          </h1>
          <p className="text-sm text-sub mt-1">
            High-yield memory cards, clinical models, and exam definitions to memorize fast.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn btn-secondary text-xs no-print"
          aria-label="Print cheat sheet"
        >
          <Printer size={14} />
          <span className="hidden sm:inline">Cheat Sheet</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative no-print">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Search terms, definitions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search concepts"
        />
      </div>

      {/* No Results */}
      {filteredConcepts.length === 0 && (
        <div className="card p-8 text-center">
          <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--color-text-muted)' }} />
          <p className="text-sub">No matching concepts found.</p>
        </div>
      )}

      {/* Content */}
      <div className="space-y-6" ref={printRef}>
        {Object.entries(groupedBySession)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([sessionNum, categories]) => (
            <div key={sessionNum}>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {sessionNum}
                </span>
                Study Session {sessionNum}
              </h2>

              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.category} className="card overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors duration-200">
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="flex w-full items-center justify-between p-4 text-left cursor-pointer transition-colors"
                      aria-expanded={expandedCategories.has(category.category)}
                    >
                      <h3 className="text-sm font-semibold pr-3" style={{ color: 'var(--color-accent)' }}>
                        {category.category}
                      </h3>
                      <div className="ml-auto flex items-center gap-2 shrink-0">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/40">
                          {category.items.length} items
                        </span>
                        {expandedCategories.has(category.category) ? (
                          <ChevronUp size={16} className="text-slate-400 dark:text-slate-400" />
                        ) : (
                          <ChevronDown size={16} className="text-slate-400 dark:text-slate-400" />
                        )}
                      </div>
                    </button>

                    {expandedCategories.has(category.category) && (
                      <div
                        className="border-t px-4 pb-4"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                          {category.items.map((item) => (
                            <div key={item.term} className="py-3 flex items-start gap-4">
                              <div className="w-1/3 sm:w-1/4 shrink-0">
                                <span
                                  className="text-sm font-semibold"
                                  style={{ color: 'var(--color-primary)' }}
                                >
                                  {item.term}
                                </span>
                              </div>
                              <div className="flex-1 flex items-start justify-between gap-2">
                                <span className="text-sm text-sub">{item.definition}</span>
                                <TTSButton
                                  id={`concept-${item.term.replace(/\s+/g, '-').toLowerCase()}`}
                                  text={`${item.term}: ${item.definition}`}
                                  variant="icon"
                                  size={14}
                                  className="no-print shrink-0 mt-0.5"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
