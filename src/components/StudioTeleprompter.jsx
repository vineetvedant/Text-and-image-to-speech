import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Wand2,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  UploadCloud,
  Trash2,
  AlertCircle,
  Camera,
  FileText
} from 'lucide-react';
import { SAMPLE_TEXT_PRESETS, generateSampleImage } from '../utils/samplePresets';
import { describeImageWithGemini, getStoredGeminiKey } from '../utils/geminiApi';

export default function StudioTeleprompter({
  text,
  onChangeText,
  isPlaying,
  isPaused,
  currentCharIndex,
  onPlay,
  onPause,
  onResume,
  onStop,
  activeTab,
  onOpenSettings,
  ocrLanguage = 'eng'
}) {
  const [quickInput, setQuickInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Image-to-Voice state
  const [imageSrc, setImageSrc] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrConfidence, setOcrConfidence] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [useAiVision, setUseAiVision] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Tokenize text into words with char boundaries
  const wordsWithOffsets = useMemo(() => {
    if (!text) return [];
    const tokens = [];
    const regex = /\S+/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      tokens.push({
        word: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    return tokens;
  }, [text]);

  // Handle OCR processing
  const runOcr = useCallback(async (src) => {
    const target = src || imageSrc;
    if (!target) return;

    setIsOcrProcessing(true);
    setOcrProgress(0);
    setErrorMsg('');

    try {
      const { default: Tesseract } = await import('tesseract.js');
      const result = await Tesseract.recognize(target, ocrLanguage || 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });
      const extracted = result.data?.text?.trim() || '';
      setOcrConfidence(Math.round(result.data?.confidence || 0));
      if (extracted) {
        onChangeText(extracted);
      } else {
        setErrorMsg('No text detected in this image. Try another image or toggle AI Vision.');
      }
    } catch (err) {
      setErrorMsg('OCR error: ' + (err.message || 'Unknown error'));
    } finally {
      setIsOcrProcessing(false);
    }
  }, [imageSrc, ocrLanguage, onChangeText]);

  // Handle Gemini Vision AI description
  const runAiVision = useCallback(async (src) => {
    const target = src || imageSrc;
    if (!target) return;

    const apiKey = getStoredGeminiKey();
    if (!apiKey) {
      setErrorMsg('Gemini API key is required for AI Vision. Please configure it in Settings.');
      onOpenSettings?.();
      return;
    }

    setErrorMsg('');

    try {
      const description = await describeImageWithGemini({
        imageInput: target,
        apiKey,
        style: 'narration'
      });
      if (description) {
        onChangeText(description);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to describe image with AI.');
    }
  }, [imageSrc, onChangeText, onOpenSettings]);

  const handleImageFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          name: file.name || 'Captured Image',
          width: img.width,
          height: img.height,
          size: (file.size / 1024).toFixed(1) + ' KB'
        });
        setImageSrc(dataUrl);
        if (useAiVision) runAiVision(dataUrl);
        else runOcr(dataUrl);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [useAiVision, runAiVision, runOcr]);

  // Guarded Clipboard Paste Listener
  useEffect(() => {
    const handlePaste = (e) => {
      try {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              handleImageFile(blob);
              break;
            }
          }
        }
      } catch (err) {
        console.warn('Clipboard paste error:', err);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageFile]);

  const handleLoadSample = (sampleType) => {
    const dataUrl = generateSampleImage(sampleType);
    setImageMeta({
      name: `Sample_${sampleType}.png`,
      width: 600,
      height: 450,
      size: 'Synthetic Sample'
    });
    setImageSrc(dataUrl);
    if (useAiVision) runAiVision(dataUrl);
    else runOcr(dataUrl);
  };

  const handleEnhanceScript = () => {
    const nextPreset = SAMPLE_TEXT_PRESETS[Math.floor(Math.random() * SAMPLE_TEXT_PRESETS.length)];
    onChangeText(nextPreset.text);
  };

  const handleSendQuickInput = (e) => {
    e?.preventDefault();
    if (quickInput.trim()) {
      onChangeText(quickInput.trim());
      setQuickInput('');
      onPlay();
    } else {
      onPlay();
    }
  };

  return (
    <section className="flex-1 bg-white dark:bg-[#121215] flex flex-col justify-between p-3.5 sm:p-7 lg:p-10 relative overflow-y-auto min-w-0 overflow-x-hidden transition-colors duration-200">
      {/* Top Header & Mode Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 sm:mb-6">
        <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">
          {activeTab === 'image' ? 'Image to Voice Studio' : 'Text to Speech Playground'}
        </span>

        <div className="flex items-center gap-2">
          {isPlaying && (
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>Synthesizing Voice</span>
            </div>
          )}

          {activeTab === 'image' && (
            <button
              type="button"
              onClick={() => {
                const next = !useAiVision;
                setUseAiVision(next);
                if (imageSrc) {
                  if (next) runAiVision(imageSrc);
                  else runOcr(imageSrc);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[36px] ${
                useAiVision
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700/50'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Describe Scene (AI)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Work Area */}
      <div className="flex-1 flex flex-col justify-start min-w-0">
        {activeTab === 'image' ? (
          /* Image-to-Voice: Responsive 2-column on desktop (lg:grid-cols-2), stacked 1-column on mobile */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start min-w-0">
            {/* Left Column: Image Upload & Preview Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#fafafa] dark:bg-[#16161c] border border-zinc-200/90 dark:border-white/10 shadow-2xs space-y-3 min-w-0 transition-colors">
              {!imageSrc ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 rounded-xl p-6 text-center cursor-pointer transition-all bg-white dark:bg-[#1a1a22] flex flex-col items-center justify-center gap-2"
                >
                  <UploadCloud className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Drop image here, or <span className="underline text-indigo-600 dark:text-indigo-400">browse</span>
                  </p>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Supports PNG, JPG, WebP, or Ctrl+V paste</p>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleLoadSample('quote')}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer min-h-[36px]"
                    >
                      Sample Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLoadSample('receipt')}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer min-h-[36px]"
                    >
                      Sample Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-[11px] font-medium text-white dark:text-zinc-950 transition-colors cursor-pointer min-h-[36px]"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Take Photo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-[#1a1a22] p-3 rounded-xl border border-zinc-200 dark:border-white/10">
                    <img
                      src={imageSrc}
                      alt="Uploaded target"
                      className="w-full sm:w-28 h-28 object-cover rounded-lg border border-zinc-200 dark:border-white/10"
                    />
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{imageMeta?.name}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {imageMeta?.width} × {imageMeta?.height} px • {ocrConfidence ? `Confidence: ${ocrConfidence}%` : 'Scanned'}
                      </p>
                      {isOcrProcessing && (
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden mt-2">
                          <div className="bg-black dark:bg-white h-full transition-all duration-150" style={{ width: `${ocrProgress}%` }} />
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setImageSrc(null)}
                      className="p-2 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer touch-target self-end sm:self-center"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <FileText className="w-3.5 h-3.5" />
                      {useAiVision ? 'AI Scene Narration' : `OCR: Language (${ocrLanguage})`}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (useAiVision) runAiVision(imageSrc);
                        else runOcr(imageSrc);
                      }}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
                    >
                      Re-scan Image
                    </button>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="break-words">{errorMsg}</span>
                </div>
              )}

              {/* Standard File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                }}
              />

              {/* Mobile Camera Input */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                }}
              />
            </div>

            {/* Right Column: Editable Extracted Text & Teleprompter */}
            <div className="space-y-3 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  Extracted Script / Scene Description
                </span>
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  {text ? `${text.trim().split(/\s+/).filter(Boolean).length} words` : '0 words'}
                </span>
              </div>

              <div className="relative min-h-[220px] max-h-[380px] overflow-y-auto rounded-2xl bg-zinc-50 dark:bg-[#16161c] border border-zinc-200 dark:border-white/10 p-4 transition-colors">
                <textarea
                  value={text}
                  onChange={(e) => onChangeText(e.target.value)}
                  placeholder="Extracted text from image will appear here. You can edit before reading aloud..."
                  rows={8}
                  className="w-full bg-transparent font-sans text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-100 focus:outline-none resize-none border-none p-0"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <span>Click & edit directly, then tap Speak.</span>
                <button
                  type="button"
                  onClick={onPlay}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#18181b] dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer touch-target"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Speak Extracted Text</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Text-to-Speech Mode: Editorial Kinetic Teleprompter */
          <div className="relative min-h-[240px] max-h-[460px] overflow-y-auto pr-2 min-w-0">
            {!isEditing ? (
              <div
                onClick={() => setIsEditing(true)}
                className="font-sans text-xl sm:text-2xl lg:text-[32px] leading-[1.65] font-normal tracking-tight text-zinc-400 dark:text-zinc-500 cursor-text select-text transition-all break-words"
                title="Click to edit script"
              >
                {wordsWithOffsets.length === 0 ? (
                  <span className="text-zinc-300 dark:text-zinc-600">Type or paste your voice script here...</span>
                ) : (
                  wordsWithOffsets.map((token, idx) => {
                    const isCurrent =
                      isPlaying &&
                      currentCharIndex >= token.startIndex &&
                      currentCharIndex <= token.endIndex;

                    if (isCurrent) {
                      return (
                        <span
                          key={idx}
                          className="bg-[#18181b] dark:bg-white text-white dark:text-zinc-950 px-2.5 sm:px-3 py-0.5 rounded-xl font-medium shadow-md dark:shadow-[0_4px_24px_rgba(255,255,255,0.25)] inline-block mx-0.5 sm:mx-1 transform -translate-y-0.5 transition-all duration-150"
                        >
                          {token.word}{' '}
                        </span>
                      );
                    }

                    const isPast = isPlaying && token.endIndex < currentCharIndex;

                    return (
                      <span
                        key={idx}
                        className={`transition-colors duration-150 ${
                          isPast
                            ? 'text-zinc-600 dark:text-zinc-400'
                            : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
                        }`}
                      >
                        {token.word}{' '}
                      </span>
                    );
                  })
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  autoFocus
                  value={text}
                  onChange={(e) => onChangeText(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  rows={7}
                  className="w-full bg-transparent font-sans text-xl sm:text-2xl lg:text-[32px] leading-[1.65] font-normal tracking-tight text-zinc-800 dark:text-zinc-100 focus:outline-none resize-none border-none p-0"
                />
                <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono pt-1">
                  <span>Click outside or start speech to lock teleprompter view</span>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold cursor-pointer min-h-[36px]"
                  >
                    Done Editing
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Bottom Prompt Bar */}
      <div className="mt-4 sm:mt-6 rounded-2xl bg-white dark:bg-[#16161c] border border-zinc-200/90 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.07)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-3 sm:p-4 space-y-3 min-w-0 overflow-hidden transition-colors">
        {/* Quick input box */}
        <form onSubmit={handleSendQuickInput} className="flex items-center gap-2">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Type something to speak here.."
            className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none font-sans min-h-[40px] px-1"
          />
        </form>

        {/* Bottom row: Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-white/5 overflow-hidden min-w-0">
          <button
            type="button"
            onClick={handleEnhanceScript}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-zinc-200/90 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-white/5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs touch-target"
          >
            <Wand2 className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 shrink-0" />
            <span className="hidden sm:inline">ENHANCE SCRIPT</span>
            <span className="sm:hidden">ENHANCE</span>
          </button>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

            {!isPlaying ? (
              <button
                type="button"
                onClick={handleSendQuickInput}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#18181b] dark:bg-white hover:bg-black dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer touch-target"
              >
                <span>SEND</span>
              </button>
            ) : isPaused ? (
              <button
                type="button"
                onClick={onResume}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer touch-target"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RESUME</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onPause}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-600 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95 cursor-pointer touch-target"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </button>
            )}

            {isPlaying && (
              <button
                type="button"
                onClick={onStop}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer touch-target"
                title="Stop playback"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
