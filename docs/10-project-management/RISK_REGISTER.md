# Project Risk Register & Risk Management Matrix
**Project:** LibraGems Website Platform  
**Entity:** Libra Gems & Trading Co., Ltd. (Bangkok, Thailand)  
**Document ID:** PRR-001  
**Version:** 1.0  
**Phase:** Phase 00 – Project Audit & Risk Assessment  
**Role:** Senior Project Manager & Software Architect  
**Date:** November 10, 2026  
**Status:** Active Register – Reviewed & Baseline Established

---

## 1. Risk Management Framework

This Risk Register identifies, analyzes, and establishes proactive mitigation strategies for technical, commercial, legal, operational, and digital marketing risks associated with the LibraGems project.

### Risk Scoring Matrix:
- **Probability:** High (3), Medium (2), Low (1)
- **Impact:** High (3), Medium (2), Low (1)
- **Severity Score:** $\text{Probability} \times \text{Impact}$
  - **Critical (7–9):** Project blocker; cannot launch without resolution.
  - **High (5–6):** Substantial business or technical risk; requires active mitigation.
  - **Medium (3–4):** Operational friction; manageable with standard controls.
  - **Low (1–2):** Minor nuisance; monitor during routine development.

---

## 2. Comprehensive Risk Register

| Risk ID | Category | Risk Description | Prob. | Impact | Severity | Mitigation Strategy | Owner | Status |
|---|---|---|---|---|---|---|---|---|
| **RSK-01** | **Business / Trust** | **Unconfirmed Business Contact Details:** Publishing outdated phone numbers or non-working email leads to missed trade deals. | High (3) | High (3) | **Critical (9)** | Enforce strict rule: No contact numbers published without live test verification via telephone and WhatsApp. Client questionnaire issued. | Client / Project Lead | ⚠️ Active (Gate blocker) |
| **RSK-02** | **Asset / Brand** | **Missing Authentic Photography:** Using stock photography for gemstones destroys wholesale buyer confidence. | High (3) | High (3) | **Critical (9)** | Strict ban on stock images for inventory. UI design in Phase 01 will use neutral wireframe placeholders; live launch requires client photo shoot. | Client Executive | ⚠️ Active (Gate blocker) |
| **RSK-03** | **Trade / Legal** | **Unsubstantiated Afghanistan Origin Claim:** Advertising cut Rubellite as "Afghanistan" without lab certification creates legal exposure. | High (3) | High (3) | **Critical (9)** | If lab certificate is absent, require transparent trade disclosure: "Believed Afghanistan origin per trade consensus; lab memo available upon request." | Product Manager / Client | ⚠️ Active (Gate blocker) |
| **RSK-04** | **Commercial** | **Undisclosed Turquoise Stabilization:** Failing to disclose polymer/resin stabilization in commercial turquoise violates CIBJO standards. | Medium (2) | High (3) | **High (6)** | Mandatory treatment specification field on product page: explicitly state "Stabilized" or "Natural Untreated" per verified testing. | Lead Analyst / Client | ⚠️ Active |
| **RSK-05** | **IT / Infra** | **DNS & Domain Access Delays:** Client lacks direct credentials to domain registrar for `libragems.net` delaying SSL & Vercel deployment. | Medium (2) | High (3) | **High (6)** | Request registrar audit immediately in Phase 00. Provide clear DNS delegation instructions (Nameservers or A/CNAME records). | Tech Lead / Client IT | ⚠️ Active |
| **RSK-06** | **Technical / UX** | **Malformed WhatsApp Links:** Non-standard phone formatting (hyphens/zeros) causes WhatsApp web/app to fail to open chat. | High (3) | Medium (2) | **High (6)** | Implement strict E.164 sanitization utility in TypeScript: strip all spaces, parentheses, hyphens, and leading zero; prefix country code `66`. | Full-Stack Engineer | 🛡️ Mitigated in Architecture |
| **RSK-07** | **Security** | **Unprotected Database & Exposed Enquiries:** Missing Row Level Security (RLS) policies allow public inspection of B2B buyer leads. | Medium (2) | High (3) | **High (6)** | Author explicit Supabase RLS policies denying anonymous select/update on `enquiries`. Use Server Actions with service-role for inserts. | Security Lead / DB Architect | 🛡️ Planned (Phase 04) |
| **RSK-08** | **Security / Ops** | **Form Bot Spam & Quota Exhaustion:** Automated spambots flood enquiry form, exhausting Resend email quotas and spamming business inbox. | High (3) | Medium (2) | **High (6)** | Deploy multi-layered anti-spam: hidden honeypot field, minimum 3.5s submission time check, and IP-based rate limiting (5 req/hr). | Full-Stack Engineer | 🛡️ Planned (Phase 05) |
| **RSK-09** | **Technical** | **Tailwind CSS Scaffold Inconsistency:** `apps/web` imports Tailwind v4 without packages declared in `package.json`. | High (3) | Medium (2) | **High (6)** | Resolve dependencies in Phase 02 Foundation: install `@tailwindcss/postcss` and `tailwindcss` or configure stable Tailwind stack. | Frontend Engineer | 🛡️ Planned (Phase 02) |
| **RSK-10** | **Digital Mktg** | **Unrealistic Organic Ranking Expectations:** Expecting instant #1 Google rankings for broad keywords like "rubellite". | High (3) | Medium (2) | **High (6)** | Align client expectations: Organic SEO requires 3–6 months for indexing and authority building. Target high-intent long-tail wholesale queries. | SEO Strategist | 🛡️ Addressed in Docs |
| **RSK-11** | **Operations** | **Email Deliverability Failures:** Notification emails to `info@libragems.net` flagged as spam or dropped by mail server. | Medium (2) | High (3) | **High (6)** | Configure custom sending domain in Resend with verified SPF, DKIM, and DMARC TXT records. Test delivery across multiple client inboxes. | DevOps / Tech Lead | 🛡️ Planned (Phase 05) |
| **RSK-12** | **Compliance** | **Data Privacy & GDPR/PDPA Non-Compliance:** Storing international buyer enquiry data without consent notice. | Low (1) | Medium (2) | **Low (2)** | Add mandatory privacy consent checkbox on enquiry form linking to `/privacy` policy complying with Thai PDPA and GDPR. | Legal / Frontend Engineer | 🛡️ Planned (Phase 03) |

---

## 3. High-Priority Risk Mitigation Roadmap

```
                          CRITICAL RISK PATH & CONTROLS
  ┌───────────────────────────────────────────────────────────────────────────┐
  │ Phase 00 (Discovery)                                                      │
  │ • RSK-01 (Unconfirmed Contacts) ──► Deliver Client Confirmation Checklist │
  │ • RSK-02 (Missing Photos)        ──► Enforce Architectural Placeholders    │
  │ • RSK-03 (Rubellite Origin)      ──► Issue Gemological Requirement Specs   │
  └─────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
  ┌───────────────────────────────────────────────────────────────────────────┐
  │ Phase 02 (Foundation)                                                     │
  │ • RSK-09 (CSS Inconsistency)     ──► Install clean Tailwind CSS packages   │
  │ • RSK-06 (WhatsApp Formatting)   ──► Build E.164 phone sanitization util  │
  └─────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
  ┌───────────────────────────────────────────────────────────────────────────┐
  │ Phase 04 - 05 (Backend & Integrations)                                    │
  │ • RSK-07 (Database Security)     ──► Deploy strict Supabase RLS policies  │
  │ • RSK-08 (Form Spam)             ──► Implement Honeypot & IP Rate Limits   │
  │ • RSK-11 (Email Deliverability)  ──► Configure SPF, DKIM & DMARC in DNS   │
  └───────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Risk Governance & Review Protocol

- The Risk Register will be reviewed at the start and completion of each development phase.
- No P0 or Critical risk may be closed without verifiable operational evidence (e.g., successful test phone call, verified DNS records, accredited lab certificate scan).

---
*Document produced as part of LibraGems Phase 00 Deliverables.*

