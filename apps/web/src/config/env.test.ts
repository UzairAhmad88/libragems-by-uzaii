import { describe, it, expect } from "vitest";
import { getEnv } from "./env";

describe("Environment configuration", () => {
  it("provides safe defaults for public execution without external credentials", () => {
    const config = getEnv();
    expect(config.NEXT_PUBLIC_SITE_URL).toBeDefined();
    expect(config.NODE_ENV).toBeDefined();
    // Verification that missing credentials do not crash the public shell
    expect(config.RESEND_API_KEY).toBe("");
    expect(config.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("");
  });

  it("handles empty strings and whitespace safely without failing", () => {
    const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "";
    try {
      const config = getEnv();
      expect(config.NEXT_PUBLIC_SITE_URL).toBe("https://libragems1.com");
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("provides safe defaults for Hostinger SMTP configuration", () => {
    const config = getEnv();
    expect(config.EMAIL_PROVIDER).toBe("smtp");
    expect(config.SMTP_HOST).toBe("smtp.hostinger.com");
    expect(config.SMTP_PORT).toBe(465);
    expect(config.SMTP_SECURE).toBe(true);
    expect(config.SMTP_USER).toBe("info@libragems1.com");
    expect(config.EMAIL_FROM).toBe("Libra Gems <info@libragems1.com>");
    expect(config.EMAIL_REPLY_TO).toBe("info@libragems1.com");
  });

  it("correctly parses custom SMTP ports and security toggles", () => {
    const origPort = process.env.SMTP_PORT;
    const origSecure = process.env.SMTP_SECURE;
    process.env.SMTP_PORT = "587";
    process.env.SMTP_SECURE = "false";

    try {
      const config = getEnv();
      expect(config.SMTP_PORT).toBe(587);
      expect(config.SMTP_SECURE).toBe(false);
    } finally {
      process.env.SMTP_PORT = origPort;
      process.env.SMTP_SECURE = origSecure;
    }
  });

  it("automatically prepends https:// to bare domain strings", () => {
    const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = "libragems-preview.vercel.app";
    try {
      const config = getEnv();
      expect(config.NEXT_PUBLIC_SITE_URL).toBe("https://libragems-preview.vercel.app");
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });
});
