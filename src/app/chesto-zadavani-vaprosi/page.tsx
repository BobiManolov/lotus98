import type { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ComingSoonPlaceholder";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Често задавани въпроси",
  description: `Често задавани въпроси — в процес на изграждане — ${SITE.name}.`,
};

export default function FaqPage() {
  return (
    <ComingSoonPlaceholder
      icon="❓"
      title="Често задаваните въпроси са в процес на изграждане"
      subtitle="Очаквайте скоро отговори на най-честите въпроси."
    />
  );
}
