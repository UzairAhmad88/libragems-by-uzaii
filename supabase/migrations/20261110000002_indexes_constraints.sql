-- ==============================================================================
-- Migration: 20261110000002_indexes_constraints.sql
-- Description: Performance Indexes and Integrity Constraints
-- Author: Principal Database Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Indexes on gemstone_categories
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_gemstone_categories_active_order 
  ON public.gemstone_categories (display_order ASC) 
  WHERE is_active = true;

-- ------------------------------------------------------------------------------
-- 2. Indexes on gemstones
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_gemstones_category_id 
  ON public.gemstones (category_id);

CREATE INDEX IF NOT EXISTS idx_gemstones_published_display 
  ON public.gemstones (display_order ASC, created_at DESC) 
  WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_gemstones_availability 
  ON public.gemstones (availability_status);

CREATE INDEX IF NOT EXISTS idx_gemstones_featured 
  ON public.gemstones (display_order ASC) 
  WHERE is_featured = true AND is_published = true;

-- Search index using English full text search
CREATE INDEX IF NOT EXISTS idx_gemstones_search 
  ON public.gemstones 
  USING gin(to_tsvector('english', coalesce(name, '') || ' ' || coalesce(variety, '') || ' ' || coalesce(species, '') || ' ' || coalesce(origin_country, '') || ' ' || coalesce(short_description, '')));

-- ------------------------------------------------------------------------------
-- 3. Indexes on gemstone_images
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_gemstone_images_gemstone_id 
  ON public.gemstone_images (gemstone_id);

CREATE INDEX IF NOT EXISTS idx_gemstone_images_display 
  ON public.gemstone_images (gemstone_id, display_order ASC);

CREATE INDEX IF NOT EXISTS idx_gemstone_images_primary 
  ON public.gemstone_images (gemstone_id) 
  WHERE is_primary = true;

-- ------------------------------------------------------------------------------
-- 4. Indexes on enquiries
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_enquiries_status_created 
  ON public.enquiries (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_enquiries_priority 
  ON public.enquiries (priority);

CREATE INDEX IF NOT EXISTS idx_enquiries_gemstone_id 
  ON public.enquiries (gemstone_id);

CREATE INDEX IF NOT EXISTS idx_enquiries_assigned_to 
  ON public.enquiries (assigned_to);

CREATE INDEX IF NOT EXISTS idx_enquiries_email 
  ON public.enquiries (email);

CREATE INDEX IF NOT EXISTS idx_enquiries_created_at_desc 
  ON public.enquiries (created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. Indexes on admin_profiles
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_admin_profiles_role 
  ON public.admin_profiles (role);

CREATE INDEX IF NOT EXISTS idx_admin_profiles_active 
  ON public.admin_profiles (is_active);

-- ------------------------------------------------------------------------------
-- 6. Indexes on activity_logs
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at 
  ON public.activity_logs (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id 
  ON public.activity_logs (admin_id);

CREATE INDEX IF NOT EXISTS idx_activity_logs_entity 
  ON public.activity_logs (entity_type, entity_id);
