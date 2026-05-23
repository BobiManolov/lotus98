import type { Metadata } from "next";
import { CtaStrip } from "@/components/CtaStrip";
import { InnerPageHero } from "@/components/InnerPageHero";
import { FaqSection } from "@/components/FaqSection";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Често задавани въпроси",
  description: `Отговори на най-честите въпроси за PVC и алуминиева дограма, монтаж и гаранция — ${SITE.name}.`,
};

export default function FaqPage() {
  return (
    <>
      <InnerPageHero
        title="Често задавани въпроси"
        subtitle="Отговори на най-честите въпроси за нашите продукти, монтажния процес и фирмата."
      />
      <FaqSection />
      <CtaStrip variant="services" sectionClassName="bg-[#f8f9fa] py-14 sm:py-16" />
    </>
  );
}
