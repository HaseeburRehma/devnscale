import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ClockIcon } from "@/components/icons";
import { formatDate, readMinutes, type BlogPost } from "@/lib/blog";

function ReadTime({ post }: { post: BlogPost }) {
  return (
    <span className="inline-flex items-center gap-[5px] text-[12px] leading-4 text-text-muted">
      <ClockIcon className="size-[13px]" />
      {readMinutes(post)} min read
    </span>
  );
}

function Category({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[12px] font-medium leading-4 text-brand-950 ${strong ? "bg-lime-500" : "bg-lime-50"}`}
    >
      {children}
    </span>
  );
}

/** Figma "Blog/Post Card": cover, category + read time, title, excerpt, author. */
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-border-subtle bg-white transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-border-default hover:shadow-[0_12px_30px_rgba(25,33,61,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
    >
      <div className="relative aspect-[405/256] w-full overflow-hidden">
        <Image
          src={post.cover}
          alt=""
          fill
          sizes="(min-width: 1024px) 405px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3.5 px-6 pb-6 pt-[22px]">
        <div className="flex items-center gap-2.5">
          <Category>{post.category}</Category>
          <ReadTime post={post} />
        </div>
        <h3 className="font-display text-[20px] font-medium leading-7 text-ink-900">{post.title}</h3>
        <p className="text-[14px] leading-5 text-text-secondary">{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2.5 border-t border-border-subtle pt-3.5">
          <Avatar src={post.author.photo} size={32} />
          <span className="flex flex-col gap-0.5">
            <span className="text-[13px] font-medium leading-4 text-ink-900">{post.author.name}</span>
            <span className="text-[12px] leading-4 text-text-muted">{formatDate(post.date)}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Figma "Featured · MVP in eight weeks": cover left, content right. */
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-[24px] border border-border-subtle bg-white transition-[box-shadow,border-color] duration-300 hover:border-border-default hover:shadow-[0_16px_40px_rgba(25,33,61,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 lg:grid-cols-[680fr_600fr]"
    >
      <div className="relative aspect-[680/378] w-full overflow-hidden lg:aspect-auto">
        <Image
          src={post.cover}
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 680px, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 xl:p-12">
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-wrap items-center gap-2.5">
            <Category strong>Featured</Category>
            <Category>{post.category}</Category>
            <ReadTime post={post} />
          </div>
          <h2 className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-medium leading-[1.25] tracking-[-1px] text-ink-900">
            {post.title}
          </h2>
          <p className="text-[18px] leading-7 text-text-secondary">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.photo} size={44} />
            <span className="flex flex-col gap-0.5">
              <span className="text-[16px] font-medium leading-6 text-ink-900">{post.author.name}</span>
              <span className="text-[14px] leading-5 text-text-muted">
                {post.author.role}, {formatDate(post.date)}
              </span>
            </span>
          </div>
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-lime-500 text-ink-950 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRightIcon className="size-5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Avatar({ src, size }: { src: string; size: number }) {
  return (
    <span className="relative shrink-0 overflow-hidden rounded-full bg-[#e8e7a4]" style={{ width: size, height: size }}>
      <Image src={src} alt="" fill sizes={`${size * 2}px`} className="object-cover object-top" />
    </span>
  );
}
