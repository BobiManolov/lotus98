"use client";

import { useEffect, useRef, useState } from "react";
import { HOME_TRUST_STATS } from "@/content/site";

export function HomeTrustStatement() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 border-y border-slate-200/70 bg-gradient-to-b from-brand-800/[0.06] via-slate-50/95 to-[var(--background)] py-12 sm:py-14 md:py-16"
      aria-labelledby="home-trust-statement-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p
          id="home-trust-statement-heading"
          className={`text-center text-[1.125rem] font-bold leading-snug tracking-tight text-slate-900 transition-[opacity,transform] duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 sm:text-xl md:text-2xl md:leading-tight lg:text-[1.65rem] ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          С над{" "}
          <span className="font-extrabold text-accent">25-годишен опит</span> в индустрията
        </p>

        <div
          className={`mx-auto mt-6 max-w-xl text-center sm:mt-7 md:max-w-2xl ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          } transition-[opacity,transform] duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0`}
          style={{ transitionDelay: revealed ? "60ms" : "0ms" }}
        >
          <p className="text-base leading-[1.65] text-slate-800 sm:text-lg sm:leading-[1.7]">
            Лотос 98 ООД е компания от 1998 г., специализирана в производството и монтажа на алуминиева и PVC дограма.
            Разполагаме със собствен цех в София, което ни позволява да контролираме качеството на всеки етап.
          </p>
        </div>

        <ul
          className="mx-auto mt-12 grid max-w-2xl list-none grid-cols-1 gap-10 p-0 sm:mt-14 sm:grid-cols-3 sm:gap-8 md:max-w-none md:gap-12"
          role="list"
        >
          {HOME_TRUST_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              } transition-[opacity,transform] duration-700 ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0`}
              style={{ transitionDelay: revealed ? `${140 + i * 70}ms` : "0ms" }}
            >
              <div className="flex h-[6.375rem] w-[6.375rem] shrink-0 items-center justify-center rounded-full bg-accent/[0.07] shadow-sm ring-1 ring-slate-200/70 sm:h-32 sm:w-32">
                <span className="px-1.5 text-center text-2xl font-extrabold leading-none tracking-tight text-[#334155] sm:text-3xl">
                  {stat.value}
                </span>
              </div>
              <span className="mt-3 max-w-[14rem] text-sm font-semibold leading-snug text-slate-600 sm:mt-3 sm:text-base sm:leading-snug">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
