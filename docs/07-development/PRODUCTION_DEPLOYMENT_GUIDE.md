# Production Deployment & Operations Playbook
## Libra Gems & Trading Co., Ltd. — DevOps & Production Engineering

- **Project:** LibraGems B2B Digital Platform
- **Phase:** 07 — Comprehensive QA, Security Hardening & Pre-Launch Audit
- **Document ID:** `OPS-DEPLOY-07-05`
- **Location:** Bangkok, Thailand
- **Canonical Domain:** `https://libragems.net`
- **Primary Hosting Platform:** Vercel Global Edge Network
- **Database & Storage Host:** Supabase (AWS ap-southeast-1, Singapore)

---

## 1. Environment Variables Specification

The platform utilizes a strict separation between public variables (prefixed with `NEXT_PUBLIC_` and safe for browser bundling) and private secrets (restricted strictly to server-side runtimes).

| Variable Name | Purpose | Scope | Required in Prod | Example / Placeholder Value |
| :--- | :--- | :---: | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production domain | **Public** | **Yes** | `https://libragems.net` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API gateway | **Public** | **Yes** | `https://xyzproject.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public client anon key for RLS | **Public** | **Yes** | `eyJhbGciOi...` (Supabase Anon Key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged server access for outbox | **Secret** | **Yes** | `eyJhbGciOi...` (Supabase Service Role Key) |
| `RESEND_API_KEY` | Transactional email provider token | **Secret** | **Yes** | `re_abc123xyz...` |
| `RESEND_WEBHOOK_SECRET` | Cryptographic signature secret (Svix) | **Secret** | **Yes** | `whsec_abc123xyz...` |
| `CRON_SECRET` | Bearer token authorizing outbox cron | **Secret** | **Yes** | `libragems_cron_sec_32char_random_hex` |
| `EMAIL_FROM` | System sender header address | **Secret** | **Yes** | `Libra Gems Trading Desk <enquiries@libragems.net>` |
| `EMAIL_REPLY_TO` | Customer reply header address | **Secret** | **Yes** | `info@libragems.net` |
| `ENQUIRY_NOTIFICATION_EMAILS` | Internal trading desk recipient list | **Secret** | **Yes** | `desk@libragems.internal,trading@libragems.internal` |
| `WHATSAPP_PRIMARY_NUMBER` | Desk WhatsApp line (E.164, digits only)| **Public** | *Optional* | `66812345678` (Pending Client Confirmation) |
| `WHATSAPP_SECONDARY_NUMBER` | Secondary WhatsApp desk line | **Public** | *Optional* | `66898765432` (Pending Client Confirmation) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | **Public** | *Optional* | `G-XXXXXXXXXX` |

*Security Rule:* Never commit real credentials, service-role keys, or API tokens to Git. Provision these variables exclusively through the hosting provider's encrypted environment variables manager (e.g. Vercel Project Settings).

---

## 2. Step-by-Step Production Deployment Procedure

### Phase A: Database Setup & Migration Deployment (Supabase)
1. Log into the corporate Supabase Organization and provision a new project in the **Singapore (`ap-southeast-1`)** region for optimal latency to Bangkok.
2. Link the project via Supabase CLI:
   ```bash
   npx supabase link --project-ref your-project-ref
   ```
3. Apply all 7 database migrations sequentially:
   ```bash
   npx supabase db push
   ```
   Migrations applied:
   - `20261110000001_initial_schema.sql` (Tables & Sequence triggers)
   - `20261110000002_indexes_constraints.sql` (Performance & Search indexes)
   - `20261110000003_rls_policies.sql` (Row Level Security & RBAC)
   - `20261110000004_storage_policies.sql` (Storage Bucket setup)
   - `20261110000005_seed_reference_data.sql` (Baseline categories & gemstones)
   - `20261110000006_email_communications.sql` (Email events & Outbox queue)
   - `20261110000007_storage_hardening.sql` (Raster-only storage XSS prevention)
4. Create the initial Super Administrator user:
   - Create auth user in Supabase Auth Dashboard.
   - Insert corresponding record into `public.admin_profiles` with `role = 'super_admin'` and `is_active = true`.

### Phase B: Email Provider Setup (Resend)
1. Add sending domain `libragems.net` in the Resend console.
2. Add the required DNS records (DKIM, SPF, MX) at your DNS registrar (Cloudflare / Route53).
3. Verify domain status: must show **Verified (Green)** before live sending.
4. Configure incoming webhook:
   - URL: `https://libragems.net/api/webhooks/resend`
   - Events subscribed: `email.sent`, `email.delivered`, `email.bounced`, `email.complained`.
   - Copy the generated Signing Secret into `RESEND_WEBHOOK_SECRET`.

### Phase C: Vercel Production Build & Deployment
1. Connect GitHub repository `UzairAhmad88/libragems-by-uzaii`.
2. Set root directory to `apps/web`.
3. Framework Preset: **Next.js**.
4. Configure all environment variables from Section 1 in Vercel Project Settings.
5. Trigger production deployment:
   ```bash
   git push origin main
   ```
6. Verify deployment build logs: confirm `33/33 static pages compiled` and zero build warnings.

### Phase D: Cron Job Scheduling
1. Configure Vercel Cron or an external cron runner (e.g., cron-job.org / Cloudflare Workers):
   - **Target URL:** `https://libragems.net/api/cron/process-outbox?limit=25`
   - **Method:** `POST`
   - **Schedule:** Every 5 minutes (`*/5 * * * *`)
   - **Header:** `Authorization: Bearer <YOUR_CRON_SECRET>`

---

## 3. Post-Deployment Verification & Smoke Test Protocol

Within 1 hour of live DNS cutover, execute the following smoke tests:

- [ ] **HTTPS & SSL Certificate:** Verify valid TLS 1.3 certificate issued for `libragems.net` and `www.libragems.net`.
- [ ] **Apex & Subdomain Canonical Redirection:** Confirm `http://` redirects to `https://` and `www.` redirects to apex.
- [ ] **Security Headers Check:** Inspect HTTP response headers via `curl -I https://libragems.net`:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
  - `Content-Security-Policy: default-src 'self' ...`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
- [ ] **Robots & Sitemap Verification:**
  - `https://libragems.net/robots.txt` returns HTTP 200 and disallows `/admin` and `/api`.
  - `https://libragems.net/sitemap.xml` returns HTTP 200 with all 11 public URLs.
- [ ] **Admin Authentication Flow:**
  - Navigate to `https://libragems.net/admin/login`.
  - Authenticate with Super Administrator credentials.
  - Confirm redirect to `/admin/dashboard`.
  - Confirm activity log records the successful sign-in.
- [ ] **Live Enquiry Submission:**
  - Submit a test inquiry on `/gemstones/hessonite-garnet`.
  - Confirm tracking reference `ENQ-YYYY-XXXXX` displayed to user.
  - Confirm enquiry appears in `/admin/enquiries`.
  - Confirm customer acknowledgement email arrives in inbox.
  - Confirm internal trading desk notification arrives.
  - Confirm delivery event recorded in `/admin/communications/email-events`.

---

## 4. Rollback Strategy & Incident Recovery

### Instant Vercel Deployment Rollback
If a critical runtime regression occurs post-launch:
1. Open Vercel Project Dashboard → **Deployments**.
2. Locate the previous stable production deployment.
3. Click **Instant Rollback**.
4. Traffic is routed to the previous immutable deployment artifact within $< 5$ seconds with zero downtime.

### Database Recovery Procedure
1. Supabase automatically retains continuous Point-in-Time Recovery (PITR) backups.
2. In the event of data corruption or invalid state migration, restore the database to a snapshot immediately preceding the incident via the Supabase Management Console.

