import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PageHero from "@/components/sections/PageHero";

export type LegalSection = { heading: string; body: React.ReactNode[] };

export default function LegalPage({
  eyebrow,
  title,
  subtitle,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          size="sm"
          showSecondary={false}
        />
        <section className="bg-white section-y">
          <div className="shell">
            <article className="mx-auto max-w-[760px]">
              <p className="text-[14px] text-text-tertiary">Last updated {updated}</p>
              {sections.map((s) => (
                <div key={s.heading} className="mt-10">
                  <h2 className="font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.5px] text-ink-900">
                    {s.heading}
                  </h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-4 text-[16px] leading-[1.65] text-text-secondary">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
