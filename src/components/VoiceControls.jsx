import React, { useState, useMemo } from 'react';
import { Volume2, Gauge, Sliders, Play, RefreshCw, Sparkles, Search } from 'lucide-react';
import { groupVoicesByLanguage, speechController } from '../utils/speechSynthesis';

export default function VoiceControls({
  voices = [],
  selectedVoice,
  onSelectVoice,
  rate = 1,
  onChangeRate,
  pitch = 1,
  onChangePitch,
  volume = 1,
  onChangeVolume,
  onReloadVoices
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Filter and group voices
  const groupedVoices = useMemo(() => {
    let filtered = voices;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = voices.filter(v => 
        v.name.toLowerCase().includes(q) || 
        v.lang.toLowerCase().includes(q)
      );
    }
    return groupVoicesByLanguage(filtered);
  }, [voices, searchQuery]);

  // Quick preview test voice
  const handlePreviewVoice = (e) => {
    e.preventDefault();
    if (isPreviewing) return;
    setIsPreviewing(true);
    speechController.speak({
      text: "EchoLens voice test. The clarity of human expression, rendered in real time.",
      voice: selectedVoice,
      rate,
      pitch,
      volume,
      onEnd: () => setIsPreviewing(false),
      onError: () => setIsPreviewing(false)
    });
  };

  return (
    <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl p-5 shadow-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">Acoustic Engine & Modulation</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Select voice profile, pace, and vocal inflection</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePreviewVoice}
          disabled={isPreviewing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-600/15 hover:bg-indigo-100 dark:hover:bg-indigo-600/25 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          title="Preview current voice settings"
        >
          <Play className={`w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400 text-indigo-600 dark:text-indigo-400 ${isPreviewing ? 'animate-pulse' : ''}`} />
          <span>{isPreviewing ? 'Testing...' : 'Test Voice'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column: Voice Selector & Search Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <span>Voice Profile</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/5">
                {voices.length} available
              </span>
            </label>
            {onReloadVoices && (
              <button
                type="button"
                onClick={onReloadVoices}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-1 cursor-pointer"
                title="Reload voices from browser"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quick Voice Search Filter */}
          <div className="relative mb-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search voice by name or language..."
              className="w-full bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 pl-8 font-sans"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const found = voices.find(v => v.name === e.target.value);
                if (found) onSelectVoice(found);
              }}
              className="w-full bg-zinc-50 dark:bg-[#18181c] border border-zinc-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 appearance-none cursor-pointer pr-10 font-sans shadow-inner"
            >
              {groupedVoices.length === 0 ? (
                <option value="">No voices match filter</option>
              ) : (
                groupedVoices.map(group => (
                  <optgroup key={group.groupName} label={group.groupName} className="bg-white dark:bg-[#18181c] text-zinc-900 dark:text-zinc-300 font-semibold">
                    {group.voices.map(voice => (
                      <option key={voice.name} value={voice.name} className="text-zinc-800 dark:text-zinc-200 py-1">
                        {voice.name} {voice.default ? '★ (Default)' : ''}
                      </option>
                    ))}
                  </optgroup>
                ))
              )}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 dark:text-zinc-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Quick Voice Metadata Pill */}
          {selectedVoice && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 truncate flex-1">
                {selectedVoice.lang} {selectedVoice.localService ? '• Local' : '• High-Definition'}
              </span>
              {selectedVoice.name.toLowerCase().includes('natural') && (
                <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Natural
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Speed, Pitch & Volume Sliders */}
        <div className="space-y-3.5">
          {/* Speed / Rate Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Speaking Speed
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold">{rate.toFixed(2)}x</span>
                {rate !== 1 && (
                  <button
                    type="button"
                    onClick={() => onChangeRate(1)}
                    className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={rate}
              onChange={(e) => onChangeRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            {/* Quick Speed Pills */}
            <div className="flex items-center justify-between pt-0.5">
              {[0.75, 1.0, 1.25, 1.5].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => onChangeRate(preset)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all cursor-pointer ${
                    Math.abs(rate - preset) < 0.01
                      ? 'bg-indigo-100 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-300 dark:border-indigo-500/30'
                      : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 bg-zinc-100 dark:bg-white/2'
                  }`}
                >
                  {preset}x
                </button>
              ))}
            </div>
          </div>

          {/* Pitch & Volume row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Pitch Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300">Pitch</span>
                <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold text-[11px]">{pitch.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.05"
                value={pitch}
                onChange={(e) => onChangePitch(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Volume Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-indigo-400" /> Volume
                </span>
                <span className="font-mono text-zinc-900 dark:text-zinc-200 font-semibold text-[11px]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onChangeVolume?.(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
