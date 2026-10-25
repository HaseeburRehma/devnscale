import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));
process.env.RESEND_API_KEY = "re_test";

const { POST: contact } = await import("@/app/api/contact/route");
const { POST: newsletter } = await import("@/app/api/newsletter/route");
const { resetRateLimits } = await import("@/lib/form-guard");

let ip = 0;
function post(body: unknown, headers: Record<string, string> = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://localhost:3000/api/x", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      host: "localhost:3000",
      "content-type": "application/json",
      "x-forwarded-for": `10.0.0.${++ip}`,
      ...headers,
    },
    body: raw,
  });
}

const valid = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.org",
  company: "Analytical",
  service: "Web Development",
  details: "We need a new marketing site with a CMS.",
};

beforeEach(() => {
  resetRateLimits();
  send.mockReset();
  send.mockResolvedValue({ data: { id: "1" }, error: null });
});

describe("POST /api/contact", () => {
  it("sends owner + confirmation emails for a valid enquiry", async () => {
    const res = await contact(post(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(2);
    expect(send.mock.calls[0][0]).toMatchObject({ to: ["waseeq.aftab@devnscale.com"], replyTo: "ada@example.org" });
    expect(send.mock.calls[1][0]).toMatchObject({ to: ["ada@example.org"] });
  });

  it("silently drops honeypot hits", async () => {
    const res = await contact(post({ ...valid, website: "spam.biz" }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    [{ ...valid, firstName: "" }, "first name"],
    [{ ...valid, lastName: "  " }, "last name"],
    [{ ...valid, email: "a@b.c" }, "valid email"],
    [{ ...valid, details: "short" }, "few sentences"],
    [{ ...valid, details: "x".repeat(5001) }, "5,000"],
    [{ ...valid, firstName: ["Ada"] }, "first name"],
  ])("rejects invalid input %#", async (body, msg) => {
    const res = await contact(post(body));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain(msg);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects cross-site, non-JSON, malformed and oversized requests", async () => {
    expect((await contact(post(valid, { origin: "https://evil.com" }))).status).toBe(403);
    expect((await contact(post(valid, { origin: "" }))).status).toBe(403);
    expect((await contact(post(valid, { "content-type": "text/plain" }))).status).toBe(415);
    expect((await contact(post("{not json"))).status).toBe(400);
    expect((await contact(post("[1,2]"))).status).toBe(400);
    expect((await contact(post("null"))).status).toBe(400);
    expect((await contact(post({ ...valid, details: "x".repeat(20_000) }))).status).toBe(413);
    expect(send).not.toHaveBeenCalled();
  });

  it("strips header-injection attempts and caps field lengths", async () => {
    await contact(post({ ...valid, firstName: "Ada\r\nBcc: victim@x.com", company: "c".repeat(500) }));
    const ownerMail = send.mock.calls[0][0];
    expect(ownerMail.subject).not.toMatch(/[\r\n]/);
    expect(ownerMail.html).not.toContain("c".repeat(121));
  });

  it("escapes HTML in the owner email", async () => {
    await contact(post({ ...valid, details: "<script>alert(1)</script> hello there" }));
    expect(send.mock.calls[0][0].html).not.toContain("<script>alert(1)</script>");
  });

  it("rate limits one IP to 5 per window", async () => {
    const h = { "x-forwarded-for": "9.9.9.9" };
    const codes = [];
    for (let i = 0; i < 7; i++) codes.push((await contact(post(valid, h))).status);
    expect(codes).toEqual([200, 200, 200, 200, 200, 429, 429]);
    expect(send).toHaveBeenCalledTimes(10);
  });

  it("survives 200 concurrent requests from one IP: only 5 get through", async () => {
    const h = { "x-forwarded-for": "8.8.8.8" };
    const res = await Promise.all(Array.from({ length: 200 }, () => contact(post(valid, h))));
    const ok = res.filter((r) => r.status === 200).length;
    expect(ok).toBe(5);
    expect(res.filter((r) => r.status === 429).length).toBe(195);
  });

  it("caps total sends even when the attacker rotates IPs", async () => {
    const res = await Promise.all(
      Array.from({ length: 60 }, (_, i) => contact(post(valid, { "x-forwarded-for": `172.16.${i}.1` }))),
    );
    expect(res.filter((r) => r.status === 200).length).toBe(40);
    expect(res.filter((r) => r.status === 429).length).toBe(20);
  });

  it("returns 502 when the owner email fails", async () => {
    send.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    expect((await contact(post(valid))).status).toBe(502);
  });

  it("returns 503 without an API key", async () => {
    vi.resetModules();
    const key = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    const { POST } = await import("@/app/api/contact/route");
    expect((await POST(post(valid))).status).toBe(503);
    process.env.RESEND_API_KEY = key;
  });
});

describe("POST /api/newsletter", () => {
  it("notifies the owner only, never the subscriber address", async () => {
    const res = await newsletter(post({ email: "sub@example.org" }));
    expect(res.status).toBe(200);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0].to).toEqual(["waseeq.aftab@devnscale.com"]);
  });

  it("validates, honeypots and rate limits", async () => {
    expect((await newsletter(post({ email: "nope" }))).status).toBe(400);
    expect((await newsletter(post({ email: "a@example.org", website: "x" }))).status).toBe(200);
    expect(send).not.toHaveBeenCalled();
    const h = { "x-forwarded-for": "7.7.7.7" };
    const codes = [];
    for (let i = 0; i < 4; i++) codes.push((await newsletter(post({ email: "a@example.org" }, h))).status);
    expect(codes).toEqual([200, 200, 200, 429]);
  });
});
