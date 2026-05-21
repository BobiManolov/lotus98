import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { AboutSectionNav } from "@/components/AboutSectionNav";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import { ABOUT, SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "За нас",
  description: `История, качество и екип — ${SITE.name}, производител на дограма и комарници в София от 1998 г.`,
};

const SUBNAV = [
  { href: "#koi-sme", label: "Кои сме ние" },
  { href: "#razvitie", label: "Развитие" },
  { href: "#predimstva", label: "Предимства" },
  { href: "#kachestvo", label: "Качество и гаранция" },
  { href: "#distributori", label: "Дистрибутори" },
] as const;

function splitTimelineYear(year: string): { num: string; suffix: string } | null {
  const m = year.match(/^(\d{4})\s+(.+)$/);
  if (!m) return null;
  return { num: m[1], suffix: m[2].trim() };
}

function TimelineYearInCard({ year }: { year: string }) {
  const parts = splitTimelineYear(year);
  if (!parts) {
    return (
      <span className="text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
        {year}
      </span>
    );
  }
  return (
    <span className="flex flex-col items-center gap-1 text-center">
      <span className="text-2xl font-bold leading-none tracking-tight text-slate-900 sm:text-3xl">
        {parts.num}
      </span>
      <span className="text-xs font-normal leading-snug text-slate-900 sm:text-sm">
        {parts.suffix}
      </span>
    </span>
  );
}

function IconExperience({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8v4l2.5 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFactory({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 21V8l4-2v15M10 21V6l4-2v17M16 21v-9l4-2v11M2 21h20"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 3 8l9 5 9-5-9-5Zm0 7 9 5-9 5-9-5 9-5Zm0 7 9 5-9 5-9-5 9-5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconHandshake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m11 11-6 6a2 2 0 002 2h1l5-5M11 11l5-5h1a2 2 0 012 2v1l-6 6M11 11l6 6m-6-6 6-6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STRENGTH_ICONS = [IconExperience, IconFactory, IconLayers, IconHandshake] as const;

export default function AboutPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-slate-200/90">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={ABOUT.hero.imageSrc}
            alt=""
            fill
            className="object-cover brightness-[0.9] contrast-[1.08] saturate-[0.88]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(15,23,42,0.09)_42%,rgba(248,250,252,0.34)_100%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[1.75rem] bg-[radial-gradient(ellipse_92%_125%_at_50%_28%,rgba(0,0,0,0.58)_0%,rgba(15,23,42,0.28)_46%,rgba(15,23,42,0.08)_62%,transparent_74%)] sm:-inset-x-10 sm:-inset-y-5 sm:rounded-3xl"
              aria-hidden
            />
            <h1 className="relative text-3xl font-bold tracking-tight text-white [text-shadow:0_1px_2px_rgb(0_0_0/_0.55),0_2px_16px_rgb(0_0_0/_0.28)] sm:text-4xl">
              {ABOUT.hero.title}
            </h1>
            <p className="relative mx-auto mt-3 max-w-2xl text-base font-medium leading-relaxed text-white [text-shadow:0_1px_2px_rgb(0_0_0/_0.5),0_1px_12px_rgb(0_0_0/_0.22)] sm:mt-4 sm:text-lg">
              {ABOUT.hero.subtitle}
            </p>
          </div>
        </div>
      </header>

      <AboutSectionNav items={SUBNAV} />

      <section
        id={ABOUT.who.id}
        className="scroll-mt-[calc(var(--site-header-h)+5.5rem)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:items-stretch lg:gap-x-16 xl:gap-x-20 lg:gap-y-0">
            <div className="flex min-h-0 min-w-0 flex-col lg:h-full">
              <SectionHeading
                align="start"
                titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                {ABOUT.who.heading}
              </SectionHeading>
              <div
                className={`min-h-0 space-y-5 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg lg:flex-1 lg:min-h-0 ${sectionAfterHeadingSpacing}`}
              >
                {ABOUT.who.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:gap-3 lg:shrink-0">
                {ABOUT.externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-800 hover:text-brand-800"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div
              id={ABOUT.base.id}
              className="flex min-h-0 min-w-0 flex-col scroll-mt-[calc(var(--site-header-h)+5.5rem)] lg:h-full"
            >
              <SectionHeading
                align="center"
                titleClassName="text-center text-2xl font-[725] tracking-tight text-slate-900 sm:text-3xl lg:shrink-0 lg:whitespace-nowrap lg:text-[1.25rem] xl:text-[1.3125rem]"
              >
                {ABOUT.base.text}
              </SectionHeading>
              <div className={`relative aspect-[16/9] w-full min-h-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-900/5 lg:mx-0 lg:min-h-0 lg:flex-1 lg:aspect-auto ${sectionAfterHeadingSpacing}`}>
                <Image
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="Производствена база и офис — Горни Лозен"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 flex shrink-0 flex-wrap justify-center gap-3">
                <a
                  href={ABOUT.base.mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-800 hover:text-brand-800"
                >
                  {ABOUT.base.mapLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id={ABOUT.timeline.id}
        className="scroll-mt-[calc(var(--site-header-h)+5.5rem)] border-y border-slate-200/80 bg-slate-50/90 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            titleClassName="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {ABOUT.timeline.heading}
          </SectionHeading>
          <ol
            className={`flex list-none flex-col gap-6 p-0 md:flex-row md:items-start md:justify-center md:gap-0 lg:gap-1 ${sectionAfterHeadingSpacing}`}
          >
            {ABOUT.timeline.steps.map((step, i) => (
              <Fragment key={step.year}>
                <li className="mx-auto flex w-full max-w-[12rem] flex-col items-center md:mx-0 md:w-[11rem] md:max-w-none md:flex-none md:shrink-0">
                  <div className="relative flex min-h-[7.25rem] w-full items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-3 py-3 text-center shadow-sm md:h-[8.5rem] md:min-h-0 md:w-[11rem]">
                    <TimelineYearInCard year={step.year} />
                  </div>
                  <p className="mt-3 max-w-full text-center text-sm font-medium leading-snug text-slate-950 sm:text-base">
                    {step.text}
                  </p>
                </li>
                {i < ABOUT.timeline.steps.length - 1 ? (
                  <li
                    aria-hidden
                    className="hidden h-[8.5rem] shrink-0 list-none items-center justify-center self-start px-2 text-3xl font-medium leading-none text-accent sm:text-4xl md:flex md:px-5 md:py-0"
                  >
                    →
                  </li>
                ) : null}
              </Fragment>
            ))}
          </ol>
        </div>
      </section>

      <section
        id={ABOUT.strengths.id}
        className="scroll-mt-[calc(var(--site-header-h)+5.5rem)] border-t border-slate-200/50 bg-gradient-to-b from-slate-50/70 via-[var(--background)] to-[var(--background)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            align="center"
            titleClassName="text-center text-[1.65rem] font-bold tracking-tight text-slate-900 sm:text-3xl sm:tracking-tight lg:text-[2rem]"
          >
            {ABOUT.strengths.heading}
          </SectionHeading>
          <ul className={`grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8 ${sectionAfterHeadingSpacing}`}>
            {ABOUT.strengths.items.map((item, i) => {
              const Icon = STRENGTH_ICONS[i] ?? IconCheck;
              return (
                <li
                  key={item.title}
                  className="group flex gap-5 rounded-[1.25rem] border border-slate-200/60 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_28px_-14px_rgba(15,23,42,0.09)] ring-1 ring-slate-900/[0.035] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-slate-200/85 motion-safe:hover:bg-white motion-safe:hover:shadow-[0_4px_12px_-4px_rgba(15,23,42,0.1),0_18px_40px_-22px_rgba(15,23,42,0.12)] sm:p-7"
                >
                  <span
                    className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/16 via-accent/8 to-slate-50 text-accent-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-slate-900/[0.04] transition-[background-color,box-shadow,color] duration-300 group-hover:from-accent/22 group-hover:via-accent/12 group-hover:to-white"
                    aria-hidden
                  >
                    <Icon className="h-[1.35rem] w-[1.35rem]" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-[1.125rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base sm:leading-[1.65]">
                      {item.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        id={ABOUT.quality.id}
        className="scroll-mt-[calc(var(--site-header-h)+5.5rem)] border-t border-slate-200/80 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div className="min-w-0">
              <SectionHeading
                align="start"
                titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                {ABOUT.quality.heading}
              </SectionHeading>
              <ul className={`space-y-5 sm:space-y-6 ${sectionAfterHeadingSpacing}`} role="list">
                {ABOUT.quality.bullets.map((line) => (
                  <li key={line} className="flex gap-3.5 text-left sm:gap-4">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent"
                      aria-hidden
                    >
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-900/5">
              <Image
                src={ABOUT.quality.imageSrc}
                alt={ABOUT.quality.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200/80 pt-5 sm:mt-10 sm:pt-6">
            <h3 className="text-center text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-slate-600 sm:text-sm sm:tracking-[0.12em]">
              {ABOUT.quality.certificatesHeading}
            </h3>
            <div className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-6 sm:gap-4">
              {ABOUT.quality.certificates.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex justify-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-800 hover:text-brand-800"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id={ABOUT.distributors.id}
        className="scroll-mt-[calc(var(--site-header-h)+5.5rem)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.87fr)_minmax(0,1.13fr)] lg:items-center lg:gap-x-12 xl:gap-x-16">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <SectionHeading
                align="start"
                titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                {ABOUT.distributors.heading}
              </SectionHeading>
              <p className={`leading-relaxed text-slate-700 ${sectionAfterHeadingSpacing}`}>
                {ABOUT.distributors.lead}
              </p>
              <a
                href={ABOUT.distributors.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex max-w-full whitespace-normal rounded-full bg-brand-800 px-8 py-3.5 text-center text-sm font-semibold leading-snug text-white transition hover:bg-brand-700 sm:px-10"
              >
                {ABOUT.distributors.cta.label}
              </a>
            </div>
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-900/5 lg:col-start-1 lg:row-start-1">
              <Image
                src={ABOUT.distributors.imageSrc}
                alt={ABOUT.distributors.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 38vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
