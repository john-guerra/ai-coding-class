import { describe, it, expect } from "vitest";
import { isValidUrl, normalizeUrl } from "../src/lib/urlValidator.js";

describe("isValidUrl", () => {
  it("accepts well-formed absolute URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
    expect(isValidUrl("http://example.com/path?q=1")).toBe(true);
  });

  it("rejects empty and non-string input", () => {
    expect(isValidUrl("")).toBe(false);
    expect(isValidUrl("   ")).toBe(false);
    expect(isValidUrl(null)).toBe(false);
    expect(isValidUrl(42)).toBe(false);
  });

  it("rejects strings that are not URLs", () => {
    expect(isValidUrl("not a url")).toBe(false);
    expect(isValidUrl("example.com")).toBe(false); // no scheme -> not absolute
  });
});

describe("normalizeUrl", () => {
  it("lowercases the host", () => {
    expect(normalizeUrl("https://Example.COM/Path")).toBe("https://example.com/Path");
  });

  it("drops a trailing slash on the path but keeps the root", () => {
    expect(normalizeUrl("https://example.com/blog/")).toBe("https://example.com/blog");
    expect(normalizeUrl("https://example.com/")).toBe("https://example.com/");
  });
});
