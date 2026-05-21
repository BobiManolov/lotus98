import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { InnerPageHero } from "@/components/InnerPageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Офис Лозенец и производствена база Горни Лозен — телефон, имейл, работно време, ${SITE.name}.`,
};

function MapEmbed({ query, label }: { query: string; label: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  return (
    <div className="flex h-full min-h-64 flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm lg:min-h-0">
      <iframe
        title={label}
        src={src}
        className="h-full min-h-64 w-full flex-1 border-0 grayscale-[20%] lg:min-h-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <InnerPageHero
        title="Контакти"
        subtitle="Свържете се с нас по телефон, имейл или Viber, посетете офиса ни в Лозенец или производствената база в Горни Лозен."
      />

      <section className="border-t border-slate-200/80 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            <a
              href="tel:0894724164"
              className="group rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1ec] text-[#c2410c]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M4 5.5a2 2 0 0 1 2-2h2.7a1 1 0 0 1 .94.67l1.35 3.9a1 1 0 0 1-.5 1.2l-1.9.9a11 11 0 0 0 5.3 5.3l.9-1.9a1 1 0 0 1 1.2-.5l3.9 1.35a1 1 0 0 1 .67.94V18a2 2 0 0 1-2 2h-1C10 20 4 14 4 6.5v-1Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1e2a3a]">Телефон</h3>
              <p className="mt-2">
                <span className="inline-flex rounded-full bg-[#e8f4fd] px-4 py-1.5 text-lg font-semibold text-[#1e4d5e]">0894 724 164</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">понеделник – петък, 08:30 – 19:00</p>
            </a>

            <a
              href="mailto:office@lotos98.eu"
              className="group rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1ec] text-[#c2410c]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m5 8 7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1e2a3a]">Имейл</h3>
              <p className="mt-2">
                <span className="inline-flex rounded-full bg-[#e8f4fd] px-4 py-1.5 text-lg font-semibold text-[#1e4d5e]">office@lotos98.eu</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">Отговаряме в рамките на 1 работен ден</p>
            </a>

            <a
              href="viber://chat?number=0894724164"
              className="group rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-sm ring-1 ring-slate-900/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 4c4.4 0 8 2.9 8 6.6 0 2.2-1.2 4.1-3.1 5.3V20l-3.4-2c-.5.1-1 .1-1.5.1-4.4 0-8-2.9-8-6.5S7.6 4 12 4Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M9.5 10.2h5M9.5 13h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1e2a3a]">Viber</h3>
              <p className="mt-2">
                <span className="inline-flex rounded-full bg-[#f3e8ff] px-4 py-1.5 text-lg font-semibold text-[#7c3aed]">Пишете ни във Viber</span>
              </p>
              <p className="mt-2 text-sm text-slate-600">Бърз и удобен начин за връзка</p>
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:gap-8">
            <article className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
                <div className="flex min-w-0 flex-col">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f4fd] text-[#1e4d5e]"
                      aria-hidden
                    >
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 21.25c3.47-3.09 6.8-7.06 6.8-11.06a6.8 6.8 0 10-13.6 0c0 4 3.33 7.97 6.8 11.06Z"
                          stroke="currentColor"
                          strokeWidth="1.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10.18" r="2.35" stroke="currentColor" strokeWidth="1.65" />
                      </svg>
                    </div>
                    <h2 className="min-w-0 text-xl font-bold leading-tight tracking-tight text-[#1e2a3a] sm:text-2xl">
                      Офис – София, Лозенец
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    София 1421, Лозенец, ул. „Резньовете" №7, бл. 128, вх.В, ап.29
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    инж. Борислав Манолов – 0894 724 164
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    понеделник – петък, 08:30 – 19:00
                  </p>
                  <p className="mt-4 rounded-lg border border-amber-200/60 bg-[#fffbeb] px-3 py-2.5 text-left text-xs leading-relaxed text-amber-900 sm:text-[13px] sm:leading-snug">
                    Моля да се обаждате преди посещение в нашия офис.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/o3kMPUyQKHwtWrFJ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center justify-center self-start rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Отвори в Google Maps
                  </a>
                </div>
                <div className="min-h-0 min-w-0 self-stretch lg:h-full">
                  <MapEmbed query="42.6739355,23.3233886" label="Офис Лозенец" />
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-10">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
                <div className="flex min-w-0 flex-col">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f4fd] text-[#1e4d5e]"
                      aria-hidden
                    >
                      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 21.25c3.47-3.09 6.8-7.06 6.8-11.06a6.8 6.8 0 10-13.6 0c0 4 3.33 7.97 6.8 11.06Z"
                          stroke="currentColor"
                          strokeWidth="1.65"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10.18" r="2.35" stroke="currentColor" strokeWidth="1.65" />
                      </svg>
                    </div>
                    <h2 className="min-w-0 text-xl font-bold leading-tight tracking-tight text-[#1e2a3a] sm:text-2xl">
                      Производствена база – Горни Лозен
                    </h2>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    София 1151, с. Лозен, Бивш Стопански двор, ул. Райовец №13
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    инж. Петър Петров – 0899 859 276
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
                    понеделник – петък, 08:30 – 18:30
                  </p>
                  <p className="mt-4 rounded-lg border border-amber-200/60 bg-[#fffbeb] px-3 py-2.5 text-left text-xs leading-relaxed text-amber-900 sm:text-[13px] sm:leading-snug">
                    Моля да се обаждате преди посещение в нашата производствена база.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/gYmaFeJXtAja1Dk19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center justify-center self-start rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Отвори в Google Maps
                  </a>
                </div>
                <div className="min-h-0 min-w-0 self-stretch lg:h-full">
                  <MapEmbed query="42.61427,23.46426" label="Производствена база Горни Лозен" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading align="center" titleClassName="text-2xl font-bold tracking-tight text-[#1e2a3a] sm:text-3xl">
            Изпратете ни вашето запитване
          </SectionHeading>
          <div className="mx-auto mt-6 w-full max-w-4xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
