# Communication Center & Admin Response User Guide
**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Internal Staff Operations Manual  
**Status:** Approved & Production-Ready  

---

## 1. Introduction for Trading Desk Staff

The LibraGems Communication Center (`/admin/communications`) is the central operational hub for managing buyer communications, monitoring transactional deliverability, and drafting official commercial proposals from our Bangkok headquarters.

Access is restricted to authorized personnel (`super_admin`, `administrator`, `enquiry_manager`).

---

## 2. Navigating the Communication Center

The communication suite contains four distinct sections:

### 1. Overview (`/admin/communications`)
- **Real-Time Health Status:** Displays whether Resend is actively connected or operating in local simulated mode.
- **Delivery Rate Metrics:** Tracks total dispatches, percentage of confirmed deliveries, pending outbox items, and bounced emails.
- **Recent Activity Table:** Shows the latest acknowledgements, alerts, and replies with timestamps in Bangkok ICT.

### 2. Delivery Events (`/admin/communications/email-events`)
- Searchable, filterable ledger of every email transaction.
- Filter by status (`delivered`, `sent`, `bounced`, `failed`, `suppressed`) or communication type (`customer_acknowledgement`, `admin_notification`, `admin_response`, `status_update`).
- Inspect provider message IDs to cross-reference with Resend logs.

### 3. Notification Outbox (`/admin/communications/outbox`)
- Monitors the asynchronous queue engine.
- If Resend experiences temporary network latency, outbox items are listed with their attempt count and scheduled retry time.
- **Manual Trigger Button:** Click "Process Queue Now" to force an immediate outbox processing run.

### 4. Provider & Settings (`/admin/communications/settings`)
- Displays sender addresses, reply-to routing, and internal recipient inboxes.
- Confidential API keys are intentionally hidden from UI view to prevent shoulder-surfing and credential leakage.

---

## 3. Drafting Official Customer Responses

When reviewing an individual enquiry dossier (`/admin/enquiries/[id]`), scroll to the **Official Trading Response Composer**:

```
┌─────────────────────────────────────────────────────────────┐
│ Official Trading Response Composer        [Draft] [Preview] │
│ Strict Confidentiality: Internal notes are never transmitted│
├─────────────────────────────────────────────────────────────┤
│ Trading Templates: [Parcel Sizing] [Showroom] [Lab Memos]   │
│                                                             │
│ Textarea: "Dear Julian..."                                  │
│                                                             │
│ [Audit notice]                  [Send Official Response]    │
└─────────────────────────────────────────────────────────────┘
```

### Operational Steps:
1. **Choose a Template:** Click one of the quick trading templates to populate standard Bangkok gemological phrasing:
   - **Parcel Sizing & Availability:** Formatted for rough parcels, cabochon material, and sieve distribution inquiries.
   - **Bangkok Showroom Invitation:** Schedules private viewing appointments at our Silom office.
   - **Lab Testing & Origin Memos:** Coordinates testing with Lotus Gemology, GRS, or GIT.
2. **Personalize Quotation:** Adjust weights, lot numbers, or viewing times.
3. **Switch to Live Preview:** Inspect how the email will render on the buyer's desktop and mobile screens with luxury branding and trading desk signatures.
4. **Click "Send Official Response":** Dispatches the email, logs the event, updates the enquiry status to `Replied`, and refreshes the timeline.

---

## 4. Strict Confidentiality Directives

> [!IMPORTANT]
> **Internal Gemological Notes are Confidential:** The notes entered in the "Internal Gemological Notes" field (right-hand sidebar) are for internal trading desk eyes only. The system code physically excludes these notes from outgoing customer emails. Never paste private supplier costs or margin thresholds into the customer response composer.
