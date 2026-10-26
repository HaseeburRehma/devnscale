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
  it("team page shows the founder and all 18 members", async () => {
    const html = await (await get("/team")).text();
    expect(html).toContain("MEET THE FOUNDER");
    expect((html.match(/<article/g) ?? []).length).toBe(18);
    expect(html).toContain("What we care about.");
  });

  it("every service page has the who-it's-for cards and a 6-tab capability explorer", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const services = [...xml.matchAll(/<loc>[^<]*(\/services\/[^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(services.length).toBe(8);
    for (const p of services) {
      const html = await (await get(p)).text();
      expect((html.match(/role="tab"/g) ?? []).length, p).toBe(6);
      expect(html, p).toContain("What you get");
      expect(html, p).toContain("/img/services/fit/");
      expect(html, p).not.toContain("WHAT IS INCLUDED");
    }
  });

  it("home hero has no Our Services button", async () => {
    const html = await (await get("/")).text();
    const hero = html.slice(html.indexOf("IT CONSULTING"), html.indexOf("Happy"));
    expect(hero.length).toBeGreaterThan(100);
    expect(hero).toContain("Book a Consultation");
    expect(hero).not.toContain("Our Services");
  });
  it("every service tab has its own capability panel image", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const services = [...xml.matchAll(/<loc>[^<]*(\/services\/[^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const p of services) {
      const html = await (await get(p)).text();
      const stages = new Set([...html.matchAll(/stages%2F([a-z-]+)\.png/g)].map((m) => m[1]));
      expect(stages.size, p).toBe(6);
    }
  });

  it("about page has the auto-sliding team carousel with every member and no pagination", async () => {
    const html = await (await get("/about")).text();
    expect(html).toContain('aria-roledescription="carousel"');
    for (const name of ["Faisal", "Saadi", "Qazi Ubaid", "Mubashir"]) expect(html).toContain(name);
    expect(html).not.toMatch(/aria-label="Go to slide/);
  });
});
