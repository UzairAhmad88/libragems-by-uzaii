import { describe, it, expect } from "vitest";
import {
  hasPermission,
  canManageGemstones,
  canManageEnquiries,
  canManageTeam,
} from "./permissions";

describe("RBAC Permissions Matrix", () => {
  it("grants super_admin complete permissions across all domains", () => {
    expect(hasPermission("super_admin", "gemstones:write")).toBe(true);
    expect(hasPermission("super_admin", "gemstones:delete")).toBe(true);
    expect(hasPermission("super_admin", "enquiries:delete")).toBe(true);
    expect(hasPermission("super_admin", "team:write")).toBe(true);
    expect(canManageTeam("super_admin")).toBe(true);
    expect(canManageGemstones("super_admin")).toBe(true);
    expect(canManageEnquiries("super_admin")).toBe(true);
  });

  it("grants administrator catalogue and enquiry permissions but restricts team changes", () => {
    expect(hasPermission("administrator", "gemstones:write")).toBe(true);
    expect(hasPermission("administrator", "enquiries:write")).toBe(true);
    expect(hasPermission("administrator", "team:read")).toBe(true);
    expect(hasPermission("administrator", "team:write")).toBe(false);
    expect(canManageTeam("administrator")).toBe(false);
  });

  it("restricts product_manager to catalogue authoring without enquiry mutation", () => {
    expect(canManageGemstones("product_manager")).toBe(true);
    expect(hasPermission("product_manager", "categories:write")).toBe(true);
    expect(hasPermission("product_manager", "enquiries:read")).toBe(true);
    expect(hasPermission("product_manager", "enquiries:write")).toBe(false);
    expect(canManageEnquiries("product_manager")).toBe(false);
    expect(canManageTeam("product_manager")).toBe(false);
  });

  it("restricts enquiry_manager to customer handling without catalogue mutation", () => {
    expect(canManageEnquiries("enquiry_manager")).toBe(true);
    expect(hasPermission("enquiry_manager", "gemstones:read")).toBe(true);
    expect(hasPermission("enquiry_manager", "gemstones:write")).toBe(false);
    expect(canManageGemstones("enquiry_manager")).toBe(false);
    expect(canManageTeam("enquiry_manager")).toBe(false);
  });
});
