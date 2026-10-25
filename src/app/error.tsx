"use client";

import { useEffect } from "react";
import StatusPage from "@/components/sections/StatusPage";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code="ERROR"
      title="Something went wrong."
      body="This page hit an unexpected error. Try again, and if it keeps happening please let us know."
      action={
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex h-[54px] items-center rounded-xl border border-white/30 px-7 font-display text-[15px] font-medium uppercase tracking-[-0.3px] text-white transition-colors hover:border-lime-400 hover:text-lime-400"
        >
          Try again
        </button>
      }
    />
  );
}
