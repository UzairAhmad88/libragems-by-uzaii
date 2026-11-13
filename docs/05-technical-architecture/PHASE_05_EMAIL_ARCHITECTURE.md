# Transactional Email Architecture & Provider Design
**Project:** Libra Gems & Trading Co. (Bangkok, Thailand)  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Technical Architecture Specification  
**Primary Provider:** Hostinger Business SMTP (`smtp.hostinger.com:465` SSL/TLS)  
**Status:** Approved & Production-Ready  

---

## 1. Executive Overview

Libra Gems operates an international B2B gemstone trading desk based in Bangkok, Thailand. The commercial model is enquiry-led—facilitating commercial negotiations for wholesale gemstone parcels, lapidary lots, and high-value single stones (such as Ceylon Hessonite Garnet, Sleeping Beauty/Persian Matrix Turquoise, and Afghan Rubellite).

Because commercial gemstone transactions often involve substantial commercial commitments, transactional communications must reflect:
1. **Unconditional Reliability:** A customer inquiry must never be lost or blocked because an email service is degraded or rate-limited.
2. **Quiet Luxury Editorial Identity:** Emails echo the brand's aesthetic standards (Deep Forest `#173D30`, Champagne Gold `#C5A66A`, Soft Parchment `#F5F3EB`) with refined typography and official gemological sign-offs.
3. **Enterprise Defense & Anti-Spoofing:** Robust protection against SMTP header injection, XSS payload execution, address forgery, and credential exposure.
4. **Direct Delivery to Trading Desk:** Every valid website enquiry is automatically dispatched to `info@libragems1.com`, and customers receive automated branded receipts.

---

## 2. Universal Email Provider Abstraction

All transactional dispatch is routed through a vendor-agnostic abstraction defined in `apps/web/src/lib/email/provider.ts`:

```typescript
export interface SendEmailOptions {
  to: string | string[];
  from?: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
  tags?: Array<{ name: string; value: string }>;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider: string;
  isSimulated?: boolean;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  event?: unknown;
  error?: string;
}

export interface EmailProvider {
  name: string;
  send(options: SendEmailOptions): Promise<EmailResult>;
  verifyWebhook(
    payload: string,
    headers: Record<string, string>,
    secret: string
  ): Promise<WebhookVerificationResult>;
}
```

---

## 3. Provider Implementations

### A. Primary Provider: Hostinger SMTP (`SmtpEmailProvider`)
Located in `apps/web/src/lib/email/smtp-provider.ts` using `nodemailer`:
* **Host:** `smtp.hostinger.com`
* **Port:** `465` (SSL/TLS direct socket)
* **Authentication:** Mandatory SASL with `info@libragems1.com`
* **Security:** `tls.rejectUnauthorized = true` (strict certificate verification enforced; never disabled)
* **Timeouts:** `connectionTimeout: 10000`, `greetingTimeout: 10000`, `socketTimeout: 15000`
* **Address Normalization:** All headers sanitized with `sanitizeHeader()` to prevent CRLF injection.
* **Error Sanitization:** Structured error logging without leaking passwords or sensitive tokens.

### B. Secondary / Fallback Provider: Resend (`ResendEmailProvider`)
Located in `apps/web/src/lib/email/resend-provider.ts`:
* Used when `EMAIL_PROVIDER=resend` is set.
* Supports webhook signature verification for delivery lifecycle tracking.

### C. Provider Factory (`provider-factory.ts`)
Resolves the active provider dynamically:
```typescript
export function getActiveEmailProvider(): EmailProvider {
  const providerType = getEmailProviderType();
  if (providerType === "resend") return new ResendEmailProvider();
  return defaultSmtpProvider;
}
```

---

## 4. Email Security & Anti-Abuse Controls

Implemented in `apps/web/src/lib/email/email-validation.ts`:
1. **SMTP Header Injection Defense (`sanitizeHeader`):**
   - Strips `\r`, `\n`, and `\t` from dynamic headers (subject, to, from, reply-to).
   - Prevents attackers from injecting arbitrary headers (`Bcc:`, `Cc:`) into the mail transport agent.
2. **HTML Entity Escaping (`escapeHtml`):**
   - Sanitizes user input fields (`customerName`, `gemstoneInterest`, `companyName`, `message`).
   - Prevents malicious HTML/JavaScript execution in webmail clients.
3. **Strict RFC Address Syntax (`isValidEmail`):**
   - Validates email strings against RFC-compliant regex patterns and length limits (max 254 chars).
   - Suppresses invalid email addresses before making external network calls, preventing bounce reputation decay.
4. **Zero Client-Side Secret Leakage:**
   - Secret keys (`SMTP_PASSWORD`, `RESEND_API_KEY`, `CRON_SECRET`) are never included in `NEXT_PUBLIC_` variables.

---

## 5. Notification Outbox & Fault Tolerance

1. **Enquiry Persistence:** Enquiries are stored in Supabase before email dispatch.
2. **Outbox Enqueueing:** Customer receipt and admin notification jobs enter `public.notification_outbox`.
3. **Optimistic Locking:** Outbox processor locks jobs with `status = 'processing'`.
4. **Exponential Backoff:** Retries failed jobs up to 5 times (2m, 4m, 8m, 16m).
5. **Event Logging:** Every dispatch attempt is logged to `public.email_events` with status `'sent'`, `'pending'`, or `'failed'`.
