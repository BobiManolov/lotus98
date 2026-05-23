import { PRODUCT_CATEGORIES } from "@/content/site";

export const PRICES_OVERVIEW_SUBTITLE = "Разгледайте ориентировъчни цени по категории";

export type PricesPlaceholderRow = { name: string; price: string };

const PRICES_HREF_OVERRIDES: Record<string, string> = {
  komarnitsi: "/prices/komarnici#kalkulator",
};

const PRICES_CARD_ORDER = [
  "pvc-dograma",
  "al-dograma",
  "staklopaketi",
  "komarnitsi",
  "pervazi",
  "shtori",
];

/** Cards on /prices — same slugs as product images for ProductCategoryCard. */
export function getPricesCategoriesForCards() {
  return PRODUCT_CATEGORIES.map((c) => ({
    slug: c.slug,
    title: c.title,
    short: c.short,
    href: PRICES_HREF_OVERRIDES[c.slug] ?? `/prices/${c.slug}`,
  })).sort((a, b) => {
    const ai = PRICES_CARD_ORDER.indexOf(a.slug);
    const bi = PRICES_CARD_ORDER.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

const DEFAULT_ROWS: PricesPlaceholderRow[] = [
  { name: "Еднокрилен прозорец", price: "от 250 лв." },
  { name: "Двукрилен прозорец", price: "от 420 лв." },
  { name: "Балконска врата", price: "от 580 лв." },
  { name: "Тристъклен стъклопакет (ориентир)", price: "от 95 лв./м²" },
];

const CATEGORY_COPY: Record<
  string,
  { heroDescription: string; rows: PricesPlaceholderRow[] }
> = {
  "pvc-dograma": {
    heroDescription:
      "Ориентировъчни цени за PVC прозорци и балконски врати — според размер, профил и стъклопакет.",
    rows: DEFAULT_ROWS,
  },
  "al-dograma": {
    heroDescription:
      "Ориентировъчни цени за алуминиеви системи с долно водене — за тераси, лоджии и прегради.",
    rows: [
      { name: "Плъзгаща се система (ориентир)", price: "от 680 лв./м²" },
      { name: "Двупосочно отваряне", price: "от 820 лв./м²" },
      { name: "Допълнителна мрежа срещу насекоми", price: "от 120 лв." },
    ],
  },
  komarnitsi: {
    heroDescription: "Ориентировъчни цени за комарници по тип и размер на отвора.",
    rows: [
      { name: "Статичен комарник", price: "от 85 лв./м²" },
      { name: "Ролетен комарник", price: "от 140 лв./м²" },
      { name: "Плисе система", price: "от 160 лв./м²" },
    ],
  },
  staklopaketi: {
    heroDescription: "Ориентировъчни цени за стъклопакети и стъкла — по вид и изолационни параметри.",
    rows: [
      { name: "Двустъклен стъклопакет", price: "от 75 лв./м²" },
      { name: "Тристъклен стъклопакет", price: "от 95 лв./м²" },
      { name: "Закалено стъкло", price: "от 120 лв./м²" },
    ],
  },
  shtori: {
    heroDescription: "Ориентировъчни цени за вътрешни венециански щори за PVC дограма.",
    rows: [
      { name: "Щора за стандартен прозорец", price: "от 95 лв." },
      { name: "Щора за голям отвор", price: "от 140 лв." },
      { name: "Кордови водачи и аксесоари", price: "от 25 лв." },
    ],
  },
  pervazi: {
    heroDescription: "Ориентировъчни цени за первази, подпрозоречни поли и козирки.",
    rows: [
      { name: "PVC перваз", price: "от 12 лв./м" },
      { name: "Алуминиев перваз", price: "от 18 лв./м" },
      { name: "Козирка (ориентир)", price: "от 85 лв." },
    ],
  },
};

export function getPricesCategoryDetail(slug: string) {
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return null;
  const extra = CATEGORY_COPY[slug];
  return {
    ...category,
    heroDescription: extra?.heroDescription ?? category.short,
    rows: extra?.rows ?? DEFAULT_ROWS,
  };
}
