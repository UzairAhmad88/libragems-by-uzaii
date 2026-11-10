-- ==============================================================================
-- Migration: 20261110000007_storage_hardening.sql
-- Description: Phase 07 Storage Security Hardening & SVG XSS Prevention
-- Author: Senior Application Security Engineer & Supabase Specialist
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Restrict gemstone-images bucket to safe, non-executable raster image types
-- Eliminates Stored XSS attack vectors via uploaded active SVG content.
-- Static SVG gemstone facets and diagrams remain securely served from /public/
-- ------------------------------------------------------------------------------
UPDATE storage.buckets
SET 
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'],
  file_size_limit = 10485760 -- 10MB limit per photo
WHERE id = 'gemstone-images';

-- If bucket does not exist yet, insert with safe raster-only MIME types
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gemstone-images',
  'gemstone-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'],
  file_size_limit = 10485760;

