import { describe, it, expect } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

describe("Resend Webhook API Route", () => {
  it("rejects payload missing event type or email_id", async () => {
    const req = new NextRequest("http://localhost:3000/api/webhooks/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {},
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toContain("Missing event type or email_id");
  });

  it("handles valid event format gracefully in dev simulation mode", async () => {
    const req = new NextRequest("http://localhost:3000/api/webhooks/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "email.delivered",
        data: {
          email_id: "msg_test_12345",
          created_at: new Date().toISOString(),
        },
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.eventType).toBe("email.delivered");
    expect(json.emailId).toBe("msg_test_12345");
  });
});
