"use client";

import { useState, useMemo } from "react";
import { GLASS_GROUPS } from "@/content/staklopaketi";
import { SectionHeading } from "@/components/SectionHeading";

const ALL_ID = "all";

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function StaklopaketiPriceTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(ALL_ID);
  const [openSet, setOpenSet] = useState<Set<string>>(
    () => new Set([GLASS_GROUPS[0].id])
  );

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const q = search.toLowerCase().trim();
  const isSearching = q.length > 0;

  const visibleGroups = useMemo(() => {
    return GLASS_GROUPS.map((g) => ({
      ...g,
      filtered: isSearching
        ? g.rows.filter((r) => r.name.toLowerCase().includes(q))
        : g.rows,
    }))
      .filter((g) => filter === ALL_ID || g.id === filter)
      .filter((g) => !isSearching || g.filtered.length > 0);
  }, [filter, q, isSearching]);

  return (
    <section className="border-t border-slate-200/80 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          align="start"
          titleClassName="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Ценова листа
        </SectionHeading>

        {/* Controls */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:max-w-xs w-full sm:w-auto sm:flex-1">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Търсене по вид стъкло..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => {
              const id = e.target.value;
              setFilter(id);
              if (id !== ALL_ID) {
                setOpenSet((prev) => new Set([...prev, id]));
              }
            }}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:w-52"
          >
            <option value={ALL_ID}>Всички дебелини</option>
            {GLASS_GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* No results */}
        {visibleGroups.length === 0 && (
          <p className="mt-10 text-center text-sm text-slate-500">
            Няма намерени резултати за &ldquo;{search}&rdquo;.
          </p>
        )}

        {/* Accordion groups */}
        <div className="mt-6 space-y-2.5">
          {visibleGroups.map((group) => {
            const rows = isSearching ? group.filtered : group.rows;
            const isOpen = isSearching || openSet.has(group.id) || filter === group.id;
            return (
              <div
                key={group.id}
                className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm"
              >
                {/* Accordion header */}
                <button
                  type="button"
                  onClick={() => !isSearching && toggle(group.id)}
                  className="flex w-full items-center justify-between bg-slate-50 px-5 py-3.5 text-left transition-colors hover:bg-slate-100/70"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-900">{group.label}</span>
                    <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                      {rows.length} артикула
                    </span>
                  </div>
                  {!isSearching && <ChevronDown open={isOpen} />}
                </button>

                {/* Price table */}
                {isOpen && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-white">
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Вид стъкло / стъклопакет
                          </th>
                          <th className="border-l border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 tabular-nums">
                            €/м²
                          </th>
                          <th className="border-l border-slate-200 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 tabular-nums">
                            лв./м²
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr
                            key={row.name}
                            className="border-b border-slate-100 last:border-0"
                            style={{ backgroundColor: i % 2 === 1 ? "#FFFDE7" : undefined }}
                          >
                            <td className="px-5 py-2.5 text-[13px] text-slate-800">
                              {row.name}
                            </td>
                            <td className="border-l border-slate-100 px-4 py-2.5 text-center text-[13px] tabular-nums font-semibold text-slate-900">
                              {row.eur.toFixed(2)} €
                            </td>
                            <td className="border-l border-slate-100 px-4 py-2.5 text-center text-[13px] tabular-nums text-slate-600">
                              {row.bgn.toFixed(2)} лв.
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
