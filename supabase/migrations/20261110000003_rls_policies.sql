-- ==============================================================================
-- Migration: 20261110000003_rls_policies.sql
-- Description: Production Row Level Security (RLS) and RBAC Policies
-- Author: Principal Database & Security Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Helper security functions (SECURITY DEFINER to avoid RLS recursion)
-- ------------------------------------------------------------------------------

-- Check if current authenticated user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;

  SELECT count(*)
  INTO v_count
  FROM public.admin_profiles
  WHERE id = auth.uid()
    AND is_active = true;

  RETURN v_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Get the role of the current authenticated admin
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT role
  INTO v_role
  FROM public.admin_profiles
  WHERE id = auth.uid()
    AND is_active = true;

  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Check if current authenticated user has any of the required roles
CREATE OR REPLACE FUNCTION public.has_role(VARIADIC allowed_roles TEXT[])
RETURNS BOOLEAN AS $$
DECLARE
  v_role TEXT;
BEGIN
  v_role := public.get_admin_role();
  IF v_role IS NULL THEN
    RETURN false;
  END IF;

  RETURN v_role = ANY(allowed_roles);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- ------------------------------------------------------------------------------
-- 2. Enable Row Level Security on all tables
-- ------------------------------------------------------------------------------
ALTER TABLE public.gemstone_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gemstones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gemstone_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. Policies: gemstone_categories
-- ------------------------------------------------------------------------------
-- Public can view active categories
CREATE POLICY "Public can view active categories"
  ON public.gemstone_categories
  FOR SELECT
  TO public
  USING (is_active = true);

-- Admins can view all categories (including inactive)
CREATE POLICY "Admins can view all categories"
  ON public.gemstone_categories
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Catalog managers and full admins can insert categories
CREATE POLICY "Admins and product managers can insert categories"
  ON public.gemstone_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Catalog managers and full admins can update categories
CREATE POLICY "Admins and product managers can update categories"
  ON public.gemstone_categories
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'product_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Full admins can delete categories
CREATE POLICY "Full admins can delete categories"
  ON public.gemstone_categories
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator'));

-- ------------------------------------------------------------------------------
-- 4. Policies: gemstones
-- ------------------------------------------------------------------------------
-- Public can view published, non-archived gemstones
CREATE POLICY "Public can view published gemstones"
  ON public.gemstones
  FOR SELECT
  TO public
  USING (is_published = true AND availability_status != 'archived');

-- Admins can view all gemstones
CREATE POLICY "Admins can view all gemstones"
  ON public.gemstones
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Product managers and admins can insert gemstones
CREATE POLICY "Admins and product managers can insert gemstones"
  ON public.gemstones
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Product managers and admins can update gemstones
CREATE POLICY "Admins and product managers can update gemstones"
  ON public.gemstones
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'product_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Full admins can delete gemstones
CREATE POLICY "Full admins can delete gemstones"
  ON public.gemstones
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator'));

-- ------------------------------------------------------------------------------
-- 5. Policies: gemstone_images
-- ------------------------------------------------------------------------------
-- Public can view images for published gemstones
CREATE POLICY "Public can view images for published gemstones"
  ON public.gemstone_images
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM public.gemstones g 
      WHERE g.id = gemstone_images.gemstone_id 
        AND g.is_published = true 
        AND g.availability_status != 'archived'
    )
  );

-- Admins can view all gemstone images
CREATE POLICY "Admins can view all gemstone images"
  ON public.gemstone_images
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Product managers and admins can insert images
CREATE POLICY "Admins and product managers can insert images"
  ON public.gemstone_images
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Product managers and admins can update images
CREATE POLICY "Admins and product managers can update images"
  ON public.gemstone_images
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'product_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'product_manager'));

-- Product managers and admins can delete images
CREATE POLICY "Admins and product managers can delete images"
  ON public.gemstone_images
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'product_manager'));

-- ------------------------------------------------------------------------------
-- 6. Policies: enquiries
-- ------------------------------------------------------------------------------
-- Public (and anonymous visitors) can insert enquiries
CREATE POLICY "Public can submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO public
  WITH CHECK (
    -- Reference number will be populated by trigger, customer info must be valid
    customer_name IS NOT NULL AND length(trim(customer_name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 3 AND
    subject IS NOT NULL AND
    message IS NOT NULL
  );

-- Admins can view enquiries (no public SELECT allowed under any circumstances)
CREATE POLICY "Admins can view enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Enquiry managers and full admins can update enquiries (status, notes, assigned_to)
CREATE POLICY "Admins and enquiry managers can update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'enquiry_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'enquiry_manager'));

-- Super admins only can delete enquiries (e.g. verified spam cleanup)
CREATE POLICY "Super admins can delete enquiries"
  ON public.enquiries
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin'));

-- ------------------------------------------------------------------------------
-- 7. Policies: admin_profiles
-- ------------------------------------------------------------------------------
-- Authenticated admins can view their own profile
CREATE POLICY "Admins can view their own profile"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Super admins and administrators can view all admin profiles
CREATE POLICY "Super admins and administrators can view all profiles"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (public.has_role('super_admin', 'administrator'));

-- Super admins can insert new admin profiles
CREATE POLICY "Super admins can insert admin profiles"
  ON public.admin_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role('super_admin'));

-- Super admins and administrators can update profiles
CREATE POLICY "Super admins and administrators can update profiles"
  ON public.admin_profiles
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator'))
  WITH CHECK (public.has_role('super_admin', 'administrator'));

-- Super admins can delete admin profiles (cannot delete self)
CREATE POLICY "Super admins can delete admin profiles"
  ON public.admin_profiles
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin') AND id != auth.uid());

-- ------------------------------------------------------------------------------
-- 8. Policies: activity_logs
-- ------------------------------------------------------------------------------
-- Admins can view activity logs (no public access)
CREATE POLICY "Admins can view activity logs"
  ON public.activity_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Authenticated admins can create activity log entries for their own actions
CREATE POLICY "Admins can insert activity logs"
  ON public.activity_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin() AND admin_id = auth.uid());
