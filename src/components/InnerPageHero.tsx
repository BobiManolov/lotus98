import type { ReactNode } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

/** Shared hero for inner pages (e.g. Услуги, Цени) — one source for height, spacing, overlay, typography. */
const DEFAULT_IMAGE_SRC =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=82";

const IMAGE_CLASS =
  "object-cover brightness-[0.88] contrast-[1.06] saturate-[0.9]";

const OVERLAY_CLASS =
  "absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(15,23,42,0.35)_45%,rgba(15,23,42,0.44)_100%)]";

const OUTER_CONTENT_CLASS =
  "relative z-10 mx-auto flex min-h-[260px] max-w-6xl items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-9 md:min-h-[290px] lg:min-h-[310px]";

const RADIAL_CLASS =
  "pointer-events-none absolute -inset-x-3 -inset-y-3 rounded-[1.4rem] bg-[radial-gradient(ellipse_88%_115%_at_50%_35%,rgba(2,6,23,0.54)_0%,rgba(15,23,42,0.25)_48%,rgba(15,23,42,0.1)_68%,transparent_82%)] sm:-inset-x-4 sm:-inset-y-4 sm:rounded-3xl";

const TITLE_CLASS =
  "relative text-[1.72rem] font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgb(0_0_0/_0.42)] sm:text-[2.05rem]";

const SUBTITLE_CLASS =
  "relative mx-auto mt-2.5 max-w-2xl text-[13px] font-medium leading-relaxed text-white/95 [text-shadow:0_1px_2px_rgb(0_0_0/_0.36)] sm:text-[15px]";

const ACTIONS_ROW_CLASS =
  "relative mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-2.5";

export type InnerPageHeroProps = {
  title: string;
  subtitle: string;
  imageSrc?: string;
  actions?: ReactNode;
};

export function InnerPageHero({ title, subtitle, imageSrc = DEFAULT_IMAGE_SRC, actions }: InnerPageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/90">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image src={imageSrc} alt="" fill className={IMAGE_CLASS} sizes="100vw" priority />
        <div className={OVERLAY_CLASS} />
      </div>

      <div className={OUTER_CONTENT_CLASS}>
        <div className="relative w-full max-w-3xl">
          <div className={RADIAL_CLASS} aria-hidden />
          <SectionHeading as="h1" align="center" titleClassName={TITLE_CLASS}>
            {title}
          </SectionHeading>
          <p className={SUBTITLE_CLASS}>{subtitle}</p>
          {actions ? <div className={ACTIONS_ROW_CLASS}>{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}
