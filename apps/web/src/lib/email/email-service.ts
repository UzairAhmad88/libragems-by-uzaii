import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { defaultEmailProvider } from "./provider-factory";
import { EmailProvider, EmailResult } from "./provider";
import { getAdminNotificationRecipients } from "./email-config";
import { isValidEmail } from "./email-validation";
import {
  renderCustomerAcknowledgementEmail,
  CustomerAcknowledgementData,
} from "./templates/customer-acknowledgement";
import {
  renderAdminNewEnquiryEmail,
  AdminNewEnquiryData,
} from "./templates/admin-new-enquiry";
import {
  renderEnquiryResponseEmail,
  EnquiryResponseData,
} from "./templates/enquiry-response";
import {
  renderEnquiryStatusUpdateEmail,
  EnquiryStatusUpdateData,
} from "./templates/enquiry-status-update";
import { EmailType, EmailEventStatus } from "@/types/database.types";

export interface SendCustomerAcknowledgementPayload {
  enquiryId?: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  gemstoneInterest: string;
  companyName?: string | null;
  quantitySpecs?: string | null;
  message?: string;
}

export interface SendAdminNotificationPayload {
  enquiryId: string;
  referenceNumber: string;
  customerName: string;
  companyName?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  gemstoneInterest: string;
  quantitySpecs?: string | null;
  message: string;
  priority?: string;
  sourcePage?: string | null;
  createdAt?: string;
}

export interface SendAdminResponsePayload {
  enquiryId: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  gemstoneInterest: string;
  responseMessage: string;
  adminName?: string;
  adminTitle?: string;
}

export interface SendStatusUpdatePayload {
  enquiryId: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  gemstoneInterest: string;
  newStatus: string;
  updateDetails?: string;
}

export class EmailService {
  constructor(private provider: EmailProvider = defaultEmailProvider) {}

  /**
   * Helper to log email delivery attempt into public.email_events
   */
  private async logEmailEvent(params: {
    enquiryId?: string;
    emailType: EmailType;
    recipient: string;
    subject: string;
    status: EmailEventStatus;
    providerMessageId?: string;
    lastError?: string;
    sentAt?: string;
    deliveredAt?: string;
    failedAt?: string;
  }) {
    if (!isSupabaseConfigured()) return;

    try {
      const adminClient = createAdminClient();
      if (!adminClient) return;

      await adminClient.from("email_events").insert({
        enquiry_id: params.enquiryId || null,
        provider: this.provider.name,
        provider_message_id: params.providerMessageId || null,
        email_type: params.emailType,
        recipient: params.recipient,
        subject: params.subject,
        status: params.status,
        attempt_count: 1,
        last_error: params.lastError || null,
        sent_at: params.sentAt || null,
        delivered_at: params.deliveredAt || null,
        failed_at: params.failedAt || null,
      });
    } catch (err) {
      console.error("[EmailService] Failed to record email_event:", err);
    }
  }

  /**
   * Send Customer Acknowledgement email
   */
  async sendCustomerAcknowledgement(
    payload: SendCustomerAcknowledgementPayload
  ): Promise<EmailResult> {
    const { referenceNumber, customerName, email, gemstoneInterest } = payload;

    if (!isValidEmail(email)) {
      await this.logEmailEvent({
        enquiryId: payload.enquiryId,
        emailType: "customer_acknowledgement",
        recipient: email,
        subject: "We Have Received Your Enquiry – Libra Gems",
        status: "suppressed",
        lastError: `Recipient address '${email}' failed RFC format validation.`,
        failedAt: new Date().toISOString(),
      });
      return {
        success: false,
        error: `Invalid recipient email format: ${email}`,
        provider: this.provider.name,
      };
    }

    const templateData: CustomerAcknowledgementData = {
      customerName,
      referenceNumber,
      gemstoneInterest,
      companyName: payload.companyName,
      quantitySpecs: payload.quantitySpecs,
      message: payload.message,
    };

    const rendered = renderCustomerAcknowledgementEmail(templateData);

    const result = await this.provider.send({
      to: email,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      tags: [
        { name: "category", value: "customer_acknowledgement" },
        { name: "enquiry_ref", value: referenceNumber },
      ],
    });

    const now = new Date().toISOString();
    await this.logEmailEvent({
      enquiryId: payload.enquiryId,
      emailType: "customer_acknowledgement",
      recipient: email,
      subject: rendered.subject,
      status: result.success ? "sent" : result.isSimulated ? "pending" : "failed",
      providerMessageId: result.messageId,
      lastError: result.error,
      sentAt: result.success ? now : undefined,
      failedAt: !result.success && !result.isSimulated ? now : undefined,
    });

    return result;
  }

  /**
   * Send Internal Admin New Enquiry Notification
   */
  async sendAdminNotification(
    payload: SendAdminNotificationPayload
  ): Promise<EmailResult> {
    const recipients = getAdminNotificationRecipients();

    if (recipients.length === 0) {
      await this.logEmailEvent({
        enquiryId: payload.enquiryId,
        emailType: "admin_notification",
        recipient: "internal-desk@libragems.net",
        subject: `[New Trade Enquiry] ${payload.referenceNumber} – ${payload.gemstoneInterest}`,
        status: "suppressed",
        lastError:
          "No administrative notification recipients configured (ENQUIRY_NOTIFICATION_EMAILS is unset or empty).",
        failedAt: new Date().toISOString(),
      });
      return {
        success: false,
        error: "No admin notification recipients configured.",
        provider: this.provider.name,
        isSimulated: true,
      };
    }

    const templateData: AdminNewEnquiryData = {
      enquiryId: payload.enquiryId,
      referenceNumber: payload.referenceNumber,
      customerName: payload.customerName,
      companyName: payload.companyName,
      email: payload.email,
      phone: payload.phone,
      country: payload.country,
      gemstoneInterest: payload.gemstoneInterest,
      quantitySpecs: payload.quantitySpecs,
      message: payload.message,
      priority: payload.priority || "normal",
      sourcePage: payload.sourcePage,
      createdAt: payload.createdAt || new Date().toISOString(),
    };

    const rendered = renderAdminNewEnquiryEmail(templateData);

    const result = await this.provider.send({
      to: recipients,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      tags: [
        { name: "category", value: "admin_notification" },
        { name: "enquiry_ref", value: payload.referenceNumber },
      ],
    });

    const now = new Date().toISOString();
    for (const recipient of recipients) {
      await this.logEmailEvent({
        enquiryId: payload.enquiryId,
        emailType: "admin_notification",
        recipient,
        subject: rendered.subject,
        status: result.success ? "sent" : result.isSimulated ? "pending" : "failed",
        providerMessageId: result.messageId,
        lastError: result.error,
        sentAt: result.success ? now : undefined,
        failedAt: !result.success && !result.isSimulated ? now : undefined,
      });
    }

    return result;
  }

  /**
   * Send Official Admin Response from Trading Desk to Customer
   */
  async sendAdminResponse(
    payload: SendAdminResponsePayload
  ): Promise<EmailResult> {
    const { referenceNumber, customerName, customerEmail, gemstoneInterest, responseMessage } = payload;

    if (!isValidEmail(customerEmail)) {
      await this.logEmailEvent({
        enquiryId: payload.enquiryId,
        emailType: "admin_response",
        recipient: customerEmail,
        subject: `Re: Your Libra Gems Enquiry – ${referenceNumber}`,
        status: "suppressed",
        lastError: `Recipient address '${customerEmail}' failed RFC format validation.`,
        failedAt: new Date().toISOString(),
      });
      return {
        success: false,
        error: `Invalid recipient email format: ${customerEmail}`,
        provider: this.provider.name,
      };
    }

    const templateData: EnquiryResponseData = {
      customerName,
      referenceNumber,
      gemstoneInterest,
      responseMessage,
      adminName: payload.adminName,
      adminTitle: payload.adminTitle,
    };

    const rendered = renderEnquiryResponseEmail(templateData);

    const result = await this.provider.send({
      to: customerEmail,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      tags: [
        { name: "category", value: "admin_response" },
        { name: "enquiry_ref", value: referenceNumber },
      ],
    });

    const now = new Date().toISOString();
    await this.logEmailEvent({
      enquiryId: payload.enquiryId,
      emailType: "admin_response",
      recipient: customerEmail,
      subject: rendered.subject,
      status: result.success ? "sent" : result.isSimulated ? "pending" : "failed",
      providerMessageId: result.messageId,
      lastError: result.error,
      sentAt: result.success ? now : undefined,
      failedAt: !result.success && !result.isSimulated ? now : undefined,
    });

    return result;
  }

  /**
   * Send Enquiry Status Update notification to Customer
   */
  async sendStatusUpdate(payload: SendStatusUpdatePayload): Promise<EmailResult> {
    const { referenceNumber, customerName, customerEmail, gemstoneInterest, newStatus, updateDetails } = payload;

    if (!isValidEmail(customerEmail)) {
      await this.logEmailEvent({
        enquiryId: payload.enquiryId,
        emailType: "status_update",
        recipient: customerEmail,
        subject: `Status Update on your Enquiry – ${referenceNumber}`,
        status: "suppressed",
        lastError: `Recipient address '${customerEmail}' failed RFC format validation.`,
        failedAt: new Date().toISOString(),
      });
      return {
        success: false,
        error: `Invalid recipient email format: ${customerEmail}`,
        provider: this.provider.name,
      };
    }

    const templateData: EnquiryStatusUpdateData = {
      customerName,
      referenceNumber,
      gemstoneInterest,
      newStatus,
      updateDetails,
    };

    const rendered = renderEnquiryStatusUpdateEmail(templateData);

    const result = await this.provider.send({
      to: customerEmail,
      subject: rendered.subject,
      html: rendered.html,
      text: rendered.text,
      tags: [
        { name: "category", value: "status_update" },
        { name: "enquiry_ref", value: referenceNumber },
      ],
    });

    const now = new Date().toISOString();
    await this.logEmailEvent({
      enquiryId: payload.enquiryId,
      emailType: "status_update",
      recipient: customerEmail,
      subject: rendered.subject,
      status: result.success ? "sent" : result.isSimulated ? "pending" : "failed",
      providerMessageId: result.messageId,
      lastError: result.error,
      sentAt: result.success ? now : undefined,
      failedAt: !result.success && !result.isSimulated ? now : undefined,
    });

    return result;
  }
}

export const defaultEmailService = new EmailService();
