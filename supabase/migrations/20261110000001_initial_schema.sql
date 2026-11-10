-- ==============================================================================
-- Migration: 20261110000001_initial_schema.sql
-- Description: Core Normalized Schema for LibraGems Trading Platform
-- Author: Principal Database Architect
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. Helper trigger function: updated_at auto-refresh
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ------------------------------------------------------------------------------
-- 2. Reference sequence for enquiries (format: ENQ-YYYY-XXXXX)
-- ------------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.enquiry_ref_seq START WITH 10001 INCREMENT BY 1;

CREATE OR REPLACE FUNCTION public.generate_enquiry_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_number IS NULL OR NEW.reference_number = '' THEN
    NEW.reference_number = 'ENQ-' || to_char(now(), 'YYYY') || '-' || nextval('public.enquiry_ref_seq');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 3. Table: gemstone_categories
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gemstone_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_gemstone_categories_updated_at
BEFORE UPDATE ON public.gemstone_categories
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 4. Table: gemstones
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gemstones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.gemstone_categories(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  reference_code TEXT NOT NULL UNIQUE,
  trade_title TEXT,
  subtitle TEXT,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  geological_context TEXT,
  lapidary_characteristics TEXT,
  commercial_applications TEXT[] DEFAULT '{}',
  
  -- Gemological Identity
  gemstone_type TEXT NOT NULL DEFAULT 'colored_stone',
  species TEXT NOT NULL,
  variety TEXT NOT NULL,
  chemical_formula TEXT,
  crystal_system TEXT,
  hardness TEXT,
  specific_gravity TEXT,
  refractive_index TEXT,
  optical_character TEXT,

  -- Commercial & Physical Parameters
  form TEXT NOT NULL CHECK (form IN ('rough_parcel', 'mineral_rough', 'cut_stone', 'calibrated_beads')),
  lot_weight NUMERIC(10,2),
  weight_unit TEXT NOT NULL CHECK (weight_unit IN ('g', 'kg', 'ct', 'pcs')),
  weight_display TEXT NOT NULL,
  dimensions_or_sieve TEXT NOT NULL,
  cut_style TEXT,
  color_tone TEXT NOT NULL,
  clarity_description TEXT NOT NULL,
  moq TEXT NOT NULL,

  -- Provenance & CIBJO Disclosures
  origin_country TEXT NOT NULL,
  origin_region TEXT,
  origin_verification_status TEXT NOT NULL CHECK (origin_verification_status IN ('verified', 'trade_consensus', 'unverified')),
  origin_disclosure_note TEXT NOT NULL,
  
  treatment_status TEXT NOT NULL CHECK (treatment_status IN ('natural_untreated', 'stabilized', 'enhanced', 'unverified')),
  cibjo_code TEXT NOT NULL CHECK (cibjo_code IN ('N', 'T', 'E')),
  treatment_name TEXT NOT NULL,
  treatment_disclosure TEXT NOT NULL,

  certification_status TEXT NOT NULL CHECK (certification_status IN ('certified', 'pending_verification', 'available_on_request')),
  available_labs TEXT[] DEFAULT '{}',
  certification_memo_reference TEXT,
  certification_note TEXT NOT NULL,

  -- Market & Publication Status
  availability_status TEXT NOT NULL CHECK (availability_status IN ('in_stock', 'reserved', 'sold', 'archived')) DEFAULT 'in_stock',
  price_type TEXT NOT NULL CHECK (price_type IN ('price_on_application')) DEFAULT 'price_on_application',
  price_on_application BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE TRIGGER set_gemstones_updated_at
BEFORE UPDATE ON public.gemstones
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 5. Table: gemstone_images
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gemstone_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gemstone_id UUID NOT NULL REFERENCES public.gemstones(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  view_type TEXT NOT NULL CHECK (view_type IN ('overview', 'macro', 'scale', 'table', 'pavilion', 'facet', 'matrix')) DEFAULT 'overview',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  is_placeholder BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. Table: enquiries
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT NOT NULL UNIQUE,
  gemstone_id UUID REFERENCES public.gemstones(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  gemstone_interest TEXT NOT NULL,
  quantity_specs TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('gemstone_lot', 'parcel_split', 'custom_sourcing', 'showroom_appointment', 'general_wholesale')) DEFAULT 'gemstone_lot',
  status TEXT NOT NULL CHECK (status IN ('new', 'in_review', 'replied', 'qualified', 'converted', 'closed', 'spam')) DEFAULT 'new',
  priority TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
  internal_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  source_page TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

CREATE TRIGGER set_enquiries_reference
BEFORE INSERT ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.generate_enquiry_reference();

CREATE TRIGGER set_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 7. Table: admin_profiles
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'administrator', 'product_manager', 'enquiry_manager')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 8. Table: activity_logs
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete', 'publish', 'unpublish', 'archive', 'status_change', 'assign', 'role_change', 'login', 'logout')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('gemstone', 'category', 'enquiry', 'admin', 'auth', 'system')),
  entity_id TEXT,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
