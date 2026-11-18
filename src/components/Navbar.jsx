import React from 'react';
import { Type, Image as ImageIcon, History, Settings, Sun, Moon, Volume2 } from 'lucide-react';

export default function Navbar({
  activeMode,
  onChangeMode,
  onOpenHistory,
  historyCount = 0,
  onOpenSettings,
  hasGeminiKey = false,
  isDarkMode = true,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-[#09090b]/80 border-b border-zinc-200 dark:border-white/8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <div className="w-full h-full bg-white dark:bg-[#09090b] rounded-[11px] flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-indigo-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-white dark:border-[#09090b] animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base tracking-tight text-zinc-900 dark:text-white">
                EchoLens
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-medium hidden sm:inline-block">
                Studio 2.0
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 hidden sm:block">Text & Vision to Acoustic Voice</p>
          </div>
        </div>

        {/* Center: Mode Switcher Pills */}
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => onChangeMode('text')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeMode === 'text'
                ? 'bg-gradient-to-r from-indigo-500/90 to-cyan-500/90 text-white shadow-[0_0_12px_rgba(99,102,241,0.35)]'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-white/5'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Text to Voice</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeMode('image')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              activeMode === 'image'
                ? 'bg-gradient-to-r from-indigo-500/90 to-cyan-500/90 text-white shadow-[0_0_12px_rgba(99,102,241,0.35)]'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image to Voice</span>
          </button>
        </div>

        {/* Right: Actions (History, Settings, Theme) */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="relative p-2 rounded-xl bg-zinc-100 dark:bg-[#121215] hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 cursor-pointer"
            title="Script History"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[9px] font-mono font-bold text-white flex items-center justify-center border border-white dark:border-[#09090b]">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="relative p-2 rounded-xl bg-zinc-100 dark:bg-[#121215] hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 cursor-pointer"
            title="Settings & API Key"
          >
            <Settings className="w-4 h-4" />
            {hasGeminiKey && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-[#121215] hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/8 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}
