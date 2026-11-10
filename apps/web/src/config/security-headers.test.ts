import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";

describe("Production Security Headers Configuration", () => {
  it("defines comprehensive security headers covering HSTS, CSP, and framing protection", async () => {
    expect(nextConfig.headers).toBeDefined();

    if (!nextConfig.headers) return;

    const headersList = await nextConfig.headers();
    expect(headersList.length).toBeGreaterThan(0);

    const rootHeaders = headersList.find((h) => h.source === "/:path*");
    expect(rootHeaders).toBeDefined();

    const keys = rootHeaders?.headers.map((h) => h.key) || [];

    // Verify HSTS
    expect(keys).toContain("Strict-Transport-Security");
    const hsts = rootHeaders?.headers.find((h) => h.key === "Strict-Transport-Security");
    expect(hsts?.value).toContain("max-age=63072000");
    expect(hsts?.value).toContain("includeSubDomains");

    // Verify CSP
    expect(keys).toContain("Content-Security-Policy");
    const csp = rootHeaders?.headers.find((h) => h.key === "Content-Security-Policy");
    expect(csp?.value).toContain("default-src 'self'");
    expect(csp?.value).toContain("frame-ancestors 'none'");
    expect(csp?.value).toContain("object-src 'none'");

    // Verify MIME sniffing protection
    expect(keys).toContain("X-Content-Type-Options");
    const nosniff = rootHeaders?.headers.find((h) => h.key === "X-Content-Type-Options");
    expect(nosniff?.value).toBe("nosniff");

    // Verify Clickjacking protection
    expect(keys).toContain("X-Frame-Options");
    const frameOpt = rootHeaders?.headers.find((h) => h.key === "X-Frame-Options");
    expect(frameOpt?.value).toBe("DENY");

    // Verify Referrer Policy
    expect(keys).toContain("Referrer-Policy");

    // Verify Permissions Policy
    expect(keys).toContain("Permissions-Policy");
  });

  it("disables poweredByHeader banner to prevent framework fingerprinting", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });
});

