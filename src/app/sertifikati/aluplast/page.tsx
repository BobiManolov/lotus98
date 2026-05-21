import type { Metadata } from "next";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import type { SupplierCertificateItem } from "@/components/SupplierCertificateGallery";
import { SupplierCertificateGallery } from "@/components/SupplierCertificateGallery";
import { SITE } from "@/content/site";

const INTRO =
  "На тази страница можете да разгледате сертификатите, удостоверяващи качеството, произхода и оторизацията на системите Aluplast, с които работим. Те потвърждават съответствието с утвърдени стандарти и ангажимента ни към надеждни и сертифицирани решения.";

const CERTIFICATES: readonly SupplierCertificateItem[] = [
  {
    src: "/certificates/aluplast/authorization.png",
    label: "Certificate of Authorization",
    alt: "Aluplast Certificate of Authorization за Lotos 98 Ltd",
  },
  {
    src: "/certificates/aluplast/garantie.png",
    label: "Garantie-Zertifikat",
    alt: "Aluplast Garantie-Zertifikat за Lotos 98 Ltd",
  },
  {
    src: "/certificates/aluplast/bsi-1.png",
    label: "BSI Certificate – стр. 1",
    alt: "BSI Certificate of Registration ISO 9001 — Aluplast GmbH, страница 1",
  },
  {
    src: "/certificates/aluplast/bsi-2.png",
    label: "BSI Certificate – стр. 2",
    alt: "BSI Certificate of Registration — локации и дейности, страница 2",
  },
];

export const metadata: Metadata = {
  title: "Сертификати – Aluplast",
  description: `Сертификати Aluplast — BSI, гаранция и оторизация. ${SITE.name}.`,
};

export default function AluplastCertificatesPage() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Сертификати – Aluplast
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
          <SupplierCertificateGallery items={CERTIFICATES} />
        </div>
      </section>
    </>
  );
}
