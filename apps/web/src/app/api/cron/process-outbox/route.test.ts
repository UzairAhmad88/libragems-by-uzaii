import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST } from "./route";

// Mock outbox-processor
vi.mock("@/lib/email/outbox-processor", () => ({
  processOutbox: vi.fn().mockResolvedValue({
    processed: 2,
    successful: 2,
    failed: 0,
    errors: [],
  }),
}));

describe("Cron Outbox API Security (/api/cron/process-outbox)", () => {
  const originalEnv = process.env.CRON_SECRET;

  beforeEach(() => {
    delete process.env.CRON_SECRET;
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.CRON_SECRET = originalEnv;
    } else {
      delete process.env.CRON_SECRET;
    }
    vi.clearAllMocks();
  });

  it("fails closed with 500 when CRON_SECRET is not configured on server", async () => {
    delete process.env.CRON_SECRET;

    const request = new NextRequest("http://localhost:3000/api/cron/process-outbox");
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Cron authorization secret is not configured");
  });

  it("rejects query string secrets with 400 Bad Request to prevent credential leakage in logs", async () => {
    process.env.CRON_SECRET = "super-secret-cron-token";

    const request = new NextRequest(
      "http://localhost:3000/api/cron/process-outbox?secret=super-secret-cron-token"
    );
    const response = await GET(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Query string secrets are prohibited");
  });

  it("rejects requests without Authorization header with 401 Unauthorized", async () => {
    process.env.CRON_SECRET = "super-secret-cron-token";

    const request = new NextRequest("http://localhost:3000/api/cron/process-outbox");
    const response = await GET(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain("Unauthorized cron execution");
  });

  it("rejects requests with incorrect Bearer token with 401 Unauthorized", async () => {
    process.env.CRON_SECRET = "super-secret-cron-token";

    const request = new NextRequest("http://localhost:3000/api/cron/process-outbox", {
      headers: {
        authorization: "Bearer wrong-token",
      },
    });
    const response = await GET(request);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.success).toBe(false);
  });

  it("authorizes valid Bearer token via GET and triggers processOutbox", async () => {
    process.env.CRON_SECRET = "super-secret-cron-token";

    const request = new NextRequest("http://localhost:3000/api/cron/process-outbox?limit=10", {
      headers: {
        authorization: "Bearer super-secret-cron-token",
      },
    });
    const response = await GET(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.processed).toBe(2);
    expect(data.successful).toBe(2);
  });

  it("authorizes valid Bearer token via POST", async () => {
    process.env.CRON_SECRET = "super-secret-cron-token";

    const request = new NextRequest("http://localhost:3000/api/cron/process-outbox", {
      method: "POST",
      headers: {
        authorization: "Bearer super-secret-cron-token",
      },
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
  });
});

