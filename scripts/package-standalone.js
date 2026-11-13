#!/usr/bin/env node

/**
 * Deterministic Post-Build Packaging Script for Hostinger & Standalone Node.js Deployments
 * 
 * Prepares apps/web/.next/standalone as a complete, self-contained production bundle:
 * 1. server.js (standalone server entrypoint)
 * 2. public/ (brand assets, logos, favicon, robots.txt, sitemap, etc.)
 * 3. .next/static/ (client JS bundles, CSS stylesheets, media)
 * 4. node_modules/ (complete production runtime dependencies including Next.js, React, Supabase, Resend)
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const webDir = path.join(repoRoot, 'apps', 'web');
const nextDir = path.join(webDir, '.next');
const standaloneDir = path.join(nextDir, 'standalone');
const publicSrc = path.join(webDir, 'public');
const publicDest = path.join(standaloneDir, 'public');
const staticSrc = path.join(nextDir, 'static');
const staticDest = path.join(standaloneDir, '.next', 'static');
const standaloneNodeModules = path.join(standaloneDir, 'node_modules');
const rootNodeModules = path.join(repoRoot, 'node_modules');
const webNodeModules = path.join(webDir, 'node_modules');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('[package-standalone] Starting Hostinger standalone distribution packaging...');

if (!fs.existsSync(standaloneDir)) {
  console.error('[package-standalone] Error: Standalone output directory not found at: ' + standaloneDir);
  console.error('[package-standalone] Ensure next.config.ts has output: "standalone" and build succeeded.');
  process.exit(1);
}

// 1. Copy public directory to standalone root
if (fs.existsSync(publicSrc)) {
  console.log('[package-standalone] Copying public assets -> standalone/public...');
  copyRecursiveSync(publicSrc, publicDest);
} else {
  console.warn('[package-standalone] Warning: public directory not found at: ' + publicSrc);
}

// 2. Copy .next/static directory to standalone/.next/static
if (fs.existsSync(staticSrc)) {
  console.log('[package-standalone] Copying .next/static -> standalone/.next/static...');
  copyRecursiveSync(staticSrc, staticDest);
} else {
  console.warn('[package-standalone] Warning: .next/static directory not found at: ' + staticSrc);
}

// 3. Populate standalone/node_modules deterministically from installed dependencies
console.log('[package-standalone] Populating runtime dependencies in standalone/node_modules...');
fs.mkdirSync(standaloneNodeModules, { recursive: true });

// Production packages required by Next.js minimal server and Libra Gems application
const runtimePackages = [
  'next',
  'react',
  'react-dom',
  'styled-jsx',
  '@next',
  '@swc',
  '@img',
  '@supabase',
  '@stablelib',
  'resend',
  'nodemailer',
  'zod',
  'clsx',
  'tailwind-merge',
  'lucide-react',
  'sharp',
  'scheduler',
  'client-only',
  'cookie',
  'fast-sha256',
  'iceberg-js',
  'postal-mime',
  'standardwebhooks',
  'nanoid',
  'picocolors',
  'source-map-js',
  'streamsearch',
  'busboy',
  'caniuse-lite',
  'tslib',
  'color',
  'color-convert',
  'color-name',
  'color-string',
  'detect-libc',
  'is-arrayish',
  'simple-swizzle',
  'postcss',
];

for (const pkg of runtimePackages) {
  const destPath = path.join(standaloneNodeModules, pkg);
  
  // Search order: root node_modules first, then apps/web/node_modules
  const candidateRoot = path.join(rootNodeModules, pkg);
  const candidateWeb = path.join(webNodeModules, pkg);

  const sourcePath = fs.existsSync(candidateRoot)
    ? candidateRoot
    : fs.existsSync(candidateWeb)
    ? candidateWeb
    : null;

  if (sourcePath) {
    copyRecursiveSync(sourcePath, destPath);
  }
}

// 4. Ensure no corrupted duplicate 'next' remains in apps/web/node_modules
const webNextDir = path.join(webNodeModules, 'next');
if (fs.existsSync(webNextDir)) {
  try {
    fs.rmSync(webNextDir, { recursive: true, force: true });
  } catch {
    // Ignore cleanup warnings
  }
}

// 5. Validate runtime dependency resolution from standalone directory
try {
  const resolvedNext = require.resolve('next', { paths: [standaloneDir] });
  console.log(`[package-standalone] ✓ Runtime dependency "next" successfully resolved from standalone: ${resolvedNext}`);
} catch (err) {
  console.error('[package-standalone] ✗ Critical error: Cannot resolve "next" from standalone directory:', err);
  process.exit(1);
}

try {
  const resolvedReact = require.resolve('react', { paths: [standaloneDir] });
  console.log(`[package-standalone] ✓ Runtime dependency "react" successfully resolved from standalone: ${resolvedReact}`);
} catch (err) {
  console.error('[package-standalone] ✗ Critical error: Cannot resolve "react" from standalone directory:', err);
  process.exit(1);
}

try {
  const resolvedSupabase = require.resolve('@supabase/supabase-js', { paths: [standaloneDir] });
  console.log(`[package-standalone] ✓ Runtime dependency "@supabase/supabase-js" resolved from standalone: ${resolvedSupabase}`);
} catch (err) {
  console.error('[package-standalone] ✗ Critical error: Cannot resolve "@supabase/supabase-js" from standalone directory:', err);
  process.exit(1);
}

try {
  const resolvedNodemailer = require.resolve('nodemailer', { paths: [standaloneDir] });
  console.log(`[package-standalone] ✓ Runtime dependency "nodemailer" resolved from standalone: ${resolvedNodemailer}`);
} catch (err) {
  console.error('[package-standalone] ✗ Critical error: Cannot resolve "nodemailer" from standalone directory:', err);
  process.exit(1);
}

console.log('[package-standalone] ✓ Standalone production package is fully prepared and self-contained.');
