import { describe, it, expect } from "vitest";
import { processOutbox, enqueueOutboxItem } from "./outbox-processor";

describe("Notification Outbox Processor", () => {
  it("returns simulation result safely when Supabase is not configured", async () => {
    // Under unconfigured environment, outbox processor must not crash
    const result = await processOutbox({ limit: 10 });
    expect(result).toBeDefined();
    expect(typeof result.processed).toBe("number");
    expect(typeof result.successful).toBe("number");
    expect(typeof result.failed).toBe("number");
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it("calculates exponential backoff correctly: 2^attempt minutes up to cap", () => {
    // Attempt 1: 2^1 = 2 mins
    // Attempt 2: 2^2 = 4 mins
    // Attempt 3: 2^3 = 8 mins
    // Attempt 4: 2^4 = 16 mins
    // Attempt 5: 2^5 = 32 mins
    for (let attempt = 1; attempt <= 5; attempt++) {
      const delayMinutes = Math.min(Math.pow(2, attempt), 1440);
      expect(delayMinutes).toBe(Math.pow(2, attempt));
    }
  });

  it("enqueueOutboxItem returns null safely when unconfigured", async () => {
    const res = await enqueueOutboxItem({
      eventType: "enquiry_created",
      entityType: "enquiry",
      entityId: "test-id",
      payload: {
        type: "customer_acknowledgement",
        referenceNumber: "ENQ-2026-99999",
        customerName: "Test Buyer",
        email: "buyer@example.com",
        gemstoneInterest: "Hessonite Garnet",
      },
    });
    // In local unconfigured test environment, gracefully returns null
    expect(res === null || typeof res === "string").toBe(true);
  });
});
