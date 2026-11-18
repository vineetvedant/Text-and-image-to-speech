import React from 'react';
import { X, Play, Clock, Copy, Trash2, ArrowRight, Check, History } from 'lucide-react';

export default function HistoryDrawer({
  isOpen,
  onClose,
  history = [],
  onLoadItem,
  onPlayItem,
  onDeleteItem,
  onClearAll
}) {
  const [copiedId, setCopiedId] = React.useState(null);

  if (!isOpen) return null;

  const handleCopy = (id, text) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.warn('Clipboard write error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#121215] border-l border-zinc-200 dark:border-white/10 h-[100dvh] flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">Script History</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Recent vocal scripts & synthesized audio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-zinc-400 dark:text-zinc-500">
              <History className="w-10 h-10 mb-2 stroke-[1.5] text-zinc-300 dark:text-zinc-600" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">No script history yet</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">Generated voice scripts will automatically be saved here.</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="group relative bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 rounded-xl p-3.5 transition-all shadow-sm"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {item.voiceName && (
                      <span className="text-indigo-600 dark:text-indigo-400 truncate max-w-[140px]">• {item.voiceName}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.text)}
                      className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                      title="Copy script"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-zinc-400 dark:text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-700 dark:text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                  {item.text}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-white/5 text-[11px] font-mono">
                  <span className="text-zinc-500">
                    {item.charCount || item.text.length} chars • {item.wordCount || item.text.split(/\s+/).length} words
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onPlayItem(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 transition-colors cursor-pointer font-medium"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onLoadItem(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-200/60 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-white/5 transition-colors cursor-pointer font-medium"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-[#0f0f13] flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono">
              {history.length} saved {history.length === 1 ? 'script' : 'scripts'}
            </span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
