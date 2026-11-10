import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

describe("POST /api/enquiries", () => {
  it("rejects missing mandatory fields with 400 Bad Request", async () => {
    const request = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "",
        businessEmail: "invalid-email",
        gemstoneInterest: "",
        message: "too short",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.fieldErrors).toBeDefined();
    expect(data.fieldErrors.fullName).toBeDefined();
    expect(data.fieldErrors.businessEmail).toBeDefined();
  });

  it("silently traps bot spam when websiteUrlTrap honeypot is filled", async () => {
    const request = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Spam Bot",
        businessEmail: "bot@spammer.org",
        gemstoneInterest: "Rough Hessonite Garnet (LG-HG-001)",
        message: "Buy cheap backlinks at our website now!",
        websiteUrlTrap: "https://spam.example.com",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.referenceNumber).toContain("ENQ-");
  });

  it("validates and accepts legitimate trade enquiry parameters", async () => {
    const request = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: "Alistair Sterling",
        businessEmail: "a.sterling@sterling-lapidary.co.uk",
        companyName: "Sterling Lapidary Ltd",
        country: "United Kingdom",
        gemstoneInterest: "Commercial-Quality Rough Hessonite Garnet (LG-HG-001)",
        quantitySpecs: "1,000 g parcel split",
        message: "Requesting lot sieve size distribution for 12mm+ cabochon preparation.",
        enquiryType: "parcel_split",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.referenceNumber).toMatch(/^ENQ-\d{4}-\d+$/);
  });
});
