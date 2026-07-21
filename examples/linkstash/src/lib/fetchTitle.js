import axios from "axios";

/**
 * Fetch a URL and extract its <title>.
 * Returns "" if there's no title or the request fails.
 */
export async function fetchTitle(url) {
  try {
    const res = await axios.get(url, {
      timeout: 5000,
      maxContentLength: 2_000_000,
      responseType: "text",
    });
    const match = /<title[^>]*>([^<]*)<\/title>/i.exec(res.data);
    return match ? match[1].trim() : "";
  } catch {
    return "";
  }
}
