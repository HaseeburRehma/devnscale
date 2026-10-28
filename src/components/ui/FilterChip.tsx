/** Figma "Team/Filter Chip": Active is brand green with a lime count. */
export default function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2.5 rounded-full px-[18px] py-2.5 text-[14px] font-medium leading-5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 ${
        active
          ? "bg-brand-950 text-white"
          : "border border-border-subtle bg-white text-ink-900 hover:border-brand-950"
      }`}
    >
      {label}
      <span className={`text-[13px] leading-4 ${active ? "text-lime-500" : "text-text-muted"}`}>{count}</span>
    </button>
  );
}
