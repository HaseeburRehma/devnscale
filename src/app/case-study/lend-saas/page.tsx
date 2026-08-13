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

const study = CASE_STUDIES["lend-saas"];

export const metadata: Metadata = {
  title: "OpulenceX — Lend SaaS Case Study — Dev N Scale",
  description:
    "OpulenceX: every DeFi opportunity in one complete ecosystem — a XRPL-native suite for swaps, yield, staking, and NFT earnings.",
};

export default function LendSaasCaseStudyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={study.eyebrow}
          title={study.title}
          subtitle={study.subtitle}
          size="sm"
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
