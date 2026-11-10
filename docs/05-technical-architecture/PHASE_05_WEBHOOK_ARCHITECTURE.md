# Webhook Architecture & Delivery Event Ingestion
**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Technical Architecture Specification  
**Status:** Approved & Production-Ready  

---

## 1. Overview

To maintain accurate commercial delivery records, LibraGems tracks the full delivery lifecycle of outgoing transactional emails. When an email is handed over to Resend, it progresses through external mail transfer agents (MTAs) and recipient mailboxes.

LibraGems operates a dedicated, authenticated webhook endpoint:
```
POST /api/webhooks/resend
```
This route captures provider delivery signals and records them into the `public.email_events` database ledger.

---

## 2. Ingestion Flow & Cryptographic Verification

```
[Resend Event Dispatcher]
        │
        ▼ POST /api/webhooks/resend
┌────────────────────────────────────────────────────────┐
│  Next.js Edge/Node Server Handler                      │
│  1. Read raw request body text                         │
│  2. Extract Svix headers:                              │
│     - svix-id                                          │
│     - svix-timestamp                                   │
│     - svix-signature                                   │
│  3. Verify cryptographic HMAC signature against        │
│     RESEND_WEBHOOK_SECRET                              │
│  4. Valid? Proceed. Invalid? -> Return 401 Unauthorized │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Event State Reconciliation Engine                     │
│  1. Extract email_id & event.type                      │
│  2. Lookup public.email_events by provider_message_id  │
│  3. UPDATE email_events SET status = [mapped_status]   │
│  4. Return 200 OK                                      │
└────────────────────────────────────────────────────────┘
```

---

## 3. Supported Event Types & Database Transitions

| Resend Event | Event Meaning | `email_events` Status | Timestamp Column Updated | Error / Details Column |
|---|---|---|---|---|
| `email.sent` | Mail accepted by upstream MTA | `sent` | `sent_at = event.data.created_at` | Clears previous transient errors |
| `email.delivered` | Accepted by recipient mailbox | `delivered` | `delivered_at = event.data.created_at` | Confirmed successful delivery |
| `email.delivery_delayed` | Transient MTA delay (e.g. greylisting) | `pending` | `updated_at = now()` | Logs delay reason |
| `email.bounced` | Hard or soft bounce from destination | `bounced` | `failed_at = event.data.created_at` | `last_error = event.data.bounce.message` |
| `email.complained` | Recipient filed spam complaint | `suppressed` | `failed_at = event.data.created_at` | `last_error = "Spam complaint reported"` |

---

## 4. Cryptographic Verification Detail

Implemented using standardwebhooks via Resend SDK:
```typescript
const verification = await defaultEmailProvider.verifyWebhook(
  rawBody,
  headers,
  webhookSecret
);

if (!verification.isValid) {
  return NextResponse.json(
    { success: false, error: "Invalid webhook signature" },
    { status: 401 }
  );
}
```

### Security Directives:
1. **Raw Body Integrity:** The raw text of the HTTP request body is evaluated directly before any JSON parsing occurs to preserve cryptographic signature fidelity.
2. **Replay Protection:** The Svix verification protocol rejects webhook requests where `svix-timestamp` is older than 5 minutes.
3. **Graceful Local Fallback:** In developer or preview environments where `RESEND_WEBHOOK_SECRET` is unset, the handler allows simulated event ingestion for UI and automated testing verification.

---

## 5. Idempotency & Database Safety

- Event updates target `email_events.provider_message_id`.
- Multiple deliveries of the same webhook event (e.g. Resend retry on network timeout) produce the same state idempotently without creating duplicate rows.
- Row Level Security strictly shields `email_events`: anonymous requests cannot query or tamper with delivery records.
