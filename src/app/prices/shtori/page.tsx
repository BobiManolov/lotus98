import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PvcInfoBox } from "@/components/prices/PvcInfoBox";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { SITE } from "@/content/site";

const HERO_IMAGE = PRODUCT_CATEGORY_IMAGES["shtori"];
const EUR_BGN = 1.956;
const fmtBgn = (eur: number) => (eur * EUR_BGN).toFixed(2);

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Вътрешни щори — цени",
  description: `Ориентировъчни цени за вътрешни хоризонтални щори за PVC дограма в София — ${SITE.name}.`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShtoriPricesPage() {
  return (
    <>
      <InnerPageHero
        title="Вътрешни щори — Цени"
        subtitle="Ориентировъчни цени за вътрешни хоризонтални щори за PVC дограма."
        imageSrc={HERO_IMAGE}
      />

      {/* Product — Вътрешни хоризонтални щори */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Вътрешни хоризонтални щори
          </SectionHeading>

          <article className="mt-8 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-[2fr_3fr]">
              {/* Left: image fills full card height */}
              <div className="relative h-full overflow-hidden">
                <Image
                  src="/images/shtori/Вътрешни хоризонтални щори.jpg"
                  alt="Вътрешни хоризонтални щори"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 40vw, 400px"
                />
              </div>

              {/* Right: description + price table */}
              <div className="flex flex-col justify-center border-l border-l-[#e5e7eb] bg-white p-6 sm:p-8">
                <div className="border-l-[3px] border-l-accent pl-4">
                  <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Вътрешни хоризонтални щори за PVC дограма с ламели ширина{" "}
                    <span className="font-semibold">25 мм.</span>
                  </p>
                  <p className="mt-2 text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Цени без монтаж и с ДДС.
                  </p>
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="whitespace-nowrap border-b border-r border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Цвят
                        </th>
                        <th className="border-b border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Цена
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-200">
                        <td className="whitespace-nowrap border-r border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700">
                          Бял цвят
                        </td>
                        <td className="px-4 py-2.5 text-center tabular-nums">
                          <span className="block font-semibold text-slate-900">45 €/кв.м.</span>
                          <span className="block text-xs text-slate-500">{fmtBgn(45)} лв./кв.м.</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap border-r border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700">
                          Дървесен цвят
                        </td>
                        <td className="px-4 py-2.5 text-center tabular-nums">
                          <span className="block font-semibold text-slate-900">70 €/кв.м.</span>
                          <span className="block text-xs text-slate-500">{fmtBgn(70)} лв./кв.м.</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Installation & service notes */}
      <section className="border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Монтаж, транспорт и условия
          </SectionHeading>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <PvcInfoBox title="Монтаж" tone="teal">
              <p>Монтаж: <span className="font-semibold">10 €/бр. / 19.56 лв./бр.</span></p>
              <p className="mt-2">Вземане на размери в София: <span className="font-semibold">20 € / 39.12 лв. за цялата поръчка</span></p>
              <p className="mt-2">Доставка в София: <span className="font-semibold">20 € / 39.12 лв. за цялата поръчка</span></p>
            </PvcInfoBox>
            <PvcInfoBox title="Поръчки без монтаж" tone="slate">
              <p>
                Вземате от:{" "}
                <span className="font-semibold">Стопански двор, Горни Лозен</span>
              </p>
              <p className="mt-2">
                Позвънете за информация:{" "}
                <a href="tel:0899859276" className="font-semibold hover:underline">
                  0899 859 276
                </a>
              </p>
            </PvcInfoBox>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900/90">Забележки</h3>
            <ul className="mt-3 list-none space-y-3 text-sm italic leading-relaxed text-slate-800 sm:text-base">
              <li>* Щори под 0.5 кв.м. се смятат за 0.5 кв.м.</li>
              <li>* Щорите са с водачи от корда.</li>
            </ul>
          </div>

          <p className="mt-8 text-center">
            <Link href="/prices" className="text-sm font-semibold text-accent transition-colors hover:underline">
              ← Към всички категории цени
            </Link>
          </p>
        </div>
      </section>

      <CtaStrip variant="services" sectionClassName="bg-white py-14 sm:py-16" />
    </>
  );
}
