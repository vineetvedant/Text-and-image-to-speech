import React from 'react';
import {
  Home,
  Users,
  Volume2,
  Image as ImageIcon,
  Music,
  Fingerprint,
  Layers,
  Sliders,
  Download,
  Settings,
  Flame,
  ChevronsUpDown,
  History
} from 'lucide-react';

export default function StudioSidebar({
  activeTab,
  onSelectTab,
  onOpenHistory,
  historyCount = 0,
  onOpenSettings
}) {
  return (
    <aside className="w-56 shrink-0 bg-[#fafafa] border-r border-zinc-200/80 p-4 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Workspace Switcher */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-colors cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Flame className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">Odama Space</span>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-zinc-400" />
        </div>

        {/* Section 1: General Navigation */}
        <div className="space-y-1 text-xs">
          <button
            type="button"
            onClick={() => onSelectTab('text')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'text' && !historyCount
                ? 'bg-zinc-200/60 font-semibold text-zinc-900'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <Home className="w-4 h-4 text-zinc-500" />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-zinc-500" />
              <span>Recently Deleted</span>
            </div>
            {historyCount > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-200 text-zinc-700">
                {historyCount}
              </span>
            )}
          </button>
        </div>

        {/* Section 2: PRODUCT */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
            PRODUCT
          </span>

          <div className="space-y-0.5 pt-1 text-xs">
            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-zinc-500" />
              <span>sshconnect Avatars</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('text')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-zinc-200/70 font-semibold text-zinc-900 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Volume2 className="w-4 h-4 text-zinc-700" />
              <span>Text to Speech</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('image')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-zinc-200/70 font-semibold text-zinc-900 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-zinc-700" />
              <span>Speech to text</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('visualizer')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'visualizer'
                  ? 'bg-zinc-200/70 font-semibold text-zinc-900 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Music className="w-4 h-4 text-zinc-500" />
              <span>Backsound Generator</span>
            </button>
          </div>
        </div>

        {/* Section 3: PERSONALIZATION */}
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
            PERSONALIZATION
          </span>

          <div className="space-y-0.5 pt-1 text-xs">
            <button
              type="button"
              onClick={onOpenSettings}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-zinc-500" />
              <span>Personal Voice</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-zinc-500" />
              <span>Brand kit Template</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('text')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-zinc-500" />
              <span>Voice Type</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="space-y-1 pt-6 border-t border-zinc-200/80 text-xs">
        <a
          href="https://pages.cloudflare.com/"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4 text-zinc-500" />
          <span>Download Mac App</span>
        </a>

        <button
          type="button"
          onClick={onOpenSettings}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-all cursor-pointer"
        >
          <Settings className="w-4 h-4 text-zinc-500" />
          <span>Feedback</span>
        </button>
      </div>
    </aside>
  );
}
