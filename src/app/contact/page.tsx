import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import ContactBooking from "@/components/sections/contact/ContactBooking";
import { CONTACT_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Dev N Scale",
  description:
    "Book an appointment with Dev N Scale. Senior people who design and ship — reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={CONTACT_HERO.eyebrow}
          title={CONTACT_HERO.titleLead}
          accent={CONTACT_HERO.titleAccent}
          subtitle={CONTACT_HERO.subtitle}
        />
        {/* ContactBooking now carries the email/phone/office rows in its
         *  intro column (per Figma), so ContactReach is no longer wired
         *  here — kept in the codebase for reuse if needed. */}
        <ContactBooking />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
