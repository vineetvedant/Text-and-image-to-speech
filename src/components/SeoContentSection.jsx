import React, { useState } from 'react';
import {
  Volume2,
  Image as ImageIcon,
  Tv,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
  GraduationCap,
  Video,
  Eye,
  Languages
} from 'lucide-react';

export default function SeoContentSection({ activeTab = 'text', onSelectTab }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const isImageMode = activeTab === 'image';

  const faqs = [
    {
      question: "Is this text to speech converter completely free with no word limit?",
      answer: "Yes, Voice Studio (sshconnect) is 100% free with no monthly subscription, no credit card required, and no artificial character or word limits. Because speech synthesis runs directly using your device's native browser Web Speech API, you can synthesize as much text as you need without hitting billing walls or usage caps."
    },
    {
      question: "How do I convert an image or screenshot into spoken audio?",
      answer: "Simply switch to the 'Image to Voice' mode and drag and drop any image (PNG, JPG, WebP), paste a screenshot from your clipboard (Ctrl+V), or take a photo using your mobile camera. Our built-in Tesseract.js optical character recognition engine instantly extracts the text on your device, allowing you to edit the script and immediately tap 'Speak Extracted Text'."
    },
    {
      question: "How to read screenshots, receipts, or handwritten notes aloud?",
      answer: "Upload or paste any screenshot, store receipt, document scan, or handwritten note directly into the Image to Voice dropzone. The in-browser OCR engine scans glyphs in real time with high accuracy, automatically formats the recognized script, and enables instantaneous one-click voice playback with synchronized speed and pitch control."
    },
    {
      question: "What is the difference between offline browser voices and Gemini AI scene description?",
      answer: "Offline browser voices use your device's local Web Speech API synthesis engine, operating 100% client-side with zero data egress and zero latency. Optional Gemini AI Multimodal Vision (enabled via your own BYOK API key) goes beyond raw OCR text: it interprets complex scenes, visual layout, diagrams, infographic charts, and ambient photo settings into expressive, natural spoken narrative prose."
    },
    {
      question: "How does Voice Studio support dyslexia and accessibility reading?",
      answer: "Voice Studio incorporates accessibility-first design: high-contrast dark and light modes, adjustable typography, synchronized word-by-word kinetic teleprompter tracking that highlights active syllables, and granular vocal rate controls (0.5x to 2.0x). This multisensory visual-audio reinforcement significantly improves reading comprehension and retention for neurodivergent individuals and language learners."
    },
    {
      question: "How does BYOK (Bring Your Own Key) Gemini API key privacy work?",
      answer: "Your privacy is paramount. When you provide a Google Gemini API key for AI Multimodal Vision, the secret key is saved exclusively in your personal browser's localStorage. It is never transmitted to or logged on sshconnect servers. API requests travel directly and securely from your browser sandbox straight to Google's official Gemini endpoint."
    },
    {
      question: "Does this tool work offline or store my text and images on a server?",
      answer: "Your privacy is guaranteed. All text-to-speech synthesis and image OCR text recognition run 100% locally on your computer or mobile device. No audio files, written scripts, or uploaded images are ever transmitted to or stored on any remote cloud server."
    },
    {
      question: "What languages and accents are supported for text to voice?",
      answer: "Voice Studio supports over 15 international languages and regional dialects, including English (US, UK, Australia, India), Spanish, French, German, Hindi, Japanese, Chinese, Italian, Portuguese, and more. When you select a language from our dialect switcher, the studio automatically pairs your script with the best installed native voice engine."
    },
    {
      question: "How does the kinetic word-highlighter teleprompter work?",
      answer: "As speech is generated, the teleprompter tracks spoken character boundaries in real time and highlights each active word with a sleek high-contrast focal pill. This allows public speakers, voiceover artists, students, and language learners to read along smoothly at any speech rate."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Input Text or Upload an Image",
      desc: "Type or paste your vocal script into the editor, or upload an image (receipt, book page, document, or quote) for instant client-side OCR extraction."
    },
    {
      step: "02",
      title: "Modulate Voice, Pitch & Speed",
      desc: "Select your preferred neural voice profile, adjust the playback rate from 0.5x to 2.0x, calibrate vocal pitch, and configure volume and intonation."
    },
    {
      step: "03",
      title: "Listen & Read with the Teleprompter",
      desc: "Press Speak to hear high-fidelity speech while the real-time kinetic teleprompter highlights active words alongside a live 60 FPS acoustic visualizer."
    }
  ];

  const useCases = [
    {
      icon: <Video className="w-5 h-5 text-indigo-500" />,
      title: "Content Creators & YouTubers",
      desc: "Generate professional narration voiceovers for tutorials, social videos, and reels. Use the synced teleprompter for flawless on-camera presentations without retakes."
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-500" />,
      title: "Students & Academic Researchers",
      desc: "Turn study guides, lecture screenshots, textbook excerpts, and research notes into spoken audio. Listen while commuting, exercising, or reviewing coursework."
    },
    {
      icon: <Eye className="w-5 h-5 text-emerald-500" />,
      title: "Accessibility & Visual Assistance",
      desc: "Empower visually impaired and low-vision individuals with client-side screen reading and optional Google Gemini AI multimodal image scene descriptions."
    },
    {
      icon: <Languages className="w-5 h-5 text-amber-500" />,
      title: "Language Learners & Polyglots",
      desc: "Master proper pronunciation and phonetic pacing across 15+ international language locales. Slow down playback to 0.75x or 0.5x to catch subtle accents."
    }
  ];

  const comparison = [
    { feature: "Pricing", us: "100% Free Forever ($0)", others: "$15 – $35 / month" },
    { feature: "Sign-up / Account Required", us: "None — Instant Access", others: "Mandatory Registration" },
    { feature: "Image OCR to Audio Reader", us: "Built-in Client-Side Engine", others: "Separate Paid Software" },
    { feature: "Privacy & Data Storage", us: "100% Local (0 Cloud Uploads)", others: "Scripts Stored on Remote Servers" },
    { feature: "Usage & Character Limits", us: "Unlimited Speech Synthesis", others: "Strict Monthly Character Quotas" },
    { feature: "Kinetic Word Teleprompter", us: "Real-Time Synced Highlighting", others: "Static Text or Extra Tool" }
  ];

  return (
    <section className="w-full max-w-[1480px] mt-6 sm:mt-10 mb-8 sm:mb-12 px-3 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 text-zinc-900 dark:text-zinc-100 select-none">
      
      {/* 1. Main SEO Header with Single Authoritative H1 */}
      <header className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/40 text-[11px] font-mono font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE SPEECH & VISION STUDIO</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
          {isImageMode
            ? "Image to Speech & Free Online OCR Reader — Read Photos"
            : "Free Online Text to Speech Reader — Private, No Signup"}
        </h1>

        <p className="text-xs sm:text-sm lg:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {isImageMode
            ? "Upload or paste any PNG, JPG, or WebP image to extract text with instant browser OCR and listen aloud. Free, private, with optional Gemini AI scene reading."
            : "Convert text to natural speech directly in your browser with speed, pitch, and intonation controls. 100% client-side, unlimited, and free with no account."}
        </p>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => onSelectTab?.('text')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#16161c] hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Text to Speech</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab?.('image')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#16161c] hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-cyan-500" />
            <span>Image to Voice OCR</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab?.('visualizer')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#16161c] hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Tv className="w-3.5 h-3.5 text-emerald-500" />
            <span>Kinetic Teleprompter</span>
          </button>
        </div>
      </header>

      {/* 2. 3-Step "How It Works" Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-bold">
            SIMPLE 3-STEP WORKFLOW
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            How to Convert Text or Images to Voice Online for Free
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Fast, intuitive workflow designed for students, educators, creators, and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-white/10 shadow-2xs space-y-2.5 transition-all hover:border-indigo-400/50 dark:hover:border-indigo-500/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-indigo-600/30 dark:text-indigo-400/30">
                  {st.step}
                </span>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-3.5 h-3.5" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                {st.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. High-Converting Use Cases Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-bold">
            VERSATILE APPLICATIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Designed for Creators, Learners, and Everyday Accessibility
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Engineered to adapt to diverse audio synthesis and document conversion needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-white/10 shadow-2xs space-y-3 transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                {uc.icon}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                {uc.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comparison Table: Voice Studio vs Paid Tools */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-bold">
            FEATURE BENCHMARK
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Why Choose Voice Studio vs. Paid Speech Software?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Compare our client-side architecture against conventional cloud-based text-to-speech services.
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-white/10 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-[#18181f]">
                  <th className="py-3 px-4 font-bold text-zinc-800 dark:text-zinc-200">Feature</th>
                  <th className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20">
                    Voice Studio (sshconnect)
                  </th>
                  <th className="py-3 px-4 font-bold text-zinc-500 dark:text-zinc-400">
                    Traditional Paid Tools
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-white/5 font-mono text-[11px]">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-sans font-semibold text-zinc-800 dark:text-zinc-200">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-semibold bg-indigo-50/30 dark:bg-indigo-950/10 flex items-center gap-1.5">
                      <Check className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>{row.us}</span>
                    </td>
                    <td className="py-3 px-4 text-zinc-500 dark:text-zinc-400">
                      {row.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Comprehensive Google "People Also Ask" FAQ Accordion */}
      <section className="space-y-6 max-w-3xl mx-auto">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-mono tracking-wider text-indigo-600 dark:text-indigo-400 uppercase font-bold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Frequently Asked Questions About Text & Image to Speech
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Answers to common questions about voice synthesis, OCR extraction, and browser support.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-white/10 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full py-4 px-5 flex items-center justify-between text-left text-xs sm:text-sm font-bold text-zinc-900 dark:text-white cursor-pointer select-none hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal border-t border-zinc-100 dark:border-white/5 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </section>
  );
}
