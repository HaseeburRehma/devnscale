import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import DiagonalMarquees from "@/components/sections/DiagonalMarquees";
import WhyUs from "@/components/sections/WhyUs";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import ServicesShowcase from "@/components/sections/services/ServicesShowcase";
import { SERVICES_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Dev N Scale",
  description:
    "Web, mobile, design, AI, QA, and growth — one senior team for the whole product journey, from first sketch to launch.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={SERVICES_HERO.eyebrow}
          title={SERVICES_HERO.titleLead}
          accent={SERVICES_HERO.titleAccent}
          subtitle={SERVICES_HERO.subtitle}
        />
        <DiagonalMarquees />
        <ServicesShowcase />
        <WhyUs />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
