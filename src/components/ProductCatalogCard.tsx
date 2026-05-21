import Image from "next/image";
import Link from "next/link";
import { EXTERNAL } from "@/content/site";
import { PRODUCT_CATEGORY_IMAGE_FALLBACK, PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";

export type ProductCatalogCardData = {
  slug: string;
  title: string;
  short: string;
  detail: string;
  href: string;
};

const easePremium = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

/**
 * Продуктова карта за страницата „Продукти“ — премиум визуал и hover, долен текст върху снимката.
 */
export function ProductCatalogCard({ item }: { item: ProductCatalogCardData }) {
  const src = PRODUCT_CATEGORY_IMAGES[item.slug] ?? PRODUCT_CATEGORY_IMAGE_FALLBACK;
  const calculatorHref =
    item.slug === "pvc-dograma"
      ? EXTERNAL.pvcCalculator
      : item.slug === "komarnitsi"
        ? EXTERNAL.prices
        : null;
  const calculatorLabel =
    item.slug === "pvc-dograma" ? "PVC калкулатор" : item.slug === "komarnitsi" ? "Калкулатор за\nкомарници" : null;
  const calculatorButtonClass =
    "inline-flex min-h-[2.5rem] w-[10.5rem] items-center justify-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-center text-sm font-semibold leading-tight text-slate-800 whitespace-pre-line transition-colors duration-200 hover:border-brand-800 hover:text-brand-800";
  const hasCalculator = calculatorHref && calculatorLabel;

  return (
    <article
      className={[
        "group/card flex flex-col overflow-hidden rounded-3xl bg-white",
        "shadow-[0_4px_28px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80",
        "transition-[transform,box-shadow,ring-color] duration-500",
        easePremium,
        "motion-safe:hover:-translate-y-1.5",
        "motion-safe:hover:shadow-[0_28px_56px_-16px_rgba(15,23,42,0.22),0_12px_24px_-12px_rgba(15,23,42,0.12)]",
        "motion-safe:hover:ring-slate-300/90",
      ].join(" ")}
    >
      <Link
        href={item.href}
        aria-label={`${item.title} — подробна информация`}
        className="relative block min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/55"
      >
        <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden sm:min-h-[300px] lg:aspect-[4/5] lg:min-h-[320px]">
          <Image
            src={src}
            alt=""
            fill
            className={[
              "object-cover will-change-transform",
              "transition-transform duration-[650ms]",
              easePremium,
              "motion-safe:group-hover/card:scale-[1.065]",
            ].join(" ")}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Base read + depth; strengthens on hover */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/28 to-slate-950/[0.07]"
            aria-hidden
          />
          <div
            className={[
              "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent opacity-0",
              "transition-opacity duration-500",
              easePremium,
              "motion-safe:group-hover/card:opacity-100",
            ].join(" ")}
            aria-hidden
          />

          {/* Fixed bottom legibility strip */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/20 to-transparent"
            aria-hidden
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 pb-5 pt-12 sm:px-6 sm:pb-6 sm:pt-14 lg:px-7 lg:pb-7">
            <h2
              className={[
                "text-balance text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-white",
                "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-2xl sm:leading-tight",
                "transition-transform duration-500",
                easePremium,
                "translate-y-1 motion-safe:group-hover/card:translate-y-0",
              ].join(" ")}
            >
              {item.title}
            </h2>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-t border-slate-200/90 bg-white px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">{item.detail}</p>
        <div className="mt-auto w-full pt-4">
          {hasCalculator ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване
                </Link>
              </div>
              <div className="flex w-full items-center justify-between gap-4">
                <a
                  href={calculatorHref}
                  className={calculatorButtonClass}
                >
                  {calculatorLabel}
                </a>
                <Link
                  href={item.href}
                  className="ml-auto inline-flex items-center text-sm font-medium text-brand-800/90 transition-[color,transform] duration-200 hover:text-brand-900 hover:underline motion-safe:hover:translate-x-0.5"
                >
                  Научете повече →
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition-colors duration-200 hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване
                </Link>
              </div>
              <Link
                href={item.href}
                className="ml-auto inline-flex items-center text-sm font-medium text-brand-800/90 transition-[color,transform] duration-200 hover:text-brand-900 hover:underline motion-safe:hover:translate-x-0.5"
              >
                Научете повече →
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
