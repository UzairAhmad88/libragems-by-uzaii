import { NextRequest, NextResponse } from "next/server";
import { processOutbox } from "@/lib/email/outbox-processor";

export async function GET(request: NextRequest) {
  return handleOutboxCron(request);
}

export async function POST(request: NextRequest) {
  return handleOutboxCron(request);
}

async function handleOutboxCron(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();

  // If CRON_SECRET is configured, enforce Bearer authorization
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    const querySecret = request.nextUrl.searchParams.get("secret");

    const isHeaderValid = authHeader === `Bearer ${cronSecret}`;
    const isQueryValid = querySecret === cronSecret;

    if (!isHeaderValid && !isQueryValid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized cron execution" },
        { status: 401 }
      );
    }
  }

  try {
    const limitParam = request.nextUrl.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 25;

    const result = await processOutbox({ limit });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (err: unknown) {
    console.error("[Cron] Outbox execution failed:", err);
    return NextResponse.json(
      { success: false, error: (err as Error)?.message || "Outbox processing error" },
      { status: 500 }
    );
  }
}
