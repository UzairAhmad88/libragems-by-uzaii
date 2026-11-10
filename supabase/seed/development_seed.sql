-- ==============================================================================
-- Seed: development_seed.sql
-- Description: Development Sample Enquiries, Activity Logs & Admin Setup Guide
-- Author: Principal Database Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Sample Enquiries for Admin Dashboard Testing
-- ------------------------------------------------------------------------------
INSERT INTO public.enquiries (
  reference_number,
  gemstone_id,
  customer_name,
  company_name,
  email,
  phone,
  country,
  gemstone_interest,
  quantity_specs,
  subject,
  message,
  enquiry_type,
  status,
  priority,
  internal_notes,
  source_page
) VALUES
  (
    'ENQ-2026-10001',
    'b1000000-0000-0000-0000-000000000001',
    'Julian Vance',
    'Vance Lapidary Atelier & Fine Gems',
    'j.vance@vancegems.co.uk',
    '+44 20 7946 0912',
    'United Kingdom',
    'Commercial-Quality Rough Hessonite Garnet (LG-HG-001)',
    '1,000 g split inquiry',
    'Inquiry regarding 1,000g parcel split from Ceylon Hessonite',
    'Good morning. We are interested in securing 1,000g from the 5,000g Ceylon Hessonite parcel (LG-HG-001) for a collection of calibrated cabochons. Could you confirm sieve size distribution between 12-18mm and discuss delivery timelines to London?',
    'parcel_split',
    'new',
    'high',
    'High-intent buyer. Verified UK business registry. Ready to evaluate parcel sieve breakdown.',
    '/catalogue/hessonite-garnet'
  ),
  (
    'ENQ-2026-10002',
    'b1000000-0000-0000-0000-000000000002',
    'Elena Rostova',
    'Rostova Gioielli S.r.l.',
    'elena@rostovagioielli.it',
    '+39 02 8876 5432',
    'Italy',
    'Commercial-Quality Turquoise (LG-TQ-001)',
    '2.5 kg selection slabs',
    'Wholesale Turquoise Slab Inquiry for Spring 2027 Line',
    'Salve. We manufacture sterling silver jewelry in Valenza. We would like to arrange a private video inspection of the spiderweb matrix slabs from LG-TQ-001 to select 2.5 kg for calibrated inlay cutting.',
    'gemstone_lot',
    'in_review',
    'normal',
    'Video consultation requested via WhatsApp. Forwarded to Bangkok desk.',
    '/catalogue/turquoise'
  ),
  (
    'ENQ-2026-10003',
    'b1000000-0000-0000-0000-000000000003',
    'Marcus Thorne',
    'Thorne Haute Horlogerie',
    'm.thorne@thorne-watches.ch',
    '+41 22 555 0198',
    'Switzerland',
    'Afghanistan Cut-Stone Rubellite (LG-RUB-AFGHAN)',
    'Single stone memo request',
    'Origin Testing Memo & Viewing Request in Bangkok',
    'Dear LibraGems Team, we are reviewing candidate centerpiece stones for a bespoke timepiece bezel. Is the Afghan Rubellite available for private viewing at your Silom showroom, and can a Lotus Gemology origin memo be finalized prior to memo release?',
    'showroom_appointment',
    'qualified',
    'urgent',
    'VIP watchmaker client. Showroom appointment tentatively scheduled for next Thursday.',
    '/catalogue/afghanistan-rubellite'
  ),
  (
    'ENQ-2026-10004',
    NULL,
    'Siddharth Patel',
    'Devam Gems Private Ltd.',
    'spatel@devamgems.in',
    '+91 22 2389 4500',
    'India',
    'Custom Rough Tourmaline Sourcing',
    '500 ct rough crystals',
    'Direct Sourcing Request - Nigerian / Mozambican Tourmaline Rough',
    'Seeking unheated tourmaline rough suitable for precision faceting. Please provide availability of recent acquisitions.',
    'custom_sourcing',
    'replied',
    'normal',
    'Shared preliminary inventory overview. Awaiting client feedback on target clarity grades.',
    '/contact'
  )
ON CONFLICT (reference_number) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 2. Development Admin Profile Setup Helper
-- Note: In Supabase, users are first registered in auth.users.
-- To link a development admin user after creating them via Supabase Dashboard / CLI:
--
-- INSERT INTO public.admin_profiles (id, full_name, email, role, is_active)
-- VALUES (
--   '<AUTH_USER_UUID>',
--   'LibraGems Principal Administrator',
--   'admin@libragems.internal',
--   'super_admin',
--   true
-- );
-- ------------------------------------------------------------------------------
