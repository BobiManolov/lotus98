import Image from "next/image";
import Link from "next/link";
import { EXTERNAL, SITE } from "@/content/site";

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

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-brand-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {/* Left */}
          <div className="flex flex-col">
            <Link
              href="/"
              className="relative inline-flex w-fit shrink-0 items-center rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-white/15 transition-opacity duration-300 hover:opacity-88 sm:rounded-2xl sm:px-3.5 sm:py-2.5"
            >
              <Image
                src="/brand/logo-lotos98.png"
                alt={SITE.name}
                width={200}
                height={48}
                className="h-9 w-auto sm:h-10 lg:h-[2.625rem]"
                sizes="(max-width: 1024px) 180px, 220px"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white sm:text-[0.9375rem]">
              Над 25 години опит. Безкомпромисно качество.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm font-medium sm:text-[0.9375rem]">
              <a
                href="tel:+359894724164"
                className="inline-flex items-center gap-2.5 text-white transition hover:text-white/90"
              >
                <PhoneIcon className="h-5 w-5 shrink-0 text-white/90" />
                0894 724 164
              </a>
              <a
                href="mailto:office@lotos98.eu"
                className="inline-flex items-center gap-2.5 break-all text-white transition hover:text-white/90"
              >
                <MailIcon className="h-5 w-5 shrink-0 text-white/90" />
                office@lotos98.eu
              </a>
            </div>
          </div>

          {/* Middle */}
          <div className="grid grid-cols-2 gap-x-8">
            {/* Left column — Продукти */}
            <div>
              <p className="text-sm font-bold text-white">
                Продукти:
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <Link href="/produkti/pvc-dograma" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    PVC дограма
                  </Link>
                </li>
                <li>
                  <Link href="/produkti/aluminieva-dograma" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    Алуминиева дограма
                  </Link>
                </li>
                <li>
                  <Link href="/produkti/staklopaketi" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    Стъклопакети
                  </Link>
                </li>
                <li>
                  <Link href="/produkti/komarnitsi" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    Комарници
                  </Link>
                </li>
                <li>
                  <Link href="/produkti/pervazi-i-kozirki" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    Первази и козирки
                  </Link>
                </li>
                <li>
                  <Link href="/produkti/vatreshni-shtori" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                    Вътрешни щори
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right column — misc links */}
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/prices" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Цени
                </Link>
              </li>
              <li>
                <Link href="/za-nas" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/uslugi" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/statii" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Статии
                </Link>
              </li>
              <li>
                <Link href="/chesto-zadavani-vaprosi" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Често задавани въпроси
                </Link>
              </li>
              <li>
                <Link href="/galeriya" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Проекти
                </Link>
              </li>
              <li>
                <Link href="/kontakti" className="text-sm text-white transition hover:underline sm:text-[0.9375rem]">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Right — Работно време и локации */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              РАБОТНО ВРЕМЕ И ЛОКАЦИИ
            </p>
            <div className="mt-5 space-y-8 text-sm leading-relaxed text-white sm:text-[0.9375rem]">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  ОФИС — СОФИЯ, ЛОЗЕНЕЦ
                </p>
                <p>пон. – пет., 08:30 – 19:00</p>
                <p className="text-white/95">ул. „Резньовете“ №7, Лозенец</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  ЦЕХ — ГОРНИ ЛОЗЕН
                </p>
                <p>пон. – пет., 08:30 – 18:30</p>
                <p className="text-white/95">ул. Райовец №13, с. Лозен</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-brand-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10 xl:px-12">
          <p className="text-center text-xs text-white sm:text-left sm:text-sm">
            © 2026 Лотос 98 ООД. Всички права запазени.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-white sm:justify-end sm:text-sm"
            aria-label="Правна информация"
          >
            <a href={EXTERNAL.privacy} className="hover:underline">
              Политика за поверителност
            </a>
            <span className="text-white/35" aria-hidden>
              |
            </span>
            <a href={EXTERNAL.terms} className="hover:underline">
              Условия за ползване
            </a>
            <span className="text-white/35" aria-hidden>
              |
            </span>
            <a href={EXTERNAL.cookie} className="hover:underline">
              Бисквитки
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
