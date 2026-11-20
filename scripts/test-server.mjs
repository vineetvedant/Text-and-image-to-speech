import http from 'node:http';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';

const distDir = resolve('dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  
  if (urlPath.endsWith('/')) {
    urlPath += 'index.html';
  }

  let filePath = resolve(distDir, '.' + urlPath);

  // If path doesn't exist, check for .html or directory index.html
  if (!existsSync(filePath)) {
    if (existsSync(filePath + '.html')) {
      filePath += '.html';
    } else if (existsSync(resolve(filePath, 'index.html'))) {
      filePath = resolve(filePath, 'index.html');
    } else {
      // SPA fallback
      filePath = resolve(distDir, 'index.html');
    }
  }

  try {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
    }
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    const content = readFileSync(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(404);
    res.end('Not Found: ' + err.message);
  }
});

server.listen(4173, async () => {
  console.log('Static test server listening on http://localhost:4173');
  
  const endpoints = [
    { path: '/', expectedStatus: 200, expectedText: 'Free Online Text to Speech Reader' },
    { path: '/image-to-voice', expectedStatus: 200, expectedText: 'Image to Speech & Free Online OCR Reader' },
    { path: '/robots.txt', expectedStatus: 200, expectedText: 'Sitemap: https://voice.sshconnect.space/sitemap.xml' },
    { path: '/sitemap.xml', expectedStatus: 200, expectedText: '<loc>https://voice.sshconnect.space/image-to-voice</loc>' },
    { path: '/site.webmanifest', expectedStatus: 200, expectedText: 'Voice Studio' }
  ];

  let allSuccess = true;

  for (const ep of endpoints) {
    try {
      const response = await fetch(`http://localhost:4173${ep.path}`);
      const text = await response.text();
      const statusOk = response.status === ep.expectedStatus;
      const textOk = text.includes(ep.expectedText);

      if (statusOk && textOk) {
        console.log(`  ✓ GET ${ep.path} -> HTTP ${response.status} (Verified content)`);
      } else {
        console.error(`  ✗ GET ${ep.path} failed! Status: ${response.status}, matched text: ${textOk}`);
        allSuccess = false;
      }
    } catch (err) {
      console.error(`  ✗ GET ${ep.path} error: ${err.message}`);
      allSuccess = false;
    }
  }

  server.close(() => {
    if (allSuccess) {
      console.log('\nAll server endpoint checks passed with zero errors.');
    } else {
      console.error('\nSome server endpoint checks failed.');
      process.exitCode = 1;
    }
  });
});
