"use client";

import { useState } from "react";
import FilterChip from "@/components/ui/FilterChip";
import Reveal from "@/components/ui/Reveal";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog";
import { FeaturedPost, PostCard } from "./PostCards";

const PAGE = 6;

/** Figma "Blog · Featured" + "Blog · All Posts": category chips, grid, load more. */
export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const [filter, setFilter] = useState<string>("All");
  const [limit, setLimit] = useState(PAGE);

  // "All" counts every post, the featured one included, as Figma does.
  const categories = BLOG_CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const matching = rest.filter((p) => filter === "All" || p.category === filter);
  const featuredMatches = filter !== "All" && featured.category === filter;
  const list = featuredMatches ? [featured, ...matching] : matching;

  return (
    <>
      <section className="bg-white pt-[clamp(3.5rem,1.5rem+5vw,7.5rem)]">
        <div className="shell">
          <Reveal>
            <FeaturedPost post={featured} />
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-[clamp(4rem,1.5rem+6vw,7.5rem)] pt-[clamp(3.5rem,1.5rem+5vw,7.5rem)]">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-medium leading-9 tracking-[-0.5px] text-ink-900">
              Latest articles
            </h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
              <FilterChip label="All" count={posts.length} active={filter === "All"} onClick={() => { setFilter("All"); setLimit(PAGE); }} />
              {categories.map((c) => (
                <FilterChip
                  key={c}
                  label={c}
                  count={posts.filter((p) => p.category === c).length}
                  active={filter === c}
                  onClick={() => { setFilter(c); setLimit(PAGE); }}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12" aria-live="polite">
            {list.slice(0, limit).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {list.length > limit && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setLimit((n) => n + PAGE)}
                className="h-[54px] rounded-xl bg-brand-950 px-6 font-display text-[15px] font-medium uppercase text-white transition-colors hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              >
                Load more articles
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
