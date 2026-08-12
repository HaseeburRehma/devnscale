import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhyUs from "@/components/sections/WhyUs";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import WorkGrid from "@/components/sections/work/WorkGrid";
import AboutValues from "@/components/sections/about/AboutValues";
import { WORK_HERO } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Dev N Scale",
  description:
    "Selected work: digital products and platforms we've designed, built, and shipped across health, fintech, logistics, and AI.",
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={WORK_HERO.eyebrow}
          title={WORK_HERO.titleLead}
          accent={WORK_HERO.titleAccent}
          subtitle={WORK_HERO.subtitle}
        />
        <WorkGrid />
        <WhyUs />
        <AboutValues />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
