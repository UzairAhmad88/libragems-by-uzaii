import nodemailer, { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import {
  EmailProvider,
  SendEmailOptions,
  EmailResult,
  WebhookVerificationResult,
} from "./provider";
import {
  SmtpConfig,
  getSmtpConfig,
  isSmtpConfigured,
  getDefaultFromEmail,
  getDefaultReplyToEmail,
} from "./email-config";
import { sanitizeHeader } from "./email-validation";

export class SmtpEmailProvider implements EmailProvider {
  public readonly name = "smtp";
  private transporter: Transporter<SMTPTransport.SentMessageInfo> | null = null;
  private config: SmtpConfig;

  constructor(
    customConfig?: Partial<SmtpConfig>,
    customTransporter?: Transporter<SMTPTransport.SentMessageInfo>
  ) {
    this.config = { ...getSmtpConfig(), ...customConfig };

    if (customTransporter) {
      this.transporter = customTransporter;
    } else if (this.isConfigured()) {
      this.transporter = this.createTransporter(this.config);
    }
  }

  /**
   * Initializes nodemailer transporter with TLS verification and production timeouts.
   */
  private createTransporter(config: SmtpConfig): Transporter<SMTPTransport.SentMessageInfo> {
    const transportOptions: SMTPTransport.Options = {
      host: config.host,
      port: config.port,
      secure: config.secure, // true for 465 (SSL/TLS), false for 587 (STARTTLS)
      auth: {
        user: config.user,
        pass: config.pass,
      },
      // Strict TLS Security: Never disable certificate verification
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      connectionTimeout: config.connectionTimeout || 10000,
      greetingTimeout: config.greetingTimeout || 10000,
      socketTimeout: config.socketTimeout || 15000,
    };

    return nodemailer.createTransport(transportOptions);
  }

  /**
   * Returns whether SMTP has required credentials configured.
   */
  public isConfigured(): boolean {
    return Boolean(
      this.config.host &&
      this.config.host.length > 0 &&
      this.config.user &&
      this.config.user.length > 0 &&
      this.config.pass &&
      this.config.pass.length > 0 &&
      !this.config.pass.includes("your-password") &&
      !this.config.pass.includes("YOUR_REAL_MAILBOX_PASSWORD")
    );
  }

  /**
   * Dispatches transactional email through Hostinger / Standard SMTP server.
   */
  async send(options: SendEmailOptions): Promise<EmailResult> {
    if (!this.transporter || !this.isConfigured()) {
      return {
        success: false,
        error: "Hostinger SMTP provider is not configured (missing SMTP_PASSWORD or credentials).",
        provider: this.name,
        isSimulated: true,
      };
    }

    try {
      const from = sanitizeHeader(options.from || getDefaultFromEmail());
      const replyTo = sanitizeHeader(options.replyTo || getDefaultReplyToEmail());
      const subject = sanitizeHeader(options.subject);

      const to = Array.isArray(options.to)
        ? options.to.map((addr) => sanitizeHeader(addr))
        : sanitizeHeader(options.to);

      const attachments = options.attachments?.map((att) => ({
        filename: sanitizeHeader(att.filename),
        content: att.content,
        contentType: att.contentType,
      }));

      // Sanitize custom headers to prevent CRLF injection
      const sanitizedHeaders: Record<string, string> = {};
      if (options.headers) {
        for (const [key, value] of Object.entries(options.headers)) {
          sanitizedHeaders[sanitizeHeader(key)] = sanitizeHeader(value);
        }
      }

      const mailOptions = {
        from,
        to,
        replyTo,
        subject,
        html: options.html,
        text: options.text,
        attachments,
        headers: Object.keys(sanitizedHeaders).length > 0 ? sanitizedHeaders : undefined,
      };

      const info = await this.transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
        provider: this.name,
      };
    } catch (err: unknown) {
      const error = err as Error & { code?: string; command?: string; responseCode?: number };
      const errorCode = error.code ? `[${error.code}] ` : "";
      const errorMsg = `${errorCode}${error.message || "Unknown error during SMTP dispatch."}`;

      // Structured logging without exposing sensitive passwords or tokens
      console.error("[SmtpEmailProvider] Dispatch error:", {
        code: error.code,
        command: error.command,
        responseCode: error.responseCode,
        message: error.message,
      });

      return {
        success: false,
        error: errorMsg,
        provider: this.name,
      };
    }
  }

  /**
   * Verifies connection and authentication against the SMTP server.
   */
  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.transporter || !this.isConfigured()) {
      return {
        success: false,
        error: "SMTP credentials not configured.",
      };
    }

    try {
      await this.transporter.verify();
      return { success: true };
    } catch (err: unknown) {
      const error = err as Error & { code?: string };
      return {
        success: false,
        error: error.message || "Failed to verify SMTP connection.",
      };
    }
  }

  /**
   * SMTP does not support inbound webhooks (satisfies EmailProvider interface).
   */
  async verifyWebhook(): Promise<WebhookVerificationResult> {
    return {
      isValid: false,
      error: "Webhooks are not supported for standard SMTP delivery.",
    };
  }
}

export const defaultSmtpProvider = new SmtpEmailProvider();

