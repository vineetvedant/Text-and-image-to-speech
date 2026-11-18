import React from 'react';
import { Globe, ArrowUpRight, Info } from 'lucide-react';

export default function StudioFooter({ onOpenBio }) {
  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-white/8 bg-white/60 dark:bg-[#121215]/80 px-4 sm:px-8 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Built by Vedant Singh Credit Line */}
        <div className="flex items-center gap-2">
          <a
            href="https://sshconnect.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer min-h-[44px]"
          >
            {/* Custom Monogram Badge */}
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1px] shadow-xs group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#18181b] dark:bg-black rounded-[7px] flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-white tracking-tighter">VS</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-medium">
              <span>Built by</span>
              <span className="font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-0.5">
                Vedant Singh
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200" />
              </span>
            </div>
          </a>

          {onOpenBio && (
            <button
              type="button"
              onClick={onOpenBio}
              className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer border border-zinc-200 dark:border-white/5"
              title="About Project & Creator"
            >
              About
            </button>
          )}
        </div>

        {/* Right: Sleek Pill Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
          {/* Bio modal trigger */}
          {onOpenBio && (
            <button
              type="button"
              onClick={onOpenBio}
              className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-50 dark:bg-[#16161c] hover:bg-white dark:hover:bg-[#1f1f28] border border-zinc-200/90 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-[11px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer min-h-[40px]"
            >
              <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>About & Bio</span>
            </button>
          )}
          {/* 1. sshconnect.space Portfolio */}
          <a
            href="https://sshconnect.space/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-50 dark:bg-[#16161c] hover:bg-white dark:hover:bg-[#1f1f28] border border-zinc-200/90 dark:border-white/10 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-[11px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-[0_4px_12px_rgba(99,102,241,0.12)] cursor-pointer min-h-[40px]"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 group-hover:rotate-12 transition-transform duration-200" />
            <span>sshconnect.space</span>
          </a>

          {/* 2. GitHub */}
          <a
            href="https://github.com/vineetvedant"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-50 dark:bg-[#16161c] hover:bg-white dark:hover:bg-[#1f1f28] border border-zinc-200/90 dark:border-white/10 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-[11px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs cursor-pointer min-h-[40px]"
          >
            <svg className="w-3.5 h-3.5 fill-current text-zinc-800 dark:text-zinc-200" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          {/* 3. LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-zinc-50 dark:bg-[#16161c] hover:bg-white dark:hover:bg-[#1f1f28] border border-zinc-200/90 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-500 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-[11px] tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-[0_4px_12px_rgba(59,130,246,0.12)] cursor-pointer min-h-[40px]"
          >
            <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
