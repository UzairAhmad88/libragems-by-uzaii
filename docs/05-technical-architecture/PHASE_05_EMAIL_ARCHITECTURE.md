# Transactional Email Architecture & Provider Design
**Project:** Libra Gems & Trading Co., Ltd.  
**Phase:** 05 – Enquiry Communications & Transactional Automation  
**Classification:** Technical Architecture Specification  
**Status:** Approved & Production-Ready  

---

## 1. Executive Overview

Libra Gems operates an international B2B gemstone trading desk based in Silom, Bangkok. The business model is strictly enquiry-led—facilitating commercial negotiations for wholesale gemstone parcels, lapidary lots, and high-value single stones (such as Ceylon Hessonite Garnet, Sleeping Beauty/Persian Matrix Turquoise, and Afghan Rubellite).

Because commercial gemstone transactions often involve tens or hundreds of thousands of dollars in bilateral contracts, transactional communications must reflect:
1. **Unconditional Reliability:** A customer inquiry must never be lost or blocked because an email service is degraded or rate-limited.
2. **Quiet Luxury Editorial Identity:** Emails must echo the brand's aesthetic standards (Deep Forest `#103729`, Forest Green `#174C38`, Champagne `#B99B68`, Soft Ivory `#FAF8F2`) with refined typography and official gemological sign-offs.
3. **Enterprise Defense & Anti-Spoofing:** Robust protection against SMTP header injection, XSS payload execution, address forgery, and credential exposure.

---

## 2. Universal Email Provider Abstraction

To decouple business workflows from third-party vendor APIs (e.g., Resend, AWS SES, Postmark), all transactional dispatch is routed through a vendor-agnostic abstraction defined in `apps/web/src/lib/email/provider.ts`:

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

### Benefits:
- **Zero Lock-In:** The application can seamlessly switch or fail over to AWS SES or private SMTP without modifying intake routes or admin response composers.
- **Deterministic Mocking:** Test suites simulate provider dispatches deterministically without executing live network requests.
- **Graceful Local Simulation:** In developer environments or offline review without `RESEND_API_KEY`, the provider logs transactions and returns `{ success: false, isSimulated: true }`, ensuring local workflows continue without crashing.

---

## 3. Provider Implementation: Resend SDK v6.38.0

The production provider is implemented in `apps/web/src/lib/email/resend-provider.ts` using the official `resend@6.38.0` SDK.

### Key Operational Characteristics:
- **Lazy Initialization:** Only instantiates the Resend client if `RESEND_API_KEY` is non-empty and valid.
- **Native Webhook Signature Verification:** Uses `client.webhooks.verify(...)` powered by standard webhooks, verifying Svix cryptographic signatures (`svix-id`, `svix-timestamp`, `svix-signature`).
- **Tagging & Metadata:** Every dispatch includes category tags (`customer_acknowledgement`, `admin_notification`, `admin_response`, `status_update`) and the commercial dossier tracking reference (e.g., `ENQ-2026-XXXXX`).

---

## 4. Email Security & Anti-Abuse Controls

Implemented in `apps/web/src/lib/email/email-validation.ts`:

1. **SMTP Header Injection Defense (`sanitizeHeader`):**
   - Strips `\r`, `\n`, and `\t` from dynamic headers (subject, to, from, reply-to).
   - Prevents attackers from injecting arbitrary headers (`Bcc:`, `Cc:`, `Content-Type:`) into the mail transport agent.
2. **HTML Entity Escaping (`escapeHtml`):**
   - Sanitizes user input fields (`customerName`, `gemstoneInterest`, `companyName`, `message`) converting `&`, `<`, `>`, `"`, and `'` to safe HTML entities.
   - Prevents malicious HTML/JavaScript execution in webmail clients.
3. **Strict RFC Address Syntax (`isValidEmail`):**
   - Validates email strings against RFC-compliant regex patterns and length limits (max 254 chars).
   - Suppresses invalid email addresses before making external network calls, preventing bounce reputation decay.
4. **Credential Isolation:**
   - Secret keys (`RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`, `CRON_SECRET`) are never included in `NEXT_PUBLIC_` variables and are never bundled into client-side code.

---

## 5. Luxury Editorial Email Template System

All email communications follow the LibraGems design system:
- **Wrapper Layout (`layout.ts`):** 600px max-width container, table-based responsive rendering, Soft Ivory `#FAF8F2` background, Warm Beige border `#DDD8CC`.
- **Top Brand Banner:** Deep Forest `#103729` background with Champagne `#B99B68` subheaders and tracking reference badges.
- **Official Sign-off:** Bangkok Gemological Trading Desk signature with CIBJO ethical disclosure reminders.
- **Dual Format:** Every email generates both rich inline-styled HTML and a clean, legible plain-text counterpart.
