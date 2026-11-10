# Libra Gems & Trading Co., Ltd.
## Production Rollback, Disaster Recovery & Incident Response Runbook

**Document Reference:** `docs/07-development/ROLLBACK_AND_RECOVERY.md`  
**Classification:** Critical Operational Runbook  
**Project:** Libra Gems International Digital Platform  
**Target Domain:** `https://libragems.net`  
**Version:** 1.0.0 (Production Release)

---

## 1. Overview & Recovery Objectives

This document establishes standard operating procedures for rapid rollback, point-in-time disaster recovery, and operational incident response across all production tiers:
- **Vercel Serverless Application Hosting**
- **Supabase PostgreSQL Database & Storage**
- **Resend Transactional Email & Webhook Delivery**
- **DNS & SSL Edge Routing**

### Core Recovery Metrics
- **Recovery Time Objective (RTO):** $< 15\text{ minutes}$ for application rollbacks; $< 60\text{ minutes}$ for complete database point-in-time restoration.
- **Recovery Point Objective (RPO):** $< 5\text{ minutes}$ for enquiry records and outbox transactions via WAL archiving and PITR.

---

## 2. Tier 1: Vercel Application Rollback

Vercel maintains immutable build outputs for every deployment. If a critical bug, layout failure, or memory regression affects the production deployment:

### 2.1 Instant Rollback Procedure ($< 60\text{ seconds}$)
1. Log into the Vercel Dashboard at `https://vercel.com/dashboard`.
2. Select the `libragems-web` project.
3. Navigate to the **Deployments** tab.
4. Locate the last known healthy deployment (identified by its Git commit SHA).
5. Click the three dots menu (`...`) on that deployment card.
6. Select **Instant Rollback**.
7. Confirm the rollback in the dialog.
8. Vercel immediately switches the production domain alias (`libragems.net` and `www.libragems.net`) to the previous deployment's immutable serverless lambdas and static edge assets without rebuilding.

### 2.2 Environment Variable Rollback
If a deployment failure is caused by an erroneous environment variable:
1. Go to **Settings > Environment Variables**.
2. Select the modified variable and review its edit history.
3. Revert the value to the previous configuration.
4. Trigger a redeployment from the healthy commit:
   - Go to **Deployments > Select Healthy Deployment > Redeploy**.

---

## 3. Tier 2: Supabase Database Backup & Point-in-Time Recovery (PITR)

Supabase managed PostgreSQL provides daily automated backups as well as continuous Write-Ahead Log (WAL) archiving for Point-in-Time Recovery.

### 3.1 Daily Snapshot Restoration
1. Access the Supabase Project Dashboard (`https://supabase.com/dashboard`).
2. Navigate to **Database > Backups**.
3. Under **Scheduled Backups**, locate the desired snapshot timestamp.
4. Click **Restore**.
5. *Note:* A snapshot restore overwrites database state to that specific calendar snapshot.

### 3.2 Point-in-Time Recovery (PITR) Procedure
For Pro and Enterprise tiers, Supabase allows exact second-level restoration:
1. Under **Database > Backups**, select **Point in time**.
2. Select the exact date and timestamp immediately preceding the incident (e.g. `2026-11-15 14:22:00 UTC`).
3. Click **Restore to point in time**.
4. Allow Supabase 15 to 30 minutes to provision the replica and replay the WAL logs.

### 3.3 Emergency Schema Down-Migrations
If an applied migration script introduces a breaking schema bug before data is populated:

#### Rollback Migration 07 (Storage Hardening):
```sql
-- Revert storage MIME constraints if valid image types were erroneously blocked
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
WHERE id = 'gemstone-images';
```

#### Rollback Migration 06 (Email Outbox & Templates):
```sql
-- Emergency disable of email outbox triggers without dropping data
ALTER TABLE public.email_outbox DISABLE TRIGGER ALL;
```

#### Rollback Migration 03 (RLS Policies):
```sql
-- In an extreme emergency where valid admin queries are rejected by RLS:
-- DO NOT disable RLS globally. Instead, inspect the offending policy:
SELECT * FROM pg_policies WHERE tablename = 'enquiries';
```

---

## 4. Tier 3: Transactional Communications Recovery

### 4.1 Recovering Stuck Outbox Processing Jobs
If the serverless cron processor terminates abnormally midway through an outbox batch, jobs may remain marked with status `processing`:

```sql
-- Check for jobs stuck in processing state for more than 15 minutes
SELECT id, recipient, subject, attempts, status, updated_at
FROM public.email_outbox
WHERE status = 'processing'
  AND updated_at < (NOW() - INTERVAL '15 minutes');

-- Reset stuck jobs back to pending for automatic pickup by next cron run
UPDATE public.email_outbox
SET status = 'pending',
    updated_at = NOW()
WHERE status = 'processing'
  AND updated_at < (NOW() - INTERVAL '15 minutes');
```

### 4.2 Re-Queueing Failed Inquiries
If Resend experienced a temporary upstream outage or an expired API key caused a batch to fail:
```sql
-- Reset failed jobs with under 5 attempts back to pending
UPDATE public.email_outbox
SET status = 'pending',
    attempts = attempts + 1,
    last_error = NULL,
    updated_at = NOW()
WHERE status = 'failed'
  AND attempts < 5;
```

---

## 5. Tier 4: DNS & Edge Failover

If the primary Vercel edge infrastructure experiences a regional or global routing failure:

### 5.1 Temporary Maintenance Page Failover
1. Log into the DNS registrar / DNS management console.
2. Locate the root `A` record for `libragems.net`.
3. Update the `A` record to point to a designated backup static maintenance server (e.g. Cloudflare Pages or AWS S3 holding an offline static contact notice with WhatsApp contact links).
4. Lower the TTL to `60` seconds to facilitate immediate re-pointing once Vercel resolves the upstream outage.

---

## 6. Incident Classification & Escalation Matrix

When an anomaly is detected, classify the incident according to this severity matrix:

| Severity | Definition | Examples | Maximum Response Time | Lead Responder |
|---|---|---|---|---|
| **SEV-1 (Critical)** | Entire public site offline or customer enquiry data exposed. | - 5xx errors across homepage and catalogue.<br>- RLS policy breach exposing enquiries.<br>- Apex domain TLS cert failure. | $< 15\text{ minutes}$ | Principal Architect & DevOps Lead |
| **SEV-2 (Major)** | Core transactional workflow non-functional. | - Enquiry form submission failing with 500.<br>- Admin dashboard login failing.<br>- Cron outbox processor deadlocking. | $< 1\text{ hour}$ | Senior Full-Stack Engineer |
| **SEV-3 (Moderate)** | Non-critical functionality degraded; workarounds available. | - Resend webhook delivery delays.<br>- Image upload failing in admin panel.<br>- Slow page transitions ($>3\text{s}$). | $< 4\text{ hours}$ | Frontend / Support Engineer |
| **SEV-4 (Minor)** | Cosmetic defect, typo, or minor reporting anomaly. | - Misaligned spec table cell on mobile.<br>- Non-blocking analytics tag warning. | $< 24\text{ hours}$ | UI/UX Developer |

---

## 7. Incident Communication Protocol

During a SEV-1 or SEV-2 incident, internal communications must follow this template:

```
[INCIDENT ALERT: SEV-{LEVEL}] - {Short Incident Summary}
Time of Detection: 2026-XX-XX XX:XX UTC
Impacted Surface: [Public Site / Admin Portal / Outbox / Database]
Symptoms Observed: {Description of failure, HTTP status codes, user impact}
Immediate Actions Taken: {Rollback triggered / Database checkpoint taken}
Lead Incident Commander: {Name / Role}
Next Status Update: Within {15 / 30} minutes.
```

