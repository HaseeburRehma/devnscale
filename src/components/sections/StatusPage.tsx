import Link from "next/link";
import Logo from "@/components/ui/Logo";

/* Standalone (no Navbar/Footer) so it still renders if those are what crashed. */
export default function StatusPage({
  code,
  title,
  body,
  action,
}: {
  code: string;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#02150e] text-white">
      <div className="shell flex h-[74px] items-center">
        <Logo />
      </div>
      <div className="shell flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="font-display text-[14px] tracking-[0.14em] text-lime-400">{code}</p>
        <h1 className="mt-4 font-display text-[clamp(2rem,1.2rem+3vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-[1.6] text-white/75">{body}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {action}
          <Link
            href="/"
            className="inline-flex h-[54px] items-center rounded-xl bg-lime-500 px-7 font-display text-[15px] font-medium uppercase tracking-[-0.3px] text-ink-950 transition-colors hover:bg-lime-400"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-[54px] items-center rounded-xl border border-lime-100 px-7 font-display text-[15px] font-medium uppercase tracking-[-0.3px] text-white transition-colors hover:bg-white hover:text-ink-950"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
