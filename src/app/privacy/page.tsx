import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { CONTACT_DETAILS } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy — Dev N Scale",
  description: "What Dev N Scale collects through this website, why, and how to have it removed.",
};

const email = CONTACT_DETAILS.find((d) => d.icon === "mail")?.value ?? "";
const office = CONTACT_DETAILS.find((d) => d.icon === "pin")?.value ?? "";
const mail = <a href={`mailto:${email}`} className="text-lime-700 underline underline-offset-2">{email}</a>;

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="LEGAL"
      title="Privacy Policy"
      subtitle="What we collect through this website, why we collect it, and how to have it removed."
      updated="26 October 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            <>Dev N Scale (&quot;we&quot;, &quot;us&quot;) runs devnscale.com. Our office is at {office}. For anything about your data, email {mail}.</>,
          ],
        },
        {
          heading: "What we collect",
          body: [
            "Contact and booking forms: your name, email address, company, the service you are interested in, the project details you write, and whether you asked for an NDA.",
            "Newsletter form: your email address.",
            "Our hosting provider keeps standard server logs (IP address, browser, pages requested) to run and secure the site. We also use your IP address briefly to limit how often a form can be sent.",
            "We do not use advertising or analytics cookies, and we do not sell or rent your information.",
          ],
        },
        {
          heading: "Why we use it",
          body: [
            "To reply to your enquiry, prepare a proposal, send the newsletter you asked for, and keep the forms free of spam. We rely on your request (taking steps before a contract) and our legitimate interest in answering business enquiries.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "Form submissions are delivered by email through Resend, our email provider, which processes them on our behalf. We share nothing else unless the law requires it.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "Enquiries stay in our inbox for as long as we are discussing or delivering work with you, and are deleted on request. Newsletter addresses are kept until you unsubscribe.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            <>You can ask to see, correct or delete what we hold about you, or object to how we use it, by emailing {mail}. We answer within 30 days. If you are in the EU or UK you can also complain to your local data protection authority.</>,
          ],
        },
        {
          heading: "Changes",
          body: ["If we change this policy we will update the date at the top of this page."],
        },
      ]}
    />
  );
}
