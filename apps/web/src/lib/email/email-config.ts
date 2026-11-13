/**
 * Transactional Email Configuration & Address Normalization for Libra Gems
 * Supports Hostinger SMTP as Primary Provider and Resend as Alternate/Fallback.
 */

export type EmailProviderType = "smtp" | "resend" | "simulated";

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  connectionTimeout?: number;
  greetingTimeout?: number;
  socketTimeout?: number;
}

/**
 * Determines the currently active email provider based on environment variables.
 * Defaults to 'smtp' (Hostinger SMTP).
 */
export function getEmailProviderType(): EmailProviderType {
  const explicit = (process.env.EMAIL_PROVIDER ?? "").trim().toLowerCase();
  if (explicit === "resend") return "resend";
  if (explicit === "simulated") return "simulated";
  return "smtp";
}

/**
 * Returns structured Hostinger / Standard SMTP connection settings.
 */
export function getSmtpConfig(): SmtpConfig {
  const host = (process.env.SMTP_HOST ?? "").trim() || "smtp.hostinger.com";
  const rawPort = (process.env.SMTP_PORT ?? "").trim();
  const parsedPort = rawPort ? parseInt(rawPort, 10) : 465;
  const port = isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535 ? 465 : parsedPort;

  const rawSecure = (process.env.SMTP_SECURE ?? "").trim().toLowerCase();
  // Port 465 is SSL/TLS by default; port 587 is STARTTLS (secure = false)
  const secure = rawSecure !== ""
    ? rawSecure !== "false" && rawSecure !== "0"
    : port === 465;

  const user = (process.env.SMTP_USER ?? "").trim() || "info@libragems1.com";
  const pass = (process.env.SMTP_PASSWORD ?? "").trim();

  return {
    host,
    port,
    secure,
    user,
    pass,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };
}

/**
 * Verifies if SMTP credentials are provided and valid for real dispatch.
 */
export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(
    config.host &&
    config.host.length > 0 &&
    config.user &&
    config.user.length > 0 &&
    config.pass &&
    config.pass.length > 0 &&
    !config.pass.includes("your-password") &&
    !config.pass.includes("YOUR_REAL_MAILBOX_PASSWORD")
  );
}

/**
 * Verifies if Resend credentials are provided.
 */
export function isResendConfigured(): boolean {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  return Boolean(apiKey.length > 0 && !apiKey.includes("your-api-key"));
}

/**
 * Generic check for whether the active provider is configured.
 */
export function isEmailConfigured(): boolean {
  const provider = getEmailProviderType();
  if (provider === "resend") {
    return isResendConfigured();
  }
  return isSmtpConfigured();
}

/**
 * Default authorized sender identity.
 * Default: Libra Gems <info@libragems1.com>
 */
export function getDefaultFromEmail(): string {
  const from = (process.env.EMAIL_FROM ?? "").trim();
  return from || "Libra Gems <info@libragems1.com>";
}

/**
 * Default reply-to commercial address.
 * Default: info@libragems1.com
 */
export function getDefaultReplyToEmail(): string {
  const replyTo = (process.env.EMAIL_REPLY_TO ?? "").trim();
  return replyTo || "info@libragems1.com";
}

/**
 * Returns an array of validated admin notification emails.
 * Defaults to info@libragems1.com to guarantee every enquiry reaches the desk.
 */
export function getAdminNotificationRecipients(): string[] {
  const raw =
    (process.env.ENQUIRY_NOTIFICATION_EMAILS ?? "").trim() ||
    (process.env.ENQUIRY_TO_EMAIL ?? "").trim() ||
    "info@libragems1.com";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const recipients = raw
    .split(",")
    .map((e) => (e ?? "").trim())
    .filter((e) => e.length > 0 && emailRegex.test(e));

  return recipients.length > 0 ? recipients : ["info@libragems1.com"];
}

/**
 * Webhook cryptographic secret for Resend inbound notifications (if enabled).
 */
export function getWebhookSecret(): string | null {
  const secret = (process.env.RESEND_WEBHOOK_SECRET ?? "").trim();
  return secret.length > 0 ? secret : null;
}
