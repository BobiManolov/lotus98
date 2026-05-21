"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type AboutSectionNavItem = { readonly href: string; readonly label: string };

const pillBase =
  "inline-flex rounded-full border font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

export function AboutSectionNav({ items }: { items: readonly AboutSectionNavItem[] }) {
  const navRef = useRef<HTMLElement>(null);
  const ids = useMemo(() => items.map((i) => i.href.replace(/^#/, "")), [items]);
  const [activeId, setActiveId] = useState<string | null>(() => ids[0] ?? null);

  const updateActive = useCallback(() => {
    const nav = navRef.current;
    if (!nav || ids.length === 0) return;

    const line = window.scrollY + nav.getBoundingClientRect().bottom;
    let current: string | null = ids[0] ?? null;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= line + 16) current = id;
    }

    setActiveId(current);
  }, [ids]);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  return (
    <nav
      ref={navRef}
      className="sticky top-[var(--site-header-h)] z-20 border-b border-slate-200/75 bg-[var(--background)]/88 backdrop-blur-md"
      aria-label="Секции на страницата"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-3.5">
        <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {items.map((item) => {
            const id = item.href.replace(/^#/, "");
            const active = activeId === id;

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={[
                    pillBase,
                    "px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm",
                    "border-slate-200/65 bg-white/90 text-slate-600 shadow-[0_1px_2px_rgba(15,23,42,0.06)]",
                    "motion-safe:hover:scale-[1.03] motion-reduce:hover:scale-100 hover:border-slate-200/45 hover:bg-slate-100 hover:text-accent motion-safe:active:scale-[0.99]",
                    active
                      ? "border-accent/35 bg-accent/[0.11] text-accent-dark shadow-[0_2px_8px_-2px_rgba(14,162,201,0.22)] motion-safe:hover:scale-100 hover:border-accent/40 hover:bg-accent/[0.14] hover:text-accent-dark"
                      : "",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
