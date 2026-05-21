export type ProductDetailPage = {
  slug: string;
  title: string;
  description: string;
  placeholder: string;
};

export const PRODUCT_DETAIL_PAGES: readonly ProductDetailPage[] = [
  {
    slug: "pvc-dograma",
    title: "PVC дограма",
    description: "Решения за PVC дограма от Лотос 98 ООД.",
    placeholder: "Информация за този продукт ще бъде добавена скоро.",
  },
  {
    slug: "aluminieva-dograma",
    title: "Алуминиева дограма",
    description: "Решения за алуминиева дограма от Лотос 98 ООД.",
    placeholder: "Подробно описание на продукта предстои.",
  },
  {
    slug: "staklopaketi",
    title: "Стъклопакети",
    description: "Решения за стъклопакети от Лотос 98 ООД.",
    placeholder: "Информация за този продукт ще бъде добавена скоро.",
  },
  {
    slug: "komarnitsi",
    title: "Комарници",
    description: "Решения за комарници от Лотос 98 ООД.",
    placeholder: "Подробно описание на продукта предстои.",
  },
  {
    slug: "pervazi-i-kozirki",
    title: "Первази и козирки",
    description: "Решения за первази и козирки от Лотос 98 ООД.",
    placeholder: "Информация за този продукт ще бъде добавена скоро.",
  },
  {
    slug: "vatreshni-shtori",
    title: "Вътрешни щори",
    description: "Решения за вътрешни щори от Лотос 98 ООД.",
    placeholder: "Подробно описание на продукта предстои.",
  },
] as const;

export function getProductDetailBySlug(slug: string) {
  return PRODUCT_DETAIL_PAGES.find((item) => item.slug === slug);
}
