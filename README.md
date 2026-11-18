# 🎙️ sshconnect — Studio Text-to-Voice & Image-to-Voice

> Ultra-clean, production-ready web application for **Text-to-Voice** and **Image-to-Voice** processing with real-time kinetic teleprompting and acoustic spectrum visualization. Hosted **100% free** on Cloudflare Pages with zero server dependencies.

Developed and maintained by **[Vedant Singh](https://sshconnect.space/)** • [Portfolio](https://sshconnect.space/) • [GitHub](https://github.com/vineetvedant) • [LinkedIn](https://www.linkedin.com/in/vedant-singh-2550b2202/)

---

## ✨ Highlights & Aesthetic

- **Design Aesthetic:** Minimalist studio UI (`#09090b` obsidian backdrop, `#121215` cards, hairline borders, electric indigo/cyan accents, and full **Dark & Light Mode** support).
- **Fluid & Responsive:** 100% cross-browser compatible with zero horizontal overflow across 320px mobile screens, tablets, laptops, and 4K displays.
- **Dynamic Mobile Viewport:** Uses `100dvh` and safe-area padding for notched screens, iOS Safari, Android, Chrome, and Firefox.
- **Live HTML5 Audio Visualizer:** 60 FPS real-time equalizer with 3 switchable rendering modes:
  - **Bars:** Studio spectrum with peak-decay caps.
  - **Waves:** Multi-layered fluid harmonic sine waveforms.
  - **Core:** Futuristic radial voice orb.
- **Built-in Creator & Project Bio Modal:** Interactive popup modal on visit sharing project insights and social links.

---

## 🛠️ Core Studio Modes

### 1. Text-to-Voice Studio & Kinetic Teleprompter
- **Browser-Native Vocal Synthesis:** Normalizes async (Chrome/Edge) and sync (Safari/Firefox) voice engines with chunked speech queues to prevent long-paragraph cutoff bugs.
- **Synchronized Kinetic Teleprompter:** High-contrast active word glow pill following real-time vocal cadence.
- **Acoustic Modulation:**
  - Speed slider (`0.5x` – `2.0x`).
  - Vocal Pitch slider (`0.5` – `1.5`).
  - Volume slider (`20%` – `100%`).
  - Monotonous vs. Expressive Intonation slider.
  - Quick **"Test Voice"** preview trigger.
- **Multi-Language Locales:** 15+ built-in international languages (English, Spanish, Hindi, French, German, Japanese, and more) with auto-switching voices and sample presets.
- **Script History Drawer:** Auto-persists recent scripts in `localStorage` with timestamps, word counts, and 1-click replay.

### 2. Image-to-Voice Studio
- **Multi-Source Inputs:**
  - Drag-and-drop file dropzone (PNG, JPG, WebP).
  - Global Clipboard paste listener (`Ctrl+V` / `Cmd+V`).
  - Mobile camera photo capture (`capture="environment"`).
  - Built-in sample test images (Receipt, Quote Card).
- **Client-Side OCR (Zero Cost):** In-browser OCR via `tesseract.js` with live progress percentage and confidence metrics.
- **Editable Script Area:** Refine, edit, or append to extracted text before synthesizing speech.
- **Optional AI Scene Narration (Google Gemini Vision):** Multimodal image scene description via client-stored Gemini API key.

---

## ⌨️ Studio Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` | Toggle Play / Pause |
| `Esc` | Stop speech playback |
| `Ctrl + Enter` | Synthesize & speak active script |
| `Ctrl + V` | Paste image directly from clipboard |

---

## 🚀 Cloudflare Pages Free Deployment

1. Push this repository to **GitHub**:
   ```bash
   git remote add origin https://github.com/vineetvedant/Text-and-image-to-speech.git
   git branch -M main
   git push -u origin main
   ```
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select `Text-and-image-to-speech`.
4. Set build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare Pages automatically serves client-side routing via `public/_redirects` (`/* /index.html 200`).

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Run Oxlint validation
npm run lint

# Compile production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 100% Client-Side Privacy Guarantee

- **No Remote Audio Servers:** Speech synthesis utilizes client-side Web Speech APIs exclusively.
- **Local OCR:** Text extraction runs entirely in client WebAssembly workers.
- **Zero Tracker Cookies:** Your scripts and preferences remain strictly on your device.

---

## 👨‍💻 Creator & Personal Branding

- **Portfolio:** [https://sshconnect.space/](https://sshconnect.space/)
- **GitHub:** [@vineetvedant](https://github.com/vineetvedant)
- **LinkedIn:** [Vedant Singh](https://www.linkedin.com/in/vedant-singh-2550b2202/)
