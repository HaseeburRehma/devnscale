import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import SelectedWork from "@/components/sections/case/SelectedWork";
import ServiceDetail from "@/components/sections/services/ServiceDetail";
import { CASE_STUDIES, SERVICE_DETAILS, SERVICE_SLUGS } from "@/lib/content";

type PageProps = { params: Promise<{ slug: string }> };

/** Pre-render every slug at build time. */
export function generateStaticParams() {
  return Object.values(SERVICE_DETAILS).map((detail) => ({ slug: detail.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = SERVICE_SLUGS[slug];
  const detail = id ? SERVICE_DETAILS[id] : undefined;
  if (!detail) return { title: "Service — Dev N Scale" };
  return {
    title: detail.meta.title,
    description: detail.meta.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const id = SERVICE_SLUGS[slug];
  const detail = id ? SERVICE_DETAILS[id] : undefined;
  if (!detail) notFound();

  // Reuse the MCA case for the "Selected Work" tail card set — every
  // service page shares the same two proud-of-cards row from Figma.
  const study = CASE_STUDIES.mca;

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail detail={detail} />
        <SelectedWork study={study} />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
