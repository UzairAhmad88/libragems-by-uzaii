import { describe, it, expect } from "vitest";
import { EmailService } from "./email-service";
import { EmailProvider, SendEmailOptions, EmailResult, WebhookVerificationResult } from "./provider";

class MockEmailProvider implements EmailProvider {
  public readonly name = "mock-provider";
  public sentMessages: SendEmailOptions[] = [];

  async send(options: SendEmailOptions): Promise<EmailResult> {
    this.sentMessages.push(options);
    return {
      success: true,
      messageId: `mock_${Date.now()}_id`,
      provider: this.name,
    };
  }

  async verifyWebhook(): Promise<WebhookVerificationResult> {
    return { isValid: true };
  }
}

describe("EmailService", () => {
  it("dispatches customer acknowledgement via configured provider", async () => {
    const mockProvider = new MockEmailProvider();
    const service = new EmailService(mockProvider);

    const result = await service.sendCustomerAcknowledgement({
      enquiryId: "enq-001",
      referenceNumber: "ENQ-2026-10001",
      customerName: "Julian Vance",
      email: "julian@vancegems.co.uk",
      gemstoneInterest: "Rough Hessonite Garnet",
      message: "Looking for parcel split.",
    });

    expect(result.success).toBe(true);
    expect(result.provider).toBe("mock-provider");
    expect(mockProvider.sentMessages).toHaveLength(1);
    expect(mockProvider.sentMessages[0].to).toBe("julian@vancegems.co.uk");
    expect(mockProvider.sentMessages[0].subject).toContain("We Have Received Your Enquiry – Libra Gems");
  });

  it("suppresses delivery and returns error if customer email is malformed", async () => {
    const mockProvider = new MockEmailProvider();
    const service = new EmailService(mockProvider);

    const result = await service.sendCustomerAcknowledgement({
      referenceNumber: "ENQ-2026-10001",
      customerName: "Julian Vance",
      email: "bad-email-address",
      gemstoneInterest: "Rough Hessonite Garnet",
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid recipient email format");
    expect(mockProvider.sentMessages).toHaveLength(0); // Never sent to provider
  });

  it("dispatches official admin response to customer", async () => {
    const mockProvider = new MockEmailProvider();
    const service = new EmailService(mockProvider);

    const result = await service.sendAdminResponse({
      enquiryId: "enq-002",
      referenceNumber: "ENQ-2026-10002",
      customerName: "Elena Rostova",
      customerEmail: "elena@rostovagioielli.it",
      gemstoneInterest: "Commercial Turquoise",
      responseMessage: "Detailed parcel breakdown and weights attached.",
      adminName: "Bangkok Trading Lead",
    });

    expect(result.success).toBe(true);
    expect(mockProvider.sentMessages).toHaveLength(1);
    expect(mockProvider.sentMessages[0].to).toBe("elena@rostovagioielli.it");
    expect(mockProvider.sentMessages[0].html).toContain("Elena Rostova");
  });

  it("dispatches status update email", async () => {
    const mockProvider = new MockEmailProvider();
    const service = new EmailService(mockProvider);

    const result = await service.sendStatusUpdate({
      enquiryId: "enq-003",
      referenceNumber: "ENQ-2026-10003",
      customerName: "Marcus Thorne",
      customerEmail: "m.thorne@thorne-watches.ch",
      gemstoneInterest: "Afghanistan Rubellite",
      newStatus: "in_review",
      updateDetails: "Lotus Gemology testing scheduled.",
    });

    expect(result.success).toBe(true);
    expect(mockProvider.sentMessages).toHaveLength(1);
    expect(mockProvider.sentMessages[0].to).toBe("m.thorne@thorne-watches.ch");
  });
});
