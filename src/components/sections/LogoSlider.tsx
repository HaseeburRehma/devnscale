/**
 * "Happy Clients" marquee — real client logos imported from the Figma
 * "Logo Slider" component (node 4764:1719 / 4509:5055), each on its own
 * white pill exactly as designed. A couple of the source marks are large
 * raster crops (the Figma frame only shows a zoomed-in slice of them), so
 * those carry the exact top/left/width/height crop from Figma rather than
 * being shown in full.
 */

type ClientLogo = {
  src: string;
  /** natural width in px at the design's 24px logo height */
  width: number;
  alt: string;
  fit?: "cover";
  crop?: { top: string; left: string; width: string; height: string };
};

const CLIENT_LOGOS: ClientLogo[] = [
  { src: "/img/logos/client-1.svg", width: 82, alt: "Client logo" },
  { src: "/img/logos/client-2.svg", width: 102, alt: "Client logo" },
  { src: "/img/logos/client-3.svg", width: 135, alt: "Client logo" },
  { src: "/img/logos/client-4.png", width: 115, alt: "Client logo", fit: "cover" },
  {
    src: "/img/logos/client-5.png",
    width: 101,
    alt: "Client logo",
    crop: { top: "-212.56%", left: "-15.31%", width: "130.61%", height: "525.13%" },
  },
  {
    src: "/img/logos/client-6.png",
    width: 61,
    alt: "Client logo",
    crop: { top: "-76.74%", left: "0%", width: "100%", height: "253.49%" },
  },
  {
    src: "/img/logos/client-7.png",
    width: 47,
    alt: "Client logo",
    crop: { top: "-24.19%", left: "-0.23%", width: "100.47%", height: "148.39%" },
  },
];

function LogoChip({ logo }: { logo: ClientLogo }) {
  return (
    <span className="flex shrink-0 items-center overflow-hidden rounded-[8px] bg-white px-2 py-1">
      <span className="relative block h-6" style={{ width: logo.width }}>
        {logo.crop ? (
          <span className="absolute inset-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              className="absolute max-w-none"
              style={logo.crop}
            />
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo.src}
            alt={logo.alt}
            className={`absolute inset-0 size-full ${logo.fit === "cover" ? "object-cover" : ""}`}
          />
        )}
      </span>
    </span>
  );
}

export default function LogoSlider({ tone = "dark" }: { tone?: "dark" | "light" } = {}) {
  const isLight = tone === "light";
  const sectionBg = isLight ? "bg-canvas" : "bg-ink-950";
  const labelBg = isLight ? "bg-canvas" : "bg-ink-950";
  const labelText = isLight ? "text-ink-900" : "text-white";
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
            <div
              key={copy}
              className="flex items-center gap-[21px] px-[10.5px]"
              aria-hidden={copy === 1}
            >
              {CLIENT_LOGOS.map((logo, i) => (
                <LogoChip key={`${copy}-${i}`} logo={logo} />
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
