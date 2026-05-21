import type { Metadata } from "next";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import type { SupplierCertificateItem } from "@/components/SupplierCertificateGallery";
import { SupplierCertificateGallery } from "@/components/SupplierCertificateGallery";
import { SITE } from "@/content/site";

const INTRO =
  "На тази страница са представени сертификати, свързани със системите на Ленокс, които използваме в нашата работа. Те удостоверяват техническите характеристики, съответствието със стандартите и качеството на предлаганите алуминиеви решения.";

const CERTIFICATES: readonly SupplierCertificateItem[] = [
  {
    src: "/certificates/lenox/declaration.png",
    label: "Декларация за съответствие",
    alt: "Декларация за съответствие — Lenox Aluminium Systems, алуминиеви профили",
  },
  {
    src: "/certificates/lenox/calculation.png",
    label: "Технически сертификат – изчисление",
    alt: "Техническо изчисление на коефициент на топлопреминаване Uf по EN ISO 10077-2 — система Lenox LT60",
  },
  {
    src: "/certificates/lenox/technical-analysis.png",
    label: "Технически анализ",
    alt: "Термо-технически анализ на профилно сечение — Technoform Bautec",
  },
];

export const metadata: Metadata = {
  title: "Сертификати – Ленокс",
  description: `Сертификати Ленокс — декларация за съответствие, технически изчисления и анализ. ${SITE.name}.`,
};

export default function LenoxCertificatesPage() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Сертификати – Ленокс
          </SectionHeading>
          <p
            className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}
          >
            {INTRO}
          </p>
        </div>
      </div>

      <section className="bg-[var(--background)] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SupplierCertificateGallery items={CERTIFICATES} layout="twoThenOne" secondRowWidth="narrow" />
        </div>
      </section>
    </>
  );
}
