"use client";

import { useMemo, useState } from "react";
import {
  deltaLabel,
  formatBiValue,
  sliceByPeriod,
  type BiModel,
  type BiPeriod,
} from "@/data/bi-models";
import { Sparkline } from "@/components/bi/charts";
import { BreakdownChart, CompositionChart, TrendChart } from "@/components/bi/DynamicCharts";
import { cn } from "@/lib/utils";

type DashboardViewProps = {
  model: BiModel;
};

type ChartVariant = "area" | "bar";

export function DashboardView({ model }: DashboardViewProps) {
  const [period, setPeriod] = useState<BiPeriod>("12m");
  const [variant, setVariant] = useState<ChartVariant>("area");
  const [activeKpi, setActiveKpi] = useState(model.kpis[0].id);
  const [activeBar, setActiveBar] = useState(model.breakdown[0]?.label);

  const months = sliceByPeriod(model.months, period);
  const kpis = useMemo(
    () =>
      model.kpis.map((kpi) => {
        const series = sliceByPeriod(kpi.series, period);
        return {
          ...kpi,
          series,
          current: series[series.length - 1],
          delta: deltaLabel(series, kpi.invertDelta),
        };
      }),
    [model.kpis, period],
  );

  const selected = kpis.find((kpi) => kpi.id === activeKpi) ?? kpis[0];
  const trendData = months.map((name, index) => ({
    name,
    valor: selected.series[index],
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
          Modelo ilustrativo · dados fictícios
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["6m", "12m"] as BiPeriod[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPeriod(option)}
                className={cn(
                  "focus-ring rounded-full px-4 py-1.5 text-sm font-semibold",
                  period === option ? "bg-white text-navy-950" : "text-mist hover:text-snow",
                )}
              >
                {option === "6m" ? "6 meses" : "12 meses"}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["area", "bar"] as ChartVariant[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setVariant(option)}
                className={cn(
                  "focus-ring rounded-full px-4 py-1.5 text-sm font-semibold",
                  variant === option ? "bg-white text-navy-950" : "text-mist hover:text-snow",
                )}
              >
                {option === "area" ? "Área" : "Barras"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <button
            key={kpi.id}
            type="button"
            onClick={() => setActiveKpi(kpi.id)}
            className={cn(
              "rounded-2xl border bg-[#07101f] p-4 text-left transition-colors",
              kpi.id === selected.id
                ? "border-cyan/40 ring-1 ring-cyan/20"
                : "border-white/8 hover:border-white/20",
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mist">{kpi.label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="font-display text-3xl font-semibold text-snow">
                {formatBiValue(kpi.current, kpi.format)}
              </p>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  kpi.delta.positive ? "bg-emerald-400/12 text-emerald-300" : "bg-rose-400/12 text-rose-300",
                )}
              >
                {kpi.delta.text}
              </span>
            </div>
            <p className="mt-1 text-xs text-mist">{kpi.hint}</p>
            <div className="mt-3">
              <Sparkline values={kpi.series} color={model.accent} />
            </div>
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-snow">{selected.label}</h2>
              <p className="text-sm text-mist">
                Clique em um indicador para trocar a série · {selected.format === "days" ? "dias" : selected.format === "percent" ? "%" : "volume"}
              </p>
            </div>
          </div>
          <TrendChart
            data={trendData}
            color={model.accent}
            unit={selected.label}
            format={selected.format}
            variant={variant}
          />
        </article>
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <h2 className="mb-2 font-display text-lg font-semibold text-snow">{model.compositionTitle}</h2>
          <p className="mb-2 text-sm text-mist">Passe o mouse nas fatias ou na legenda.</p>
          <CompositionChart items={model.composition} />
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <h2 className="mb-2 font-display text-lg font-semibold text-snow">{model.breakdownTitle}</h2>
          <p className="mb-3 text-sm text-mist">
            {activeBar ? `Recorte em destaque: ${activeBar}.` : "Clique em uma barra para destacar."}
          </p>
          <BreakdownChart
            items={model.breakdown}
            color={model.accent}
            active={activeBar}
            onSelect={setActiveBar}
          />
        </article>
        <article className="overflow-hidden rounded-2xl border border-white/8 bg-[#07101f]">
          <h2 className="px-5 pt-5 font-display text-lg font-semibold text-snow">{model.tableTitle}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.14em] text-mist">
                <tr>
                  {model.tableColumns.map((column) => (
                    <th key={column} className="px-5 py-2 font-semibold">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {model.tableRows.map((row) => (
                  <tr
                    key={row[0]}
                    className={cn(
                      "border-t border-white/6",
                      row[0] === activeBar && "bg-white/4",
                    )}
                  >
                    {row.map((cell, index) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        className={cn("px-5 py-3", index === 0 ? "text-snow" : "text-ink")}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <aside className="rounded-2xl border border-blue/25 bg-blue/8 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-soft">Leitura do painel</p>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink">{model.reading}</p>
      </aside>
    </div>
  );
}
