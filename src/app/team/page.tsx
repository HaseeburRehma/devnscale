import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import TeamFounder from "@/components/sections/team/TeamFounder";
import TeamMembers from "@/components/sections/team/TeamMembers";
import TeamValues from "@/components/sections/team/TeamValues";
import { TEAM_HERO } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: "/team" },
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
        <TeamFounder />
        <TeamMembers />
        <TeamValues />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
