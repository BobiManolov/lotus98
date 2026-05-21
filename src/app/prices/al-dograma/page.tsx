import type { Metadata } from "next";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { AluminumDoorDiagram } from "@/components/prices/AluminumDoorDiagram";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ALUMINUM_COLOR_OPTIONS,
  ALUMINUM_DOORS_ADDITIONAL_CONDITIONS,
  ALUMINUM_DOORS_EXTRA_PRICING,
  ALUMINUM_DOORS_FILLINGS,
  ALUMINUM_DOORS_INSTALLATION_NOTE,
  ALUMINUM_DOORS_INTRO,
  ALUMINUM_DOORS_MATERIAL_NOTE,
  ALUMINUM_DOORS_SIZE_NOTES,
  ALUMINUM_DOORS_STANDARD_CONFIGURATION,
  ALUMINUM_DOORS_THRESHOLD_OPTIONS,
  ALUMINUM_DOORS_TRANSPORT_NOTES,
  ALUMINUM_DOOR_PRICE_CARDS,
  ALUMINUM_HERO_IMAGE,
  ALUMINUM_PRICES_SUBTITLE,
  ALUMINUM_PRICES_TITLE,
  DOUBLE_SLIDING_EXPLANATION,
  DOUBLE_SLIDING_PRICE_CARDS,
  FOUR_PANEL_SLIDING_PRICE_CARDS,
  SINGLE_SLIDING_EXPLANATION,
  SINGLE_SLIDING_PRICE_CARDS,
  SLIDING_INSTALLATION_NOTE,
  SLIDING_INTRO,
  SLIDING_TRANSPORT_NOTES,
} from "@/content/aluminumPricesPageData";
import { SITE } from "@/content/site";

const CARD_SECTION_LABEL_CLASS = "text-[13px] font-bold uppercase tracking-wide text-slate-900";
const INFO_CARD_CLASS =
  "rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-6";
const PRICING_CARD_ARTICLE_CLASS =
  "flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow duration-300 hover:shadow-md";

export const metadata: Metadata = {
  title: ALUMINUM_PRICES_TITLE,
  description: `${ALUMINUM_PRICES_SUBTITLE} — ${SITE.name}, София.`,
};

type DoorPriceEntry = {
  label: string;
  withInstall: string;
  withoutInstall: string;
};

type SlidingPriceEntry = {
  label: string;
  price: string;
};

function SlidingSystemDiagram({ variant, size }: { variant: "single" | "double" | "four"; size: string }) {
  const [widthLabel = "", heightLabel = ""] = size.split(" x ");
  const showSingle2000HeightLabel = variant === "single" && heightLabel === "2000";
  const leftHeightText = showSingle2000HeightLabel ? "2000" : heightLabel;
  const leftHeightX = -6;

  return (
    <svg viewBox="-24 0 276 166" className="mx-auto block h-[126px] w-auto overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sliding-active-pane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#edf7fd" />
          <stop offset="100%" stopColor="#cee4f2" />
        </linearGradient>
        <linearGradient id="sliding-passive-pane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f3fb" />
          <stop offset="100%" stopColor="#c6deed" />
        </linearGradient>
      </defs>

      <rect x="18" y="14" width="184" height="110" rx="0" fill="#ffffff" stroke="#4b4b4b" strokeWidth="1.25" />
      <rect x="24" y="20" width="172" height="98" rx="0" fill="#fafafa" stroke="#6d6d6d" strokeWidth="0.95" />

      {variant === "single" ? (
        <>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-[12px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2.4px_2.8px_rgba(15,23,42,0.20))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="24" y="20" width="56" height="98" rx="0" fill="url(#sliding-active-pane)" stroke="#676767" strokeWidth="0.95" />
            <path
              d="M 40 69 H 60 M 54 63 L 60 69 L 54 75"
              fill="none"
              stroke="#3d3d3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-85 transition-opacity duration-[320ms] ease-out group-hover:opacity-100"
            />
          </g>
          {/* fixed panel is exactly 2x wider than the moving sash (112 vs 56) */}
          <rect
            x="80"
            y="20"
            width="112"
            height="98"
            rx="0"
            fill="url(#sliding-passive-pane)"
            stroke="#676767"
            strokeWidth="0.95"
            className="transition-opacity duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-90"
          />
          <line x1="80" y1="20" x2="80" y2="118" stroke="#5c5c5c" strokeWidth="0.95" />
        </>
      ) : variant === "double" ? (
        <>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:-translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="36" y="20" width="72" height="98" rx="0" fill="url(#sliding-passive-pane)" stroke="#676767" strokeWidth="0.95" />
            <path
              d="M 82 69 H 62 M 68 63 L 62 69 L 68 75"
              fill="none"
              stroke="#3d3d3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-85 transition-opacity duration-[320ms] ease-out group-hover:opacity-100"
            />
          </g>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="108" y="20" width="72" height="98" rx="0" fill="url(#sliding-active-pane)" stroke="#676767" strokeWidth="0.95" />
            <path
              d="M 130 69 H 150 M 144 63 L 150 69 L 144 75"
              fill="none"
              stroke="#3d3d3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-85 transition-opacity duration-[320ms] ease-out group-hover:opacity-100"
            />
          </g>
          <line x1="108" y1="20" x2="108" y2="118" stroke="#5c5c5c" strokeWidth="0.95" />
        </>
      ) : (
        <>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:-translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="24" y="20" width="43" height="98" rx="0" fill="url(#sliding-passive-pane)" stroke="#676767" strokeWidth="0.95" />
          </g>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:-translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="67" y="20" width="43" height="98" rx="0" fill="url(#sliding-active-pane)" stroke="#676767" strokeWidth="0.95" />
            <path
              d="M 67 69 H 56 M 61 63 L 55 69 L 61 75 M 67 69 H 78 M 73 63 L 79 69 L 73 75"
              fill="none"
              stroke="#3d3d3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-85 transition-opacity duration-[320ms] ease-out group-hover:opacity-100"
            />
          </g>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="110" y="20" width="43" height="98" rx="0" fill="url(#sliding-passive-pane)" stroke="#676767" strokeWidth="0.95" />
          </g>
          <g
            className="will-change-transform transition-[transform,filter] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none group-hover:translate-x-[6px] [filter:drop-shadow(0_0.6px_0.8px_rgba(15,23,42,0.10))] group-hover:[filter:drop-shadow(0_2px_2px_rgba(15,23,42,0.18))]"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <rect x="153" y="20" width="43" height="98" rx="0" fill="url(#sliding-active-pane)" stroke="#676767" strokeWidth="0.95" />
            <path
              d="M 153 69 H 142 M 147 63 L 141 69 L 147 75 M 153 69 H 164 M 159 63 L 165 69 L 159 75"
              fill="none"
              stroke="#3d3d3d"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-85 transition-opacity duration-[320ms] ease-out group-hover:opacity-100"
            />
          </g>
          <line x1="67" y1="20" x2="67" y2="118" stroke="#5c5c5c" strokeWidth="0.95" />
          <line x1="110" y1="20" x2="110" y2="118" stroke="#5c5c5c" strokeWidth="0.95" />
          <line x1="153" y1="20" x2="153" y2="118" stroke="#5c5c5c" strokeWidth="0.95" />
        </>
      )}

      <g stroke="#374151" strokeWidth="1.2" fill="none">
        <line x1="18" y1="136" x2="202" y2="136" />
        <line x1="18" y1="131" x2="18" y2="141" />
        <line x1="202" y1="131" x2="202" y2="141" />
        <line x1="8" y1="14" x2="8" y2="124" />
        <line x1="3" y1="14" x2="13" y2="14" />
        <line x1="3" y1="124" x2="13" y2="124" />
      </g>

      <g fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="13.5" fontWeight="700" fill="#111827">
        <text x="110" y="158" textAnchor="middle">
          {widthLabel}
        </text>
        <text
          x={leftHeightX}
          y="69"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${leftHeightX} 69)`}
        >
          {leftHeightText}
        </text>
      </g>
    </svg>
  );
}

/** Renders "X € / Y лв." so each amount stays intact; the row may wrap between € and лв. if space is tight. */
function AluminumDoorPriceParts({ value }: { value: string }) {
  const parts = value.split(/\s*\/\s*/);
  if (parts.length !== 2) {
    return <span className="whitespace-nowrap font-semibold tabular-nums text-slate-800">{value}</span>;
  }
  const [a, b] = parts;
  return (
    <span className="inline-flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-slate-800">
      <span className="whitespace-nowrap font-semibold">{a}</span>
      <span className="font-normal text-slate-400" aria-hidden>
        /
      </span>
      <span className="whitespace-nowrap font-semibold">{b}</span>
    </span>
  );
}

function AluminumDoorPriceCell({ entry }: { entry: DoorPriceEntry }) {
  const rowClass = "min-w-0 text-[13px] leading-snug text-slate-800 sm:text-[14px]";
  const labelClass = "font-normal text-slate-500";

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <p className={rowClass}>
        <span className={labelClass}>с монтаж: </span>
        <AluminumDoorPriceParts value={entry.withInstall} />
      </p>
      <p className={rowClass}>
        <span className={labelClass}>без монтаж: </span>
        <AluminumDoorPriceParts value={entry.withoutInstall} />
      </p>
    </div>
  );
}

function AluminumDoorPriceComparisonTable({ white, color }: { white: DoorPriceEntry[]; color: DoorPriceEntry[] }) {
  const headCell =
    "px-2.5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600 sm:text-[13px]";
  const bodyPad = "px-2.5 py-2 align-middle";

  return (
    <div className="min-w-0">
      <table className="w-full table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[31%]" />
          <col className="w-[31%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-200/90 bg-slate-100">
            <th scope="col" className={headCell}>
              Пълнеж
            </th>
            <th scope="col" className={`${headCell} border-l border-slate-200/80`}>
              Бял цвят
            </th>
            <th scope="col" className={`${headCell} border-l border-slate-200/80`}>
              Цветен
            </th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(even)]:bg-slate-50/55">
          {white.map((w, index) => {
            const c = color.find((row) => row.label === w.label) ?? color[index];
            if (!c) return null;
            return (
              <tr key={w.label} className="border-b border-slate-100/90 last:border-b-0">
                <th
                  scope="row"
                  className={`${bodyPad} min-w-0 whitespace-normal break-words text-center text-[13px] font-medium leading-snug text-slate-900 sm:text-[14px]`}
                >
                  {w.label}
                </th>
                <td className={`${bodyPad} border-l border-slate-100`}>
                  <AluminumDoorPriceCell entry={w} />
                </td>
                <td className={`${bodyPad} border-l border-slate-100`}>
                  <AluminumDoorPriceCell entry={c} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SlidingPriceComparisonTable({ white, color }: { white: SlidingPriceEntry[]; color: SlidingPriceEntry[] }) {
  const headCell =
    "px-2.5 py-2.5 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-600 sm:text-[13px]";
  const bodyPad = "px-2.5 py-2 align-middle";

  return (
    <div className="min-w-0">
      <table className="w-full table-fixed border-collapse text-left">
        <colgroup>
          <col className="w-[38%]" />
          <col className="w-[31%]" />
          <col className="w-[31%]" />
        </colgroup>
        <thead>
          <tr className="border-b border-slate-200/90 bg-slate-100">
            <th scope="col" className={headCell}>
              Пълнеж
            </th>
            <th scope="col" className={`${headCell} border-l border-slate-200/80`}>
              Бял цвят
            </th>
            <th scope="col" className={`${headCell} border-l border-slate-200/80`}>
              Цвят дървесен декор
            </th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-child(even)]:bg-slate-50/55">
          {white.map((w, index) => {
            const c = color.find((row) => row.label === w.label) ?? color[index];
            if (!c) return null;
            return (
              <tr key={w.label} className="border-b border-slate-100/90 last:border-b-0">
                <th
                  scope="row"
                  className={`${bodyPad} min-w-0 whitespace-normal break-words text-center text-[13px] font-medium leading-snug text-slate-900 sm:text-[14px]`}
                >
                  {w.label}
                </th>
                <td className={`${bodyPad} border-l border-slate-100 whitespace-nowrap text-[13px] font-semibold tabular-nums text-slate-900 sm:text-[14px]`}>
                  {w.price}
                </td>
                <td className={`${bodyPad} border-l border-slate-100 whitespace-nowrap text-[13px] font-semibold tabular-nums text-slate-900 sm:text-[14px]`}>
                  {c.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AluminumPricesPage() {
  return (
    <>
      <InnerPageHero title={ALUMINUM_PRICES_TITLE} subtitle={ALUMINUM_PRICES_SUBTITLE} imageSrc={ALUMINUM_HERO_IMAGE} />

      <section id="aluminum-doors" className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Алуминиеви врати
          </SectionHeading>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {ALUMINUM_DOOR_PRICE_CARDS.map((card) => (
              <article key={card.size} className={PRICING_CARD_ARTICLE_CLASS}>
                <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                  <AluminumDoorDiagram widthMm={Number(card.size.split(" x ")[0])} heightMm={Number(card.size.split(" x ")[1])} />
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4 sm:p-5">
                  <AluminumDoorPriceComparisonTable white={card.white as DoorPriceEntry[]} color={card.color as DoorPriceEntry[]} />
                </div>
              </article>
            ))}
          </div>

          <section className="relative left-1/2 right-1/2 mt-10 w-screen -translate-x-1/2 bg-white py-5 sm:py-6">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Допълнителна информация
              </SectionHeading>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02]">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">За алуминиевите врати</h3>
                <div className="mt-3 space-y-2.5 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                  <p>
                    Алуминиевите врати са практично решение за различни пространства. Най-често се използват за бани и тоалетни, но
                    са подходящи и за вътрешни помещения, търговски обекти и други зони.
                  </p>
                  <p>
                    Вратите са българско производство и се изработват по поръчка. Посочените цени са ориентировъчни за
                    най-предлагания модел алуминиева врата.
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02]">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">Материали и конфигурации</h3>
                <p className="mt-3 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">{ALUMINUM_DOORS_MATERIAL_NOTE}</p>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Стандартна окомплектовка</h4>
                    <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                      {ALUMINUM_DOORS_STANDARD_CONFIGURATION.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Видове пълнежи</h4>
                    <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                      {ALUMINUM_DOORS_FILLINGS.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02] lg:col-span-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">Монтаж и размери</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Варианти за праг</h4>
                    <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                      {ALUMINUM_DOORS_THRESHOLD_OPTIONS.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Размери и обработка</h4>
                    <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                      {ALUMINUM_DOORS_SIZE_NOTES.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="sliding-aluminum" className="scroll-mt-24 border-t border-slate-200/80 bg-[var(--background)] py-12 sm:scroll-mt-28 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Плъзгаща се алуминиева дограма
          </SectionHeading>

          <div className="mt-10 space-y-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">1. Единично плъзгане (една релса) с едно крило</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {SINGLE_SLIDING_PRICE_CARDS.map((card) => (
                  <article key={card.size} className={`group h-full ${PRICING_CARD_ARTICLE_CLASS}`}>
                    <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                      <SlidingSystemDiagram variant="single" size={card.size} />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                      <SlidingPriceComparisonTable white={card.white as SlidingPriceEntry[]} color={card.color as SlidingPriceEntry[]} />
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">2. Двойно плъзгане (две релси) с две крила</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {DOUBLE_SLIDING_PRICE_CARDS.map((card) => (
                  <article key={card.size} className={`group h-full ${PRICING_CARD_ARTICLE_CLASS}`}>
                    <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                      <SlidingSystemDiagram variant="double" size={card.size} />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                      <SlidingPriceComparisonTable white={card.white as SlidingPriceEntry[]} color={card.color as SlidingPriceEntry[]} />
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">3. Двойно плъзгане (две релси) с четири крила</h3>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {FOUR_PANEL_SLIDING_PRICE_CARDS.map((card) => (
                  <article key={card.size} className={`group h-full ${PRICING_CARD_ARTICLE_CLASS}`}>
                    <div className="border-b border-slate-100 bg-slate-50/50 p-4">
                      <SlidingSystemDiagram variant="four" size={card.size} />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                      <SlidingPriceComparisonTable white={card.white as SlidingPriceEntry[]} color={card.color as SlidingPriceEntry[]} />
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Допълнителна информация
          </SectionHeading>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02]">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Общи условия</h3>
              <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                <li>• Цените важат за цели конфигурации от студен алуминиев профил с долно водене.</li>
                <li>• Плъзгащите системи не са подходящи за помещения, отопляващи се през цялата зима.</li>
                <li>• Всички системи се изработват по снети или подадени размери.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02]">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Единично плъзгане</h3>
              <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                <li>• Крилото се изработва с размера на отвора и се плъзга по стената върху каса, която е двойно по-широка (една релса).</li>
                <li>• Подходящо решение при липса на място за врата с отваряне на панти.</li>
                <li>• Стената трябва да е в една равнина — по трасето не трябва да има первази, цокли, контакти, ключове, розетки или други препятствия.</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200/70 border-l-4 border-l-sky-500 bg-white p-4 shadow-sm ring-1 ring-slate-900/[0.02] lg:col-span-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Двойно плъзгане</h3>
              <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.45] text-slate-700 sm:text-[14px]">
                <li>• При двойно плъзгане с две крила касата се изработва с размера на отвора и дограмата запълва целия отвор.</li>
                <li>• При четири крила касата също се прави на голямата на отвора.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-[#f8f9fa] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div>
            <h2 className="text-[28px] font-bold tracking-tight text-[#1e2a3a]">Бележки и условия</h2>
            <div className="mt-2 h-0.5 w-20 rounded-full bg-[#2563eb]" aria-hidden />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 px-8 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
              <h3 className="text-base font-semibold text-blue-900/90">{ALUMINUM_DOORS_EXTRA_PRICING.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {[
                  { label: "първаз (перо) 28 мм. – бял цвят", value: "30 € / 58,67 лв." },
                  { label: "първаз (перо) 28 мм. – цветен", value: "40 € / 78,23 лв." },
                  { label: "първаз 50 мм. – бял цвят", value: "50 € / 97,79 лв." },
                  { label: "първаз 50 мм. – цветен", value: "60 € / 117,35 лв." },
                  { label: "WC патрон", value: "+ 10 € / 19,56 лв." },
                ].map((row) => (
                  <li key={row.label} className="flex flex-col gap-0.5 border-b border-slate-200/80 pb-2 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <span className="text-[#4b5563]">{row.label}</span>
                    <span className="shrink-0 tabular-nums text-[#4b5563]">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 px-8 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
              <h3 className="text-base font-semibold text-blue-900/90">Допълнителни условия</h3>
              <div className="mt-4 space-y-2 text-[14px] leading-[1.7] text-[#4b5563]">
                {ALUMINUM_DOORS_ADDITIONAL_CONDITIONS.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
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

          <div className="mt-6">
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 px-8 py-3 shadow-[0_4px_18px_rgba(15,23,42,0.06)]">
              <h3 className="text-base font-semibold text-amber-900/90">Монтаж и транспорт</h3>
              <div className="mt-4 space-y-2 text-[14px] leading-[1.7] text-[#4b5563]">
                <p>
                  Цената с монтаж включва: ДДС, снемане на размери, монтаж, демонтаж на старата дървена дограма, алуминиеви профили,
                  различни видове пълнежи, обков, отстъпки – 7% + 5% за авансово плащане на цялата сума.
                </p>
                <p>Транспортът е безплатен в границите на гр. София при поръчка с монтаж.</p>
                <p>Извън гр. София таксата за транспорт е 0,60 €/км. (1,17 лв./км.), измерено от метростанция СЕРДИКА.</p>
              </div>
            </div>
            <p className="mt-8 text-center">
              <Link href="/prices" className="text-sm font-semibold text-accent transition-colors hover:underline">
                ← Към всички категории цени
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaStrip variant="services" />
    </>
  );
}
