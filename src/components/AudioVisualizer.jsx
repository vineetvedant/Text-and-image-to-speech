import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Waves, CircleDot, Activity } from 'lucide-react';

// Pure rendering helpers outside component for optimal performance and no initialization ordering issues
function renderEqualizerBars(ctx, width, height, state, pitchVal) {
  if (width <= 0 || height <= 0) return;
  const availableWidth = Math.max(80, width - 24);
  const numBars = Math.max(14, Math.min(42, Math.floor(availableWidth / 8)));
  const spacing = Math.max(2, Math.min(4, (availableWidth / numBars) * 0.25));
  const totalSpacing = (numBars - 1) * spacing;
  const barWidth = Math.max(2, (availableWidth - totalSpacing) / numBars);
  const startX = (width - (numBars * barWidth + totalSpacing)) / 2;
  const centerY = height / 2;
  const maxHeight = (height * 0.72) / 2;

  for (let i = 0; i < numBars; i++) {
    const normalizedIndex = i / (numBars - 1 || 1);
    const envelope = Math.sin(normalizedIndex * Math.PI);

    let targetH;
    if (state.activityLevel > 0.05) {
      const f1 = Math.sin(state.phase * 2.5 + i * 0.4);
      const f2 = Math.cos(state.phase * 1.8 - i * 0.3 * (pitchVal || 1));
      const f3 = Math.sin(state.phase * 3.2 + i * 0.7);
      const jitter = Math.sin((i * 13.37 + state.phase * 5) % Math.PI);

      const energy = Math.abs(f1 * 0.4 + f2 * 0.35 + f3 * 0.25 + jitter * 0.1);
      targetH = 4 + energy * maxHeight * envelope * (0.4 + state.activityLevel * 0.6);
    } else {
      const idleWave = Math.sin(state.idlePhase * 2 + i * 0.18) * 0.5 + 0.5;
      targetH = 4 + idleWave * 8 * envelope;
    }

    state.barHeights[i] = (state.barHeights[i] || 4) + (targetH - (state.barHeights[i] || 4)) * 0.25;
    const curH = state.barHeights[i];

    if (curH > (state.peakCaps[i] || 0)) {
      state.peakCaps[i] = curH;
    } else {
      state.peakCaps[i] = Math.max(curH, (state.peakCaps[i] || 0) - 0.8);
    }

    const x = startX + i * (barWidth + spacing);
    const y = centerY - curH;
    const h = Math.max(2, curH * 2);

    const barGrad = ctx.createLinearGradient(x, centerY - curH, x, centerY + curH);
    if (state.activityLevel > 0.2) {
      barGrad.addColorStop(0, '#06B6D4');
      barGrad.addColorStop(0.4, '#6366F1');
      barGrad.addColorStop(0.6, '#8B5CF6');
      barGrad.addColorStop(1, '#06B6D4');
    } else {
      barGrad.addColorStop(0, 'rgba(148, 163, 184, 0.4)');
      barGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.5)');
      barGrad.addColorStop(1, 'rgba(148, 163, 184, 0.4)');
    }

    ctx.fillStyle = barGrad;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, barWidth, h, Math.min(barWidth / 2, 4));
    } else {
      ctx.rect(x, y, barWidth, h);
    }
    ctx.fill();

    if (state.activityLevel > 0.3 && barWidth >= 3) {
      ctx.fillStyle = '#38BDF8';
      const peakY = centerY - state.peakCaps[i] - 3;
      ctx.beginPath();
      ctx.arc(x + barWidth / 2, peakY, barWidth / 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function renderHarmonicWave(ctx, width, height, state, pitchVal) {
  if (width <= 0 || height <= 0) return;
  const centerY = height / 2;
  const layers = [
    { color: 'rgba(6, 182, 212, 0.7)', speed: 1.2, freq: 0.015, amp: 28, offset: 0 },
    { color: 'rgba(99, 102, 241, 0.85)', speed: 0.9, freq: 0.02, amp: 38, offset: 1.8 },
    { color: 'rgba(168, 85, 247, 0.6)', speed: 1.5, freq: 0.025, amp: 20, offset: 3.4 }
  ];

  layers.forEach((layer) => {
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = layer.color;
    ctx.shadowColor = layer.color;
    ctx.shadowBlur = state.activityLevel > 0.2 ? 10 : 2;

    for (let x = 0; x <= width; x += 4) {
      const normalizedX = x / (width || 1);
      const envelope = Math.sin(normalizedX * Math.PI);

      let yOffset;
      if (state.activityLevel > 0.05) {
        const w1 = Math.sin(x * layer.freq * (pitchVal || 1) + state.phase * layer.speed + layer.offset);
        const w2 = Math.cos(x * 0.008 - state.phase * 0.7);
        yOffset = (w1 * 0.7 + w2 * 0.3) * layer.amp * envelope * (0.3 + state.activityLevel * 0.8);
      } else {
        const idleW = Math.sin(x * 0.01 + state.idlePhase + layer.offset);
        yOffset = idleW * 6 * envelope;
      }

      const y = centerY + yOffset;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  ctx.shadowBlur = 0;
}

function renderCircularCore(ctx, width, height, state, pitchVal) {
  if (width <= 0 || height <= 0) return;
  const centerX = width / 2;
  const centerY = height / 2;
  const baseRadius = Math.min(width, height) * 0.22;
  const numRays = 32;

  const coreGrad = ctx.createRadialGradient(
    centerX, centerY, baseRadius * 0.2,
    centerX, centerY, baseRadius * (1 + state.activityLevel * 0.4)
  );
  if (state.activityLevel > 0.2) {
    coreGrad.addColorStop(0, '#6366F1');
    coreGrad.addColorStop(0.5, '#06B6D4');
    coreGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');
  } else {
    coreGrad.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    coreGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
  }

  ctx.fillStyle = coreGrad;
  ctx.beginPath();
  ctx.arc(centerX, centerY, baseRadius * (1.1 + state.activityLevel * 0.5), 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * Math.PI * 2 + state.phase * 0.2;
    let rayLength;
    if (state.activityLevel > 0.05) {
      const wobble = Math.sin(state.phase * 3 + i * 0.8 * (pitchVal || 1));
      rayLength = baseRadius + (12 + wobble * 22) * state.activityLevel;
    } else {
      const idle = Math.sin(state.idlePhase * 2 + i * 0.5) * 4;
      rayLength = baseRadius + 4 + idle;
    }

    const x1 = centerX + Math.cos(angle) * (baseRadius - 2);
    const y1 = centerY + Math.sin(angle) * (baseRadius - 2);
    const x2 = centerX + Math.cos(angle) * rayLength;
    const y2 = centerY + Math.sin(angle) * rayLength;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = state.activityLevel > 0.2 ? '#06B6D4' : 'rgba(99, 102, 241, 0.5)';
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, baseRadius - 4, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export default function AudioVisualizer({ isPlaying, isPaused, rate = 1, pitch = 1, className = '' }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [styleMode, setStyleMode] = useState('bars'); // 'bars' | 'wave' | 'circular'
  
  const stateRef = useRef({
    phase: 0,
    idlePhase: 0,
    barHeights: new Array(48).fill(4),
    peakCaps: new Array(48).fill(4),
    activityLevel: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      if (width <= 0 || height <= 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const state = stateRef.current;

      const targetActivity = isPlaying && !isPaused ? 1 : 0;
      state.activityLevel += (targetActivity - state.activityLevel) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, width * 0.6
      );
      if (state.activityLevel > 0.05) {
        bgGrad.addColorStop(0, `rgba(99, 102, 241, ${0.12 * state.activityLevel})`);
        bgGrad.addColorStop(0.5, `rgba(6, 182, 212, ${0.05 * state.activityLevel})`);
        bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        bgGrad.addColorStop(0, 'rgba(99, 102, 241, 0.03)');
        bgGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const speedMultiplier = (rate || 1) * (state.activityLevel > 0.1 ? 1 : 0.4);
      state.phase += 0.06 * speedMultiplier;
      state.idlePhase += 0.02;

      if (styleMode === 'bars') {
        renderEqualizerBars(ctx, width, height, state, pitch);
      } else if (styleMode === 'wave') {
        renderHarmonicWave(ctx, width, height, state, pitch);
      } else {
        renderCircularCore(ctx, width, height, state, pitch);
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isPlaying, isPaused, rate, pitch, styleMode]);

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-white/10 p-3 shadow-xl ${className}`}>
      {/* Top Header bar with status and mode selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 px-2 sm:px-3 pt-1">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex items-center justify-center shrink-0">
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isPlaying && !isPaused
                  ? 'bg-cyan-400 ring-4 ring-cyan-500/20 animate-pulse'
                  : 'bg-zinc-600'
              }`}
            />
          </div>
          <span className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase truncate">
            {isPlaying && !isPaused ? 'Acoustic Signal Live' : isPaused ? 'Audio Paused' : 'Acoustic Idle'}
          </span>
        </div>

        {/* Style mode toggles */}
        <div className="flex items-center bg-zinc-900 border border-white/5 rounded-lg p-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setStyleMode('bars')}
            className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
              styleMode === 'bars'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Frequency Bars"
            aria-label="Frequency Bars"
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setStyleMode('wave')}
            className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
              styleMode === 'wave'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Harmonic Waveform"
            aria-label="Harmonic Waveform"
          >
            <Waves className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setStyleMode('circular')}
            className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${
              styleMode === 'circular'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Voice Core"
            aria-label="Voice Core"
          >
            <CircleDot className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Canvas */}
      <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {/* Center Idle Overlay Badge */}
        {!isPlaying && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
              <Activity className="w-3 h-3 text-indigo-400" />
              <span>Awaiting vocal playback</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
