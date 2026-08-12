import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import PageHero from "@/components/sections/PageHero";
import CaseMeta from "@/components/sections/case/CaseMeta";
import CaseDesignSystem from "@/components/sections/case/CaseDesignSystem";
import SelectedWork from "@/components/sections/case/SelectedWork";
import {
  CaseHeroImage,
  CaseOverview,
  CaseProduct,
  CaseResults,
  CaseExperience,
  CaseGallery,
} from "@/components/sections/case/CaseBody";
import { CASE_STUDY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fieldnote — Case Study — Dev N Scale",
  description:
    "Fieldnote: a field-operations platform for logistics. From scattered tools to one live picture across dispatch, drivers, and the warehouse.",
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
        />
        <CaseMeta />
        <CaseHeroImage />
        <CaseOverview />
        <CaseDesignSystem />
        <CaseProduct />
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
