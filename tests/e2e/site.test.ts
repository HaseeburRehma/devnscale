import { describe, expect, it } from "vitest";

/* Runs against a live server: E2E_BASE_URL=http://localhost:3100 npm run test:e2e */
const BASE = process.env.E2E_BASE_URL;
const d = BASE ? describe : describe.skip;

async function get(path: string, init?: RequestInit) {
  return fetch(new URL(path, BASE), { redirect: "manual", ...init });
}

d("site e2e", () => {
  it("every sitemap URL and every internal link on those pages returns 200", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(pages.length).toBeGreaterThanOrEqual(29);

    const links = new Set<string>(pages);
    for (const p of pages) {
      const html = await (await get(p)).text();
      for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
        if (!m[1].startsWith("/_next") && !/\.(png|jpe?g|svg|ico|webp|xml|txt)$/.test(m[1])) links.add(m[1]);
      }
    }
    const broken: string[] = [];
    await Promise.all(
      [...links].map(async (l) => {
        const r = await get(l);
        if (r.status !== 200) broken.push(`${l} -> ${r.status}`);
      }),
    );
    expect(broken).toEqual([]);
    expect(links.has("/privacy")).toBe(true);
    expect(links.has("/careers")).toBe(false);
  }, 180_000);

  it("unknown routes render the branded 404", async () => {
    for (const p of ["/careers", "/case-study/nope", "/services/nope"]) {
      const r = await get(p);
      expect(r.status).toBe(404);
      expect(await r.text()).toContain("This page doesn");
    }
  });

  it("sends security headers", async () => {
    const r = await get("/");
    expect(r.headers.get("x-frame-options")).toBe("DENY");
    expect(r.headers.get("x-content-type-options")).toBe("nosniff");
    expect(r.headers.get("referrer-policy")).toBe("strict-origin-when-cross-origin");
    expect(r.headers.get("x-powered-by")).toBeNull();
  });

  it("form APIs refuse cross-site and non-POST requests", async () => {
    const body = JSON.stringify({ email: "a@example.org" });
    const evil = await get("/api/newsletter", {
      method: "POST",
      headers: { origin: "https://evil.com", "content-type": "application/json" },
      body,
    });
    expect([403, 503]).toContain(evil.status);
    expect((await get("/api/contact")).status).toBe(405);
  });
});
