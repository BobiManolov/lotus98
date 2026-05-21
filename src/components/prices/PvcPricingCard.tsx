import type { PvcPricingCardData } from "@/content/pvcPricesPageData";
import { PvcWindowDiagram } from "@/components/prices/PvcWindowDiagram";

const CARD_SECTION_LABEL_CLASS = "text-[13px] font-bold uppercase tracking-wide text-slate-900";

export function PvcPricingCard({ card }: { card: PvcPricingCardData }) {
  const isSingleDoorCard = card.id === "single-door-700-2000";
  const isSingleDoorMissingValue = (value: string) => isSingleDoorCard && value === "няма";
  const formatSingleDoorAccessoryLabel = (label: string) => {
    if (label === "вътрешен PVC перваз 200 мм.") {
      return (
        <>
          вътрешен PVC перваз 200
          <br />
          мм.
        </>
      );
    }

    if (label === "външен ал.перваз (козирка) 200 мм.") {
      return (
        <>
          външен ал.перваз (козирка)
          <br />
          200 мм.
        </>
      );
    }

    return label;
  };

  return (
    <article
      data-pricing-card-id={card.id}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] transition-shadow duration-300 hover:shadow-md"
    >
      <div className="border-b border-slate-100 bg-slate-50/50 p-4">
        <PvcWindowDiagram {...card.diagram} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div className="space-y-3">
          <div>
            <p className={CARD_SECTION_LABEL_CLASS}>VIVA PLAST бял</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                <dt className="text-slate-600">с монтаж</dt>
                <dd className="font-semibold text-slate-900">{card.vivaWithInstall}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                <dt className="text-slate-600">без монтаж/ишлеме</dt>
                <dd className="font-semibold text-slate-900">{card.vivaWithoutInstall}</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-slate-100 pt-3">
            <p className={CARD_SECTION_LABEL_CLASS}>ALUPLAST бял</p>
            <dl className="mt-2 space-y-1.5 text-sm">
              <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                <dt className="text-slate-600">с монтаж</dt>
                <dd className="font-semibold text-slate-900">{card.aluplastWithInstall}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5">
                <dt className="text-slate-600">без монтаж/ишлеме</dt>
                <dd className="font-semibold text-slate-900">{card.aluplastWithoutInstall}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-auto min-h-[196px] border-t border-slate-100 pt-4">
          <p className={CARD_SECTION_LABEL_CLASS}>Допълнителни аксесоари</p>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
            {card.accessories.map((row) => (
              <li
                key={row.label}
                className={
                  isSingleDoorCard
                    ? isSingleDoorMissingValue(row.value)
                      ? "grid grid-cols-[minmax(0,1fr)_88px] items-center gap-x-2 gap-y-0.5 border-b border-slate-50 pb-1.5 last:border-0 last:pb-0"
                      : "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0.5 border-b border-slate-50 pb-1.5 last:border-0 last:pb-0"
                    : "flex flex-wrap justify-between gap-x-2 gap-y-0.5 border-b border-slate-50 pb-1.5 last:border-0 last:pb-0"
                }
              >
                <span className="min-w-0 flex-1 text-slate-600">
                  {isSingleDoorCard ? formatSingleDoorAccessoryLabel(row.label) : row.label}
                </span>
                <span
                  className={`shrink-0 font-semibold tabular-nums text-slate-900 ${
                    isSingleDoorMissingValue(row.value) ? "ml-4 justify-self-start text-left" : ""
                  }`}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
