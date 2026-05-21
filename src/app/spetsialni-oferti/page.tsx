import type { Metadata } from "next";
import { CtaStrip } from "@/components/CtaStrip";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import { SITE, SPECIAL_OFFERS } from "@/content/site";

export const metadata: Metadata = {
  title: "Специални оферти",
  description: SPECIAL_OFFERS.intro,
};

export default function SpecialOffersPage() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {SPECIAL_OFFERS.heading}
          </SectionHeading>
          <p className="mt-4 text-lg text-muted">{SPECIAL_OFFERS.intro}</p>
        </div>
      </div>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6">
          {SPECIAL_OFFERS.offers.map((o) => (
            <article
              key={o.title}
              className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg"
            >
              <SectionHeading align="start" titleClassName="text-xl font-bold text-brand-900">
                {o.title}
              </SectionHeading>
              <p className={`leading-relaxed text-slate-800 ${sectionAfterHeadingSpacing}`}>{o.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
