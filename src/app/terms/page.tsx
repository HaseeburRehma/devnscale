import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/sections/LegalPage";
import { CONTACT_DETAILS } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms & Conditions — Dev N Scale",
  description: "The terms for using the Dev N Scale website.",
};

const email = CONTACT_DETAILS.find((d) => d.icon === "mail")?.value ?? "";
const mail = <a href={`mailto:${email}`} className="text-lime-700 underline underline-offset-2">{email}</a>;

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Terms & Conditions"
      subtitle="The terms for using this website. Client projects are covered by their own written agreement."
      updated="26 October 2026"
      sections={[
        {
          heading: "Using this site",
          body: [
            "By using devnscale.com you agree to these terms. Please do not misuse the site, for example by sending automated or abusive form submissions, or by trying to disrupt or gain unauthorised access to it.",
          ],
        },
        {
          heading: "Content and trademarks",
          body: [
            "The text, design and code of this site belong to Dev N Scale. Case studies show work we did for clients; their names, logos and product screens belong to those clients and appear with their permission or for portfolio purposes only.",
          ],
        },
        {
          heading: "No offer or advice",
          body: [
            "Information on this site describes our services in general terms. It is not a binding offer, and timelines or figures mentioned are examples. Every engagement is agreed in a separate written proposal or contract, which takes precedence over this site.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We keep the site accurate and available, but we provide it as is and cannot guarantee it is always error-free or online. To the extent the law allows, we are not liable for losses arising from use of the site itself.",
          ],
        },
        {
          heading: "Privacy",
          body: [
            <>How we handle form submissions is set out in our <Link href="/privacy" className="text-lime-700 underline underline-offset-2">Privacy Policy</Link>.</>,
          ],
        },
        {
          heading: "Law and contact",
          body: [
            <>These terms are governed by the laws of Pakistan, with courts in Islamabad having jurisdiction. Questions: {mail}.</>,
          ],
        },
      ]}
    />
  );
}
