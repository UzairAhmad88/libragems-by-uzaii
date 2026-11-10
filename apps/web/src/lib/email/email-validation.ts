/**
 * Email Security & Input Sanitization Utilities
 * Prevents SMTP header injection, HTML injection, and address spoofing.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates whether an email string complies with standard RFC syntax.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Strips carriage returns and newlines to prevent SMTP header injection attacks.
 */
export function sanitizeHeader(value: string): string {
  if (!value) return "";
  return value.replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Escapes HTML entities to prevent malicious payload execution in email viewers.
 */
export function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
