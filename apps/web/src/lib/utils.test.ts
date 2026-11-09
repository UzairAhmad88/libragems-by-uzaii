import { describe, it, expect } from "vitest";
import { cn, formatWhatsAppNumber, buildWhatsAppLink } from "./utils";

describe("Utility functions", () => {
  describe("cn (classnames merger)", () => {
    it("merges classes correctly", () => {
      expect(cn("px-4 py-2", "bg-forest")).toBe("px-4 py-2 bg-forest");
    });

    it("resolves conflicting Tailwind utilities cleanly", () => {
      expect(cn("px-4", "px-6")).toBe("px-6");
      expect(cn("text-ink", "text-forest")).toBe("text-forest");
    });

    it("handles conditional classes", () => {
      expect(cn("base-class", false && "hidden", true && "visible")).toBe("base-class visible");
    });
  });

  describe("formatWhatsAppNumber", () => {
    it("normalizes Thai local number with leading zero to E.164 without plus", () => {
      expect(formatWhatsAppNumber("08-4667-4833")).toBe("66846674833");
      expect(formatWhatsAppNumber("08 4656 6564")).toBe("66846566564");
    });

    it("leaves already-formatted numbers intact", () => {
      expect(formatWhatsAppNumber("+66 84667 4833")).toBe("66846674833");
      expect(formatWhatsAppNumber("66846674833")).toBe("66846674833");
    });
  });

  describe("buildWhatsAppLink", () => {
    it("builds a clean URI-encoded WhatsApp deep link", () => {
      const link = buildWhatsAppLink("08-4667-4833", "Hello LibraGems, I am interested in Hessonite.");
      expect(link).toBe("https://wa.me/66846674833?text=Hello%20LibraGems%2C%20I%20am%20interested%20in%20Hessonite.");
    });
  });
});
