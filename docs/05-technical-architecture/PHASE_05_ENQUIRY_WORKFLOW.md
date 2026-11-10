# B2B Gemstone Enquiry Workflow & Communication Lifecycle
**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Business Workflow & Technical Specification  
**Status:** Approved & Production-Ready  

---

## 1. Overview

In international gemstone trading, inquiries are not instantaneous retail purchases; they represent structured business dialogues between international buyers (lapidaries, jewelry houses, watchmakers, wholesale merchants) and the Libra Gems trading desk in Bangkok, Thailand.

The communication workflow is designed around five core principles:
1. **Instant Commercial Certainty:** The buyer immediately receives a formal tracking reference (`ENQ-YYYY-XXXXX`) acknowledging their parameters.
2. **Immediate Trading Desk Mobilization:** Bangkok staff receive an internal alert with buyer country, company, requirements, and direct dossier link.
3. **Strict Confidentiality:** Internal gemological notes, pricing margins, and supplier origins are strictly segregated from customer communications.
4. **Structured Status Evolution:** Inquiries transition through well-defined states: `new` -> `in_review` -> `replied` -> `qualified` -> `converted` / `closed`.
5. **Full Audit Trail:** Every customer response and status change is audited in PostgreSQL with Row Level Security.

---

## 2. End-to-End Workflow Diagram

```
[Buyer submits form]
        │
        ▼
[Intake Validation: Honeypot & Zod]
        │
        ▼
[PostgreSQL: Insert Enquiry & Outbox Jobs]
        │
  ┌─────┴────────────────────────┐
  ▼                              ▼
[Job 1: Customer Receipt]    [Job 2: Internal Desk Alert]
"We Have Received..."         "[New Trade Enquiry] ENQ-..."
        │                              │
        │                              ▼
        │                    [Admin Dossier Review]
        │                    /admin/enquiries/[id]
        │                              │
        │                              ▼
        │                    [Admin Response Composer]
        │                    (Drafts formal quotation)
        │                              │
        │                              ▼
        └───────────────────► [Job 3: Formal Response]
                              "Re: Your Libra Gems Enquiry..."
```

---

## 3. Workflow Steps Detail

### Step 1: Public Intake & Intake Protection
- Form on `/contact` or individual gemstone detail pages (`/gemstones/[slug]`).
- Hidden Honeypot trap (`websiteUrlTrap`): If populated by automated bots, the request returns simulated success immediately without inserting into the database.
- Zod schema validates input boundaries: name (2-100), email (RFC valid), message (10-3000), gemstone interest.
- Client IP address is salted and hashed into a 16-character SHA-256 fingerprint for rate-limiting and audit purposes without storing raw PII.

### Step 2: Database Commitment & Reference Assignment
- Stored in `public.enquiries`.
- PostgreSQL trigger executes `public.generate_enquiry_reference()` generating official sequential identifier: `ENQ-2026-XXXXX`.
- Initial handling state: `status = 'new'`, `priority = 'normal'`.

### Step 3: Transactional Outbox Job Creation
- Two notification outbox items are committed:
  1. `customer_acknowledgement`: Transmits official tracking reference, item requested, quantity specifications, and trading office information.
  2. `admin_notification`: Transmits client identity, company, contact details, requirements, and direct URL to internal dossier.
- Outbox processing engine is triggered asynchronously.

### Step 4: Admin Trading Desk Review
- Located at `/admin/enquiries/[id]`.
- Displays buyer profile, material requested, sieve specifications, and inquiry message.
- Gemologist inspects lot availability and records internal findings in `internal_notes`.
- **Confidentiality Rule:** Internal notes are stored with RLS restricted to authenticated staff (`super_admin`, `administrator`, `enquiry_manager`).

### Step 5: Official Response Dispatch
- Rendered via `<AdminResponseComposer />`.
- Features pre-formatted gemological trading templates:
  - *Parcel Sizing & Availability* (carat weights, sieve breakdowns, lot splits).
  - *Bangkok Showroom Invitation* (arranging in-person private inspections in Silom).
  - *Lab Testing & Origin Memos* (Lotus Gemology, GRS, GIT certification).
- Displays dual tabs: Draft and Live Preview with brand styling.
- On send, dispatches official branded email and transitions inquiry status to `replied`.

### Step 6: Status Transitions & Completion
- When an inquiry progresses (e.g. from `in_review` to `qualified` or `converted`), the gemologist can optionally notify the buyer via `sendStatusUpdate(...)`.
- When closed, the full timeline of delivery events remains accessible for audit.
