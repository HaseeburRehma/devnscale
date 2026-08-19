import {
  ArrowRightIcon,
  BitcoinIcon,
  ChatIcon,
  CodeIcon,
  LayoutIcon,
  PresentationIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  TrendingUpIcon,
} from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import { SERVICES, SERVICE_DETAILS } from "@/lib/content";

const ICONS = {
  code: CodeIcon,
  smartphone: SmartphoneIcon,
  layout: LayoutIcon,
  chat: ChatIcon,
  shield: ShieldCheckIcon,
  presentation: PresentationIcon,
  trending: TrendingUpIcon,
  bitcoin: BitcoinIcon,
};

type Service = (typeof SERVICES)[number];

function Card({ service, delay }: { service: Service; delay: number }) {
  const Icon = ICONS[service.icon as keyof typeof ICONS];
  const featured = "featured" in service && service.featured;

  return (
    <Reveal
      delay={delay}
      className={featured ? "lg:col-span-2" : "lg:col-span-1"}
    >
      <a
        href={`/services/${SERVICE_DETAILS[service.id]?.slug ?? ""}`}
        className={`group relative flex h-full min-h-[299px] flex-col justify-between overflow-hidden rounded-[24px] p-8 transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
          featured
            ? "bg-brand-900 hover:shadow-[0_20px_44px_-14px_rgba(4,47,34,0.55)]"
            : "border border-lime-300 bg-lime-50 hover:border-lime-500 hover:shadow-[0_20px_44px_-16px_rgba(155,167,24,0.45)]"
        }`}
      >
        {/* sheen that sweeps across on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.14)_50%,transparent_65%)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
        />

        <div className="relative">
          {/* icon box */}
          <span
            className={`flex size-14 items-center justify-center rounded-[14px] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110 ${
              featured
                ? "bg-gradient-to-br from-lime-400 to-lime-600 shadow-[0_0_18px_2px_rgba(196,212,52,0.35)]"
                : "bg-ink-900 shadow-[0_0_16px_1px_rgba(155,167,24,0.28)]"
            }`}
          >
            <Icon
              className={`size-6 ${featured ? "text-white" : "text-lime-400"}`}
            />
          </span>

          {/* Figma puts the title block 76px below the icon box top, i.e. 20px
              below its 56px bottom. Featured cards use Heading 3, the rest
              Heading 5. */}
          <h3
            className={`mt-5 ${featured ? "t-h3 text-white" : "t-h5 text-ink-900"}`}
          >
            {service.title}
          </h3>
          <p
            className={`t-body-sm mt-2.5 max-w-[46ch] ${
              featured ? "text-ink-300" : "text-text-secondary"
            }`}
          >
            {service.body}
          </p>
        </div>

        <span
          className={`relative mt-8 inline-flex items-center gap-2 text-[14px] font-medium ${
            featured ? "text-lime-400" : "text-lime-700"
          }`}
        >
          Explore Service
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </a>
    </Reveal>
  );
}

export default function Services() {
  const [web, mobile, ...rest] = SERVICES;

  return (
    <section id="services" className="bg-canvas section-y">
      <div className="shell">
        <Reveal>
          <p className="t-eyebrow">WHAT WE DO</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-subsection mt-[22px] max-w-[820px] text-ink-900">
            Services built to scale your business.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body-lg mt-[18px] max-w-[620px] text-text-secondary">
            One team for the whole journey — strategy, design, engineering, and
            growth. Pick a single service or let us run the entire product.
          </p>
        </Reveal>

        {/* Row 1 is 2:1; rows 2 and 3 are even thirds */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-[56px] lg:grid-cols-3">
          <Card service={web} delay={0} />
          <Card service={mobile} delay={0.06} />
          {rest.map((service, i) => (
            <Card key={service.id} service={service} delay={0.06 * (i + 2)} />
          ))}
        </div>
      </div>
    </section>
  );
}
