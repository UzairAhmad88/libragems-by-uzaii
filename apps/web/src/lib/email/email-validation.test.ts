import { describe, it, expect } from "vitest";
import { isValidEmail, sanitizeHeader, escapeHtml } from "./email-validation";

describe("Email Validation & Sanitization", () => {
  describe("isValidEmail", () => {
    it("accepts valid RFC-compliant commercial email addresses", () => {
      expect(isValidEmail("trade@libragems1.com")).toBe(true);
      expect(isValidEmail("julian.vance@vancegems.co.uk")).toBe(true);
      expect(isValidEmail("buyer+urgent@lapidary-atelier.com")).toBe(true);
      expect(isValidEmail("office_bangkok@thai-gems.org")).toBe(true);
    });

    it("rejects malformed email addresses", () => {
      expect(isValidEmail("")).toBe(false);
      expect(isValidEmail("not-an-email")).toBe(false);
      expect(isValidEmail("@missing-user.com")).toBe(false);
      expect(isValidEmail("user@missing-tld")).toBe(false);
      expect(isValidEmail("user@.domain.com")).toBe(false);
      expect(isValidEmail("user@domain..com")).toBe(false);
      expect(isValidEmail("user with spaces@domain.com")).toBe(false);
    });

    it("rejects excessively long or empty email addresses", () => {
      expect(isValidEmail("a@b.")).toBe(false);
      const superLong = "a".repeat(250) + "@domain.com";
      expect(isValidEmail(superLong)).toBe(false);
    });
  });

  describe("sanitizeHeader (SMTP Injection Guard)", () => {
    it("strips newline and carriage return control characters", () => {
      const malicious = "Julian Vance\r\nBcc: evil-spammer@target.com";
      const sanitized = sanitizeHeader(malicious);
      expect(sanitized).not.toContain("\r");
      expect(sanitized).not.toContain("\n");
      expect(sanitized).toBe("Julian Vance  Bcc: evil-spammer@target.com");
    });

    it("strips tab characters", () => {
      const withTabs = "Trading Desk\tBangkok";
      expect(sanitizeHeader(withTabs)).toBe("Trading Desk Bangkok");
    });

    it("handles clean strings and nulls safely", () => {
      expect(sanitizeHeader("Clean Subject")).toBe("Clean Subject");
      expect(sanitizeHeader("")).toBe("");
    });
  });

  describe("escapeHtml (HTML Entity Sanitizer)", () => {
    it("escapes special characters to prevent HTML/XSS injection in mail clients", () => {
      const dirty = '<script>alert("xss")</script> & \'test\'';
      const clean = escapeHtml(dirty);
      expect(clean).toBe(
        "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#039;test&#039;"
      );
    });

    it("leaves regular text untouched", () => {
      expect(escapeHtml("Commercial rough hessonite")).toBe(
        "Commercial rough hessonite"
      );
    });
  });
});
