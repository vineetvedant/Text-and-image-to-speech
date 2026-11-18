import React from 'react';
import {
  X,
  Globe,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function AboutBioModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Studio Dispatch Card */}
      <div className="relative w-full max-w-[480px] bg-white dark:bg-[#111114] border border-zinc-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_100px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200 transition-colors">
        
        {/* Top Technical Bar */}
        <div className="px-5 py-3.5 border-b border-zinc-200/70 dark:border-white/8 flex items-center justify-between bg-zinc-50/60 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400 font-semibold">
              sshconnect // studio dispatch
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-colors cursor-pointer touch-target"
            aria-label="Dismiss modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Creator Header */}
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full bg-[#18181b] dark:bg-[#0c0c0f] rounded-[14px] flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-white tracking-tighter">VS</span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                  Vedant Singh
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 font-medium">
                  Creator
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                sshconnect.space
              </p>
            </div>
          </div>

          {/* Personal Statement / Note */}
          <div className="relative pl-3.5 border-l-2 border-indigo-500/80 dark:border-indigo-400/80">
            <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-normal">
              I built <strong className="text-zinc-900 dark:text-white font-semibold">sshconnect</strong> to prove that voice synthesis and image OCR don't need heavy cloud servers, subscription paywalls, or privacy compromises. Everything runs directly inside your browser with instant playback and zero tracking.
            </p>
          </div>

          {/* Social Profiles Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="https://sshconnect.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200/80 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Portfolio</span>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            </a>

            <a
              href="https://github.com/vineetvedant"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200/80 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
            >
              <svg className="w-3.5 h-3.5 fill-current text-zinc-800 dark:text-zinc-200" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            </a>

            <a
              href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[100px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-100/80 dark:bg-white/5 hover:bg-zinc-200/80 dark:hover:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-[#0A66C2] dark:text-[#38bdf8] text-xs font-semibold transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
              </svg>
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-zinc-200/70 dark:border-white/8 bg-zinc-50/50 dark:bg-white/[0.02] flex items-center justify-between gap-3">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
            Press Esc to close
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#18181b] dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold tracking-wide uppercase transition-all shadow-sm active:scale-95 cursor-pointer touch-target"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
