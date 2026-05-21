import { SectionHeading } from "@/components/SectionHeading";

/** Placeholder layout for supplier certificate pages (images to be added later). */
export function CertificateSupplierPage({ title }: { title: string }) {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Тук ще бъдат добавени сертификатите на доставчика.
          </p>
        </div>
      </div>
      <section className="bg-[var(--background)] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            className="min-h-[14rem] rounded-2xl border border-dashed border-slate-200/90 bg-white/60 shadow-sm ring-1 ring-slate-900/[0.03] sm:min-h-[18rem]"
            aria-hidden
          />
        </div>
      </section>
    </>
  );
}
