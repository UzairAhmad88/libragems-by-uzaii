# Libra Gems & Trading Co., Ltd.
## Phase 10 — Post-Launch Verification, Monitoring & Commercial Handover Checklist

**Document Reference:** `docs/07-development/PHASE_10_POST_LAUNCH_CHECKLIST.md`  
**Classification:** Post-Go-Live Operational Checklist  
**Target Domain:** `https://libragems.net`  
**Version:** 1.0.0 (Production Handover)

---

## 1. Post-Deployment Technical Verification

Immediately following production DNS activation and deployment on Vercel:

- [ ] **DNS Apex & Subdomain Routing:** Verify `https://libragems.net` and `https://www.libragems.net` resolve to Vercel edge IP (`76.76.21.21`).
- [ ] **SSL / TLS Certificate:** Verify TLS 1.3 handshake with valid Let's Encrypt / DigiCert certificate issued for `libragems.net`.
- [ ] **Canonical 308 Redirect:** Confirm `https://www.libragems.net` permanently redirects to `https://libragems.net`.
- [ ] **Public Route Smoke Test:** Verify HTTP 200 on all 11 public pages:
  * `/` (Homepage)
  * `/about` (About Us)
  * `/gemstones` (Catalogue)
  * `/gemstones/hessonite-garnet` (Lot 1)
  * `/gemstones/turquoise` (Lot 2)
  * `/gemstones/afghanistan-rubellite` (Lot 3)
  * `/quality-sourcing` (Quality & Provenance)
  * `/insights` (Market Insights Hub)
  * `/contact` (Contact & Valuation Desk)
  * `/privacy` (Privacy Policy)
  * `/terms` (Terms of Trade)
- [ ] **Crawler Directives:** Confirm `https://libragems.net/robots.txt` and `https://libragems.net/sitemap.xml` return valid XML/text with status 200.
- [ ] **Security Headers:** Inspect response headers for `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, and `X-Frame-Options: DENY`.

---

## 2. Super Administrator & Staff Access Verification

- [ ] **First Super Admin Account:** Provision first corporate account in Supabase Auth and assign `super_admin` role in `public.admin_users`.
- [ ] **Login Verification:** Test login at `https://libragems.net/admin/login` using corporate credentials.
- [ ] **Dashboard Loading:** Verify `/admin/dashboard` renders real-time inventory and enquiry metrics.
- [ ] **Role Isolation Test:** Attempt to access admin routes with an unauthorized or inactive account and verify immediate redirection to `/admin/login`.
- [ ] **Session Expiration:** Confirm session cookies are configured with `HttpOnly`, `Secure`, and `SameSite=Lax`.

---

## 3. End-to-End Enquiry & Email Workflow Test

Conduct one controlled synthetic internal test enquiry:

- [ ] **Form Submission:** Submit an enquiry via `/contact` using an internal test email address.
- [ ] **Client Confirmation:** Verify instant on-screen reference number generation (`ENQ-2026-XXXXX`).
- [ ] **Database Persistence:** Verify new record in `public.enquiries` with status `new`.
- [ ] **Outbox Enqueueing:** Verify two jobs enqueued in `public.email_outbox` (Customer Acknowledgement & Desk Notification).
- [ ] **Email Dispatch:** Confirm receipt of Customer Acknowledgement email via Resend.
- [ ] **Internal Notification:** Confirm sales desk receives notification email with enquiry details.
- [ ] **Admin Response Composer:** Open the enquiry at `/admin/enquiries/[id]` and send a formal response.
- [ ] **Lifecycle Close:** Mark the test enquiry as `closed` with internal note: *Phase 10 live verification completed*.

---

## 4. Google Search Console & SEO Handover

- [ ] **Domain Property Verification:** Add the Google TXT token to the domain registrar DNS and click **Verify** in Search Console.
- [ ] **Sitemap Submission:** Submit `https://libragems.net/sitemap.xml` in Search Console.
- [ ] **Crawl Budget Audit:** Verify that all 33 URLs are processed without crawl errors or redirect issues.
- [ ] **Rich Results Test:** Test gemstone product URLs via Google Rich Results Tool to verify Schema.org `Product` and `BreadcrumbList` without warnings.

---

## 5. Ongoing Monitoring & Incident Response Readiness

- [ ] **Vercel Runtime Logs:** Bookmark Vercel deployment log stream filtered by status `500`.
- [ ] **Outbox Queue Health Check:** Schedule daily review of `/admin/communications/outbox` for any failed email deliveries.
- [ ] **Resend Webhook Events:** Confirm delivery events are populating in `/admin/communications/email-events`.
- [ ] **Escalation Protocol:** Ensure staff have copies of [`ROLLBACK_AND_RECOVERY.md`](file:///d:/web/LibraGems_Project_Starter_Kit/docs/07-development/ROLLBACK_AND_RECOVERY.md) for SEV-1 to SEV-4 incidents.

---

## 6. Commercial Signoff & Custody Transfer

| Milestone | Signoff Authority | Signature / Confirmation | Date |
|---|---|---|---|
| **Technical Platform Delivery** | Principal Full-Stack Architect | *Verified & Staged* | November 11, 2026 |
| **Operational Operator Training** | DevOps / Lead Engineer | *Delivered via Handover Manual* | November 11, 2026 |
| **Commercial Custody Acceptance** | Managing Director, Libra Gems | ___________________________ | ____________ |
