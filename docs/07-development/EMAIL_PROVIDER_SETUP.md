# Resend Provider Setup & Domain Authentication Guide
**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Operational & Developer Setup Guide  
**Status:** Approved & Production-Ready  

---

## 1. Prerequisites

Before connecting production email automation for Libra Gems, ensure you have:
1. Access to the DNS management console for `libragems.net`.
2. An active account at [resend.com](https://resend.com).
3. Production environment access on Vercel or your hosting platform.

---

## 2. Domain Verification & DNS Authentication (DKIM, SPF, DMARC)

To achieve maximum inbox deliverability and prevent corporate spam filtering by international jewelry buyers:

1. Log into **Resend Dashboard** > **Domains** > **Add Domain**.
2. Enter: `libragems.net` (Region: `Singapore / sin1` recommended for Southeast Asia trading desk proximity).
3. Add the following records to your DNS provider (Cloudflare, Route 53, or Namecheap):

| Record Type | Host / Name | Value / Target | Purpose |
|---|---|---|---|
| `TXT` | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQE...` | DKIM Cryptographic Key |
| `MX` | `send` | `feedback-smtp.resend.com` | Mail Routing Priority 10 |
| `TXT` | `send` | `v=spf1 include:amazonses.com ~all` | SPF Authorized Sender |
| `TXT` | `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc@libragems.net` | DMARC Enforcement |

4. Click **Verify DNS Records** in Resend. DNS propagation typically resolves in 5 to 15 minutes.

---

## 3. Generating API Key & Webhook Secret

### A. API Key
1. Navigate to **Resend Dashboard** > **API Keys** > **Create API Key**.
2. **Name:** `LibraGems Production Web App`.
3. **Permissions:** `Sending access` (Domain: `libragems.net`).
4. Copy the key (format: `re_xxxxxxxxxxxxxxxxxxxx`).

### B. Webhooks Configuration
1. Navigate to **Resend Dashboard** > **Webhooks** > **Add Webhook**.
2. **Endpoint URL:** `https://libragems.net/api/webhooks/resend`
3. **Events to listen:**
   - `email.sent`
   - `email.delivered`
   - `email.delivery_delayed`
   - `email.bounced`
   - `email.complained`
4. Save the webhook and copy the **Signing Secret** (format: `whsec_xxxxxxxxxxxx`).

---

## 4. Environment Variables Checklist

Add these variables to your production environment (`.env.production` or Vercel Environment Variables):

```bash
# Transactional Email Credentials
RESEND_API_KEY="re_live_xxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="Libra Gems Trading Desk <enquiries@libragems.net>"
EMAIL_REPLY_TO="info@libragems.net"

# Trading Desk Notification Inboxes (Comma-separated)
ENQUIRY_NOTIFICATION_EMAILS="trading-desk@libragems.net,gemologist@libragems.net"

# Webhook Cryptographic Signing Secret
RESEND_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxx"

# Scheduled Outbox Queue Worker Secret
CRON_SECRET="sec_cron_random_64_character_hex_key"
```

---

## 5. Delivery Verification Testing

1. Submit a test enquiry via the public website: `/contact`.
2. Inspect your trading inbox (`trading-desk@libragems.net`) for the internal alert.
3. Inspect your test customer email for the acknowledgement receipt with reference `ENQ-2026-XXXXX`.
4. Check the Admin Dashboard at `/admin/communications/email-events` to verify the event transitioned from `sent` to `delivered`.
