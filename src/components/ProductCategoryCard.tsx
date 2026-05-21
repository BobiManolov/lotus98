import Image from "next/image";
import Link from "next/link";
import { PRODUCT_CATEGORY_IMAGE_FALLBACK, PRODUCT_CATEGORY_IMAGES } from "@/content/productCategoryImages";

type Category = {
  slug: string;
  title: string;
  short: string;
  href: string;
};

const easePremium = "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]";

export function ProductCategoryCard({
  category,
  linkPurpose = "products",
}: {
  category: Category;
  linkPurpose?: "products" | "prices";
}) {
  const src = PRODUCT_CATEGORY_IMAGES[category.slug] ?? PRODUCT_CATEGORY_IMAGE_FALLBACK;
  const ariaLabel =
    linkPurpose === "prices" ? `${category.title} — ориентировъчни цени` : `${category.title} — към продуктите`;

  return (
    <Link
      href={category.href}
      aria-label={ariaLabel}
      className={[
        "group/card relative block overflow-hidden rounded-3xl bg-slate-200",
        "shadow-[0_4px_28px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80",
        "outline-none transition-[transform,box-shadow,ring-color] duration-500",
        easePremium,
        "focus-visible:ring-2 focus-visible:ring-accent/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "motion-safe:hover:-translate-y-1.5",
        "motion-safe:hover:shadow-[0_28px_56px_-16px_rgba(15,23,42,0.22),0_12px_24px_-12px_rgba(15,23,42,0.12)]",
        "motion-safe:hover:ring-slate-300/90",
      ].join(" ")}
    >
      <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden sm:min-h-[300px] lg:aspect-[4/5] lg:min-h-[340px]">
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
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/55 via-black/20 to-transparent"
          aria-hidden
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 pb-5 pt-12 sm:px-6 sm:pb-6 sm:pt-14 lg:px-8 lg:pb-7">
          <h3
            className={[
              "text-balance text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-white",
              "drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-2xl sm:leading-tight",
              "transition-transform duration-500",
              easePremium,
              "translate-y-1 motion-safe:group-hover/card:translate-y-0",
            ].join(" ")}
          >
            {category.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
