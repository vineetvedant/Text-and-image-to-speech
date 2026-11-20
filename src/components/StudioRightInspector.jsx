import React, { useState } from 'react';
import {
  ChevronDown,
  Play,
  SlidersHorizontal,
  ChevronUp
} from 'lucide-react';
import { speechController } from '../utils/speechSynthesis';

export default function StudioRightInspector({
  voices = [],
  voicesLoaded = true,
  currentLanguage,
  selectedVoice,
  onSelectVoice,
  rate = 1,
  onChangeRate,
  pitch = 1,
  onChangePitch,
  volume = 1,
  onChangeVolume
}) {
  const [autoAdjust, setAutoAdjust] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);

  // Group voices by matching current language
  const langPrefix = currentLanguage?.code?.split('-')[0]?.toLowerCase();
  const matchingVoices = voices.filter(
    (v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix)
  );
  const otherVoices = voices.filter(
    (v) => !v.lang || !v.lang.toLowerCase().startsWith(langPrefix)
  );

  // Quick voice preview test
  const handlePreviewVoice = () => {
    speechController.speak({
      text: "sshconnect voice studio test. High fidelity neural speech synthesis.",
      voice: selectedVoice,
      lang: currentLanguage?.code,
      rate,
      pitch,
      volume
    });
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-[#fafafa] dark:bg-[#101014] border-t lg:border-t-0 lg:border-l border-zinc-200/80 dark:border-white/8 p-4 sm:p-5 space-y-4 sm:space-y-5 overflow-y-auto select-none min-w-0 transition-colors duration-200">
      {/* Mobile Accordion Header */}
      <div className="lg:hidden flex items-center justify-between pb-1 border-b border-zinc-200/60 dark:border-white/5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Voice & Tone Controls
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-colors cursor-pointer touch-target"
          aria-label={isMobileExpanded ? 'Collapse controls' : 'Expand controls'}
        >
          {isMobileExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <div className={`${isMobileExpanded ? 'block' : 'hidden lg:block'} space-y-4 sm:space-y-5`}>
        {/* Voice Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
              Voice Profile
            </span>
            <button
              type="button"
              onClick={handlePreviewVoice}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors cursor-pointer touch-target px-2 py-1 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-white/5"
              title="Preview current voice"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Test Voice</span>
            </button>
          </div>

          <div className="relative">
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const found = voices.find(v => v.name === e.target.value);
                if (found) onSelectVoice(found);
              }}
              className="w-full bg-white dark:bg-[#18181e] border border-zinc-200/90 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white appearance-none cursor-pointer pr-8 shadow-2xs truncate min-h-[44px] transition-colors"
            >
              {voices.length === 0 ? (
                voicesLoaded ? (
                  <option value="">Default System Voice ({currentLanguage?.name || 'Standard'})</option>
                ) : (
                  <option value="">Loading system voices...</option>
                )
              ) : (
                <>
                  {matchingVoices.length > 0 && (
                    <optgroup label={`${currentLanguage?.name || 'Selected Language'} Voices`}>
                      {matchingVoices.map((v) => (
                        <option key={v.name} value={v.name} className="dark:bg-[#18181e] dark:text-white">
                          {v.name} {v.default ? '★' : ''} ({v.lang})
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {otherVoices.length > 0 && (
                    <optgroup label="Other Available Voices">
                      {otherVoices.map((v) => (
                        <option key={v.name} value={v.name} className="dark:bg-[#18181e] dark:text-white">
                          {v.name} {v.default ? '★' : ''} ({v.lang})
                        </option>
                      ))}
                    </optgroup>
                  )}
                </>
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Section: TONE PROPERTIES */}
        <div className="space-y-4 pt-1 border-t border-zinc-200/60 dark:border-white/5">
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-bold tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
              TONE PROPERTIES
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-wider text-zinc-500 dark:text-[#CBD5E1] uppercase font-semibold">
                AUTO ADJUST
              </span>
              <button
                type="button"
                onClick={() => setAutoAdjust(!autoAdjust)}
                className="touch-target p-1 cursor-pointer"
                aria-label="Toggle auto adjust"
              >
                <div
                  className={`w-7 h-4 rounded-full transition-colors relative ${
                    autoAdjust ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full transition-transform absolute top-0.5 ${
                      autoAdjust
                        ? 'left-3.5 bg-white dark:bg-zinc-900'
                        : 'left-0.5 bg-white dark:bg-zinc-300'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Custom Sliders */}
          <div className="space-y-4">
            {/* Slider 1: Speed */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <span>Speed</span>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-[#E2E8F0] font-medium">{rate.toFixed(2)}x</span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={rate}
                  onChange={(e) => onChangeRate(parseFloat(e.target.value))}
                  className="melody-slider w-full"
                  aria-label="Speed slider"
                />
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-zinc-500 dark:text-[#CBD5E1] uppercase pt-0.5 font-medium">
                  <span>SLOWER (0.5x)</span>
                  <span>FASTER (2.0x)</span>
                </div>
              </div>
            </div>

            {/* Slider 2: Vocal Pitch */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <span>Vocal Pitch</span>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-[#E2E8F0] font-medium">{pitch.toFixed(2)}</span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => onChangePitch(parseFloat(e.target.value))}
                  className="melody-slider w-full"
                  aria-label="Pitch slider"
                />
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-zinc-500 dark:text-[#CBD5E1] uppercase pt-0.5 font-medium">
                  <span>DEEP (0.5)</span>
                  <span>HIGH (1.5)</span>
                </div>
              </div>
            </div>

            {/* Slider 3: Emphasis / Volume */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <span>Emphasis (Volume)</span>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-[#E2E8F0] font-medium">{Math.round(volume * 100)}%</span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={volume}
                  onChange={(e) => onChangeVolume?.(parseFloat(e.target.value))}
                  className="melody-slider w-full"
                  aria-label="Volume slider"
                />
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-zinc-500 dark:text-[#CBD5E1] uppercase pt-0.5 font-medium">
                  <span>LOW (20%)</span>
                  <span>MAX (100%)</span>
                </div>
              </div>
            </div>

            {/* Slider 4: Intonation */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <span>Intonation</span>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-[#E2E8F0] font-medium">Natural</span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0.8"
                  max="1.2"
                  step="0.05"
                  defaultValue="1.0"
                  className="melody-slider w-full"
                  aria-label="Intonation slider"
                />
                <div className="flex items-center justify-between text-[9px] font-mono tracking-wider text-zinc-500 dark:text-[#CBD5E1] uppercase pt-0.5 font-medium">
                  <span>MONOTONE</span>
                  <span>EXPRESSIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
