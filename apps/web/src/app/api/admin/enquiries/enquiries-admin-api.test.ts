import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST as handleReply } from "./[id]/reply/route";
import { POST as handleStatus } from "./[id]/status/route";
import * as sessionModule from "@/lib/auth/session";

describe("Admin Enquiries API RBAC & Security", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/admin/enquiries/[id]/reply", () => {
    it("rejects unauthenticated caller with 401 Unauthorized", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/reply", {
        method: "POST",
        body: JSON.stringify({ responseMessage: "This is a detailed response message." }),
      });

      const response = await handleReply(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain("Active administrative session required");
    });

    it("rejects product_manager role with 403 Forbidden (missing enquiries:write)", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue({
        id: "pm-user-id",
        email: "pm@libragems.internal",
        fullName: "Product Manager",
        role: "product_manager",
        isActive: true,
      });

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/reply", {
        method: "POST",
        body: JSON.stringify({ responseMessage: "This is a detailed response message." }),
      });

      const response = await handleReply(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain("does not possess permissions");
    });

    it("validates minimum response message length (rejects < 10 chars with 400)", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue({
        id: "em-user-id",
        email: "em@libragems.internal",
        fullName: "Enquiry Manager",
        role: "enquiry_manager",
        isActive: true,
      });

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/reply", {
        method: "POST",
        body: JSON.stringify({ responseMessage: "Too short" }),
      });

      const response = await handleReply(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain("at least 10 characters");
    });
  });

  describe("POST /api/admin/enquiries/[id]/status", () => {
    it("rejects unauthenticated caller with 401 Unauthorized", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue(null);

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/status", {
        method: "POST",
        body: JSON.stringify({ status: "in_review" }),
      });

      const response = await handleStatus(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain("Active administrative session required");
    });

    it("rejects product_manager role with 403 Forbidden", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue({
        id: "pm-user-id",
        email: "pm@libragems.internal",
        fullName: "Product Manager",
        role: "product_manager",
        isActive: true,
      });

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/status", {
        method: "POST",
        body: JSON.stringify({ status: "in_review" }),
      });

      const response = await handleStatus(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.error).toContain("does not possess permissions");
    });

    it("permits enquiry_manager role to update status", async () => {
      vi.spyOn(sessionModule, "getCurrentAdmin").mockResolvedValue({
        id: "em-user-id",
        email: "em@libragems.internal",
        fullName: "Enquiry Manager",
        role: "enquiry_manager",
        isActive: true,
      });

      const request = new NextRequest("http://localhost:3000/api/admin/enquiries/test-id/status", {
        method: "POST",
        body: JSON.stringify({ status: "in_review", priority: "high" }),
      });

      const response = await handleStatus(request, {
        params: Promise.resolve({ id: "test-id" }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });
});

