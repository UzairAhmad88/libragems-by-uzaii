# Libra Gems & Trading Co., Ltd.
## Phase 11 — Live Production Smoke-Test Matrix & Verification Protocol

**Document Reference:** `docs/07-development/PHASE_11_LIVE_VERIFICATION_MATRIX.md`  
**Classification:** SRE & QA Smoke-Testing Execution Matrix  
**Target Domain:** `https://libragems.net`  
**Version:** 1.0.0 (Pre-Launch Protocol)

---

## 1. Protocol Overview & Test Data Governance

This matrix establishes the comprehensive verification protocol to be executed by the release team immediately upon production DNS activation.

### Strict Test Data Governance:
- **Synthetic Test Identities Only:** All verification submissions must use synthetic contact names clearly flagged as internal tests (e.g., `QA Smoke Test — Trading Desk Internal`).
- **Zero Real Customer Personal Data:** No genuine buyer personal identifiable information (PII) or commercial contracts may be submitted during testing.
- **Audit Traceability:** Test enquiries are never deleted; they are transitioned through the workflow and marked `closed` with internal notes documenting smoke test completion.
- **Separation of Test Modes:** Distinguish between local mock runs, preview environments, and live production verification.

---

## 2. Public Website Smoke-Test Matrix

| Target Route / Component | Verification Criteria | Expected Result | Evidence Source | Test Result |
|---|---|---|---|:---:|
| **`/` (Homepage)** | Page renders hero showcase, brand manifesto, 3 lot teasers, quiet luxury palette. | HTTP 200; zero client JS errors; valid `<title>` and Open Graph tags. | Browser Console / Network Tab | *Pending Live Deploy* |
| **`/about` (About Us)** | Institutional story, Bangkok trading district context, corporate values. | HTTP 200; typography correctly loaded (Cormorant / Inter). | Network Tab | *Pending Live Deploy* |
| **`/gemstones` (Catalogue)** | Grid displays 3 active gemstone lots; category filters functional. | HTTP 200; 3 product cards render with CIBJO codes and POA tags. | DOM Inspection | *Pending Live Deploy* |
| **`/gemstones/hessonite-garnet`** | Alluvial grossular garnet specifications, sieve sizes, CIBJO Code N. | HTTP 200; spec table aligns with `tabular-nums`; enquiry CTA active. | Spec Table Audit | *Pending Live Deploy* |
| **`/gemstones/turquoise`** | Matrix turquoise nodules, CIBJO Code T (Stabilized) disclosure. | HTTP 200; ethical treatment disclosure rendered prominently. | DOM Inspection | *Pending Live Deploy* |
| **`/gemstones/afghanistan-rubellite`** | Faceted rubellite tourmaline, Kunar/Nuristan trade consensus disclosure. | HTTP 200; laboratory memo option presented; zero fake certs. | Gemstone Data Check | *Pending Live Deploy* |
| **`/quality-sourcing`** | Ethical sourcing manifesto, accredited laboratory standards (GIT, AIGS). | HTTP 200; non-fabrication principles stated. | Network Tab | *Pending Live Deploy* |
| **`/insights`** | Editorial insight articles; in-page `<ArticleReaderModal />` reader. | HTTP 200; modal opens smoothly; zero 404 broken links. | User Interaction | *Pending Live Deploy* |
| **`/contact`** | Formal B2B trade inquiry form; phone/email contact information. | HTTP 200; form controls validate according to Zod schema. | Form Inspection | *Pending Live Deploy* |
| **`/privacy`** | Privacy policy tailored for B2B trading under Thai PDPA context. | HTTP 200; legal disclaimer visible. | Network Tab | *Pending Live Deploy* |
| **`/terms`** | International terms of trade (Incoterms 2020: FOB Bangkok / CIF). | HTTP 200; jurisdiction and arbitration clauses rendered. | Network Tab | *Pending Live Deploy* |
| **`/_not-found` (404)** | Custom luxury 404 page with navigation return links. | HTTP 404; brand header and return button render cleanly. | Route Test | *Pending Live Deploy* |
| **`/robots.txt`** | Allows `/`; restricts `/admin`, `/admin/*`, `/api`, `/api/*`. | HTTP 200; plain text crawl directives match specification. | Direct GET Request | *Pending Live Deploy* |
| **`/sitemap.xml`** | Dynamic XML sitemap listing 33 valid URLs with stable timestamps. | HTTP 200; valid XML syntax; zero volatile `new Date()` entries. | Direct GET Request | *Pending Live Deploy* |

---

## 3. Wholesale Enquiry Workflow Verification Matrix

| Workflow Step | Technical Mechanism | Verification Criteria | Expected Outcome | Status |
|---|---|---|---|:---:|
| **1. Client Validation** | React Hook Form + Zod | Submit form with empty required fields. | Form displays inline error messages; submission prevented. | *Ready (Verified in Tests)* |
| **2. Rate Limiting** | Sliding window (5 req / 10min) | Submit 6 requests within 1 minute from test IP. | 6th request rejected with HTTP 429 (`Too Many Requests`). | *Ready (Verified in Tests)* |
| **3. Payload Size Cap** | Next.js API route check | Send payload exceeding 64 KB. | API rejects with HTTP 413 (`Payload Too Large`). | *Ready (Verified in Tests)* |
| **4. DB Persistence** | Supabase `public.enquiries` | Submit valid synthetic test enquiry. | Row inserted with status `new` and unique code `ENQ-2026-XXXXX`. | *Pending Cloud Credentials* |
| **5. Outbox Enqueueing** | `public.email_outbox` | Database insert trigger. | 2 records created: `customer_acknowledgement` & `admin_notification`. | *Pending Cloud Credentials* |
| **6. Async Dispatch** | Asynchronous execution | Immediate outbox processor call on insert. | Outbox processor dispatches emails without blocking HTTP response. | *Ready (Verified in Code)* |
| **7. Email Delivery** | Resend API (TLS) | Inspect internal recipient mailbox. | Customer receives acknowledgement; desk receives trade alert. | *Pending Resend Setup* |
| **8. Webhook Recording** | `public.email_events` | Inbound Svix-signed webhook. | Event `email.delivered` recorded with provider message ID. | *Pending Webhook Setup* |
| **9. Admin Dashboard** | `/admin/enquiries` | Log in as authorized trading manager. | Test enquiry appears in inbox with status badge `new`. | *Pending Cloud Credentials* |
| **10. Desk Response** | `<AdminResponseComposer />` | Send formal quotation reply from desk. | Outgoing reply sent via Resend; logged in enquiry timeline. | *Pending Cloud Credentials* |
| **11. Status Transition** | `/api/admin/enquiries/[id]/status` | Advance status: `new` $\rightarrow$ `quoted` $\rightarrow$ `closed`. | Status updated in DB; activity log records admin identity. | *Pending Cloud Credentials* |

---

## 4. Security & Compliance Verification Matrix

| Security Vector | Implementation Mechanism | Verification Method | Pass Criteria | Status |
|---|---|---|---|:---:|
| **HTTPS Enforcement** | Vercel Edge / TLS 1.3 | Curl `http://libragems.net` | HTTP 308 redirect to `https://libragems.net` | *Pending DNS* |
| **HSTS Preload** | `next.config.ts` | Inspect response headers | `max-age=63072000; includeSubDomains; preload` | *Verified in Config* |
| **Content Security Policy** | `next.config.ts` | Inspect response headers | Scripts, styles, fonts restricted; `frame-ancestors 'none'` | *Verified in Config* |
| **Secure Cookie Flags** | `@supabase/ssr` cookies | Inspect session cookie | `HttpOnly; Secure; SameSite=Lax` | *Verified in Architecture* |
| **Admin Route Protection** | Next.js Edge Middleware | Request `/admin/dashboard` unauthenticated | Immediate 307 redirect to `/admin/login` | *Verified in Middleware* |
| **Admin API RBAC** | Server-side permission check | Invoke reply API as `product_manager` | HTTP 403 Forbidden (`enquiries:write` required) | *Verified in Tests* |
| **Cron Authorization** | `Authorization: Bearer <secret>` | Invoke `/api/cron/process-outbox` with no header | HTTP 401 Unauthorized | *Verified in Tests* |
| **Cron Fail-Closed** | Server secret check | Invoke cron endpoint with unset secret | HTTP 500 Internal Error (fails closed) | *Verified in Tests* |
| **Storage Raster Policy** | PostgreSQL Storage RLS | Attempt upload of `.svg` or `.html` file | Storage API rejects file (MIME not permitted) | *Verified in Migration 07* |
| **Webhook Signature** | Svix cryptographic HMAC | POST to webhook with invalid signature | HTTP 401 Unauthorized | *Verified in Tests* |
| **Zero Secret Leakage** | Zod `env.ts` schema | Inspect client browser bundle | Zero service-role keys or Resend secrets in client JS | *Verified in Build* |
