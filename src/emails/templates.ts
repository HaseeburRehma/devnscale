/**
 * Two brand-consistent HTML email templates.
 *
 *   • ownerNotification — lands in the Dev N Scale inbox with every
 *     submitted field, ready to reply to.
 *   • userConfirmation   — auto-reply to the visitor that the message
 *     landed and someone will follow up.
 *
 * Every rule is inline-styled because Gmail / Outlook strip <style> blocks.
 * The palette matches the site: ink #0e1613, lime #c4d434, canvas #f6f7f2.
 * Widths are capped at 600px per email-client convention.
 */

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  details: string;
};

/* ============================================================
   Shared building blocks
   ============================================================ */

const shell = (body: string, preheader: string) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Dev N Scale</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f7f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0e1613;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">${escape(preheader)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 24px rgba(1,42,28,0.08);">

            <!-- Brand bar -->
            <tr>
              <td style="background:#0e1613;padding:22px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">
                      Dev <span style="color:#c4d434;">n Scale</span>
                    </td>
                    <td align="right" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a9791;">
                      Design · Build · Scale
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            ${body}

            <!-- Footer -->
            <tr>
              <td style="background:#f6f7f2;padding:24px 32px;border-top:1px solid #e5e9e0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;line-height:1.5;color:#5a6b64;">
                      <strong style="color:#0e1613;">Dev N Scale</strong> · Islamabad, Pakistan<br />
                      <a href="mailto:info@devnscale.com" style="color:#5a6b64;text-decoration:none;">info@devnscale.com</a> · +92 339 5636702 · <a href="https://devnscale.com" style="color:#5a6b64;text-decoration:none;">devnscale.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Fine print -->
          <div style="max-width:600px;margin:16px auto 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;color:#8a9791;text-align:center;">
            You&rsquo;re receiving this because you contacted Dev N Scale via devnscale.com.
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;

/** Basic HTML entity escape — enough for user-supplied string fields. */
function escape(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function paragraphBreaks(s: string): string {
  return escape(s).replace(/\n/g, "<br />");
}

/* ============================================================
   Owner notification
   ============================================================ */

export function ownerNotificationEmail(s: ContactSubmission) {
  const fullName = `${s.firstName} ${s.lastName}`.trim();
  const preheader = `${fullName} — ${s.service || "New inquiry"}`;

  const rows: Array<{ label: string; value: string; isLink?: "email" | "url" }> = [
    { label: "Name", value: fullName },
    { label: "Email", value: s.email, isLink: "email" },
  ];
  if (s.company) rows.push({ label: "Company", value: s.company });
  if (s.service) rows.push({ label: "Service", value: s.service });

  const detailRow = `
    <tr>
      <td style="padding:20px 0 0;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a9791;margin-bottom:8px;">Project details</div>
        <div style="font-size:15px;line-height:1.6;color:#0e1613;background:#f6f7f2;border-radius:12px;padding:16px;border:1px solid #e5e9e0;">
          ${paragraphBreaks(s.details)}
        </div>
      </td>
    </tr>`;

  const metaRows = rows
    .map((r) => {
      const value =
        r.isLink === "email"
          ? `<a href="mailto:${escape(r.value)}" style="color:#0e1613;text-decoration:none;border-bottom:1px solid #c4d434;">${escape(r.value)}</a>`
          : escape(r.value);
      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e5e9e0;">
            <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a9791;margin-bottom:4px;">${r.label}</div>
            <div style="font-size:16px;font-weight:500;color:#0e1613;">${value}</div>
          </td>
        </tr>`;
    })
    .join("");

  const body = `
    <tr>
      <td style="padding:32px;">
        <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#7a8513;font-weight:600;margin-bottom:12px;">New Inquiry</div>
        <h1 style="margin:0 0 8px;font-size:26px;line-height:1.2;letter-spacing:-0.4px;color:#0e1613;">${escape(fullName)} wants to talk.</h1>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#5a6b64;">Submitted via the contact form on devnscale.com. Reply directly to this email to reach ${escape(s.firstName)}.</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${metaRows}
          ${detailRow}
        </table>

        <div style="margin-top:28px;">
          <a href="mailto:${escape(s.email)}?subject=${encodeURIComponent(`Re: your Dev N Scale inquiry`)}" style="display:inline-block;background:#c4d434;color:#0e1613;font-weight:600;font-size:15px;text-decoration:none;padding:14px 22px;border-radius:12px;">Reply to ${escape(s.firstName)}</a>
        </div>
      </td>
    </tr>`;

  const text = [
    `NEW INQUIRY — Dev N Scale`,
    ``,
    ...rows.map((r) => `${r.label}: ${r.value}`),
    ``,
    `Project details:`,
    s.details,
    ``,
    `Reply directly to this email to reach ${s.firstName}.`,
  ].join("\n");

  return {
    subject: `New inquiry — ${fullName}${s.service ? ` · ${s.service}` : ""}`,
    html: shell(body, preheader),
    text,
  };
}

/* ============================================================
   User confirmation
   ============================================================ */

export function userConfirmationEmail(s: ContactSubmission) {
  const preheader = `Thanks ${s.firstName} — we got your message and will reply within one business day.`;

  const body = `
    <tr>
      <td style="padding:32px;">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;letter-spacing:-0.4px;color:#0e1613;">Thanks, ${escape(s.firstName)}. We&rsquo;ve got it.</h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#5a6b64;">A real person on our team will read every line of what you sent and reply within one business day &mdash; usually a lot sooner.</p>

        <div style="background:#f6f7f2;border:1px solid #e5e9e0;border-radius:12px;padding:20px;margin:24px 0;">
          <div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a9791;margin-bottom:8px;">What you sent us</div>
          <div style="font-size:15px;line-height:1.6;color:#0e1613;">
            ${paragraphBreaks(s.details)}
          </div>
          ${s.service ? `<div style="margin-top:12px;font-size:13px;color:#5a6b64;"><strong style="color:#0e1613;">Service:</strong> ${escape(s.service)}</div>` : ""}
        </div>

        <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#0e1613;font-weight:600;">While you wait</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5a6b64;">Take a look at recent case studies &mdash; MCA, OpulenceX, Lend SaaS &mdash; on <a href="https://devnscale.com/work" style="color:#0e1613;border-bottom:1px solid #c4d434;text-decoration:none;">devnscale.com/work</a>. They&rsquo;ll give you a feel for how we work before we hop on a call.</p>

        <div style="margin-top:28px;">
          <a href="https://devnscale.com/work" style="display:inline-block;background:#0e1613;color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;padding:14px 22px;border-radius:12px;">See our work</a>
        </div>

        <p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#8a9791;">Need to send more context? Just reply to this email &mdash; it goes straight to us.</p>

        <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#0e1613;">
          &mdash; The Dev N Scale team
        </p>
      </td>
    </tr>`;

  const text = [
    `Thanks, ${s.firstName}. We've got it.`,
    ``,
    `A real person on our team will read every line of what you sent and reply within one business day — usually a lot sooner.`,
    ``,
    `What you sent us:`,
    s.details,
    s.service ? `\nService: ${s.service}` : "",
    ``,
    `While you wait, take a look at recent case studies on devnscale.com/work.`,
    ``,
    `Need to send more context? Just reply to this email — it goes straight to us.`,
    ``,
    `— The Dev N Scale team`,
  ].join("\n");

  return {
    subject: `Thanks ${s.firstName} — we got your message`,
    html: shell(body, preheader),
    text,
  };
}
