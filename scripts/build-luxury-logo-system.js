const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artDir = 'C:/Users/Dell/.gemini/antigravity/brain/2aa29747-a771-4713-9b7e-906e4d12baab';
const brandingDir = path.resolve(__dirname, '../apps/web/public/images/branding');
const publicDir = path.resolve(__dirname, '../apps/web/public');

// Ensure directories exist
fs.mkdirSync(brandingDir, { recursive: true });

// 1. Vector Gemstone Emblem SVG Definition
const VECTOR_GEMSTONE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <!-- Luxury Color Gradients -->
    <linearGradient id="gemGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF6DF" />
      <stop offset="25%" stop-color="#F2DD9F" />
      <stop offset="65%" stop-color="#C5A66A" />
      <stop offset="100%" stop-color="#9E7E43" />
    </linearGradient>
    <linearGradient id="gemGoldDeep" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#6B4F1E" />
      <stop offset="40%" stop-color="#9E7E43" />
      <stop offset="80%" stop-color="#D4B674" />
      <stop offset="100%" stop-color="#FAECCB" />
    </linearGradient>
    <linearGradient id="gemGreenDepth" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E281F" />
      <stop offset="40%" stop-color="#173D30" />
      <stop offset="80%" stop-color="#1F4E3E" />
      <stop offset="100%" stop-color="#0B2018" />
    </linearGradient>
    <linearGradient id="gemTable" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#1B4637" />
      <stop offset="40%" stop-color="#173D30" />
      <stop offset="75%" stop-color="#14372B" />
      <stop offset="100%" stop-color="#0E281F" />
    </linearGradient>
    <linearGradient id="specularLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#FFF8E7" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#C5A66A" stop-opacity="0" />
    </linearGradient>
    <filter id="gemShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.22" />
    </filter>
  </defs>

  <g filter="url(#gemShadow)">
    <!-- Base Octagonal Outer Silhouette (45-degree beveled corners) -->
    <polygon points="28,6 72,6 94,28 94,72 72,94 28,94 6,72 6,28" fill="#0E281F" stroke="#7A5D28" stroke-width="0.75" />

    <!-- Step 1: Outer Crown Facets -->
    <!-- Top Step -->
    <polygon points="28,6 72,6 68,18 32,18" fill="url(#gemGoldLight)" />
    <!-- Bottom Step -->
    <polygon points="28,94 72,94 68,82 32,82" fill="url(#gemGoldDeep)" opacity="0.92" />
    <!-- Left Step -->
    <polygon points="6,28 6,72 18,68 18,32" fill="url(#gemGoldLight)" opacity="0.88" />
    <!-- Right Step -->
    <polygon points="94,28 94,72 82,68 82,32" fill="url(#gemGoldDeep)" opacity="0.95" />
    <!-- Top-Left Corner Cut -->
    <polygon points="6,28 28,6 32,18 18,32" fill="#FFFBF0" />
    <!-- Top-Right Corner Cut -->
    <polygon points="72,6 94,28 82,32 68,18" fill="#E8CE8E" />
    <!-- Bottom-Right Corner Cut -->
    <polygon points="94,72 72,94 68,82 82,68" fill="#806227" />
    <!-- Bottom-Left Corner Cut -->
    <polygon points="28,94 6,72 18,68 32,82" fill="#BFA162" />

    <!-- Step 2: Intermediate Concentric Step Facets (Forest Green Depth) -->
    <!-- Top Step 2 -->
    <polygon points="32,18 68,18 64,28 36,28" fill="#1C4536" />
    <!-- Bottom Step 2 -->
    <polygon points="32,82 68,82 64,72 36,72" fill="#102B20" />
    <!-- Left Step 2 -->
    <polygon points="18,32 18,68 28,64 28,36" fill="#1E4D3D" />
    <!-- Right Step 2 -->
    <polygon points="82,32 82,68 72,64 72,36" fill="#133428" />
    <!-- Corners Step 2 -->
    <polygon points="18,32 32,18 36,28 28,36" fill="#DEC382" />
    <polygon points="68,18 82,32 72,36 64,28" fill="#755823" />
    <polygon points="82,68 68,82 64,72 72,64" fill="#0C241B" />
    <polygon points="18,68 32,82 36,72 28,64" fill="#507868" />

    <!-- Step 3: Crystal Table Facet -->
    <polygon points="36,28 64,28 72,36 72,64 64,72 36,72 28,64 28,36" fill="url(#gemTable)" />

    <!-- Step 4: Inner Concentric Table Step & Pavilion Reflections -->
    <polygon points="41,34 59,34 65,40 65,60 59,66 41,66 35,60 35,40" fill="#13362A" stroke="#C5A66A" stroke-width="0.5" stroke-opacity="0.45" />
    <!-- Center Culet / Brilliant Core -->
    <polygon points="45,42 55,42 58,46 58,54 55,58 45,58 42,54 42,46" fill="#1A4435" />
    <!-- Internal Golden Refraction Ray (Hall of Mirrors) -->
    <polygon points="42,46 58,46 55,42 45,42" fill="#E8D094" opacity="0.75" />
    <polygon points="35,40 41,34 45,42 42,46" fill="#FFF9EB" opacity="0.6" />

    <!-- Specular Light Gleams (Razor-Sharp Daylight Glints) -->
    <line x1="28" y1="6" x2="72" y2="6" stroke="url(#specularLine)" stroke-width="1.3" stroke-linecap="round" />
    <line x1="6" y1="28" x2="28" y2="6" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.95" />
    <line x1="6" y1="28" x2="6" y2="72" stroke="#FFFFFF" stroke-width="0.9" stroke-opacity="0.7" />
    <line x1="36" y1="28" x2="64" y2="28" stroke="#FFFFFF" stroke-width="0.9" stroke-opacity="0.88" />
    <line x1="28" y1="36" x2="36" y2="28" stroke="#FFFFFF" stroke-width="0.9" stroke-opacity="0.95" />
    <line x1="28" y1="36" x2="28" y2="64" stroke="#FFF7E3" stroke-width="0.6" stroke-opacity="0.6" />

    <!-- Master Facet Contour Lines (Champagne Gold Facet Wire) -->
    <polygon points="28,6 72,6 94,28 94,72 72,94 28,94 6,72 6,28" fill="none" stroke="#C5A66A" stroke-width="0.75" opacity="0.85" />
    <polygon points="32,18 68,18 82,32 82,68 68,82 32,82 18,68 18,32" fill="none" stroke="#C5A66A" stroke-width="0.5" opacity="0.7" />
    <polygon points="36,28 64,28 72,36 72,64 64,72 36,72 28,64 28,36" fill="none" stroke="#C5A66A" stroke-width="0.6" opacity="0.75" />
  </g>
</svg>`;

async function run() {
  console.log('=== Step 1: Saving Icon-Only Gemstone Emblems (SVG and PNG) ===');
  
  // Save standalone SVG emblem
  fs.writeFileSync(path.join(brandingDir, 'gemstone-emblem.svg'), VECTOR_GEMSTONE_SVG, 'utf8');
  fs.writeFileSync(path.join(artDir, 'gemstone-emblem.svg'), VECTOR_GEMSTONE_SVG, 'utf8');
  console.log('Saved gemstone-emblem.svg');

  // Convert SVG to 512x512 high-res master PNG
  const svgBuffer = Buffer.from(VECTOR_GEMSTONE_SVG);
  await sharp(svgBuffer, { density: 300 })
    .resize(512, 512)
    .png()
    .toFile(path.join(brandingDir, 'gemstone-emblem-vector.png'));
  console.log('Saved gemstone-emblem-vector.png');

  // Load the photorealistic master emerald cutout
  const photoCutoutPath = path.join(artDir, 'master_emerald_feathered.png');
  const hasPhotoCutout = fs.existsSync(photoCutoutPath);
  console.log('Photo cutout available:', hasPhotoCutout);

  // Resize photorealistic cutout to 512x512 with high-quality Lanczos3
  if (hasPhotoCutout) {
    await sharp(photoCutoutPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .png()
      .toFile(path.join(brandingDir, 'gemstone-emblem.png'));
      
    // Also update real-gem-icon.png for site header
    await sharp(photoCutoutPath)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
      .png()
      .toFile(path.join(brandingDir, 'real-gem-icon.png'));

    console.log('Saved gemstone-emblem.png & updated real-gem-icon.png (512x512 photorealistic)');
  } else {
    // Fallback to vector PNG
    await sharp(svgBuffer, { density: 300 })
      .resize(512, 512)
      .png()
      .toFile(path.join(brandingDir, 'gemstone-emblem.png'));
    await sharp(svgBuffer, { density: 300 })
      .resize(512, 512)
      .png()
      .toFile(path.join(brandingDir, 'real-gem-icon.png'));
    console.log('Saved vector-based gemstone-emblem.png');
  }

  console.log('=== Step 2: Compositing Primary Logo Deliverables ===');
  // Load untouched extracted wordmarks
  const wordmarkOffwhitePath = path.join(artDir, 'wordmark_extracted.png');
  const wordmarkTransparentPath = path.join(artDir, 'wordmark_transparent.png');

  // Target dimensions matching reference: 276 x 67
  // In the reference:
  // Canvas: 276 x 67
  // Icon position: Left: 30, Top: 16..18, Size: 30 x 30
  // Wordmark position: Left: 68, Top: 0, Size: 208 x 67

  // We will build multi-scale resolutions:
  // 1x: 276 x 67
  // 4x: 1104 x 268
  // 8x (Master Hi-Res): 2208 x 536

  // First, create the 4x high-res assets:
  const icon4x = await sharp(photoCutoutPath || path.join(brandingDir, 'gemstone-emblem.png'))
    .resize(124, 124, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const wordmarkOffwhite4x = await sharp(wordmarkOffwhitePath)
    .resize(208 * 4, 67 * 4, { kernel: 'lanczos3' })
    .toBuffer();

  const wordmarkTransparent4x = await sharp(wordmarkTransparentPath)
    .resize(208 * 4, 67 * 4, { kernel: 'lanczos3' })
    .toBuffer();

  // 1. Off-white 4x Logo
  // Canvas: 1104 x 268, background #F5F3EB (RGB 245, 243, 235)
  // Icon at left: 30 * 4 = 120, top: 17 * 4 = 68
  // Wordmark at left: 68 * 4 = 272, top: 0
  const offwhiteLogo4x = await sharp({
    create: {
      width: 1104,
      height: 268,
      channels: 4,
      background: { r: 245, g: 243, b: 235, alpha: 1 }
    }
  })
  .composite([
    { input: icon4x, left: 120, top: 72 },
    { input: wordmarkOffwhite4x, left: 272, top: 0 }
  ])
  .png()
  .toBuffer();

  // Save 4x Off-white
  fs.writeFileSync(path.join(brandingDir, 'libragems-logo-offwhite-4x.png'), offwhiteLogo4x);
  fs.writeFileSync(path.join(artDir, 'libragems-logo-offwhite-4x.png'), offwhiteLogo4x);

  // Generate 1x Off-white: 276 x 67
  await sharp(offwhiteLogo4x)
    .resize(276, 67, { kernel: 'lanczos3' })
    .png()
    .toFile(path.join(brandingDir, 'libragems-logo-offwhite.png'));
  fs.copyFileSync(path.join(brandingDir, 'libragems-logo-offwhite.png'), path.join(artDir, 'libragems-logo-offwhite.png'));
  console.log('Saved libragems-logo-offwhite.png (1x: 276x67) & 4x');

  // 2. Transparent 4x Logo
  const transparentLogo4x = await sharp({
    create: {
      width: 1104,
      height: 268,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    { input: icon4x, left: 120, top: 72 },
    { input: wordmarkTransparent4x, left: 272, top: 0 }
  ])
  .png()
  .toBuffer();

  // Save 4x Transparent
  fs.writeFileSync(path.join(brandingDir, 'libragems-logo-transparent-4x.png'), transparentLogo4x);
  fs.writeFileSync(path.join(artDir, 'libragems-logo-transparent-4x.png'), transparentLogo4x);

  // Generate 1x Transparent: 276 x 67
  await sharp(transparentLogo4x)
    .resize(276, 67, { kernel: 'lanczos3' })
    .png()
    .toFile(path.join(brandingDir, 'libragems-logo-transparent.png'));
  fs.copyFileSync(path.join(brandingDir, 'libragems-logo-transparent.png'), path.join(artDir, 'libragems-logo-transparent.png'));
  console.log('Saved libragems-logo-transparent.png (1x: 276x67) & 4x');

  // 3. High-Resolution Master Logo PNG (8x: 2208 x 536)
  const icon8x = await sharp(photoCutoutPath || path.join(brandingDir, 'gemstone-emblem.png'))
    .resize(248, 248, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const wordmarkOffwhite8x = await sharp(wordmarkOffwhitePath)
    .resize(208 * 8, 67 * 8, { kernel: 'lanczos3' })
    .toBuffer();

  await sharp({
    create: {
      width: 2208,
      height: 536,
      channels: 4,
      background: { r: 245, g: 243, b: 235, alpha: 1 }
    }
  })
  .composite([
    { input: icon8x, left: 240, top: 144 },
    { input: wordmarkOffwhite8x, left: 544, top: 0 }
  ])
  .png()
  .toFile(path.join(brandingDir, 'libragems-logo-master-hires.png'));
  fs.copyFileSync(path.join(brandingDir, 'libragems-logo-master-hires.png'), path.join(artDir, 'libragems-logo-master-hires.png'));
  console.log('Saved libragems-logo-master-hires.png (2208x536 8x Master)');

  console.log('=== Step 3: Generating Vector SVG Complete Logos ===');
  // Read base64 of transparent wordmark for embedded vector SVG version
  const wordmarkTransBase64 = fs.readFileSync(wordmarkTransparentPath).toString('base64');
  
  // Vector SVG with full embedded vector gemstone and pixel-perfect wordmark
  const fullLogoSvgTransparent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 67" width="276" height="67">
  <!-- Master Gemstone Emblem (Octagonal Step Cut) -->
  <g transform="translate(30, 17) scale(0.31)">
    ${VECTOR_GEMSTONE_SVG.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
  <!-- Untouched Reference Wordmark -->
  <image href="data:image/png;base64,${wordmarkTransBase64}" x="68" y="0" width="208" height="67" />
</svg>`;

  fs.writeFileSync(path.join(brandingDir, 'libragems-logo.svg'), fullLogoSvgTransparent, 'utf8');
  fs.writeFileSync(path.join(artDir, 'libragems-logo.svg'), fullLogoSvgTransparent, 'utf8');

  // Off-white background version
  const fullLogoSvgOffwhite = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 276 67" width="276" height="67">
  <rect width="100%" height="100%" fill="#F5F3EB" />
  <!-- Master Gemstone Emblem (Octagonal Step Cut) -->
  <g transform="translate(30, 17) scale(0.31)">
    ${VECTOR_GEMSTONE_SVG.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
  <!-- Untouched Reference Wordmark -->
  <image href="data:image/png;base64,${wordmarkTransBase64}" x="68" y="0" width="208" height="67" />
</svg>`;

  fs.writeFileSync(path.join(brandingDir, 'libragems-logo-offwhite.svg'), fullLogoSvgOffwhite, 'utf8');
  fs.writeFileSync(path.join(artDir, 'libragems-logo-offwhite.svg'), fullLogoSvgOffwhite, 'utf8');
  console.log('Saved libragems-logo.svg & libragems-logo-offwhite.svg');

  console.log('=== Step 4: Generating Updated Favicons ===');
  // Favicons using the new master emerald gemstone:
  // 16x16, 32x32, 48x48, 180x180 (apple touch)
  const masterIconBuffer = await sharp(photoCutoutPath || path.join(brandingDir, 'gemstone-emblem.png'))
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const fav16 = await sharp(masterIconBuffer).resize(16, 16).png().toBuffer();
  const fav32 = await sharp(masterIconBuffer).resize(32, 32).png().toBuffer();
  const fav48 = await sharp(masterIconBuffer).resize(48, 48).png().toBuffer();
  const apple180 = await sharp(masterIconBuffer)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 23, g: 61, b: 48, alpha: 1 } // Dark Forest Green background for Apple touch icon
    })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), fav16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), fav32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), apple180);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), VECTOR_GEMSTONE_SVG, 'utf8');

  // Build a true multi-resolution .ico file
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(3, 4); // Number of images = 3 (16, 32, 48)

  const entries = [
    { w: 16, h: 16, buf: fav16 },
    { w: 32, h: 32, buf: fav32 },
    { w: 48, h: 48, buf: fav48 }
  ];

  let offset = 6 + (16 * entries.length);
  const dirBuffers = [];
  const imgBuffers = [];

  for (const entry of entries) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(entry.w === 256 ? 0 : entry.w, 0);
    dir.writeUInt8(entry.h === 256 ? 0 : entry.h, 1);
    dir.writeUInt8(0, 2); // Colors
    dir.writeUInt8(0, 3); // Reserved
    dir.writeUInt16LE(1, 4); // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel
    dir.writeUInt32LE(entry.buf.length, 8); // Size of image data
    dir.writeUInt32LE(offset, 12); // Offset of image data
    dirBuffers.push(dir);
    imgBuffers.push(entry.buf);
    offset += entry.buf.length;
  }

  const icoBuffer = Buffer.concat([icoHeader, ...dirBuffers, ...imgBuffers]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Saved updated favicon.ico, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, icon.svg');

  console.log('=== All deliverables generated successfully! ===');
}

run().catch(err => {
  console.error('Error in build script:', err);
  process.exit(1);
});
