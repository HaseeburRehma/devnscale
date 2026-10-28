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
    expect(links.has("/careers")).toBe(true);
    expect(links.has("/blog")).toBe(true);
  }, 180_000);

  it("unknown routes render the branded 404", async () => {
    for (const p of ["/blog/nope", "/case-study/nope", "/services/nope"]) {
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
  it("team page shows the founder and all 19 members", async () => {
    const html = await (await get("/team")).text();
    expect(html).toContain("MEET THE FOUNDER");
    expect((html.match(/<article/g) ?? []).length).toBe(19);
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
  it("service pages use the Figma capability panels", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const services = [...xml.matchAll(/<loc>[^<]*(\/services\/[^<]+)<\/loc>/g)].map((m) => m[1]);
    for (const p of services) {
      const html = await (await get(p)).text();
      const stages = new Set([...html.matchAll(/img-opt\/services\/stages\/([a-z]+-[1-6])-\d+\.webp/g)].map((m) => m[1]));
      // Every tab has its own Figma panel: <service>-1 to <service>-6.
      expect(stages.size, p).toBe(6);
      for (const st of stages) expect(st, p).toMatch(/^(web|mobile|design|ai|qa|pitch|marketing|staff)-[1-6]$/);
      expect(new Set([...stages].map((st) => st.split("-")[0])).size, p).toBe(1);
    }
  });

  it("every image on every page is a pre-built WebP that loads, never the Vercel optimizer", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    const urls = new Set<string>();
    for (const p of pages) {
      const html = (await (await get(p)).text()).replace(/&amp;/g, "&");
      expect(html, p).not.toContain("/_next/image");
      for (const m of html.matchAll(/(?:src|srcSet|srcset)="([^"]+)"/g)) {
        for (const part of m[1].split(",")) {
          const u = part.trim().split(/\s+/)[0];
          if (u.startsWith("/img-opt/")) urls.add(u);
        }
      }
    }
    expect(urls.size).toBeGreaterThan(100);
    const bad: string[] = [];
    // ~1000 URLs: 16 at a time, or the test machine's own sockets time out.
    const queue = [...urls];
    await Promise.all(
      Array.from({ length: 16 }, async () => {
        for (let u = queue.pop(); u; u = queue.pop()) {
          const r = await get(u);
          await r.arrayBuffer();
          if (r.status !== 200 || r.headers.get("content-type") !== "image/webp") bad.push(`${u} -> ${r.status}`);
        }
      }),
    );
    expect(bad).toEqual([]);
  }, 180_000);

  it("careers page lists the open roles and the hiring steps", async () => {
    const html = await (await get("/careers")).text();
    for (const t of ["Digital Marketing Specialist", "SEO Specialist", "UI/UX Designer", "How Hiring Works.", "Why People Stay."])
      expect(html).toContain(t);
    expect(html).toContain("mailto:careers@devnscale.com");
  });

  it("blog lists every post and each article renders with its contents", async () => {
    const xml = await (await get("/sitemap.xml")).text();
    const posts = [...xml.matchAll(/<loc>[^<]*(\/blog\/[^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(posts.length).toBe(7);
    const index = await (await get("/blog")).text();
    for (const p of posts) {
      expect(index).toContain(`href="${p}"`);
      const html = await (await get(p)).text();
      expect(html, p).toContain("On this page");
      expect(html, p).toContain('"@type":"BlogPosting"');
      expect(html, p).toContain("Keep Reading.");
    }
  });

  it("contact details show both emails, both phones and both offices", async () => {
    for (const page of ["/", "/contact"]) {
      const html = await (await get(page)).text();
      for (const v of ["waseeqaftab786@gmail.com", "+92 310 5636702", "5900 Balcones Dr", "Islamabad"])
        expect(html, page).toContain(v);
    }
  });

  it("about page has the auto-sliding team carousel with every member and no pagination", async () => {
    const html = await (await get("/about")).text();
    expect(html).toContain('aria-roledescription="carousel"');
    for (const name of ["Dawood", "Faisal", "Saadi", "Qazi Ubaid", "Mubashir"]) expect(html).toContain(name);
    expect(html).not.toMatch(/aria-label="Go to slide/);
  });
});
