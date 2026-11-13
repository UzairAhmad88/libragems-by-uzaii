const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brandingDir = path.resolve(__dirname, '../apps/web/public/images/branding');

// Master Brilliant Golden Gemstone Symbol
const GOLDEN_GEM_EMBLEM = `<g transform="translate(30, 18) scale(0.06)">
  <defs>
    <linearGradient id="emblemTable" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#FFF5DE" />
      <stop offset="70%" stop-color="#EED7A1" />
      <stop offset="100%" stop-color="#D4B26F" />
    </linearGradient>

    <linearGradient id="emblemHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#FCECC7" />
      <stop offset="100%" stop-color="#DEB86C" />
    </linearGradient>

    <linearGradient id="emblemGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7" />
      <stop offset="50%" stop-color="#E5C57E" />
      <stop offset="100%" stop-color="#C5A66A" />
    </linearGradient>

    <linearGradient id="emblemGoldMid" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D8B266" />
      <stop offset="50%" stop-color="#B88F44" />
      <stop offset="100%" stop-color="#9E752D" />
    </linearGradient>

    <linearGradient id="emblemGoldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A47D32" />
      <stop offset="50%" stop-color="#7A5818" />
      <stop offset="100%" stop-color="#543A0A" />
    </linearGradient>

    <linearGradient id="emblemPavilionCenter" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D1" />
      <stop offset="40%" stop-color="#DEB768" />
      <stop offset="85%" stop-color="#B28838" />
      <stop offset="100%" stop-color="#6E4F14" />
    </linearGradient>

    <linearGradient id="emblemPavilionDeepL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C772F" />
      <stop offset="60%" stop-color="#6B4D13" />
      <stop offset="100%" stop-color="#3D2905" />
    </linearGradient>

    <linearGradient id="emblemPavilionDeepR" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#B89045" />
      <stop offset="60%" stop-color="#785517" />
      <stop offset="100%" stop-color="#422D07" />
    </linearGradient>
  </defs>

  <!-- Crown Table -->
  <polygon points="156,92 356,92 408,168 408,204 356,236 156,236 104,204 104,168" fill="url(#emblemTable)" stroke="#805B16" stroke-width="3" />

  <!-- Crown Star & Kite Facets -->
  <polygon points="156,92 356,92 396,44 116,44" fill="url(#emblemHighlight)" stroke="#9E752D" stroke-width="3" />
  <polygon points="356,92 408,168 468,110 396,44" fill="url(#emblemGoldLight)" stroke="#8A631E" stroke-width="3" />
  <polygon points="156,92 104,168 44,110 116,44" fill="#FFFDF5" stroke="#9E752D" stroke-width="3" />

  <!-- Girdle Upper Facets -->
  <polygon points="104,168 104,204 28,196 44,110" fill="url(#emblemGoldMid)" stroke="#7A5515" stroke-width="3" />
  <polygon points="408,168 408,204 484,196 468,110" fill="url(#emblemGoldDeep)" stroke="#593C07" stroke-width="3" />

  <!-- Girdle Side Bevels -->
  <polygon points="104,204 156,236 96,256 28,196" fill="url(#emblemGoldDeep)" stroke="#593C07" stroke-width="3" />
  <polygon points="408,204 356,236 416,256 484,196" fill="#4A3105" stroke="#3D2703" stroke-width="3" />

  <!-- Lower Crown Triangles -->
  <polygon points="156,236 256,256 96,256" fill="url(#emblemGoldLight)" stroke="#8A631E" stroke-width="3" />
  <polygon points="356,236 256,256 416,256" fill="url(#emblemGoldMid)" stroke="#704E12" stroke-width="3" />
  <polygon points="156,236 356,236 256,256" fill="#FFF6DC" stroke="#8A631E" stroke-width="3" />

  <!-- Girdle Edge Line -->
  <polygon points="28,196 96,256 416,256 484,196 416,260 96,260" fill="#6B4A0E" />

  <!-- Pavilion Facets -->
  <polygon points="28,196 96,260 256,474" fill="url(#emblemPavilionDeepL)" stroke="#3D2703" stroke-width="3" />
  <polygon points="96,260 176,260 256,474" fill="url(#emblemGoldLight)" stroke="#7A5515" stroke-width="3" />
  <polygon points="176,260 256,260 256,474" fill="url(#emblemPavilionCenter)" stroke="#8A631E" stroke-width="3" />
  <polygon points="256,260 336,260 256,474" fill="url(#emblemGoldMid)" stroke="#704E12" stroke-width="3" />
  <polygon points="336,260 416,260 256,474" fill="url(#emblemPavilionDeepR)" stroke="#593C07" stroke-width="3" />
  <polygon points="416,260 484,196 256,474" fill="#3D2703" stroke="#2B1A02" stroke-width="3" />

  <!-- Sparkle Glints -->
  <g transform="translate(196, 126)">
    <polygon points="0,-32 7,-8 32,0 7,7 0,32 -8,7 -32,0 -8,-8" fill="#FFFFFF" opacity="0.95" />
    <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
  </g>
  <g transform="translate(346, 108)">
    <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="#FFFFFF" opacity="0.8" />
    <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
  </g>
  <circle cx="256" cy="470" r="4" fill="#FFFFFF" opacity="0.9" />
</g>`;

// Wordmark embedded base64 from reference
const rawSvg = fs.readFileSync(path.join(brandingDir, 'libragems-logo.svg'), 'utf8');
const wordmarkMatch = rawSvg.match(/<image[^>]*x="68"[^>]*\/>/);
const wordmarkTag = wordmarkMatch ? wordmarkMatch[0] : '';

// 1. Transparent SVG
const transparentLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 67" width="276" height="67">
  ${GOLDEN_GEM_EMBLEM}
  ${wordmarkTag}
</svg>`;

// 2. Off-White SVG (Theme background #FAF9F4)
const offwhiteLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 67" width="276" height="67">
  <rect width="276" height="67" fill="#FAF9F4" />
  ${GOLDEN_GEM_EMBLEM}
  ${wordmarkTag}
</svg>`;

async function build() {
  fs.writeFileSync(path.join(brandingDir, 'libragems-logo.svg'), transparentLogoSvg, 'utf8');
  fs.writeFileSync(path.join(brandingDir, 'libragems-logo-offwhite.svg'), offwhiteLogoSvg, 'utf8');

  // Rasterize 1x, 4x, 8x
  const tBuffer = Buffer.from(transparentLogoSvg);
  const oBuffer = Buffer.from(offwhiteLogoSvg);

  await sharp(tBuffer).resize(276, 67).png().toFile(path.join(brandingDir, 'libragems-logo-transparent.png'));
  await sharp(tBuffer).resize(1104, 268).png().toFile(path.join(brandingDir, 'libragems-logo-transparent-4x.png'));
  await sharp(tBuffer).resize(2208, 536).png().toFile(path.join(brandingDir, 'libragems-logo-master-hires.png'));

  await sharp(oBuffer).resize(276, 67).png().toFile(path.join(brandingDir, 'libragems-logo-offwhite.png'));
  await sharp(oBuffer).resize(1104, 268).png().toFile(path.join(brandingDir, 'libragems-logo-offwhite-4x.png'));

  console.log('[logo] Successfully synced brand logo system with brilliant golden gemstone!');
}

build().catch(console.error);

