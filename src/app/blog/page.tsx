import type { Metadata } from "next";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/PageHero";
import BlogIndex from "@/components/sections/blog/BlogIndex";
import { BLOG_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog — Dev N Scale",
  description:
    "Practical writing from Dev N Scale's designers, engineers and marketers on shipping software that works: MVPs, AI search, design systems, SEO, mobile, QA and pitch decks.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="BLOG"
          title="Notes From The Build."
          subtitle="Practical Writing From Our Designers, Engineers And Marketers On Shipping Software That Works, And What We Learn Along The Way."
          primary={null}
          showSecondary={false}
          lgHeight={479}
        />
        <BlogIndex posts={BLOG_POSTS} />
      </main>
      <Footer />
    </>
  );
}
