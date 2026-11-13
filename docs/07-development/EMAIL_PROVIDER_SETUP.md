# Hostinger SMTP & Transactional Email Integration Guide
**Project:** Libra Gems & Trading Co. (Bangkok, Thailand)  
**Production URL:** https://libragems1.com/  
**Primary Provider:** Hostinger Business SMTP (Port 465 SSL/TLS)  
**Status:** Approved & Production-Ready  

---

## 1. Primary Architecture: Hostinger SMTP

Libra Gems uses Hostinger's high-reputation business SMTP mail servers as the primary transactional email delivery mechanism. Every customer trade enquiry automatically dispatches an immediate internal notification to `info@libragems1.com` as well as an official customer acknowledgement receipt.

### Hostinger SMTP Specifications
| Parameter | Setting | Notes |
|---|---|---|
| **SMTP Host** | `smtp.hostinger.com` | Official Hostinger Mail Cluster |
| **SMTP Port** | `465` | Direct SSL/TLS Encrypted Socket |
| **SMTP Security** | `SSL/TLS` (`secure = true`) | Strict certificate verification enforced |
| **SMTP Authentication** | Required | Standard SASL PLAIN/LOGIN |
| **SMTP Username** | `info@libragems1.com` | Official business mailbox |
| **SMTP Password** | `SMTP_PASSWORD` | Configured in Hostinger Cloud / Node.js env |
| **Sender Header (From)** | `Libra Gems <info@libragems1.com>` | SPF & DMARC aligned with `libragems1.com` |
| **Reply-To Address** | `info@libragems1.com` | Directly routes customer responses to trading desk |
| **Admin Recipients** | `info@libragems1.com` | Configurable via `ENQUIRY_NOTIFICATION_EMAILS` |

---

## 2. Hostinger Node.js Environment Configuration

Configure the following environment variables in Hostinger HPanel > **Advanced** > **Node.js Web App** > **Environment Variables**:

```bash
# Primary Transactional Email Provider
EMAIL_PROVIDER="smtp"
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="info@libragems1.com"
SMTP_PASSWORD="YOUR_REAL_MAILBOX_PASSWORD"

# Sender Identity & Routing
EMAIL_FROM="Libra Gems <info@libragems1.com>"
EMAIL_REPLY_TO="info@libragems1.com"
ENQUIRY_NOTIFICATION_EMAILS="info@libragems1.com"

# Public Site Configuration
NEXT_PUBLIC_SITE_URL="https://libragems1.com"

# Outbox Cron Worker Secret
CRON_SECRET="generate_a_random_32_or_64_character_hex_key"

# Database & Storage (Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

> **Security Rule:** Never commit `.env.production` or actual mailbox passwords to GitHub. Use Hostinger's environment manager.

---

## 3. Provider Abstraction & Fallback Switching

The email system uses the `EmailProvider` interface (`src/lib/email/provider.ts`):
* `SmtpEmailProvider` (`src/lib/email/smtp-provider.ts`): Active by default.
* `ResendEmailProvider` (`src/lib/email/resend-provider.ts`): Maintained as a secondary fallback.

To switch providers without modifying code:
* For Hostinger SMTP: Set `EMAIL_PROVIDER=smtp` (or leave unset).
* For Resend API: Set `EMAIL_PROVIDER=resend` and supply `RESEND_API_KEY`.

---

## 4. Notification Outbox & Resilience Architecture

The application ensures customer enquiries are **never lost** even if SMTP is temporarily unreachable:
1. **Submission:** Customer submits an enquiry via `/contact` or any gemstone page.
2. **Persistence:** Enquiry is stored in `public.enquiries`.
3. **Queueing:** Two jobs are enqueued into `public.notification_outbox`:
   - `customer_acknowledgement`
   - `admin_notification`
4. **Immediate Attempt:** Asynchronous background dispatch attempts immediate delivery.
5. **Scheduled Retry:** If the SMTP server experiences a temporary timeout, the outbox worker retries with exponential backoff:
   - Attempt 1: Immediate
   - Attempt 2: 2 minutes
   - Attempt 3: 4 minutes
   - Attempt 4: 8 minutes
   - Attempt 5: 16 minutes
6. **Audit Trail:** Every delivery attempt is logged in `public.email_events` with status `'sent'` or `'failed'`.

---

## 5. Hostinger Scheduled Cron Setup

To ensure queued and retried outbox items process automatically, configure a Cron Job in Hostinger HPanel:

* **Frequency:** Every 5 minutes (`*/5 * * * *`)
* **Command:**
```bash
curl -X POST "https://libragems1.com/api/cron/process-outbox" \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

---

## 6. Verification & Troubleshooting Checklist

| Test Item | Command / URL | Expected Outcome |
|---|---|---|
| **Automated Test Suite** | `npm test` | All 29 test suites (127 tests) pass |
| **TypeScript Validation** | `npm run typecheck` | 0 errors |
| **Contact Form Test** | `https://libragems1.com/contact` | Generates `ENQ-2026-XXXXX` |
| **Admin Delivery** | Check `info@libragems1.com` | Internal dossier arrives within seconds |
| **Customer Receipt** | Check submitted email | Luxury HTML receipt arrives with ref code |
| **Admin Reply Test** | `/admin/enquiries/[id]` | Admin response sent to customer |
| **Audit Logs** | `/admin/communications` | Shows `sent` status and event records |
