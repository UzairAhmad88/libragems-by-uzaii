import { Resend } from "resend";
import {
  EmailProvider,
  SendEmailOptions,
  EmailResult,
  WebhookVerificationResult,
} from "./provider";
import { getDefaultFromEmail, getDefaultReplyToEmail } from "./email-config";
import { sanitizeHeader } from "./email-validation";

export class ResendEmailProvider implements EmailProvider {
  public readonly name = "resend";
  private client: Resend | null = null;

  constructor() {
    const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
    if (apiKey && !apiKey.includes("your-api-key")) {
      this.client = new Resend(apiKey);
    }
  }

  async send(options: SendEmailOptions): Promise<EmailResult> {
    const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
    if (!this.client || !apiKey || apiKey.includes("your-api-key")) {
      return {
        success: false,
        error: "Resend provider is not configured in this environment (missing RESEND_API_KEY).",
        provider: this.name,
        isSimulated: true,
      };
    }

    try {
      const from = sanitizeHeader(options.from || getDefaultFromEmail());
      const replyTo = sanitizeHeader(options.replyTo || getDefaultReplyToEmail());
      const subject = sanitizeHeader(options.subject);

      const response = await this.client.emails.send({
        from,
        to: Array.isArray(options.to) ? options.to.map((t) => sanitizeHeader(t)) : sanitizeHeader(options.to),
        replyTo,
        subject,
        html: options.html,
        text: options.text,
        headers: options.headers,
        tags: options.tags,
      });

      if (response.error) {
        return {
          success: false,
          error: `${response.error.name}: ${response.error.message}`,
          provider: this.name,
        };
      }

      return {
        success: true,
        messageId: response.data?.id,
        provider: this.name,
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: (err as Error)?.message || "Unknown error during Resend dispatch.",
        provider: this.name,
      };
    }
  }

  async verifyWebhook(
    payload: string,
    headers: Record<string, string>,
    secret: string
  ): Promise<WebhookVerificationResult> {
    if (!this.client) {
      return {
        isValid: false,
        error: "Resend client not initialized.",
      };
    }

    try {
      // Resend webhook signature verification
      // Headers expect id, timestamp, signature (or svix-id, svix-timestamp, svix-signature)
      const id = headers["svix-id"] || headers["webhook-id"] || headers["id"];
      const timestamp = headers["svix-timestamp"] || headers["webhook-timestamp"] || headers["timestamp"];
      const signature = headers["svix-signature"] || headers["webhook-signature"] || headers["signature"];

      if (!id || !timestamp || !signature) {
        return {
          isValid: false,
          error: "Missing mandatory webhook signature headers.",
        };
      }

      const verifiedEvent = this.client.webhooks.verify({
        payload,
        headers: {
          id,
          timestamp,
          signature,
        },
        webhookSecret: secret,
      });

      return {
        isValid: true,
        event: verifiedEvent,
      };
    } catch (err: unknown) {
      return {
        isValid: false,
        error: (err as Error)?.message || "Invalid webhook signature.",
      };
    }
  }
}

export const defaultEmailProvider = new ResendEmailProvider();
