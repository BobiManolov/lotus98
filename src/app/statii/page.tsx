import type { Metadata } from "next";
import { ComingSoonPlaceholder } from "@/components/ComingSoonPlaceholder";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: "Статии",
  description: `Статии — в процес на изграждане — ${SITE.name}.`,
};

export default function ArticlesPage() {
  return (
    <ComingSoonPlaceholder
      icon="📄"
      title="Статиите са в процес на изграждане"
      subtitle="Очаквайте скоро полезни съвети и информация."
    />
  );
}
