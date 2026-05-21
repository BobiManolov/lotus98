import Image from "next/image";
import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { HomeServicesProcess } from "@/components/HomeServicesProcess";
import { HomeTrustStatement } from "@/components/HomeTrustStatement";
import { ProductCategoryCard } from "@/components/ProductCategoryCard";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import { SectionTitle } from "@/components/SectionTitle";
import {
  MONTAGE_TIMING,
  PRODUCT_CATEGORIES,
  WHY_US,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col bg-brand-900">
        <HomeHero />
      </div>

      <HomeTrustStatement />

      <section className="relative z-10 overflow-hidden bg-gradient-to-b from-[var(--background)] via-white to-slate-50/80 pt-20 pb-20 sm:pt-24 sm:pb-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="start"
            titleClassName="max-w-4xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]"
          >
            Нашите продукти
          </SectionHeading>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
            {PRODUCT_CATEGORIES.map((p) => (
              <ProductCategoryCard key={p.slug} category={p} />
            ))}
          </div>
        </div>
      </section>

      <HomeServicesProcess />

      <section className="border-y border-slate-200 bg-gradient-to-b from-white to-slate-50/60 py-10 sm:py-11">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24">
            <div className="order-1 flex w-full max-w-xl shrink-0 flex-col text-left">
              <SectionHeading
                align="start"
                titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.65rem] sm:leading-snug md:text-[1.85rem] lg:text-3xl"
              >
                Срок за монтаж
              </SectionHeading>

              <ul className={`flex list-none flex-col gap-4 p-0 ${sectionAfterHeadingSpacing}`} role="list">
                {MONTAGE_TIMING.detail.map((line) => (
                  <li key={line} className="flex gap-2.5 text-base leading-snug text-slate-600 sm:text-[1.0625rem] sm:leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span className="min-w-0">{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-row flex-wrap items-center justify-start gap-3 sm:mt-7 md:flex-nowrap md:gap-4">
                <Link
                  href="/prices"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-800 px-7 py-3 text-[0.9375rem] font-semibold tracking-wide text-white shadow-sm shadow-brand-900/20 transition-all duration-300 ease-out hover:bg-brand-900 hover:shadow-md hover:shadow-brand-900/25 sm:px-8 sm:py-3.5 sm:text-base"
                >
                  Актуални цени
                </Link>
              </div>
            </div>

            <div className="order-2 flex min-h-0 min-w-0 flex-1 justify-end lg:pt-0">
              <div className="relative aspect-[4/3] w-full max-w-full min-w-0 overflow-hidden rounded-xl shadow-md ring-1 ring-slate-900/5 sm:aspect-[5/4] sm:max-w-lg lg:ml-8 lg:aspect-[4/3] lg:max-w-xl xl:ml-12">
                <Image
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80"
                  alt="Монтаж и измерване на обект"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, min(36rem, 50vw)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-x-16 xl:gap-x-20 2xl:gap-x-24">
            <div className="order-1 flex w-full min-h-0 min-w-0 items-start justify-start lg:flex-1 lg:pt-0">
              <div className="relative aspect-[4/3] w-full max-w-full min-w-0 overflow-hidden rounded-xl shadow-md ring-1 ring-slate-900/5 sm:aspect-[5/4] sm:max-w-xl lg:mr-8 lg:-translate-y-2 lg:aspect-[4/3] lg:max-w-2xl xl:mr-12 xl:-translate-y-2.5">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                  alt="Модерни прозорци и интериор"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, min(42rem, 58vw)"
                />
              </div>
            </div>
            <div className="order-2 flex w-full max-w-lg shrink-0 flex-col text-left">
              <SectionTitle
                title={WHY_US.heading}
                description={WHY_US.intro}
                descriptionClassName="mt-3 max-w-2xl text-base leading-relaxed text-muted"
              />
              <ul className="mt-7 space-y-5 sm:mt-8 sm:space-y-6" role="list">
                {WHY_US.advantages.map((a) => (
                  <li key={a.title} className="flex gap-3.5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{a.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
