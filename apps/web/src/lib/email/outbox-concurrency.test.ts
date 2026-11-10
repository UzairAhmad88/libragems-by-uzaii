import { describe, it, expect, vi } from "vitest";
import { processOutbox } from "./outbox-processor";
import * as adminModule from "@/lib/supabase/admin";
import * as configModule from "@/lib/supabase/config";

describe("Outbox Concurrency & Job Recovery Safeguards", () => {
  it("skips outbox items atomically if another worker already claimed them", async () => {
    vi.spyOn(configModule, "isSupabaseConfigured").mockReturnValue(true);

    const mockAdminClient = {
      from: vi.fn().mockImplementation((table: string) => {
        if (table === "notification_outbox") {
          return {
            update: vi.fn().mockImplementation((updatePayload: Record<string, unknown>) => {
              if (updatePayload.status === "processing") {
                return {
                  eq: vi.fn().mockReturnThis(),
                  // Simulate 0 rows updated because another worker changed status first
                  select: vi.fn().mockResolvedValue({ data: [], error: null }),
                };
              }
              return {
                eq: vi.fn().mockReturnThis(),
                lte: vi.fn().mockResolvedValue({ error: null }),
              };
            }),
            select: vi.fn().mockReturnValue({
              in: vi.fn().mockReturnValue({
                lte: vi.fn().mockReturnValue({
                  order: vi.fn().mockReturnValue({
                    limit: vi.fn().mockResolvedValue({
                      data: [
                        {
                          id: "race-item-1",
                          event_type: "enquiry_created",
                          entity_type: "enquiry",
                          entity_id: "enq-1",
                          status: "pending",
                          payload: { type: "customer_acknowledgement" },
                        },
                      ],
                      error: null,
                    }),
                  }),
                }),
              }),
            }),
          };
        }
        return {};
      }),
    };

    vi.spyOn(adminModule, "createAdminClient").mockReturnValue(
      mockAdminClient as unknown as ReturnType<typeof adminModule.createAdminClient>
    );

    const mockEmailService = {
      sendCustomerAcknowledgement: vi.fn(),
      sendAdminNotification: vi.fn(),
      sendAdminResponse: vi.fn(),
      sendStatusUpdate: vi.fn(),
    };

    const result = await processOutbox({
      limit: 10,
      emailService: mockEmailService as unknown as Parameters<typeof processOutbox>[0] extends { emailService?: infer S } ? S : never,
    });

    // Item was skipped because select("id") returned empty array
    expect(result.processed).toBe(1);
    expect(result.successful).toBe(0);
    expect(result.failed).toBe(0);
    // Email was NEVER dispatched to prevent duplicate transmission
    expect(mockEmailService.sendCustomerAcknowledgement).not.toHaveBeenCalled();
  });
});

