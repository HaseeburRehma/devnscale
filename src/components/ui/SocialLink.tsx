/** Figma "Team/Social Button": hover fills brand green with a lime icon. */

export const LINKEDIN_ICON = (
  <path d="M10.672 5.336a4.002 4.002 0 0 1 4.002 4.002v4.669h-2.668V9.338a1.334 1.334 0 0 0-2.668 0v4.669H6.67V9.338a4.002 4.002 0 0 1 4.002-4.002ZM1.334 6.003h2.668v8.004H1.334V6.003ZM2.668 4.002a1.334 1.334 0 1 0 0-2.668 1.334 1.334 0 0 0 0 2.668Z" />
);

export const INSTAGRAM_ICON = (
  <>
    <path d="M4.669 1.334h6.67a3.335 3.335 0 0 1 3.335 3.335v6.67a3.335 3.335 0 0 1-3.335 3.335h-6.67a3.335 3.335 0 0 1-3.335-3.335v-6.67a3.335 3.335 0 0 1 3.335-3.335Z" />
    <path d="M10.672 7.584a2.668 2.668 0 1 1-5.278.782 2.668 2.668 0 0 1 5.278-.782ZM11.673 4.336h.006" />
  </>
);

export function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white text-ink-700 transition-colors duration-300 hover:border-brand-950 hover:bg-brand-950 hover:text-lime-400 group-hover:border-brand-950 group-hover:bg-brand-950 group-hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16.008 16.008"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.334"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}
