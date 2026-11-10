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
      expect(getSiteUrl()).toBe("https://libragems.net");
    });

    it("strips trailing slash from configured environment URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://libragems.net/";
      expect(getSiteUrl()).toBe("https://libragems.net");
    });

    it("strips multiple trailing slashes from configured URL", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.libragems.net///";
      expect(getSiteUrl()).toBe("https://preview.libragems.net");
    });

    it("ensures https protocol when domain is provided without protocol", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "libragems.net";
      expect(getSiteUrl()).toBe("https://libragems.net");
    });

    it("preserves http protocol for local development URLs", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
      expect(getSiteUrl()).toBe("http://localhost:3000");
    });
  });

  describe("getCanonicalUrl()", () => {
    it("returns root base URL when path is empty, undefined, or whitespace", () => {
      expect(getCanonicalUrl()).toBe("https://libragems.net");
      expect(getCanonicalUrl("")).toBe("https://libragems.net");
      expect(getCanonicalUrl("   ")).toBe("https://libragems.net");
    });

    it("returns root base URL when path is single slash", () => {
      expect(getCanonicalUrl("/")).toBe("https://libragems.net");
    });

    it("normalizes path with leading slash and removes trailing slash", () => {
      expect(getCanonicalUrl("about")).toBe("https://libragems.net/about");
      expect(getCanonicalUrl("/about")).toBe("https://libragems.net/about");
      expect(getCanonicalUrl("/about/")).toBe("https://libragems.net/about");
      expect(getCanonicalUrl("gemstones/hessonite-garnet/")).toBe(
        "https://libragems.net/gemstones/hessonite-garnet"
      );
    });

    it("accurately constructs nested canonical paths", () => {
      expect(getCanonicalUrl("/quality-sourcing")).toBe(
        "https://libragems.net/quality-sourcing"
      );
      expect(getCanonicalUrl("/gemstones/turquoise")).toBe(
        "https://libragems.net/gemstones/turquoise"
      );
    });
  });
});

