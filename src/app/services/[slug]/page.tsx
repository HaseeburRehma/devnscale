import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Testimonial from "@/components/sections/Testimonial";
import Faqs from "@/components/sections/Faqs";
import ServiceSelectedWork from "@/components/sections/services/ServiceSelectedWork";
import ServiceDetail from "@/components/sections/services/ServiceDetail";
import { SERVICE_DETAILS, SERVICE_SLUGS } from "@/lib/content";
import { SERVICE_CAPABILITIES, SERVICE_FIT } from "@/lib/service-explorer";

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
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const id = SERVICE_SLUGS[slug];
  const detail = id ? SERVICE_DETAILS[id] : undefined;
  if (!detail) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ServiceDetail detail={detail} fit={SERVICE_FIT[id]} caps={SERVICE_CAPABILITIES[id]} />
        <ServiceSelectedWork />
        <Testimonial />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
