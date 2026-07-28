/* Plain <img> rather than next/image: these are tiny inline-coloured SVGs,
   so the optimiser adds nothing and would flag them as LCP candidates. */

const LOGOS = [
  { src: "/img/logos/logo-small-light.svg", w: 96, h: 22 },
  { src: "/img/logos/logo-mark-light.svg", w: 48, h: 24 },
  { src: "/img/logos/logo-word-lime.svg", w: 152, h: 24 },
  { src: "/img/logos/logo-word-light.svg", w: 149, h: 24 },
  { src: "/img/logos/logo-small-lime.svg", w: 96, h: 22 },
  { src: "/img/logos/logo-mark-lime.svg", w: 48, h: 24 },
  { src: "/img/logos/logo-word-light.svg", w: 149, h: 24 },
  { src: "/img/logos/logo-word-lime.svg", w: 152, h: 24 },
];

export default function LogoSlider() {
  return (
    <section className="relative flex h-[76px] items-center overflow-hidden bg-ink-950">
      {/* pinned label */}
      <div className="relative z-10 flex h-full shrink-0 items-center bg-ink-950 pl-5 pr-6 sm:pl-10 lg:pl-20">
        <span className="font-display text-[18px] font-bold leading-[1.15] text-white">
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
              {LOGOS.map((logo, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="flex shrink-0 items-center px-8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt=""
                    width={logo.w}
                    height={logo.h}
                    style={{ width: logo.w, height: logo.h }}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* edge fades */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-ink-950 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-950 to-transparent" />
      </div>
    </section>
  );
}
