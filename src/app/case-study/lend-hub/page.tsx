import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import CaseMeta from "@/components/sections/case/CaseMeta";
import SelectedWork from "@/components/sections/case/SelectedWork";
import {
  CaseHeroImage,
  CaseOverview,
  CaseProblem,
  CaseDesignedForWork,
  CaseResults,
  CaseExperience,
  CaseGallery,
} from "@/components/sections/case/CaseBody";
import { CASE_STUDIES } from "@/lib/content";

const study = CASE_STUDIES["lend-hub"];

export const metadata: Metadata = {
  title: "Lend SaaS — Case Study — Dev N Scale",
  description:
    "Lend SaaS: one central hub for everything lending — a FinTech platform bringing products, protocols, knowledge, and calculation tools together.",
};

export default function LendHubCaseStudyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={study.eyebrow}
          title={study.title}
          subtitle={study.subtitle}
          size="sm"
          backgroundImage={study.heroBackground}
          eyebrowClassName="text-white/80"
        />
        <CaseMeta study={study} />
        <CaseHeroImage study={study} />
        <CaseOverview study={study} />
        <CaseProblem study={study} />
        <CaseDesignedForWork study={study} />
        <CaseResults study={study} />
        <CaseExperience study={study} />
        <CaseGallery study={study} />
        <SelectedWork study={study} />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
