// Multilingual configuration and presets
export const SUPPORTED_LANGUAGES = [
  {
    code: 'en-US',
    ocrCode: 'eng',
    name: 'English (US)',
    nativeName: 'English',
    flag: '🇺🇸',
    sampleText: "Bring your attention to the crown of your head... Notice any sensations there. Slowly let your awareness travel down to your forehead, your eyes, your jaw."
  },
  {
    code: 'en-GB',
    ocrCode: 'eng',
    name: 'English (UK)',
    nativeName: 'British English',
    flag: '🇬🇧',
    sampleText: "Good afternoon. Today we examine the transformative developments in real-time acoustic synthesis and optical text cognition."
  },
  {
    code: 'es-ES',
    ocrCode: 'spa',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    sampleText: "Lleva tu atención a la coronilla de la cabeza. Observa cualquier sensación allí. Lentamente deja que tu conciencia descienda hacia tu frente, tus ojos y tu mandíbula."
  },
  {
    code: 'fr-FR',
    ocrCode: 'fra',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    sampleText: "Portez votre attention sur le sommet de votre tête. Remarquez chaque sensation. Laissez lentement votre conscience descendre vers votre front, vos yeux et votre mâchoire."
  },
  {
    code: 'de-DE',
    ocrCode: 'deu',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    sampleText: "Richten Sie Ihre Aufmerksamkeit auf den Scheitel Ihres Kopfes. Nehmen Sie alle Empfindungen wahr und lassen Sie Ihre Achtsamkeit sanft durch Ihren Körper fließen."
  },
  {
    code: 'ja-JP',
    ocrCode: 'jpn',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    sampleText: "頭のてっぺんに意識を向けてみましょう。そこにある感覚に気づき、ゆっくりと意識を額、目、そして顎へと下ろしていきます。"
  },
  {
    code: 'hi-IN',
    ocrCode: 'hin',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    sampleText: "अपना ध्यान अपने सिर के ऊपरी हिस्से पर लाएं। वहां की संवेदनाओं को महसूस करें और धीरे-धीरे अपनी चेतना को अपने माथे, आंखों और जबड़े तक बहने दें।"
  },
  {
    code: 'id-ID',
    ocrCode: 'ind',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    sampleText: "Arahkan perhatian Anda ke puncak kepala... Rasakan setiap sensasi di sana. Perlahan biarkan kesadaran Anda mengalir turun ke dahi, mata, dan rahang Anda."
  },
  {
    code: 'pt-BR',
    ocrCode: 'por',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    sampleText: "Traga sua atenção para o topo da cabeça. Perceba qualquer sensação e deixe suavemente sua consciência descer até a testa, olhos e respiração."
  },
  {
    code: 'it-IT',
    ocrCode: 'ita',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    sampleText: "Porta l'attenzione sulla sommità della testa. Nota ogni sensazione e lascia scivolare lentamente la consapevolezza verso la fronte, gli occhi e il respiro."
  },
  {
    code: 'zh-CN',
    ocrCode: 'chi_sim',
    name: 'Chinese',
    nativeName: '中文 (简体)',
    flag: '🇨🇳',
    sampleText: "将注意力集中在头顶，感受那里的感觉。慢慢让你的意识向下流动，穿过额头、双眼和呼吸，感受彻底的放松与宁静。"
  },
  {
    code: 'ko-KR',
    ocrCode: 'kor',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    sampleText: "정수리에 주의를 집중해 보세요. 그곳의 감각을 느끼며 의식을 이마와 눈, 그리고 턱으로 천천히 흘러가게 두세요."
  },
  {
    code: 'ar-SA',
    ocrCode: 'ara',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    sampleText: "وجّه انتباهك إلى أعلى رأسك... لاحظ أي شعور هناك، ودع الوعي يتدفق ببطء نحو جبهتك وعينيك وتنفسك العميق بكل هدوء."
  }
];

// Sample text presets for Text-to-Voice studio
export const SAMPLE_TEXT_PRESETS = [
  {
    id: 'podcast',
    title: 'Podcast Intro',
    icon: 'Mic',
    category: 'Audio',
    text: "Welcome back to The Frontier. Today, we're diving into how real-time optical models and edge neural synthesizers are quietly redefining modern user experiences. Pour yourself a coffee and let's get right into it."
  },
  {
    id: 'news',
    title: 'Daily Briefing',
    icon: 'Radio',
    category: 'Broadcast',
    text: "Good morning. Global tech indices moved higher this morning as advancements in high-bandwidth memory chips outpaced quarterly forecasts. Central European markets reported steady manufacturing indices heading into the next fiscal quarter."
  },
  {
    id: 'story',
    title: 'Sci-Fi Narrative',
    icon: 'Sparkles',
    category: 'Creative',
    text: "The neon glow of Neo-Kyoto bled into the relentless midnight rain. Kael pulled up the collar of his coat, his ocular implant blinking amber with an incoming encrypted datastream from an unverified address."
  },
  {
    id: 'keynote',
    title: 'Tech Keynote',
    icon: 'Zap',
    category: 'Presentation',
    text: "We believe technology should feel like an extension of your own senses. Not a barrier, but an instantaneous bridge between visual comprehension and natural spoken expression. This is EchoLens."
  },
  {
    id: 'meditation',
    title: 'Mindful Pause',
    icon: 'Heart',
    category: 'Wellness',
    text: "Take a slow, deep breath in through your nose. Allow your shoulders to drop, releasing the accumulated tension of your day. Breathe out slowly, grounding yourself completely in this present moment."
  }
];

// Helper to generate crisp, high-contrast sample images for OCR testing
export function generateSampleImage(type) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (type === 'receipt') {
    canvas.width = 600;
    canvas.height = 700;
    
    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEXUS COFFEE LAB', 300, 60);
    
    ctx.font = '16px monospace';
    ctx.fillStyle = '#4B5563';
    ctx.fillText('742 Evergreen Terrace, Suite 104', 300, 95);
    ctx.fillText('Order #4092 - Terminal A2', 300, 120);
    ctx.fillText('Date: Nov 18, 2026 - 09:42 AM', 300, 145);
    
    // Divider
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 170);
    ctx.lineTo(560, 170);
    ctx.stroke();
    
    // Items
    ctx.textAlign = 'left';
    ctx.font = 'bold 18px monospace';
    ctx.fillStyle = '#111827';
    
    const items = [
      { name: '1x Oat Milk Cortado', price: '$5.50', y: 220 },
      { name: '1x Single-Origin Pour Over', price: '$6.75', y: 260 },
      { name: '1x Almond Butter Croissant', price: '$4.25', y: 300 },
      { name: '1x Sparkling Mineral Water', price: '$3.50', y: 340 }
    ];
    
    items.forEach(item => {
      ctx.textAlign = 'left';
      ctx.fillText(item.name, 50, item.y);
      ctx.textAlign = 'right';
      ctx.fillText(item.price, 550, item.y);
    });
    
    // Divider
    ctx.beginPath();
    ctx.moveTo(40, 380);
    ctx.lineTo(560, 380);
    ctx.stroke();
    
    // Totals
    ctx.textAlign = 'left';
    ctx.font = '16px monospace';
    ctx.fillText('Subtotal:', 50, 420);
    ctx.textAlign = 'right';
    ctx.fillText('$20.00', 550, 420);
    
    ctx.textAlign = 'left';
    ctx.fillText('State Tax (8.5%):', 50, 450);
    ctx.textAlign = 'right';
    ctx.fillText('$1.70', 550, 450);
    
    ctx.textAlign = 'left';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('TOTAL DUE:', 50, 500);
    ctx.textAlign = 'right';
    ctx.fillText('$21.70', 550, 500);
    
    // Footer
    ctx.textAlign = 'center';
    ctx.font = 'italic 16px sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('Thank you for fueling your ideas with us!', 300, 580);
    ctx.font = '14px monospace';
    ctx.fillText('WiFi: NexusGuest | Pass: artisanal2026', 300, 615);
    
    return canvas.toDataURL('image/png');
  }
  
  if (type === 'quote') {
    canvas.width = 700;
    canvas.height = 450;
    
    // Crisp high-contrast white card for reliable OCR scanning
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Border
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 640, 390);
    
    // Quote mark
    ctx.font = 'bold 72px Georgia, serif';
    ctx.fillStyle = '#0284C7';
    ctx.textAlign = 'left';
    ctx.fillText('“', 60, 110);
    
    // Body Text in high contrast black
    ctx.font = 'bold 24px Georgia, serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText('The most profound technologies are those', 60, 160);
    ctx.fillText('that disappear. They weave themselves into', 60, 205);
    ctx.fillText('the fabric of everyday life until they are', 60, 250);
    ctx.fillText('indistinguishable from it.', 60, 295);
    
    // Author
    ctx.font = 'bold 20px sans-serif';
    ctx.fillStyle = '#0284C7';
    ctx.fillText('— Mark Weiser', 60, 360);
    ctx.font = '15px sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('The Computer for the 21st Century (1991)', 220, 360);
    
    return canvas.toDataURL('image/png');
  }

  // Street / Sign default
  canvas.width = 650;
  canvas.height = 420;
  ctx.fillStyle = '#065F46';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 8;
  ctx.strokeRect(20, 20, 610, 380);
  
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText('INNOVATION WAY', 325, 120);
  
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('NEXT EXIT 1/2 MILE', 325, 190);
  
  ctx.font = '22px sans-serif';
  ctx.fillStyle = '#A7F3D0';
  ctx.fillText('AI Research Campus • Quantum Labs', 325, 270);
  ctx.fillText('Visitor Parking: Follow Signs Ahead', 325, 320);
  
  return canvas.toDataURL('image/png');
}
