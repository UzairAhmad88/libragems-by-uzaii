/**
 * Transactional Email Configuration & Address Normalization
 */

export function isEmailConfigured(): boolean {
  const apiKey = process.env.RESEND_API_KEY;
  return Boolean(apiKey && apiKey.trim().length > 0 && !apiKey.includes("your-api-key"));
}

export function getDefaultFromEmail(): string {
  return (
    process.env.EMAIL_FROM?.trim() ||
    "Libra Gems Trading Desk <enquiries@libragems.net>"
  );
}

export function getDefaultReplyToEmail(): string {
  return process.env.EMAIL_REPLY_TO?.trim() || "info@libragems.net";
}

/**
 * Returns an array of validated admin notification emails.
 * Strips empty tokens and validates basic email format.
 */
export function getAdminNotificationRecipients(): string[] {
  const raw =
    process.env.ENQUIRY_NOTIFICATION_EMAILS?.trim() ||
    process.env.ENQUIRY_TO_EMAIL?.trim() ||
    "";

  if (!raw) {
    return [];
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0 && emailRegex.test(e));
}

export function getWebhookSecret(): string | null {
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  return secret && secret.length > 0 ? secret : null;
}
