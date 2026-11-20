import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Search } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/samplePresets';

export default function LanguageSelector({
  currentLanguage,
  onSelectLanguage
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* Trigger Button Pill */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-zinc-100/80 dark:bg-zinc-900/90 hover:bg-zinc-200/80 dark:hover:bg-zinc-800 border border-zinc-200/90 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer shadow-2xs active:scale-95 min-h-[36px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage.nativeName}</span>
        <span className="text-zinc-400 dark:text-[#CBD5E1] font-mono text-[10px]">({currentLanguage.code.split('-')[0].toUpperCase()})</span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-[#CBD5E1]" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 max-w-[calc(100vw-24px)] bg-white dark:bg-[#18181f] border border-zinc-200/90 dark:border-white/10 rounded-2xl shadow-2xl z-50 p-2 space-y-2 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
          {/* Header & Search */}
          <div className="px-2 pt-1 pb-1">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-[#CBD5E1] font-bold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200">
                <Globe className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Multi-Language
              </span>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-[#CBD5E1]">{SUPPORTED_LANGUAGES.length} Locales</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language..."
                className="w-full bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-zinc-800 dark:text-[#E2E8F0] placeholder:text-zinc-400 dark:placeholder:text-[#CBD5E1] focus:outline-none focus:ring-1 focus:ring-zinc-800 dark:focus:ring-white pl-7"
              />
              <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-[#CBD5E1] absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Language Options List */}
          <div className="max-h-60 overflow-y-auto space-y-0.5">
            {filtered.map((lang) => {
              const isSelected = currentLanguage.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onSelectLanguage(lang);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer text-left min-h-[44px] ${
                    isSelected
                      ? 'bg-zinc-100 dark:bg-white/15 font-semibold text-zinc-900 dark:text-white border border-transparent dark:border-white/10'
                      : 'text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base">{lang.flag}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-white truncate">{lang.nativeName}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-[#CBD5E1] truncate">{lang.name}</p>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-zinc-900 dark:text-white shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
