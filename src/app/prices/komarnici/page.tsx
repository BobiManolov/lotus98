import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PvcInfoBox } from "@/components/prices/PvcInfoBox";
import { SectionHeading } from "@/components/SectionHeading";
import { KomarnitsiKalkulator } from "@/components/KomarnitsiKalkulator";
import { PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { SITE } from "@/content/site";

const HERO_IMAGE = PRODUCT_CATEGORY_IMAGES["komarnitsi"];
const EUR_BGN = 1.956;
const fmtBgn = (eur: number) => (eur * EUR_BGN).toFixed(2);


const ROLLER_WIDTHS = [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600];
const UNDER_EUR = [28, 32, 35, 39, 42, 45, 49, 52, 56, 59, 62, 65];
const OVER_EUR = [31, 35, 39, 43, 47, 51, 55, 59, 63, 67, 71, 75];

const MOSQUITO_TYPES = [
  {
    title: "Статични комарници за прозорци",
    img: "/images/komarnici/statichni.png",
    desc: "Изработени от алуминиев профил 25/17 мм. и мрежа от фибростъкло. Закрепват се неподвижно от външната страна чрез рапидки. Хоризонтален делител при височина над 1200 мм.",
  },
  {
    title: "Отваряеми комарници на панти за прозорци",
    img: "/images/komarnici/panti-prozortsi.png",
    desc: "Алуминиев профил 25/17 мм. Закрепват се от външната страна чрез панти и заключалка. Включена дръжка. Пантите, заключалката и дръжката се монтират на място при инсталацията.",
  },
  {
    title: "Отваряеми комарници на панти за врати",
    img: "/images/komarnici/panti-vrati.png",
    desc: "Двукамерен алуминиев профил 42/17 мм. Подходящи за балконски врати. Закрепват се от външната страна чрез панти и заключалка. Хоризонтален делител при височина над 1200 мм.",
  },
  {
    title: "Ролетни комарници",
    img: "/images/komarnici/roletni.png",
    desc: "Ролетна мрежа в алуминиева рамка, навива се в заоблена кутия. Водачи с четки направляват движението. Дебелина 40 мм. При ураганни ветрове се препоръчва прибиране.",
  },
  {
    title: "Комарници едностранно плисе",
    img: "/images/komarnici/plise-edno.png",
    desc: "Подходящ за врати — еднокрили и двукрили с летящ делител, хармоники, фолтсвагени. Максимални размери: 2400 × 2600 мм. Събира се хоризонтално в единия край.",
  },
  {
    title: "Комарници двустранно плисе",
    img: "/images/komarnici/plise-dve.png",
    desc: "Подходящ за врати с големи размери. Максимални размери: 3000 × 2900 мм. Събира се от двата края към средата. Заема много малко място в събрано положение.",
  },
];

export const metadata: Metadata = {
  title: "Комарници — цени",
  description: `Ориентировъчни цени за комарници в София — ${SITE.name}.`,
};

export default function KomahniciPricesPage() {
  return (
    <>
      <InnerPageHero
        title="Комарници – Цени"
        subtitle="Ориентировъчни стандартни цени за София. Крайната оферта зависи от размери, вид и конфигурация."
        imageSrc={HERO_IMAGE}
      />

      {/* Types of mosquito nets */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Видове комарници
          </SectionHeading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {MOSQUITO_TYPES.map((t) => (
              <article
                key={t.title}
                className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm"
                style={{ minHeight: "400px" }}
              >
                <div className="border-b border-slate-200/80 px-6 py-3">
                  <h3 className="text-center text-[18px] font-bold leading-snug text-slate-900">{t.title}</h3>
                </div>
                <div className="grid grid-cols-[2fr_3fr]">
                  <div className="flex items-center justify-center bg-white" style={{ minHeight: "340px", width: "100%" }}>
                    <Image
                      src={t.img}
                      alt={t.title}
                      width={400}
                      height={400}
                      loading="lazy"
                      style={{ width: "95%", height: "320px", objectFit: "contain" }}
                      sizes="(max-width: 640px) 50vw, 300px"
                    />
                  </div>
                  <div className="flex flex-col justify-center border-l border-l-[#e5e7eb] bg-white p-6">
                    <div className="border-l-[3px] border-l-accent pl-4">
                      <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>{t.desc}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <KomarnitsiKalkulator />

      {/* Available colors */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white px-8 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
            <h3 className="text-base font-semibold text-[#1e2a3a]">Налични цветове</h3>
            <div className="mt-3 flex flex-wrap justify-start gap-x-4 gap-y-4 pt-6 sm:gap-x-5 sm:gap-y-4">
              {[
                { label: "бял", swatchClass: "bg-[#FFFFFF] border-slate-200/90" },
                { label: "златен дъб", swatchClass: "bg-[#C4A35A]" },
                { label: "орех", swatchClass: "bg-[#7B4F2E]" },
                { label: "тъмен дъб", swatchClass: "bg-[#3B2314]" },
                { label: "махагон", swatchClass: "bg-[#6B1A1A]" },
                { label: "антрацитно сиво", swatchClass: "bg-[#4A4F55]" },
              ].map((c) => (
                <div key={c.label} className="group flex w-[108px] flex-col items-center gap-2.5 text-center">
                  <div
                    className={`h-[56px] w-[56px] rounded-[12px] border border-slate-200/90 shadow-[0_3px_10px_rgba(15,23,42,0.10)] ring-1 ring-slate-900/[0.04] transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.02] group-hover:shadow-[0_8px_16px_rgba(15,23,42,0.14)] ${c.swatchClass}`}
                    aria-hidden
                  />
                  <span className="text-[13px] font-semibold leading-tight tracking-[0.01em] text-slate-800">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Repair — static & hinge */}
      <section className="border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Ремонт на статични и на панти комарници
          </SectionHeading>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PvcInfoBox title="Смяна на мрежа" tone="teal">
              <p>10 €/кв.м. – 19.56 лв./кв.м.</p>
              <p className="mt-1">плюс 10 €/бр. – 19.56 лв./бр.</p>
            </PvcInfoBox>
            <PvcInfoBox title="Смяна на части и уплътнение" tone="amber">
              <p>Смяна на части (панта, шнапер, дръжка, магнит, сглобка):</p>
              <p className="mt-1 font-semibold">1 €/бр. – 1.96 лв./бр.</p>
              <p className="mt-2">Смяна на гумено уплътнение:</p>
              <p className="mt-1 font-semibold">1.5 €/бр. – 2.93 лв./бр.</p>
            </PvcInfoBox>
            <PvcInfoBox title="Вземане и връщане" tone="slate">
              <p>Вземане: 20 € – 39.12 лв. за цялата поръчка</p>
              <p className="mt-2">Връщане: 20 € – 39.12 лв. за цялата поръчка</p>
            </PvcInfoBox>
          </div>
        </div>
      </section>

      {/* Repair — roller price table + notes */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Ремонт на ролетни комарници
          </SectionHeading>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Цени за смяна на мрежа на вертикални ролетни комарници с ДДС.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200/80 shadow-sm">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="whitespace-nowrap border-b border-r border-slate-200 px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Височина \ Ширина
                  </th>
                  {ROLLER_WIDTHS.map((w) => (
                    <th
                      key={w}
                      className="border-b border-r border-slate-200 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 last:border-r-0"
                    >
                      {w} мм.
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-slate-50/60">
                  <td className="whitespace-nowrap border-b border-r border-slate-200 px-3 py-3 text-xs font-semibold text-slate-700">
                    до 1600 мм.
                  </td>
                  {UNDER_EUR.map((eur, i) => (
                    <td
                      key={i}
                      className="border-b border-r border-slate-200 px-3 py-2.5 text-center tabular-nums last:border-r-0"
                    >
                      <span className="block font-semibold text-slate-900">{eur} €</span>
                      <span className="block text-xs text-slate-500">{fmtBgn(eur)} лв.</span>
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="whitespace-nowrap border-r border-slate-200 px-3 py-3 text-xs font-semibold text-slate-700">
                    над 1600 мм.
                  </td>
                  {OVER_EUR.map((eur, i) => (
                    <td
                      key={i}
                      className="border-r border-slate-200 px-3 py-2.5 text-center tabular-nums last:border-r-0"
                    >
                      <span className="block font-semibold text-slate-900">{eur} €</span>
                      <span className="block text-xs text-slate-500">{fmtBgn(eur)} лв.</span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5 sm:p-6">
            <h3 className="text-base font-semibold text-slate-900">Допълнителни условия</h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
              <li className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <span>Вземане на комарници от адрес в София</span>
                <span className="font-semibold tabular-nums text-slate-900">20 € – 39.12 лв. за цялата поръчка</span>
              </li>
              <li className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <span>Доставка на комарници в София</span>
                <span className="font-semibold tabular-nums text-slate-900">20 € – 39.12 лв. за цялата поръчка</span>
              </li>
              <li className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <span>Монтаж</span>
                <span className="font-semibold tabular-nums text-slate-900">10 €/бр. – 19.56 лв./бр.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900/90">Забележки</h3>
            <ul className="mt-3 list-none space-y-3 text-sm italic leading-relaxed text-slate-800 sm:text-base">
              <li>*Транспортът е безплатен в границите на гр. София при поръчка на комарници</li>
              <li>
                *Извън рамките на гр. София таксата за транспорт е 0.60 €/км. (1.17 лв./км.). Разстоянието се
                измерва от метростанция СЕРДИКА.
              </li>
            </ul>
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
