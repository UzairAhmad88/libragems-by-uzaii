import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getSiteUrl, getCanonicalUrl } from "./site-url";

describe("SEO Site URL Utility", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  describe("getSiteUrl()", () => {
    it("returns default production URL when NEXT_PUBLIC_SITE_URL is not set", () => {
      expect(getSiteUrl()).toBe("https://libragems1.com");
    });

    it("strips trailing slash from configured environment URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://libragems1.com/";
      expect(getSiteUrl()).toBe("https://libragems1.com");
    });

    it("strips multiple trailing slashes from configured URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.libragems1.com///";
      expect(getSiteUrl()).toBe("https://preview.libragems1.com");
    });

    it("ensures https protocol when domain is provided without protocol", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "libragems1.com";
      expect(getSiteUrl()).toBe("https://libragems1.com");
    });

    it("preserves http protocol for local development URLs", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
      expect(getSiteUrl()).toBe("http://localhost:3000");
    });
  });

  describe("getCanonicalUrl()", () => {
    it("returns root base URL when path is empty, undefined, or whitespace", () => {
      expect(getCanonicalUrl()).toBe("https://libragems1.com");
      expect(getCanonicalUrl("")).toBe("https://libragems1.com");
      expect(getCanonicalUrl("   ")).toBe("https://libragems1.com");
    });

    it("returns root base URL when path is single slash", () => {
      expect(getCanonicalUrl("/")).toBe("https://libragems1.com");
    });

    it("normalizes path with leading slash and removes trailing slash", () => {
      expect(getCanonicalUrl("about")).toBe("https://libragems1.com/about");
      expect(getCanonicalUrl("/about")).toBe("https://libragems1.com/about");
      expect(getCanonicalUrl("/about/")).toBe("https://libragems1.com/about");
      expect(getCanonicalUrl("gemstones/hessonite-garnet/")).toBe(
        "https://libragems1.com/gemstones/hessonite-garnet"
      );
    });

    it("accurately constructs nested canonical paths", () => {
      expect(getCanonicalUrl("/quality-sourcing")).toBe(
        "https://libragems1.com/quality-sourcing"
      );
      expect(getCanonicalUrl("/gemstones/turquoise")).toBe(
        "https://libragems1.com/gemstones/turquoise"
      );
    });
  });
});

