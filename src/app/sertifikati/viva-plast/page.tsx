import type { Metadata } from "next";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import type { SupplierCertificateItem } from "@/components/SupplierCertificateGallery";
import { SupplierCertificateGallery } from "@/components/SupplierCertificateGallery";
import { SITE } from "@/content/site";

const INTRO =
  "Тук можете да разгледате сертификати, свързани със системите и профилите на Вива пласт, с които работим. Те удостоверяват съответствие с приложимите стандарти и допълват ангажимента ни към надеждни, проверени и качествени решения.";

const CERTIFICATES: readonly SupplierCertificateItem[] = [
  {
    src: "/certificates/viva-plast/iso-9001.png",
    label: "Сертификат ISO 9001:2008",
    alt: "Сертификат ISO 9001:2008 за управление на качеството — ВИАС ЕООД, Вива пласт",
  },
  {
    src: "/certificates/viva-plast/pvc-profiles.png",
    label: "Сертификат за PVC профили",
    alt: "Сертификат за PVC профили — съответствие с БДС EN за врати и прозорци",
  },
  {
    src: "/certificates/viva-plast/registration-horizontal.png",
    label: "Свидетелство за регистрация",
    alt: "Свидетелство за регистрация на търговска марка VIVA PLAST — OHIM",
    imageWidth: 1024,
    imageHeight: 720,
  },
];

export const metadata: Metadata = {
  title: "Сертификати – Вива пласт",
  description: `Сертификати Вива пласт — ISO 9001, PVC профили, регистрация на марка. ${SITE.name}.`,
};

export default function VivaPlastCertificatesPage() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Сертификати – Вива пласт
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
          <SupplierCertificateGallery items={CERTIFICATES} layout="twoThenOne" />
        </div>
      </section>
    </>
  );
}
