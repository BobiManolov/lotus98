import type { Metadata } from "next";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPricesCategoriesForCards, PRICES_OVERVIEW_SUBTITLE } from "@/content/pricesPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Цени",
  description: `Ориентировъчни цени по категории — ${SITE.name}, София.`,
};

export default function PricesOverviewPage() {
  const categories = getPricesCategoriesForCards();

  return (
    <>
      <InnerPageHero title="Цени" subtitle={PRICES_OVERVIEW_SUBTITLE} />

      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[var(--background)] via-white to-slate-50/80 py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="start"
            titleClassName="max-w-4xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Категории
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
            Изберете категория, за да видите ориентировъчни цени. Финалната оферта зависи от размери, конфигурация и
            монтаж.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
            {categories.map((c) => (
              <ProductCategoryCard key={c.slug} category={c} linkPurpose="prices" />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip variant="services" />
    </>
  );
}
