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
});
