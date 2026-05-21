export function PvcColorSwatch({ label, swatchClass }: { label: string; swatchClass: string }) {
  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div
        className={`h-12 w-12 rounded-full shadow-inner transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-md sm:h-14 sm:w-14 ${swatchClass}`}
        aria-hidden
      />
      <span className="max-w-[7rem] text-xs font-medium leading-snug text-slate-700 sm:text-sm">{label}</span>
    </div>
  );
}
