# Libra Gems & Trading Co., Ltd.
## Client Handover & Production Ownership Checklist

**Document Reference:** `docs/07-development/CLIENT_HANDOVER_CHECKLIST.md`  
**Classification:** Business Owner Action Registry  
**Project:** Libra Gems International B2B Website Platform  
**Target Domain:** `https://libragems.net`  
**Signoff Stakeholder:** Managing Director / Business Owner, Libra Gems & Trading Co., Ltd.  
**Version:** 1.0.0 (Pre-Launch Handover)

---

## 1. Cloud Accounts & Infrastructure Custody

The client business owner must establish and retain root administrative ownership of the three core hosting and service accounts. Engineering pairs will be granted scoped collaborator access.

### 1.1 Vercel Production Account
- [ ] **Account Creation:** Register an organization account on [Vercel.com](https://vercel.com) using the official corporate email (`director@libragems.net` or `admin@libragems.net`).
- [ ] **Repository Import:** Import GitHub repository `https://github.com/UzairAhmad88/libragems-by-uzaii.git`.
- [ ] **Project Settings Configuration:**
  - **Framework Preset:** `Next.js`
  - **Root Directory:** Set strictly to `apps/web`.
  - **Node.js Version:** `22.x`
- [ ] **Environment Variables:** Inject the complete set of verified production variables (see [Section 5 of Deployment Report](file:///d:/web/LibraGems_Project_Starter_Kit/docs/07-development/PHASE_08_DEPLOYMENT_REPORT.md#5-production-environment-variables-register)).
- [ ] **Production Domain Assignment:** Add `libragems.net` (redirect `www.libragems.net` to apex).

### 1.2 Supabase Managed Database Account
- [ ] **Account & Organization Setup:** Register on [Supabase.com](https://supabase.com).
- [ ] **Project Creation:**
  - **Project Name:** `libragems-production`
  - **Database Region:** Select strictly `Singapore (ap-southeast-1)`.
  - **Database Password:** Generate a 24+ character high-entropy master password and store securely in the corporate password vault (1Password, Bitwarden).
- [ ] **Apply Migrations:** Execute migration scripts `01` through `07` located in `supabase/migrations/` via the Supabase SQL Editor.
- [ ] **Storage Bucket Verification:** Confirm the bucket `gemstone-images` exists and is marked **Public**.
- [ ] **Initial Super Admin Provisioning:** Create the first administrative user via Auth and execute the role assignment SQL in `public.admin_users`.

### 1.3 Resend Transactional Email Account
- [ ] **Account Setup:** Register on [Resend.com](https://resend.com) with corporate email.
- [ ] **Domain Addition:** Add domain `libragems.net` under **Domains**.
- [ ] **DNS Records Verification:** Enter the 3 DKIM / SPF records into the domain's DNS provider.
- [ ] **API Key Generation:** Generate an API Key with **Sending Access** and label it `LibraGems-Vercel-Production`.
- [ ] **Webhook Setup:** Create an inbound webhook pointing to `https://libragems.net/api/webhooks/resend` listening to:
  * `email.sent`
  * `email.delivered`
  * `email.opened`
  * `email.bounced`
  * `email.complained`
- [ ] **Webhook Signing Secret:** Copy the `whsec_...` secret and inject into Vercel as `RESEND_WEBHOOK_SECRET`.

---

## 2. DNS & Registrar Administration

The client owns the domain registration for `libragems.net`. Configure the following records at the DNS provider (e.g. Cloudflare, Namecheap, Google Domains/Squarespace):

- [ ] **Apex A Record:** `@` $\rightarrow$ `76.76.21.21` (TTL: 300s or Auto).
- [ ] **Subdomain CNAME:** `www` $\rightarrow$ `cname.vercel-dns.com` (TTL: 300s or Auto).
- [ ] **Resend DKIM TXT Record:** `resend._domainkey` $\rightarrow$ `<Resend-provided-public-key>`.
- [ ] **Resend Return-Path MX Record:** `feedback` $\rightarrow$ `feedback-smtp.resend.com` (Priority: 10).
- [ ] **Resend Return-Path SPF TXT Record:** `feedback` $\rightarrow$ `v=spf1 include:amazonses.com ~all`.
- [ ] **DMARC Record:** `_dmarc` $\rightarrow$ `v=DMARC1; p=quarantine; rua=mailto:dmarc@libragems.net`.
- [ ] **Google Search Console Verification TXT:** `@` $\rightarrow$ `google-site-verification=<google-provided-hash>`.

> [!WARNING]
> Do NOT alter, overwrite, or delete existing corporate mail exchange (MX) records handling daily business emails (e.g. Gmail / Office 365).

---

## 3. Business Information & Corporate Authentication

In accordance with Thai legal requirements, trade governance, and ADR-09, the client must verify all corporate business data before public launch:

- [ ] **Bangkok Office Address:** Confirm exact registered commercial premises address in Bangkok, Thailand (including sub-district, district, building, and postal code).
- [ ] **Registered Landline Number:** Provide official Bangkok landline phone number with international dial code (`+66 2 ...`).
- [ ] **Trading Desk Mobile / WhatsApp:** Provide dedicated enterprise SIM number configured for official WhatsApp Business API integration.
- [ ] **Trading Desk Direct Emails:** Finalize the recipients list for inbound wholesale enquiry routing (e.g. `desk@libragems.net,director@libragems.net`).
- [ ] **Thai Business Tax & Registration:** Confirm company registration number (Tax ID) for display on formal B2B invoice memos.

---

## 4. Gemstone Inventory & Gemological Evidence

The launch website features three commercial lot presentations. The client must verify trade specifications and supply authentic high-resolution photography:

### 4.1 Lot 1: Ceylon Rough Hessonite Garnet (LG-HG-001)
- [ ] **Stock Availability:** Confirm active custody of the 5,000 g alluvial parcel.
- [ ] **Minimum Order Quantity:** Verify 500 g lot MOQ.
- [ ] **Authentic Photography:** Replace architectural placeholder SVGs with minimum 3 high-resolution daylight photographs:
  * Overall parcel photograph showing pebble color consistency.
  * Macro photograph highlighting natural resinous luster and treacle inclusions.
  * Sieve sizing photograph showing stones against a millimeter ruler.
- [ ] **Lab Memo Option:** Confirm whether a GIT or AIGS sample memo is already in hand or will be arranged upon client request.

### 4.2 Lot 2: Commercial-Quality Turquoise (LG-TQ-001)
- [ ] **Stock Availability:** Confirm active custody of the 12.5 kg stabilized lot.
- [ ] **Minimum Order Quantity:** Verify 1.0 kg MOQ.
- [ ] **Authentic Photography:** Replace placeholder SVGs with:
  * Nodular and slab parcel overview photograph.
  * Macro detail photograph of limonite spiderweb matrix.
  * Sawn lapidary slab showing color uniformity.
- [ ] **Treatment Disclosure Signoff:** Confirm acceptance of CIBJO Code T (Polymer Stabilized) disclosure.

### 4.3 Lot 3: Afghanistan Cut-Stone Rubellite (LG-RUB-AFGHAN)
- [ ] **Physical Custody:** Confirm physical possession of the cut stone in the Bangkok vault.
- [ ] **Carat Weight & Measurements:** Provide exact laboratory-measured carat weight, length, width, and depth in millimeters.
- [ ] **Authentic Photography:** Replace placeholder SVGs with:
  * Direct table crown view under 5500K daylight lighting.
  * Profile girdle and pavilion proportion view.
  * Scintillation flash photograph illustrating pleochroism.
- [ ] **Laboratory Memo:** Confirm accredited laboratory memo (GIT, Lotus Gemology, or AIGS) confirming species *Elbaite Tourmaline* and treatment status.

---

## 5. Legal & Regulatory Review

- [ ] **Thailand Personal Data Protection Act (PDPA):** Submit the generated Privacy Policy (`/privacy`) to qualified Thai legal counsel to confirm statutory alignment with PDPA B.E. 2562 (2019).
- [ ] **Terms of International Trade:** Submit the Terms and Conditions (`/terms`) to international commercial counsel to confirm jurisdiction clauses, Incoterms 2020 references (FOB Bangkok / CIF), and gemological dispute resolution terms.

---

## 6. Search Console & Search Engine Signoff

- [ ] **Ownership Verification:** Verify the Domain property `libragems.net` in Google Search Console.
- [ ] **Sitemap Submission:** Submit `https://libragems.net/sitemap.xml` in GSC and verify that all 33 URLs are discovered without syntax errors.
- [ ] **URL Inspection:** Inspect the homepage and catalogue URLs to verify Googlebot smartphone indexing eligibility.

---

## 7. Signoff Protocol

Once all items above are completed, the authorized client representative signs off below to trigger production domain routing:

**Authorized Representative Name:** ________________________________________  
**Title / Position:** ________________________________________  
**Signature:** ________________________________________  
**Date:** ____________________

