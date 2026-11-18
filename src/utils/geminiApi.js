// Google Gemini Vision API client (Client-side with user-supplied key)

export const GEMINI_STORAGE_KEY = 'echolens_gemini_api_key';

export function getStoredGeminiKey() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GEMINI_STORAGE_KEY) || '';
}

export function saveStoredGeminiKey(key) {
  if (typeof window === 'undefined') return;
  if (!key || !key.trim()) {
    localStorage.removeItem(GEMINI_STORAGE_KEY);
  } else {
    localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
  }
}

/**
 * Extracts base64 raw data and mime type from a dataURL or Blob
 */
export async function fileOrDataUrlToBase64(input) {
  if (typeof input === 'string') {
    // If it's a data URL: data:image/png;base64,....
    const matches = input.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches) {
      return {
        mimeType: matches[1],
        base64Data: matches[2]
      };
    }
  }

  // If input is a File or Blob
  if (input instanceof Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const matches = result.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          resolve({
            mimeType: matches[1],
            base64Data: matches[2]
          });
        } else {
          reject(new Error('Unable to extract base64 from image.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(input);
    });
  }

  throw new Error('Unsupported image input for Gemini API.');
}

export async function describeImageWithGemini({
  imageInput,
  apiKey,
  style = 'narration'
}) {
  const effectiveKey = apiKey || getStoredGeminiKey();
  if (!effectiveKey) {
    throw new Error('No Gemini API Key provided. Please add your free key in Settings.');
  }

  const { mimeType, base64Data } = await fileOrDataUrlToBase64(imageInput);

  let systemPrompt = '';
  if (style === 'narration') {
    systemPrompt = "You are a master visual narrator for a text-to-voice audio experience. Describe this image in a vivid, natural, engaging spoken tone. Capture the setting, key subjects, colors, mood, and any notable text. Keep it flowing naturally as audio prose without markdown headers or bullet points, suitable to be read aloud directly in 2 to 4 sentences.";
  } else if (style === 'accessibility') {
    systemPrompt = "Provide an objective, highly detailed accessibility audio description of this image. State what kind of image it is, describe the layout from left to right or top to bottom, note key objects, colors, expressions, and transcribe any visible text verbatim. Speak clearly and smoothly without markdown formatting.";
  } else {
    systemPrompt = "Provide a punchy, ultra-concise 2-sentence summary of what is depicted in this image, optimized for quick speech playback.";
  }

  // Model hierarchy: try gemini-2.5-flash, fallback to gemini-1.5-flash
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${effectiveKey}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text.trim();
      }
    } catch (err) {
      lastError = err;
      // If error is invalid API key or permission denied, don't keep trying next model
      if (err.message && (err.message.includes('API key') || err.message.includes('PERMISSION_DENIED'))) {
        throw err;
      }
    }
  }

  throw lastError || new Error('Failed to generate image description.');
}

