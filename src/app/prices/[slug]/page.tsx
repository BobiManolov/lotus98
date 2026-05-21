import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCT_CATEGORY_IMAGE_FALLBACK, PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";
import { getPricesCategoryDetail } from "@/content/pricesPage";
import { PRODUCT_CATEGORIES, SITE } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  /** Dedicated pages own custom UIs for PVC and aluminum pricing */
  return PRODUCT_CATEGORIES.filter((c) => c.slug !== "pvc-dograma" && c.slug !== "al-dograma").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getPricesCategoryDetail(slug);
  if (!detail) return { title: "Цени" };
  return {
    title: `${detail.title} — цени`,
    description: `${detail.heroDescription} — ${SITE.name}, София.`,
  };
}

export default async function PricesCategoryPage({ params }: Props) {
  const { slug } = await params;
  const detail = getPricesCategoryDetail(slug);
  if (!detail) notFound();

  const heroSrc = PRODUCT_CATEGORY_IMAGES[detail.slug] ?? PRODUCT_CATEGORY_IMAGE_FALLBACK;

  return (
    <>
      <header className="relative overflow-hidden border-b border-slate-200/90">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={heroSrc}
            alt=""
            fill
            className="object-cover brightness-[0.88] contrast-[1.06] saturate-[0.9]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(15,23,42,0.35)_45%,rgba(15,23,42,0.44)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[260px] max-w-6xl items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-9 md:min-h-[290px] lg:min-h-[310px]">
          <div className="relative w-full max-w-3xl">
            <div
              className="pointer-events-none absolute -inset-x-3 -inset-y-3 rounded-[1.4rem] bg-[radial-gradient(ellipse_88%_115%_at_50%_35%,rgba(2,6,23,0.54)_0%,rgba(15,23,42,0.25)_48%,rgba(15,23,42,0.1)_68%,transparent_82%)] sm:-inset-x-4 sm:-inset-y-4 sm:rounded-3xl"
              aria-hidden
            />
            <SectionHeading
              as="h1"
              align="center"
              titleClassName="relative text-[1.72rem] font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgb(0_0_0/_0.42)] sm:text-[2.05rem]"
            >
              {detail.title} — цени
            </SectionHeading>
            <p className="relative mx-auto mt-2.5 max-w-2xl text-[13px] font-medium leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgb(0_0_0/_0.36)] sm:text-[15px]">
              {detail.heroDescription}
            </p>
            <div className="relative mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-2.5">
              <Link
                href="/kontakti"
                className="inline-flex min-w-[156px] items-center justify-center rounded-full bg-brand-800 px-4.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Поискайте оферта
              </Link>
              <a
                href="tel:+359894724164"
                className="inline-flex min-w-[122px] items-center justify-center rounded-full border border-white/55 bg-white/12 px-4.5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/80 hover:bg-white/20"
              >
                Обади се
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="flex min-h-[calc(100dvh-var(--site-header-h)-310px)] items-center justify-center px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <span
            className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-900 text-3xl text-white shadow-sm ring-1 ring-brand-900/20"
            aria-hidden
          >
            🖼️
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Страницата е в процес на изграждане
          </h2>
          <p className="mt-4 text-lg text-muted">
            Очаквайте скоро подробна информация и цени.
          </p>
          <Link
            href="/prices"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          >
            Към всички категории цени
          </Link>
        </div>
      </section>
    </>
  );
}
