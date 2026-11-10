# Admin Portal User & Operations Guide

**Project:** Libra Gems & Trading Co., Ltd.  
**Portal Route:** `/admin`  
**Target Audience:** LibraGems Internal Trading Desk, Gemologists, and Inventory Leads  

---

## 1. Accessing the Admin Console

1. Navigate to `/admin/login`.
2. Enter your authorized administrative business email (e.g. `admin@libragems.internal`) and password.
3. Upon successful cryptographic verification and active profile confirmation, the portal opens at `/admin/dashboard`.

---

## 2. Navigating the Administration Console

### 2.1 Trade Desk Overview (`/admin/dashboard`)
- High-level KPIs: Active Gemstone Lots, Incoming Enquiries, B2B Channels, RLS Security Health.
- Review recent commercial enquiries and jump directly into active buyer threads.
- Inspect active inventory lots and click directly through to public product presentations.

### 2.2 Gemstone Catalogue Management (`/admin/gemstones`)
- **Catalogue Table:** View all parcels, reference codes (`LG-...`), mineral species, forms, and CIBJO codes.
- **Add Gemstone (`/admin/gemstones/new`):** Fill out complete commercial and gemological attributes.
- **Edit Gemstone (`/admin/gemstones/[id]`):** Update lot weight, sieve dimensions, origin disclosures, or toggle public publication status.

### 2.3 Commercial Enquiries Inbox (`/admin/enquiries`)
- **Filter Tabs:** Quickly filter between All, New, In Review, Qualified, and Replied enquiries.
- **Enquiry Dossier (`/admin/enquiries/[id]`):**
  - Read customer company details, phone/WhatsApp contact, and specific parcel requirements.
  - Advance enquiry status (`New` &rarr; `In Review` &rarr; `Qualified` &rarr; `Replied` &rarr; `Converted` &rarr; `Closed`).
  - Update internal gemological notes for colleague collaboration.
  - Click **"Reply via Official Email"** to trigger a pre-filled client response with the official tracking reference code in the subject.

### 2.4 Team & RBAC Management (`/admin/team`)
- Super admins can inspect personnel accounts, assigned roles, and account statuses.
- Reference the Role-Based Access Matrix to understand permission boundaries.

### 2.5 Activity Audit Log (`/admin/activity`)
- Chronological timeline of all system actions (logins, gemstone creations, status modifications).
- Every record is timestamped in Bangkok local time (UTC+7 / ICT) with operator email identification.

### 2.6 System Settings & Integration Health (`/admin/settings`)
- Check Supabase connectivity, service role key availability, and storage bucket configuration.
- Review external channel readiness (Resend email, WhatsApp trading desk numbers).
