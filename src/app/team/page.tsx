import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import DiagonalMarquees from "@/components/sections/DiagonalMarquees";

import PageHero from "@/components/sections/PageHero";
import { TEAM_HERO } from "@/lib/content";
import AboutTeam from "@/components/sections/about/AboutTeam";
import AboutValues from "@/components/sections/about/AboutValues";

export const metadata: Metadata = {
  title: "Our Team — Dev N Scale",
  description:
    "Meet the people behind Dev N Scale — designers, developers, strategists, and problem-solvers building better products that create real value.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={TEAM_HERO.eyebrow}
          title={TEAM_HERO.titleLead}
          accent={TEAM_HERO.titleAccent}
          subtitle={TEAM_HERO.subtitle}
        />
        <AboutTeam />
        <AboutValues />
        <Testimonial />
        <Faqs />
        <DiagonalMarquees />
      </main>
      <Footer />
    </>
  );
}
