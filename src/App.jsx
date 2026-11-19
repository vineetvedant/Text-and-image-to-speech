import React, { useState, useEffect, useCallback } from 'react';
import StudioNavbar from './components/StudioNavbar';
import StudioTeleprompter from './components/StudioTeleprompter';
import StudioRightInspector from './components/StudioRightInspector';
import AudioVisualizer from './components/AudioVisualizer';
import StudioFooter from './components/StudioFooter';
import HistoryDrawer from './components/HistoryDrawer';
import SettingsModal from './components/SettingsModal';
import AboutBioModal from './components/AboutBioModal';
import SeoContentSection from './components/SeoContentSection';
import { speechController, unlockAudioContext } from './utils/speechSynthesis';
import { SUPPORTED_LANGUAGES } from './utils/samplePresets';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const HISTORY_STORAGE_KEY = 'echolens_script_history';
const THEME_STORAGE_KEY = 'sshconnect_theme';

export default function App() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'image' | 'visualizer'

  // Dynamic Routing & Deep Linking for Programmatic SEO
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('image') || hash.includes('image')) {
        setActiveTab('image');
      } else if (path.includes('teleprompter') || path.includes('visualizer') || hash.includes('teleprompter') || hash.includes('visualizer')) {
        setActiveTab('visualizer');
      } else if (path.includes('text') || hash.includes('text')) {
        setActiveTab('text');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    window.addEventListener('hashchange', handleUrlRoute);
    return () => {
      window.removeEventListener('popstate', handleUrlRoute);
      window.removeEventListener('hashchange', handleUrlRoute);
    };
  }, []);

  const handleSelectTab = useCallback((tab) => {
    setActiveTab(tab);
    try {
      const routeMap = {
        text: '/text-to-speech',
        image: '/image-to-voice',
        visualizer: '/teleprompter'
      };
      if (routeMap[tab] && window.location.pathname !== routeMap[tab]) {
        window.history.replaceState(null, '', routeMap[tab]);
      }
    } catch {
      // safe fallback
    }
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [text, setText] = useState(SUPPORTED_LANGUAGES[0].sampleText);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [isSpeechSupported] = useState(() => speechController.isSupported());

  // Dark/Light Theme State
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {
        console.warn('Failed to save theme preference', e);
      }
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Voice modulation state
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  // Speech playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);

  // Script history
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Safe Voice Loader across async (Chrome) & sync (Safari/Firefox) browsers
  useEffect(() => {
    if (!isSpeechSupported) return;

    speechController.loadVoicesSafe((availableVoices) => {
      if (availableVoices && availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice((prev) => {
          if (prev) return prev;
          const langPrefix = currentLanguage.code.split('-')[0].toLowerCase();
          return (
            availableVoices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(currentLanguage.code.toLowerCase())) ||
            availableVoices.find(v => v.lang.toLowerCase().startsWith(langPrefix)) ||
            availableVoices.find(v => v.lang.startsWith('en')) ||
            availableVoices.find(v => v.default) ||
            availableVoices[0]
          );
        });
      }
    });
  }, [currentLanguage, isSpeechSupported]);

  // Handle Multi-Language Switch
  const handleSelectLanguage = (lang) => {
    setCurrentLanguage(lang);
    setText(lang.sampleText);

    // Auto-switch voice to match selected language
    const langPrefix = lang.code.split('-')[0].toLowerCase();
    const matchingVoice =
      voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(lang.code.toLowerCase())) ||
      voices.find(v => v.lang.toLowerCase().startsWith(langPrefix));

    if (matchingVoice) {
      setSelectedVoice(matchingVoice);
      showToast(`Switched to ${lang.nativeName} (${lang.name})`);
    } else {
      showToast(`Switched to ${lang.nativeName}. (Using closest installed voice engine).`);
    }
  };

  // Add Item to History
  const addToHistory = useCallback((textToSave, voice) => {
    if (!textToSave || !textToSave.trim()) return;
    const words = textToSave.trim().split(/\s+/).filter(Boolean).length;
    const newItem = {
      id: Date.now().toString(),
      text: textToSave,
      timestamp: Date.now(),
      voiceName: voice?.name || selectedVoice?.name || 'Default Voice',
      wordCount: words,
      charCount: textToSave.length
    };

    setHistory((prev) => {
      const filtered = prev.filter(item => item.text !== textToSave);
      const updated = [newItem, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history to localStorage', e);
      }
      return updated;
    });
  }, [selectedVoice]);

  // Stop playback
  const handleStop = useCallback(() => {
    speechController.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentCharIndex(-1);
  }, []);

  // Pause playback
  const handlePause = useCallback(() => {
    speechController.pause();
    setIsPaused(true);
  }, []);

  // Resume playback
  const handleResume = useCallback(() => {
    unlockAudioContext();
    speechController.resume();
    setIsPaused(false);
  }, []);

  // Direct User Tap/Click Play Speech (Unlocks iOS Safari & Chrome Web Audio)
  const handlePlay = useCallback(() => {
    if (!text || !text.trim()) {
      showToast('Please type or paste some text to speak.');
      return;
    }

    // Direct synchronous call inside user gesture to avoid iOS audio policy blocking
    unlockAudioContext();
    handleStop();
    addToHistory(text, selectedVoice);

    setIsPlaying(true);
    setIsPaused(false);
    setCurrentCharIndex(0);

    speechController.speak({
      text,
      voice: selectedVoice,
      rate,
      pitch,
      volume,
      onStart: () => {
        setIsPlaying(true);
        setIsPaused(false);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentCharIndex(-1);
      },
      onPause: () => {
        setIsPaused(true);
      },
      onResume: () => {
        setIsPaused(false);
      },
      onError: (err) => {
        console.warn('Speech playback issue:', err);
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentCharIndex(-1);
        showToast('Playback interrupted. Tap Speak to restart.');
      },
      onBoundary: ({ charIndex }) => {
        setCurrentCharIndex(charIndex);
      }
    });
  }, [text, selectedVoice, rate, pitch, volume, handleStop, addToHistory]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#e5e5ea] dark:bg-[#09090b] py-0 sm:py-3 lg:py-6 px-0 sm:px-3 lg:px-6 flex flex-col justify-start items-center font-sans antialiased overflow-x-hidden transition-colors duration-200">
      {/* Unsupported Browser Warning Fallback */}
      {!isSpeechSupported && (
        <div className="w-full max-w-[1480px] bg-amber-500 text-black px-4 py-2.5 text-xs font-semibold flex items-center justify-between gap-2 shadow-sm rounded-b-xl mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Your browser does not natively support the Web Speech API. For full audio voice synthesis, please open this app in Chrome, Safari, Edge, or Firefox.
            </span>
          </div>
        </div>
      )}

      {/* Outer Studio Card Container */}
      <div className="w-full max-w-[1480px] bg-white dark:bg-[#121215] rounded-none sm:rounded-2xl lg:rounded-3xl border-0 sm:border border-zinc-300/80 dark:border-white/10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.14)] dark:shadow-[0_30px_90px_-10px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col min-h-[100dvh] sm:min-h-[92vh] min-w-0 transition-colors duration-200">
        {/* Studio Top Navigation Bar */}
        <StudioNavbar
          onNewProject={handlePlay}
          isPlaying={isPlaying}
          currentLanguage={currentLanguage}
          onSelectLanguage={handleSelectLanguage}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenBio={() => setIsBioOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main 2-Column Studio Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-w-0">
          {/* Main Stage / Teleprompter */}
          {activeTab === 'visualizer' ? (
            <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center items-center bg-[#fdfdfd] dark:bg-[#0e0e11] space-y-4 min-w-0 transition-colors">
              <div className="w-full max-w-2xl">
                <AudioVisualizer
                  isPlaying={isPlaying}
                  isPaused={isPaused}
                  rate={rate}
                  pitch={pitch}
                />
              </div>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Live Acoustic Harmonic Spectrum Visualizer</p>
            </div>
          ) : (
            <StudioTeleprompter
              text={text}
              onChangeText={setText}
              isPlaying={isPlaying}
              isPaused={isPaused}
              currentCharIndex={currentCharIndex}
              onPlay={handlePlay}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
              activeTab={activeTab}
              onOpenSettings={() => setIsSettingsOpen(true)}
              ocrLanguage={currentLanguage.ocrCode}
            />
          )}

          {/* Right Inspector Panel */}
          <StudioRightInspector
            voices={voices}
            selectedVoice={selectedVoice}
            onSelectVoice={setSelectedVoice}
            rate={rate}
            onChangeRate={setRate}
            pitch={pitch}
            onChangePitch={setPitch}
            volume={volume}
            onChangeVolume={setVolume}
          />
        </div>

        {/* High-Intent On-Page SEO Section (Below the fold) */}
        <SeoContentSection onSelectTab={handleSelectTab} />

        {/* Minimalist Studio Footer with Personal Branding */}
        <StudioFooter onOpenBio={() => setIsBioOpen(true)} />
      </div>

      {/* Slide-out History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoadItem={(item) => {
          setText(item.text);
          showToast('Loaded script from history.');
        }}
        onPlayItem={(item) => {
          setText(item.text);
          handlePlay();
        }}
        onDeleteItem={(id) => {
          setHistory(prev => {
            const next = prev.filter(item => item.id !== id);
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
            return next;
          });
        }}
        onClearAll={() => {
          setHistory([]);
          localStorage.removeItem(HISTORY_STORAGE_KEY);
          showToast('History cleared.');
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveSuccess={() => {
          showToast('Settings saved successfully.');
        }}
      />

      {/* About Project & Creator Bio Popup Modal */}
      <AboutBioModal
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#18181b] dark:bg-white text-white dark:text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-[90vw] text-center border border-transparent dark:border-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
