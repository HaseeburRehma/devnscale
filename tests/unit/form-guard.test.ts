import { beforeEach, describe, expect, it } from "vitest";
import { clean, isSameOrigin, isValidEmail, rateLimit, resetRateLimits } from "@/lib/form-guard";

describe("isValidEmail", () => {
  it.each(["a@devnscale.com", "first.last+tag@sub.example.co.uk", "o'neil@mail.io"])("accepts %s", (e) =>
    expect(isValidEmail(e)).toBe(true),
  );
  it.each(["a@b.c", "no-at.com", "a@b", "a b@c.com", "a@-b.com", "a@b..com", `${"x".repeat(250)}@b.com`, "a@b.com\nBcc: x@y.com"])(
    "rejects %s",
    (e) => expect(isValidEmail(e)).toBe(false),
  );
});

describe("clean", () => {
  it("trims, caps and strips control chars", () => {
    expect(clean("  hi\r\nthere\u0000 ", 100)).toBe("hi  there");
    expect(clean("abcdef", 3)).toBe("abc");
    expect(clean(42, 10)).toBe("");
    expect(clean({ toString: () => "x" }, 10)).toBe("");
  });
  it("keeps newlines when multiline", () => {
    expect(clean("line1\nline2\r\n\u0007", 100, true)).toBe("line1\nline2");
  });
});

describe("rateLimit", () => {
  beforeEach(resetRateLimits);
  it("allows up to the limit then blocks until the window passes", () => {
    const t = 1_000_000;
    for (let i = 0; i < 3; i++) expect(rateLimit("k", 3, 1000, t).ok).toBe(true);
    const blocked = rateLimit("k", 3, 1000, t + 10);
    expect(blocked.ok).toBe(false);
    expect(rateLimit("other", 3, 1000, t + 10).ok).toBe(true);
    expect(rateLimit("k", 3, 1000, t + 1001).ok).toBe(true);
  });
});

describe("isSameOrigin", () => {
  const req = (h: Record<string, string>) => new Request("http://localhost/api/contact", { method: "POST", headers: h });
  it("accepts matching origin", () => expect(isSameOrigin(req({ origin: "https://www.devnscale.com", host: "www.devnscale.com" }))).toBe(true));
  it("rejects other sites, missing and garbage origins", () => {
    expect(isSameOrigin(req({ origin: "https://evil.com", host: "www.devnscale.com" }))).toBe(false);
    expect(isSameOrigin(req({ host: "www.devnscale.com" }))).toBe(false);
    expect(isSameOrigin(req({ origin: "null", host: "www.devnscale.com" }))).toBe(false);
    expect(isSameOrigin(req({ origin: "https://www.devnscale.com.evil.com", host: "www.devnscale.com" }))).toBe(false);
  });
});
