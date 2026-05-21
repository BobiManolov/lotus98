import type { ReactNode } from "react";
import Link from "next/link";
import { HOME_SERVICES_PROCESS_STEPS } from "@/content/homeServicesProcess";
import { SectionHeadingAccentRule } from "@/components/SectionHeading";

function StepIcon({ step }: { step: number }) {
  const common =
    "h-4 w-4 text-brand-800/85 transition-transform duration-300 group-hover:scale-105 group-hover:text-accent sm:h-[1.125rem] sm:w-[1.125rem]";
  switch (step) {
    case 1:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      );
    case 2:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 3:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 4:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 3v4a1 1 0 001 1h4" />
        </svg>
      );
    case 5:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 6:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1h-1m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
  }
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-brand-800/45 [&>svg]:block ${className ?? ""}`}
      aria-hidden
    >
      <svg className="h-3.5 w-5 sm:h-4 sm:w-6" viewBox="0 0 44 20" fill="none">
        <path d="M2 10h30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M36 10l-7-5.5v11z" fill="currentColor" />
      </svg>
    </span>
  );
}

function ArrowDownSimple() {
  return (
    <span className="inline-flex shrink-0 text-brand-800/40" aria-hidden>
      <svg className="h-5 w-4" viewBox="0 0 20 44" fill="none">
        <path d="M10 4v28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 36l-5-6h10z" fill="currentColor" />
      </svg>
    </span>
  );
}

function StepBox({ n, title, delay }: { n: number; title: string; delay: number }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="services-step-animate group relative flex min-h-[7.5rem] w-full max-w-[11.5rem] flex-col items-center rounded-lg border border-slate-200/95 bg-white px-2.5 pb-3 pt-3 text-center shadow-[0_4px_18px_-10px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/[0.04] transition duration-300 hover:-translate-y-0.5 hover:border-brand-800/20 hover:shadow-[0_10px_28px_-12px_rgba(30,85,102,0.18)] sm:min-h-[7.75rem] sm:rounded-xl sm:px-3 sm:pb-3.5 sm:pt-3.5"
    >
      <span className="absolute left-2 top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded bg-brand-800 px-1 text-[10px] font-bold text-white shadow-sm transition group-hover:bg-accent sm:left-2.5 sm:top-2.5 sm:h-5 sm:text-[11px]">
        {n}
      </span>
      <div className="mx-auto mb-2 mt-5 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800/[0.07] text-brand-800 transition group-hover:bg-accent/12 sm:mb-2.5 sm:h-9 sm:w-9">
        <StepIcon step={n} />
      </div>
      <p className="text-[11px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-xs sm:leading-snug">
        {title}
      </p>
    </div>
  );
}

function interleaveWithArrows(
  steps: readonly string[],
  renderStep: (title: string, i: number) => ReactNode,
  arrowClass?: string,
) {
  const nodes: ReactNode[] = [];
  steps.forEach((title, i) => {
    nodes.push(renderStep(title, i));
    if (i < steps.length - 1) {
      nodes.push(<ArrowRight key={`a-${i}`} className={arrowClass} />);
    }
  });
  return nodes;
}

export function HomeServicesProcess() {
  const steps = HOME_SERVICES_PROCESS_STEPS;

  return (
    <section className="relative overflow-x-hidden bg-gradient-to-b from-slate-100/90 via-white to-[var(--background)] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <ol className="sr-only">
          {steps.map((title, i) => (
            <li key={title}>
              {i + 1}. {title}
            </li>
          ))}
        </ol>

        <header className="mx-auto max-w-3xl text-center">
          <div className="mx-auto w-fit max-w-full text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.1rem] lg:leading-tight">
              От запитването до монтажа
            </h2>
            <SectionHeadingAccentRule align="center" />
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-[1.05rem]">
            Ясен процес, прозрачна комуникация и професионално изпълнение от първия разговор до гаранционната поддръжка.
          </p>
        </header>

        {/* Mobile: vertical stack, simplified connector */}
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 sm:mt-12 md:hidden">
          {steps.map((title, i) => (
            <div key={title} className="flex w-full flex-col items-center gap-3">
              <StepBox n={i + 1} title={title} delay={i * 35} />
              {i < steps.length - 1 ? <ArrowDownSimple /> : null}
            </div>
          ))}
        </div>

        {/* Tablet: two balanced rows */}
        <div className="mx-auto mt-10 hidden max-w-5xl flex-col items-center gap-10 md:flex lg:hidden sm:mt-12">
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
            {interleaveWithArrows(steps.slice(0, 4), (title, i) => (
              <StepBox key={title} n={i + 1} title={title} delay={i * 40} />
            ))}
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
            {interleaveWithArrows(steps.slice(4), (title, i) => (
              <StepBox key={title} n={i + 5} title={title} delay={(i + 4) * 40} />
            ))}
          </div>
        </div>

        {/* Desktop: single row */}
        <div className="mx-auto mt-10 hidden w-full justify-center lg:mt-12 lg:flex">
          <div className="flex max-w-full flex-nowrap items-stretch justify-center gap-1.5 overflow-x-auto pb-3 pt-1 sm:gap-2 md:gap-2.5 xl:overflow-visible xl:pb-0">
            {interleaveWithArrows(steps, (title, i) => (
              <StepBox key={title} n={i + 1} title={title} delay={i * 35} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-3 sm:mt-14 sm:flex-row sm:gap-4">
          <Link
            href="/kontakti"
            className="inline-flex w-full min-w-[14rem] items-center justify-center rounded-lg bg-brand-800 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-brand-900 hover:shadow-md sm:w-auto sm:min-w-[12rem]"
          >
            Поискайте оферта
          </Link>
          <Link
            href="/uslugi"
            className="inline-flex w-full min-w-[14rem] items-center justify-center rounded-lg border border-slate-200/95 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-brand-800/35 hover:bg-slate-50 hover:text-brand-900 sm:w-auto sm:min-w-[12rem]"
          >
            Подробности за услугите
          </Link>
        </div>
      </div>
    </section>
  );
}
