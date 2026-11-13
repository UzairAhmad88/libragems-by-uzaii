const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ultra-Premium Gemstone Icon — Master Brilliant Cut Architecture
// Transparent background, luminous champagne gold facets (#FFF8E7, #C5A66A, #9E752D, #543A0A),
// with high-contrast facet lines and specular diamond fire.
const premiumGemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Facet Gradients for Optical Brilliance & Total Internal Reflection -->
    <linearGradient id="tableSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#FFF5DE" />
      <stop offset="70%" stop-color="#EED7A1" />
      <stop offset="100%" stop-color="#D4B26F" />
    </linearGradient>

    <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#FCECC7" />
      <stop offset="100%" stop-color="#DEB86C" />
    </linearGradient>

    <linearGradient id="facetGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7" />
      <stop offset="50%" stop-color="#E5C57E" />
      <stop offset="100%" stop-color="#C5A66A" />
    </linearGradient>

    <linearGradient id="facetGoldMid" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D8B266" />
      <stop offset="50%" stop-color="#B88F44" />
      <stop offset="100%" stop-color="#9E752D" />
    </linearGradient>

    <linearGradient id="facetGoldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A47D32" />
      <stop offset="50%" stop-color="#7A5818" />
      <stop offset="100%" stop-color="#543A0A" />
    </linearGradient>

    <linearGradient id="pavilionCenter" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D1" />
      <stop offset="40%" stop-color="#DEB768" />
      <stop offset="85%" stop-color="#B28838" />
      <stop offset="100%" stop-color="#6E4F14" />
    </linearGradient>

    <linearGradient id="pavilionDeepL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C772F" />
      <stop offset="60%" stop-color="#6B4D13" />
      <stop offset="100%" stop-color="#3D2905" />
    </linearGradient>

    <linearGradient id="pavilionDeepR" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#B89045" />
      <stop offset="60%" stop-color="#785517" />
      <stop offset="100%" stop-color="#422D07" />
    </linearGradient>

    <filter id="gemGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.30" />
    </filter>
  </defs>

  <!-- Transparent Background: Floating gemstone for crystal-clear browser tabs -->
  <g filter="url(#gemGlow)">
    <!-- Crown Table -->
    <polygon points="156,92 356,92 408,168 408,204 356,236 156,236 104,204 104,168" fill="url(#tableSparkle)" stroke="#805B16" stroke-width="2.5" />

    <!-- Crown Star & Kite Facets -->
    <polygon points="156,92 356,92 396,44 116,44" fill="url(#facetHighlight)" stroke="#9E752D" stroke-width="2.5" />
    <polygon points="356,92 408,168 468,110 396,44" fill="url(#facetGoldLight)" stroke="#8A631E" stroke-width="2.5" />
    <polygon points="156,92 104,168 44,110 116,44" fill="#FFFDF5" stroke="#9E752D" stroke-width="2.5" />

    <!-- Girdle Upper Facets -->
    <polygon points="104,168 104,204 28,196 44,110" fill="url(#facetGoldMid)" stroke="#7A5515" stroke-width="2.5" />
    <polygon points="408,168 408,204 484,196 468,110" fill="url(#facetGoldDeep)" stroke="#593C07" stroke-width="2.5" />

    <!-- Girdle Side Bevels -->
    <polygon points="104,204 156,236 96,256 28,196" fill="url(#facetGoldDeep)" stroke="#593C07" stroke-width="2.5" />
    <polygon points="408,204 356,236 416,256 484,196" fill="#4A3105" stroke="#3D2703" stroke-width="2.5" />

    <!-- Lower Crown Triangles -->
    <polygon points="156,236 256,256 96,256" fill="url(#facetGoldLight)" stroke="#8A631E" stroke-width="2.5" />
    <polygon points="356,236 256,256 416,256" fill="url(#facetGoldMid)" stroke="#704E12" stroke-width="2.5" />
    <polygon points="156,236 356,236 256,256" fill="#FFF6DC" stroke="#8A631E" stroke-width="2.5" />

    <!-- Girdle Edge Line -->
    <polygon points="28,196 96,256 416,256 484,196 416,260 96,260" fill="#6B4A0E" />

    <!-- Pavilion Facets (Tapering from girdle down to culet at 256, 474) -->
    <polygon points="28,196 96,260 256,474" fill="url(#pavilionDeepL)" stroke="#3D2703" stroke-width="2.5" />
    <polygon points="96,260 176,260 256,474" fill="url(#facetGoldLight)" stroke="#7A5515" stroke-width="2.5" />
    <polygon points="176,260 256,260 256,474" fill="url(#pavilionCenter)" stroke="#8A631E" stroke-width="2.5" />
    <polygon points="256,260 336,260 256,474" fill="url(#facetGoldMid)" stroke="#704E12" stroke-width="2.5" />
    <polygon points="336,260 416,260 256,474" fill="url(#pavilionDeepR)" stroke="#593C07" stroke-width="2.5" />
    <polygon points="416,260 484,196 256,474" fill="#3D2703" stroke="#2B1A02" stroke-width="2.5" />

    <!-- Specular Sparkle Glints -->
    <g transform="translate(196, 126)">
      <polygon points="0,-32 7,-8 32,0 7,7 0,32 -8,7 -32,0 -8,-8" fill="#FFFFFF" opacity="0.95" />
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
      <circle cx="0" cy="0" r="16" fill="#FFFFFF" opacity="0.35" />
    </g>

    <g transform="translate(346, 108)">
      <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="#FFFFFF" opacity="0.8" />
      <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
    </g>

    <circle cx="256" cy="470" r="4" fill="#FFFFFF" opacity="0.9" />
  </g>
</svg>`;

// Helper to build a valid multi-resolution ICO file (16, 32, 48)
function createIcoFromPngs(pngBuffers) {
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
  const brandingDir = path.join(publicDir, 'images/branding');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(brandingDir)) fs.mkdirSync(brandingDir, { recursive: true });

  console.log('[favicon] Writing master vector SVG files...');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), premiumGemSvg, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), premiumGemSvg, 'utf8');
  fs.writeFileSync(path.join(brandingDir, 'gemstone-emblem.svg'), premiumGemSvg, 'utf8');

  console.log('[favicon] Generating crisp multi-resolution PNGs with Lanczos3 resampling...');
  const svgBuffer = Buffer.from(premiumGemSvg);

  const png16 = await sharp(svgBuffer, { density: 300 }).resize(16, 16, { kernel: 'lanczos3' }).png().toBuffer();
  const png32 = await sharp(svgBuffer, { density: 300 }).resize(32, 32, { kernel: 'lanczos3' }).png().toBuffer();
  const png48 = await sharp(svgBuffer, { density: 300 }).resize(48, 48, { kernel: 'lanczos3' }).png().toBuffer();
  const png180 = await sharp(svgBuffer, { density: 300 }).resize(180, 180, { kernel: 'lanczos3' }).png().toBuffer();
  const png192 = await sharp(svgBuffer, { density: 300 }).resize(192, 192, { kernel: 'lanczos3' }).png().toBuffer();
  const png512 = await sharp(svgBuffer, { density: 300 }).resize(512, 512, { kernel: 'lanczos3' }).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);

  // High-res branding deliverables
  fs.writeFileSync(path.join(brandingDir, 'gemstone-emblem.png'), png512);
  fs.writeFileSync(path.join(brandingDir, 'gemstone-emblem-vector.png'), png512);
  fs.writeFileSync(path.join(brandingDir, 'real-gem-icon.png'), png512);

  console.log('[favicon] Assembling multi-size favicon.ico (16px, 32px, 48px)...');
  const icoBuffer = createIcoFromPngs([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('[favicon] Successfully built all transparent golden gemstone favicons and tab icons!');
}

generate().catch(err => {
  console.error('[favicon] Build error:', err);
  process.exit(1);
});
