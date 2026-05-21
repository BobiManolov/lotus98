import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { PvcInfoBox } from "@/components/prices/PvcInfoBox";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { SITE } from "@/content/site";

const HERO_IMAGE = PRODUCT_CATEGORY_IMAGES["pervazi"];
const EUR_BGN = 1.956;
const fmtBgn = (eur: number) => (eur * EUR_BGN).toFixed(2);

// ── Price data ────────────────────────────────────────────────────────────────

const PVC_WIDTHS = ["до 190 мм.", "200 мм.", "250 мм.", "300 мм."];
const PVC_ROWS = [
  { label: "Бял цвят", eurs: [13, 13, 15, 19] },
  { label: "Дървесен цвят", eurs: [20, 20, 24, 28] },
];

const AL_WIDTHS = ["100 мм.", "150 мм.", "200 мм.", "250 мм."];
const AL_ROWS = [
  { label: "Бял цвят", eurs: [9, 13, 16, 23] },
  { label: "Дървесен цвят", eurs: [12, 17, 22, 30] },
];

// ── Shared sub-components ─────────────────────────────────────────────────────


function PriceTable({ widths, rows, headerBg = "slate" }: { widths: string[]; rows: { label: string; eurs: number[] }[]; headerBg?: "slate" | "white" }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className={headerBg === "white" ? "bg-white" : "bg-slate-50"}>
            <th className="whitespace-nowrap border-b border-r border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Ширина
            </th>
            {widths.map((w) => (
              <th
                key={w}
                className="border-b border-r border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 last:border-r-0"
              >
                {w}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={row.label}
              className={ri < rows.length - 1 ? "border-b border-slate-200" : ""}
            >
              <td className="whitespace-nowrap border-r border-slate-200 px-4 py-3 text-xs font-semibold text-slate-700">
                {row.label}
              </td>
              {row.eurs.map((e, i) => (
                <td key={i} className="border-r border-slate-200 px-4 py-2.5 text-center tabular-nums last:border-r-0">
                  <span className="block font-semibold text-slate-900">{e} €/м.</span>
                  <span className="block text-xs text-slate-500">{fmtBgn(e)} лв./м.</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Първази и козирки — цени",
  description: `Ориентировъчни цени за PVC и алуминиеви подпрозоречни поли и козирки в София — ${SITE.name}.`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PervaziKozirkiPricesPage() {
  return (
    <>
      <InnerPageHero
        title="Първази и козирки — Цени"
        subtitle="Ориентировъчни стандартни цени за София. Крайната оферта зависи от ширина, материал и монтаж."
        imageSrc={HERO_IMAGE}
      />

      {/* Product 1 — PVC interior window sill */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Вътрешна PVC подпрозоречна пола
          </SectionHeading>

          <article className="mt-8 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-[2fr_3fr]">
              <div className="relative h-full overflow-hidden bg-slate-50">
                <Image
                  src="/images/pervazi/Вътрешна алуминиева подпрозоречна пола .jpg"
                  alt="Вътрешна PVC подпрозоречна пола"
                  fill
                  loading="lazy"
                  className="object-fill"
                  sizes="(max-width: 1280px) 40vw, 400px"
                />
              </div>
              <div className="flex flex-col justify-center border-l border-l-[#e5e7eb] bg-white p-6 sm:p-8">
                <div className="border-l-[3px] border-l-accent pl-4">
                  <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Вътрешните PVC поли предпазват стената от прах и конденз.{" "}
                    <span className="font-semibold">Не могат да се монтират на по-късен етап</span> — рамката трябва да
                    стъпи върху полата по време на монтажа на дограмата.
                  </p>
                  <p className="mt-3 text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Изработват се от PVC профили с ширина <span className="font-semibold">200 мм., 250 мм. или 300 мм.</span>{" "}
                    Ефективната ширина се намалява с 60–70 мм., скрити под рамката на прозореца. Поли под 200 мм. се режат
                    надлъжно от 200 мм. пола. Дебелина при всички ширини: <span className="font-semibold">20 мм.</span>
                  </p>
                  <p className="mt-3 text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Полата разполага с горен гребен, който влиза между ребрата на рамката за по-добро уплътнение.
                  </p>
                  <p className="mt-3 text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    При монтаж на PVC пола челно към дограмата може да е по-удачно полата да се изработи от камък — обсъдете с нас при запитване.
                  </p>
                  <p className="mt-4 text-[13px] font-bold uppercase tracking-wide text-red-600">
                    НЕ МОЖЕМ ДА МОНТИРАМЕ ВЪТРЕШНИ PVC ПОЛИ НА МОНТИРАНА ДОГРАМА.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <PriceTable widths={PVC_WIDTHS} rows={PVC_ROWS} />

          <p className="mt-4 text-sm text-slate-600">
            * Цената на комплект капачки за PVC перваз е <span className="font-semibold">5 € / 9.78 лв.</span>
          </p>
        </div>
      </section>

      {/* Product 2 — Aluminium exterior window sill */}
      <section className="border-t border-slate-200/80 bg-[var(--background)] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Външна алуминиева подпрозоречна пола
          </SectionHeading>

          <article className="mt-8 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-[2fr_3fr]">
              <div className="h-72 overflow-hidden bg-white">
                <Image
                  src="/images/pervazi/Външна алуминиева подпрозоречна пола .jpg.webp"
                  alt="Външна алуминиева подпрозоречна пола"
                  width={500}
                  height={288}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center border-l border-l-[#e5e7eb] bg-white p-6 sm:p-8">
                <div className="border-l-[3px] border-l-accent pl-4">
                  <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Изработват се от алуминиев профил с ширина{" "}
                    <span className="font-semibold">100, 150, 200 и 250 мм.</span> Предпазват стената от дъжд и сняг.
                    Могат да се монтират на по-късен етап.
                  </p>
                  <p className="mt-3 text-[13px] italic text-slate-500">Нямаме капачки за алуминиеви поли.</p>
                </div>
              </div>
            </div>
          </article>

          <PriceTable widths={AL_WIDTHS} rows={AL_ROWS} />
        </div>
      </section>

      {/* Product 3 — Aluminium canopy */}
      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="start"
            titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Алуминиева козирка
          </SectionHeading>

          <article className="mt-8 overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-[2fr_3fr]">
              <div className="h-72 overflow-hidden bg-slate-50">
                <Image
                  src="/images/pervazi/Алуминиеви козирки.webp"
                  alt="Алуминиева козирка"
                  width={500}
                  height={288}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center border-l border-l-[#e5e7eb] bg-white p-6 sm:p-8">
                <div className="border-l-[3px] border-l-accent pl-4">
                  <p className="text-[14px] text-[#374151]" style={{ lineHeight: 1.7 }}>
                    Алуминиеви козирки с ширини <span className="font-semibold text-slate-900">110, 160, 220 и 250 мм.</span> Подходящи за тераси или когато прозорецът е монтиран във външната страна на стената. Монтажът на по-късен етап изисква алпинисти и не е препоръчително.
                  </p>
                  <p className="mt-4 text-[13px] font-bold uppercase tracking-wide text-red-600">
                    НЕ МОЖЕМ ДА МОНТИРАМЕ КОЗИРКИ НА МОНТИРАНА ДОГРАМА.
                  </p>
                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[13px] text-slate-600">
                      За цени на козирки —{" "}
                      <Link href="/kontakti" className="font-semibold text-accent hover:underline">
                        свържете се с нас
                      </Link>
                      .
                    </p>
                  </div>
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

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PvcInfoBox title="Монтаж на алуминиеви поли" tone="teal">
              <p>Снемане на размери: <span className="font-semibold">20 € / 39.12 лв.</span></p>
              <p className="mt-2">Транспорт в София:</p>
              <p className="mt-1 font-semibold">20 € / 39.12 лв. за цялата поръчка</p>
              <p className="mt-2">Монтаж: <span className="font-semibold">10 €/л.м. / 19.56 лв./л.м.</span></p>
            </PvcInfoBox>
            <PvcInfoBox title="Допълнителни услуги" tone="amber">
              <p>Рязане под 45°: <span className="font-semibold">30 € / 58.67 лв.</span></p>
              <p className="mt-2">Сваляне и монтаж на стъклопакет до 1.5 кв.м.: <span className="font-semibold">20 €/бр. / 39.12 лв./бр.</span></p>
              <p className="mt-2">Сваляне и монтаж на стъклопакет над 1.5 кв.м.: <span className="font-semibold">40 €/бр. / 78.23 лв./бр.</span></p>
            </PvcInfoBox>
            <PvcInfoBox title="Поръчки без монтаж" tone="slate">
              <p>
                Вземате от:{" "}
                <span className="font-semibold">Стопански двор, Горни Лозен</span>
              </p>
              <p className="mt-2">
                Позвънете за наличност:{" "}
                <a href="tel:0899859276" className="font-semibold hover:underline">
                  0899 859 276
                </a>
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Козирки на монтирана дограма се поставят от алпинисти.
              </p>
            </PvcInfoBox>
          </div>

          <div className="mt-6 rounded-2xl border border-red-200/80 bg-red-50/70 px-6 py-5 sm:px-8 sm:py-6">
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
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-red-700">
                  В МОМЕНТА НЕ ПРЕДЛАГАМЕ МОНТИРАНЕ НА ПОДПРОЗОРЕЧНИ ПОЛИ НА ДОГРАМА НЕМОНТИРАНА ОТ НАС!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white px-8 py-6 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
            <h3 className="text-base font-semibold text-[#1e2a3a]">Налични цветове за PVC поли</h3>
            <div className="mt-3 flex flex-wrap justify-start gap-x-4 gap-y-4 pt-4 sm:gap-x-5 sm:gap-y-4">
              {[
                { label: "бял", swatchClass: "bg-[#FFFFFF] border-slate-200/90" },
                { label: "златен дъб", swatchClass: "bg-[#C4A35A]" },
                { label: "орех", swatchClass: "bg-[#8B5E3C]" },
                { label: "тъмен дъб", swatchClass: "bg-[#3B1F0E]" },
                { label: "махагон", swatchClass: "bg-[#7B1D1D]" },
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

          <div className="mt-6 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 sm:p-7">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-amber-900/90">Забележки</h3>
            <ul className="mt-3 list-none space-y-3 text-sm italic leading-relaxed text-slate-800 sm:text-base">
              <li>* Транспортът е безплатен в границите на гр. София при поръчка с монтаж.</li>
              <li>
                * Извън рамките на гр. София таксата за транспорт е 0.60 €/км. (1.17 лв./км.). Разстоянието се измерва
                от метростанция СЕРДИКА.
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

      <CtaStrip variant="services" sectionClassName="bg-white py-14 sm:py-16" />
    </>
  );
}
