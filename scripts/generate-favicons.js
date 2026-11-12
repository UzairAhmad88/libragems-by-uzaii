const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path to raw generated real gemstone photograph
const sourceCandidate = 'C:/Users/Dell/.gemini/antigravity/brain/2aa29747-a771-4713-9b7e-906e4d12baab/real_gem_icon_1794483543328.jpg';
const fallbackCandidate = path.resolve(__dirname, '../apps/web/public/images/branding/real-gem-master.jpg');

function createIcoFromPngs(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * count;

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

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buffer)]);
}

async function extractTransparentGemstone(inputPath) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // 1. Calculate active gemstone bounding box
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (Math.max(r, g, b) > 18) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // 2. Square crop with balanced 4% luxury breathing margin
  const gemW = maxX - minX;
  const gemH = maxY - minY;
  const size = Math.max(gemW, gemH);
  const pad = Math.round(size * 0.04);
  const totalSize = size + pad * 2;
  const centerX = Math.round((minX + maxX) / 2);
  const centerY = Math.round((minY + maxY) / 2);
  const startX = centerX - Math.round(totalSize / 2);
  const startY = centerY - Math.round(totalSize / 2);

  const outBuf = Buffer.alloc(totalSize * totalSize * 4);

  // 3. Smooth unmultiplied alpha extraction (eliminates dark edge halos)
  for (let outY = 0; outY < totalSize; outY++) {
    for (let outX = 0; outX < totalSize; outX++) {
      const srcX = startX + outX;
      const srcY = startY + outY;
      const outIdx = (outY * totalSize + outX) * 4;

      if (srcX < 0 || srcX >= width || srcY < 0 || srcY >= height) {
        outBuf[outIdx] = 0;
        outBuf[outIdx + 1] = 0;
        outBuf[outIdx + 2] = 0;
        outBuf[outIdx + 3] = 0;
        continue;
      }

      const srcIdx = (srcY * width + srcX) * 3;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const brightness = Math.max(r, g, b);

      if (brightness <= 14) {
        outBuf[outIdx] = 0;
        outBuf[outIdx + 1] = 0;
        outBuf[outIdx + 2] = 0;
        outBuf[outIdx + 3] = 0;
      } else if (brightness < 42) {
        const factor = (brightness - 14) / (42 - 14);
        outBuf[outIdx] = Math.min(255, Math.round(r / Math.max(0.1, factor)));
        outBuf[outIdx + 1] = Math.min(255, Math.round(g / Math.max(0.1, factor)));
        outBuf[outIdx + 2] = Math.min(255, Math.round(b / Math.max(0.1, factor)));
        outBuf[outIdx + 3] = Math.round(factor * 255);
      } else {
        outBuf[outIdx] = r;
        outBuf[outIdx + 1] = g;
        outBuf[outIdx + 2] = b;
        outBuf[outIdx + 3] = 255;
      }
    }
  }

  return sharp(outBuf, { raw: { width: totalSize, height: totalSize, channels: 4 } });
}

async function generate() {
  const publicDir = path.resolve(__dirname, '../apps/web/public');
  const appDir = path.resolve(__dirname, '../apps/web/src/app');
  const brandingDir = path.join(publicDir, 'images/branding');

  if (!fs.existsSync(brandingDir)) {
    fs.mkdirSync(brandingDir, { recursive: true });
  }

  const inputPhoto = fs.existsSync(sourceCandidate) ? sourceCandidate : fallbackCandidate;
  if (!fs.existsSync(inputPhoto)) {
    throw new Error(`Real gemstone photograph not found at: ${inputPhoto}`);
  }

  // Preserve raw master photo in branding directory
  const permanentMaster = path.join(brandingDir, 'real-gem-master.jpg');
  if (inputPhoto !== permanentMaster) {
    fs.copyFileSync(inputPhoto, permanentMaster);
  }

  console.log('[favicon] Processing real gemstone photograph with optical transparency...');
  const transparentGem = await extractTransparentGemstone(permanentMaster);

  // Master 512x512 with subtle micro-contrast enhancement for maximum brilliance
  const gem512 = await transparentGem
    .clone()
    .resize(512, 512, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.5 })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(brandingDir, 'real-gem-icon.png'), gem512);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), gem512);

  // 192x192 (PWA Icon)
  const gem192 = await transparentGem
    .clone()
    .resize(192, 192, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), gem192);

  // 180x180 (Apple Touch Icon)
  const gem180 = await transparentGem
    .clone()
    .resize(180, 180, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.3, m2: 0.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), gem180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), gem180);

  // 48x48 (High-DPI Browser Tab Icon)
  const gem48 = await transparentGem
    .clone()
    .resize(48, 48, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.1, m1: 1.8, m2: 0.7 })
    .png()
    .toBuffer();

  // 32x32 (Standard Browser Tab Icon)
  const gem32 = await transparentGem
    .clone()
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.2, m1: 2.0, m2: 0.8 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), gem32);

  // 16x16 (Compact Browser Tab Icon)
  const gem16 = await transparentGem
    .clone()
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.2, m1: 2.2, m2: 0.8 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), gem16);

  console.log('[favicon] Packing multi-resolution Windows ICO (16px, 32px, 48px)...');
  const icoBuffer = createIcoFromPngs([
    { width: 16, height: 16, buffer: gem16 },
    { width: 32, height: 32, buffer: gem32 },
    { width: 48, height: 48, buffer: gem48 },
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('[favicon] Embedding photorealistic real gem into modern vector SVG icon...');
  const base64Data = gem512.toString('base64');
  const realGemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Data}" x="0" y="0" width="512" height="512" preserveAspectRatio="xMidYMid meet" />
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'icon.svg'), realGemSvg, 'utf8');
  fs.writeFileSync(path.join(appDir, 'icon.svg'), realGemSvg, 'utf8');

  console.log('[favicon] Successfully generated all real gemstone icons and favicons!');
}

generate().catch((err) => {
  console.error('[favicon] Error:', err);
  process.exit(1);
});
