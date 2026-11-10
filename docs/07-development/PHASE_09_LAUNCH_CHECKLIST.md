# Libra Gems & Trading Co., Ltd.
## Phase 09 — Production Launch & Operational Signoff Checklist

**Document Reference:** `docs/07-development/PHASE_09_LAUNCH_CHECKLIST.md`  
**Classification:** Operational Go-Live & Release Governance  
**Target Domain:** `https://libragems.net`  
**Version:** 1.0.0 (Pre-Launch Signoff)

---

## 1. Pre-Launch Technical Verification Gate

Before production routing can be initiated, all technical preconditions must be formally validated:

- [x] **Release Branch Integration:** Branch `phase-09/controlled-production-go-live` verified and up to date with Phase 08 deliverables.
- [x] **Automated Test Pass:** 25/25 test files and 94/94 tests passing with zero failures.
- [x] **TypeScript Strict Typecheck:** `tsc --noEmit` exits with code 0 (zero errors).
- [x] **ESLint Linting:** `next lint` exits with zero errors and zero warnings.
- [x] **Production Build Compilation:** 33/33 static and dynamic routes compiled successfully.
- [x] **Database Migration Order:** Migrations `01` through `07` verified for syntax, foreign keys, and indexes.
- [x] **Seed Data Segregation:** Confirmed that `supabase/seed/development_seed.sql` is excluded from production migrations.
- [x] **Security Hardening Implemented:** HSTS preload, CSP, rate limiter (5 req/10min), 64KB payload cap, fail-closed cron Bearer authorization, raster-only storage policy.
- [x] **Technical SEO Grounding:** Dynamic XML sitemap (`/sitemap.xml`), crawler control (`/robots.txt`), Schema.org B2B JSON-LD with zero fake pricing.

---

## 2. Business Approvals & Category B Operation Register

The following Category B operations require explicit authorization from the business owner of Libra Gems & Trading Co., Ltd.:

| Gate ID | Operation Description | Business Owner Signoff | Date Approved |
|---|---|:---:|:---:|
| **GATE-01** | Authorization to create Production Supabase project in Singapore (`ap-southeast-1`) | [ ] Approved | ____________ |
| **GATE-02** | Authorization to apply SQL migrations `01` through `07` to production PostgreSQL | [ ] Approved | ____________ |
| **GATE-03** | Authorization to inject production secrets into Vercel Project Settings | [ ] Approved | ____________ |
| **GATE-04** | Authorization to add DNS A record (`76.76.21.21`) and CNAME (`cname.vercel-dns.com`) | [ ] Approved | ____________ |
| **GATE-05** | Authorization to add Resend DKIM and SPF records for domain `libragems.net` | [ ] Approved | ____________ |
| **GATE-06** | Authorization to trigger initial production deployment on Vercel | [ ] Approved | ____________ |
| **GATE-07** | Authorization to provision initial Super Admin account for Bangkok trading desk | [ ] Approved | ____________ |

---

## 3. Production Deployment Step-by-Step Execution Checklist

Execute the deployment following this sequential order once business approvals are signed:

### Step 3.1: Supabase Database Setup
- [ ] Log in to Supabase and create project `libragems-production` in Singapore (`ap-southeast-1`).
- [ ] Open the **SQL Editor** and run migration files `01` through `07` sequentially.
- [ ] Verify that 8 tables exist: `gemstone_categories`, `gemstones`, `gemstone_images`, `enquiries`, `audit_logs`, `admin_users`, `email_outbox`, `email_events`.
- [ ] Verify that public storage bucket `gemstone-images` is active with raster MIME restrictions.
- [ ] Copy the Project URL, Anon Key, and Service Role Key.

### Step 3.2: Resend Domain Setup
- [ ] In Resend, add domain `libragems.net`.
- [ ] Retrieve the DKIM public key and return-path DNS records.
- [ ] Generate a production sending API key.
- [ ] Create inbound webhook endpoint pointing to `https://libragems.net/api/webhooks/resend`.
- [ ] Copy the Webhook Signing Secret (`whsec_...`).

### Step 3.3: Vercel Project Association & Environment Injection
- [ ] Connect repository `UzairAhmad88/libragems-by-uzaii` to Vercel.
- [ ] Set **Root Directory** to `apps/web`.
- [ ] Inject all 14 environment variables into **Project Settings > Environment Variables** (Production environment):
  * `NEXT_PUBLIC_SITE_URL` = `https://libragems.net`
  * `NEXT_PUBLIC_SUPABASE_URL` = `<Supabase Project URL>`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `<Supabase Anon Key>`
  * `SUPABASE_SERVICE_ROLE_KEY` = `<Supabase Service Role Key>`
  * `RESEND_API_KEY` = `<Resend API Key>`
  * `RESEND_WEBHOOK_SECRET` = `<Resend Webhook Secret>`
  * `CRON_SECRET` = `<Random 32-character Hex String>`
  * `EMAIL_FROM` = `Libra Gems Trading Desk <enquiries@libragems.net>`
  * `EMAIL_REPLY_TO` = `info@libragems.net`
  * `ENQUIRY_NOTIFICATION_EMAILS` = `<Trading Desk Email List>`
  * `WHATSAPP_PRIMARY_NUMBER` = `<Verified E.164 Digits>`
- [ ] Add production domain `libragems.net` in Vercel **Domains** settings.

### Step 3.4: DNS Record Propagation
- [ ] At the domain registrar / DNS provider, add:
  * `A` record: `@` $\rightarrow$ `76.76.21.21`
  * `CNAME` record: `www` $\rightarrow$ `cname.vercel-dns.com`
  * `TXT` record: `resend._domainkey` $\rightarrow$ `<DKIM key>`
  * `MX` record: `feedback` $\rightarrow$ `feedback-smtp.resend.com` (Priority 10)
  * `TXT` record: `feedback` $\rightarrow$ `v=spf1 include:amazonses.com ~all`
  * `TXT` record: `@` $\rightarrow$ `google-site-verification=<hash>`
- [ ] Allow 15–60 minutes for global DNS propagation.

### Step 3.5: Production Deployment & Verification
- [ ] Trigger deployment from the approved release branch.
- [ ] Confirm build finishes with status `Ready`.
- [ ] Verify automatic SSL certificate issuance (`https://libragems.net` loads with valid TLS 1.3).
- [ ] Confirm `https://www.libragems.net` redirects seamlessly to `https://libragems.net` (308 redirect).

---

## 4. Post-Deployment Verification & Smoke Test Protocol

Once live, the release team conducts the following non-destructive smoke tests:

### 4.1 Public Website Smoke Test
- [ ] Load homepage `https://libragems.net` — verify layout, typography, and no console errors.
- [ ] Load catalogue `https://libragems.net/gemstones` — verify 3 active lots render.
- [ ] Load detail pages:
  * `/gemstones/hessonite-garnet`
  * `/gemstones/turquoise`
  * `/gemstones/afghanistan-rubellite`
- [ ] Verify About Us, Quality & Sourcing, Insights, Contact, Privacy, and Terms pages.
- [ ] Inspect `https://libragems.net/robots.txt` and `https://libragems.net/sitemap.xml`.

### 4.2 Super Admin Authentication & Dashboard Test
- [ ] Navigate to `https://libragems.net/admin/login`.
- [ ] Log in with authorized corporate trading account.
- [ ] Verify dashboard metrics render (`/admin/dashboard`).
- [ ] Verify gemstone inventory and enquiries table load without RLS permission errors.
- [ ] Test logout and verify session token is invalidated.

### 4.3 Transactional Enquiry Workflow Test (Controlled Internal Submission)
- [ ] Submit one synthetic test enquiry via `/contact` or product detail page:
  * Name: `Internal SRE Smoke Test`
  * Company: `Libra Gems Internal Quality Desk`
  * Email: `<Internal test email address>`
  * Interest: `Rough Hessonite Garnet`
- [ ] Confirm instant on-screen reference number generation (`ENQ-2026-XXXXX`).
- [ ] In Admin Portal (`/admin/enquiries`), verify the new enquiry appears with status `new`.
- [ ] In `/admin/communications/outbox`, confirm the automated notification tasks are enqueued.
- [ ] Verify recipient receives the Customer Acknowledgement email with parcel reference.
- [ ] Verify trading desk receives the Internal Notification alert.
- [ ] Mark the test enquiry status as `closed` with internal note: *Completed Phase 09 live verification*.

---

## 5. Formal Production Launch Signoff

**Release Manager:** ________________________________________  
**Managing Director:** ________________________________________  
**Signoff Date:** ____________________  
**Production Launch Status:** [ ] LAUNCH APPROVED & DEPLOYED  |  [ ] CONDITIONALLY APPROVED PENDING CREDENTIALS
