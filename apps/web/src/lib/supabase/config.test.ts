import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isSupabaseConfigured, isSupabaseAdminConfigured } from "./config";

describe("Supabase Environment Config Helpers", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("reports false when Supabase variables are empty or missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(isSupabaseConfigured()).toBe(false);
    expect(isSupabaseAdminConfigured()).toBe(false);
  });

  it("reports true for isSupabaseConfigured when URL and anon key are present", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://xyzcompany.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key-sample";

    expect(isSupabaseConfigured()).toBe(true);
    expect(isSupabaseAdminConfigured()).toBe(false);
  });

  it("reports true for isSupabaseAdminConfigured when URL and service key are present", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://xyzcompany.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-key-sample";

    expect(isSupabaseAdminConfigured()).toBe(true);
  });
});
