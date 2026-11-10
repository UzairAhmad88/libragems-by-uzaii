# Libra Gems & Trading Co., Ltd.
## Phase 11 — Business Information, Legal & Commercial Readiness Checklist

**Document Reference:** `docs/07-development/PHASE_11_BUSINESS_READINESS_CHECKLIST.md`  
**Classification:** Business Owner Custody & Corporate Compliance Verification  
**Corporate Entity:** Libra Gems & Trading Co., Ltd.  
**Jurisdiction:** Bangkok, Kingdom of Thailand  
**Target Domain:** `https://libragems.net`  
**Version:** 1.0.0 (Pre-Launch Protocol)

---

## 1. Corporate Identity & Registered Office Verification

In accordance with Thai corporate law and the non-fabrication standard (ADR-09), all published corporate details must be verified against official Department of Business Development (DBD) registration records:

- [ ] **Official Registered Company Name:** Confirm exact legal entity name: `Libra Gems & Trading Co., Ltd.` (Thai: `บริษัท ลิบรา เจมส์ แอนด์ เทรดดิ้ง จำกัด`).
- [ ] **Tax Identification Number (Tax ID):** Obtain official 13-digit Thai corporate tax registration number for inclusion on formal export pro-forma invoices.
- [ ] **Physical Commercial Premises:** Confirm registered office address in Bangkok's jewelry and gemstone trade district (Bang Rak / Silom / Surawong):
  * Room/Suite Number: ________________________________________
  * Building / Commercial Tower: ________________________________________
  * Street / Road: ________________________________________
  * Sub-district (Khwaeng): ________________________________________
  * District (Khet): `Bang Rak` (or as registered)
  * Province & Postal Code: `Bangkok 10500, Thailand`
- [ ] **Commercial Trading Hours:** Establish official operating desk hours (e.g., Monday – Friday, 09:30 – 18:00 ICT, UTC+7).

---

## 2. Communications & Telephony Infrastructure

Before marketing to international buyers, verify active physical custody of all corporate communication channels:

- [ ] **Registered Landline Telephone:** Provide official Bangkok landline phone number with international area code (`+66 2 ...`). Unverified placeholder numbers are strictly prohibited (ADR-09).
- [ ] **Dedicated WhatsApp Business SIM:** Secure a dedicated corporate mobile SIM card registered under the company name, formatted as E.164 digits without spaces (e.g. `66812345678`), for integration into `<WhatsAppCTA />` buttons.
- [ ] **Trading Desk Email Routing:** Confirm the distribution list for wholesale inquiries arriving via `/api/enquiries`:
  * Primary Receiving Desk: `enquiries@libragems.net`
  * Executive Notification: `director@libragems.net`
  * General Inquiries: `info@libragems.net`
- [ ] **Domain Mail Routing Safety Check:** Confirm with the IT administrator that adding Resend DKIM/SPF DNS records will not interfere with existing primary corporate mail exchangers (e.g. Google Workspace or Microsoft 365).

---

## 3. Thai Legal Compliance & Commercial Terms

- [ ] **Personal Data Protection Act (PDPA B.E. 2562):** Submit the generated Privacy Policy (`/privacy`) to qualified Thai legal counsel to confirm statutory alignment regarding:
  * Lawful basis for processing wholesale client data.
  * International cross-border data transfer disclosure (Supabase Singapore hosting).
  * Data subject access, correction, and deletion request procedures.
- [ ] **International Terms of Trade (`/terms`):** Submit the commercial terms to international trade counsel to confirm:
  * Incoterms 2020 definitions (FOB Suvarnabhumi Bangkok / CIF destination airport).
  * Currency denomination (United States Dollars — USD).
  * Payment terms (Bank Telegraphic Transfer / Approved Third-Party Gemological Escrow).
  * Dispute resolution and arbitration under the jurisdiction of the Thai Arbitration Institute (TAI) or Bangkok Courts.

---

## 4. Gemological Laboratory Accreditation & Export Standards

Wholesale buyers require verified third-party laboratory credentials prior to finalizing high-value contracts:

- [ ] **Accredited Bangkok Laboratories:** Confirm formal trade accounts or submission arrangements with premier accredited Bangkok laboratories:
  * **GIT:** Gem and Jewelry Institute of Thailand (National Gemological Laboratory).
  * **Lotus Gemology:** Specialized laboratory for colored stones, ruby, sapphire, and spinel origin reports.
  * **AIGS:** Asian Institute of Gemological Sciences (Bangkok Jewelry Trade Center).
- [ ] **Export Customs Procedures:** Confirm procedures for Thai Customs gemstone export clearance and CIBJO-compliant export packing declarations.

---

## 5. Google Search Console & Brand Trust Activation

- [ ] **Search Console Ownership:** Business owner adds the Google-provided TXT token to the domain registrar DNS zone to verify ownership of the Domain property `libragems.net`.
- [ ] **Sitemap Submission:** Submit `https://libragems.net/sitemap.xml` in Search Console upon DNS activation.
- [ ] **Brand Entity Authority:** Verify that Organization and WebSite Schema.org JSON-LD structured data accurately reflects the verified Bangkok business identity without speculative or promotional rating badges.
