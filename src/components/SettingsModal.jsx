import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Keyboard, Check, Trash2, Eye, EyeOff } from 'lucide-react';
import { getStoredGeminiKey, saveStoredGeminiKey } from '../utils/geminiApi';

export default function SettingsModal({ isOpen, onClose, onSaveSuccess }) {
  const [apiKey, setApiKey] = useState(() => getStoredGeminiKey());
  const [showKey, setShowKey] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    saveStoredGeminiKey(apiKey);
    setSavedNotice(true);
    onSaveSuccess?.();
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    saveStoredGeminiKey('');
    setApiKey('');
    onSaveSuccess?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85dvh] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-white/8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">Studio Preferences & API</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure client-side integrations</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer touch-target"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5 min-h-0">
          {/* Gemini API Key section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <span>Google Gemini API Key</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                  Optional
                </span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                <span>Get free key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Enables the <strong className="text-zinc-800 dark:text-zinc-200">"Describe Scene (AI)"</strong> vision engine in Image-to-Voice studio. OCR text extraction remains 100% free and client-side without any key.
            </p>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 pr-20 shadow-inner"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Clear key"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Privacy Guarantee Banner */}
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/15 text-[11px] text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>100% Client-Side Privacy:</strong> Your API key is stored exclusively inside your browser's local storage. Requests travel directly to Google Generative Language APIs with no middleman server.
              </span>
            </div>
          </div>

          {/* Keyboard Shortcuts Section */}
          <div className="pt-2 border-t border-zinc-200 dark:border-white/8 space-y-2.5">
            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Studio Shortcuts</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/5">
                <span className="text-zinc-600 dark:text-zinc-400">Play / Pause</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-white/10">Space</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/5">
                <span className="text-zinc-600 dark:text-zinc-400">Stop Speech</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-white/10">Esc</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/5">
                <span className="text-zinc-600 dark:text-zinc-400">Speak Text</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-white/10">Ctrl+Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/5">
                <span className="text-zinc-600 dark:text-zinc-400">Paste Image</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-white/10">Ctrl+V</kbd>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-200 dark:border-white/8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              {savedNotice ? <Check className="w-3.5 h-3.5 text-white" /> : null}
              <span>{savedNotice ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
