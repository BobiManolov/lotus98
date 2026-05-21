import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeading, sectionAfterHeadingSpacing } from "@/components/SectionHeading";
import { getProductDetailBySlug, PRODUCT_DETAIL_PAGES } from "@/content/productDetailPages";
import { EXTERNAL, SITE } from "@/content/site";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCT_DETAIL_PAGES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProductDetailBySlug(slug);
  if (!detail) {
    return {
      title: "Продукт",
      description: `Продуктова страница от ${SITE.name}.`,
    };
  }
  return {
    title: `${detail.title} | Продукти`,
    description:
      slug === "pvc-dograma"
        ? `PVC дограма — предимства, цени, измерване и избор на отваряемост. ${SITE.name}.`
        : slug === "aluminieva-dograma"
          ? `Алуминиева дограма — термомост, приложения, цени и избор на система. ${SITE.name}.`
          : slug === "staklopaketi"
            ? `Стъклопакети — видове стъкла, коефициенти, дебелини и избор според нуждите. ${SITE.name}.`
            : slug === "komarnitsi"
              ? `Комарници — видове, предимства, практични насоки и важно при поръчка. ${SITE.name}.`
              : slug === "pervazi-i-kozirki"
                ? `Первази и козирки — вътрешни и външни решения, планиране и практични насоки за монтаж. ${SITE.name}.`
                : slug === "vatreshni-shtori"
                  ? `Вътрешни щори — хоризонтални щори, комфорт, контрол на светлината и подходящи решения за дом и офис. ${SITE.name}.`
        : `${detail.description} ${SITE.name}.`,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const detail = getProductDetailBySlug(slug);
  if (!detail) notFound();

  const isPvcPage = slug === "pvc-dograma";
  const isAlPage = slug === "aluminieva-dograma";
  const isGlassPage = slug === "staklopaketi";
  const isMosquitoPage = slug === "komarnitsi";
  const isSillsPage = slug === "pervazi-i-kozirki";
  const isBlindsPage = slug === "vatreshni-shtori";

  if (!isPvcPage && !isAlPage && !isGlassPage && !isMosquitoPage && !isSillsPage && !isBlindsPage) {
    return (
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            as="h1"
            align="start"
            titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {detail.title}
          </SectionHeading>
          <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
            {detail.placeholder}
          </p>
          <Link href="/produkti" className="mt-8 inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
            Към всички продукти →
          </Link>
        </div>
      </section>
    );
  }

  if (isAlPage) {
    return (
      <>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading
                as="h1"
                align="start"
                titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Алуминиева дограма
              </SectionHeading>
              <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
                Алуминиевата дограма е отлично решение, когато са нужни висока здравина, дълъг експлоатационен живот и
                елегантна визия. Тя е подходяща както за жилищни и офис пространства, така и за търговски обекти,
                вътрешни преграждания и специализирани решения според конкретното приложение.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване за оферта
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
              <Image
                src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&w=1600&q=82"
                alt="Модерна сграда с алуминиева дограма"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Какво представлява алуминиевата дограма</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
                <p>
                  Алуминиевата дограма съчетава много добра здравина, устойчивост на климатични условия и минимална
                  поддръжка. Използва се там, където има по-високи изисквания към стабилност и дълъг експлоатационен
                  живот.
                </p>
                <p>
                  При алуминиевите системи изработката и монтажът трябва да бъдат прецизни, а обковът обикновено е
                  нерегулируем. Затова качеството на профила и доброто оразмеряване са решаващи.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Предимства на алуминиевата дограма</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div>
                  <p className="text-base leading-relaxed text-slate-700">
                    Алуминиевата дограма е отличен избор, когато търсите здравина, дълъг живот и модерна визия.
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Много висока здравина и устойчивост</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Дълъг експлоатационен живот</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Устойчивост на влага, корозия и атмосферни влияния</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Минимална поддръжка</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Подходяща за големи отвори и сложни конструкции</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Елегантна и модерна визия</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Възможност за прахово боядисване по RAL</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Възможност за различни метални покрития</li>
                  </ul>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=82"
                    alt="Съвременна фасада с алуминиеви профили"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Термомост или студен профил</h2>
              <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="flex h-full flex-col rounded-3xl border border-emerald-200/75 bg-emerald-50/45 p-6 shadow-[0_12px_30px_rgba(0,180,120,0.12)] ring-1 ring-emerald-400/10 transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_14px_34px_rgba(0,180,120,0.16)] sm:p-7">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/20" aria-hidden />
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700/80">
                    ПРЕПОРЪЧИТЕЛНО ЗА ЖИЛИЩА
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Алуминий с термомост</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />Подходящ за външна дограма</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />По-добра топлоизолация</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />По-висок комфорт</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />По-висока цена</li>
                  </ul>
                </div>
                <div className="flex h-full flex-col rounded-3xl border border-sky-200/75 bg-sky-50/45 p-6 shadow-[0_12px_30px_rgba(0,120,255,0.12)] ring-1 ring-sky-400/10 transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-[0_14px_34px_rgba(0,120,255,0.16)] sm:p-7">
                  <div className="h-8 w-8 rounded-full bg-sky-500/15 ring-1 ring-sky-500/20" aria-hidden />
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700/75">
                    ПОДХОДЯЩО ЗА ВЪТРЕШНИ РЕШЕНИЯ
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Студен алуминиев профил</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />Подходящ за вътрешни помещения</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />По-ниска цена</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />Без топлоизолация</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />Използва се за бани, прегради и тераси</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Какво е важно при избора</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=82"
                    alt="Фасадна алуминиева система"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 24vw"
                  />
                </div>
                <div className="space-y-3 text-base leading-relaxed text-slate-700">
                  <p>При избора на алуминиева дограма е важно да се обърне внимание на:</p>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li>- дали профилът е с термомост</li>
                    <li>- дебелината на профила</li>
                    <li>- качеството на обкова</li>
                  </ul>
                  <p>
                    По-евтините решения често правят компромис с качеството, което може да доведе до деформации или
                    проблеми при експлоатация.
                  </p>
                </div>
              </div>
            </article>

            <aside className="rounded-3xl border border-accent/25 bg-accent/5 p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Важно при външна алуминиева дограма</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Алуминият е добър проводник на температура. При висока влажност и големи температурни разлики може да се
                образува конденз. Затова за жилища и офиси е препоръчително използването на профили с прекъснат термомост.
              </p>
            </aside>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Къде е подходяща</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {["Жилища и офиси", "Търговски обекти", "Фасадни решения", "Вътрешни прегради", "Врати за бани", "Неотопляеми тераси"].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm font-medium text-slate-800 sm:text-base">
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Врати за бани и вътрешни решения</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-start">
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Алуминиевите профили без прекъснат термомост се използват много често за врати за бани и други
                    вътрешни помещения, където има висока влажност. Те са практични, устойчиви на влага и лесни за
                    поддръжка.
                  </p>
                  <p>
                    Подходящи са и за вътрешни преграждания, както и за някои търговски решения, при които няма нужда от
                    висока топлоизолация, но се търси здравина и надеждност.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82"
                    alt="Офисно алуминиево преграждане"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 24vw"
                  />
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Цени на алуминиева дограма</h2>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                <li>- Вид профил (с или без термомост)</li>
                <li>- Размери и конфигурация</li>
                <li>- Остъкляване</li>
                <li>- Цвят и покритие</li>
                <li>- Обков</li>
                <li>- Монтаж</li>
              </ul>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Профилите с термомост са по-скъпи, но са правилният избор за външна дограма. Студените профили са
                по-достъпни и подходящи за вътрешни решения.
              </p>
              <a
                href={EXTERNAL.prices}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Цени
              </a>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src="https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1600&q=82"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от алуминиева дограма?</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Свържете се с нас за консултация, ориентировъчна цена или изготвяне на конкретна оферта според Вашите
                  размери, приложение и изисквания.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kontakti"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Запитване за оферта
                  </Link>
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Към всички продукти →
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isGlassPage) {
    const glazingPriorityItems = [
      { title: "Топлоизолация", text: "По-ниските топлинни загуби носят повече комфорт" },
      { title: "Шумоизолация", text: "Подходящата комбинация от стъкла намалява шума" },
      { title: "Слънцезащита", text: "Различните покрития влияят на прегряването" },
      { title: "Светлопропускливост", text: "Баланс между естествена светлина и защита" },
    ] as const;

    const glassTypes = [
      {
        title: "Нискоемисионно (Ка) стъкло",
        text: "Ка стъклото се поставя от вътрешната страна на стъклопакета и отразява топлинните лъчи обратно към помещението. Това намалява загубите на топлина и подобрява топлоизолационните качества.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
        alt: "Прозорец с нискоемисионно стъкло",
      },
      {
        title: "Високоенергийно (четири сезона) стъкло",
        text: "Четири сезонното стъкло ограничава прегряването през лятото и същевременно подпомага добрата изолация през зимата. Подходящо е за изложени на слънце помещения и модерни жилищни решения.",
        image: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&w=1200&q=82",
        alt: "Слънчево изложение с четири сезонно стъкло",
      },
      {
        title: "Цветни стъкла",
        text: "Цветните стъкла могат да променят визията и светлопропускането, но трябва да се избират внимателно според конкретното приложение и нуждите на помещението.",
        image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=82",
        alt: "Фасада с цветни остъклявания",
      },
    ] as const;

    const ornamentalOptions = [
      { name: "Матирано", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=82" },
      { name: "Структурно", image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=82" },
      { name: "Лентово", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=900&q=82" },
      { name: "Декоративно", image: "https://images.unsplash.com/photo-1616594039964-3e6b1f3b0d52?auto=format&fit=crop&w=900&q=82" },
    ] as const;

    const metrics = [
      {
        code: "Ug",
        title: "Топлопреминаване",
        text: "Коефициент на топлопреминаване. Колкото е по-нисък, толкова по-добра е топлоизолацията.",
      },
      {
        code: "Rw",
        title: "Шумоизолация",
        text: "Показател за шумоизолация. По-високата стойност означава по-добро намаляване на шума.",
      },
      {
        code: "UV",
        title: "Ултравиолетови лъчи",
        text: "Преминаване на ултравиолетови лъчи, влияещо върху избледняването на мебели и настилки.",
      },
      {
        code: "Соларен фактор",
        title: "Контрол на слънчевата енергия",
        text: "Показва каква част от слънчевата енергия преминава през стъклото и влияе върху прегряването.",
      },
    ] as const;

    return (
      <>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading as="h1" align="start" titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Стъклопакети
              </SectionHeading>
              <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
                Стъклопакетът има ключова роля за топлоизолацията, шумоизолацията и комфорта в помещението. Правилният
                избор на стъкла, въздушни камери и покрития може да подобри значително поведението на дограмата през
                всички сезони.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване за оферта
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
              <Image
                src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=1600&q=82"
                alt="Модерен прозорец с качествен стъклопакет"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Какво е важно при избора</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                При стъклопакета водещ е общият баланс между изолация, светлина, защита и удобство в ежедневното
                използване.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {glazingPriorityItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Основни видове стъкла</h2>
              <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {glassTypes.map((item) => (
                  <div key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="relative aspect-[16/10]">
                      <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">С две или три стъкла</h2>
              <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="flex h-full cursor-pointer flex-col rounded-3xl border border-sky-200/75 bg-sky-50/45 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)] ring-1 ring-sky-400/10 transition-all duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.01] motion-safe:hover:border-sky-300/90 motion-safe:hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] motion-safe:hover:ring-sky-400/20 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700/75">ПОПУЛЯРЕН ИЗБОР</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Двоен стъклопакет</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />По-разпространено решение</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />Добър баланс между цена и изолация</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />Подходящо за много стандартни приложения</li>
                  </ul>
                </div>
                <div className="flex h-full cursor-pointer flex-col rounded-3xl border border-emerald-200/75 bg-emerald-50/45 p-6 shadow-[0_8px_20px_rgba(0,0,0,0.06)] ring-1 ring-emerald-400/10 transition-all duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.01] motion-safe:hover:border-emerald-300/90 motion-safe:hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] motion-safe:hover:ring-emerald-400/20 sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700/80">ЗА ПО-ВИСОКИ ИЗИСКВАНИЯ</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">Троен стъклопакет</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />По-добра топло- и шумоизолация</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />По-висок комфорт</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />Подходящ за по-високи изисквания към енергийна ефективност</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-slate-700 sm:text-base">
                Когато се използват три стъкла, е добре общата дебелина да бъде съобразена така, че да има достатъчно
                въздушни междини и добри изолационни качества.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Дебелина на стъклото и стъклопакета</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=82"
                    alt="Детайл на многослоен стъклопакет"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 24vw"
                  />
                </div>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Дебелината на стъклото и общата дебелина на стъклопакета влияят върху шумоизолацията, здравината и
                    общото поведение на системата. По-дебелите стъкла могат да подобрят устойчивостта и акустичния
                    комфорт, но увеличават тежестта. При избора трябва да се търси правилен баланс между изолация,
                    конструкция и приложение.
                  </p>
                  <p>
                    При много големи остъклявания натоварванията върху профилите и обкова се увеличават. Затова
                    конфигурацията винаги трябва да се съобразява с размерите и предназначението.
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />4 мм стъкло е стандартно решение в много случаи</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />По-голямата дебелина може да подобри определени показатели</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Общата конфигурация е по-важна от единичния параметър</li>
                  </ul>
                </div>
              </div>
            </article>

            <aside className="rounded-3xl border border-accent/25 bg-accent/5 p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
              <h2 className="text-xl font-bold tracking-tight text-slate-900">Аргон</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700">
                Пълненето с аргон може да подобри топлоизолационните характеристики на стъклопакета. Реалният ефект
                зависи от цялостната конфигурация на системата, а не само от един отделен елемент. Най-добрият резултат
                идва от правилната комбинация между стъкла, покрития, камери и монтаж.
              </p>
            </aside>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Орнаментни стъкла</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                Орнаментните стъкла са добро решение, когато е нужна повече дискретност, без да се губи изцяло
                естествената светлина. Подходящи са за бани, врати, санитарни помещения и други интериорни приложения.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {ornamentalOptions.map((option) => (
                  <div key={option.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="relative aspect-[4/3]">
                      <Image src={option.image} alt={`Орнаментно стъкло ${option.name}`} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 22vw" />
                    </div>
                    <p className="px-4 py-3 text-sm font-medium text-slate-800">{option.name}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Основни показатели</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric.code} className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{metric.code}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{metric.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{metric.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200">
                <div className="grid grid-cols-2 gap-px bg-slate-200 text-sm sm:grid-cols-4">
                  <div className="bg-slate-50 px-4 py-3 font-semibold text-slate-700">Показател</div>
                  <div className="bg-slate-50 px-4 py-3 font-semibold text-slate-700">Примерна стойност</div>
                  <div className="bg-slate-50 px-4 py-3 font-semibold text-slate-700">Какво означава</div>
                  <div className="bg-slate-50 px-4 py-3 font-semibold text-slate-700">Насока</div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-200 text-sm sm:grid-cols-4">
                  <div className="bg-white px-4 py-3 text-slate-800">Ug</div>
                  <div className="bg-white px-4 py-3 text-slate-700">1.1 W/m2K</div>
                  <div className="bg-white px-4 py-3 text-slate-700">Топлинни загуби през стъклото</div>
                  <div className="bg-white px-4 py-3 text-slate-700">По-ниско = по-добре</div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-200 text-sm sm:grid-cols-4">
                  <div className="bg-white px-4 py-3 text-slate-800">Rw</div>
                  <div className="bg-white px-4 py-3 text-slate-700">34-42 dB</div>
                  <div className="bg-white px-4 py-3 text-slate-700">Ниво на шумоизолация</div>
                  <div className="bg-white px-4 py-3 text-slate-700">По-високо = по-добре</div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-200 text-sm sm:grid-cols-4">
                  <div className="bg-white px-4 py-3 text-slate-800">UV</div>
                  <div className="bg-white px-4 py-3 text-slate-700">0-30%</div>
                  <div className="bg-white px-4 py-3 text-slate-700">UV лъчи към интериора</div>
                  <div className="bg-white px-4 py-3 text-slate-700">По-ниско = повече защита</div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-200 text-sm sm:grid-cols-4">
                  <div className="bg-white px-4 py-3 text-slate-800">Соларен фактор</div>
                  <div className="bg-white px-4 py-3 text-slate-700">35-60%</div>
                  <div className="bg-white px-4 py-3 text-slate-700">Слънчева енергия в помещението</div>
                  <div className="bg-white px-4 py-3 text-slate-700">Според изложението</div>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Подходящ избор според нуждите</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За по-добра топлоизолация</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Ка стъкло или троен стъклопакет</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За по-добра шумоизолация</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Комбинация от различни стъкла и подходяща дебелина</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За слънчеви изложения</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Четири сезонно стъкло</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За повече дискретност</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Орнаментно стъкло</p>
                </div>
              </div>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=82"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от стъклопакети?</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Свържете се с нас за консултация, избор на подходящ стъклопакет и ориентировъчна оферта според Вашите
                  изисквания.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kontakti"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Запитване за оферта
                  </Link>
                  <a
                    href={EXTERNAL.prices}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                  >
                    Цени
                  </a>
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Към всички продукти →
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isMosquitoPage) {
    const mosquitoTypes = [
      {
        title: "Статични комарници",
        text: "Подходящи за стандартни прозорци с външен достъп.",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1000&q=82",
      },
      {
        title: "Комарници на панти",
        text: "Удобни за врати и често използвани отвори.",
        image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1000&q=82",
      },
      {
        title: "Ролетни комарници",
        text: "Гъвкаво решение - могат да се вдигат и свалят.",
        image: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1000&q=82",
      },
      {
        title: "Комарници плисе",
        text: "Модерен вариант за големи отвори и врати.",
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=82",
      },
    ] as const;

    return (
      <>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading as="h1" align="start" titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Комарници
              </SectionHeading>
              <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
                Комарниците са удобно и практично решение за защита от насекоми, без да ограничават проветряването и
                светлината. Те са подходящи за прозорци и врати и могат да бъдат изработени в различни варианти според
                нуждите на всеки дом.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kalkulator-komarnitsi"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                >
                  Калкулатор за комарници
                </Link>
              </div>
              <Link href="/kontakti" className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Запитване за оферта →
              </Link>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=82"
                alt="Прозорец с комарник в модерен дом"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Предимства на комарниците</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
                <div>
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Защита от комари и насекоми</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Свободно проветряване</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Лесна поддръжка</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Устойчиви алуминиеви рамки</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Подходящи за прозорци и врати</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Различни варианти според нуждите</li>
                  </ul>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                  <Image
                    src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=82"
                    alt="Балконска врата с комарник"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 28vw"
                  />
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Видове комарници</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {mosquitoTypes.map((item) => (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Как да изберете подходящ вариант</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За прозорци</h3>
                  <p className="mt-2 text-sm text-slate-700">Статични</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За врати</h3>
                  <p className="mt-2 text-sm text-slate-700">Панти / Плисе</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За удобство</h3>
                  <p className="mt-2 text-sm text-slate-700">Ролетни</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За големи отвори</h3>
                  <p className="mt-2 text-sm text-slate-700">Плисе</p>
                </div>
              </div>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-sky-200/70 bg-gradient-to-br from-sky-50/85 via-white to-blue-50/60 p-6 shadow-sm ring-1 ring-sky-400/10 sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sky-200/40 blur-2xl" aria-hidden />
              <div className="relative">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Калкулатор за комарници</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Можете сами да изчислите ориентировъчната цена на комарниците според размерите и избрания тип. Това е
                  най-бързият начин да получите представа за цената преди да направите запитване.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <Link
                    href="/kalkulator-komarnitsi"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Изчисли цена
                  </Link>
                  <p className="text-sm font-medium text-slate-600">Без ангажимент</p>
                </div>
              </div>
            </section>

            <aside id="vnimanie-pri-porachka" className="rounded-3xl border border-amber-300/50 bg-amber-50/70 p-6 shadow-sm ring-1 ring-amber-400/15 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Внимание при поръчка</h2>
              <ul className="mt-5 divide-y divide-amber-200/70 overflow-hidden rounded-2xl border border-amber-200/70 bg-white/75">
                <li className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">!</span>
                  <span>
                    <strong className="font-semibold text-slate-900">Ако има външни щори</strong> - може да пречат на
                    монтажа
                  </span>
                </li>
                <li className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">!</span>
                  <span>
                    <strong className="font-semibold text-slate-900">Ако има решетки</strong> - може да блокират
                    поставянето
                  </span>
                </li>
                <li className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">!</span>
                  <span>
                    <strong className="font-semibold text-slate-900">Ако има външни дръжки</strong> - изисква се
                    специално решение
                  </span>
                </li>
                <li className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">!</span>
                  <span>
                    <strong className="font-semibold text-slate-900">Ако дограмата е стара</strong> - монтажът може да е
                    труден
                  </span>
                </li>
                <li className="flex gap-3 px-4 py-3 text-sm leading-relaxed text-slate-700 sm:px-5 sm:py-4 sm:text-base">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-900">!</span>
                  <span>
                    <strong className="font-semibold text-slate-900">Ако касата е скрита</strong> - монтажът се усложнява
                  </span>
                </li>
              </ul>
            </aside>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Какво да направите</h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70">
                <ol className="grid divide-y divide-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                  <li className="p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-slate-900">Свържете се с нас</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">Ще преценим най-доброто решение</p>
                  </li>
                  <li className="p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-slate-900">Предлагаме алтернативи</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">Плисе или ролетни системи</p>
                  </li>
                  <li className="p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-slate-900">Индивидуален подход</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">Съобразено с конкретната ситуация</p>
                  </li>
                </ol>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Поддръжка</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                Комарниците не изискват специална поддръжка. Достатъчно е периодично почистване, за да останат в добро
                състояние.
              </p>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=82"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/74 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от комарници?</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Свържете се с нас за консултация и избор на най-подходящото решение.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kontakti"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Запитване за оферта
                  </Link>
                  <a
                    href={EXTERNAL.prices}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                  >
                    Цени
                  </a>
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Към всички продукти →
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isBlindsPage) {
    const advantageCards = [
      { title: "Контрол на светлината", text: "Регулирате количеството светлина" },
      { title: "Комфорт", text: "Създават уютна атмосфера" },
      { title: "Практичност", text: "Лесни за употреба" },
      { title: "Издръжливост", text: "Дълъг експлоатационен живот" },
      { title: "Разнообразие", text: "Много цветове и варианти" },
      { title: "Подходящи за различни помещения", text: "От дома до офиса" },
    ] as const;

    return (
      <>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading as="h1" align="start" titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Вътрешни щори
              </SectionHeading>
              <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
                Вътрешните щори са практично и елегантно решение за контрол на светлината и уюта в помещението. Те
                позволяват лесно регулиране на осветеността и създават комфортна атмосфера във всеки дом или офис.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване за оферта
                </Link>
              </div>
              <Link href="/kontakti" className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Запитване за оферта →
              </Link>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=82"
                alt="Модерен интериор с прозорец и вътрешни щори"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Хоризонтални щори (Макси стандарт)</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-slate-200/80 sm:min-h-[340px]">
                  <Image
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=82"
                    alt="Интериор с хоризонтални щори"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                  />
                </div>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Хоризонталните щори са едно от най-популярните решения за вътрешни пространства. Те съчетават
                    практичност, издръжливост и елегантна визия.
                  </p>
                  <p>
                    Алуминиевият профил прилепва добре към дограмата, а ламелите позволяват прецизен контрол на
                    светлината.
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Лесно управление</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Прецизен контрол на светлината</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Подходящи за PVC и алуминиева дограма</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Компактни и удобни</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Различни цветове</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Предимства на вътрешните щори</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {advantageCards.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Управление и функционалност</h2>
              <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:divide-x lg:divide-slate-200/60">
                <div className="flex flex-1 flex-col items-center text-center lg:min-w-0 lg:px-6 first:lg:pl-0">
                  <span className="text-slate-500" aria-hidden>
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <line x1="6" y1="7" x2="18" y2="7" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="10" y1="17" x2="14" y2="17" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">Лесно управление</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">Механизмът позволява бързо и удобно регулиране</p>
                </div>
                <div className="flex flex-1 flex-col items-center text-center lg:min-w-0 lg:px-6">
                  <span className="text-slate-500" aria-hidden>
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="4" />
                      <line x1="12" y1="2.5" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="21.5" />
                      <line x1="2.5" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="21.5" y2="12" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">Контрол на светлината</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">Регулирате ъгъла на ламелите според нуждите</p>
                </div>
                <div className="flex flex-1 flex-col items-center text-center lg:min-w-0 lg:px-6">
                  <span className="text-slate-500" aria-hidden>
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <polyline points="8,8 4,12 8,16" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <polyline points="16,8 20,12 16,16" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">Гъвкав монтаж</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">Управлението може да бъде от ляво или дясно</p>
                </div>
                <div className="flex flex-1 flex-col items-center text-center lg:min-w-0 lg:px-6 last:lg:pr-0">
                  <span className="text-slate-500" aria-hidden>
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 20s-6-3.7-6-8a3.5 3.5 0 0 1 6-2.4A3.5 3.5 0 0 1 18 12c0 4.3-6 8-6 8z" />
                    </svg>
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">Комфорт в ежедневието</h3>
                  <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-slate-600">Създавате идеална светлина във всяка ситуация</p>
                </div>
              </div>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=82"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/74 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от вътрешни щори?</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Свържете се с нас за консултация и избор на най-подходящото решение за Вашето пространство.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kontakti"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Запитване за оферта
                  </Link>
                  <a
                    href={EXTERNAL.prices}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                  >
                    Цени
                  </a>
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Към всички продукти →
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isSillsPage) {
    return (
      <>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
            <div>
              <SectionHeading as="h1" align="start" titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Первази и козирки
              </SectionHeading>
              <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
                Первазите и козирките са важен завършващ елемент към прозорците и вратите. Те имат както практична, така
                и естетическа функция - предпазват стените, отвеждат водата и допринасят за завършения вид на отвора.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={EXTERNAL.prices}
                  className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Цени
                </a>
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                >
                  Запитване за оферта
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
              <Image
                src="https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1600&q=82"
                alt="Детайл на прозорец с перваз и фасадна защита"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent" aria-hidden />
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Вътрешни и външни решения</h2>
              <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-3xl border border-sky-200/75 bg-sky-50/45 p-6 ring-1 ring-sky-400/10 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">Вътрешни первази</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />Завършват отвора от вътрешната страна</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />Предпазват стената от прах и евентуален конденз</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />Допринасят за по-завършен интериорен вид</li>
                  </ul>
                </div>
                <div className="rounded-3xl border border-emerald-200/75 bg-emerald-50/45 p-6 ring-1 ring-emerald-400/10 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">Външни первази и козирки</h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base">
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />Предпазват фасадата от стичаща се вода</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />Подобряват отвеждането на водата</li>
                    <li className="flex gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />Подходящи са за по-добра защита на външната стена</li>
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Вътрешни PVC первази</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200/80 sm:min-h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=82"
                    alt="Вътрешен PVC перваз"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 32vw"
                  />
                </div>
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Вътрешните PVC первази завършват прозоречния отвор от вътрешната страна и предпазват стената от прах
                    и евентуален конденз. Те се изработват в различни ширини според конкретния отвор и могат да бъдат
                    съобразени с нуждите на помещението.
                  </p>
                  <p>
                    В практиката често се използва и терминът подпрозоречни поли. Важно е да се предвидят навреме, защото
                    не могат да се монтират на по-късен етап след монтажа на дограмата, тъй като рамката трябва да стъпи
                    върху тях.
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Подходящи за вътрешно приложение</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Различни ширини според отвора</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Изчистен и завършен вид</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Трябва да се предвидят предварително</li>
                  </ul>
                </div>
              </div>
              <aside className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-4 text-sm font-medium leading-relaxed text-rose-900 sm:text-base">
                Не можем да монтираме вътрешни PVC первази на вече монтирана дограма.
              </aside>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Външни алуминиеви первази</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                Външните алуминиеви первази са практично решение за защита на фасадата и по-добро поведение при дъжд и
                сняг. Освен функционалността, те допринасят и за по-завършена визия на отвора.
              </p>
              <div className="mt-6 relative aspect-[16/7] overflow-hidden rounded-2xl border border-slate-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1400&q=82"
                  alt="Външна фасадна зона с алуминиев перваз"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За външна защита</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Предпазват фасадата от вода</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">Отвеждане на водата</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Подобряват поведението при дъжд и сняг</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">Различни размери</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Подходящи за различни отвори</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">Завършен външен вид</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Придават по-добра визия на прозореца</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Алуминиеви козирки</h2>
              <div className="mt-5 grid gap-6 lg:grid-cols-[1.06fr_0.94fr] lg:items-start">
                <div className="space-y-4 text-base leading-relaxed text-slate-700">
                  <p>
                    Алуминиевите козирки са подходящи за ситуации, в които е необходимо допълнително отвеждане на водата
                    и по-добра защита на фасадата. Те са добро решение при външни отвори, тераси или когато прозорецът е
                    по-изнесен към външната част на стената.
                  </p>
                  <p>
                    Важно е да се планират навреме. Монтажът им на по-късен етап често е неудачен и в някои случаи може
                    да изисква по-сложно изпълнение.
                  </p>
                  <ul className="space-y-2 text-sm leading-relaxed sm:text-base">
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Подходящи за външни отвори</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Допълнителна защита от вода</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Добро решение за тераси и по-изнесени прозорци</li>
                    <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />Най-добре е да се предвидят предварително</li>
                  </ul>
                </div>
                <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200/80 sm:min-h-[360px]">
                  <Image
                    src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?auto=format&fit=crop&w=1200&q=82"
                    alt="Външна козирка и фасадна защита"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
              </div>
              <aside className="mt-6 rounded-2xl border border-rose-200/80 bg-rose-50/60 p-4 text-sm font-medium leading-relaxed text-rose-900 sm:text-base">
                Не можем да монтираме козирки на вече монтирана дограма.
              </aside>
            </article>

            <aside className="rounded-3xl border border-amber-300/50 bg-amber-50/70 p-6 shadow-sm ring-1 ring-amber-400/15 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Важно при планирането</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm font-medium text-slate-800 sm:text-base">Предвидете ги още при поръчката на дограмата</div>
                <div className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm font-medium text-slate-800 sm:text-base">Съобразете вътрешна и външна ширина</div>
                <div className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm font-medium text-slate-800 sm:text-base">Помислете за отвеждането на водата</div>
                <div className="rounded-2xl border border-amber-200/70 bg-white/75 p-4 text-sm font-medium text-slate-800 sm:text-base">Изберете решение според мястото и приложението</div>
              </div>
              <p className="mt-5 text-base leading-relaxed text-slate-700">
                Первазите и козирките не са просто детайл, а важна част от правилното завършване на отвора. Най-добрият
                резултат се получава, когато са предвидени още в началото.
              </p>
            </aside>

            <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Кога кое е подходящо</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За интериорен завършек</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Вътрешни PVC первази</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За външна защита от вода</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Външни алуминиеви первази</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
                  <h3 className="text-base font-semibold text-slate-900">За допълнително отвеждане и защита</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">Алуминиеви козирки</p>
                </div>
              </div>
            </article>

            <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
                <Image
                  src="https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1600&q=82"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от первази и козирки?</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
                  Свържете се с нас за консултация, избор на подходящо решение и ориентировъчна оферта според Вашия обект
                  и нужди.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/kontakti"
                    className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                  >
                    Запитване за оферта
                  </Link>
                  <a
                    href={EXTERNAL.prices}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
                  >
                    Цени
                  </a>
                </div>
              </div>
            </section>

            <div className="pt-1">
              <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
                Към всички продукти →
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div>
            <SectionHeading
              as="h1"
              align="start"
              titleClassName="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              PVC дограма
            </SectionHeading>
            <p className={`max-w-3xl text-pretty text-base leading-relaxed text-slate-700 sm:text-lg ${sectionAfterHeadingSpacing}`}>
              PVC дограмата е практично и надеждно решение за жилища, офиси и търговски обекти. Тя предлага много добра
              топло- и шумоизолация, лесна поддръжка и богат избор от профили, цветове и конфигурации според нуждите на
              всеки проект.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={EXTERNAL.prices}
                className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Цени
              </a>
              <a
                href={EXTERNAL.pvcCalculator}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
              >
                PVC калкулатор
              </a>
            </div>
            <Link href="/kontakti" className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
              Запитване за оферта →
            </Link>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Основни предимства на PVC дограмата">
              <li className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Добра топлоизолация</li>
              <li className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Надежден обков</li>
              <li className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Различни профилни системи</li>
              <li className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Възможност за индивидуални решения</li>
            </ul>
          </div>
          <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ring-1 ring-slate-900/[0.03]">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=82"
              alt="Модерна сграда с PVC прозорци"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" aria-hidden />
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)] py-14 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6">
          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">PVC или алуминий</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                При избор между PVC и алуминиева дограма е важно да се знае, че PVC профилите обикновено осигуряват
                по-добра топлоизолация. При тях се използва регулируем обков, което позволява по-лесно компенсиране на
                неточности от монтажа, температурни разширения или слягане на сградата.
              </p>
              <p>
                При алуминиевите профили работата трябва да бъде по-прецизна, а обковът обикновено е нерегулируем. За
                външна дограма са подходящи PVC профили или алуминиеви профили с прекъснат термомост, при които
                вътрешната и външната част на профила са изолирани една от друга.
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Предимства на PVC дограмата</h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <p className="text-base leading-relaxed text-slate-700">
                  PVC дограмата е предпочитан избор, когато търсите добро съотношение между цена, изолация и дълготрайност.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Отлична топлоизолация и по-добро задържане на топлината</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Добри шумоизолационни свойства</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Лесна поддръжка и добър външен вид</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Устойчивост на корозия</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Богат избор от цветове и декори, включително имитация на дърво</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Възможност за комбиниране с различни видове стъкла</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Добра статична устойчивост благодарение на стоманени усилвания</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />Здрави и добре заварени ъгли</li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=82"
                  alt="PVC прозорци и модерен интериор"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 28vw"
                />
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Какво влияе на качеството</h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=1200&q=82"
                  alt="Детайл на прозоречна система"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 24vw"
                />
              </div>
              <div className="space-y-4 text-base leading-relaxed text-slate-700">
                <p>
                  Качеството на PVC дограмата зависи в голяма степен от произхода на профилите, използвания обков и
                  правилната изработка. Съвременните профилни системи се предлагат в различни варианти с 4, 5 или 6
                  камери, като по-големият брой камери обикновено означава по-добра топлоизолация.
                </p>
                <p>
                  Качествените PVC профили са устойчиви на климатични промени и UV-лъчи, запазват по-добре външния си вид
                  и имат по-дълъг експлоатационен живот. При некачествени профили е възможно пожълтяване, деформации и
                  загуба на плътност с течение на времето.
                </p>
                <p>
                  Добре подбраният обков също е много важен. При качествен обков отваряемите крила могат да се регулират
                  при необходимост, което помага за поддържане на добро уплътнение и безпроблемна работа.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Има ли недостатъци</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-700">
              PVC дограмата има много предимства, но е важно да се отчетат и някои особености. В сравнение с
              алуминиевата дограма, PVC старее по-бързо във времето. При големи температурни амплитуди е възможно
              временно провисване на отваряемите части, но когато е използван качествен обков, това обикновено може да
              се регулира.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Затова правилният избор на профили, обков и професионален монтаж са решаващи за дългосрочната надеждност
              на дограмата.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Цени на PVC дограма</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-700">Цената на PVC дограмата зависи от няколко основни фактора:</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              <li>- вида и марката на профилната система</li>
              <li>- броя на камерите</li>
              <li>- избрания стъклопакет</li>
              <li>- размерите и конфигурацията</li>
              <li>- броя и вида на отваряемите части</li>
              <li>- цвета и декора</li>
              <li>- вида на обкова</li>
              <li>- дали е включен монтаж</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Предлагат се както стандартни бели профили, така и различни цветове и декори с дървесен ефект. По този
              начин може да се постигне както добра функционалност, така и завършена визия според стила на сградата.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Размери и измерване</h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
              <div>
                <p className="text-base leading-relaxed text-slate-700">
                  За ориентировъчна оферта по телефона можете предварително да измерите дограмата си.
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />При подмяна на стара дограма: измерва се външният отвор от стена до стена и се добавят 10–20 мм</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />При нова дограма: измерва се отворът и се намаляват 30–50 мм</li>
                </ul>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  Когато поръчката е с монтаж, ние извършваме точно измерване на място. След заявка посещаваме обекта,
                  измерваме отворите и уточняваме заедно с клиента най-подходящите размери и решения.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=82"
                  alt="Измерване на прозоречни отвори"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 24vw"
                />
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Полета, отваряеми крила и фиксове</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
              <p>
                Правилното разделяне на прозорците е важно както за външния вид, така и за безпроблемната работа на
                дограмата. Полетата не трябва да бъдат нито прекалено големи, нито прекалено малки. Ние предлагаме
                най-подходящите варианти според нуждите на обекта и желаната функционалност.
              </p>
              <p>
                Най-често се използва комбинация от отваряеми и неотваряеми части, с което се постига добър баланс между
                удобство и цена. По наш опит е добре във всяка стая да има поне едно крило с двуосово отваряне.
              </p>
              <p>
                Плъзгащите прозорци обикновено не уплътняват толкова добре, а някои системи за плъзгане са значително
                по-скъпи. При избора на отваряемост е важно да се мисли не само за първоначалната цена, а и за
                дългосрочния комфорт при използване.
              </p>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Нашият подход</h2>
            <p className="mt-5 text-base leading-relaxed text-slate-700">
              Ние окомплектоваме отваряемите части с качествен обков, защото именно той има ключова роля за надеждното
              и безпроблемно функциониране на дограмата. Помагаме при избора на профили, отваряемост, конфигурация и
              размери, за да получите решение, което е едновременно практично, надеждно и съобразено с бюджета Ви.
            </p>
          </article>

          <aside className="rounded-3xl border border-accent/25 bg-accent/5 p-6 shadow-sm ring-1 ring-accent/10 sm:p-8">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Важно при избора</h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Качествените профили, надеждният обков и точният монтаж са трите основни фактора, които определят колко
              добре ще работи PVC дограмата във времето.
            </p>
          </aside>

          <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.03] sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=82"
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />
            </div>
            <div className="relative z-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Интересувате се от PVC дограма?</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
              Свържете се с нас за консултация, ориентировъчна цена или изготвяне на конкретна оферта според Вашите
              размери и изисквания.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/kontakti"
                className="inline-flex items-center justify-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Запитване за оферта
              </Link>
              <a
                href={EXTERNAL.prices}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
              >
                Цени
              </a>
              <a
                href={EXTERNAL.pvcCalculator}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-brand-800 hover:text-brand-800"
              >
                PVC калкулатор
              </a>
            </div>
            </div>
          </section>

          <div className="pt-1">
            <Link href="/produkti" className="inline-flex text-sm font-semibold text-accent transition-colors hover:underline">
              Към всички продукти →
            </Link>
          </div>
      </div>
      </section>
    </>
  );
}
