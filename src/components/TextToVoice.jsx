import React, { useState, useRef } from 'react';
import { Sparkles, Trash2, Copy, Check, FileText, Maximize2, Minimize2 } from 'lucide-react';
import { SAMPLE_TEXT_PRESETS } from '../utils/samplePresets';
import { calculateEstimatedDuration } from '../utils/speechSynthesis';
import SpeechHighlightOverlay from './SpeechHighlightOverlay';

export default function TextToVoice({
  text,
  onChangeText,
  rate = 1,
  isPlaying,
  currentCharIndex
}) {
  const [copied, setCopied] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const textareaRef = useRef(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;
  const durationEst = calculateEstimatedDuration(text, rate);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    onChangeText('');
  };

  const handleSelectPreset = (preset) => {
    onChangeText(preset.text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className={`space-y-4 ${isFocusMode ? 'fixed inset-4 z-50 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-2xl overflow-y-auto' : ''}`}>
      {/* Sample Presets Header Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" /> Presets:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {SAMPLE_TEXT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-[#18181c] hover:bg-indigo-50 dark:hover:bg-indigo-600/20 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-300 border border-zinc-200 dark:border-white/6 hover:border-indigo-300 dark:hover:border-indigo-500/30 font-medium transition-all whitespace-nowrap cursor-pointer active:scale-95"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-2xl transition-all focus-within:border-indigo-500/40 focus-within:ring-2 focus-within:ring-indigo-500/20">
        {/* Editor Toolbar */}
        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-white/6 bg-zinc-50 dark:bg-[#16161a] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span className="font-semibold text-zinc-800 dark:text-zinc-300">Vocal Script</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="p-1.5 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors disabled:opacity-40 cursor-pointer"
              title="Copy script to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-500 dark:text-zinc-400 hover:text-rose-500 transition-colors disabled:opacity-40 cursor-pointer"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="p-1.5 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              title={isFocusMode ? 'Exit full screen' : 'Expand full screen'}
            >
              {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Textarea with Highlight Overlay */}
        <div className="relative min-h-[220px]">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Type, paste your script here, or click a preset above to begin generating life-like acoustic voice..."
            rows={isFocusMode ? 14 : 7}
            className="w-full h-full bg-transparent p-4 text-sm sm:text-base text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none resize-y font-sans leading-relaxed block"
          />

          {/* Synchronous Word Highlight Overlay during active speech */}
          <SpeechHighlightOverlay
            text={text}
            currentCharIndex={currentCharIndex}
            isPlaying={isPlaying}
          />
        </div>

        {/* Editor Bottom Metadata Bar */}
        <div className="px-4 py-2 border-t border-zinc-200 dark:border-white/6 bg-zinc-50/80 dark:bg-[#0f0f12] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>{charCount.toLocaleString()} chars</span>
            <span>•</span>
            <span>{wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">~{durationEst.text} speech</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500">
              {rate !== 1 ? `Adjusted for ${rate}x rate` : 'Standard 150 WPM'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
