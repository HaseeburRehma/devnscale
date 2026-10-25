import { NextResponse } from "next/server";

import {
  ownerNotificationEmail,
  userConfirmationEmail,
  type ContactSubmission,
} from "@/emails/templates";
import { clean, fail, isValidEmail, readFormJson } from "@/lib/form-guard";
import { FROM_EMAIL, OWNER_EMAIL, getResend } from "@/lib/mailer";

/**
 * Contact-form endpoint. Sends the enquiry to the owner inbox (Reply-To the
 * sender) and a best-effort confirmation to the sender.
 */

const LIMIT = { max: 5, globalMax: 40, windowMs: 10 * 60_000 };

export async function POST(req: Request) {
  const resend = getResend();
  if (!resend) {
    console.error("[contact] RESEND_API_KEY is not set");
    return fail("Email service is not configured. Please try again later.", 503);
  }

  const gate = await readFormJson(req, "contact", LIMIT);
  if (!gate.ok) return gate.res;
  const body = gate.body;

  // Honeypot — real users leave this hidden field blank.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const firstName = clean(body.firstName, 60);
  const lastName = clean(body.lastName, 60);
  const email = clean(body.email, 254);
  const company = clean(body.company, 120);
  const service = clean(body.service, 80);
  const details = clean(body.details, 5001, true);

  if (!firstName) return fail("Please tell us your first name.");
  if (!lastName) return fail("Please tell us your last name.");
  if (!isValidEmail(email)) return fail("Please enter a valid email address.");
  if (details.length < 10) return fail("Please share a few sentences about your project.");
  if (details.length > 5000) return fail("Please keep the message under 5,000 characters.");

  const submission: ContactSubmission = {
    firstName,
    lastName,
    email,
    company: company || undefined,
    service: service || undefined,
    details,
  };

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
    return fail("We couldn't send your message right now. Please try again in a moment.", 502);
  }

  // Best-effort: the owner inbox already has the message.
  const userResult = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    replyTo: OWNER_EMAIL,
    subject: user.subject,
    html: user.html,
    text: user.text,
  });
  if (userResult.error) console.error("[contact] user confirmation failed", userResult.error);

  return NextResponse.json({ ok: true });
}
