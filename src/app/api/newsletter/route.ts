import { NextResponse } from "next/server";

import { clean, fail, isValidEmail, readFormJson } from "@/lib/form-guard";
import { FROM_EMAIL, OWNER_EMAIL, getResend } from "@/lib/mailer";

/* Signups go to the owner inbox. Nothing is sent to the address itself, so the
 * form can't be used to mail third parties. */

const LIMIT = { max: 3, globalMax: 30, windowMs: 10 * 60_000 };

export async function POST(req: Request) {
  const resend = getResend();
  if (!resend) {
    console.error("[newsletter] RESEND_API_KEY is not set");
    return fail("Signups are unavailable right now. Please try again later.", 503);
  }

  const gate = await readFormJson(req, "newsletter", LIMIT);
  if (!gate.ok) return gate.res;

  if (clean(gate.body.website, 200)) return NextResponse.json({ ok: true });

  const email = clean(gate.body.email, 254);
  if (!isValidEmail(email)) return fail("Please enter a valid email address.");

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [OWNER_EMAIL],
    replyTo: email,
    subject: `Newsletter signup: ${email}`,
    text: `${email} subscribed to the Dev N Scale newsletter from the website footer.`,
  });
  if (result.error) {
    console.error("[newsletter] email failed", result.error);
    return fail("We couldn't sign you up right now. Please try again in a moment.", 502);
  }

  return NextResponse.json({ ok: true });
}
