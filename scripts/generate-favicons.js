const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Create the master SVG icon with crisp vector geometry
// Deep Forest Green background (#102C23) with Champagne Gold (#C5A66A) faceted gem
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#173D30" />
      <stop offset="100%" stop-color="#0B2019" />
    </linearGradient>

    <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3D4" />
      <stop offset="100%" stop-color="#E5C57E" />
    </linearGradient>

    <linearGradient id="goldMid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5C57E" />
      <stop offset="100%" stop-color="#C5A66A" />
    </linearGradient>

    <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#B8944F" />
      <stop offset="100%" stop-color="#8F6E2E" />
    </linearGradient>

    <linearGradient id="goldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7D5F23" />
      <stop offset="100%" stop-color="#5C4516" />
    </linearGradient>

    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Squircle Base for modern app/tab icon -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="14" y="14" width="484" height="484" rx="98" fill="none" stroke="#C5A66A" stroke-width="6" stroke-opacity="0.28" />

  <!-- Faceted Brilliant Gemstone Motif -->
  <g filter="url(#subtleShadow)">
    <!-- Crown Table (Top flat octagonal table) -->
    <polygon points="176,128 336,128 384,188 384,212 336,252 176,252 128,212 128,188" fill="url(#goldLight)" />

    <!-- Crown Upper Star & Kite Facets -->
    <!-- Top center kite/trapezoid -->
    <polygon points="176,128 336,128 368,88 144,88" fill="#FFF8E7" />
    <!-- Top-right corner triangle -->
    <polygon points="336,128 384,188 424,124 368,88" fill="url(#goldMid)" />
    <!-- Top-left corner triangle -->
    <polygon points="176,128 128,188 88,124 144,88" fill="#FFF3D4" />

    <!-- Girdle Facets (Mid band) -->
    <polygon points="128,188 128,212 76,212 88,124" fill="url(#goldMid)" />
    <polygon points="384,188 384,212 436,212 424,124" fill="url(#goldDark)" />

    <!-- Lower Crown Triangles to Table -->
    <polygon points="128,212 176,252 136,268 76,212" fill="url(#goldDark)" />
    <polygon points="384,212 336,252 376,268 436,212" fill="url(#goldDeep)" />
    <polygon points="176,252 336,252 376,268 136,268" fill="url(#goldMid)" />

    <!-- Pavilion / Lower Point (Facet cone tapering down to culet point at 256, 424) -->
    <!-- Center main pavilion facet -->
    <polygon points="196,268 316,268 256,424" fill="url(#goldLight)" />
    <!-- Left-center pavilion facet -->
    <polygon points="136,268 196,268 256,424" fill="url(#goldMid)" />
    <!-- Right-center pavilion facet -->
    <polygon points="316,268 376,268 256,424" fill="url(#goldDark)" />
    <!-- Far-left pavilion facet -->
    <polygon points="76,212 136,268 256,424" fill="#9E7E3C" />
    <!-- Far-right pavilion facet -->
    <polygon points="436,212 376,268 256,424" fill="url(#goldDeep)" />

    <!-- Pure Light Reflection Sparkle / Highlight -->
    <circle cx="216" cy="168" r="16" fill="#FFFFFF" fill-opacity="0.85" />
    <circle cx="296" cy="188" r="10" fill="#FFFFFF" fill-opacity="0.55" />
    <polygon points="216,140 220,168 248,168 224,176 232,204 216,182 200,204 208,176 184,168 212,168" fill="#FFFFFF" fill-opacity="0.75" />
  </g>
</svg>`;

// Helper function to build a valid ICO file from PNG buffer
function createIcoFromPngs(pngBuffers) {
  // pngBuffers: Array of { width, height, buffer }
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + (count * dirEntrySize);

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function generate() {
  const publicDir = path.resolve(__dirname, '../apps/web/public');
  const appDir = path.resolve(__dirname, '../apps/web/src/app');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('[favicon] Writing SVG files...');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), svgContent, 'utf8');

  console.log('[favicon] Rendering PNG variants...');
  const png16 = await sharp(Buffer.from(svgContent)).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(svgContent)).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(svgContent)).resize(48, 48).png().toBuffer();
  const png180 = await sharp(Buffer.from(svgContent)).resize(180, 180).png().toBuffer();
  const png192 = await sharp(Buffer.from(svgContent)).resize(192, 192).png().toBuffer();
  const png512 = await sharp(Buffer.from(svgContent)).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  // Next.js App Router icons
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);

  console.log('[favicon] Generating multi-size favicon.ico (16, 32, 48)...');
  const icoBuffer = createIcoFromPngs([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('[favicon] Successfully generated all favicon and tab icon assets!');
}

generate().catch(err => {
  console.error('[favicon] Error:', err);
  process.exit(1);
});

