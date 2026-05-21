import type { ReactNode } from "react";

type PvcInfoBoxProps = {
  title: string;
  children: ReactNode;
  /** subtle tint variants */
  tone?: "slate" | "teal" | "amber";
};

const tones = {
  slate: "border-sky-100 bg-sky-50",
  teal: "border-sky-100 bg-sky-50",
  amber: "border-sky-100 bg-sky-50",
} as const;

export function PvcInfoBox({ title, children, tone = "slate" }: PvcInfoBoxProps) {
  return (
    <div className={["rounded-2xl border p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6", tones[tone]].join(" ")}>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}
