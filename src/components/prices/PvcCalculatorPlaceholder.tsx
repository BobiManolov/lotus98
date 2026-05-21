import Link from "next/link";

export function PvcCalculatorPlaceholder() {
  return (
    <article
      data-calculator-placeholder
      aria-labelledby="pvc-calculator-heading"
      className="relative w-full max-w-[380px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white px-6 py-7 shadow-lg ring-1 ring-slate-900/20 sm:px-7 sm:py-8 lg:ml-auto"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=82')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/78 via-white/58 to-sky-50/34" aria-hidden />
      <div className="relative flex h-full flex-col justify-center gap-5">
        <div className="min-w-0">
          <h2 id="pvc-calculator-heading" className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            PVC калкулатор
          </h2>
          <div className="mt-3 h-0.5 w-16 rounded-full bg-blue-400/70" aria-hidden />
          <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-slate-700 sm:text-base">
            Изчислете ориентировъчна цена според размери и конфигурация.
          </p>
        </div>
        <Link
          href="/pvc-kalkulator"
          className="inline-flex w-[300px] items-center justify-center self-start rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Отвори калкулатора
        </Link>
      </div>
    </article>
  );
}
