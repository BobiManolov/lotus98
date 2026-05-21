import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Галерия",
  description: `Страницата с проекти е в процес на изграждане — ${SITE.name}.`,
};

export default function GalleryPage() {
  return (
    <section className="flex min-h-[calc(100dvh-var(--site-header-h))] items-center justify-center px-4 py-16 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <span
          className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-900 text-3xl text-white shadow-sm ring-1 ring-brand-900/20"
          aria-hidden
        >
          🖼️
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Страницата с проекти е в процес на изграждане
        </h1>
        <p className="mt-4 text-lg text-muted">
          Очаквайте скоро реални снимки от наши обекти.
        </p>
        <Link
          href="/kontakti"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Свържете се с нас
        </Link>
      </div>
    </section>
  );
}
