"use client";

import { ArrowRightIcon } from "@/components/icons";

export default function NewsletterForm() {
  return (
    <form
      className="group mt-6 flex h-[58px] w-full max-w-[428px] items-center overflow-hidden rounded-full border border-white/20 bg-transparent pl-6 transition-colors duration-300 focus-within:border-lime-400"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter"
        type="email"
        placeholder="Enter email address*"
        className="h-full flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-ink-400"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-full w-[62px] shrink-0 items-center justify-center rounded-full bg-lime-400 text-brand-950 transition-[background-color,transform] duration-300 hover:bg-lime-300"
      >
        <ArrowRightIcon className="size-5 transition-transform duration-300 group-focus-within:translate-x-0.5" />
      </button>
    </form>
  );
}
