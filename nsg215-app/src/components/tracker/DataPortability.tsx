import { useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Download, Upload, Trash2, AlertTriangle, FileJson, CheckCircle, X } from 'lucide-react';

export default function DataPortability() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentCourseId = useAppStore((s) => s.currentCourseId || 'nsg215');
  const exportProgress = useAppStore((s) => s.exportProgress);
  const importProgress = useAppStore((s) => s.importProgress);
  const resetProgress = useAppStore((s) => s.resetProgress);
  const [showModal, setShowModal] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleExport = () => {
    const data = exportProgress(currentCourseId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCourseId}-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = event.target?.result as string;
      const success = importProgress(json, currentCourseId);
      setImportStatus(success ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 3000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const confirmReset = () => {
    resetProgress(currentCourseId);
    setShowModal(false);
    setResetSuccessMessage(true);
    setTimeout(() => setResetSuccessMessage(false), 4000);
  };

  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <FileJson size={20} style={{ color: 'var(--color-primary)' }} />
        <h2 className="text-lg font-semibold text-main">Data Management & Progression</h2>
      </div>

      <p className="text-sm text-sub mb-4 flex items-start gap-1.5 leading-relaxed">
        <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--color-warning)' }} />
        All your statistics, bookmarks, and spaced-repetition schedules are saved 100% locally in your device's browser. No cloud account or internet connection is required to pick up where you stopped.
      </p>

      <div className="flex flex-wrap gap-3 mb-2">
        <button onClick={handleExport} className="btn btn-primary text-sm inline-flex items-center gap-1.5 cursor-pointer">
          <Download size={16} />
          Export Progress
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
          aria-label="Import progress file"
        />
        <button onClick={() => fileInputRef.current?.click()} className="btn btn-secondary text-sm inline-flex items-center gap-1.5 cursor-pointer">
          <Upload size={16} />
          Import Progress
        </button>
      </div>

      {importStatus === 'success' && (
        <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-success)' }}>
          ✓ Progress imported successfully!
        </p>
      )}
      {importStatus === 'error' && (
        <p className="text-sm mt-2 font-medium" style={{ color: 'var(--color-danger)' }}>
          ✗ Failed to import. Check the file format.
        </p>
      )}

      {resetSuccessMessage && (
        <div className="mt-3 p-3 rounded-lg flex items-center gap-2 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200/50 text-xs font-semibold animate-fade-in">
          <CheckCircle size={16} />
          <span>Progress for NSG 215 has been completely reset to zero.</span>
        </div>
      )}

      {/* Danger Zone */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <h3 className="text-sm font-semibold text-main mb-1">Danger Zone</h3>
        <p className="text-xs text-sub mb-3">
          Resetting will permanently clear all course statistics, SRS review schedules, bookmarks, and quiz attempts for NSG 215.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="btn text-xs font-semibold py-2 px-3 inline-flex items-center gap-1.5 cursor-pointer"
          style={{ color: 'var(--color-danger)', border: '1px solid var(--color-danger)' }}
        >
          <Trash2 size={14} />
          Reset NSG 215 Progress
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="card max-w-md w-full p-6 shadow-xl border border-red-300 dark:border-red-900 animate-slide-up"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-modal-title"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h3 id="reset-modal-title" className="text-lg font-bold text-main">
                    Reset Course Progress?
                  </h3>
                  <p className="text-xs text-sub">NSG 215 – Human Behavior and Illness</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-sub hover:text-main p-1 rounded-lg hover:bg-card-hover"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-sm text-sub space-y-2 mb-6 leading-relaxed">
              <p>
                Are you sure you want to reset your progress? This will permanently erase:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted">
                <li>All answered quiz history and accuracy records</li>
                <li>Spaced Repetition (Anki) memory review dates</li>
                <li>Current streaks and session completion counts</li>
                <li>All bookmarked and missed question lists</li>
              </ul>
              <p className="text-xs font-semibold text-red-600 dark:text-red-400 pt-1">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary text-xs px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="btn btn-danger text-xs px-4 py-2 inline-flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                <Trash2 size={14} />
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
