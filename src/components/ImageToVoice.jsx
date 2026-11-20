import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Sparkles,
  Camera,
  RefreshCw,
  Check,
  Copy,
  Trash2,
  Volume2,
  AlertCircle,
  Eye,
  Layers
} from 'lucide-react';
import { generateSampleImage } from '../utils/samplePresets';
import { describeImageWithGemini, getStoredGeminiKey } from '../utils/geminiApi';

export default function ImageToVoice({
  onSpeakText,
  onOpenSettings
}) {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrStatus, setOcrStatus] = useState('');
  const [ocrConfidence, setOcrConfidence] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // AI Scene Description State
  const [useAiDescription, setUseAiDescription] = useState(false);
  const [aiStyle, setAiStyle] = useState('narration');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Run Client-Side Tesseract OCR
  const runOcr = useCallback(async (srcToScan) => {
    const targetSrc = srcToScan || imageSrc;
    if (!targetSrc) return;

    setIsProcessing(true);
    setOcrProgress(0);
    setOcrStatus('Initializing OCR engine...');
    setErrorMsg('');

    try {
      const { default: Tesseract } = await import('tesseract.js');
      const result = await Tesseract.recognize(targetSrc, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrStatus('Scanning glyphs & text...');
            setOcrProgress(Math.round(m.progress * 100));
          } else if (m.status === 'loading tesseract core') {
            setOcrStatus('Loading neural OCR core...');
            setOcrProgress(Math.round(m.progress * 30));
          } else if (m.status === 'loading language traineddata') {
            setOcrStatus('Loading language dictionary...');
            setOcrProgress(30 + Math.round(m.progress * 30));
          }
        }
      });

      const text = result.data?.text?.trim() || '';
      const confidence = Math.round(result.data?.confidence || 0);

      setExtractedText(text);
      setOcrConfidence(confidence);
      setOcrProgress(100);

      if (!text) {
        setErrorMsg('No readable text was detected in this image. Try another image or toggle "Describe Scene (AI)".');
      }
    } catch (err) {
      console.error('OCR Error:', err);
      setErrorMsg('Failed to process image with OCR: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  }, [imageSrc]);

  // Run Google Gemini Vision Scene Description
  const runAiDescription = useCallback(async (srcToScan, selectedStyle) => {
    const targetSrc = srcToScan || imageSrc;
    if (!targetSrc) return;

    const apiKey = getStoredGeminiKey();
    if (!apiKey) {
      setErrorMsg('Gemini API key is required for AI Scene Description. Please configure it in Settings.');
      onOpenSettings?.();
      return;
    }

    setIsAiLoading(true);
    setErrorMsg('');

    try {
      const description = await describeImageWithGemini({
        imageInput: targetSrc,
        apiKey,
        style: selectedStyle || aiStyle
      });
      setExtractedText(description);
      setOcrConfidence(null);
    } catch (err) {
      console.error('Gemini Vision Error:', err);
      setErrorMsg(err.message || 'Failed to describe image with AI.');
    } finally {
      setIsAiLoading(false);
    }
  }, [imageSrc, aiStyle, onOpenSettings]);

  // Process File upload
  const handleImageFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        setImageMeta({
          name: file.name || 'Pasted Image',
          width: img.width,
          height: img.height,
          size: (file.size / 1024).toFixed(1) + ' KB'
        });
        setImageSrc(dataUrl);

        if (useAiDescription) {
          runAiDescription(dataUrl, aiStyle);
        } else {
          runOcr(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [useAiDescription, aiStyle, runAiDescription, runOcr]);

  // Global Paste listener (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e) => {
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
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleImageFile]);

  // Load Built-in Sample Image
  const handleLoadSample = (sampleType) => {
    const sampleDataUrl = generateSampleImage(sampleType);
    setImageMeta({
      name: `Sample_${sampleType}.png`,
      width: sampleType === 'receipt' ? 600 : 700,
      height: sampleType === 'receipt' ? 700 : 450,
      size: 'Synthetic Sample'
    });
    setImageSrc(sampleDataUrl);

    if (useAiDescription) {
      runAiDescription(sampleDataUrl, aiStyle);
    } else {
      runOcr(sampleDataUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopyText = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Top Options Bar: OCR Mode vs AI Scene Description */}
      <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight">Vision Processing Engine</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {useAiDescription
                ? 'AI Multimodal Vision: Describes visual content, setting, and objects in spoken prose'
                : 'Client-Side OCR: 100% Free optical character extraction directly in-browser'}
            </p>
          </div>
        </div>

        {/* Mode Toggle Button & Prompt Style Selector */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {useAiDescription && (
            <select
              value={aiStyle}
              onChange={(e) => {
                const newStyle = e.target.value;
                setAiStyle(newStyle);
                if (imageSrc) runAiDescription(imageSrc, newStyle);
              }}
              className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="narration">Audio Narration</option>
              <option value="accessibility">Accessibility Specs</option>
              <option value="concise">2-Sentence Summary</option>
            </select>
          )}

          <button
            type="button"
            onClick={() => {
              const nextMode = !useAiDescription;
              setUseAiDescription(nextMode);
              if (imageSrc) {
                if (nextMode) runAiDescription(imageSrc, aiStyle);
                else runOcr(imageSrc);
              }
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              useAiDescription
                ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${useAiDescription ? 'text-indigo-500 dark:text-indigo-400' : 'text-zinc-400'}`} />
            <span>Describe Scene (AI)</span>
            <span
              className={`w-2 h-2 rounded-full ${
                useAiDescription ? 'bg-indigo-500 animate-ping' : 'bg-zinc-400 dark:bg-zinc-600'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Left (Upload / Preview) & Right (Extracted Text) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Upload / Image Card (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          {!imageSrc ? (
            /* Upload Dropzone */
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-zinc-300 dark:border-white/12 hover:border-indigo-500/50 bg-zinc-50 dark:bg-[#121215]/80 hover:bg-zinc-100 dark:hover:bg-[#141419] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group min-h-[340px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                Drag & Drop image here, or <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4">browse</span>
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-4">
                Supports PNG, JPG, WebP. You can also paste directly using <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-mono text-[10px]">Ctrl+V</kbd>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-white/10 transition-all cursor-pointer shadow-sm"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>Choose File</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-medium border border-zinc-200 dark:border-white/10 transition-all cursor-pointer shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Snap Photo</span>
                </button>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleImageFile(e.target.files[0]);
                }}
              />
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
          ) : (
            /* Image Preview Card */
            <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-white/6 bg-zinc-50 dark:bg-[#16161a] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center gap-2 truncate">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">{imageMeta?.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (useAiDescription) runAiDescription(imageSrc, aiStyle);
                      else runOcr(imageSrc);
                    }}
                    disabled={isProcessing || isAiLoading}
                    className="p-1.5 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Re-scan image"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProcessing || isAiLoading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setImageSrc(null);
                      setImageMeta(null);
                      setExtractedText('');
                      setOcrConfidence(null);
                    }}
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-500 dark:text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Remove image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className="relative bg-zinc-100 dark:bg-[#09090b] flex items-center justify-center p-3 min-h-[260px] max-h-[380px] overflow-hidden">
                <img
                  src={imageSrc}
                  alt="Uploaded target"
                  className="max-h-[340px] max-w-full object-contain rounded-lg shadow-md border border-zinc-200 dark:border-white/5"
                />

                {/* Progress Overlay during OCR */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="w-full max-w-xs space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                        <span>{ocrStatus}</span>
                        <span className="text-cyan-400 font-bold">{ocrProgress}%</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${ocrProgress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400">Processing locally inside your browser...</p>
                    </div>
                  </div>
                )}

                {/* Progress Overlay during Gemini AI */}
                {isAiLoading && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="flex flex-col items-center gap-3">
                      <Sparkles className="w-8 h-8 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
                      <p className="text-xs font-medium text-zinc-200">Analyzing Scene with Gemini Vision...</p>
                      <p className="text-[11px] text-zinc-400">Composing spoken visual narrative...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Image Metadata Bar */}
              <div className="px-4 py-2 border-t border-zinc-200 dark:border-white/6 bg-zinc-50/80 dark:bg-[#0f0f12] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{imageMeta?.width} × {imageMeta?.height} px</span>
                <span>{imageMeta?.size}</span>
                {ocrConfidence !== null && (
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Confidence: {ocrConfidence}%</span>
                )}
              </div>
            </div>
          )}

          {/* Quick Sample Image Testers */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-500 dark:text-cyan-400" /> Test with sample images:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleLoadSample('quote')}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 transition-colors cursor-pointer"
              >
                Quote Card
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('receipt')}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 transition-colors cursor-pointer"
              >
                Receipt
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample('road')}
                className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 transition-colors cursor-pointer"
              >
                Street Sign
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Output Card (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white dark:bg-[#121215] border border-zinc-200 dark:border-white/8 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[380px]">
            {/* Header */}
            <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-white/6 bg-zinc-50 dark:bg-[#16161a] flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {useAiDescription ? 'AI Visual Description' : 'Extracted Text (Editable)'}
                </span>
                {extractedText && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    {extractedText.split(/\s+/).filter(Boolean).length} words
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyText}
                  disabled={!extractedText}
                  className="p-1.5 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors disabled:opacity-40 cursor-pointer"
                  title="Copy extracted text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setExtractedText('')}
                  disabled={!extractedText}
                  className="p-1.5 rounded-lg hover:bg-rose-500/10 text-zinc-500 dark:text-zinc-400 hover:text-rose-500 transition-colors disabled:opacity-40 cursor-pointer"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Editable Text Box */}
            <div className="flex-1 p-3 flex flex-col">
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder={
                  isProcessing
                    ? 'Scanning image in real time...'
                    : 'Text extracted from your image will appear here ready for editing or immediate speech playback...'
                }
                rows={10}
                className="w-full flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none resize-none font-sans leading-relaxed p-1"
              />
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mx-3 mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
                {errorMsg.includes('Settings') && (
                  <button
                    type="button"
                    onClick={onOpenSettings}
                    className="text-xs font-semibold text-rose-700 dark:text-rose-200 underline cursor-pointer"
                  >
                    Open Settings
                  </button>
                )}
              </div>
            )}

            {/* Bottom Action Footer */}
            <div className="p-3 border-t border-zinc-200 dark:border-white/6 bg-zinc-50/80 dark:bg-[#0f0f12] flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-500">
                {extractedText ? `${extractedText.length} characters` : 'Ready'}
              </span>

              <button
                type="button"
                onClick={() => onSpeakText(extractedText)}
                disabled={!extractedText.trim() || isProcessing || isAiLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-medium text-xs shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Volume2 className="w-4 h-4 fill-white" />
                <span>Speak Extracted Text</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
