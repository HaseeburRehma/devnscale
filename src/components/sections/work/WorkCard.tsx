import Image from "next/image";
import Link from "next/link";
import Tilt from "@/components/motion/Tilt";
import type { WORK } from "@/lib/content";

type WorkItem = (typeof WORK)["cases"][number];

export default function WorkCard({ item: c }: { item: WorkItem }) {
  const year = "year" in c ? c.year : undefined;
  const card = (
    <Tilt max={5} className="h-full [transform-style:preserve-3d]">
      <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e5e5e5] bg-white shadow-[0_10px_26px_0_rgba(5,28,18,0.06)] transition-[border-color,box-shadow] duration-300 group-hover:border-border-default group-hover:shadow-[0_18px_42px_rgba(5,28,18,0.12)]">
        <div className="relative flex aspect-[624/368] w-full items-start justify-between gap-3 overflow-hidden px-5 pt-5 sm:px-7 sm:pt-6">
          <Image
            src={c.cover}
            alt={c.name}
            fill
            sizes="(min-width: 768px) 624px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="relative rounded-full border-[0.5px] border-white bg-[rgba(10,10,10,0.4)] px-[13px] py-[7px] text-[12px] font-medium tracking-[0.3px] text-white backdrop-blur-[50px]">
            {c.category}
          </span>
          <span className="relative flex size-[42px] shrink-0 items-center justify-center rounded-full bg-lime-500 transition-transform duration-300 group-hover:rotate-45">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M5.25 12.75L12.75 5.25M12.75 12V5.25H6"
                stroke="#012A1C"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="flex flex-col gap-4 px-5 pb-7 pt-[26px] sm:px-7">
          <h3 className="font-display text-[clamp(1.5rem,1.1rem+1.2vw,2rem)] font-medium leading-[1.25] tracking-[-1px] text-[#0a0a0a] transition-colors duration-300 group-hover:text-lime-700">
            {c.name}
          </h3>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#e5e5e5] px-3 py-1.5 text-[12px] font-medium text-[#404040]"
                >
                  {t}
                </span>
              ))}
            </div>
            {year && <span className="shrink-0 text-[14px] text-[#737373]">{year}</span>}
          </div>
        </div>
      </div>
    </Tilt>
  );

  return c.href ? (
    <Link href={c.href} className="group block h-full">
      {card}
    </Link>
  ) : (
    <div className="group h-full">{card}</div>
  );
}
