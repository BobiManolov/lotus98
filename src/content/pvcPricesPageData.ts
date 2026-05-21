/**
 * PVC цени — данни 1:1 от източника (април 2026, София).
 * Не променяйте стойностите без нова официална таблица.
 */

export const PVC_PRICES_PAGE_TITLE_LINE =
  "Цени за СОФИЯ на пет камерна PVC дограма със стъклопакет бяло/бяло-24 мм. за АПРИЛ 2026 г.";

export type PvcAccessoryRow = {
  label: string;
  /** Пълна стойност като в източника, напр. "44 € - 86,06 лв." или "няма" */
  value: string;
};

/**
 * Вертикални крила отляво надясно.
 * `tilt-turn` = две линии (V), като на старата схема за клапващо-обръщаемо крило.
 */
export type PvcPanelSpec =
  | { type: "fixed" }
  | { type: "opening"; openingStyle?: "casement" | "tilt-turn" };

export type PvcRectangleDiagram = {
  shape: "rectangle";
  widthMm: number;
  heightMm: number;
  panels: PvcPanelSpec[];
  /** Относителни ширини на колоните (същия брой като `panels`). Липсва = равни части. */
  columnWeights?: number[];
  /**
   * Лява третина отделно + дясна зона 2/3 без междинно муле (едно голямо фиксирано крило).
   * Изисква точно 2 елемента в `panels`: [отваряемо, фиксирано].
   */
  mergeAfterFirst?: boolean;
  /**
   * Рендерира само лявото крило от равна двойка с обща ширина `…TotalWidthMm`×`heightMm` (еднакви пиксели като колоната в пълната двойка).
   * Изисква точно един панел; ползва се с `widthMm` = половината надписана ширина за етикета.
   */
  leftPaneOfTwoPaneTotalWidthMm?: number;
  /** Надписи в SVG `DimLabels`; липсва → `widthMm` / `heightMm` (геометрията остава от тях). */
  diagramDimWidthMm?: number;
  diagramDimHeightMm?: number;
  /**
   * Единично tilt-turn крило: дръжка и V към дясната вътрешна линия на opening (като `leftPaneOfTwoPaneTotalWidthMm`, без референтна двойка).
   * Ползва се с нормален `fit(widthMm×heightMm)` — напр. квадрат 500×500.
   */
  innerRightTiltTurnSinglePane?: boolean;
  /** Равномерен мащаб на цялата PVC диаграма (рамка, стъкло, дръжка, линии); липсва = 1. */
  diagramUniformScale?: number;
};

/** Врата + горен/хоризонтален прозоречен ред (L по план на общата кутия). */
export type PvcLShapeDiagram = {
  shape: "l-shape";
  /** Обща ограждаща кутия за надписи (мм) */
  widthMm: number;
  heightMm: number;
  doorWidthMm: number;
  doorOpening: boolean;
  /** Височина на хоризонталната прозоречна част вдясно (мм) */
  transomHeightMm: number;
  /** Крила на прозореца над стената/долна зона, отляво надясно */
  transomPanels: PvcPanelSpec[];
  /** Ширини на колоните в транзомната зона (мм), същия брой като `transomPanels`; липсва = равни части. */
  transomColumnWeights?: number[];
  /**
   * Тесно отваряемо крило вдясно от квадратния транзом (мм ширина на крилото).
   * Ползва се само с каталожната двойка врата+квадрат (`LDoorWindow2050PairContent` стил), без преоразмеряване на вратата и квадрата.
   */
  rightNarrowWidthMm?: number;
};

export type PvcWindowDiagramSpec = PvcRectangleDiagram | PvcLShapeDiagram;

export type PvcPricingCardData = {
  id: string;
  diagram: PvcWindowDiagramSpec;
  /** Показване на размерите — точните числа от източника */
  dimensionsDisplay: string;
  vivaWithInstall: string;
  vivaWithoutInstall: string;
  aluplastWithInstall: string;
  aluplastWithoutInstall: string;
  accessories: PvcAccessoryRow[];
};

/** Еднаква L-двойка (врата + фиксиран квадратен транзом) за две отделни ценови реда — същият SVG като при `l-door-window`. */
export const PVC_L_DOOR_PAIR_DIAGRAM: PvcLShapeDiagram = {
  shape: "l-shape",
  widthMm: 2250,
  heightMm: 2250,
  doorWidthMm: 900,
  doorOpening: true,
  transomHeightMm: 1350,
  transomPanels: [{ type: "fixed" }],
};

export const PVC_L_DOOR_PAIR_DIMENSIONS_DISPLAY =
  "Вертикална част (врата): 900×2250 mm. Хоризонтална част (прозорец): 1350×1350 mm. Обща ширина: 2250 mm.";

/** Врата + квадрат + тесно отваряемо крило (картка `l-door-double`) — същите пропорции като `PVC_L_DOOR_PAIR_DIAGRAM` плюс тясно крило вдясно. */
export const PVC_L_DOOR_TRIPLE_DIAGRAM: PvcLShapeDiagram = {
  shape: "l-shape",
  widthMm: 2750,
  heightMm: 2250,
  doorWidthMm: 900,
  doorOpening: true,
  transomHeightMm: 1350,
  transomPanels: [{ type: "fixed" }, { type: "opening", openingStyle: "tilt-turn" }],
  rightNarrowWidthMm: 700,
};

/** Квадрат ~430 mm (с лек uniform scale в SVG), tilt-turn — същият визуален език. */
export const PVC_STD_2PANE_1500_1400_DIAGRAM: PvcRectangleDiagram = {
  shape: "rectangle",
  widthMm: 430,
  heightMm: 430,
  diagramDimWidthMm: 500,
  diagramDimHeightMm: 500,
  panels: [{ type: "opening", openingStyle: "tilt-turn" }],
  innerRightTiltTurnSinglePane: true,
  diagramUniformScale: 0.86,
};

/** Единично крило 700×2000 mm, tilt-turn, дръжка/V към дясната вътрешна страна — същият SVG компонент като другите правоъгълни диаграми. */
export const PVC_SINGLE_DOOR_700_2000_DIAGRAM: PvcRectangleDiagram = {
  shape: "rectangle",
  widthMm: 700,
  heightMm: 2000,
  panels: [{ type: "opening", openingStyle: "tilt-turn" }],
  innerRightTiltTurnSinglePane: true,
};

/** Първа карта: двукрилен 1500×1400 (ляво tilt-turn, дясно fixed) — като референтния screenshot. */
export const PVC_FIRST_CARD_1500_1400_DIAGRAM: PvcRectangleDiagram = {
  shape: "rectangle",
  widthMm: 1500,
  heightMm: 1400,
  panels: [{ type: "opening", openingStyle: "tilt-turn" }, { type: "fixed" }],
};

/** Същата 1500×1400 визия, но само лявото крило (дясната част е премахната). */
export const PVC_FIRST_CARD_LEFT_PANE_ONLY_DIAGRAM: PvcRectangleDiagram = {
  shape: "rectangle",
  widthMm: 750,
  heightMm: 1400,
  diagramDimWidthMm: 700,
  diagramDimHeightMm: 2000,
  panels: [{ type: "opening", openingStyle: "tilt-turn" }],
  leftPaneOfTwoPaneTotalWidthMm: 1500,
};

/** Ред на картите: първо стандартни прозорци, после комбинации (както в източника — групи запазени). */
export const PVC_PRICING_CARDS: PvcPricingCardData[] = [
  {
    id: "std-2pane-1500-1400",
    diagram: PVC_FIRST_CARD_1500_1400_DIAGRAM,
    dimensionsDisplay: "1500 mm × 1400 mm",
    vivaWithInstall: "260 € - 508,52 лв.",
    vivaWithoutInstall: "190 € - 371,61 лв.",
    aluplastWithInstall: "280 € - 547,63 лв.",
    aluplastWithoutInstall: "220 € - 430,28 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "23 € - 44,98 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "30 € - 58,67 лв." },
      { label: "комарник на панти", value: "35 € - 68,45 лв." },
      { label: "ролетен комарник", value: "75 € - 146,69 лв." },
    ],
  },
  {
    id: "std-2050-1350-merged-right",
    diagram: {
      shape: "rectangle",
      widthMm: 2050,
      heightMm: 1350,
      mergeAfterFirst: true,
      panels: [{ type: "opening", openingStyle: "tilt-turn" }, { type: "fixed" }],
    },
    dimensionsDisplay: "2050 mm × 1350 mm",
    vivaWithInstall: "310 € - 606,31 лв.",
    vivaWithoutInstall: "220 € - 430,28 лв.",
    aluplastWithInstall: "340 € - 664,98 лв.",
    aluplastWithoutInstall: "250 € - 488,96 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "32 € - 62,59 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "42 € - 82,14 лв." },
      { label: "комарник на панти", value: "34 € - 66,50 лв." },
      { label: "ролетен комарник", value: "72 € - 140,82 лв." },
    ],
  },
  {
    id: "std-3pane-center-2050-1350",
    diagram: {
      shape: "rectangle",
      widthMm: 2050,
      heightMm: 1350,
      panels: [{ type: "fixed" }, { type: "opening", openingStyle: "tilt-turn" }, { type: "fixed" }],
    },
    dimensionsDisplay: "2050 mm × 1350 mm",
    vivaWithInstall: "320 € - 625,87 лв.",
    vivaWithoutInstall: "240 € - 469,40 лв.",
    aluplastWithInstall: "360 € - 704,10 лв.",
    aluplastWithoutInstall: "270 € - 528,07 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "32 € - 62,59 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "42 € - 82,14 лв." },
      { label: "комарник на панти", value: "34 € - 66,50 лв." },
      { label: "ролетен комарник", value: "72 € - 140,82 лв." },
    ],
  },
  {
    id: "std-3pane-sides-2050-1350",
    diagram: {
      shape: "rectangle",
      widthMm: 2050,
      heightMm: 1350,
      panels: [
        { type: "opening", openingStyle: "tilt-turn" },
        { type: "fixed" },
        { type: "opening", openingStyle: "tilt-turn" },
      ],
    },
    dimensionsDisplay: "2050 mm × 1350 mm",
    vivaWithInstall: "370 € - 723,66 лв.",
    vivaWithoutInstall: "280 € - 547,63 лв.",
    aluplastWithInstall: "420 € - 821,45 лв.",
    aluplastWithoutInstall: "330 € - 645,42 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "32 € - 62,59 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "42 € - 82,14 лв." },
      { label: "комарник на панти", value: "34 € - 66,50 лв." },
      { label: "ролетен комарник", value: "72 € - 140,82 лв." },
    ],
  },
  {
    id: "std-4pane-center-3300-1600",
    diagram: {
      shape: "rectangle",
      widthMm: 3300,
      heightMm: 1600,
      panels: [
        { type: "fixed" },
        { type: "opening", openingStyle: "tilt-turn" },
        { type: "opening", openingStyle: "tilt-turn" },
        { type: "fixed" },
      ],
    },
    dimensionsDisplay: "3300 mm × 1600 mm",
    vivaWithInstall: "610 € - 1193,06 лв.",
    vivaWithoutInstall: "440 € - 860,57 лв.",
    aluplastWithInstall: "670 € - 1310,41 лв.",
    aluplastWithoutInstall: "500 € - 977,92 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "52 € - 101,70 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "67 € - 131,04 лв." },
      { label: "комарник на панти", value: "39 € - 76,28 лв." },
      { label: "ролетен комарник", value: "83 € - 162,33 лв." },
    ],
  },
  {
    id: "wide-three-2800-1700",
    diagram: {
      shape: "rectangle",
      widthMm: 2800,
      heightMm: 1700,
      panels: [
        { type: "opening", openingStyle: "tilt-turn" },
        { type: "fixed" },
        { type: "opening", openingStyle: "tilt-turn" },
      ],
    },
    dimensionsDisplay: "2800 mm × 1700 mm",
    vivaWithInstall: "550 € - 1075,71 лв.",
    vivaWithoutInstall: "400 € - 782,33 лв.",
    aluplastWithInstall: "610 € - 1193,06 лв.",
    aluplastWithoutInstall: "460 € - 899,68 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "44 € - 86,06 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "57 € - 111,48 лв." },
      { label: "комарник на панти", value: "38 € - 74,32 лв." },
      { label: "ролетен комарник", value: "80 € - 156,47 лв." },
    ],
  },
  {
    id: "l-door-window",
    diagram: PVC_L_DOOR_PAIR_DIAGRAM,
    dimensionsDisplay: PVC_L_DOOR_PAIR_DIMENSIONS_DISPLAY,
    vivaWithInstall: "390 € - 762,77 лв.",
    vivaWithoutInstall: "290 € - 567,19 лв.",
    aluplastWithInstall: "440 € - 860,57 лв.",
    aluplastWithoutInstall: "330 € - 645,42 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "22 € - 43,06 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "28 € - 54,76 лв." },
      { label: "комарник на панти", value: "69 € - 134,95 лв." },
      { label: "комарник плисе", value: "197 € - 385,30 лв." },
    ],
  },
  {
    id: "l-door-double",
    diagram: PVC_L_DOOR_TRIPLE_DIAGRAM,
    dimensionsDisplay:
      "Вертикална част (врата): 700×2250 mm. Хоризонтална част (двоен прозорец): 2050×1350 mm. Обща ширина: 2750 mm.",
    vivaWithInstall: "540 € - 1056,15 лв.",
    vivaWithoutInstall: "400 € - 782,33 лв.",
    aluplastWithInstall: "600 € - 1173,50 лв.",
    aluplastWithoutInstall: "460 € - 899,68 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "32 € - 62,59 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "42 € - 82,14 лв." },
      { label: "комарник на панти", value: "34 € - 66,50 лв." },
      { label: "ролетен комарник", value: "72 € - 140,82 лв." },
    ],
  },
  {
    id: "single-door-700-2000",
    diagram: PVC_FIRST_CARD_LEFT_PANE_ONLY_DIAGRAM,
    dimensionsDisplay: "700 mm × 2000 mm",
    vivaWithInstall: "210 € - 410,72 лв.",
    vivaWithoutInstall: "170 € - 332,49 лв.",
    aluplastWithInstall: "240 € - 469,40 лв.",
    aluplastWithoutInstall: "190 € - 371,61 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "няма" },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "няма" },
      { label: "комарник на панти", value: "65 € - 127,13 лв." },
      { label: "комарник плисе", value: "178 € - 348,14 лв." },
    ],
  },
  {
    id: "square-500-500",
    diagram: PVC_STD_2PANE_1500_1400_DIAGRAM,
    dimensionsDisplay: "500 mm × 500 mm",
    vivaWithInstall: "130 € - 254,26 лв.",
    vivaWithoutInstall: "80 € - 156,47 лв.",
    aluplastWithInstall: "140 € - 273,82 лв.",
    aluplastWithoutInstall: "90 € - 176,02 лв.",
    accessories: [
      { label: "вътрешен PVC перваз 200 мм.", value: "8 € - 15,69 лв." },
      { label: "външен ал.перваз (козирка) 200 мм.", value: "10 € - 19,56 лв." },
      { label: "комарник на панти", value: "19 € - 37,16 лв." },
      { label: "ролетен комарник", value: "46 € - 89,97 лв." },
    ],
  },
];

export const PVC_GLAZING_SURCHARGES = [
  { label: "бяло/Ка 24 мм.", value: "+ (5 €/m² - 9,78 лв./м²)" },
  { label: "4 сезона/бяло 24 мм.", value: "+ (7 €/m² - 13,69 лв./м²)" },
  { label: "4 сезона/бяло/Ка 32 мм.", value: "+ (42 €/m² - 82,14 лв./м²)" },
] as const;

export const PVC_COLOR_SURCHARGES = [
  { brand: "VIVA PLAST", value: "+25%" },
  { brand: "ALUPLAST", value: "+30%" },
] as const;

export const PVC_TWO_WAY_MECHANISM = "20 € - 39,12 лв.";

export const PVC_PRICE_INCLUDES =
  "ДДС, вземане на размери, монтаж, демонтаж на старата дървена дограма, бял ПВЦ профил, стъклопакет Бяло/Бяло-24мм, обков Сигения, отстъпки – 7% + 5% за авансово плащане на цялата сума.";

export const PVC_NOTES = [
  "*транспортът е безплатен в границите на гр.София при поръчка на дограма",
  "*извън рамките на гр.София таксата за транспорт е 0,60 €/км. (1,17 лв./км.). Разстоянието се измерва от метростанция СЕРДИКА.",
] as const;

export const PVC_COLOR_SWATCHES = [
  { label: "бял", swatchClass: "bg-white ring-1 ring-slate-200" },
  { label: "златен дъб", swatchClass: "bg-[#c4a574]" },
  { label: "орех", swatchClass: "bg-[#6b4e3d]" },
  { label: "тъмен дъб", swatchClass: "bg-[#3d2f26]" },
  { label: "махагон", swatchClass: "bg-[#4a2323]" },
  { label: "антрацитно сиво", swatchClass: "bg-[#3d4450]" },
] as const;
