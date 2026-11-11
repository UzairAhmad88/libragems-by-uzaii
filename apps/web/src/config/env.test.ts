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
      expect(config.NEXT_PUBLIC_SITE_URL).toBe("https://libragems.net");
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
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
