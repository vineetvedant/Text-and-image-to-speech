import React from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

export default function PlaybackBar({
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onResume,
  onStop,
  disabled = false,
  progressPercent = 0,
  currentWord = '',
  speakingTime = '0s'
}) {
  return (
    <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl p-4 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Playback Control Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-start">
          {!isPlaying ? (
            <button
              type="button"
              onClick={onPlay}
              disabled={disabled}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium text-sm shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Generate & Speak</span>
            </button>
          ) : isPaused ? (
            <button
              type="button"
              onClick={onResume}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onPause}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-medium text-sm border border-zinc-300 dark:border-white/10 transition-all active:scale-95 cursor-pointer"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          )}

          {/* Stop Button */}
          <button
            type="button"
            onClick={onStop}
            disabled={!isPlaying}
            className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-300 dark:hover:border-rose-500/30 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Stop Speech (Esc)"
          >
            <Square className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Center: Live Word Highlight or Status */}
        <div className="flex-1 max-w-md px-2 text-center w-full">
          {isPlaying ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                  {isPaused ? 'Speech Paused' : 'Synthesizing'}
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{progressPercent}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800/80 h-1.5 rounded-full overflow-hidden border border-zinc-300 dark:border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-200"
                  style={{ width: `${Math.max(2, progressPercent)}%` }}
                />
              </div>
              {currentWord && (
                <p className="text-xs font-mono text-zinc-700 dark:text-zinc-300 truncate">
                  Word: <span className="text-cyan-700 dark:text-cyan-300 font-semibold px-1 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-500/20">"{currentWord}"</span>
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
              <span>Ready</span>
              <span>•</span>
              <span>Est. time: {speakingTime}</span>
              <span>•</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 text-[10px] text-zinc-700 dark:text-zinc-300">Space</kbd>
              <span>to play</span>
            </div>
          )}
        </div>

        {/* Right: Output Engine Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/5">
          <Volume2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>Web Speech API (Zero-Cost)</span>
        </div>
      </div>
    </div>
  );
}
