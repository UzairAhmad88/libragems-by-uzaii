import { AdminRole } from "@/types/database.types";

export type AdminPermission =
  | "gemstones:read"
  | "gemstones:write"
  | "gemstones:delete"
  | "categories:read"
  | "categories:write"
  | "categories:delete"
  | "enquiries:read"
  | "enquiries:write"
  | "enquiries:delete"
  | "team:read"
  | "team:write"
  | "activity:read"
  | "settings:read"
  | "settings:write";

const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  super_admin: [
    "gemstones:read",
    "gemstones:write",
    "gemstones:delete",
    "categories:read",
    "categories:write",
    "categories:delete",
    "enquiries:read",
    "enquiries:write",
    "enquiries:delete",
    "team:read",
    "team:write",
    "activity:read",
    "settings:read",
    "settings:write",
  ],
  administrator: [
    "gemstones:read",
    "gemstones:write",
    "gemstones:delete",
    "categories:read",
    "categories:write",
    "categories:delete",
    "enquiries:read",
    "enquiries:write",
    "team:read",
    "activity:read",
    "settings:read",
  ],
  product_manager: [
    "gemstones:read",
    "gemstones:write",
    "categories:read",
    "categories:write",
    "enquiries:read",
    "activity:read",
    "settings:read",
  ],
  enquiry_manager: [
    "gemstones:read",
    "categories:read",
    "enquiries:read",
    "enquiries:write",
    "activity:read",
    "settings:read",
  ],
};

export function hasPermission(role: AdminRole, permission: AdminPermission): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function canManageGemstones(role: AdminRole): boolean {
  return hasPermission(role, "gemstones:write");
}

export function canManageEnquiries(role: AdminRole): boolean {
  return hasPermission(role, "enquiries:write");
}

export function canManageTeam(role: AdminRole): boolean {
  return hasPermission(role, "team:write");
}
