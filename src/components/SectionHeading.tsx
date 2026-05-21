/**
 * Shared accent rule + optional title wrapper for section headings site-wide.
 * Matches the line under „Кои сме ние?“: short bar, rounded, brand tint.
 */

export const sectionAfterHeadingSpacing = "mt-8 sm:mt-10";

const ruleBase =
  "mt-2.5 h-[2px] w-20 shrink-0 rounded-full bg-accent/35 sm:mt-3";

export function SectionHeadingAccentRule({
  align = "center",
  className,
}: {
  /** `start` = line flush with left edge of text (w-fit block); `center` = centered under that block */
  align?: "start" | "center";
  className?: string;
}) {
  const alignClass = align === "center" ? "mx-auto" : "";
  return (
    <div className={[ruleBase, alignClass, className].filter(Boolean).join(" ")} aria-hidden />
  );
}

type SectionHeadingProps = {
  as?: "h1" | "h2";
  align: "start" | "center";
  titleClassName: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
};

/** Title + accent rule; line is centered under the title text (w-fit). */
export function SectionHeading({
  as: Tag = "h2",
  align,
  titleClassName,
  children,
  id,
  className,
}: SectionHeadingProps) {
  const outer = align === "center" ? "mx-auto w-fit max-w-full text-center" : "w-fit max-w-full";
  return (
    <div className={[outer, className].filter(Boolean).join(" ")}>
      <Tag id={id} className={titleClassName}>
        {children}
      </Tag>
      <SectionHeadingAccentRule align={align === "center" ? "center" : "start"} />
    </div>
  );
}
