import type { MetadataRoute } from "next";
import { CASE_STUDIES, SERVICE_DETAILS } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/team", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];
  const services = Object.values(SERVICE_DETAILS).map((d) => ({
    path: `/services/${d.slug}`,
    priority: 0.8,
  }));
  const cases = Object.keys(CASE_STUDIES).map((slug) => ({
    path: `/case-study/${slug}`,
    priority: 0.7,
  }));

  return [...pages, ...services, ...cases].map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
