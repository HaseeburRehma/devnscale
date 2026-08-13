import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  ownerNotificationEmail,
  userConfirmationEmail,
  type ContactSubmission,
} from "@/emails/templates";

/**
 * Contact-form endpoint.
 *
 * Reads the JSON payload from `Contact.tsx`, validates it, then fires two
 * emails via Resend:
 *   1. Owner notification → `CONTACT_INBOX` (waseeq.aftab@devnscale.com by
 *      default) with `Reply-To` set to the sender so replies land in the
 *      right inbox.
 *   2. User confirmation → the sender, so they know the message landed.
 *
 * Both sends are attempted; if one fails we still return success as long as
 * the owner email went through — the user is never left in the dark about
 * whether their inquiry actually reached us.
 */

export const runtime = "nodejs";

const OWNER_EMAIL =
  process.env.CONTACT_INBOX ?? "waseeq.aftab@devnscale.com";

/**
 * Sender address. Must be on a domain verified in your Resend workspace.
 * Falls back to Resend's shared onboarding address so local dev still sends
 * — swap CONTACT_FROM to a real address on the verified domain in prod.
 */
const FROM_EMAIL =
  process.env.CONTACT_FROM ?? "Dev N Scale <onboarding@resend.dev>";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Email service is not configured. Please try again later." },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return badRequest("Invalid JSON payload.");
  }

  if (typeof raw !== "object" || raw === null) {
    return badRequest("Invalid payload shape.");
  }

  const body = raw as Record<string, unknown>;
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const service = String(body.service ?? "").trim();
  const details = String(body.details ?? "").trim();
  const honeypot = String(body.website ?? "").trim();

  // Honeypot — real users leave this hidden field blank.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName) return badRequest("Please tell us your first name.");
  if (!lastName) return badRequest("Please tell us your last name.");
  if (!email || !EMAIL_REGEX.test(email))
    return badRequest("Please enter a valid email address.");
  if (!details || details.length < 10)
    return badRequest("Please share a few sentences about your project.");
  if (details.length > 5000)
    return badRequest("Please keep the message under 5,000 characters.");

  const submission: ContactSubmission = {
    firstName,
    lastName,
    email,
    company: company || undefined,
    service: service || undefined,
    details,
  };

  const resend = new Resend(process.env.RESEND_API_KEY);

  const owner = ownerNotificationEmail(submission);
  const user = userConfirmationEmail(submission);

  const ownerResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: [OWNER_EMAIL],
    replyTo: email,
    subject: owner.subject,
    html: owner.html,
    text: owner.text,
  });

  if (ownerResult.error) {
    console.error("[contact] owner email failed", ownerResult.error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again in a moment." },
      { status: 502 },
    );
  }

  // User confirmation is best-effort — if this fails we still ack success
  // to the visitor because the owner inbox has their message.
  const userResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    replyTo: OWNER_EMAIL,
    subject: user.subject,
    html: user.html,
    text: user.text,
  });
  if (userResult.error) {
    console.error("[contact] user confirmation failed", userResult.error);
  }

  return NextResponse.json({ ok: true });
}
