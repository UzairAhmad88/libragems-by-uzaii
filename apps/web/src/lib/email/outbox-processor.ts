import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { EmailService, defaultEmailService } from "./email-service";
import { OutboxEventType, Json } from "@/types/database.types";

export type OutboxPayload =
  | ({
      type: "customer_acknowledgement";
      enquiryId?: string;
      referenceNumber: string;
      customerName: string;
      email: string;
      gemstoneInterest: string;
      companyName?: string | null;
      quantitySpecs?: string | null;
      message?: string;
    } & Record<string, unknown>)
  | ({
      type: "admin_notification";
      enquiryId?: string;
      referenceNumber: string;
      customerName: string;
      companyName?: string | null;
      email: string;
      phone?: string | null;
      country?: string | null;
      gemstoneInterest: string;
      quantitySpecs?: string | null;
      message: string;
      priority?: string;
      sourcePage?: string | null;
      createdAt?: string;
    } & Record<string, unknown>)
  | ({
      type: "admin_response";
      enquiryId?: string;
      referenceNumber: string;
      customerName: string;
      customerEmail: string;
      gemstoneInterest: string;
      responseMessage: string;
      adminName?: string;
      adminTitle?: string;
    } & Record<string, unknown>)
  | ({
      type: "status_update";
      enquiryId?: string;
      referenceNumber: string;
      customerName: string;
      customerEmail: string;
      gemstoneInterest: string;
      newStatus: string;
      updateDetails?: string;
    } & Record<string, unknown>);

export interface EnqueueOutboxOptions {
  eventType: OutboxEventType;
  entityType: "enquiry" | "system";
  entityId: string;
  payload: OutboxPayload;
  maxAttempts?: number;
}

export interface ProcessOutboxResult {
  processed: number;
  successful: number;
  failed: number;
  errors: string[];
  isSimulated?: boolean;
}

/**
 * Enqueue a new notification event into the outbox
 */
export async function enqueueOutboxItem(
  options: EnqueueOutboxOptions
): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const adminClient = createAdminClient();
    if (!adminClient) return null;

    const { data, error } = await adminClient
      .from("notification_outbox")
      .insert({
        event_type: options.eventType,
        entity_type: options.entityType,
        entity_id: options.entityId,
        payload: options.payload as unknown as Json,
        status: "pending",
        attempt_count: 0,
        max_attempts: options.maxAttempts || 5,
        next_attempt_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("[Outbox] Failed to enqueue notification item:", error);
      return null;
    }

    return data.id;
  } catch (err) {
    console.error("[Outbox] Exception during enqueue:", err);
    return null;
  }
}

/**
 * Process queued outbox items with exponential backoff and idempotency protection
 */
export async function processOutbox(options?: {
  limit?: number;
  emailService?: EmailService;
}): Promise<ProcessOutboxResult> {
  const limit = options?.limit || 25;
  const emailService = options?.emailService || defaultEmailService;

  if (!isSupabaseConfigured()) {
    return {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [],
      isSimulated: true,
    };
  }

  const adminClient = createAdminClient();
  if (!adminClient) {
    return {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: ["Administrative database client not available."],
    };
  }

  const nowIso = new Date().toISOString();

  // 1. Fetch actionable pending / retryable items
  const { data: queueItems, error: fetchError } = await adminClient
    .from("notification_outbox")
    .select("*")
    .in("status", ["pending", "failed"])
    .lte("next_attempt_at", nowIso)
    .order("next_attempt_at", { ascending: true })
    .limit(limit);

  if (fetchError) {
    console.error("[Outbox] Error fetching outbox queue:", fetchError);
    return {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [fetchError.message],
    };
  }

  if (!queueItems || queueItems.length === 0) {
    return {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [],
    };
  }

  let successful = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const item of queueItems) {
    // 2. Mark as processing (idempotency guard)
    const { error: lockError } = await adminClient
      .from("notification_outbox")
      .update({
        status: "processing",
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id)
      .eq("status", item.status); // Optimistic concurrency check

    if (lockError) {
      // Item was likely picked up by another concurrent runner; skip
      continue;
    }

    const payload = item.payload as OutboxPayload;
    let dispatchResult;

    try {
      switch (payload.type) {
        case "customer_acknowledgement":
          dispatchResult = await emailService.sendCustomerAcknowledgement({
            enquiryId: payload.enquiryId || item.entity_id,
            referenceNumber: payload.referenceNumber,
            customerName: payload.customerName,
            email: payload.email,
            gemstoneInterest: payload.gemstoneInterest,
            companyName: payload.companyName,
            quantitySpecs: payload.quantitySpecs,
            message: payload.message,
          });
          break;

        case "admin_notification":
          dispatchResult = await emailService.sendAdminNotification({
            enquiryId: payload.enquiryId || item.entity_id,
            referenceNumber: payload.referenceNumber,
            customerName: payload.customerName,
            companyName: payload.companyName,
            email: payload.email,
            phone: payload.phone,
            country: payload.country,
            gemstoneInterest: payload.gemstoneInterest,
            quantitySpecs: payload.quantitySpecs,
            message: payload.message,
            priority: payload.priority,
            sourcePage: payload.sourcePage,
            createdAt: payload.createdAt,
          });
          break;

        case "admin_response":
          dispatchResult = await emailService.sendAdminResponse({
            enquiryId: payload.enquiryId || item.entity_id,
            referenceNumber: payload.referenceNumber,
            customerName: payload.customerName,
            customerEmail: payload.customerEmail,
            gemstoneInterest: payload.gemstoneInterest,
            responseMessage: payload.responseMessage,
            adminName: payload.adminName,
            adminTitle: payload.adminTitle,
          });
          break;

        case "status_update":
          dispatchResult = await emailService.sendStatusUpdate({
            enquiryId: payload.enquiryId || item.entity_id,
            referenceNumber: payload.referenceNumber,
            customerName: payload.customerName,
            customerEmail: payload.customerEmail,
            gemstoneInterest: payload.gemstoneInterest,
            newStatus: payload.newStatus,
            updateDetails: payload.updateDetails,
          });
          break;

        default:
          dispatchResult = {
            success: false,
            error: `Unknown notification type: ${(payload as { type?: string })?.type}`,
            provider: "outbox",
          };
      }
    } catch (dispatchErr: unknown) {
      dispatchResult = {
        success: false,
        error: (dispatchErr as Error)?.message || "Unexpected exception during outbox dispatch",
        provider: "outbox",
      };
    }

    // 3. Handle result & calculate exponential backoff if failed
    if (dispatchResult.success) {
      successful++;
      await adminClient
        .from("notification_outbox")
        .update({
          status: "completed",
          processed_at: new Date().toISOString(),
          last_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.id);
    } else {
      failed++;
      const nextAttemptCount = (item.attempt_count || 0) + 1;
      const maxAttempts = item.max_attempts || 5;
      const isExhausted = nextAttemptCount >= maxAttempts;

      errors.push(`[${item.id}] ${dispatchResult.error || "Unknown dispatch failure"}`);

      if (isExhausted) {
        await adminClient
          .from("notification_outbox")
          .update({
            status: "failed",
            attempt_count: nextAttemptCount,
            last_error: dispatchResult.error || "Max attempts exceeded",
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.id);
      } else {
        // Exponential backoff: 2^attempt_count minutes (e.g. 2, 4, 8, 16 mins)
        const delayMinutes = Math.min(Math.pow(2, nextAttemptCount), 1440); // Cap at 24 hours
        const nextAttemptAt = new Date(Date.now() + delayMinutes * 60 * 1000).toISOString();

        await adminClient
          .from("notification_outbox")
          .update({
            status: "pending",
            attempt_count: nextAttemptCount,
            next_attempt_at: nextAttemptAt,
            last_error: dispatchResult.error || "Failed attempt",
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.id);
      }
    }
  }

  return {
    processed: queueItems.length,
    successful,
    failed,
    errors,
  };
}
