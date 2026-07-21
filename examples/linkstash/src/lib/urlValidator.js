/**
 * Linkstash URL validation + normalization — the well-tested core.
 *
 * Contract:
 *   isValidUrl(input)  -> true only for a well-formed, absolute URL
 *   normalizeUrl(input) -> a canonical form (lowercased host, no trailing slash)
 */

export function isValidUrl(input) {
  if (typeof input !== "string" || input.trim() === "") return false;
  try {
    // Must parse as an absolute URL.
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

export function normalizeUrl(input) {
  const parsed = new URL(input);
  parsed.hostname = parsed.hostname.toLowerCase();
  // Drop a single trailing slash on the path, but keep the root "/".
  if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }
  return parsed.toString();
}
