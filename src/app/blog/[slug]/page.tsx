import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/PageHero";
import ArticleBody from "@/components/sections/blog/ArticleBody";
import { Avatar, PostCard } from "@/components/sections/blog/PostCards";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { BLOG_POSTS, formatDate, getPost, readMinutes } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dev N Scale`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, authors: [post.author.name], images: [post.cover] },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = [...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category), ...BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${SITE_URL}${post.cover}`,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <PageHero
          eyebrow={`BLOG  /  ${post.category.toUpperCase()}`}
          title={post.headline}
          subtitle={post.subtitle}
          primary={null}
          showSecondary={false}
          lgHeight={615}
          meta={
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[14px] leading-5 text-ink-300">
              <span className="flex items-center gap-4 text-white">
                <Avatar src={post.author.photo} size={36} />
                {post.author.name}, {post.author.role}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="size-3.5" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-3.5" />
                {readMinutes(post)} min read
              </span>
            </div>
          }
        />

        <div className="bg-white pt-[clamp(2.5rem,1rem+4vw,5rem)]">
          <div className="shell">
            <div className="relative aspect-[1280/600] w-full overflow-hidden rounded-[20px]">
              <Image src={post.cover} alt="" fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
            </div>
          </div>
        </div>

        <ArticleBody post={post} />

        <section className="bg-canvas py-[clamp(4rem,1.5rem+6vw,7.5rem)]">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <Reveal>
                <h2 className="font-display text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] font-bold leading-[1.14] tracking-[-2px] text-ink-900">
                  Keep Reading.
                </h2>
              </Reveal>
              <Link href="/blog" className="group inline-flex items-center gap-2 text-[16px] font-medium leading-6 text-ink-900 hover:text-lime-700">
                View all articles
                <ArrowRightIcon className="size-[18px] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
