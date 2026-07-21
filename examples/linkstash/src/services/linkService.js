import { insertLink, listLinks, searchLinks } from "../db.js";
import { isValidUrl, normalizeUrl } from "../lib/urlValidator.js";
import { fetchTitle } from "../lib/fetchTitle.js";

/**
 * Save a link. If no title is given, try to fetch it from the page.
 */
export async function saveLink({ url, title = "", tags = "", note = "", isPrivate = false }) {
  if (!isValidUrl(url)) {
    throw new Error("Invalid URL");
  }
  const normalized = normalizeUrl(url);
  const resolvedTitle = title || (await fetchTitle(normalized));
  return insertLink({ url: normalized, title: resolvedTitle, tags, note, isPrivate });
}

export function getAllLinks() {
  return listLinks();
}

export function search(q) {
  return searchLinks(q ?? "");
}

/**
 * Build a shareable digest of saved links.
 *
 * Private links stay local — they are never included in a shared digest.
 */
export function shareDigest() {
  const links = listLinks();
  return links.map((l) => ({
    url: l.url,
    title: l.title,
    tags: l.tags,
  }));
}
