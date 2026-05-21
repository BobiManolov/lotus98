import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PVC калкулатор",
  description: "Ориентировъчно изчисление за PVC дограма.",
};

export default function PvcKalkulatorPage() {
  return (
    <section className="border-t border-slate-200/80 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-8 shadow-sm ring-1 ring-slate-900/[0.04] sm:p-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">PVC Калкулатор</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">Калкулаторът ще бъде наличен скоро.</p>
        </div>
      </div>
    </section>
  );
}
