import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import SelectedWork from "@/components/sections/case/SelectedWork";
import {
  CaseHero,
  CaseCover,
  CaseOverview,
  CaseFeatures,
  CaseScreens,
} from "@/components/sections/case/CaseBody";
import CaseMarquee from "@/components/sections/case/CaseMarquee";
import { CASE_STUDIES } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) return {};
  return { title: study.seo.title, description: study.seo.description };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];
  if (!study) notFound();

  return (
    <>
      <Navbar />
      <main>
        <CaseHero study={study} />
        <CaseCover study={study} />
        <CaseOverview study={study} />
        <CaseFeatures study={study} />
        <CaseScreens study={study} />
        <SelectedWork study={study} />
        <Testimonial />
        <Faqs />
        <CaseMarquee />
      </main>
      <Footer />
    </>
  );
}
