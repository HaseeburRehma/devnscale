import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";
import Reveal from "@/components/ui/Reveal";
import AnimatedGroup from "@/components/motion/AnimatedGroup";
import { CONTACT_DETAILS, CONTACT_REACH } from "@/lib/content";

const ICONS = { mail: MailIcon, phone: PhoneIcon, pin: MapPinIcon } as const;

/** The three contact-channel cards (Email / Phone / Office). */
export default function ContactReach() {
  const { title, subtitle, cards } = CONTACT_REACH;
  return (
    <section className="bg-canvas section-y">
      <div className="shell">
        <div className="mx-auto max-w-[460px] text-center">
          <Reveal>
            <h2 className="t-subsection text-ink-900">{title}</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-body mt-4 text-text-secondary">{subtitle}</p>
          </Reveal>
        </div>

        <AnimatedGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {cards.map((card) => {
            const Icon = ICONS[card.icon];
            const { lines } = CONTACT_DETAILS.find((d) => d.icon === card.icon)!;
            return (
              <div
                key={card.label}
                className="group rounded-[20px] border border-border-subtle bg-white p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-default hover:shadow-[0_12px_30px_rgba(25,33,61,0.08)]"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-b from-ink-800 to-ink-950 text-lime-400 shadow-[0_6px_16px_rgba(10,10,10,0.25)] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="size-5" />
                </span>
                <p className="t-h6 mt-6 text-ink-900">{card.label}</p>
                <ul className={`mt-4 flex flex-col ${card.icon === "pin" ? "gap-5" : "gap-1"}`}>
                  {lines.map((line) => (
                    <li key={line.text}>
                      {line.heading && <p className="text-[15px] font-medium leading-6 text-ink-900">{line.heading}</p>}
                      <a
                        href={line.href}
                        {...(line.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="break-words text-[15px] leading-6 text-text-secondary transition-colors hover:text-lime-700"
                      >
                        {line.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </AnimatedGroup>
      </div>
    </section>
  );
}
