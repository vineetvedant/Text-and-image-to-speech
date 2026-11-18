import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import { Volume2, Image as ImageIcon, Globe, Settings, Menu, X, Play, Sun, Moon, Info } from 'lucide-react';

export default function StudioNavbar({
  onNewProject,
  isPlaying,
  currentLanguage,
  onSelectLanguage,
  activeTab,
  onSelectTab,
  onOpenSettings,
  onOpenBio,
  theme = 'light',
  onToggleTheme
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-[#121215] border-b border-zinc-200/80 dark:border-white/8 select-none z-30 transition-colors duration-200">
      {/* Main Top Bar */}
      <div className="px-2 sm:px-6 lg:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-1 sm:gap-4 max-w-full overflow-hidden">
        {/* Brand / Logo */}
        <a
          href="https://sshconnect.space/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 cursor-pointer group shrink-0 min-h-[44px]"
          title="sshconnect.space"
        >
          <div className="w-8 h-8 rounded-xl bg-black dark:bg-zinc-800 border border-transparent dark:border-white/10 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
            </svg>
          </div>
          <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors hidden sm:inline">
            sshconnect
          </span>
        </a>

        {/* Center: Mode Switcher Capsule */}
        <div className="flex items-center p-0.5 sm:p-1 bg-zinc-100 dark:bg-zinc-900/90 rounded-xl border border-zinc-200/80 dark:border-white/10 shrink-0 transition-colors">
          <button
            type="button"
            onClick={() => onSelectTab('text')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[36px] ${
              activeTab === 'text'
                ? 'bg-white dark:bg-[#1f1f26] text-zinc-900 dark:text-white shadow-2xs font-bold border border-transparent dark:border-white/10'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Text to Speech</span>
            <span className="sm:hidden text-[11px]">TTS</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('image')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[36px] ${
              activeTab === 'image'
                ? 'bg-white dark:bg-[#1f1f26] text-zinc-900 dark:text-white shadow-2xs font-bold border border-transparent dark:border-white/10'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Image to Voice</span>
            <span className="sm:hidden text-[11px]">OCR</span>
          </button>
        </div>

        {/* Center-Right (Desktop Only): Multi-Language Selector */}
        <div className="hidden lg:flex items-center">
          {currentLanguage && onSelectLanguage && (
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={onSelectLanguage}
            />
          )}
        </div>

        {/* Right Actions: Desktop vs Mobile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Desktop Large Social Links (Visible on screens >= lg) */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="https://sshconnect.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title="Portfolio (sshconnect.space)"
              aria-label="Portfolio"
            >
              <Globe className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/vineetvedant"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title="GitHub (@vineetvedant)"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-[#0A66C2] dark:hover:text-[#38bdf8] hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title="LinkedIn (Vedant Singh)"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
              </svg>
            </a>
          </div>

          {/* Dark / Light Mode Switcher Button (Desktop & Mobile) */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 animate-in spin-in-90 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-90 duration-300" />
              )}
            </button>
          )}

          {/* About / Bio Button */}
          {onOpenBio && (
            <button
              type="button"
              onClick={onOpenBio}
              className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title="About Project & Creator Bio"
              aria-label="About and Bio"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          {/* Settings Button (Visible on screens >= sm) */}
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="hidden sm:flex p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer touch-target"
              title="Settings & API Key"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* New Project / Play Pill */}
          <button
            type="button"
            onClick={onNewProject}
            className="flex items-center gap-1.5 sm:gap-2 bg-[#18181b] dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-950 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all shadow-sm active:scale-95 cursor-pointer shrink-0 min-h-[40px]"
            title={isPlaying ? 'Synthesizing voice...' : 'Speak / New Project'}
          >
            <Play className="w-3.5 h-3.5 fill-current sm:hidden" />
            <span className="hidden sm:inline">{isPlaying ? 'Speaking...' : 'New Project'}</span>
            <div className="hidden sm:flex items-center gap-0.5">
              <span className={`w-0.5 h-2.5 bg-white dark:bg-zinc-950 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-4 bg-white dark:bg-zinc-950 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} />
              <span className={`w-0.5 h-1.5 bg-white dark:bg-zinc-950 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} />
            </div>
          </button>

          {/* Mobile Menu Toggle Button (Visible on screens < lg) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer touch-target"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Quick Bar (Smooth dropdown on < lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-white/8 bg-zinc-50/95 dark:bg-[#16161c]/95 px-4 py-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
          {/* Language Selector on mobile */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Language:</span>
            {currentLanguage && onSelectLanguage && (
              <LanguageSelector
                currentLanguage={currentLanguage}
                onSelectLanguage={(lang) => {
                  onSelectLanguage(lang);
                  setMobileMenuOpen(false);
                }}
              />
            )}
          </div>

          {/* Theme mode row on mobile */}
          {onToggleTheme && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/5">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Appearance:</span>
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs touch-target"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Mobile Quick Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-white/5">
            <div className="flex items-center gap-2">
              <a
                href="https://sshconnect.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs touch-target"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Portfolio</span>
              </a>

              <a
                href="https://github.com/vineetvedant"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 shadow-2xs touch-target"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-[#0A66C2] dark:text-[#38bdf8] shadow-2xs touch-target"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2">
              {onOpenBio && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBio();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs touch-target"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>About Bio</span>
                </button>
              )}

              {onOpenSettings && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs touch-target"
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>Settings</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
