import { describe, it, expect, vi, beforeEach } from "vitest";
import { SmtpEmailProvider } from "./smtp-provider";
import { SmtpConfig, getSmtpConfig, isSmtpConfigured } from "./email-config";
import { EmailService } from "./email-service";
import type { Transporter } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

describe("SmtpEmailProvider & Hostinger SMTP Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. SMTP Configuration", () => {
    it("returns valid Hostinger SMTP defaults when environment variables are omitted", () => {
      const config = getSmtpConfig();
      expect(config.host).toBe("smtp.hostinger.com");
      expect(config.port).toBe(465);
      expect(config.secure).toBe(true);
      expect(config.user).toBe("info@libragems1.com");
      expect(config.connectionTimeout).toBe(10000);
      expect(config.greetingTimeout).toBe(10000);
      expect(config.socketTimeout).toBe(15000);
    });

    it("correctly identifies missing or placeholder SMTP password", () => {
      const originalPass = process.env.SMTP_PASSWORD;
      process.env.SMTP_PASSWORD = "";
      expect(isSmtpConfigured()).toBe(false);

      process.env.SMTP_PASSWORD = "YOUR_REAL_MAILBOX_PASSWORD";
      expect(isSmtpConfigured()).toBe(false);

      process.env.SMTP_PASSWORD = "ValidSecretPassword123!";
      expect(isSmtpConfigured()).toBe(true);

      process.env.SMTP_PASSWORD = originalPass;
    });

    it("handles invalid or non-numeric port with fallback to 465", () => {
      const origPort = process.env.SMTP_PORT;
      process.env.SMTP_PORT = "invalid-port";

      const config = getSmtpConfig();
      expect(config.port).toBe(465);

      process.env.SMTP_PORT = origPort;
    });

    it("configures port 587 with STARTTLS (secure = false)", () => {
      const origPort = process.env.SMTP_PORT;
      const origSecure = process.env.SMTP_SECURE;
      process.env.SMTP_PORT = "587";
      delete process.env.SMTP_SECURE;

      const config = getSmtpConfig();
      expect(config.port).toBe(587);
      expect(config.secure).toBe(false);

      process.env.SMTP_PORT = origPort;
      process.env.SMTP_SECURE = origSecure;
    });
  });

  describe("2. Email Delivery with Mocked Transporter", () => {
    const validConfig: SmtpConfig = {
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      user: "info@libragems1.com",
      pass: "RealStrongPassword123!",
    };

    it("successfully sends an email with HTML, plain text, and custom reply-to", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({
        messageId: "<msg-12345@libragems1.com>",
        response: "250 OK Message accepted",
      });

      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        from: "Libra Gems <info@libragems1.com>",
        replyTo: "info@libragems1.com",
        subject: "Trade Enquiry Confirmation – ENQ-2026-99001",
        html: "<p>Thank you for your enquiry.</p>",
        text: "Thank you for your enquiry.",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe("<msg-12345@libragems1.com>");
      expect(result.provider).toBe("smtp");

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const calledWith = mockSendMail.mock.calls[0][0];
      expect(calledWith.to).toBe("buyer@luxurygems.ch");
      expect(calledWith.from).toBe("Libra Gems <info@libragems1.com>");
      expect(calledWith.replyTo).toBe("info@libragems1.com");
      expect(calledWith.subject).toBe("Trade Enquiry Confirmation – ENQ-2026-99001");
      expect(calledWith.html).toBe("<p>Thank you for your enquiry.</p>");
      expect(calledWith.text).toBe("Thank you for your enquiry.");
    });

    it("sanitizes email headers and strips CRLF injection attempts", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "<safe-id>" });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      await provider.send({
        to: "recipient@example.com\r\nBcc: hacker@evil.com",
        subject: "Subject Line\r\nInjected-Header: evil",
        html: "<p>Safe Content</p>",
      });

      expect(mockSendMail).toHaveBeenCalledTimes(1);
      const call = mockSendMail.mock.calls[0][0];
      expect(call.to).not.toContain("\r");
      expect(call.to).not.toContain("\n");
      expect(call.subject).not.toContain("\r");
      expect(call.subject).not.toContain("\n");
    });

    it("supports multiple recipients in an array", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "<multi-id>" });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const recipients = ["info@libragems1.com", "gemologist@libragems1.com"];
      const result = await provider.send({
        to: recipients,
        subject: "Multiple Recipient Notice",
        html: "<p>Notice to trading desk.</p>",
      });

      expect(result.success).toBe(true);
      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: recipients,
        })
      );
    });

    it("handles attachments correctly", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({ messageId: "<attach-id>" });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        subject: "Inspection Report",
        html: "<p>Please find attached report.</p>",
        attachments: [
          {
            filename: "lot-memo.pdf",
            content: Buffer.from("mock pdf content"),
            contentType: "application/pdf",
          },
        ],
      });

      expect(result.success).toBe(true);
      const call = mockSendMail.mock.calls[0][0];
      expect(call.attachments).toHaveLength(1);
      expect(call.attachments[0].filename).toBe("lot-memo.pdf");
    });

    it("handles SMTP authentication failure gracefully", async () => {
      const authError = new Error("Invalid login: 535 5.7.8 Username and Password not accepted") as Error & {
        code?: string;
      };
      authError.code = "EAUTH";

      const mockSendMail = vi.fn().mockRejectedValue(authError);
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockRejectedValue(authError),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        subject: "Test Subject",
        html: "<p>Test Content</p>",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("[EAUTH]");
      expect(result.error).toContain("Username and Password not accepted");
    });

    it("handles connection timeouts gracefully without crashing", async () => {
      const timeoutError = new Error("Connection timeout") as Error & { code?: string };
      timeoutError.code = "ETIMEDOUT";

      const mockSendMail = vi.fn().mockRejectedValue(timeoutError);
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockRejectedValue(timeoutError),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        subject: "Test Subject",
        html: "<p>Test Content</p>",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("[ETIMEDOUT]");
    });

    it("handles connection refusal (ECONNREFUSED) gracefully", async () => {
      const refusedError = new Error("connect ECONNREFUSED 127.0.0.1:465") as Error & { code?: string };
      refusedError.code = "ECONNREFUSED";

      const mockSendMail = vi.fn().mockRejectedValue(refusedError);
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockRejectedValue(refusedError),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);

      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        subject: "Test Subject",
        html: "<p>Test Content</p>",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("[ECONNREFUSED]");
    });

    it("returns simulated failure when credentials are missing", async () => {
      const unconfiguredConfig: SmtpConfig = {
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        user: "info@libragems1.com",
        pass: "", // Missing password
      };

      const provider = new SmtpEmailProvider(unconfiguredConfig);
      const result = await provider.send({
        to: "buyer@luxurygems.ch",
        subject: "Test Subject",
        html: "<p>Test Content</p>",
      });

      expect(result.success).toBe(false);
      expect(result.isSimulated).toBe(true);
      expect(result.error).toContain("missing SMTP_PASSWORD");
    });

    it("verifies SMTP connection via verifyConnection()", async () => {
      const mockTransporter = {
        sendMail: vi.fn(),
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);
      const verification = await provider.verifyConnection();
      expect(verification.success).toBe(true);
    });

    it("handles verifyConnection() rejection cleanly", async () => {
      const mockTransporter = {
        sendMail: vi.fn(),
        verify: vi.fn().mockRejectedValue(new Error("Host unreachable")),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const provider = new SmtpEmailProvider(validConfig, mockTransporter);
      const verification = await provider.verifyConnection();
      expect(verification.success).toBe(false);
      expect(verification.error).toContain("Host unreachable");
    });

    it("returns isValid: false for verifyWebhook (SMTP webhook unsupported)", async () => {
      const provider = new SmtpEmailProvider(validConfig);
      const webhook = await provider.verifyWebhook("{}", {}, "secret");
      expect(webhook.isValid).toBe(false);
      expect(webhook.error).toContain("Webhooks are not supported");
    });
  });

  describe("3. EmailService Integration with SMTP Provider", () => {
    const validConfig: SmtpConfig = {
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      user: "info@libragems1.com",
      pass: "ProductionPassword123!",
    };

    it("dispatches customer acknowledgement via SmtpEmailProvider", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({
        messageId: "<ack-msg-id-001>",
      });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const smtpProvider = new SmtpEmailProvider(validConfig, mockTransporter);
      const emailService = new EmailService(smtpProvider);

      const result = await emailService.sendCustomerAcknowledgement({
        enquiryId: "enq-001",
        referenceNumber: "ENQ-2026-10001",
        customerName: "Julian Vance",
        email: "julian@vancegems.co.uk",
        gemstoneInterest: "8.42 ct Ceylon Hessonite Garnet",
        message: "Looking for viewing appointment in Bangkok.",
      });

      expect(result.success).toBe(true);
      expect(result.provider).toBe("smtp");
      expect(mockSendMail).toHaveBeenCalledTimes(1);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.to).toBe("julian@vancegems.co.uk");
      expect(call.subject).toContain("We Have Received Your Enquiry – Libra Gems");
      expect(call.html).toContain("ENQ-2026-10001");
    });

    it("dispatches admin notification to info@libragems1.com via SmtpEmailProvider", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({
        messageId: "<admin-msg-id-002>",
      });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const smtpProvider = new SmtpEmailProvider(validConfig, mockTransporter);
      const emailService = new EmailService(smtpProvider);

      const result = await emailService.sendAdminNotification({
        enquiryId: "enq-002",
        referenceNumber: "ENQ-2026-10002",
        customerName: "Elena Rostova",
        companyName: "Rostova Gioielli Milano",
        email: "elena@rostovagioielli.it",
        gemstoneInterest: "Wholesale Tourmaline Lot (54.80 ct / 12 pcs)",
        quantitySpecs: "12 pieces complete suite",
        message: "Requesting CIBJO memo and export certificate.",
        priority: "high",
      });

      expect(result.success).toBe(true);
      expect(result.provider).toBe("smtp");
      expect(mockSendMail).toHaveBeenCalledTimes(1);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.to).toContain("info@libragems1.com");
      expect(call.subject).toContain("[New Trade Enquiry] ENQ-2026-10002");
      expect(call.html).toContain("Rostova Gioielli Milano");
    });

    it("dispatches admin response directly to customer email with info@libragems1.com reply-to", async () => {
      const mockSendMail = vi.fn().mockResolvedValue({
        messageId: "<resp-msg-id-003>",
      });
      const mockTransporter = {
        sendMail: mockSendMail,
        verify: vi.fn().mockResolvedValue(true),
      } as unknown as Transporter<SMTPTransport.SentMessageInfo>;

      const smtpProvider = new SmtpEmailProvider(validConfig, mockTransporter);
      const emailService = new EmailService(smtpProvider);

      const result = await emailService.sendAdminResponse({
        enquiryId: "enq-003",
        referenceNumber: "ENQ-2026-10003",
        customerName: "Marcus Thorne",
        customerEmail: "m.thorne@thorne-watches.ch",
        gemstoneInterest: "Precision Master Cut Rubellite",
        responseMessage: "The 4.85 ct master emerald cut rubellite is reserved for your review.",
        adminName: "Bangkok Trading Desk",
      });

      expect(result.success).toBe(true);
      expect(result.provider).toBe("smtp");
      expect(mockSendMail).toHaveBeenCalledTimes(1);

      const call = mockSendMail.mock.calls[0][0];
      expect(call.to).toBe("m.thorne@thorne-watches.ch");
      expect(call.replyTo).toBe("info@libragems1.com");
      expect(call.from).toBe("Libra Gems <info@libragems1.com>");
      expect(call.subject).toContain("Re: Your Libra Gems Enquiry – ENQ-2026-10003");
    });
  });
});

