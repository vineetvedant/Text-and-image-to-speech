import React from 'react';
import {
  X,
  Globe,
  ExternalLink,
  Sparkles,
  Volume2,
  Camera,
  ShieldCheck,
  Languages,
  ArrowRight,
  Code2
} from 'lucide-react';

export default function AboutBioModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden z-10 flex flex-col max-h-[90dvh] my-auto animate-in fade-in zoom-in-95 duration-200 transition-colors">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-200/80 dark:border-white/8 flex items-center justify-between shrink-0 bg-gradient-to-r from-zinc-50 via-white to-zinc-50 dark:from-[#15151b] dark:via-[#121215] dark:to-[#15151b]">
          <div className="flex items-center gap-3">
            {/* Custom Monogram Avatar */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full bg-[#18181b] dark:bg-black rounded-[9px] flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-white tracking-tighter">VS</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight">
                  sshconnect Studio
                </h2>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 font-semibold">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">About the project & creator</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer touch-target"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-0 text-xs sm:text-[13px] leading-relaxed">
          {/* Section 1: About the Project */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>About The Project</span>
            </div>

            <p className="text-zinc-600 dark:text-zinc-300">
              <strong className="text-zinc-900 dark:text-white">sshconnect Studio</strong> is an ultra-minimalist, high-performance web platform designed to seamlessly bridge written words, visual media, and spoken voice. Built from the ground up for zero latency and complete privacy, it delivers an editorial studio experience without complex dependencies.
            </p>

            {/* Core Capability Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181f] border border-zinc-200/80 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white text-xs">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  <span>Text to Speech & Teleprompter</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Granular speed, pitch, and tone modulation paired with a synchronized real-time kinetic word highlighter.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181f] border border-zinc-200/80 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white text-xs">
                  <Camera className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span>Image to Voice & OCR</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Extract readable text instantly from photos, quotes, and screenshots with optional Gemini AI scene narration.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181f] border border-zinc-200/80 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white text-xs">
                  <Languages className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span>Multi-Language Locales</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Supports 15+ global languages with native phoneme tuning, sample scripts, and dialect voice matching.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#18181f] border border-zinc-200/80 dark:border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                  <span>100% Client-Side Privacy</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Runs directly inside your browser. No middleman audio servers, zero tracking cookies, and instant execution.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: About Me (Creator Bio) */}
          <section className="space-y-3 pt-4 border-t border-zinc-200/80 dark:border-white/8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
              <Code2 className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>About The Creator</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-[#18181f]/80 border border-zinc-200/80 dark:border-white/5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Vedant Singh</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    Software Engineer & Creator of sshconnect
                  </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  sshconnect.space
                </span>
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-xs leading-relaxed">
                Hi, I'm Vedant. I design and build modern software, high-performance web systems, and intelligent digital experiences. This studio was created to demonstrate how browser-native web APIs can rival dedicated native desktop applications in speed, aesthetics, and user delight.
              </p>

              {/* Creator Social Links */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Portfolio */}
                <a
                  href="https://sshconnect.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#202028] hover:bg-zinc-100 dark:hover:bg-[#282834] border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>sshconnect.space</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/vineetvedant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#202028] hover:bg-zinc-100 dark:hover:bg-[#282834] border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#202028] hover:bg-zinc-100 dark:hover:bg-[#282834] border border-zinc-200 dark:border-white/10 text-[#0A66C2] dark:text-[#38bdf8] text-xs font-semibold shadow-2xs hover:shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer touch-target"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                  </svg>
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-200/80 dark:border-white/8 bg-zinc-50/80 dark:bg-[#15151b]/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-mono">
            Click anywhere outside or tap to enter
          </span>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#18181b] dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold tracking-wide uppercase shadow-sm active:scale-95 transition-all cursor-pointer touch-target"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

