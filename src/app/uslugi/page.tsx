import type { Metadata } from "next";
import Link from "next/link";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Услуги",
  description: `Оферти, размери, доставка, монтаж, гаранция и рекламации — ${SITE.name}, София.`,
};

const PROCESS_STEPS = [
  {
    title: "Консултация с начална оферта",
    description: "Кратко обсъждаме Вашите нужди и даваме ориентировъчна цена.",
  },
  {
    title: "Оглед на място",
    description: "Посещаваме обекта за точни размери и уточняване на детайлите.",
  },
  {
    title: "Финална оферта",
    description: "Изготвяме точна оферта според проекта и избраните решения.",
  },
  {
    title: "Сключване на договор",
    description: "Уточняваме срокове, параметри и всички важни детайли.",
  },
  {
    title: "Изработка",
    description: "Произвеждаме продуктите по поръчка според договореното.",
  },
  {
    title: "Доставка и монтаж",
    description: "Доставяме и монтираме професионално и внимателно.",
  },
  {
    title: "Гаранционна поддръжка",
    description: "Оставаме на разположение при нужда от съдействие и обслужване.",
  },
] as const;

const EXCLUSIONS = [
  {
    lead: "Изграждане на покриви и прозорци за покриви под наклон",
    tail: "(капандури)",
  },
  {
    lead: "Изработка и монтаж на арки, дограма с отваряне „фолксваген“",
    tail: "и хармоника",
  },
  {
    lead: "Монтаж на вътрешни PVC первази и алуминиеви козирки",
    tail: "на вече инсталирана дограма",
  },
  {
    lead: "Изработка и ремонт на окачени фасади",
  },
  {
    lead: "Монтаж на щори",
    tail: "различни от вътрешни венециански щори за PVC дограма",
  },
  {
    lead: "Ремонт на дограма, ролетни комарници и смяна на стъклопакети",
    tail: "когато монтажът е извършен от друга фирма",
  },
  {
    lead: "Монтаж на комарници",
    tail: "на дървена дограма",
  },
  {
    lead: "Монтаж на дограма",
    tail: "която не е изработена от нас",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <InnerPageHero
        title="Услуги"
        subtitle="Предлагаме цялостно съдействие - от първоначалната консултация и огледа на място до изработката, монтажа и последващата поддръжка."
        actions={
          <>
            <Link
              href="/kontakti"
              className="inline-flex min-w-[156px] items-center justify-center rounded-full bg-brand-800 px-4.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Запитване за оферта
            </Link>
            <Link
              href="/kontakti"
              className="inline-flex min-w-[122px] items-center justify-center rounded-full border border-white/55 bg-white/12 px-4.5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/80 hover:bg-white/20"
            >
              Контакти
            </Link>
          </>
        }
      />

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Как протича процесът
          </SectionHeading>
          <p className="mt-4 max-w-3xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
            Работим по ясен и подреден процес, за да осигурим спокойствие, точност и качество на всяка стъпка.
          </p>

          <div className="relative mt-8 sm:mt-10">
            <ol className="space-y-2 sm:space-y-3">
              {PROCESS_STEPS.map((step, index) => {
                const stepNumber = index + 1;
                const isLast = index === PROCESS_STEPS.length - 1;

                return (
                  <li key={step.title} className="relative cursor-default rounded-xl">
                    {!isLast ? (
                      <span
                        className="absolute left-[1.12rem] top-12 h-[calc(100%-1.75rem)] w-px bg-slate-200"
                        aria-hidden
                      />
                    ) : null}

                    <article className="grid gap-3 px-3 py-4 sm:grid-cols-[2.25rem_minmax(0,1fr)] sm:gap-5 sm:px-4">
                      <div className="relative">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700">
                          {stepNumber}
                        </span>
                      </div>
                      <div className="pt-0.5">
                        <h3 className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 max-w-3xl text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
                          {step.description}
                        </p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border border-amber-300/50 bg-amber-50/70 p-6 shadow-sm ring-1 ring-amber-400/15 sm:p-8">
            <SectionHeading align="start" titleClassName="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Какво не извършваме в Лотос 98 ООД?
            </SectionHeading>
            <p className="mt-4 max-w-4xl text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
              За да се фокусираме върху качественото изпълнение на основните си дейности, Лотос 98 ООД не предлага
              следните услуги:
            </p>

            <ul className="mt-6 divide-y divide-amber-200/70 overflow-hidden rounded-2xl border border-amber-200/70 bg-white/75">
              {EXCLUSIONS.map((item) => (
                <li key={item.lead} className="group flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-600 transition-colors duration-200 hover:bg-amber-50/45 sm:px-5 sm:py-4 sm:text-base">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900"
                    aria-hidden
                  >
                    -
                  </span>
                  <span className="font-semibold text-slate-900">
                    {item.lead}
                    {"tail" in item && item.tail ? ` ${item.tail}` : ""}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
              Ако имате специфичен казус, свържете се с нас – ще Ви насочим към най-доброто възможно решение.
            </p>
          </div>
        </div>
      </section>

      <CtaStrip variant="services" />
    </>
  );
}
