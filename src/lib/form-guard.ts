import { NextResponse } from "next/server";

/* In-memory, so limits are per server instance. Good enough to stop a single
 * client hammering the form; use a shared store (e.g. Upstash) for a hard cap. */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number, now = Date.now()) {
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false as const, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 10_000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true as const };
}

export function resetRateLimits() {
  buckets.clear();
}

export function clientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

/** Browsers always send Origin on a cross-site POST, so a mismatch means another site is posting. */
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

export function isValidEmail(email: string) {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/** Trims, drops control characters (keeping newlines only when allowed) and caps length. */
export function clean(value: unknown, max: number, multiline = false) {
  const s = typeof value === "string" ? value : "";
  const stripped = multiline
    ? s.replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : s.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim().slice(0, max);
}

export function fail(message: string, status = 400, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error: message }, { status, headers });
}

const MAX_BODY_BYTES = 16_384;

/** Shared gate for public form endpoints: origin, content type, size, rate limit, JSON parse. */
export async function readFormJson(
  req: Request,
  scope: string,
  limit: { max: number; globalMax: number; windowMs: number },
): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; res: NextResponse }> {
  if (!isSameOrigin(req)) return { ok: false, res: fail("Forbidden.", 403) };
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return { ok: false, res: fail("Expected JSON.", 415) };
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return { ok: false, res: fail("Message is too large.", 413) };
  }

  // The global bucket caps total sends even if a client rotates spoofed IPs.
  const rl = rateLimit(`${scope}:${clientIp(req)}`, limit.max, limit.windowMs);
  const all = rl.ok ? rateLimit(`${scope}:*`, limit.globalMax, limit.windowMs) : rl;
  if (!rl.ok || !all.ok) {
    return {
      ok: false,
      res: fail("Too many requests. Please try again in a few minutes.", 429, {
        "Retry-After": String(rl.ok ? (all.ok ? 0 : all.retryAfter) : rl.retryAfter),
      }),
    };
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, res: fail("Invalid payload.") };
  }
  if (text.length > MAX_BODY_BYTES) return { ok: false, res: fail("Message is too large.", 413) };

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, res: fail("Invalid JSON payload.") };
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ok: false, res: fail("Invalid payload shape.") };
  }
  return { ok: true, body: raw as Record<string, unknown> };
}
