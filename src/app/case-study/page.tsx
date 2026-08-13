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
import { CASE_STUDY } from "@/lib/content";

export const metadata: Metadata = {
  title: "MCA Calculator — Case Study — Dev N Scale",
  description:
    "MCA Calculator: a smarter way to calculate, manage, and structure Merchant Cash Advances — one connected FinTech workflow.",
};

export default function CaseStudyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={CASE_STUDY.eyebrow}
          title={CASE_STUDY.title}
          subtitle={CASE_STUDY.subtitle}
          size="sm"
          backgroundImage={CASE_STUDY.heroBackground}
          eyebrowClassName="text-white/80"
        />
        <CaseMeta />
        <CaseHeroImage />
        <CaseOverview />
        <CaseProblem />
        <CaseDesignedForWork />
        <CaseResults />
        <CaseExperience />
        <CaseGallery />
        <SelectedWork />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
