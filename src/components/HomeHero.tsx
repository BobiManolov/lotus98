import Image from "next/image";
import Link from "next/link";
import { HERO, SITE } from "@/content/site";

export function HomeHero() {
  return (
    <section
      className="relative isolate flex h-[440px] max-h-[440px] w-full max-w-full shrink-0 flex-col overflow-hidden bg-transparent"
      aria-labelledby="hero-brand"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full min-w-full bg-brand-900"
        aria-hidden
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 min-h-full min-w-full bg-black/45" />
        <div className="absolute inset-0 min-h-full min-w-full bg-gradient-to-b from-black/35 via-black/25 to-black/52" />
        <div className="absolute inset-0 min-h-full min-w-full bg-[radial-gradient(100%_65%_at_20%_15%,rgba(14,162,201,0.14),transparent_60%)]" />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1
            id="hero-brand"
            className="text-[48px] font-bold leading-[1.06] tracking-tight text-white"
          >
            Качествена дограма директно от производител
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-[15px] font-normal leading-relaxed text-white/85 sm:text-[17px]">
            Алуминиева и PVC дограма, комарници и щори. Производство, доставка и монтаж в София.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={HERO.secondaryCta.href}
              className="inline-flex min-h-11 min-w-[10.5rem] items-center justify-center rounded-md bg-brand-800 px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-brand-900"
            >
              Цени
            </Link>
            <Link
              href={HERO.primaryCta.href}
              className="inline-flex min-h-11 min-w-[10.5rem] items-center justify-center rounded-md border-2 border-white bg-transparent px-5 py-2.5 text-[15px] font-semibold text-white transition hover:border-white/85 hover:bg-white/10"
            >
              Поискайте оферта
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/15 bg-slate-900/35 px-4 py-3 backdrop-blur-[2px] sm:px-6 sm:py-3.5">
        <p className="mx-auto max-w-6xl text-center text-xs font-normal leading-relaxed text-white/85 sm:text-sm">
          ✓ Безплатна доставка в София · ✓ Безплатен оглед при поръчка · ✓ Отговор в рамките на деня · ✓ Гаранция от
          производител
        </p>
      </div>
    </section>
  );
}
