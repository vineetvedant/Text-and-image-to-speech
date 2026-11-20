// Cross-browser Web Speech API Manager with sentence chunking, anti-stall & boundary tracking
// Compatible with Chromium, Safari (macOS & iOS), Firefox, Edge, and Android Chrome.

export function unlockAudioContext() {
  try {
    const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
    if (AudioContextClass) {
      const dummyCtx = new AudioContextClass();
      if (dummyCtx.state === 'suspended') {
        dummyCtx.resume().catch(() => {});
      }
    }
  } catch {
    // AudioContext blocked or restricted
  }
}

export function chunkTextIntoUtterances(fullText, maxChunkLength = 160) {
  if (!fullText || !fullText.trim()) return [];

  const sentenceRegex = /[^.!?\n\r]+[.!?\n\r]+|[^.!?\n\r]+$/g;
  const rawChunks = [];
  let match;

  while ((match = sentenceRegex.exec(fullText)) !== null) {
    const sentence = match[0];
    const startIndex = match.index;

    if (sentence.length > maxChunkLength) {
      // Split over-long sentences by words to avoid Chrome voice buffer overflow
      const words = sentence.split(/(\s+)/);
      let currentSub = '';
      let currentSubStart = startIndex;

      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if ((currentSub + w).length > maxChunkLength && currentSub.trim().length > 0) {
          rawChunks.push({
            text: currentSub,
            startIndex: currentSubStart,
            endIndex: currentSubStart + currentSub.length
          });
          currentSubStart += currentSub.length;
          currentSub = w;
        } else {
          currentSub += w;
        }
      }
      if (currentSub.length > 0) {
        rawChunks.push({
          text: currentSub,
          startIndex: currentSubStart,
          endIndex: currentSubStart + currentSub.length
        });
      }
    } else {
      rawChunks.push({
        text: sentence,
        startIndex,
        endIndex: startIndex + sentence.length
      });
    }
  }
  return rawChunks;
}

class SpeechController {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPaused = false;
    this.isStopped = true;
    this.keepAliveInterval = null;
    this.chunks = [];
    this.currentChunkIndex = 0;
    this.currentOptions = null;
    this.retryVoiceTimer = null;
  }

  isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  getVoices() {
    if (!this.isSupported()) return [];
    return this.synth.getVoices();
  }

  loadVoicesSafe(callback) {
    if (!this.isSupported()) {
      callback?.([]);
      return;
    }

    let resolved = false;
    const trigger = () => {
      const v = this.synth.getVoices() || [];
      if (v.length > 0) {
        resolved = true;
        callback?.(v);
        return true;
      }
      return false;
    };

    // If voices already available synchronously (Safari/Firefox)
    if (trigger()) {
      // Still listen for voiceschanged in case Chromium updates with network voices later
    }

    let attempts = 0;
    const maxAttempts = 10;

    if (this.retryVoiceTimer) {
      clearInterval(this.retryVoiceTimer);
    }

    this.retryVoiceTimer = setInterval(() => {
      attempts++;
      if (trigger() || attempts >= maxAttempts) {
        clearInterval(this.retryVoiceTimer);
        this.retryVoiceTimer = null;
        if (!resolved) {
          callback?.(this.synth.getVoices() || []);
        }
      }
    }, 200);

    const onVoicesChangedHandler = () => {
      if (this.retryVoiceTimer) {
        clearInterval(this.retryVoiceTimer);
        this.retryVoiceTimer = null;
      }
      const loaded = this.synth.getVoices() || [];
      callback?.(loaded);
    };

    this.synth.onvoiceschanged = onVoicesChangedHandler;
    if (typeof window !== 'undefined' && window.speechSynthesis?.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChangedHandler);
    }
  }

  speak({
    text,
    voice,
    lang,
    rate = 1,
    pitch = 1,
    volume = 1,
    onStart,
    onEnd,
    onPause,
    onResume,
    onError,
    onBoundary
  }) {
    if (!this.isSupported()) {
      onError?.(new Error('Web Speech API is not supported in this browser.'));
      return;
    }

    const wasSpeaking = this.synth.speaking || this.synth.pending;
    // Stop previous utterances cleanly
    this.stop();

    if (!text || !text.trim()) {
      return;
    }

    // Unlock Web Audio context for mobile Safari / Chrome
    unlockAudioContext();

    this.isStopped = false;
    this.isPaused = false;
    this.chunks = chunkTextIntoUtterances(text);
    this.currentChunkIndex = 0;
    this.currentOptions = {
      text,
      voice,
      lang: lang || voice?.lang || 'en-US',
      rate: Math.max(0.1, Math.min(rate, 2.5)),
      pitch: Math.max(0.1, Math.min(pitch, 2.0)),
      volume: Math.max(0, Math.min(volume, 1.0)),
      onStart,
      onEnd,
      onPause,
      onResume,
      onError,
      onBoundary
    };

    if (this.chunks.length === 0) {
      onEnd?.();
      return;
    }

    // If Chromium was speaking, delay slightly (40ms) after cancel() so it doesn't abort the new utterance
    if (wasSpeaking) {
      setTimeout(() => {
        if (!this.isStopped) {
          this.playNextChunk();
        }
      }, 40);
    } else {
      this.playNextChunk();
    }
  }

  playNextChunk() {
    if (this.isStopped || !this.currentOptions) return;

    if (this.currentChunkIndex >= this.chunks.length) {
      this.cleanup();
      this.currentOptions?.onEnd?.();
      return;
    }

    const chunk = this.chunks[this.currentChunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk.text);
    this.currentUtterance = utterance;

    // Crucial for multilingual support: set the speech language on the utterance
    if (this.currentOptions.lang) {
      utterance.lang = this.currentOptions.lang;
    } else if (this.currentOptions.voice?.lang) {
      utterance.lang = this.currentOptions.voice.lang;
    } else {
      utterance.lang = 'en-US';
    }

    if (this.currentOptions.voice) {
      utterance.voice = this.currentOptions.voice;
    }
    utterance.rate = this.currentOptions.rate;
    utterance.pitch = this.currentOptions.pitch;
    utterance.volume = this.currentOptions.volume;

    // Track word boundaries mapped back to full text character index
    utterance.onboundary = (event) => {
      if (this.isStopped) return;
      if (event.name === 'word') {
        const globalCharIndex = chunk.startIndex + event.charIndex;
        const charLength = event.charLength || 5;
        this.currentOptions?.onBoundary?.({
          charIndex: globalCharIndex,
          charLength,
          text: this.currentOptions.text
        });
      }
    };

    utterance.onstart = () => {
      if (this.currentChunkIndex === 0) {
        this.isPaused = false;
        this.currentOptions?.onStart?.();
      }
      this.startKeepAlive();
    };

    utterance.onend = () => {
      this.stopKeepAlive();
      if (!this.isStopped && !this.isPaused) {
        this.currentChunkIndex++;
        this.playNextChunk();
      }
    };

    utterance.onpause = () => {
      this.isPaused = true;
      this.stopKeepAlive();
      this.currentOptions?.onPause?.();
    };

    utterance.onresume = () => {
      this.isPaused = false;
      this.startKeepAlive();
      this.currentOptions?.onResume?.();
    };

    utterance.onerror = (event) => {
      this.stopKeepAlive();
      // Ignore user cancellations and intentional interrupts
      if (this.isStopped || event.error === 'canceled' || event.error === 'interrupted') {
        return;
      }
      this.cleanup();
      this.currentOptions?.onError?.(event);
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      this.cleanup();
      this.currentOptions?.onError?.(err);
    }
  }

  pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.stopKeepAlive();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.startKeepAlive();
    }
  }

  stop() {
    this.isStopped = true;
    this.isPaused = false;
    this.stopKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.cleanup();
  }

  cleanup() {
    this.currentUtterance = null;
    this.chunks = [];
    this.currentChunkIndex = 0;
    this.stopKeepAlive();
  }

  // Workaround for Chrome 15-second speech silence bug
  startKeepAlive() {
    this.stopKeepAlive();
    this.keepAliveInterval = setInterval(() => {
      if (this.synth && this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  stopKeepAlive() {
    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }
}

export const speechController = new SpeechController();

// Utility to group voices by language region
export function groupVoicesByLanguage(voices) {
  const groups = {};
  
  voices.forEach(voice => {
    const lang = voice.lang || 'Other';
    let friendlyName = lang;
    try {
      const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
      const baseCode = lang.split('-')[0].toLowerCase();
      const regionCode = lang.split('-')[1]?.toUpperCase();
      const baseName = languageNames.of(baseCode) || baseCode;
      friendlyName = regionCode ? `${baseName} (${regionCode})` : baseName;
    } catch {
      friendlyName = lang;
    }

    if (!groups[friendlyName]) {
      groups[friendlyName] = [];
    }
    groups[friendlyName].push(voice);
  });

  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a.toLowerCase().includes('english') && !b.toLowerCase().includes('english')) return -1;
    if (!a.toLowerCase().includes('english') && b.toLowerCase().includes('english')) return 1;
    return a.localeCompare(b);
  });

  return sortedKeys.map(groupName => ({
    groupName,
    voices: groups[groupName].sort((v1, v2) => {
      if (v1.default && !v2.default) return -1;
      if (!v1.default && v2.default) return 1;
      return v1.name.localeCompare(v2.name);
    })
  }));
}

// Calculate speaking duration in minutes & seconds based on WPM
export function calculateEstimatedDuration(text, rate = 1) {
  if (!text || !text.trim()) return { text: '0s', totalSeconds: 0 };
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const baseWpm = 150;
  const adjustedWpm = baseWpm * (rate || 1);
  const minutes = words / adjustedWpm;
  const totalSeconds = Math.round(minutes * 60);

  if (totalSeconds < 60) {
    return { text: `${totalSeconds}s`, totalSeconds };
  }
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return { text: `${m}m ${s}s`, totalSeconds };
}
