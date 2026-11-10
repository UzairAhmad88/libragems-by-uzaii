/**
 * Centralized Canonical Domain & Site URL Configuration for LibraGems
 * Ensures single source of truth for all canonical tags, sitemaps, robots, and Open Graph metadata.
 */

const DEFAULT_PRODUCTION_URL = "https://libragems.net";

/**
 * Normalizes and returns the base site URL without trailing slash.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!envUrl) {
    return DEFAULT_PRODUCTION_URL;
  }

  // Remove trailing slashes
  let cleaned = envUrl.replace(/\/+$/, "");

  // Ensure HTTPS in production if protocol is omitted
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }

  return cleaned;
}

/**
 * Constructs a fully qualified canonical URL for any internal route.
 * Guarantees consistent trailing-slash policy (no trailing slash except root).
 *
 * @example
 * getCanonicalUrl("/gemstones/hessonite-garnet") // "https://libragems.net/gemstones/hessonite-garnet"
 * getCanonicalUrl("/") // "https://libragems.net"
 */
export function getCanonicalUrl(path = ""): string {
  const baseUrl = getSiteUrl();

  if (!path || path === "/" || path.trim() === "") {
    return baseUrl;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Strip trailing slash for consistency
  const cleanPath = normalizedPath.length > 1 ? normalizedPath.replace(/\/+$/, "") : normalizedPath;

  return `${baseUrl}${cleanPath}`;
}

