import { SectionHeadingAccentRule } from "@/components/SectionHeading";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Override default description typography (e.g. shorter intro blocks) */
  descriptionClassName?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  descriptionClassName,
  align = "left",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  const descClass =
    descriptionClassName ??
    "mt-3 text-base leading-relaxed text-muted sm:text-lg";
  const titleWrap =
    align === "center" ? "mx-auto w-fit max-w-full text-center" : "w-fit max-w-full";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      ) : null}
      <div className={titleWrap}>
        <h2
          className={`text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl ${eyebrow ? "mt-2" : "mt-0"}`}
        >
          {title}
        </h2>
        <SectionHeadingAccentRule align={align === "center" ? "center" : "start"} />
      </div>
      {description ? (
        <p className={descClass}>{description}</p>
      ) : null}
    </div>
  );
}
