import { describe, it, expect } from "vitest";
import robots from "./robots";

describe("robots.txt Generator", () => {
  it("generates correct crawling directives for all user agents and Googlebot", () => {
    const config = robots();

    expect(config.rules).toBeDefined();

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

    const wildcardRule = rules.find((r) => r.userAgent === "*");
    expect(wildcardRule).toBeDefined();
    expect(wildcardRule?.allow).toBe("/");
    expect(wildcardRule?.disallow).toEqual(
      expect.arrayContaining(["/admin", "/admin/*", "/api", "/api/*"])
    );

    const googlebotRule = rules.find((r) => r.userAgent === "Googlebot");
    expect(googlebotRule).toBeDefined();
    expect(googlebotRule?.allow).toBe("/");
    expect(googlebotRule?.disallow).toEqual(
      expect.arrayContaining(["/admin", "/admin/*", "/api", "/api/*"])
    );
  });

  it("points to the canonical sitemap.xml location", () => {
    const config = robots();
    expect(config.sitemap).toBe("https://libragems.net/sitemap.xml");
  });
});

