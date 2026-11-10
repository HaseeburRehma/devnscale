/* Google Tag Manager (GTM-TVMMQ79M) → GA4 (G-VXF6FT18TC), loaded only after
 * the visitor accepts the cookie banner. GTM's "GA4 - Event - Lead and sign-up"
 * tag forwards generate_lead and sign_up pushes to GA4. */

export const GTM_ID = "GTM-TVMMQ79M";
const GA_STREAM = "VXF6FT18TC"; // G-VXF6FT18TC, for its _ga_<id> cookie
export const CONSENT_KEY = "dns_consent";
export const CONSENT_EVENT = "dns-consent";
export const OPEN_SETTINGS_EVENT = "dns-cookie-settings";

export type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

// gtag() must push the `arguments` object, not an array, for consent commands.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer = window.dataLayer || []).push(arguments);
}

export function setConsent(v: "granted" | "denied") {
  const was = getConsent();
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {}
  // GTM can't be unloaded: on withdrawal stop GA writing cookies, delete
  // ours (this property's _ga_VXF6FT18TC and the shared _ga), then reload clean.
  if (was === "granted" && v === "denied") {
    gtag("consent", "update", { analytics_storage: "denied" });
    const host = location.hostname.replace(/^www\./, "");
    for (const name of ["_ga", `_ga_${GA_STREAM}`]) {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`])
        document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
    setTimeout(() => location.reload(), 150);
    return;
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

/* Analytics only: GA4 storage is granted, every advertising signal stays denied. */
export function loadGtm() {
  if (document.getElementById("gtm-script")) return;
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** Sends a custom event to GTM; a no-op until the visitor has accepted. */
export function track(event: "generate_lead" | "sign_up", params: Record<string, string> = {}) {
  if (getConsent() !== "granted") return;
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
}
