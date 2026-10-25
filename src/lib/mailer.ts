import { Resend } from "resend";

export const OWNER_EMAIL = process.env.CONTACT_INBOX ?? "waseeq.aftab@devnscale.com";

/** Must be on a domain verified in Resend; the onboarding address only works in dev. */
export const FROM_EMAIL = process.env.CONTACT_FROM ?? "Dev N Scale <onboarding@resend.dev>";

let client: Resend | null = null;

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}
