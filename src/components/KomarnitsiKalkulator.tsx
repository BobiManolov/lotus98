"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";

// ── Types ─────────────────────────────────────────────────────────────────────

type NetType = "static" | "window" | "door" | "roller" | "plisse" | "plisse2";

interface BasketItem {
  id: number;
  tp: NetType;
  label: string;
  wInput: number;
  hInput: number;
  rw: number;
  rh: number;
  isColor: boolean;
  qty: number;
  unitPrice: number;
  price: number;
  hasFrame: boolean;
  frameAdd: number;
  hasHinges: boolean;
}

interface PriceResult {
  price?: number;
  rw?: number;
  rh?: number;
  err?: string;
}

// ── Pricing Data ──────────────────────────────────────────────────────────────

const STATIC_DATA = {
  wSteps: [500, 600, 700, 800, 900, 1000, 1100, 1200],
  hSteps: [600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  table: {
    600: [14, 15, 16, 18, 19, 20, 21, 22],
    800: [16, 18, 19, 20, 21, 22, 23, 25],
    1000: [18, 20, 21, 22, 24, 25, 26, 27],
    1200: [21, 22, 23, 25, 26, 27, 29, 30],
    1400: [26, 28, 30, 31, 34, 35, 38, 39],
    1600: [28, 30, 32, 34, 36, 38, 40, 42],
    1800: [31, 32, 35, 36, 39, 40, 43, 44],
    2000: [33, 35, 37, 39, 41, 43, 45, 47],
    2200: [35, 38, 39, 41, 44, 45, 48, 50],
    2400: [38, 40, 42, 44, 46, 48, 51, 53],
  } as Record<number, number[]>,
};

const WINDOW_DATA = {
  wSteps: [500, 600, 700, 800, 900, 1000, 1100, 1200],
  hSteps: [600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  table: {
    600: [16, 17, 18, 19, 20, 22, 23, 24],
    800: [18, 19, 20, 22, 23, 24, 26, 27],
    1000: [20, 22, 23, 24, 26, 27, 28, 30],
    1200: [23, 24, 26, 27, 28, 30, 31, 32],
    1400: [28, 30, 32, 34, 36, 38, 39, 41],
    1600: [30, 32, 34, 36, 38, 40, 42, 44],
    1800: [32, 35, 36, 39, 41, 43, 45, 47],
    2000: [35, 37, 39, 41, 43, 45, 47, 49],
    2200: [38, 39, 41, 44, 45, 48, 50, 52],
    2400: [40, 41, 44, 46, 48, 51, 53, 55],
  } as Record<number, number[]>,
};

const DOOR_DATA = {
  wSteps: [600, 700, 800, 900, 1000, 1100, 1200, 1300],
  hSteps: [1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500],
  table: {
    1800: [49, 52, 55, 57, 60, 63, 66, 69],
    1900: [51, 54, 57, 60, 62, 65, 68, 71],
    2000: [53, 56, 59, 61, 64, 67, 70, 73],
    2100: [55, 57, 60, 63, 66, 69, 72, 74],
    2200: [56, 59, 62, 65, 68, 70, 73, 77],
    2300: [58, 61, 64, 66, 70, 73, 76, 78],
    2400: [60, 62, 65, 69, 72, 74, 77, 80],
    2500: [61, 64, 68, 70, 73, 76, 79, 82],
  } as Record<number, number[]>,
};

const ROLLER_DATA = {
  wSteps: [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
  hSteps: [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400],
  groups: [
    {
      widths: [500, 600, 700, 800],
      data: [
        [39,42,45,49],[41,44,47,51],[43,46,49,53],[45,48,52,55],[47,51,54,57],
        [49,52,56,59],[51,55,58,61],[53,57,60,64],[56,59,62,65],[58,61,64,68],
        [60,63,66,70],[64,67,70,74],[65,69,73,76],[68,71,75,78],[70,73,77,81],
        [72,76,79,83],[74,78,81,85],[76,80,84,87],[78,82,85,89],
      ],
    },
    {
      widths: [900, 1000, 1100, 1200],
      data: [
        [54,57,61,64],[56,59,63,66],[58,62,65,69],[60,64,67,71],[62,65,69,73],
        [64,68,71,75],[66,70,73,77],[69,72,76,79],[71,74,78,82],[73,76,80,84],
        [75,79,82,86],[79,83,86,90],[81,85,89,93],[83,87,91,95],[85,89,93,97],
        [87,91,95,99],[89,93,97,101],[91,95,99,103],[93,97,101,105],
      ],
    },
    {
      widths: [1300, 1400, 1500],
      data: [
        [65,69,72],[67,70,74],[69,73,76],[72,75,78],[74,77,80],
        [76,79,82],[78,81,85],[80,84,87],[82,85,89],[84,87,91],
        [86,90,93],[92,96,99],[94,98,102],[97,100,104],[99,102,106],
        [101,105,108],[103,106,110],[105,109,112],[107,111,114],
      ],
    },
  ],
};

const PLISSE_DATA = {
  wSteps: [700, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400],
  hSteps: [600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600],
  table: {
    600:  [114,118,125,134,147,160,173,186,199,212],
    800:  [122,125,134,141,155,168,181,193,207,220],
    1000: [129,134,141,149,162,174,188,202,214,228],
    1200: [137,141,149,157,169,183,195,209,223,235],
    1400: [144,149,157,164,178,190,204,216,230,243],
    1600: [153,157,164,173,186,199,212,226,238,252],
    1800: [161,164,173,181,193,207,220,233,247,259],
    2000: [168,173,181,188,202,214,228,240,254,267],
    2200: [177,181,188,195,209,223,235,248,261,274],
    2400: [187,190,199,209,223,236,252,267,282,298],
    2600: [199,204,214,228,243,259,276,294,313,332],
  } as Record<number, number[]>,
};

const PLISSE2_DATA = {
  wSteps: [1200, 1500, 1800, 2100, 2400, 2700, 3000, 3300, 3600, 4000],
  hSteps: [1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600],
  table: {
    1600: [233,258,284,316,355,397,449,499,558,636],
    1700: [239,264,290,322,361,402,454,506,564,641],
    1800: [244,269,295,327,366,407,460,511,569,647],
    1900: [249,274,300,332,371,414,465,516,574,652],
    2000: [255,280,306,337,376,419,470,522,579,657],
    2100: [260,285,311,344,382,424,476,527,585,662],
    2200: [265,291,316,349,387,429,481,532,590,668],
    2300: [271,296,322,354,392,435,487,537,596,673],
    2400: [276,301,327,360,398,440,492,543,601,678],
    2500: [285,311,337,369,407,450,501,552,611,688],
    2600: [290,315,342,373,412,454,506,557,615,692],
  } as Record<number, number[]>,
};

const TYPE_LABELS: Record<NetType, string> = {
  static:  "Статичен комарник (25/17 мм)",
  window:  "Комарник на панти за прозорец (25/17 мм)",
  door:    "Комарник на панти за балконска врата (42/17 мм)",
  roller:  "Ролетен комарник",
  plisse:  "Комарник едностранно плисе",
  plisse2: "Комарник двустранно плисе",
};

const EUR_BGN = 1.956;

// ── Helpers ───────────────────────────────────────────────────────────────────

function roundUp(val: number, steps: readonly number[]): number | null {
  for (const step of steps) {
    if (val <= step) return step;
  }
  return null;
}

function getBasePrice(tp: NetType, wv: number, hv: number): PriceResult {
  if (tp === "static" || tp === "window") {
    const d = tp === "static" ? STATIC_DATA : WINDOW_DATA;
    const rw = roundUp(wv, d.wSteps);
    const rh = roundUp(hv, d.hSteps);
    if (!rw) return { err: `Широчината трябва да е между ${d.wSteps[0]} и ${d.wSteps[d.wSteps.length - 1]} мм.` };
    if (!rh) return { err: `Височината трябва да е между ${d.hSteps[0]} и ${d.hSteps[d.hSteps.length - 1]} мм.` };
    return { price: d.table[rh][d.wSteps.indexOf(rw)], rw, rh };
  }
  if (tp === "door") {
    const rw = roundUp(wv, DOOR_DATA.wSteps);
    const rh = roundUp(hv, DOOR_DATA.hSteps);
    if (!rw) return { err: `Широчината трябва да е между ${DOOR_DATA.wSteps[0]} и ${DOOR_DATA.wSteps[DOOR_DATA.wSteps.length - 1]} мм.` };
    if (!rh) return { err: `Височината трябва да е между ${DOOR_DATA.hSteps[0]} и ${DOOR_DATA.hSteps[DOOR_DATA.hSteps.length - 1]} мм.` };
    return { price: DOOR_DATA.table[rh][DOOR_DATA.wSteps.indexOf(rw)], rw, rh };
  }
  if (tp === "roller") {
    const rw = roundUp(wv, ROLLER_DATA.wSteps);
    const rh = roundUp(hv, ROLLER_DATA.hSteps);
    if (!rw) return { err: "Широчината трябва да е между 500 и 1500 мм." };
    if (!rh) return { err: "Височината трябва да е между 600 и 2400 мм." };
    let foundGroup: (typeof ROLLER_DATA.groups)[0] | null = null;
    let colIdx = -1;
    for (const g of ROLLER_DATA.groups) {
      const ci = g.widths.indexOf(rw);
      if (ci !== -1) { foundGroup = g; colIdx = ci; break; }
    }
    const rowIdx = ROLLER_DATA.hSteps.indexOf(rh);
    if (!foundGroup || colIdx === -1 || rowIdx === -1) return { err: "Размерите са извън обхвата на ценовата таблица." };
    return { price: foundGroup.data[rowIdx][colIdx], rw, rh };
  }
  if (tp === "plisse") {
    const rw = roundUp(wv, PLISSE_DATA.wSteps);
    const rh = roundUp(hv, PLISSE_DATA.hSteps);
    if (!rw) return { err: "Широчината трябва да е между 700 и 2400 мм." };
    if (!rh) return { err: "Височината трябва да е между 600 и 2600 мм." };
    return { price: PLISSE_DATA.table[rh][PLISSE_DATA.wSteps.indexOf(rw)], rw, rh };
  }
  if (tp === "plisse2") {
    const rw = roundUp(wv, PLISSE2_DATA.wSteps);
    const rh = roundUp(hv, PLISSE2_DATA.hSteps);
    if (!rw) return { err: "Широчината трябва да е между 1200 и 4000 мм." };
    if (!rh) return { err: "Височината трябва да е между 1600 и 2600 мм." };
    return { price: PLISSE2_DATA.table[rh][PLISSE2_DATA.wSteps.indexOf(rw)], rw, rh };
  }
  return { err: "Непознат вид комарник." };
}

function fmtLv(eur: number): string {
  return `${(eur * EUR_BGN).toFixed(2)} лв.`;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  disabled,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        checked ? "bg-accent" : "bg-slate-200",
      ].join(" ")}
    >
      <span
        className={[
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

function CheckboxOption({
  checked,
  onChange,
  label,
  sublabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  sublabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-150",
        checked
          ? "border-accent/40 bg-accent/[0.07]"
          : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-[18px] w-[18px] min-w-[18px] items-center justify-center rounded-[5px] border transition-colors duration-150",
          checked ? "border-accent bg-accent" : "border-slate-300 bg-white",
        ].join(" ")}
        aria-hidden
      >
        {checked && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.5l3 2.5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        {sublabel && <span className="mt-0.5 block text-xs text-slate-500">{sublabel}</span>}
      </span>
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const FIELD_LABEL = "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-500";
const INPUT_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";

let idCounter = 0;

export function KomarnitsiKalkulator() {
  const [form, setForm] = useState({
    tp: "static" as NetType,
    w: "",
    h: "",
    isColor: false,
    qty: "1",
    hasFrame: false,
    hasHinges: false,
  });
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [services, setServices] = useState({ montage: false, delivery: false, measurement: false });
  const [showHelp, setShowHelp] = useState(false);

  const isDoor = form.tp === "door";

  // ── Live preview ──────────────────────────────────────────────────────────
  const preview = useMemo(() => {
    const wv = parseInt(form.w);
    const hv = parseInt(form.h);
    if (!form.w || !form.h || isNaN(wv) || isNaN(hv)) return null;
    const res = getBasePrice(form.tp, wv, hv);
    if (res.err) return { err: res.err };
    const qty = Math.max(1, parseInt(form.qty) || 1);
    let unit = res.price!;
    if (form.isColor) unit = Math.round(unit * 1.4);
    const frameAdd = form.hasFrame ? (form.isColor ? Math.round(30 * 1.4) : 30) : 0;
    const hingesAdd = form.hasHinges ? 20 : 0;
    unit += frameAdd + hingesAdd;
    return { ok: true, unit, total: unit * qty, qty, rw: res.rw!, rh: res.rh!, wv, hv, frameAdd, hingesAdd };
  }, [form]);

  // ── Totals ────────────────────────────────────────────────────────────────
  const totals = useMemo(() => {
    const sumItems = basket.reduce((s, i) => s + i.price, 0);
    const pieces = basket.reduce((s, i) => s + i.qty, 0);
    const montage = services.montage ? pieces * 10 : 0;
    const delivery = services.delivery ? 20 : 0;
    const measurement = services.measurement ? 20 : 0;
    return { sumItems, pieces, montage, delivery, measurement, grand: sumItems + montage + delivery + measurement };
  }, [basket, services]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleTypeChange(tp: NetType) {
    setForm((f) => ({ ...f, tp, hasFrame: false, hasHinges: false }));
  }

  function addToBasket() {
    const wv = parseInt(form.w);
    const hv = parseInt(form.h);
    if (!form.w || !form.h || isNaN(wv) || isNaN(hv)) {
      alert("Моля, въведете широчина и височина.");
      return;
    }
    const res = getBasePrice(form.tp, wv, hv);
    if (res.err) { alert(res.err); return; }

    const qty = Math.max(1, parseInt(form.qty) || 1);
    let unitPrice = res.price!;
    if (form.isColor) unitPrice = Math.round(unitPrice * 1.4);
    const frameAdd = form.hasFrame ? (form.isColor ? Math.round(30 * 1.4) : 30) : 0;
    const hingesAdd = form.hasHinges ? 20 : 0;
    unitPrice += frameAdd + hingesAdd;

    const item: BasketItem = {
      id: ++idCounter,
      tp: form.tp,
      label: TYPE_LABELS[form.tp],
      wInput: wv, hInput: hv,
      rw: res.rw!, rh: res.rh!,
      isColor: form.isColor,
      qty,
      unitPrice,
      price: unitPrice * qty,
      hasFrame: form.hasFrame, frameAdd,
      hasHinges: form.hasHinges,
    };

    setBasket((b) => [...b, item]);
    setForm((f) => ({ ...f, w: "", h: "", qty: "1", hasFrame: false, hasHinges: false }));
  }

  function removeFromBasket(id: number) {
    setBasket((b) => b.filter((i) => i.id !== id));
  }

  function handleMontageChange(v: boolean) {
    setServices((s) => ({
      ...s,
      montage: v,
      delivery: v ? true : s.delivery,
    }));
  }

  function handlePrint() {
    if (basket.length === 0) {
      alert("Моля, добавете поне един комарник преди да генерирате оферта.");
      return;
    }
    const { pieces, montage, delivery, measurement, grand } = totals;
    const hasMont = services.montage;
    const hasDeliv = services.delivery;
    const hasMeas = services.measurement;

    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const dateStr = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} г.`;
    const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())} ч.`;

    const tableRows = basket
      .map((item, i) => {
        const wRound = item.wInput !== item.rw ? `<br><span style="color:#888;font-size:11px;">табл. ${item.rw} мм</span>` : "";
        const hRound = item.hInput !== item.rh ? `<br><span style="color:#888;font-size:11px;">табл. ${item.rh} мм</span>` : "";
        const bg = i % 2 === 1 ? "background:#fafafa;" : "";
        let extras = "";
        if (item.hasFrame || item.hasHinges) {
          const p: string[] = [];
          if (item.hasFrame) p.push(`Каса +${item.frameAdd} €`);
          if (item.hasHinges) p.push("Напрегнати панти +20 €");
          extras = `<br><span style="color:#143e4a;font-size:11px;">${p.join(" · ")}</span>`;
        }
        return `<tr style="${bg}">
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;">${item.label}${extras}<br><span style="color:#888;font-size:11px;">${item.isColor ? "Цветен" : "Бял"}</span></td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:center;">${item.wInput}${wRound}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:center;">${item.hInput}${hRound}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:center;">${item.qty}</td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:right;">${item.unitPrice} €</td>
          <td style="padding:8px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:right;font-weight:600;">${item.price} €<br><span style="color:#888;font-size:11px;font-weight:400;">${fmtLv(item.price)}</span></td>
        </tr>`;
      })
      .join("");

    let servicesSection = "";
    if (hasMont || hasDeliv || hasMeas) {
      let rows = "";
      if (hasMont) rows += `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;font-size:12px;">Монтаж (${pieces} бр. × 10 €)</td><td style="padding:6px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:right;font-weight:600;">${montage} €</td></tr>`;
      if (hasDeliv) rows += `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;font-size:12px;">Доставка в гр. София</td><td style="padding:6px 10px;border-bottom:1px solid #eee;font-size:12px;text-align:right;font-weight:600;">20 €</td></tr>`;
      if (hasMeas) rows += `<tr><td style="padding:6px 10px;font-size:12px;">Вземане на размери и консултация в гр. София</td><td style="padding:6px 10px;font-size:12px;text-align:right;font-weight:600;">20 €</td></tr>`;
      servicesSection = `<p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#143e4a;margin:20px 0 8px;">Допълнителни услуги</p><table style="width:100%;border-collapse:collapse;border:1px solid #eee;"><tbody>${rows}</tbody></table>`;
    }

    const html = `<!DOCTYPE html><html lang="bg"><head><meta charset="UTF-8"><title>Оферта_Лотос98</title>
<style>@page{margin:14mm 16mm;size:A4;}body{font-family:Arial,sans-serif;font-size:13px;color:#1a1a1a;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}*{box-sizing:border-box;}</style>
</head><body>
<table style="width:100%;border-collapse:collapse;border-bottom:2px solid #143e4a;padding-bottom:14px;margin-bottom:20px;">
  <tr>
    <td style="vertical-align:top;padding-bottom:14px;"><div style="font-size:22px;font-weight:700;color:#143e4a;letter-spacing:0.05em;margin-bottom:5px;">Лотос 98 ООД</div><div style="font-size:11px;color:#555;line-height:1.7;">София 1421, ул. Резньовете №7, вх. В, ап. 29<br>с. Лозен 1151, ул. Райовец №13<br>GSM: 0894 724 164 · 0899 859 276<br>office@lotos98.eu</div></td>
    <td style="vertical-align:top;text-align:right;padding-bottom:14px;"><div style="font-size:24px;font-weight:700;color:#1a1a1a;margin-bottom:5px;">Ценова оферта</div><div style="font-size:12px;color:#555;">Дата: ${dateStr} · ${timeStr}</div><div style="font-size:11px;color:#143e4a;margin-top:4px;">Цени с ДДС · Валидни от 06.04.2026 г.</div></td>
  </tr>
</table>
<p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#143e4a;margin:0 0 8px;">Комарници</p>
<table style="width:100%;border-collapse:collapse;border:1px solid #eee;">
  <thead><tr style="background:#143e4a;">
    <th style="padding:8px 10px;text-align:left;font-size:11px;color:#fff;font-weight:500;">Вид комарник</th>
    <th style="padding:8px 10px;text-align:center;font-size:11px;color:#fff;font-weight:500;">Широчина (мм)</th>
    <th style="padding:8px 10px;text-align:center;font-size:11px;color:#fff;font-weight:500;">Височина (мм)</th>
    <th style="padding:8px 10px;text-align:center;font-size:11px;color:#fff;font-weight:500;">Брой</th>
    <th style="padding:8px 10px;text-align:right;font-size:11px;color:#fff;font-weight:500;">Ед. цена</th>
    <th style="padding:8px 10px;text-align:right;font-size:11px;color:#fff;font-weight:500;">Сума</th>
  </tr></thead>
  <tbody>${tableRows}</tbody>
</table>
${servicesSection}
<div style="margin-top:20px;border-top:2px solid #143e4a;padding-top:14px;text-align:right;">
  <div style="font-size:12px;color:#555;margin-bottom:4px;">Обща сума (${pieces} бр. комарници)</div>
  <div style="font-size:32px;font-weight:700;color:#143e4a;line-height:1;">${grand} €</div>
  <div style="font-size:16px;color:#555;margin-top:4px;">${fmtLv(grand)}</div>
</div>
<div style="margin-top:24px;font-size:11px;color:#777;line-height:1.6;border-top:1px solid #eee;padding-top:12px;">
  Забележка: При закръгляне на размерите нагоре стойностите „табл." показват таблично закръгления размер, по който е определена цената. Цените са с включен ДДС. Офертата е изготвена на ${dateStr} в ${timeStr}.
</div>
</body></html>`;

    const w = window.open("", "_blank", "width=794,height=1123");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 500);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const frameHintPrice = form.isColor ? 42 : 30;

  return (
    <section className="border-t border-slate-200/80 bg-[#f8f9fa] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Heading row */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading align="start" titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Калкулатор за комарници
          </SectionHeading>
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="mb-1 flex items-center gap-1.5 rounded-lg border-[1.5px] border-slate-200/90 bg-transparent px-5 py-3 text-[14px] font-semibold text-[#444] transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-500" aria-hidden>?</span>
            Как работи?
          </button>
        </div>
        <p className="mt-1 text-sm text-slate-500">Цени с ДДС · Валидни от 06.04.2026 г.</p>

        {/* Main grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {/* ── LEFT: Add form ── */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-5 border-b border-slate-100 pb-3 text-base font-semibold text-slate-900">
              Добавяне на комарник
            </h3>

            <div className="space-y-4">
              {/* Type */}
              <div>
                <label htmlFor="kk-tp" className={FIELD_LABEL}>Вид комарник</label>
                <div className="relative">
                  <select
                    id="kk-tp"
                    value={form.tp}
                    onChange={(e) => handleTypeChange(e.target.value as NetType)}
                    className={INPUT_CLASS + " cursor-pointer appearance-none pr-9"}
                  >
                    <option value="static">Статичен комарник — профил 25/17 мм</option>
                    <option value="window">Комарник на панти за прозорец — 25/17 мм</option>
                    <option value="door">Комарник на панти за балконска врата — 42/17 мм</option>
                    <option value="roller">Ролетен комарник</option>
                    <option value="plisse">Комарник едностранно плисе</option>
                    <option value="plisse2">Комарник двустранно плисе</option>
                  </select>
                  <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Width + Height */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="kk-w" className={FIELD_LABEL}>Широчина (мм)</label>
                  <input
                    id="kk-w"
                    type="number"
                    min="1"
                    placeholder="напр. 700"
                    value={form.w}
                    onChange={(e) => setForm((f) => ({ ...f, w: e.target.value }))}
                    className={INPUT_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="kk-h" className={FIELD_LABEL}>Височина (мм)</label>
                  <input
                    id="kk-h"
                    type="number"
                    min="1"
                    placeholder="напр. 1400"
                    value={form.h}
                    onChange={(e) => setForm((f) => ({ ...f, h: e.target.value }))}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Color + Qty */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="kk-color" className={FIELD_LABEL}>Цвят</label>
                  <div className="relative">
                    <select
                      id="kk-color"
                      value={form.isColor ? "color" : "white"}
                      onChange={(e) => setForm((f) => ({ ...f, isColor: e.target.value === "color" }))}
                      className={INPUT_CLASS + " cursor-pointer appearance-none pr-9"}
                    >
                      <option value="white">Бял</option>
                      <option value="color">Цветен (+40%)</option>
                    </select>
                    <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="kk-qty" className={FIELD_LABEL}>Брой (бр.)</label>
                  <input
                    id="kk-qty"
                    type="number"
                    min="1"
                    max="999"
                    value={form.qty}
                    onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {/* Door-only extras */}
              {isDoor && (
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-accent-dark">
                    Допълнителни опции за врата
                  </p>
                  <CheckboxOption
                    checked={form.hasFrame}
                    onChange={(v) => setForm((f) => ({ ...f, hasFrame: v }))}
                    label={`С каса от профил 25/17 мм.`}
                    sublabel={`+${frameHintPrice} €`}
                  />
                  <CheckboxOption
                    checked={form.hasHinges}
                    onChange={(v) => setForm((f) => ({ ...f, hasHinges: v }))}
                    label="С напрегнати панти"
                    sublabel="+20 €"
                  />
                </div>
              )}

              {/* Preview */}
              {preview && (
                <div>
                  {preview.err ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {preview.err}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/[0.07] px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">
                          {preview.wv}
                          {preview.wv !== preview.rw && (
                            <span className="ml-1 inline-block rounded-full bg-accent/20 px-1.5 py-px text-[10px] font-semibold text-accent-dark">
                              ↑ {preview.rw}
                            </span>
                          )}
                          {" × "}
                          {preview.hv}
                          {preview.hv !== preview.rh && (
                            <span className="ml-1 inline-block rounded-full bg-accent/20 px-1.5 py-px text-[10px] font-semibold text-accent-dark">
                              ↑ {preview.rh}
                            </span>
                          )}
                          {" мм"}
                          {form.isColor && " · цветен"}
                        </p>
                        {((preview.frameAdd ?? 0) > 0 || form.hasHinges) && (
                          <p className="mt-0.5 text-xs text-accent-dark">
                            {(preview.frameAdd ?? 0) > 0 && `+ каса ${preview.frameAdd} €`}
                            {(preview.frameAdd ?? 0) > 0 && form.hasHinges && " · "}
                            {form.hasHinges && "+ напрегнати панти 20 €"}
                          </p>
                        )}
                        {(preview.qty ?? 0) > 1 && (
                          <p className="mt-0.5 text-xs text-slate-500">{preview.qty} бр. × {preview.unit} €</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold tabular-nums text-accent-dark">{preview.total} €</p>
                        <p className="text-xs text-slate-500">{fmtLv(preview.total ?? 0)}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={addToBasket}
              className="mt-5 w-full rounded-xl bg-brand-800 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-900 hover:shadow-md active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              + Добави към поръчката
            </button>
          </div>

          {/* ── RIGHT: Basket + Services + Total ── */}
          <div className="flex flex-col gap-4">

            {/* Basket */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-4 border-b border-slate-100 pb-3 text-base font-semibold text-slate-900">
                Поръчка
              </h3>
              {basket.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-400">Все още няма добавени комарници.</p>
              ) : (
                <ul className="space-y-0 divide-y divide-slate-100">
                  {basket.map((item, i) => (
                    <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="mt-0.5 flex h-6 w-6 min-w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">{item.label}</p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.qty > 1 && <strong className="text-slate-700">{item.qty} бр. · </strong>}
                          {item.wInput}
                          {item.wInput !== item.rw && (
                            <span className="ml-1 inline-block rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-500">↑ {item.rw}</span>
                          )}
                          {" × "}
                          {item.hInput}
                          {item.hInput !== item.rh && (
                            <span className="ml-1 inline-block rounded-full bg-slate-100 px-1.5 py-px text-[10px] font-semibold text-slate-500">↑ {item.rh}</span>
                          )}
                          {" мм · "}
                          {item.isColor ? <span className="text-accent-dark">цветен</span> : "бял"}
                        </p>
                        {(item.hasFrame || item.hasHinges) && (
                          <p className="mt-0.5 text-xs text-accent-dark">
                            {item.hasFrame && `+ каса ${item.frameAdd} €`}
                            {item.hasFrame && item.hasHinges && " · "}
                            {item.hasHinges && "+ напрегнати панти 20 €"}
                          </p>
                        )}
                        {item.qty > 1 && (
                          <p className="mt-0.5 text-xs text-slate-400">{item.qty} × {item.unitPrice} €</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold tabular-nums text-accent-dark">{item.price} €</p>
                        <p className="text-xs text-slate-400">{fmtLv(item.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromBasket(item.id)}
                        aria-label="Премахни"
                        className="mt-0.5 rounded px-1 py-0.5 text-slate-300 transition-colors hover:text-red-400"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Services */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-4 border-b border-slate-100 pb-3 text-base font-semibold text-slate-900">
                Допълнителни услуги
              </h3>
              <div className="space-y-0 divide-y divide-slate-100">
                {/* Montage */}
                <div className="flex items-center justify-between py-3 first:pt-0">
                  <div>
                    <p className="text-sm text-slate-800">Монтаж</p>
                    <p className="text-xs text-slate-500">
                      {basket.length > 0 ? `${totals.pieces} × 10 € = ${totals.pieces * 10} €` : "+10 € за всеки комарник"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm tabular-nums text-slate-500">
                      {services.montage && basket.length > 0 ? `${totals.montage} €` : "—"}
                    </span>
                    <Toggle
                      checked={services.montage}
                      onChange={handleMontageChange}
                      ariaLabel="Монтаж"
                    />
                  </div>
                </div>
                {/* Delivery */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-slate-800">Доставка в гр. София</p>
                    <p className="text-xs text-slate-500">+20 € еднократно</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {services.montage && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent-dark">
                        задължителна
                      </span>
                    )}
                    <span className="text-sm tabular-nums text-slate-500">
                      {services.delivery ? "20 €" : "—"}
                    </span>
                    <Toggle
                      checked={services.delivery}
                      disabled={services.montage}
                      onChange={(v) => setServices((s) => ({ ...s, delivery: v }))}
                      ariaLabel="Доставка"
                    />
                  </div>
                </div>
                {/* Measurement */}
                <div className="flex items-center justify-between py-3 last:pb-0">
                  <div>
                    <p className="text-sm text-slate-800">Вземане на размери и консултация</p>
                    <p className="text-xs text-slate-500">+20 € еднократно · гр. София</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm tabular-nums text-slate-500">
                      {services.measurement ? "20 €" : "—"}
                    </span>
                    <Toggle
                      checked={services.measurement}
                      onChange={(v) => setServices((s) => ({ ...s, measurement: v }))}
                      ariaLabel="Вземане на размери"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            {basket.length > 0 && (
              <div className="rounded-2xl bg-brand-900 px-6 py-5 shadow-md">
                <div className="mb-3 space-y-1.5">
                  <div className="flex justify-between text-sm text-white/75">
                    <span>Комарници ({totals.pieces} бр.)</span>
                    <span className="text-white/90 font-medium">{totals.sumItems} €</span>
                  </div>
                  {services.montage && (
                    <div className="flex justify-between text-sm text-white/75">
                      <span>Монтаж ({totals.pieces} × 10 €)</span>
                      <span className="text-white/90 font-medium">{totals.montage} €</span>
                    </div>
                  )}
                  {services.delivery && (
                    <div className="flex justify-between text-sm text-white/75">
                      <span>Доставка</span>
                      <span className="text-white/90 font-medium">20 €</span>
                    </div>
                  )}
                  {services.measurement && (
                    <div className="flex justify-between text-sm text-white/75">
                      <span>Вземане на размери</span>
                      <span className="text-white/90 font-medium">20 €</span>
                    </div>
                  )}
                </div>
                <hr className="border-white/20" />
                <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold tabular-nums text-white">{totals.grand} €</span>
                  <span className="text-lg text-white/70">({fmtLv(totals.grand)})</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Print button */}
        <button
          type="button"
          onClick={handlePrint}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden>
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Печат / Запази като PDF
        </button>
      </div>

      {/* Instructions modal */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 id="kk-modal-title" className="text-lg font-semibold text-slate-900">Инструкция за работа</h3>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                aria-label="Затвори"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-[72vh] space-y-5 overflow-y-auto px-6 py-5">
              {[
                {
                  n: "1",
                  title: "Изберете вид комарник",
                  text: "От полето „Вид комарник\" изберете желания тип — статичен, на панти за прозорец, на панти за балконска врата, ролетен, едностранно или двустранно плисе.",
                },
                {
                  n: "2",
                  title: "Въведете размерите",
                  text: "Въведете широчината и височината в милиметри. Ако размерите не съвпадат точно с таблична стойност, програмата автоматично закръглява нагоре и го отбелязва.",
                },
                {
                  n: "3",
                  title: "Изберете цвят и брой",
                  text: "Изберете бял или цветен комарник — цветният вариант е с 40% по-скъп. Въведете желания брой бройки.",
                },
                {
                  n: "4",
                  title: "Добавете към поръчката",
                  text: "Натиснете „+ Добави към поръчката\". Можете да добавите множество комарници с различни размери и видове.",
                },
                {
                  n: "5",
                  title: "Изберете допълнителни услуги",
                  text: "При нужда включете монтаж (10 € / бр.), доставка (20 € еднократно) или вземане на размери (20 € еднократно). При включен монтаж доставката е задължителна.",
                },
                {
                  n: "6",
                  title: "Запазете офертата",
                  text: "Натиснете „Печат / Запази като PDF\" за разпечатка или запазване на офертата в PDF формат.",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4">
                  <span className="flex h-7 w-7 min-w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
