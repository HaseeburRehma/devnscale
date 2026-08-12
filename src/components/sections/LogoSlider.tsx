/**
 * "Happy Clients" marquee. The Figma uses generic logoipsum-style client
 * placeholders (a friendly stand-in for real client marks that haven't been
 * commissioned yet), so this component renders the same until real client
 * logos are supplied. `tone="light"` swaps to a canvas background for pages
 * whose neighbouring sections are light (Contact).
 */

// Simple pictogram + wordmark placeholders — 8 distinct "brand" marks that
// look like a real client roster in silhouette.
type Placeholder = { name: string; glyph: string };
const CLIENTS: Placeholder[] = [
  { name: "Logoipsum", glyph: "spark" },
  { name: "Logoipsum", glyph: "dot-triple" },
  { name: "Logoipsum", glyph: "wave" },
  { name: "Logoipsum", glyph: "spark" },
  { name: "Logoipsum", glyph: "dot-triple" },
  { name: "Logoipsum", glyph: "wave" },
  { name: "Logoipsum", glyph: "spark" },
  { name: "Logoipsum", glyph: "dot-triple" },
];

function Glyph({ kind, color }: { kind: string; color: string }) {
  switch (kind) {
    case "spark":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
          <path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3z" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 32 20" width="26" height="20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <path d="M2 10c4-8 8-8 12 0s8 8 16 0" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="22" height="20" fill={color}>
          <circle cx="6" cy="12" r="2.4" />
          <circle cx="12" cy="12" r="2.4" />
          <circle cx="18" cy="12" r="2.4" />
        </svg>
      );
  }
}

export default function LogoSlider({ tone = "dark" }: { tone?: "dark" | "light" } = {}) {
  const isLight = tone === "light";
  const sectionBg = isLight ? "bg-canvas" : "bg-ink-950";
  const labelBg = isLight ? "bg-canvas" : "bg-ink-950";
  const labelText = isLight ? "text-ink-900" : "text-white";
  const logoText = isLight ? "text-ink-500" : "text-ink-300";
  const logoAccent = isLight ? "#7b8513" : "#c4d434";
  const fadeFrom = isLight ? "from-canvas" : "from-ink-950";
  const fadeTo = isLight ? "from-canvas" : "from-ink-950";

  return (
    <section className={`relative flex h-[76px] items-center overflow-hidden ${sectionBg}`}>
      {/* pinned label */}
      <div className={`relative z-10 flex h-full shrink-0 items-center pl-5 pr-6 sm:pl-10 lg:pl-20 ${labelBg}`}>
        <span className={`font-display text-[18px] font-bold leading-[1.15] ${labelText}`}>
          Happy
          <br />
          Clients
        </span>
      </div>

      {/* scrolling track — duplicated once so the -50% loop is seamless */}
      <div className="marquee-host relative h-full flex-1 overflow-hidden">
        <div
          className="marquee-track marquee-left h-full items-center"
          style={{ ["--marquee-duration" as string]: "34s" }}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {CLIENTS.map((c, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={`flex shrink-0 items-center gap-2.5 px-8 font-display text-[18px] font-medium ${logoText}`}
                >
                  <Glyph kind={c.glyph} color={logoAccent} />
                  {c.name}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* edge fades */}
        <span className={`pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r ${fadeFrom} to-transparent`} />
        <span className={`pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l ${fadeTo} to-transparent`} />
      </div>
    </section>
  );
}
