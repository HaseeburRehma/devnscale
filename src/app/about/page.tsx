import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import WhyUs from "@/components/sections/WhyUs";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import DiagonalMarquees from "@/components/sections/DiagonalMarquees";

import PageHero from "@/components/sections/PageHero";
import { ABOUT_HERO } from "@/lib/content";
import AboutStats from "@/components/sections/about/AboutStats";
import AboutApproach from "@/components/sections/about/AboutApproach";
import AboutJourney from "@/components/sections/about/AboutJourney";
import AboutValues from "@/components/sections/about/AboutValues";
import AboutTeam from "@/components/sections/about/AboutTeam";

export const metadata: Metadata = {
  title: "About Us — Dev N Scale",
  description:
    "A senior, design-led software studio. Small teams, close to the work, building products from first idea to production — and accountable for how they perform.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={ABOUT_HERO.eyebrow}
          title={ABOUT_HERO.titleLead}
          accent={ABOUT_HERO.titleAccent}
          subtitle={ABOUT_HERO.subtitle}
        />
        <AboutStats />
        <AboutApproach />
        <WhyUs />
        <AboutJourney />
        <AboutValues />
        <AboutTeam />
        <Testimonial />
        <Faqs />
        <DiagonalMarquees />
      </main>
      <Footer />
    </>
  );
}
