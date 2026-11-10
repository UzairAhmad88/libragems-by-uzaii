-- ==============================================================================
-- Migration: 20261110000004_storage_policies.sql
-- Description: Storage Bucket Creation and Row Level Security for Gemstone Media
-- Author: Principal Database & Security Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Create the 'gemstone-images' storage bucket if it does not exist
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gemstone-images',
  'gemstone-images',
  true,
  10485760, -- 10MB limit per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- ------------------------------------------------------------------------------
-- 2. Storage RLS Policies on storage.objects
-- ------------------------------------------------------------------------------

-- Public read access to all images in the 'gemstone-images' bucket
CREATE POLICY "Public can view gemstone images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'gemstone-images');

-- Admins and product managers can upload images to 'gemstone-images'
CREATE POLICY "Admins can upload gemstone images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );

-- Admins and product managers can update images in 'gemstone-images'
CREATE POLICY "Admins can update gemstone images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  )
  WITH CHECK (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );

-- Admins and product managers can delete images from 'gemstone-images'
CREATE POLICY "Admins can delete gemstone images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'gemstone-images' 
    AND public.has_role('super_admin', 'administrator', 'product_manager')
  );
