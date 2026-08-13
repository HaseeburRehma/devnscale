import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import LogoSlider from "@/components/sections/LogoSlider";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import ContactBooking from "@/components/sections/contact/ContactBooking";
import ContactReach from "@/components/sections/contact/ContactReach";
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
        <ContactBooking />
        {/* Divider strip between the two contact sections. Wrap gives the
         *  fixed-height LogoSlider (76px) breathing room from its neighbours. */}
        <div className="bg-canvas py-8 sm:py-10">
          <LogoSlider tone="light" />
        </div>
        <ContactReach />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
