import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

describe("Enquiries API Rate Limiting & DoS Protection", () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  });

  it("rejects oversized request payloads exceeding 64KB with 413 Payload Too Large", async () => {
    const request = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "content-length": "70000", // > 65536 bytes
      },
      body: JSON.stringify({ fullName: "Attacker" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(413);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Payload exceeds 64KB maximum limit");
  });

  it("enforces rate limit of 5 requests per 10-minute window returning 429 Too Many Requests", async () => {
    const validBody = {
      fullName: "Rate Limit Tester",
      businessEmail: "rate.test@example.com",
      gemstoneInterest: "Rough Hessonite Garnet",
      message: "Requesting lot technical specifications and export terms.",
    };

    const uniqueIp = `192.168.10.${Math.floor(Math.random() * 200 + 10)}`;

    // Submit 5 valid requests
    for (let i = 0; i < 5; i++) {
      const req = new NextRequest("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "x-forwarded-for": uniqueIp,
        },
        body: JSON.stringify(validBody),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    }

    // 6th request from same IP within window should trigger 429
    const blockedReq = new NextRequest("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "x-forwarded-for": uniqueIp,
      },
      body: JSON.stringify(validBody),
    });

    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get("Retry-After")).toBe("600");
    const blockedData = await blockedRes.json();
    expect(blockedData.success).toBe(false);
    expect(blockedData.error).toContain("Too many trade enquiry submissions");
  });
});

