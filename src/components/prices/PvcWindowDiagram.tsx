import { useId } from "react";
import type { PvcLShapeDiagram, PvcPanelSpec, PvcRectangleDiagram, PvcWindowDiagramSpec } from "@/content/pvcPricesPageData";

const FRAME_OUTER_FILL = "#f4f6f8";
const FRAME_OUTER_STROKE = "#64748b";
const FRAME_INNER_FILL = "#f1f5f9";
const FRAME_INNER_STROKE = "#8b95a3";
const SASH_FILL = "#eef2f6";
const SASH_STROKE = "#94a3b8";
/** Отваряеми диагонали — същият тон като саш профил около стъклото (всички схеми). */
const OPENING_BRACE_STROKE = SASH_STROKE;
const GLASS_EDGE = "#a8cce0";
const MULLION_FILL = "#c5ced9";
const MULLION_STROKE = "#6f7c8c";
const WALL_FILL = "#e8edf2";
const WALL_STROKE = "#a8b0bd";
const LABEL = "#64748b";

/** Distance from outer profile to sash packing area (double frame effect) */
const FRAME_REVEAL = 5.5;
const SASH_INSET = 3.1;
const MULL_GAP = 6;
const OUTER_RX = 3.2;
const INNER_FRAME_RX = 2.4;
const SASH_RX = 2;
const GLASS_RX = 1.7;

const STROKE_OUTER = 2.85;
const STROKE_INNER = 1.9;
/** Tilt-turn V legs — slightly thinner than casement diagonals for visual balance */
const BRACE_WIDTH = 4.35;
const CASEMENT_BRACE = 4.8;
const MULLION_WIDTH = 5.2;

type Box = { x: number; y: number; w: number; h: number };

/** Closed rounded-rect path for stroking (CCW from top-left). */
function roundedRectOutlinePath(x: number, y: number, w: number, h: number, rx: number): string {
  const r = Math.min(Math.max(rx, 0), w / 2 - 1e-6, h / 2 - 1e-6);
  return [
    `M ${x + r} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

function extraShellCornerRx(wBox: number, hBox: number, inflate: number): number {
  return Math.min(OUTER_RX + inflate * 0.78, wBox / 2 - 1e-6, hBox / 2 - 1e-6);
}

/** CCW orthogonal loop; 90° vertices get quarter-arcs (sweep tuned for y-down SVG). */
function filletClosedOrthogonalPath(vertices: { x: number; y: number }[], rMax: number): string {
  const n = vertices.length;
  if (n < 3) return "";
  let d = "";
  for (let i = 0; i < n; i++) {
    const pPrev = vertices[(i + n - 1) % n]!;
    const p = vertices[i]!;
    const pNext = vertices[(i + 1) % n]!;
    const vIn = { x: p.x - pPrev.x, y: p.y - pPrev.y };
    const vOut = { x: pNext.x - p.x, y: pNext.y - p.y };
    const lenIn = Math.hypot(vIn.x, vIn.y);
    const lenOut = Math.hypot(vOut.x, vOut.y);
    if (lenIn < 1e-9 || lenOut < 1e-9) continue;
    const uIn = { x: vIn.x / lenIn, y: vIn.y / lenIn };
    const uOut = { x: vOut.x / lenOut, y: vOut.y / lenOut };
    const cross = uIn.x * uOut.y - uIn.y * uOut.x;
    const dot = uIn.x * uOut.x + uIn.y * uOut.y;
    const turn90 = Math.abs(dot) < 0.05;
    const r = Math.min(rMax, lenIn / 2 - 1e-4, lenOut / 2 - 1e-4);
    if (r < 1e-4 || (!turn90 && cross <= 0)) {
      if (i === 0) d += `M ${p.x} ${p.y}`;
      else d += `L ${p.x} ${p.y}`;
      continue;
    }
    const start = { x: p.x - uIn.x * r, y: p.y - uIn.y * r };
    const end = { x: p.x + uOut.x * r, y: p.y + uOut.y * r };
    if (i === 0) d += `M ${start.x} ${start.y}`;
    else d += `L ${start.x} ${start.y}`;
    const sweep = cross < 0 ? 1 : 0;
    d += `A ${r} ${r} 0 0 ${sweep} ${end.x} ${end.y}`;
  }
  d += "Z";
  return d;
}

function minEdgeLengthPoly(vertices: { x: number; y: number }[]): number {
  const n = vertices.length;
  let m = Infinity;
  for (let i = 0; i < n; i++) {
    const a = vertices[i]!;
    const b = vertices[(i + 1) % n]!;
    m = Math.min(m, Math.hypot(b.x - a.x, b.y - a.y));
  }
  return m;
}

/** Един затворен контур около union(врата, прозорец) — плоско горе, без „сърце“ в процепа. */
function pairTwinUnionOutlinePath(
  door: Box,
  win: Box,
  inflateM: number,
  /** По-малки филета на стъпаловидния контур (каталожна двойка врата+прозорец). */
  steppedCornerRx: number = OUTER_RX,
  /** Горна граница за филет на стъпаловидния контур. */
  steppedFilletMaxRx: number = 6,
): string {
  const gap = win.x - door.x - door.w;
  const inflate = Math.max(0, inflateM);
  const M = inflate > 0 ? Math.min(inflate, Math.max(0.15, (gap - 0.35) / 2)) : 0;

  const hD = door.h;
  const hW = win.h;
  const x0 = door.x;
  const y0 = door.y;
  const xWR = win.x + win.w;
  const xWL = win.x;
  const xDR = door.x + door.w;
  const botD = door.y + hD;
  const botW = win.y + hW;

  if (Math.abs(hD - hW) < 1e-4) {
    const w = door.w + gap + win.w;
    const h = hD;
    const rx = extraShellCornerRx(w + 2 * M, h + 2 * M, M);
    return roundedRectOutlinePath(x0 - M, y0 - M, w + 2 * M, h + 2 * M, rx);
  }

  const verts: { x: number; y: number }[] =
    hD > hW
      ? [
          { x: x0 - M, y: y0 - M },
          { x: xWR + M, y: y0 - M },
          { x: xWR + M, y: botW + M },
          { x: xWL - M, y: botW + M },
          { x: xWL - M, y: botD + M },
          { x: xDR + M, y: botD + M },
          { x: x0 - M, y: botD + M },
        ]
      : [
          { x: x0 - M, y: y0 - M },
          { x: xWR + M, y: y0 - M },
          { x: xWR + M, y: botW + M },
          { x: xWL - M, y: botW + M },
          { x: xWL - M, y: botD + M },
          { x: x0 - M, y: botD + M },
        ];

  const rxCap =
    inflate > 0
      ? extraShellCornerRx(
          Math.max(xWR - x0 + 2 * M, 1),
          Math.max(Math.max(botD, botW) - y0 + 2 * M, 1),
          M,
        )
      : Math.min(steppedCornerRx, minEdgeLengthPoly(verts) / 2 - 0.08, steppedFilletMaxRx);

  return filletClosedOrthogonalPath(verts, rxCap);
}

/**
 * Union outline за врата + квадратен транзом + тясно крило вдясно (еднакъв долен ръб на прозоречния ред).
 * Разширява горния хоризонтален сегмент до десния ръб на тясното крило; долният контур на реда минава над трите панела.
 */
function pairTwinUnionOutlinePathThree(
  door: Box,
  win: Box,
  narrow: Box,
  inflateM: number,
  steppedCornerRx: number = OUTER_RX,
  steppedFilletMaxRx: number = 6,
): string {
  const gapWin = win.x - door.x - door.w;
  const gapNarrow = narrow.x - win.x - win.w;
  const inflate = Math.max(0, inflateM);
  const MWin = inflate > 0 ? Math.min(inflate, Math.max(0.15, (gapWin - 0.35) / 2)) : 0;
  const MNarrow = inflate > 0 ? Math.min(inflate, Math.max(0.15, (gapNarrow - 0.35) / 2)) : 0;
  const M = Math.max(MWin, MNarrow);

  const hD = door.h;
  const hW = win.h;
  const x0 = door.x;
  const y0 = door.y;
  const xNR = narrow.x + narrow.w;
  const xWL = win.x;
  const xDR = door.x + door.w;
  const botD = door.y + hD;
  const botW = win.y + hW;

  if (Math.abs(hD - hW) < 1e-4) {
    const w = door.w + gapWin + win.w + gapNarrow + narrow.w;
    const h = hD;
    const rx = extraShellCornerRx(w + 2 * M, h + 2 * M, M);
    return roundedRectOutlinePath(x0 - M, y0 - M, w + 2 * M, h + 2 * M, rx);
  }

  const verts: { x: number; y: number }[] =
    hD > hW
      ? [
          { x: x0 - M, y: y0 - M },
          { x: xNR + M, y: y0 - M },
          { x: xNR + M, y: botW + M },
          { x: xWL - M, y: botW + M },
          { x: xWL - M, y: botD + M },
          { x: xDR + M, y: botD + M },
          { x: x0 - M, y: botD + M },
        ]
      : [
          { x: x0 - M, y: y0 - M },
          { x: xNR + M, y: y0 - M },
          { x: xNR + M, y: botW + M },
          { x: xWL - M, y: botW + M },
          { x: x0 - M, y: botD + M },
        ];

  const rxCap =
    inflate > 0
      ? extraShellCornerRx(Math.max(xNR - x0 + 2 * M, 1), Math.max(Math.max(botD, botW) - y0 + 2 * M, 1), M)
      : Math.min(steppedCornerRx, minEdgeLengthPoly(verts) / 2 - 0.08, steppedFilletMaxRx);

  return filletClosedOrthogonalPath(verts, rxCap);
}

/**
 * Един непрекъснат саш контур за L-образ: високо крило + горен десен транзом.
 * При еднакъв долен ръб → като хоризонтална двойка; иначе стъпаловиден ръб с филета.
 */
function lShapeMergedSashOutlinePath(door: Box, trans: Box, rx: number): string {
  const yDoorBot = door.y + door.h;
  const yTransBot = trans.y + trans.h;
  if (Math.abs(yDoorBot - yTransBot) < 1e-4) {
    return pairTwinUnionOutlinePath(door, trans, 0);
  }

  const xd = door.x;
  const yd = door.y;
  const xDR = xd + door.w;
  const xTR = trans.x + trans.w;
  const xt = trans.x;
  const ytb = trans.y + trans.h;
  const ydb = door.y + door.h;

  if (xt + 1e-6 < xDR) {
    return roundedRectOutlinePath(door.x, door.y, door.w, door.h, rx);
  }

  const verts: { x: number; y: number }[] = [
    { x: xd, y: yd },
    { x: xTR, y: yd },
    { x: xTR, y: ytb },
    { x: xt, y: ytb },
    { x: xDR, y: ytb },
    { x: xDR, y: ydb },
    { x: xd, y: ydb },
  ];
  const rxCap = Math.min(rx, minEdgeLengthPoly(verts) / 2 - 0.08, 5);
  return filletClosedOrthogonalPath(verts, rxCap);
}

function sanitizeDefsId(raw: string): string {
  return `w${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
}

function DiagramDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0%" stopColor="#f2f9fc" />
        <stop offset="55%" stopColor="#dbeefd" />
        <stop offset="100%" stopColor="#c5e0f0" />
      </linearGradient>
      <filter id={`${id}-glassSoft`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.8" floodColor="#0f172a" floodOpacity="0.09" />
      </filter>
    </defs>
  );
}

function openingDiagonalMode(index: number, count: number): "left" | "right" {
  if (count <= 1) return "left";
  if (index === 0) return "left";
  if (index === count - 1) return "right";
  return index < count / 2 ? "left" : "right";
}

/** Shorten segment slightly so stroke-linecap:round stays inside glass (no bleed into sash/frame). */
function roundBraceSegment(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  strokeWidth: number,
): { x1s: number; y1s: number; x2s: number; y2s: number } {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) {
    return { x1s: x1, y1s: y1, x2s: x2, y2s: y2 };
  }
  const ux = dx / len;
  const uy = dy / len;
  const inset = strokeWidth * 0.52;
  return {
    x1s: x1 + ux * inset,
    y1s: y1 + uy * inset,
    x2s: x2 - ux * inset,
    y2s: y2 - uy * inset,
  };
}

/**
 * Точка върху горния ляв закръглен ъгъл: права острият ъгъл → apex, пресечена с дъгата (център (x+r,y+r)).
 */
function glassTopLeftCornerOnArc(glass: Box, r: number, ax: number, ay: number): { x: number; y: number } {
  const { x: gx, y: gy, w, h } = glass;
  const dx = ax - gx;
  const dy = ay - gy;
  const A = dx * dx + dy * dy;
  if (A < 1e-12) return { x: gx + r, y: gy };
  const a = A;
  const b = -2 * r * (dx + dy);
  const c = r * r;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return { x: gx + r * (1 - Math.SQRT1_2), y: gy + r * (1 - Math.SQRT1_2) };
  const s = Math.sqrt(disc);
  const t1 = (-b - s) / (2 * a);
  const t2 = (-b + s) / (2 * a);
  const cand = [t1, t2].filter((t) => Number.isFinite(t) && t > 1e-6);
  const t = cand.length ? Math.min(...cand) : 0.05;
  return { x: gx + t * dx, y: gy + t * dy };
}

/**
 * Точка върху долния ляв закръглен ъгъл: център (x+r, y+h−r).
 */
function glassBottomLeftCornerOnArc(glass: Box, r: number, ax: number, ay: number): { x: number; y: number } {
  const { x: gx, y: gy, w, h } = glass;
  const sx = gx;
  const sy = gy + h;
  const dx = ax - sx;
  const dy = ay - sy;
  const A = dx * dx + dy * dy;
  if (A < 1e-12) return { x: gx + r, y: sy - r };
  const a = A;
  const b = 2 * r * (dy - dx);
  const c = r * r;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return { x: gx + r * (1 - Math.SQRT1_2), y: sy - r * (1 - Math.SQRT1_2) };
  const s = Math.sqrt(disc);
  const t1 = (-b - s) / (2 * a);
  const t2 = (-b + s) / (2 * a);
  const cand = [t1, t2].filter((t) => Number.isFinite(t) && t > 1e-6);
  const t = cand.length ? Math.min(...cand) : 0.05;
  return { x: sx + t * dx, y: sy + t * dy };
}

function OpeningMark({ box, mode, braceStroke }: { box: Box; mode: "left" | "right"; braceStroke: string }) {
  const { x, y, w, h } = box;
  const sw = CASEMENT_BRACE;
  const cap = "round" as const;
  const join = "round" as const;
  if (mode === "left") {
    const s = roundBraceSegment(x, y + h, x + w, y, sw);
    return (
      <line x1={s.x1s} y1={s.y1s} x2={s.x2s} y2={s.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
    );
  }
  const s = roundBraceSegment(x + w, y + h, x, y, sw);
  return <line x1={s.x1s} y1={s.y1s} x2={s.x2s} y2={s.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />;
}

function TiltTurnVLeftHingeMark({ box, apexX, braceStroke }: { box: Box; apexX: number; braceStroke: string }) {
  const { x, y, h } = box;
  const ry = y + h / 2;
  const sw = BRACE_WIDTH;
  const cap = "round" as const;
  const join = "round" as const;
  const top = roundBraceSegment(x, y, apexX, ry, sw);
  const bot = roundBraceSegment(x, y + h, apexX, ry, sw);
  return (
    <g>
      <line x1={top.x1s} y1={top.y1s} x2={top.x2s} y2={top.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
      <line x1={bot.x1s} y1={bot.y1s} x2={bot.x2s} y2={bot.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
    </g>
  );
}

/** Като TiltTurnVLeftHingeMark, но един общ връх в (apexX, ry) — без двойно прибиране на краищата към върха. */
function TiltTurnVLeftHingeExactApex({ box, apexX, braceStroke }: { box: Box; apexX: number; braceStroke: string }) {
  const { x, y, h } = box;
  const ry = y + h / 2;
  const sw = BRACE_WIDTH;
  const inset = sw * 0.52;
  const lenT = Math.hypot(apexX - x, ry - y);
  const lenB = Math.hypot(apexX - x, ry - (y + h));
  const tStart =
    lenT > 1e-6
      ? { x: x + ((apexX - x) / lenT) * inset, y: y + ((ry - y) / lenT) * inset }
      : { x, y };
  const bStart =
    lenB > 1e-6
      ? { x: x + ((apexX - x) / lenB) * inset, y: y + h + ((ry - (y + h)) / lenB) * inset }
      : { x, y: y + h };
  const d = `M ${tStart.x} ${tStart.y} L ${apexX} ${ry} L ${bStart.x} ${bStart.y}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={braceStroke}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** V към муле отляво — горен/десен и долен/десен ъгъл на стъклото към apex (дясно крило). */
function TiltTurnVRightHingeMark({ box, apexX, braceStroke }: { box: Box; apexX: number; braceStroke: string }) {
  const { x, y, w, h } = box;
  const ry = y + h / 2;
  const sw = BRACE_WIDTH;
  const cap = "round" as const;
  const join = "round" as const;
  const xr = x + w;
  const top = roundBraceSegment(xr, y, apexX, ry, sw);
  const bot = roundBraceSegment(xr, y + h, apexX, ry, sw);
  return (
    <g>
      <line x1={top.x1s} y1={top.y1s} x2={top.x2s} y2={top.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
      <line x1={bot.x1s} y1={bot.y1s} x2={bot.x2s} y2={bot.y2s} stroke={braceStroke} strokeWidth={sw} strokeLinecap={cap} strokeLinejoin={join} />
    </g>
  );
}

function OpeningMarksForPanel({
  box,
  panel,
  index,
  count,
  tiltTurnApexX,
  tiltTurnExactLeftApexJoin,
  braceStroke,
}: {
  box: Box;
  panel: PvcPanelSpec;
  index: number;
  count: number;
  tiltTurnApexX?: number;
  /** Един връх точно в (apexX, midY); горен/долен ляв ъгъл като старт (само избрани схеми). */
  tiltTurnExactLeftApexJoin?: boolean;
  braceStroke: string;
}) {
  if (panel.type === "fixed") return null;
  const style = panel.openingStyle ?? "casement";
  if (style === "tilt-turn") {
    const apex = tiltTurnApexX ?? box.x + box.w - 5;
    const midX = box.x + box.w / 2;
    if (tiltTurnExactLeftApexJoin && apex >= midX) {
      return <TiltTurnVLeftHingeExactApex box={box} apexX={apex} braceStroke={braceStroke} />;
    }
    if (apex < midX) {
      return <TiltTurnVRightHingeMark box={box} apexX={apex} braceStroke={braceStroke} />;
    }
    return <TiltTurnVLeftHingeMark box={box} apexX={apex} braceStroke={braceStroke} />;
  }
  return <OpeningMark box={box} mode={openingDiagonalMode(index, count)} braceStroke={braceStroke} />;
}

function GlassSashPane({
  cellBox,
  panel,
  index,
  count,
  tiltTurnApexX,
  tiltTurnExactLeftApexJoin,
  defsId,
  braceStroke = OPENING_BRACE_STROKE,
  omitSashProfile = false,
}: {
  cellBox: Box;
  panel: PvcPanelSpec;
  index: number;
  count: number;
  tiltTurnApexX?: number;
  tiltTurnExactLeftApexJoin?: boolean;
  defsId: string;
  braceStroke?: string;
  /** Без сивия саш профил — директно стъкло (само за избрани схеми). */
  omitSashProfile?: boolean;
}) {
  const { x, y, w, h } = cellBox;
  const g = SASH_INSET;
  const glassBox: Box = {
    x: x + g,
    y: y + g,
    w: Math.max(4, w - g * 2),
    h: Math.max(4, h - g * 2),
  };

  return (
    <g>
      {!omitSashProfile ? (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={SASH_RX}
          fill={SASH_FILL}
          stroke={SASH_STROKE}
          strokeWidth={STROKE_INNER}
        />
      ) : null}
      <rect
        x={glassBox.x}
        y={glassBox.y}
        width={glassBox.w}
        height={glassBox.h}
        rx={GLASS_RX}
        fill={`url(#${defsId}-glass)`}
        stroke={GLASS_EDGE}
        strokeWidth={1.05}
        filter={`url(#${defsId}-glassSoft)`}
      />
      <OpeningMarksForPanel
        box={glassBox}
        panel={panel}
        index={index}
        count={count}
        tiltTurnApexX={tiltTurnApexX}
        tiltTurnExactLeftApexJoin={tiltTurnExactLeftApexJoin}
        braceStroke={braceStroke}
      />
    </g>
  );
}

function OuterWindowFrame({ box }: { box: Box }) {
  const { x, y, w, h } = box;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={OUTER_RX}
        fill={FRAME_OUTER_FILL}
        stroke={FRAME_OUTER_STROKE}
        strokeWidth={STROKE_OUTER}
      />
      <rect
        x={x + FRAME_REVEAL}
        y={y + FRAME_REVEAL}
        width={w - FRAME_REVEAL * 2}
        height={h - FRAME_REVEAL * 2}
        rx={INNER_FRAME_RX}
        fill={FRAME_INNER_FILL}
        stroke={FRAME_INNER_STROKE}
        strokeWidth={STROKE_INNER}
      />
    </g>
  );
}

/** Каталожна дръжка: тънка бяла, хоризонтално рамо от вертикалната основа на мулето. */
function MullionSashHandle({
  cx,
  cy,
  innerHeight,
  armDirection = "left",
}: {
  cx: number;
  cy: number;
  innerHeight: number;
  /** Хоризонталното рамо: наляво (като досега) или надясно (огледално). */
  armDirection?: "left" | "right";
}) {
  const baseW = 3.5;
  const baseH = Math.min(20, innerHeight * 0.24);
  const armLen = 12;
  const armThick = 3.15;
  const armRx = Math.min(1.6, armThick / 2 - 0.1);
  const baseRx = 1.9;
  const fill = "#fafafa";
  const fillBase = "#f3f4f6";
  const outline = "#94a3b8";
  const strokeW = 0.85;
  const armY = cy - armThick / 2;
  const armX =
    armDirection === "left"
      ? cx - baseW / 2 + 0.85 - armLen
      : cx + baseW / 2 - 0.85;

  return (
    <g>
      <rect
        x={cx - baseW / 2}
        y={cy - baseH / 2}
        width={baseW}
        height={baseH}
        rx={baseRx}
        fill={fillBase}
        stroke={outline}
        strokeWidth={strokeW}
      />
      <rect
        x={armX}
        y={armY}
        width={armLen}
        height={armThick}
        rx={armRx}
        fill={fill}
        stroke={outline}
        strokeWidth={strokeW}
      />
    </g>
  );
}

/** Вертикална плоча на дръжката между крилата — същата стойност като в <PairDividerHandle /> за подравняване на V. */
const PAIR_DIVIDER_HANDLE_PLATE_W = 2.75;

/**
 * Дръжка за двойката врата+прозорец — компактна „слама“: тънка вертикална капсула + нисък хоризонтален захват (като референс вдясно).
 */
function PairDividerHandle({ cx, cy, innerHeight }: { cx: number; cy: number; innerHeight: number }) {
  const fill = "#fafafa";
  const stroke = SASH_STROKE;
  const strokeW = 0.72;
  const plateW = PAIR_DIVIDER_HANDLE_PLATE_W;
  const plateH = Math.min(20.5, Math.max(13.5, innerHeight * 0.32));
  const plateR = plateW / 2;
  const gripH = 2.42;
  const gripLen = 8.85;
  const gripR = gripH / 2;

  const plateX = cx - plateW / 2;
  const plateY = cy - plateH / 2;
  const gripX = cx - 0.32;
  const gripY = cy - gripH / 2;

  return (
    <g>
      <rect
        x={plateX}
        y={plateY}
        width={plateW}
        height={plateH}
        rx={plateR}
        ry={plateR}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW}
      />
      <rect
        x={gripX}
        y={gripY}
        width={gripLen}
        height={gripH}
        rx={gripR}
        ry={gripR}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeW}
      />
    </g>
  );
}

function innerOpeningFromOuter(outer: Box): Box {
  return {
    x: outer.x + FRAME_REVEAL,
    y: outer.y + FRAME_REVEAL,
    w: outer.w - FRAME_REVEAL * 2,
    h: outer.h - FRAME_REVEAL * 2,
  };
}

function partitionColumns(box: Box, n: number): Box[] {
  if (n <= 0) return [];
  const gap = MULL_GAP;
  const totalGap = gap * (n - 1);
  const cw = (box.w - totalGap) / n;
  const out: Box[] = [];
  let x = box.x;
  for (let i = 0; i < n; i++) {
    out.push({ x, y: box.y, w: Math.max(2, cw), h: box.h });
    x += cw + gap;
  }
  return out;
}

function partitionColumnsWeighted(box: Box, weights: number[]): Box[] {
  const n = weights.length;
  if (n <= 0) return [];
  const gap = MULL_GAP;
  const totalGap = gap * (n - 1);
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) return partitionColumns(box, n);
  const innerW = box.w - totalGap;
  let x = box.x;
  return weights.map((w) => {
    const colW = (innerW * w) / sum;
    const b = { x, y: box.y, w: Math.max(2, colW), h: box.h };
    x += colW + gap;
    return b;
  });
}

/** Едно муле: лява 1/3 от полезната ширина, дясна непрекъсната зона 2/3 (като две слепени третини). */
function partitionMergeAfterFirst(inner: Box): Box[] {
  const usable = inner.w - MULL_GAP;
  const wFirst = usable / 3;
  const wMerged = (usable * 2) / 3;
  return [
    { x: inner.x, y: inner.y, w: wFirst, h: inner.h },
    { x: inner.x + wFirst + MULL_GAP, y: inner.y, w: wMerged, h: inner.h },
  ];
}

function mullionCenterAfterColumn(col: Box): number {
  return col.x + col.w + MULL_GAP / 2;
}

function VerticalMullionPosts({ cols, inner }: { cols: Box[]; inner: Box }) {
  if (cols.length < 2) return null;
  const half = MULLION_WIDTH / 2;
  const top = inner.y - 0.5;
  const h = inner.h + 1;
  return (
    <g>
      {cols.slice(0, -1).map((c, i) => {
        const mx = mullionCenterAfterColumn(c);
        return (
          <rect
            key={i}
            x={mx - half}
            y={top}
            width={MULLION_WIDTH}
            height={h}
            rx={2.2}
            fill={MULLION_FILL}
            stroke={MULLION_STROKE}
            strokeWidth={1.05}
          />
        );
      })}
    </g>
  );
}

function fitContentSize(widthMm: number, heightMm: number, maxCW: number, maxCH: number): { cw: number; ch: number } {
  const ar = widthMm / heightMm;
  let cw = maxCW;
  let ch = cw / ar;
  if (ch > maxCH) {
    ch = maxCH;
    cw = ch * ar;
  }
  return { cw, ch };
}

function DimLabels({
  widthMm,
  heightMm,
  cxBottom,
  bottomY,
  midY,
  rightX,
}: {
  widthMm: number;
  heightMm: number;
  cxBottom: number;
  bottomY: number;
  midY: number;
  rightX: number;
}) {
  return (
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize={10.5}
      fontWeight={500}
      fill={LABEL}
      opacity={0.92}
    >
      <text x={cxBottom} y={bottomY} textAnchor="middle">
        {widthMm}
      </text>
      <text
        x={rightX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(-90 ${rightX} ${midY})`}
      >
        {heightMm}
      </text>
    </g>
  );
}

function RectangleDiagram({
  spec,
  avoidStretch,
}: {
  spec: PvcRectangleDiagram;
  /** Единично ползване: тесен вертикален прозорец без хоризонтално смачкване от `w-full` + `min-h`. */
  avoidStretch?: boolean;
}) {
  const rawId = useId();
  const defsId = sanitizeDefsId(rawId);
  const {
    widthMm,
    heightMm,
    panels,
    columnWeights,
    mergeAfterFirst,
    leftPaneOfTwoPaneTotalWidthMm,
    diagramDimWidthMm,
    diagramDimHeightMm,
    innerRightTiltTurnSinglePane,
    diagramUniformScale,
  } = spec;
  const padL = 12;
  const padT = 8;
  const padR = 26;
  const padB = 22;
  const maxCW = 178;
  const maxCH = 96;
  const ox = padL;
  const oy = padT;

  const isLeftPaneOnly =
    leftPaneOfTwoPaneTotalWidthMm != null &&
    leftPaneOfTwoPaneTotalWidthMm > 0 &&
    panels.length === 1;

  const useInnerRightTiltStyling =
    panels.length === 1 &&
    panels[0]?.type === "opening" &&
    panels[0]?.openingStyle === "tilt-turn" &&
    (isLeftPaneOnly || innerRightTiltTurnSinglePane === true);

  let cw: number;
  let ch: number;
  let outer: Box;
  let inner: Box;
  let cols: Box[];

  if (isLeftPaneOnly) {
    const totalW = leftPaneOfTwoPaneTotalWidthMm!;
    const refFit = fitContentSize(totalW, heightMm, maxCW, maxCH);
    ch = refFit.ch;
    const outerRef: Box = { x: ox, y: oy, w: refFit.cw, h: ch };
    const innerRef = innerOpeningFromOuter(outerRef);
    const colsTwo = partitionColumns(innerRef, 2);
    const leftCell = colsTwo[0]!;
    cw = leftCell.w + FRAME_REVEAL * 2;
    outer = { x: ox, y: oy, w: cw, h: ch };
    inner = innerOpeningFromOuter(outer);
    cols = partitionColumns(inner, 1);
  } else {
    const fit = fitContentSize(widthMm, heightMm, maxCW, maxCH);
    cw = fit.cw;
    ch = fit.ch;
    outer = { x: ox, y: oy, w: cw, h: ch };
    inner = innerOpeningFromOuter(outer);
    const useWeights =
      !mergeAfterFirst &&
      columnWeights != null &&
      columnWeights.length === panels.length &&
      columnWeights.every((w) => w > 0);
    cols =
      mergeAfterFirst && panels.length === 2
        ? partitionMergeAfterFirst(inner)
        : useWeights
          ? partitionColumnsWeighted(inner, columnWeights!)
          : partitionColumns(inner, panels.length);
  }

  const vbW = padL + cw + padR;
  const vbH = padT + ch + padB;

  let uniformScale = diagramUniformScale ?? 1;
  if (!Number.isFinite(uniformScale)) uniformScale = 1;
  uniformScale = Math.max(0.08, Math.min(uniformScale, 1));

  const cxWin = ox + cw / 2;
  const cyWin = oy + ch / 2;
  const scaledHalfW = (cw / 2) * uniformScale;
  const scaledHalfH = (ch / 2) * uniformScale;

  /** Само 2050×1350 с [отваряемо, фикс, отваряемо] — дръжка и V на дясното крило към вътрешното муле. */
  const isStd3PaneSides2050 =
    widthMm === 2050 &&
    heightMm === 1350 &&
    panels.length === 3 &&
    panels[0]?.type === "opening" &&
    panels[1]?.type === "fixed" &&
    panels[2]?.type === "opening";

  /** Само 3300×1600 с [фикс, отваряемо, отваряемо, фикс] — общо муле между отваряемите, една дръжка надясно. */
  const isStd4PaneCenter3300 =
    widthMm === 3300 &&
    heightMm === 1600 &&
    panels.length === 4 &&
    panels[0]?.type === "fixed" &&
    panels[1]?.type === "opening" &&
    panels[2]?.type === "opening" &&
    panels[3]?.type === "fixed";

  /** Само 2800×1700 с [отваряемо, фикс, отваряемо] — две дръжки, огледални (→ ←). */
  const isWideThree2800 =
    widthMm === 2800 &&
    heightMm === 1700 &&
    panels.length === 3 &&
    panels[0]?.type === "opening" &&
    panels[1]?.type === "fixed" &&
    panels[2]?.type === "opening";

  const cxBottom = cxWin;
  const midY = cyWin;
  const bottomY = cyWin + scaledHalfH + 16;
  const rightX = cxWin + scaledHalfW + 18;

  const effectiveScaleX = uniformScale;
  const effectiveScaleY = uniformScale;
  const frameGroupTransform =
    effectiveScaleX !== 1 || effectiveScaleY !== 1
      ? `translate(${cxWin}, ${cyWin}) scale(${effectiveScaleX}, ${effectiveScaleY}) translate(${-cxWin}, ${-cyWin})`
      : undefined;

  const svgClassName = avoidStretch
    ? "mx-auto block h-auto w-auto max-h-[150px] max-w-full shrink-0 sm:max-h-[170px]"
    : "mx-auto block h-auto w-full max-h-[150px] min-h-[96px] sm:max-h-[170px]";

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid meet"
      className={svgClassName}
      aria-hidden
    >
      <DiagramDefs id={defsId} />
      <g transform={frameGroupTransform}>
        <OuterWindowFrame box={outer} />
        {cols.map((cellBox, i) => {
        const panel = panels[i]!;
        const hasMullionAfter = i < cols.length - 1;
        let tiltApex: number | undefined;
        if (panel.type === "opening" && panel.openingStyle === "tilt-turn") {
          if (useInnerRightTiltStyling && i === 0) {
            tiltApex = inner.x + inner.w;
          } else if (isStd4PaneCenter3300 && i === 2) {
            tiltApex = mullionCenterAfterColumn(cols[1]!);
          } else if (isStd3PaneSides2050 && i === 2) {
            tiltApex = mullionCenterAfterColumn(cols[1]!);
          } else if (isWideThree2800 && i === 2) {
            tiltApex = mullionCenterAfterColumn(cols[1]!);
          } else if (hasMullionAfter) {
            tiltApex = mullionCenterAfterColumn(cols[i]!);
          }
        }
        return (
          <GlassSashPane
            key={i}
            cellBox={cellBox}
            panel={panel}
            index={i}
            count={panels.length}
            tiltTurnApexX={tiltApex}
            tiltTurnExactLeftApexJoin={useInnerRightTiltStyling && i === 0}
            defsId={defsId}
          />
        );
      })}
      <VerticalMullionPosts cols={cols} inner={inner} />
      {useInnerRightTiltStyling ? (
        <MullionSashHandle
          key="h-left-pane-only"
          cx={inner.x + inner.w}
          cy={inner.y + inner.h / 2}
          innerHeight={inner.h}
        />
      ) : isStd4PaneCenter3300 ? (
        <MullionSashHandle
          key="h-4pane-center"
          cx={mullionCenterAfterColumn(cols[1]!)}
          cy={inner.y + inner.h / 2}
          innerHeight={inner.h}
          armDirection="right"
        />
      ) : isStd3PaneSides2050 ? (
        [0, 1].map((mi) => {
          const L = panels[mi]!;
          const R = panels[mi + 1]!;
          if (L.type !== "opening" && R.type !== "opening") return null;
          const mx = mullionCenterAfterColumn(cols[mi]!);
          return (
            <MullionSashHandle
              key={`h-s3-${mi}`}
              cx={mx}
              cy={inner.y + inner.h / 2}
              innerHeight={inner.h}
              armDirection={mi === 1 ? "right" : "left"}
            />
          );
        })
      ) : isWideThree2800 ? (
        [0, 1].map((mi) => {
          const L = panels[mi]!;
          const R = panels[mi + 1]!;
          if (L.type !== "opening" && R.type !== "opening") return null;
          const mx = mullionCenterAfterColumn(cols[mi]!);
          return (
            <MullionSashHandle
              key={`h-w3-${mi}`}
              cx={mx}
              cy={inner.y + inner.h / 2}
              innerHeight={inner.h}
              armDirection={mi === 0 ? "left" : "right"}
            />
          );
        })
      ) : (
        cols.slice(0, -1).map((c, i) => {
          if (panels[i]?.type !== "opening") return null;
          const mx = mullionCenterAfterColumn(c);
          return (
            <MullionSashHandle key={`h-${i}`} cx={mx} cy={inner.y + inner.h / 2} innerHeight={inner.h} />
          );
        })
      )}
      </g>
      <DimLabels
        widthMm={diagramDimWidthMm ?? widthMm}
        heightMm={diagramDimHeightMm ?? heightMm}
        cxBottom={cxBottom}
        bottomY={bottomY}
        midY={midY}
        rightX={rightX}
      />
    </svg>
  );
}

/**
 * Ляво крило: диагонали от горен/долен ляв закръглен ъгъл към един и същ връх (дръжка).
 * Началата са пресечения на правите към острите ъгли с дъгите на стъклото (rx = GLASS_RX).
 */
function GlassReinforcementLeftSashConverge({
  box,
  apexX,
  apexY,
  braceStrokeWidth = 3.05,
  lineCap = "round",
  lineJoin = "round",
  /** 0 = до края на закръгления ляв ъгъл на стъклото; по подразбиране лек inset за round cap вътре в панела. */
  outerEndpointInset,
  /** true: връхът не се пристяга вътре в стъклото (връзка към дръжка извън синия панел). */
  extendApexToHinge = false,
}: {
  box: Box;
  apexX: number;
  apexY: number;
  braceStrokeWidth?: number;
  lineCap?: "round" | "butt";
  lineJoin?: "round" | "miter";
  outerEndpointInset?: number;
  extendApexToHinge?: boolean;
}) {
  const { x, y, w, h } = box;
  const sw = braceStrokeWidth;
  const cap = lineCap;
  const join = lineJoin;
  const rEff = Math.min(GLASS_RX, w / 2, h / 2);
  const margin = sw * 0.35;
  const ax = extendApexToHinge
    ? apexX
    : Math.max(x + margin, Math.min(x + w - margin, apexX));
  const ay = extendApexToHinge
    ? apexY
    : Math.max(y + margin, Math.min(y + h - margin, apexY));
  const tl = glassTopLeftCornerOnArc(box, rEff, ax, ay);
  const bl = glassBottomLeftCornerOnArc(box, rEff, ax, ay);
  /** Inset от горен/долен ляв ъгъл по посока към върха (0 = пълен ход по дъгата). */
  const capInset = outerEndpointInset ?? sw * 0.52;
  const dxTop = ax - tl.x;
  const dyTop = ay - tl.y;
  const lenTop = Math.hypot(dxTop, dyTop);
  const tlDraw =
    lenTop > 1e-6
      ? { x: tl.x + (dxTop / lenTop) * capInset, y: tl.y + (dyTop / lenTop) * capInset }
      : tl;
  const dxBot = ax - bl.x;
  const dyBot = ay - bl.y;
  const lenBot = Math.hypot(dxBot, dyBot);
  const blDraw =
    lenBot > 1e-6
      ? { x: bl.x + (dxBot / lenBot) * capInset, y: bl.y + (dyBot / lenBot) * capInset }
      : bl;
  /** Single subpath: caps only at top/bottom; apex is a round join — avoids double round caps and gap/overlap at the meet. */
  const d = `M ${tlDraw.x} ${tlDraw.y} L ${ax} ${ay} L ${blDraw.x} ${blDraw.y}`;
  return (
    <g opacity={0.9}>
      <path
        d={d}
        fill="none"
        stroke={OPENING_BRACE_STROKE}
        strokeWidth={sw}
        strokeLinecap={cap}
        strokeLinejoin={join}
      />
    </g>
  );
}

/** Две отделни кутии (врата + квадратен прозорец); пропорциите идват от `doorWidthMm` + `transomHeightMm` (= ширина на квадрата). Само за `l-door-window`. */
function LDoorWindow2050PairContent({
  defsId,
  /** Същата „работна“ кутия като `innerOpeningFromOuter` при другите схеми — графиката се мащабира като тях. */
  layoutInner,
  /** Външната кутия (ox,oy,cw,ch) за подравняване на надписите с `DimLabels`. */
  outer,
  doorWidthMm,
  windowSideMm,
  heightMm,
  doorOpening,
}: {
  defsId: string;
  layoutInner: Box;
  outer: Box;
  doorWidthMm: number;
  windowSideMm: number;
  heightMm: number;
  doorOpening: boolean;
}) {
  const ox = layoutInner.x;
  const oy = layoutInner.y;
  const cw = layoutInner.w;
  const ch = layoutInner.h;

  const widthTotal = doorWidthMm + windowSideMm;
  const g = Math.max(1, cw * (8 / widthTotal));
  const innerW = cw - g;
  const doorW = innerW * (doorWidthMm / widthTotal);
  const winW = innerW * (windowSideMm / widthTotal);
  const doorH = ch;
  const winH = ch * (windowSideMm / heightMm);

  const doorOuter: Box = { x: ox, y: oy, w: doorW, h: doorH };
  const winOuter: Box = { x: ox + doorW + g, y: oy, w: winW, h: winH };
  const PAIR_FRAME_BASE_RX = 2.35;
  const pairFrameOutlineD = pairTwinUnionOutlinePath(doorOuter, winOuter, 0, PAIR_FRAME_BASE_RX);
  /** L-контур: по-тъмен като външна рамка (`FRAME_OUTER_STROKE`); диагоналите остават по-свети (`OPENING_BRACE_STROKE`). */
  const PAIR_FRAME_STROKE_W = 2.55;
  const PAIR_FRAME_TO_GLASS = 3.35;
  const doorGlass: Box = {
    x: doorOuter.x + PAIR_FRAME_TO_GLASS,
    y: doorOuter.y + PAIR_FRAME_TO_GLASS,
    w: Math.max(4, doorOuter.w - PAIR_FRAME_TO_GLASS * 2),
    h: Math.max(4, doorOuter.h - PAIR_FRAME_TO_GLASS * 2),
  };
  const winGlass: Box = {
    x: winOuter.x + PAIR_FRAME_TO_GLASS,
    y: winOuter.y + PAIR_FRAME_TO_GLASS,
    w: Math.max(4, winOuter.w - PAIR_FRAME_TO_GLASS * 2),
    h: Math.max(4, winOuter.h - PAIR_FRAME_TO_GLASS * 2),
  };
  /** Център на процепа — дръжката „седи“ на вертикалния разделител. */
  const doorHandleCx = doorOuter.x + doorOuter.w + g / 2;
  /** Вертикално центрирана спрямо десния (квадратен) панел — като референсния каталог. */
  const handleCy = oy + winH / 2;
  /** Точно +10 по Y в SVG user space (само `translate` на дръжката; `cx` без промяна). */
  const handleTranslateY = 10;
  /** Връх на V: вертикално = център на дръжката след `translate`; хоризонтално = ляв ръб на плочата на дръжката. */
  const braceApexY = handleCy + handleTranslateY;
  const braceApexX = doorHandleCx - PAIR_DIVIDER_HANDLE_PLATE_W / 2;

  /** Pair diagram dimension positions only (frame geometry unchanged). */
  const pairDimDoorBottomY = outer.y + outer.h + 6;
  /** Left height: slightly farther from left frame (~10px vs prior 6px). */
  const pairDimLeftOutwardGap = 12;
  /** Right vertical transom: closer to the right frame edge. */
  const pairDimRightVerticalX = outer.x + outer.w + 4;
  /** Bottom horizontal “1350” under right panel only — hug bottom of that panel (not full diagram baseline). */
  const pairDimRightPanelBottomY = oy + winH + 13;
  const midDoorY = oy + doorH / 2;
  const midWinY = oy + winH / 2;
  const leftLabelX = Math.max(6, layoutInner.x - pairDimLeftOutwardGap);
  const rightLabelX = pairDimRightVerticalX;
  const labelFont = 10.5 * ((layoutInner.w + layoutInner.h) / (outer.w + outer.h));

  return (
    <g>
      {/* <!-- FRAME --> — запълнен саш/разкритие + непрекъснат L-контур (без промяна на пропорциите) */}
      <g>
        <rect
          x={doorOuter.x}
          y={doorOuter.y}
          width={doorOuter.w}
          height={doorOuter.h}
          rx={SASH_RX}
          fill={FRAME_INNER_FILL}
        />
        <rect
          x={winOuter.x}
          y={winOuter.y}
          width={winOuter.w}
          height={winOuter.h}
          rx={SASH_RX}
          fill={FRAME_INNER_FILL}
        />
        <rect
          x={doorOuter.x + doorOuter.w}
          y={doorOuter.y}
          width={g}
          height={doorOuter.h}
          fill={MULLION_FILL}
          stroke={MULLION_STROKE}
          strokeWidth={0.88}
        />
        <path
          d={pairFrameOutlineD}
          fill="none"
          stroke={FRAME_OUTER_STROKE}
          strokeWidth={PAIR_FRAME_STROKE_W}
          strokeLinejoin="round"
          strokeLinecap="butt"
        />
      </g>
      {/* <!-- GLASS --> door pane — square pane follows <!-- DIAGONALS --> (paint order) */}
      <g>
        <rect
          x={doorGlass.x}
          y={doorGlass.y}
          width={doorGlass.w}
          height={doorGlass.h}
          rx={GLASS_RX}
          fill={`url(#${defsId}-glass)`}
          stroke={GLASS_EDGE}
          strokeWidth={0.98}
          filter={`url(#${defsId}-glassSoft)`}
        />
      </g>
      {/* <!-- DIAGONALS --> */}
      <g>
        <GlassReinforcementLeftSashConverge
          box={doorGlass}
          apexX={braceApexX}
          apexY={braceApexY}
          braceStrokeWidth={2.55}
          lineCap="round"
          lineJoin="round"
          outerEndpointInset={0}
          extendApexToHinge
        />
      </g>
      {/* <!-- GLASS --> square pane */}
      <g>
        <rect
          x={winGlass.x}
          y={winGlass.y}
          width={winGlass.w}
          height={winGlass.h}
          rx={GLASS_RX}
          fill={`url(#${defsId}-glass)`}
          stroke={GLASS_EDGE}
          strokeWidth={0.98}
          filter={`url(#${defsId}-glassSoft)`}
        />
      </g>
      {/* <!-- HANDLE --> — translateY само дръжката; V среща визуалния център (`braceApexY`) */}
      {doorOpening ? (
        <g transform={`translate(0, ${handleTranslateY})`}>
          <g
            transform={`translate(${doorHandleCx}, ${handleCy}) scale(-1, 1) translate(${-doorHandleCx}, ${-handleCy})`}
          >
            <PairDividerHandle cx={doorHandleCx} cy={handleCy} innerHeight={winH} />
          </g>
        </g>
      ) : null}
      {/* <!-- LABELS --> */}
      <g
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={labelFont}
        fontWeight={500}
        fill={LABEL}
        opacity={0.92}
      >
        <text x={ox + doorW / 2} y={pairDimDoorBottomY} textAnchor="middle">
          {doorWidthMm === 900 ? 700 : doorWidthMm}
        </text>
        <text
          x={leftLabelX}
          y={midDoorY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${leftLabelX} ${midDoorY})`}
        >
          {heightMm}
        </text>
        <text x={ox + doorW + g + winW / 2} y={pairDimRightPanelBottomY} textAnchor="middle">
          {windowSideMm}
        </text>
        <text
          x={rightLabelX}
          y={midWinY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${rightLabelX} ${midWinY})`}
        >
          {windowSideMm}
        </text>
      </g>
    </g>
  );
}

/** Каталожна тройка: същата геометрия за врата и квадрата като `LDoorWindow2050PairContent` (чрез `pairInnerWidth`) + тясно крило вдясно. */
function LDoorWindow2050TripleContent({
  defsId,
  layoutInner,
  outer,
  doorWidthMm,
  windowSideMm,
  rightNarrowWidthMm,
  heightMm,
  doorOpening,
  pairInnerWidth,
}: {
  defsId: string;
  layoutInner: Box;
  outer: Box;
  doorWidthMm: number;
  windowSideMm: number;
  rightNarrowWidthMm: number;
  heightMm: number;
  doorOpening: boolean;
  pairInnerWidth: number;
}) {
  const ox = layoutInner.x;
  const oy = layoutInner.y;
  const ch = layoutInner.h;

  const widthTotalPair = doorWidthMm + windowSideMm;
  const g = Math.max(1, pairInnerWidth * (8 / widthTotalPair));
  const innerWPair = pairInnerWidth - g;
  const doorW = innerWPair * (doorWidthMm / widthTotalPair);
  const winW = innerWPair * (windowSideMm / widthTotalPair);
  const narrowW = Math.max(4, winW * (rightNarrowWidthMm / windowSideMm));

  const doorH = ch;
  const winH = ch * (windowSideMm / heightMm);

  const doorOuter: Box = { x: ox, y: oy, w: doorW, h: doorH };
  const winOuter: Box = { x: ox + doorW + g, y: oy, w: winW, h: winH };
  const narrowOuter: Box = { x: winOuter.x + winOuter.w + g, y: oy, w: narrowW, h: winH };

  const PAIR_FRAME_BASE_RX = 2.35;
  const pairFrameOutlineD = pairTwinUnionOutlinePathThree(doorOuter, winOuter, narrowOuter, 0, PAIR_FRAME_BASE_RX);
  const PAIR_FRAME_STROKE_W = 2.55;
  const PAIR_FRAME_TO_GLASS = 3.35;

  const doorGlass: Box = {
    x: doorOuter.x + PAIR_FRAME_TO_GLASS,
    y: doorOuter.y + PAIR_FRAME_TO_GLASS,
    w: Math.max(4, doorOuter.w - PAIR_FRAME_TO_GLASS * 2),
    h: Math.max(4, doorOuter.h - PAIR_FRAME_TO_GLASS * 2),
  };
  const winGlass: Box = {
    x: winOuter.x + PAIR_FRAME_TO_GLASS,
    y: winOuter.y + PAIR_FRAME_TO_GLASS,
    w: Math.max(4, winOuter.w - PAIR_FRAME_TO_GLASS * 2),
    h: Math.max(4, winOuter.h - PAIR_FRAME_TO_GLASS * 2),
  };
  const narrowGlass: Box = {
    x: narrowOuter.x + PAIR_FRAME_TO_GLASS,
    y: narrowOuter.y + PAIR_FRAME_TO_GLASS,
    w: Math.max(4, narrowOuter.w - PAIR_FRAME_TO_GLASS * 2),
    h: Math.max(4, narrowOuter.h - PAIR_FRAME_TO_GLASS * 2),
  };

  const doorHandleCx = doorOuter.x + doorOuter.w + g / 2;
  const handleCy = oy + winH / 2;
  const handleTranslateY = 10;
  const braceApexY = handleCy + handleTranslateY;
  const braceApexX = doorHandleCx - PAIR_DIVIDER_HANDLE_PLATE_W / 2;

  const pairDimDoorBottomY = outer.y + outer.h + 6;
  const pairDimLeftOutwardGap = 12;
  const pairDimRightVerticalX = outer.x + outer.w + 4;
  const pairDimRightPanelBottomY = oy + winH + 13;
  const midDoorY = oy + doorH / 2;
  const midWinY = oy + winH / 2;
  const leftLabelX = Math.max(6, layoutInner.x - pairDimLeftOutwardGap);
  const rightLabelX = pairDimRightVerticalX;
  const labelFont = 10.5 * ((layoutInner.w + layoutInner.h) / (outer.w + outer.h));

  const winNarrowMullCx = winOuter.x + winOuter.w + g / 2;
  /**
   * Връх на V към дръжката на тясното крило: център на дръжката в SVG (без `translateY` като при вратата).
   * При вратата `braceApexY = handleCy + handleTranslateY` съвпада с центъра на дръжката след `translate(0,10)`;
   * тук дръжката е директно на `handleCy`, затова върхът е точно (winNarrowMullCx, handleCy) — една координата и за двата края на пътя в `GlassReinforcementLeftSashConverge`.
   */
  const narrowBraceApexX = winNarrowMullCx;
  const narrowBraceApexY = handleCy;

  return (
    <g>
      <g>
        <rect x={doorOuter.x} y={doorOuter.y} width={doorOuter.w} height={doorOuter.h} rx={SASH_RX} fill={FRAME_INNER_FILL} />
        <rect x={winOuter.x} y={winOuter.y} width={winOuter.w} height={winOuter.h} rx={SASH_RX} fill={FRAME_INNER_FILL} />
        <rect x={narrowOuter.x} y={narrowOuter.y} width={narrowOuter.w} height={narrowOuter.h} rx={SASH_RX} fill={FRAME_INNER_FILL} />
        <rect
          x={doorOuter.x + doorOuter.w}
          y={doorOuter.y}
          width={g}
          height={doorOuter.h}
          fill={MULLION_FILL}
          stroke={MULLION_STROKE}
          strokeWidth={0.88}
        />
        <rect
          x={winOuter.x + winOuter.w}
          y={winOuter.y}
          width={g}
          height={winOuter.h}
          fill={MULLION_FILL}
          stroke={MULLION_STROKE}
          strokeWidth={0.88}
        />
        <path
          d={pairFrameOutlineD}
          fill="none"
          stroke={FRAME_OUTER_STROKE}
          strokeWidth={PAIR_FRAME_STROKE_W}
          strokeLinejoin="round"
          strokeLinecap="butt"
        />
      </g>
      <g>
        <rect
          x={doorGlass.x}
          y={doorGlass.y}
          width={doorGlass.w}
          height={doorGlass.h}
          rx={GLASS_RX}
          fill={`url(#${defsId}-glass)`}
          stroke={GLASS_EDGE}
          strokeWidth={0.98}
          filter={`url(#${defsId}-glassSoft)`}
        />
      </g>
      <g>
        <GlassReinforcementLeftSashConverge
          box={doorGlass}
          apexX={braceApexX}
          apexY={braceApexY}
          braceStrokeWidth={2.55}
          lineCap="round"
          lineJoin="round"
          outerEndpointInset={0}
          extendApexToHinge
        />
      </g>
      <g>
        <rect
          x={winGlass.x}
          y={winGlass.y}
          width={winGlass.w}
          height={winGlass.h}
          rx={GLASS_RX}
          fill={`url(#${defsId}-glass)`}
          stroke={GLASS_EDGE}
          strokeWidth={0.98}
          filter={`url(#${defsId}-glassSoft)`}
        />
      </g>
      <g>
        <rect
          x={narrowGlass.x}
          y={narrowGlass.y}
          width={narrowGlass.w}
          height={narrowGlass.h}
          rx={GLASS_RX}
          fill={`url(#${defsId}-glass)`}
          stroke={GLASS_EDGE}
          strokeWidth={0.98}
          filter={`url(#${defsId}-glassSoft)`}
        />
        {/* Същите параметри като диагоналите на вратата; локално огледало за крило с панта вляво. */}
        <g transform={`translate(${narrowGlass.x}, ${narrowGlass.y}) translate(${narrowGlass.w}, 0) scale(-1, 1)`}>
          <GlassReinforcementLeftSashConverge
            box={{ x: 0, y: 0, w: narrowGlass.w, h: narrowGlass.h }}
            apexX={narrowGlass.w - (narrowBraceApexX - narrowGlass.x)}
            apexY={narrowBraceApexY - narrowGlass.y}
            braceStrokeWidth={2.55}
            lineCap="round"
            lineJoin="round"
            outerEndpointInset={0}
            extendApexToHinge
          />
        </g>
      </g>
      {doorOpening ? (
        <g transform={`translate(0, ${handleTranslateY})`}>
          <g transform={`translate(${doorHandleCx}, ${handleCy}) scale(-1, 1) translate(${-doorHandleCx}, ${-handleCy})`}>
            <PairDividerHandle cx={doorHandleCx} cy={handleCy} innerHeight={winH} />
          </g>
        </g>
      ) : null}
      <PairDividerHandle cx={winNarrowMullCx} cy={handleCy} innerHeight={winH} />
      <g
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={labelFont}
        fontWeight={500}
        fill={LABEL}
        opacity={0.92}
      >
        <text x={ox + doorW / 2} y={pairDimDoorBottomY} textAnchor="middle">
          {doorWidthMm === 900 ? 700 : doorWidthMm}
        </text>
        <text
          x={leftLabelX}
          y={midDoorY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${leftLabelX} ${midDoorY})`}
        >
          {heightMm}
        </text>
        <text
          x={ox + doorW + g + (winW + g + narrowW) / 2}
          y={pairDimRightPanelBottomY}
          textAnchor="middle"
        >
          {windowSideMm + rightNarrowWidthMm}
        </text>
        <text
          x={rightLabelX}
          y={midWinY}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(-90 ${rightLabelX} ${midWinY})`}
        >
          {windowSideMm}
        </text>
      </g>
    </g>
  );
}

function LShapeDiagram({ spec }: { spec: PvcLShapeDiagram }) {
  const rawId = useId();
  const defsId = sanitizeDefsId(`${rawId}l`);
  const {
    widthMm,
    heightMm,
    doorWidthMm,
    doorOpening,
    transomHeightMm,
    transomPanels,
    transomColumnWeights,
    rightNarrowWidthMm,
  } = spec;
  const padL = 12;
  const padT = 8;
  const padR = 26;
  const padB = 22;
  const maxCW = 178;
  const maxCH = 96;
  const { cw, ch } = fitContentSize(widthMm, heightMm, maxCW, maxCH);

  const vbH = padT + ch + padB;
  const ox = padL;
  const oy = padT;

  /** Врата + квадрат + тясно крило вдясно — същите door/квадрат като двойката (`fit 2250×2250`), разширен контейнер само надясно. */
  if (
    heightMm === 2250 &&
    transomHeightMm === 1350 &&
    rightNarrowWidthMm != null &&
    rightNarrowWidthMm > 0 &&
    transomPanels.length === 2 &&
    transomPanels[0]?.type === "fixed" &&
    transomPanels[1]?.type === "opening" &&
    transomPanels[1]?.openingStyle === "tilt-turn"
  ) {
    const { cw: cwPairOuter, ch: chPair } = fitContentSize(2250, 2250, maxCW, maxCH);
    const outerPairRef: Box = { x: ox, y: oy, w: cwPairOuter, h: chPair };
    const liPair = innerOpeningFromOuter(outerPairRef);
    const widthTotalPair = doorWidthMm + transomHeightMm;
    const gEst = Math.max(1, liPair.w * (8 / widthTotalPair));
    const innerWPair = liPair.w - gEst;
    const doorWEst = innerWPair * (doorWidthMm / widthTotalPair);
    const winWEst = innerWPair * (transomHeightMm / widthTotalPair);
    const narrowWEst = Math.max(4, winWEst * (rightNarrowWidthMm / transomHeightMm));
    const innerTripleW = doorWEst + gEst + winWEst + gEst + narrowWEst;
    const outerTripleW = innerTripleW + FRAME_REVEAL * 2;
    const vbW = padL + outerTripleW + padR;

    const layoutInnerTriple: Box = {
      x: liPair.x,
      y: liPair.y,
      w: innerTripleW,
      h: liPair.h,
    };
    const outerTriple: Box = { x: ox, y: oy, w: outerTripleW, h: chPair };

    return (
      <svg
        viewBox={`0 0 ${vbW} ${padT + chPair + padB}`}
        className="mx-auto block h-auto w-full max-h-[150px] min-h-[96px] sm:max-h-[170px]"
        aria-hidden
      >
        <DiagramDefs id={defsId} />
        <LDoorWindow2050TripleContent
          defsId={defsId}
          layoutInner={layoutInnerTriple}
          outer={outerTriple}
          doorWidthMm={doorWidthMm}
          windowSideMm={transomHeightMm}
          rightNarrowWidthMm={rightNarrowWidthMm}
          heightMm={heightMm}
          doorOpening={doorOpening}
          pairInnerWidth={liPair.w}
        />
      </svg>
    );
  }

  const vbW = padL + cw + padR;

  /** Врата + квадратен прозорец 1350×1350 — отделна SVG двойка, когато общата ширина = врата + страна на квадрата. */
  if (
    heightMm === 2250 &&
    transomHeightMm === 1350 &&
    widthMm === doorWidthMm + transomHeightMm &&
    transomPanels.length === 1 &&
    transomPanels[0]?.type === "fixed"
  ) {
    const outerBox: Box = { x: ox, y: oy, w: cw, h: ch };
    const layoutInner = innerOpeningFromOuter(outerBox);
    return (
      <svg viewBox={`0 0 ${vbW} ${vbH}`} className="mx-auto block h-auto w-full max-h-[150px] min-h-[96px] sm:max-h-[170px]" aria-hidden>
        <DiagramDefs id={defsId} />
        <LDoorWindow2050PairContent
          defsId={defsId}
          layoutInner={layoutInner}
          outer={outerBox}
          doorWidthMm={doorWidthMm}
          windowSideMm={transomHeightMm}
          heightMm={heightMm}
          doorOpening={doorOpening}
        />
      </svg>
    );
  }

  const outer: Box = { x: ox, y: oy, w: cw, h: ch };
  const inner = innerOpeningFromOuter(outer);
  const gap = MULL_GAP;

  const doorSplitFraction = doorWidthMm / widthMm;
  const splitX = inner.x + inner.w * doorSplitFraction;

  const doorBox: Box = {
    x: inner.x,
    y: inner.y,
    w: Math.max(6, splitX - inner.x - gap / 2),
    h: inner.h,
  };
  const transomH = inner.h * (transomHeightMm / heightMm);
  const transomBox: Box = {
    x: splitX + gap / 2,
    y: inner.y,
    w: Math.max(6, inner.x + inner.w - (splitX + gap / 2)),
    h: Math.max(8, transomH),
  };

  const doorCell: Box = {
    x: doorBox.x + 2,
    y: doorBox.y + 2,
    w: Math.max(4, doorBox.w - 4),
    h: Math.max(4, doorBox.h - 4),
  };
  const transCell: Box = {
    x: transomBox.x + 2,
    y: transomBox.y + 2,
    w: Math.max(4, transomBox.w - 4),
    h: Math.max(4, transomBox.h - 4),
  };

  const doorSashCell = doorCell;
  const transomPartitionCell: Box = transCell;

  const wallTop = transomBox.y + transomBox.h;
  const innerBottom = inner.y + inner.h;
  const innerRight = inner.x + inner.w;
  const wallPath = `M ${transomBox.x} ${wallTop} L ${innerRight} ${wallTop} L ${innerRight} ${innerBottom} L ${splitX + gap / 2} ${innerBottom} L ${splitX + gap / 2} ${wallTop} Z`;

  const useTransomWeights =
    transomColumnWeights != null &&
    transomColumnWeights.length === transomPanels.length &&
    transomColumnWeights.every((w) => w > 0);
  const tcols = useTransomWeights
    ? partitionColumnsWeighted(transomPartitionCell, transomColumnWeights!)
    : partitionColumns(transomPartitionCell, transomPanels.length);

  const cxBottom = ox + cw / 2;
  const bottomY = oy + ch + 16;
  const midY = oy + ch / 2;
  const rightLabelX = ox + cw + 18;

  const mainMullHalf = MULLION_WIDTH / 2;
  const mainMullTop = inner.y - 0.5;
  const mainMullH = inner.h + 1;

  const doorPanel: PvcPanelSpec = doorOpening ? { type: "opening" } : { type: "fixed" };

  const lShapeUnifiedSashD = lShapeMergedSashOutlinePath(doorCell, transCell, SASH_RX);

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} className="mx-auto block h-auto w-full max-h-[150px] min-h-[96px] sm:max-h-[170px]" aria-hidden>
      <DiagramDefs id={defsId} />
      <OuterWindowFrame box={outer} />
      <path d={wallPath} fill={WALL_FILL} stroke={WALL_STROKE} strokeWidth={1.35} strokeLinejoin="miter" />
      <path
        d={lShapeUnifiedSashD}
        fill={SASH_FILL}
        stroke={SASH_STROKE}
        strokeWidth={STROKE_INNER}
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      <GlassSashPane
        cellBox={doorSashCell}
        panel={doorPanel}
        index={0}
        count={1}
        defsId={defsId}
        omitSashProfile
      />
      <rect
        x={splitX - mainMullHalf}
        y={mainMullTop}
        width={MULLION_WIDTH}
        height={mainMullH}
        rx={2.2}
        fill={MULLION_FILL}
        stroke={MULLION_STROKE}
        strokeWidth={1.05}
      />
      {tcols.map((cellBox, i) => {
        const tp = transomPanels[i]!;
        let tiltApex: number | undefined;
        if (tp.type === "opening" && tp.openingStyle === "tilt-turn" && i > 0) {
          tiltApex = mullionCenterAfterColumn(tcols[i - 1]!);
        }
        return (
          <GlassSashPane
            key={i}
            cellBox={cellBox}
            panel={tp}
            index={i}
            count={transomPanels.length}
            tiltTurnApexX={tiltApex}
            defsId={defsId}
            omitSashProfile
          />
        );
      })}
      <VerticalMullionPosts cols={tcols} inner={transomPartitionCell} />
      {doorOpening ? (
        <MullionSashHandle
          cx={splitX}
          cy={inner.y + inner.h / 2}
          innerHeight={inner.h}
          armDirection="right"
        />
      ) : null}
      {transomPanels.length >= 2 &&
      transomPanels[1]?.type === "opening" &&
      tcols.length >= 2 ? (
        <MullionSashHandle
          cx={mullionCenterAfterColumn(tcols[0]!)}
          cy={transomPartitionCell.y + transomPartitionCell.h / 2}
          innerHeight={transomPartitionCell.h}
          armDirection="left"
        />
      ) : null}
      <DimLabels
        widthMm={widthMm}
        heightMm={heightMm}
        cxBottom={cxBottom}
        bottomY={bottomY}
        midY={midY}
        rightX={rightLabelX}
      />
    </svg>
  );
}

export function PvcWindowDiagram(
  props: PvcWindowDiagramSpec & {
    /** Само за картка `single-door-700-2000` — запазва вертикалното съотношение на viewBox-а. */
    avoidStretch?: boolean;
  },
) {
  const { avoidStretch, ...spec } = props;
  if (spec.shape === "rectangle") {
    return <RectangleDiagram spec={spec} avoidStretch={avoidStretch} />;
  }
  if (spec.shape === "l-shape") {
    return <LShapeDiagram spec={spec} />;
  }
  const _n: never = spec;
  return _n;
}
