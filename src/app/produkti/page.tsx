import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCatalogCard } from "@/components/ProductCatalogCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PRODUCT_PAGE_CARD_DATA, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Продукти",
  description: `Продукти от ${SITE.name}: PVC и алуминиева дограма, комарници, первази, щори, стъклопакети.`,
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--background)] via-white to-slate-50/80 pb-14 pt-16 sm:pb-16 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="max-w-3xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            Каталог на продуктите
          </SectionHeading>
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7">
            {PRODUCT_PAGE_CARD_DATA.map((p) => (
              <ProductCatalogCard
                key={p.slug}
                item={{ slug: p.slug, title: p.title, short: p.short, detail: p.detail, href: p.href }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-[0_10px_40px_-20px_rgba(15,23,42,0.24)] ring-1 ring-slate-900/[0.03] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_24px_56px_-24px_rgba(15,23,42,0.28)]">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative grid min-h-[240px] grid-cols-2 grid-rows-2 overflow-hidden sm:min-h-[300px]">
                <div className="relative col-span-2 row-span-1">
                  <Image
                    src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=82"
                    alt="Реализиран проект с PVC дограма и интериор"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=82"
                    alt="Фасада с модерни прозорци"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.035]"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1000&q=82"
                    alt="Интериор с нови прозорци и естествена светлина"
                    fill
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.035]"
                    sizes="(max-width: 1024px) 50vw, 20vw"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-900/10 to-transparent"
                  aria-hidden
                />
              </div>

              <div className="relative flex items-center">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-slate-50/90"
                  aria-hidden
                />
                <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
                  <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.8rem]">
                    Нашите проекти
                  </SectionHeading>
                  <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">
                    Разгледайте реализирани обекти и вижте как сме помогнали на нашите клиенти да преобразят домовете си
                  </p>
                  <Link
                    href="/galeriya"
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition-[background-color,transform,box-shadow] duration-300 hover:bg-brand-700 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
                  >
                    Виж проектите →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
