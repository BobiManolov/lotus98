import type { Metadata } from "next";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PvcCalculatorPlaceholder } from "@/components/prices/PvcCalculatorPlaceholder";
import { PvcInfoBox } from "@/components/prices/PvcInfoBox";
import { PvcPricingCard } from "@/components/prices/PvcPricingCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  PVC_COLOR_SWATCHES,
  PVC_GLAZING_SURCHARGES,
  PVC_NOTES,
  PVC_PRICE_INCLUDES,
  PVC_PRICES_PAGE_TITLE_LINE,
  PVC_PRICING_CARDS,
  PVC_TWO_WAY_MECHANISM,
  type PvcRectangleDiagram,
} from "@/content/pvcPricesPageData";
import { PvcWindowDiagram } from "@/components/prices/PvcWindowDiagram";
import { PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { SITE } from "@/content/site";

const HERO_IMAGE = PRODUCT_CATEGORY_IMAGES["pvc-dograma"];

// ── Exterior PVC door cards ───────────────────────────────────────────────────

const EXT_DOOR_CARDS = [
  { id: "ext-door-700",  widthMm: 700,  diagramRefTotal: 1500, vivaEur: 330, vivaBgn: "645.42",  aluplastEur: 390, aluplastBgn: "762.77"  },
  { id: "ext-door-800",  widthMm: 800,  diagramRefTotal: 1647, vivaEur: 350, vivaBgn: "684.54",  aluplastEur: 410, aluplastBgn: "801.89"  },
  { id: "ext-door-900",  widthMm: 900,  diagramRefTotal: 1789, vivaEur: 370, vivaBgn: "723.66",  aluplastEur: 430, aluplastBgn: "841.01"  },
  { id: "ext-door-1000", widthMm: 1000, diagramRefTotal: 1935, vivaEur: 390, vivaBgn: "762.77",  aluplastEur: 450, aluplastBgn: "880.12"  },
] as const;

const HERO_SUBTITLE =
  "Ориентировъчни стандартни цени за София. Крайната оферта зависи от размери, конфигурация, цвят, стъклопакет и монтаж.";

export const metadata: Metadata = {
  title: "PVC дограма — цени",
  description: `${PVC_PRICES_PAGE_TITLE_LINE} — ${SITE.name}, София.`,
};

export default function PvcPricesPage() {
  return (
    <>
      <InnerPageHero title="PVC дограма – Цени" subtitle={HERO_SUBTITLE} imageSrc={HERO_IMAGE} />

      <section id="prozortsi" className="scroll-mt-24 border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Външни PVC прозорци
          </SectionHeading>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {PVC_PRICING_CARDS.map((card) => (
              <PvcPricingCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section id="vrati" className="scroll-mt-24 border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Външни PVC врати
          </SectionHeading>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {EXT_DOOR_CARDS.map((door) => {
              const diagram: PvcRectangleDiagram = {
                shape: "rectangle",
                widthMm: door.widthMm,
                heightMm: 1400,
                diagramDimWidthMm: door.widthMm,
                diagramDimHeightMm: 2000,
                panels: [{ type: "opening", openingStyle: "tilt-turn" }],
                leftPaneOfTwoPaneTotalWidthMm: door.diagramRefTotal,
              };
              return (
                <article
                  key={door.id}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                    <PvcWindowDiagram {...diagram} />
                  </div>

                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <div className="space-y-3">
                      <div>
                        <p className="text-[13px] font-bold uppercase tracking-wide text-slate-900">
                          VIVA PLAST бял
                        </p>
                        <dl className="mt-2 text-sm">
                          <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                            <dt className="text-slate-600">с монтаж и лишване</dt>
                            <dd className="font-semibold text-slate-900">
                              {door.vivaEur} € / {door.vivaBgn} лв.
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div className="border-t border-slate-100 pt-3">
                        <p className="text-[13px] font-bold uppercase tracking-wide text-slate-900">
                          ALUPLAST бял
                        </p>
                        <dl className="mt-2 text-sm">
                          <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                            <dt className="text-slate-600">с монтаж и лишване</dt>
                            <dd className="font-semibold text-slate-900">
                              {door.aluplastEur} € / {door.aluplastBgn} лв.
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-center lg:gap-8">
            <div className="lg:self-start">
              <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Налични цветове
              </SectionHeading>
              <div className="mt-8 flex flex-wrap justify-start gap-3 sm:gap-3.5">
                {PVC_COLOR_SWATCHES.map((c) => (
                  <div key={c.label} className="group flex w-[84px] flex-col items-center gap-2.5 text-center">
                    <div
                      className={`h-[62px] w-[62px] rounded-[12px] border border-slate-200/90 shadow-[0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/[0.05] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02] group-hover:shadow-[0_10px_20px_rgba(15,23,42,0.12)] ${c.swatchClass}`}
                      aria-hidden
                    />
                    <span className="whitespace-nowrap text-[13px] font-semibold leading-none tracking-[0.01em] text-slate-800">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex lg:justify-end">
              <PvcCalculatorPlaceholder />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Допълнителни условия, оскъпявания и информация
          </SectionHeading>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PvcInfoBox title="Оскъпяване за стъклопакет" tone="teal">
              <ul className="space-y-2">
                {PVC_GLAZING_SURCHARGES.map((row) => (
                  <li key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-slate-700">{row.label}</span>
                    <span className="whitespace-nowrap shrink-0 font-semibold tabular-nums text-slate-900">{row.value}</span>
                  </li>
                ))}
              </ul>
            </PvcInfoBox>
            <PvcInfoBox title="Оскъпяване за цвят" tone="amber">
              <div className="space-y-4">
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">Външни PVC прозорци</p>
                  <ul className="space-y-1.5">
                    <li className="flex justify-between gap-2">
                      <span className="font-medium text-slate-800">VIVA PLAST</span>
                      <span className="font-semibold text-slate-900">+25%</span>
                    </li>
                    <li className="flex justify-between gap-2">
                      <span className="font-medium text-slate-800">ALUPLAST</span>
                      <span className="font-semibold text-slate-900">+30%</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">Външни PVC врати</p>
                  <ul className="space-y-1.5">
                    <li className="flex justify-between gap-2">
                      <span className="font-medium text-slate-800">VIVA PLAST</span>
                      <span className="font-semibold text-slate-900">+21%</span>
                    </li>
                    <li className="flex justify-between gap-2">
                      <span className="font-medium text-slate-800">ALUPLAST</span>
                      <span className="font-semibold text-slate-900">+21%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </PvcInfoBox>
            <PvcInfoBox title="Двуосов механизъм" tone="slate">
              <p className="text-base font-semibold tabular-nums text-slate-900">{PVC_TWO_WAY_MECHANISM}</p>
            </PvcInfoBox>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Цената с монтаж включва</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 sm:text-base">{PVC_PRICE_INCLUDES}</p>
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900/90">Забележки</h3>
              <ul className="mt-3 list-none space-y-3 text-sm italic leading-relaxed text-slate-800 sm:text-base">
                {PVC_NOTES.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center">
            <Link href="/prices" className="text-sm font-semibold text-accent transition-colors hover:underline">
              ← Към всички категории цени
            </Link>
          </p>
        </div>
      </section>

      <CtaStrip variant="services" sectionClassName="bg-[#f8f9fa] py-14 sm:py-16" />
    </>
  );
}
