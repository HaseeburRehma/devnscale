"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckIcon, CircleCheckIcon, CopyIcon, InfoIcon, LinkIcon } from "@/components/icons";
import { INSTAGRAM_ICON, LINKEDIN_ICON, SocialLink } from "@/components/ui/SocialLink";
import { TEAM_SOCIAL_FALLBACK } from "@/lib/content";
import { slugify, type BlogBlock, type BlogPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { Avatar } from "./PostCards";

/** Figma "Article · Body": sticky contents + share on the left, the article on the right. */
export default function ArticleBody({ post }: { post: BlogPost }) {
  const headings = post.body.filter((b): b is Extract<BlogBlock, { type: "h2" }> => b.type === "h2");
  const active = useActiveHeading(headings.map((h) => slugify(h.text)));
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <section className="bg-white pb-[clamp(4rem,1.5rem+6vw,7.5rem)] pt-[clamp(3rem,1.5rem+4vw,5rem)]">
      <div className="shell grid gap-12 lg:grid-cols-[260px_minmax(0,720px)] lg:justify-center lg:gap-[100px]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-3">
            <p className="text-[13px] font-medium leading-4 text-text-muted">On this page</p>
            <nav aria-label="On this page" className="flex flex-col">
              {headings.map((h) => {
                const id = slugify(h.text);
                const on = active === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    aria-current={on ? "location" : undefined}
                    className={`border-l-2 py-2 pl-4 text-[14px] leading-5 transition-colors ${
                      on ? "border-brand-950 font-medium text-ink-900" : "border-border-subtle text-text-muted hover:text-ink-900"
                    }`}
                  >
                    {h.text}
                  </a>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 pt-7">
              <p className="text-[13px] font-medium leading-4 text-text-muted">Share this article</p>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
        </aside>

        <article className="flex min-w-0 flex-col gap-7">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <ul className="flex flex-wrap gap-2 pt-3" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full bg-ink-100 px-3 py-1.5 text-[13px] font-medium leading-4 text-text-secondary">
                {t}
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <p className="mb-3 text-[13px] font-medium leading-4 text-text-muted">Share this article</p>
            <ShareButtons url={url} title={post.title} />
          </div>

          <div className="flex flex-col gap-6 rounded-[20px] border border-border-subtle bg-ink-50 p-6 sm:flex-row sm:p-8">
            <Avatar src={post.author.photo} size={80} />
            <div className="flex flex-col gap-2">
              <p className="text-[12px] leading-4 text-text-muted">Written by</p>
              <p className="font-display text-[20px] font-medium leading-7 text-ink-900">{post.author.name}</p>
              <p className="text-[14px] leading-5 text-text-secondary">{post.author.role}, Dev N Scale</p>
              <p className="text-[14px] leading-5 text-text-secondary">{post.author.bio}</p>
              <div className="flex gap-2 pt-1.5">
                <SocialLink href={TEAM_SOCIAL_FALLBACK.linkedin} label="Dev N Scale on LinkedIn">
                  {LINKEDIN_ICON}
                </SocialLink>
                <SocialLink href={TEAM_SOCIAL_FALLBACK.instagram} label="Dev N Scale on Instagram">
                  {INSTAGRAM_ICON}
                </SocialLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-[18px] leading-7 text-text-secondary">{block.text}</p>;
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="scroll-mt-28 font-display text-[clamp(1.625rem,1.4rem+0.9vw,2rem)] font-medium leading-10 tracking-[-1px] text-ink-900"
        >
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[18px] leading-7 text-text-secondary">
              <CircleCheckIcon className="mt-1 size-5 shrink-0 text-lime-600" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure className="flex flex-col gap-3 border-l-4 border-lime-500 py-1 pl-7">
          <blockquote className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.5rem)] font-medium leading-8 tracking-[-0.5px] text-ink-900">
            {block.text}
          </blockquote>
          <figcaption className="text-[14px] leading-5 text-text-muted">{block.by}</figcaption>
        </figure>
      );
    case "callout":
      return (
        <div className="flex items-start gap-4 rounded-[14px] border border-lime-400 bg-lime-50 px-6 py-5">
          <InfoIcon className="mt-0.5 size-5 shrink-0 text-ink-900" />
          <div className="flex flex-col gap-1.5">
            <p className="font-display text-[18px] font-medium leading-6 text-ink-900">{block.title}</p>
            <p className="text-[14px] leading-5 text-text-secondary">{block.text}</p>
          </div>
        </div>
      );
    case "figure":
      return (
        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[720/440] w-full overflow-hidden rounded-[16px]">
            <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
          </div>
          <figcaption className="text-[14px] leading-5 text-text-muted">{block.caption}</figcaption>
        </figure>
      );
    case "code":
      return <CodeBlock filename={block.filename} code={block.code} />;
  }
}

function CodeBlock({ filename, code }: { filename: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-[14px] bg-ink-900">
      <div className="flex items-center justify-between border-b border-ink-800 px-5 py-3 font-mono text-[12px] leading-[21px] text-ink-400">
        <span>{filename}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            });
          }}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 pb-5 pt-[18px] font-mono text-[13px] leading-[23px] text-ink-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const btn =
    "flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white text-ink-700 transition-colors duration-300 hover:border-brand-950 hover:bg-brand-950 hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500";
  return (
    <div className="flex gap-2">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Share “${title}” on LinkedIn`}
        className={btn}
      >
        <svg width="16" height="16" viewBox="0 0 16.008 16.008" fill="none" stroke="currentColor" strokeWidth="1.334" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {LINKEDIN_ICON}
        </svg>
      </a>
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link to this article"}
        onClick={() => {
          navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          });
        }}
        className={btn}
      >
        {copied ? <CheckIcon className="size-4" /> : <LinkIcon className="size-4" />}
      </button>
    </div>
  );
}

/** Scroll-spy: the last heading that has passed the top third of the viewport. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.33) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}
