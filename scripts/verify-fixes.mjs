import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== Running Verification Suite for Voice Studio ===\n');

// 1. Robots.txt
console.log('1. Verifying robots.txt:');
const robotsPath = resolve('dist/robots.txt');
assert(existsSync(robotsPath), 'dist/robots.txt exists');
const robotsContent = readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('User-agent: *'), 'robots.txt allows all user-agents');
assert(robotsContent.includes('Allow: /'), 'robots.txt allows root crawl');
assert(robotsContent.includes('Sitemap: https://voice.sshconnect.space/sitemap.xml'), 'robots.txt has correct sitemap URL');
assert(!robotsContent.includes('Disallow: /') || robotsContent.includes('Allow: /'), 'robots.txt has no full site disallow');

// 2. Sitemap.xml
console.log('\n2. Verifying sitemap.xml:');
const sitemapPath = resolve('dist/sitemap.xml');
assert(existsSync(sitemapPath), 'dist/sitemap.xml exists');
const sitemapContent = readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('https://voice.sshconnect.space/'), 'sitemap includes root /');
assert(sitemapContent.includes('https://voice.sshconnect.space/image-to-voice'), 'sitemap includes /image-to-voice');

// 3. Headers and Redirects
console.log('\n3. Verifying Cloudflare headers and redirects:');
const headersPath = resolve('dist/_headers');
assert(existsSync(headersPath), 'dist/_headers exists');
const headersContent = readFileSync(headersPath, 'utf8');
assert(headersContent.includes('/robots.txt'), '_headers configures /robots.txt');
assert(headersContent.includes('/sitemap.xml'), '_headers configures /sitemap.xml');

const redirectsPath = resolve('dist/_redirects');
assert(existsSync(redirectsPath), 'dist/_redirects exists');
const redirectsContent = readFileSync(redirectsPath, 'utf8');
assert(redirectsContent.includes('/image-to-voice /image-to-voice/index.html 200'), '_redirects routes /image-to-voice to index.html with HTTP 200');

// 4. Root / index.html SEO metadata
console.log('\n4. Verifying dist/index.html (Root route /):');
const indexPath = resolve('dist/index.html');
assert(existsSync(indexPath), 'dist/index.html exists');
const indexHtml = readFileSync(indexPath, 'utf8');
assert(indexHtml.includes('<title>Free Online Text to Speech Reader — Private, No Signup</title>'), 'Title tag matches CTR-optimized spec');
assert(indexHtml.includes('Convert text to natural speech directly in your browser with speed, pitch, and intonation controls. 100% client-side, unlimited, and free with no account.'), 'Meta description matches spec');
assert(indexHtml.includes('<link rel="canonical" href="https://voice.sshconnect.space/" />'), 'Self-referencing canonical URL on /');
assert(!indexHtml.includes('noindex'), 'Zero noindex tags in dist/index.html');
assert(indexHtml.includes('"@type": "WebApplication"'), 'WebApplication JSON-LD present');
assert(indexHtml.includes('"@type": "FAQPage"'), 'FAQPage JSON-LD present');
assert(indexHtml.includes('<h1>Free Online Text to Speech Reader — Private, No Signup</h1>'), 'Pre-rendered static semantic H1 present');

// 5. /image-to-voice route index.html
console.log('\n5. Verifying dist/image-to-voice/index.html:');
const imgVoicePath = resolve('dist/image-to-voice/index.html');
assert(existsSync(imgVoicePath), 'dist/image-to-voice/index.html exists');
const imgVoiceHtml = readFileSync(imgVoicePath, 'utf8');
assert(imgVoiceHtml.includes('<title>Image to Speech & Free Online OCR Reader — Read Photos</title>'), 'Image-to-voice title matches spec');
assert(imgVoiceHtml.includes('Upload or paste any PNG, JPG, or WebP image to extract text with instant browser OCR and listen aloud. Free, private, with optional Gemini AI scene reading.'), 'Image-to-voice meta description matches spec');
assert(imgVoiceHtml.includes('<link rel="canonical" href="https://voice.sshconnect.space/image-to-voice" />'), 'Self-referencing canonical URL on /image-to-voice');
assert(!imgVoiceHtml.includes('noindex'), 'Zero noindex tags in dist/image-to-voice/index.html');
assert(imgVoiceHtml.includes('<h1>Image to Speech &amp; Free Online OCR Reader — Read Photos</h1>'), 'Pre-rendered static semantic H1 on /image-to-voice');

// 6. Source code fixes verification
console.log('\n6. Verifying source code components:');
const appJsx = readFileSync(resolve('src/App.jsx'), 'utf8');
assert(appJsx.includes('const [isBioOpen, setIsBioOpen] = useState(false);'), 'isBioOpen defaults to false (no blocking modal)');
assert(appJsx.includes('lang: currentLanguage.code'), 'currentLanguage.code is passed to speech synthesis controller');

const synthJs = readFileSync(resolve('src/utils/speechSynthesis.js'), 'utf8');
assert(synthJs.includes('utterance.lang = this.currentOptions.lang'), 'SpeechSynthesisUtterance sets utterance.lang for multi-language pronunciation');
assert(synthJs.includes('voiceschanged'), 'SpeechController registers voiceschanged event');

const navbarJsx = readFileSync(resolve('src/components/StudioNavbar.jsx'), 'utf8');
assert(navbarJsx.includes('overflow-visible'), 'Navbar container uses overflow-visible to prevent clipping dropdown');
assert(navbarJsx.includes('z-50'), 'Navbar container has z-50 stacking context');

const teleprompterJsx = readFileSync(resolve('src/components/StudioTeleprompter.jsx'), 'utf8');
assert(teleprompterJsx.includes('LOAD SAMPLE'), 'ENHANCE SCRIPT renamed to LOAD SAMPLE');
assert(teleprompterJsx.includes('<span>Speak</span>'), 'Primary submit button renamed from SEND to Speak');
assert(teleprompterJsx.includes('activeTab !== \'image\''), 'Bottom TTS bar is hidden in Image to Voice mode');
assert(teleprompterJsx.includes('whitespace-nowrap'), 'Speak Extracted Text button has whitespace-nowrap to prevent wrapping');

const inspectorJsx = readFileSync(resolve('src/components/StudioRightInspector.jsx'), 'utf8');
assert(inspectorJsx.includes('<span>MONOTONE</span>'), 'Typo fixed: MONOTON changed to MONOTONE');
assert(inspectorJsx.includes('dark:text-[#CBD5E1]'), 'Secondary dark mode contrast tokens updated to WCAG AA/AAA #CBD5E1');

const presetsJs = readFileSync(resolve('src/utils/samplePresets.js'), 'utf8');
assert(presetsJs.includes('ctx.fillStyle = \'#FFFFFF\';') && presetsJs.includes('ctx.fillStyle = \'#0F172A\';'), 'Sample Quote generated with high-contrast black text on white canvas for OCR');

console.log(`\n========================================`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
