# LibraGems – Premium International Gemstone Trading Platform

**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Repository:** [github.com/UzairAhmad88/libragems-by-uzaii](https://github.com/UzairAhmad88/libragems-by-uzaii)  
**Status:** Phase 09 Controlled Production Go-Live, Launch Verification & Operations Complete (Conditionally Staged)  
**Default Branch:** `main` | **Active Release Branch:** `phase-09/controlled-production-go-live`

---

## Purpose & Commercial Model

This platform establishes the international digital portfolio and B2B wholesale enquiry engine for **Libra Gems & Trading Co., Ltd.**, situated in the historic Bang Rak gemstone trading district of Bangkok, Thailand.

The website operates an **enquiry-driven wholesale business model** with direct commercial negotiations conducted through **WhatsApp, secure web forms, telephone, and email**. In accordance with wholesale colored gemstone trade practices, it **strictly excludes consumer shopping carts, online checkouts, and credit card processing**.

### Initial Gemstone Inventory Focus:
1. **Commercial-Quality Rough Hessonite Garnet** (Grossular garnet alluvial rough pebbles)
2. **Commercial-Quality Turquoise** (Cryptocrystalline rough and mineral material with matrix)
3. **Afghanistan Cut-Stone Rubellite** (Precision-faceted purplish-red tourmaline cut gem)

---

## Brand & Visual System (60/30/10 Rule)

- **60% Natural Canvas:** Warm Off-White / Beige (`#F3EFE5`) and Soft Ivory (`#FAF8F2`).
- **30% Structural Authority:** Deep Forest Green (`#174C38`) and Midnight Shade (`#103729`).
- **10% Prestige Accent:** Muted Champagne Gold (`#B99B68`).
- **Typography:** Display Serif (`Cormorant Garamond`) paired with Interface Sans (`Inter`), utilizing tabular numerals for all gemological measurements.

---

## Technology Stack & Architecture

- **Framework:** Next.js 15.1.7 (App Router, Server Components, Edge Middleware, Static Route Generation)
- **Runtime:** React 19.0.0
- **Database & Auth:** PostgreSQL via Supabase with `@supabase/supabase-js@2.119.0` and `@supabase/ssr@0.12.7`
- **Transactional Email:** Resend v6.38.0 with Universal Email Provider abstraction (`ResendEmailProvider`)
- **Notification Outbox:** Asynchronous PostgreSQL outbox queue engine with capped exponential backoff ($2^{\text{attempt}}$ mins up to 5 retries) guaranteeing zero enquiry loss
- **Security:** PostgreSQL Row Level Security (RLS) on all 8 tables, dual-clause UPDATE policies (`USING` + `WITH CHECK`), tamper-evident audit logging, cryptographic Svix webhook verification
- **RBAC:** Closed administrative registration with 4 permission tiers (`super_admin`, `administrator`, `product_manager`, `enquiry_manager`)
- **Type Safety:** TypeScript 5.7.3 (Strict Mode)
- **Styling:** Tailwind CSS 3.4.17 with PostCSS 8.4 and Autoprefixer 10.4
- **Testing:** Vitest 3.0.5, `@testing-library/react`, and JSDOM (25 test files, 94 tests passed)
- **Security Hardening:** HSTS, Content-Security-Policy (CSP), Fail-Closed Cron Authorization, 64KB Payload Limit, Public Enquiry Sliding Window Rate Limiting (5 reqs/10min), Admin API RBAC Enforcement (`enquiries:write`), Storage XSS Hardening, and Atomic Outbox Concurrency
- **Technical SEO:** Canonical URL resolver (`site-url.ts`), centralized metadata factory (`metadata.ts`), dynamic XML sitemap with stable timestamps (`sitemap.ts`), Googlebot crawler control (`robots.ts`), and Schema.org / JSON-LD structured data (`json-ld.ts`)
- **Code Quality:** ESLint 9 Flat Config (`eslint-config-next`)

---

## Administration Portal & Communication Center (`/admin`)

The platform features an internal administrative console for the Bangkok trading desk:
- `/admin/login`: Accessible luxury login form with React Suspense boundary
- `/admin/dashboard`: Real-time KPIs, recent commercial enquiries, active inventory lots
- `/admin/gemstones`: Catalogue inventory table with CIBJO codes and publication status
- `/admin/gemstones/new` & `[id]`: Gemstone lot editor (`GemstoneForm`)
- `/admin/categories`: Gemstone taxonomy management
- `/admin/enquiries` & `[id]`: Commercial enquiries inbox, filtering, status advancement, and pre-filled email client reply
- `/admin/communications`: Real-time delivery health overview, KPIs, and recent activity
- `/admin/communications/email-events`: Delivery events ledger with status filters and provider IDs
- `/admin/communications/outbox`: Outbox queue inspection and manual retry executor
- `/admin/communications/settings`: Provider sender addresses and webhook endpoints
- `/admin/team`: Administrative personnel table and RBAC permissions matrix
- `/admin/activity`: Tamper-evident activity audit trail
- `/admin/settings`: System environmental health, Supabase connection status, and storage configuration

---

## Local Development & Setup

### Prerequisites
- Node.js `v20.x`, `v22.x`, or `v24.x` LTS
- npm `v10.x` or `v11.x`
- Docker Desktop (for optional local Supabase container stack)

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/UzairAhmad88/libragems-by-uzaii.git
cd libragems-by-uzaii

# 2. Check out working branch
git checkout phase-07/qa-security-prelaunch-audit

# 3. Navigate to web application directory
cd apps/web

# 4. Install deterministic dependencies
npm ci

# 5. Create local environment configuration
cp .env.example .env.local

# 6. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public website, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

> [!NOTE]
> The application operates cleanly in offline / preview mode using local baseline data when cloud Supabase or Resend credentials are not connected.

---

## Quality & Verification Gates

```bash
# Run unit & integration tests (25 test files, 94 tests)
npm test --prefix apps/web

# Run TypeScript strict typecheck (0 errors)
npm run typecheck --prefix apps/web

# Run ESLint (0 warnings, 0 errors)
npm run lint --prefix apps/web

# Run production build (33 static and dynamic routes compiled)
npm run build --prefix apps/web
```

---

## Production Deployment & Operations Documentation

- [Phase 09 Production Go-Live Report](docs/07-development/PHASE_09_PRODUCTION_GO_LIVE_REPORT.md): Release verification, Category B approval register, and launch gate results.
- [Production Monitoring Baseline](docs/07-development/PRODUCTION_MONITORING_BASELINE.md): Telemetry architecture, Core Web Vitals targets, and outbox cron runbooks.
- [Phase 09 Launch Checklist](docs/07-development/PHASE_09_LAUNCH_CHECKLIST.md): Step-by-step signoff, cloud provisioning checklist, and smoke test protocol.
- [Phase 08 Deployment Report](docs/07-development/PHASE_08_DEPLOYMENT_REPORT.md): Infrastructure architecture, DNS plans, and verification gates.
- [Production Operations Manual](docs/07-development/PRODUCTION_OPERATIONS_MANUAL.md): Internal operating procedures for catalogue, enquiries, and communications.
- [Client Handover Checklist](docs/07-development/CLIENT_HANDOVER_CHECKLIST.md): Ownership tasks, credentials injection, and business verification items.
- [Rollback & Disaster Recovery Runbook](docs/07-development/ROLLBACK_AND_RECOVERY.md): Vercel instant rollback, Supabase PITR, and incident response matrix.
