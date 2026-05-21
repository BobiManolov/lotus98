import type { Metadata } from "next";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PvcInfoBox } from "@/components/prices/PvcInfoBox";
import { SectionHeading } from "@/components/SectionHeading";
import { StaklopaketiPriceTable } from "@/components/StaklopaketiPriceTable";
import { PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { EXTRA_FEES, EXTRA_FEE_NOTES } from "@/content/staklopaketi";
import { SITE } from "@/content/site";

const HERO_IMAGE = PRODUCT_CATEGORY_IMAGES["staklopaketi"];

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Стъклопакети и стъкла — цени",
  description: `Ценова листа за стъклопакети и единични стъкла в София — ${SITE.name}.`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StaklopaketiPricesPage() {
  return (
    <>
      <InnerPageHero
        title="Стъклопакети и стъкла — Цени"
        subtitle="Ценова листа валидна от 06.04.2026 г. · Цени с ДДС · Лотос 98 ООД"
        imageSrc={HERO_IMAGE}
      />

      {/* Interactive price table — client component */}
      <StaklopaketiPriceTable />

      {/* Additional fees */}
      <section className="border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Допълнителни такси
          </SectionHeading>

          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-r border-slate-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Описание
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    €
                  </th>
                  <th className="border-b border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    лв.
                  </th>
                </tr>
              </thead>
              <tbody>
                {EXTRA_FEES.map((fee, i) => (
                  <tr
                    key={fee.description}
                    className={i < EXTRA_FEES.length - 1 ? "border-b border-slate-200" : ""}
                  >
                    <td className="border-r border-slate-200 px-5 py-3 text-[13px] text-slate-800">
                      {fee.description}
                    </td>
                    <td className="border-r border-slate-200 px-4 py-3 text-center text-[13px] tabular-nums font-semibold text-slate-900">
                      {fee.eur}
                    </td>
                    <td className="px-4 py-3 text-center text-[13px] tabular-nums text-slate-600">
                      {fee.bgn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900/90">
              Забележки
            </h3>
            <ul className="mt-3 list-none space-y-2 text-sm italic leading-relaxed text-slate-800">
              {EXTRA_FEE_NOTES.map((note) => (
                <li key={note}>* {note}</li>
              ))}
            </ul>
          </div>

          {/* Warning banner */}
          <div className="mt-5 rounded-2xl border border-red-200/80 bg-red-50/70 px-6 py-5 sm:px-8 sm:py-6">
            <div className="flex flex-col gap-3 items-center sm:flex-row sm:gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600"
                aria-hidden
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <p className="text-sm font-bold uppercase tracking-wide text-red-700">
                В МОМЕНТА НЕ ПРЕДЛАГАМЕ СМЯНА НА СТЪКЛОПАКЕТИ НА ДОГРАМА НЕМОНТИРАНА ОТ НАС!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation & service */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Монтаж, транспорт и условия
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PvcInfoBox title="Смяна на стъклопакет" tone="teal">
              <p>
                До 1.5 кв.м.:{" "}
                <span className="font-semibold">20 €/бр. / 39.12 лв./бр.</span>
              </p>
              <p className="mt-2">
                Над 1.5 кв.м.:{" "}
                <span className="font-semibold">40 €/бр. / 78.23 лв./бр.</span>
              </p>
            </PvcInfoBox>

            <PvcInfoBox title="Качване по стълби (без асансьор)" tone="amber">
              <p>
                <span className="font-semibold">3 €/кв.м. на етаж / 5.87 лв./кв.м. на етаж</span>
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Пример: стъклопакет 1.5 кв.м. до 4-ти етаж
                = 1.5 × 3 × 4 ={" "}
                <span className="font-semibold text-slate-700">18 € / 35.20 лв.</span>
              </p>
            </PvcInfoBox>

            <PvcInfoBox title="Вземане на размери и доставка" tone="slate">
              <p>
                Вземане на размери:{" "}
                <span className="font-semibold">20 € / 39.12 лв.</span> за цялата поръчка
              </p>
              <p className="mt-2">
                Транспорт в София:{" "}
                <span className="font-semibold">20 € / 39.12 лв.</span> за цялата поръчка
              </p>
              <p className="mt-2">
                Транспорт извън София:{" "}
                <span className="font-semibold">0.60 €/км / 1.17 лв./км</span>{" "}
                (от метростанция Сердика)
              </p>
              <p className="mt-2">
                При поръчка без монтаж — вземате от:{" "}
                <span className="font-semibold">Стопански двор, Горни Лозен</span>
              </p>
            </PvcInfoBox>
          </div>

          <p className="mt-8 text-center">
            <Link
              href="/prices"
              className="text-sm font-semibold text-accent transition-colors hover:underline"
            >
              ← Към всички категории цени
            </Link>
          </p>
        </div>
      </section>

      <CtaStrip variant="services" sectionClassName="bg-[var(--background)] py-14 sm:py-16" />
    </>
  );
}
