import React, { useMemo } from 'react';

export default function SpeechHighlightOverlay({ text, currentCharIndex = -1, isPlaying = false }) {
  // Tokenize text into words with character offsets
  const tokens = useMemo(() => {
    if (!text) return [];
    const result = [];
    const regex = /\S+|\s+/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      result.push({
        text: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        isWhitespace: /^\s+$/.test(match[0])
      });
    }
    return result;
  }, [text]);

  if (!isPlaying || currentCharIndex < 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 p-4 pointer-events-none overflow-y-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-transparent select-none bg-transparent">
      {tokens.map((token, index) => {
        if (token.isWhitespace) {
          return <span key={index}>{token.text}</span>;
        }

        const isCurrent = currentCharIndex >= token.startIndex && currentCharIndex < token.endIndex;
        const isPast = token.endIndex <= currentCharIndex;

        return (
          <span
            key={index}
            className={`transition-all duration-150 rounded px-0.5 ${
              isCurrent
                ? 'bg-indigo-500/30 text-indigo-300 ring-1 ring-indigo-400 font-semibold shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                : isPast
                ? 'text-zinc-500'
                : 'text-transparent'
            }`}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
}

