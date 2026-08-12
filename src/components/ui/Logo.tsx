import Image from "next/image";

/**
 * Brand lockup from the Figma "Logo Brief": the vector mark (pale-lime rounded
 * square + black S + lime arrow) beside the "Dev n Scale" wordmark, with the
 * "Built · System · Growth" tagline. White/lime for the dark nav and footer.
 */
export default function Logo({
  withTagline = true,
  href = "/",
  className = "",
}: {
  withTagline?: boolean;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label="Dev n Scale — home"
      className={`group flex shrink-0 items-center gap-2.5 ${className}`}
    >
      <Image
        src="/img/logos/mark.svg"
        alt=""
        width={34}
        height={36}
        priority
        className="h-[36px] w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col justify-center leading-none">
        <span className="font-display text-[20px] font-bold tracking-[-0.3px] text-white">
          Dev n <span className="text-lime-400">Scale</span>
        </span>
        {withTagline && (
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-ink-400">
            Built · System · Growth
          </span>
        )}
      </span>
    </a>
  );
}
