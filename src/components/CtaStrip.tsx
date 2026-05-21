import Link from "next/link";
import { CTA_STRIP } from "@/content/site";

type CtaStripProps = {
  variant?: "default" | "services";
  sectionClassName?: string;
};

export function CtaStrip({ variant = "default", sectionClassName }: CtaStripProps) {
  const isServices = variant === "services";

  return (
    <section className={sectionClassName ?? "bg-white py-14 sm:py-16"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/90 bg-gradient-to-r from-slate-100 via-[#eef4f7] to-[#e8f1f5] p-7 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-9 lg:p-10">
          <div
            className={[
              "pointer-events-none absolute inset-0 bg-cover bg-no-repeat",
              isServices ? "bg-right-center opacity-[0.42]" : "bg-center opacity-[0.16]",
            ].join(" ")}
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80')",
            }}
            aria-hidden
          />
          <div
            className={[
              "pointer-events-none absolute inset-0",
              isServices
                ? "bg-gradient-to-r from-white/93 via-white/82 to-white/62"
                : "bg-gradient-to-r from-white/88 via-white/84 to-white/90",
            ].join(" ")}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-[58%] bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.22),rgba(148,163,184,0.06)_40%,transparent_72%)]" />
          <div className="pointer-events-none absolute -right-8 bottom-[-58%] h-64 w-64 rounded-full border border-slate-300/40 opacity-55" />
          <div className="pointer-events-none absolute right-[22%] top-[-36%] h-56 w-56 rounded-full border border-slate-300/30 opacity-45" />

          <div className="relative z-10 flex flex-col items-start gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xl font-semibold leading-snug text-slate-900 sm:text-2xl">{CTA_STRIP.text}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">{CTA_STRIP.sub}</p>
            </div>
            <Link
              href="/kontakti"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              За запитване
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
