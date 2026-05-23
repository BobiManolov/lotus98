"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, PRODUCT_PAGE_CARD_DATA, SITE } from "@/content/site";

function navActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 4.5L6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

const navTypo =
  "whitespace-nowrap text-[0.9375rem] font-semibold uppercase tracking-[0.1em] sm:text-[15px] lg:text-[15px] xl:text-base";

/** Desktop nav link: soft underline on hover, stronger bar when active. */
function desktopNavLinkClass(active: boolean, group?: "drop") {
  const groupHover =
    !active && group === "drop"
      ? "group-hover/drop:text-slate-900 group-hover/drop:after:scale-x-100 group-hover/drop:after:bg-accent/55"
      : "";

  return [
    navTypo,
    "relative inline-block py-2.5 text-slate-700 transition-[color] duration-300 ease-out",
    "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:max-w-full after:origin-center after:scale-x-0 after:rounded-full after:bg-accent after:transition-[transform,height,background-color] after:duration-300 after:ease-out",
    active
      ? "text-accent-dark after:scale-x-100 after:bg-accent-dark after:h-0.5"
      : "hover:text-slate-900 hover:after:scale-x-100 hover:after:bg-accent/55",
    groupHover,
  ]
    .filter(Boolean)
    .join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileProdukti, setMobileProdukti] = useState(false);
  const [mobilePolezno, setMobilePolezno] = useState(false);
  const [activeProduktiSub, setActiveProduktiSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const usefulNavActive =
    pathname === "/statii" ||
    pathname.startsWith("/statii/") ||
    pathname === "/chesto-zadavani-vaprosi" ||
    pathname.startsWith("/chesto-zadavani-vaprosi/");
  const PRICES_SLUG_OVERRIDES: Record<string, string> = { komarnitsi: "komarnici" };
  const produktiItems = PRODUCT_PAGE_CARD_DATA.map((p) => ({
    ...p,
    pricesHref: `/prices/${PRICES_SLUG_OVERRIDES[p.slug] ?? p.slug}`,
  }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      setMobileProdukti(false);
      setMobilePolezno(false);
    }
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b transition-[border-color,box-shadow,background-color] duration-300 ease-out",
        scrolled
          ? "border-slate-200/95 bg-white/92 shadow-[0_10px_40px_-16px_rgba(15,23,42,0.18)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/88"
          : "border-slate-200/80 bg-white/88 shadow-[0_1px_0_rgba(15,23,42,0.06),0_8px_28px_-18px_rgba(15,23,42,0.1)] backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-white/82",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-8 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-x-6 lg:px-10 xl:gap-x-8 xl:px-12",
          "transition-[padding] duration-300 ease-out",
          scrolled ? "py-3 lg:py-3" : "py-3.5 lg:py-3.5",
        ].join(" ")}
      >
        <Link
          href="/"
          className="relative flex shrink-0 items-center justify-self-start transition-opacity duration-300 ease-out hover:opacity-88"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-lotos98.png"
            alt={SITE.name}
            width={200}
            height={48}
            className="h-9 w-auto sm:h-10 lg:h-[2.625rem]"
            sizes="(max-width: 1024px) 180px, 220px"
            priority
          />
        </Link>

        <nav
          className="hidden w-full min-w-0 flex-nowrap items-center justify-center justify-self-center gap-x-5 lg:flex xl:gap-x-6 2xl:gap-x-7"
          aria-label="Основна навигация"
        >
          {NAV.main.filter((item) => item.href !== "/").map((item) => {
            if (item.href === "/produkti") {
              const active = pathname === "/produkti" || pathname.startsWith("/produkti");
              return (
                <div key={item.href} className="group/drop relative flex items-center">
                  <div className="flex cursor-default items-center gap-1.5 py-1">
                    <Link href="/produkti" className={desktopNavLinkClass(active, "drop")}>
                      {item.label}
                    </Link>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 ease-out group-hover/drop:rotate-180 group-hover/drop:text-brand-800" />
                  </div>
                  <div
                    className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-max min-w-[16rem] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 ease-out group-hover/drop:pointer-events-auto group-hover/drop:visible group-hover/drop:translate-y-0 group-hover/drop:opacity-100 group-focus-within/drop:pointer-events-auto group-focus-within/drop:visible group-focus-within/drop:translate-y-0 group-focus-within/drop:opacity-100"
                    role="presentation"
                  >
                    <div className="rounded-lg border border-slate-100/80 bg-white py-3 shadow-lg">
                      {produktiItems.map((p) => {
                        const subOpen = activeProduktiSub === p.slug;
                        return (
                          <div
                            key={p.slug}
                            className="relative"
                            onMouseEnter={() => setActiveProduktiSub(p.slug)}
                            onMouseLeave={() => setActiveProduktiSub(null)}
                          >
                            <Link
                              href={p.href}
                              className="flex items-center justify-between gap-3 px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-slate-900"
                            >
                              <span>{p.title}</span>
                              <ChevronDown className={`h-3.5 w-3.5 -rotate-90 transition-colors duration-200 ${subOpen ? "text-slate-700" : "text-slate-400"}`} />
                            </Link>
                            <div className={`absolute left-full top-0 z-50 min-w-[15.5rem] pl-1 transition-all duration-200 ease-out ${subOpen ? "pointer-events-auto visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"}`}>
                              <div className="rounded-lg border border-slate-100/80 bg-white py-1.5 shadow-lg">
                                <Link
                                  href={p.href}
                                  className="block px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-slate-900"
                                >
                                  Полезна информация
                                </Link>
                                <Link
                                  href={p.pricesHref}
                                  className="block px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-slate-900"
                                >
                                  Цени
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="my-1 border-t border-slate-100" />
                      <Link
                        href="/prices"
                        className="block px-5 py-2.5 text-[15px] font-semibold text-brand-800 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-brand-900"
                      >
                        Цени →
                      </Link>
                      <Link
                        href="/produkti"
                        className="block px-5 py-2.5 text-[15px] font-semibold text-brand-800 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-brand-900"
                      >
                        Всички продукти →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.href === "/galeriya") {
              const active = navActive(pathname, item.href);
              return (
                <div key="nav-galeriya-polezno" className="flex items-center gap-x-5 xl:gap-x-6 2xl:gap-x-7">
                  <div className="group/drop relative flex items-center">
                    <div className="flex cursor-default items-center gap-1.5 py-1">
                      <span className={desktopNavLinkClass(usefulNavActive, "drop")}>{NAV.useful.label}</span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-300 ease-out group-hover/drop:rotate-180 group-hover/drop:text-brand-800" />
                    </div>
                    <div
                      className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-max min-w-[16rem] -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 ease-out group-hover/drop:pointer-events-auto group-hover/drop:visible group-hover/drop:translate-y-0 group-hover/drop:opacity-100 group-focus-within/drop:pointer-events-auto group-focus-within/drop:visible group-focus-within/drop:translate-y-0 group-focus-within/drop:opacity-100"
                      role="presentation"
                    >
                      <div className="rounded-lg border border-slate-100/80 bg-white py-3 shadow-lg">
                        {NAV.useful.items.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-[background-color,color] duration-300 ease-out hover:bg-slate-100 hover:text-slate-900"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href={item.href} className={desktopNavLinkClass(active)}>
                    {item.label}
                  </Link>
                </div>
              );
            }

            const active = navActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} className={desktopNavLinkClass(active)}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-3 lg:gap-4">
          <a
            href="tel:+359894724164"
            className="hidden items-center gap-2 rounded-full bg-brand-800 px-5 py-2 text-[14px] font-semibold tracking-wide text-white shadow-sm shadow-brand-900/20 transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-brand-900 hover:brightness-[1.04] hover:shadow-md hover:shadow-brand-900/25 active:scale-[0.99] lg:inline-flex"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 opacity-95" />
            <span className="tabular-nums">0894 724 164</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200/90 text-slate-800 shadow-sm shadow-slate-900/5 transition-all duration-300 ease-out hover:border-slate-300 hover:bg-slate-50/90 hover:shadow-md hover:shadow-slate-900/8 active:scale-[0.98] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={[
          "border-t border-slate-200/80 bg-white/95 backdrop-blur-md backdrop-saturate-150 lg:hidden",
          open ? "block" : "hidden",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl space-y-0.5 px-6 py-5 sm:px-8 lg:px-10 xl:px-12">
          <Link
            href="/za-nas"
            className={[
              "block rounded-lg px-3 py-3.5 text-lg font-semibold uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-300 ease-out",
              pathname.startsWith("/za-nas")
                ? "bg-accent/8 text-accent-dark shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]"
                : "text-slate-700 hover:bg-slate-50/90 hover:text-brand-900",
            ].join(" ")}
            onClick={() => setOpen(false)}
          >
            За нас
          </Link>

          <div className="rounded-lg border border-slate-100">
            <button
              type="button"
              className="flex w-full items-center justify-between px-3 py-3.5 text-left text-lg font-semibold uppercase tracking-[0.14em] text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-brand-900"
              aria-expanded={mobileProdukti}
              onClick={() => setMobileProdukti((v) => !v)}
            >
              Продукти
              <ChevronDown
                className={["h-4 w-4 text-slate-500 transition-transform duration-200", mobileProdukti ? "rotate-180" : ""].join(
                  " ",
                )}
              />
            </button>
            {mobileProdukti ? (
              <div className="border-t border-slate-100 bg-slate-50/80 py-1">
                {produktiItems.map((p) => (
                  <div key={p.slug}>
                    <Link
                      href={p.href}
                      className="block px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-900"
                      onClick={() => setOpen(false)}
                    >
                      {p.title}
                    </Link>
                    <Link
                      href={p.href}
                      className="block px-8 py-2 text-[14px] font-medium text-slate-500 transition-colors duration-200 hover:bg-white hover:text-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Полезна информация
                    </Link>
                    <Link
                      href={p.pricesHref}
                      className="block px-8 py-2 text-[14px] font-medium text-slate-500 transition-colors duration-200 hover:bg-white hover:text-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Цени
                    </Link>
                  </div>
                ))}
                <div className="my-1 border-t border-slate-100" />
                <Link
                  href="/prices"
                  className="block px-5 py-2.5 text-[15px] font-semibold text-brand-800"
                  onClick={() => setOpen(false)}
                >
                  Цени →
                </Link>
                <Link
                  href="/produkti"
                  className="block px-5 py-2.5 text-[15px] font-semibold text-brand-800"
                  onClick={() => setOpen(false)}
                >
                  Всички продукти →
                </Link>
              </div>
            ) : null}
          </div>

          <Link
            href="/uslugi"
            className={[
              "block rounded-lg px-3 py-3.5 text-lg font-semibold uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-300 ease-out",
              pathname.startsWith("/uslugi")
                ? "bg-accent/8 text-accent-dark shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]"
                : "text-slate-700 hover:bg-slate-50/90 hover:text-brand-900",
            ].join(" ")}
            onClick={() => setOpen(false)}
          >
            Услуги
          </Link>

          <div className="rounded-lg border border-slate-100">
            <button
              type="button"
              className={[
                "flex w-full items-center justify-between px-3 py-3.5 text-left text-lg font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
                usefulNavActive
                  ? "bg-accent/8 text-accent-dark"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-900",
              ].join(" ")}
              aria-expanded={mobilePolezno}
              onClick={() => setMobilePolezno((v) => !v)}
            >
              Полезно
              <ChevronDown
                className={["h-4 w-4 text-slate-500 transition-transform duration-200", mobilePolezno ? "rotate-180" : ""].join(
                  " ",
                )}
              />
            </button>
            {mobilePolezno ? (
              <div className="border-t border-slate-100 bg-slate-50/80 py-1">
                {NAV.useful.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-5 py-2.5 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-white hover:text-slate-900"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link
            href="/galeriya"
            className={[
              "block rounded-lg px-3 py-3.5 text-lg font-semibold uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-300 ease-out",
              pathname.startsWith("/galeriya")
                ? "bg-accent/8 text-accent-dark shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]"
                : "text-slate-700 hover:bg-slate-50/90 hover:text-brand-900",
            ].join(" ")}
            onClick={() => setOpen(false)}
          >
            Проекти
          </Link>

          {NAV.main
            .filter(
              (i) =>
                i.href !== "/" &&
                i.href !== "/produkti" &&
                i.href !== "/uslugi" &&
                i.href !== "/galeriya",
            )
            .map((item) => {
              const active = navActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-lg px-3 py-3.5 text-lg font-semibold uppercase tracking-[0.14em] transition-[color,background-color,box-shadow] duration-300 ease-out",
                    active
                      ? "bg-accent/8 text-accent-dark shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--accent)_28%,transparent)]"
                      : "text-slate-700 hover:bg-slate-50/90 hover:text-brand-900",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

          <a
            href="tel:+359894724164"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-brand-800 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-900/20 transition-all duration-300 ease-out hover:scale-[1.01] hover:bg-brand-900 hover:brightness-[1.04] hover:shadow-md hover:shadow-brand-900/25 active:scale-[0.99]"
          >
            <PhoneIcon className="h-4 w-4" />
            Обадете се: 0894 724 164
          </a>
        </div>
      </div>
    </header>
  );
}
