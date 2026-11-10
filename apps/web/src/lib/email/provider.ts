/**
 * Universal Email Provider Abstraction for LibraGems.
 * Decouples application business workflows from specific delivery providers (Resend, AWS SES, SMTP).
 */

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
}

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
