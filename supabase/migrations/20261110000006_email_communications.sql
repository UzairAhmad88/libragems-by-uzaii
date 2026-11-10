-- ==============================================================================
-- Migration: 20261110000006_email_communications.sql
-- Description: Transactional Email Delivery Events, Notification Outbox & RLS
-- Author: Principal Full-Stack & Database Architect
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Table: email_events
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  provider TEXT NOT NULL DEFAULT 'resend',
  provider_message_id TEXT,
  email_type TEXT NOT NULL CHECK (email_type IN ('customer_acknowledgement', 'admin_notification', 'admin_response', 'status_update')),
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'queued', 'sending', 'sent', 'delivered', 'bounced', 'failed', 'suppressed')) DEFAULT 'queued',
  attempt_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  failed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_email_events_updated_at
BEFORE UPDATE ON public.email_events
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 2. Table: notification_outbox
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notification_outbox (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL CHECK (event_type IN ('enquiry_created', 'admin_reply', 'status_changed')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('enquiry', 'system')),
  entity_id TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')) DEFAULT 'pending',
  attempt_count INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 5,
  next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  last_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER set_notification_outbox_updated_at
BEFORE UPDATE ON public.notification_outbox
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 3. Indexes
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_email_events_enquiry_id 
  ON public.email_events (enquiry_id);

CREATE INDEX IF NOT EXISTS idx_email_events_status 
  ON public.email_events (status);

CREATE INDEX IF NOT EXISTS idx_email_events_created_at_desc 
  ON public.email_events (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_email_events_provider_msg 
  ON public.email_events (provider_message_id);

CREATE INDEX IF NOT EXISTS idx_notification_outbox_queue 
  ON public.notification_outbox (status, next_attempt_at ASC) 
  WHERE status IN ('pending', 'failed');

CREATE INDEX IF NOT EXISTS idx_notification_outbox_entity 
  ON public.notification_outbox (entity_type, entity_id);

-- ------------------------------------------------------------------------------
-- 4. Row Level Security (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_outbox ENABLE ROW LEVEL SECURITY;

-- Deny public access completely (No public SELECT, INSERT, UPDATE, DELETE)

-- Admins can view email events
CREATE POLICY "Admins can view email events"
  ON public.email_events
  FOR SELECT
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'enquiry_manager'));

-- Admins can update email events (e.g. manual retry)
CREATE POLICY "Admins can update email events"
  ON public.email_events
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'enquiry_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'enquiry_manager'));

-- Super admins can delete email events
CREATE POLICY "Super admins can delete email events"
  ON public.email_events
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin'));

-- Admins can view notification outbox
CREATE POLICY "Admins can view notification outbox"
  ON public.notification_outbox
  FOR SELECT
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'enquiry_manager'));

-- Admins can update outbox items (e.g. manual retry trigger)
CREATE POLICY "Admins can update notification outbox"
  ON public.notification_outbox
  FOR UPDATE
  TO authenticated
  USING (public.has_role('super_admin', 'administrator', 'enquiry_manager'))
  WITH CHECK (public.has_role('super_admin', 'administrator', 'enquiry_manager'));

-- Super admins can delete outbox items
CREATE POLICY "Super admins can delete outbox items"
  ON public.notification_outbox
  FOR DELETE
  TO authenticated
  USING (public.has_role('super_admin'));
