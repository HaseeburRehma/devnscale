"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setStatus({ kind: "error", message: body.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setStatus({ kind: "ok", message: "You're on the list. Thanks for subscribing." });
    } catch {
      setStatus({ kind: "error", message: "Couldn't reach the server. Please try again." });
    }
  }

  return (
    <>
      <form
        className="group mt-6 flex h-[58px] w-full max-w-[428px] items-center overflow-hidden rounded-full border border-white/20 bg-transparent pl-6 transition-colors duration-300 focus-within:border-lime-400"
        onSubmit={handleSubmit}
      >
        <label htmlFor="newsletter" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="Enter email address*"
          className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-white outline-none placeholder:text-ink-400"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status.kind === "sending"}
          className="flex h-full w-[62px] shrink-0 items-center justify-center rounded-full bg-lime-400 text-brand-950 transition-[background-color,transform] duration-300 hover:bg-lime-300 disabled:opacity-60"
        >
          <ArrowRightIcon className="size-5 transition-transform duration-300 group-focus-within:translate-x-0.5" />
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-5 text-[14px] ${status.kind === "error" ? "text-red-400" : "text-lime-400"}`}
      >
        {status.kind === "ok" || status.kind === "error" ? status.message : ""}
      </p>
    </>
  );
}
