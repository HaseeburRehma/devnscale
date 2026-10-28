"use client";

import { useState } from "react";
import { ArrowRightIcon, BriefcaseIcon, ClockIcon, MailIcon, MapPinIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { CAREERS_EMAIL, CAREERS_ROLES, JOBS, type Job } from "@/lib/careers";
import FilterChip from "@/components/ui/FilterChip";

const DEPARTMENTS = [...new Set(JOBS.map((j) => j.department))];

/** Figma "Careers · Open Roles": department filter, job rows, open application. */
export default function CareersOpenRoles() {
  const [filter, setFilter] = useState<string>("All");
  const shown = DEPARTMENTS.filter((d) => filter === "All" || d === filter);

  return (
    <section id="open-roles" className="scroll-mt-24 bg-white py-[clamp(4rem,1.5rem+6vw,7.5rem)]">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[560px] flex-col gap-4">
            <Reveal>
              <h2 className="font-display text-[clamp(2.25rem,1.5rem+3vw,3.5rem)] font-bold leading-[1.14] tracking-[-2px] text-ink-900">
                {CAREERS_ROLES.title}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[18px] leading-7 text-text-secondary">{CAREERS_ROLES.subtitle}</p>
            </Reveal>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter roles by department">
            <FilterChip label="All" count={JOBS.length} active={filter === "All"} onClick={() => setFilter("All")} />
            {DEPARTMENTS.map((d) => (
              <FilterChip
                key={d}
                label={d}
                count={JOBS.filter((j) => j.department === d).length}
                active={filter === d}
                onClick={() => setFilter(d)}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-12">
          {shown.map((d) => {
            const jobs = JOBS.filter((j) => j.department === d);
            return (
              <div key={d} className="flex flex-col gap-4">
                <p className="flex items-center gap-2.5">
                  <span className="font-display text-[18px] font-medium leading-6 text-ink-900">{d}</span>
                  <span className="text-[14px] leading-5 text-text-muted">
                    {jobs.length} {jobs.length === 1 ? "role" : "roles"}
                  </span>
                </p>
                {jobs.map((job) => (
                  <JobRow key={job.title} job={job} />
                ))}
              </div>
            );
          })}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col gap-6 rounded-[20px] bg-ink-50 px-6 py-7 sm:px-9 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-[951px] flex-col gap-2">
              <h3 className="font-display text-[20px] font-medium leading-7 text-ink-900">{CAREERS_ROLES.openTitle}</h3>
              <p className="text-[16px] leading-6 text-text-secondary">{CAREERS_ROLES.openBody}</p>
            </div>
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border-default bg-white px-5 py-3.5 text-[16px] font-medium leading-6 text-ink-900 transition-colors hover:border-brand-950 hover:bg-brand-950 hover:text-white lg:self-auto"
            >
              <MailIcon className="size-[18px]" />
              {CAREERS_EMAIL}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* The whole row opens an email to apply; hover turns the border and arrow lime. */
function JobRow({ job }: { job: Job }) {
  const href = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
  return (
    <a
      href={href}
      aria-label={`Apply for ${job.title}`}
      className="group flex flex-col gap-6 rounded-[20px] border border-border-subtle bg-white px-6 py-7 transition-colors duration-300 hover:border-lime-500 hover:bg-lime-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 sm:px-9 sm:py-8 lg:flex-row lg:items-center lg:gap-10"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h3 className="font-display text-[24px] font-medium leading-8 tracking-[-0.5px] text-ink-900">{job.title}</h3>
        <p className="text-[16px] leading-6 text-text-secondary">{job.summary}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Pill icon={<BriefcaseIcon className="size-3.5" />}>{job.type}</Pill>
        <Pill icon={<MapPinIcon className="size-3.5" />}>{job.location}</Pill>
        <Pill icon={<ClockIcon className="size-3.5" />}>{job.experience}</Pill>
      </div>
      <span className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-border-default bg-white text-ink-900 transition-colors duration-300 group-hover:border-lime-500 group-hover:bg-lime-500 lg:flex">
        <ArrowRightIcon className="size-5" />
      </span>
    </a>
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-ink-50 py-[7px] pl-3 pr-3.5 text-[13px] font-medium leading-4 text-text-secondary transition-colors group-hover:bg-white">
      {icon}
      {children}
    </span>
  );
}
