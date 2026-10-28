import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/PageHero";
import CareersOpenRoles from "@/components/sections/careers/CareersOpenRoles";
import { CareersProcess, CareersWhyJoin } from "@/components/sections/careers/CareersProcess";
import { CAREERS_HERO } from "@/lib/careers";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Careers — Dev N Scale",
  description:
    "Open roles at Dev N Scale in Islamabad: digital marketing, SEO and UI/UX design. Full-time with hybrid days, and a hiring process that takes about two weeks.",
};

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={CAREERS_HERO.eyebrow}
          title={CAREERS_HERO.title}
          subtitle={CAREERS_HERO.subtitle}
          primary={{ label: "See Open Roles", href: "#open-roles" }}
          showSecondary={false}
          lgHeight={561}
        />
        <CareersOpenRoles />
        <CareersProcess />
        <CareersWhyJoin />
      </main>
      <Footer />
    </>
  );
}
