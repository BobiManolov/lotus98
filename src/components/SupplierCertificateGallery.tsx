"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type SupplierCertificateItem = {
  src: string;
  label: string;
  alt: string;
  /** Intrinsic pixel size for `next/image` (correct aspect ratio for landscape assets). */
  imageWidth?: number;
  imageHeight?: number;
};

export type SupplierCertificateGalleryLayout = "grid" | "twoThenOne";

/** `wide`: centered landscape-friendly width (e.g. OHIM certificate). `narrow`: one column width, portrait-friendly. */
export type SecondRowWidthMode = "wide" | "narrow";

const HALF_COL_SIZES = "(max-width: 1024px) 100vw, calc((min(72rem,100vw) - 3rem) / 2)";
const WIDE_CENTER_SIZES = "(max-width: 1024px) 100vw, min(52rem, calc(100vw - 2rem))";
/** Matches `lg:grid-cols-2` + `lg:gap-8` sibling column width */
const SECOND_ROW_NARROW_WRAP = "w-full min-w-0 max-w-full lg:max-w-[calc((100%-2rem)/2)]";
const SECOND_ROW_WIDE_WRAP = "w-full min-w-0 max-w-4xl xl:max-w-[52rem]";

function lightboxDimensions(item: SupplierCertificateItem) {
  if (item.imageWidth != null && item.imageHeight != null) {
    const maxSide = 2400;
    const s = maxSide / Math.max(item.imageWidth, item.imageHeight);
    return {
      w: Math.max(1, Math.round(item.imageWidth * s)),
      h: Math.max(1, Math.round(item.imageHeight * s)),
    };
  }
  return { w: 1800, h: 2400 };
}

function LightboxImage({ item, onClose }: { item: SupplierCertificateItem; onClose: () => void }) {
  const { w, h } = lightboxDimensions(item);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        Затвори
      </button>
      <div
        className="max-h-[90vh] max-w-[min(96vw,56rem)] overflow-auto rounded-lg bg-white p-2 shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={item.src} alt={item.alt} width={w} height={h} className="h-auto w-full object-contain" sizes="96vw" priority />
      </div>
    </div>
  );
}

function CertificatePreviewCard({
  item,
  index,
  onOpen,
  sizes,
}: {
  item: SupplierCertificateItem;
  index: number;
  onOpen: (i: number) => void;
  sizes: string;
}) {
  return (
    <figure className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.04]">
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40"
      >
        <span className="sr-only">Отвори по-голям изглед: {item.label}</span>
        <div className="flex w-full items-center justify-center bg-slate-50/35 px-2 py-2 sm:px-3 sm:py-3">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.imageWidth ?? 1200}
            height={item.imageHeight ?? 1600}
            className="h-auto max-h-[min(72vh,820px)] w-auto max-w-full object-contain transition-opacity duration-200 group-hover:opacity-92"
            sizes={sizes}
          />
        </div>
      </button>
      <figcaption className="border-t border-slate-100 px-3 py-2.5 text-center text-sm font-semibold text-slate-800 sm:px-4 sm:py-3">
        {item.label}
      </figcaption>
    </figure>
  );
}

export function SupplierCertificateGallery({
  items,
  layout = "grid",
  secondRowWidth = "wide",
}: {
  items: readonly SupplierCertificateItem[];
  layout?: SupplierCertificateGalleryLayout;
  secondRowWidth?: SecondRowWidthMode;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  useEffect(() => {
    if (active === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const useTwoThenOne = layout === "twoThenOne" && items.length >= 3;

  return (
    <>
      {useTwoThenOne ? (
        <div className="flex flex-col gap-6 sm:gap-7 lg:gap-8">
          <ul className="grid grid-cols-1 items-start gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-8">
            <li className="min-w-0">
              <CertificatePreviewCard item={items[0]} index={0} onOpen={setActive} sizes={HALF_COL_SIZES} />
            </li>
            <li className="min-w-0">
              <CertificatePreviewCard item={items[1]} index={1} onOpen={setActive} sizes={HALF_COL_SIZES} />
            </li>
          </ul>
          <div className="flex w-full justify-center">
            <div className={secondRowWidth === "narrow" ? SECOND_ROW_NARROW_WRAP : SECOND_ROW_WIDE_WRAP}>
              <CertificatePreviewCard
                item={items[2]}
                index={2}
                onOpen={setActive}
                sizes={secondRowWidth === "narrow" ? HALF_COL_SIZES : WIDE_CENTER_SIZES}
              />
            </div>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 items-start gap-6 sm:gap-7 lg:grid-cols-2 lg:gap-8">
          {items.map((item, i) => (
            <li key={item.src} className="min-w-0">
              <CertificatePreviewCard item={item} index={i} onOpen={setActive} sizes={HALF_COL_SIZES} />
            </li>
          ))}
        </ul>
      )}

      {active !== null ? (
        <LightboxImage item={items[active]} onClose={close} />
      ) : null}
    </>
  );
}
