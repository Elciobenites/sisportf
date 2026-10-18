"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  deltaLabel,
  formatBiValue,
  kpiById,
  periodDelta,
  seriesFor,
  sliceByPeriod,
  type BiModel,
  type BiPeriod,
} from "@/data/bi-models";
import { Sparkline } from "@/components/bi/charts";
import {
  BreakdownChart,
  ComboChart,
  CompositionChart,
  Gauge,
  RadarBoard,
  TrendChart,
} from "@/components/bi/DynamicCharts";
import { BrazilMap } from "@/components/bi/BrazilMap";
import { Heatmap } from "@/components/bi/Heatmap";
import { cn } from "@/lib/utils";

const Chart3D = dynamic(() => import("@/components/bi/Chart3D").then((mod) => mod.Chart3D), {
  ssr: false,
  loading: () => <div className="h-[340px] animate-pulse rounded-xl bg-white/4" />,
});

type DashboardViewProps = {
  model: BiModel;
};

type ChartVariant = "area" | "bar" | "3d";

export function DashboardView({ model }: DashboardViewProps) {
  const [period, setPeriod] = useState<BiPeriod>("12m");
  const [variant, setVariant] = useState<ChartVariant>(model.preview === "bars" ? "bar" : "area");
  const [activeKpi, setActiveKpi] = useState(model.kpis[0].id);
  const [segmentId, setSegmentId] = useState("all");
  const [activeUf, setActiveUf] = useState<string | undefined>();

  const months = sliceByPeriod(model.months, period);
  const activeSegment = model.segments.find((segment) => segment.id === segmentId);
  const selectedMeta = kpiById(model, activeKpi) ?? model.kpis[0];

  const kpis = useMemo(
    () =>
      model.kpis.map((kpi) => {
        const series = sliceByPeriod(seriesFor(model, kpi.id, segmentId), period);
        return {
          ...kpi,
          series,
          current: series[series.length - 1],
          delta: deltaLabel(series, kpi.invertDelta),
          range: periodDelta(series, kpi.invertDelta),
        };
      }),
    [model, period, segmentId],
  );

  const selected = kpis.find((kpi) => kpi.id === activeKpi) ?? kpis[0];
  const trendData = months.map((name, index) => ({
    name,
    valor: selected.series[index],
  }));

  const barSeries = sliceByPeriod(seriesFor(model, model.comboBarKpi, segmentId), period);
  const lineSeries = sliceByPeriod(seriesFor(model, model.comboLineKpi, segmentId), period);
  const comboData = months.map((name, index) => ({
    name,
    volume: barSeries[index],
    taxa: lineSeries[index],
  }));
  const barMeta = kpiById(model, model.comboBarKpi);
  const lineMeta = kpiById(model, model.comboLineKpi);

  const breakdown = model.segments.map((segment) => {
    const series = sliceByPeriod(segment.series[model.kpis[0].id], period);
    return {
      label: segment.label,
      value: Math.round(series[series.length - 1] ?? 0),
    };
  });
  const composition = model.segments.map((segment) => ({
    label: segment.label,
    value: segment.share,
    color: segment.color,
  }));
  const heatRows = model.segments.map((segment) => ({
    id: segment.id,
    label: segment.label,
    values: sliceByPeriod(segment.heatmap, period),
  }));

  const clusterSeries = model.segments.map((segment) => ({
    id: segment.id,
    label: segment.label,
    color: segment.color,
    values: sliceByPeriod(segment.series[selected.id] ?? selected.series, period),
  }));
  const trend3d = [
    {
      id: selected.id,
      label: selected.label,
      color: model.accent,
      values: selected.series,
    },
  ];

  const percentKpis = kpis.filter((kpi) => kpi.format === "percent" && kpi.target);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <p className="rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
            Demonstração interativa · dados fictícios
          </p>
          <p className="text-xs text-mist">
            Recorte: {activeSegment ? activeSegment.label : "todos os recortes"}
          </p>
        </div>
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
            {(["area", "bar", "3d"] as ChartVariant[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setVariant(option)}
                className={cn(
                  "focus-ring rounded-full px-4 py-1.5 text-sm font-semibold",
                  variant === option ? "bg-white text-navy-950" : "text-mist hover:text-snow",
                )}
              >
                {option === "area" ? "Área" : option === "bar" ? "Barras" : "3D"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={segmentId === "all"}
          onClick={() => {
            setSegmentId("all");
            setActiveUf(undefined);
          }}
        >
          Todos os recortes
        </FilterChip>
        {model.segments.map((segment) => (
          <FilterChip
            key={segment.id}
            active={segmentId === segment.id}
            onClick={() => {
              setSegmentId(segment.id);
              setActiveUf(undefined);
            }}
          >
            {segment.label}
          </FilterChip>
        ))}
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
            <p className="mt-1 text-xs text-mist">{kpi.range.text}</p>
            {kpi.target && kpi.format === "percent" ? (
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%`,
                    background: model.accent,
                  }}
                />
              </div>
            ) : null}
            <div className="mt-3">
              <Sparkline values={kpi.series} color={model.accent} />
            </div>
          </button>
        ))}
      </div>

      {model.map ? (
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-snow">Mapa do Brasil</h2>
              <p className="text-sm text-mist">
                Clique em uma UF para filtrar. Os pontos mostram georreferência ilustrativa, sem endereços reais.
              </p>
            </div>
          </div>
          <BrazilMap
            accent={model.accent}
            activeRegion={activeSegment?.label}
            activeUf={activeUf}
            onSelectUf={(uf, regiao) => {
              const match = model.segments.find((segment) => segment.label === regiao);
              if (match) setSegmentId(match.id);
              setActiveUf(uf);
            }}
          />
        </article>
      ) : null}

      {model.chart3d ? (
        <article className="rounded-2xl border border-cyan/20 bg-[#07101f] p-5">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-snow">Visão 3D</h2>
              <p className="text-sm text-mist">
                Colunas em profundidade: mês × recorte de {selected.label}. Arraste para orbitar.
              </p>
            </div>
            <span className="rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-soft">
              Órbita 3D
            </span>
          </div>
          <Chart3D
            categories={months}
            series={clusterSeries}
            format={selected.format}
            activeSeriesId={segmentId === "all" ? undefined : segmentId}
            onSelectSeries={(id) => setSegmentId(id === segmentId ? "all" : id)}
          />
        </article>
      ) : null}

      {percentKpis.length >= 3 ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {percentKpis.slice(0, 3).map((kpi) => (
            <article key={`gauge-${kpi.id}`} className="rounded-2xl border border-white/8 bg-[#07101f] px-4 pb-3 pt-2">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
                {kpi.label}
              </p>
              <Gauge value={kpi.current} target={kpi.target} color={model.accent} label={kpi.label} />
            </article>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <h2 className="font-display text-lg font-semibold text-snow">{selected.label}</h2>
          <p className="mb-2 text-sm text-mist">
            Clique em um indicador para trocar a série. O recorte selecionado altera o valor.
          </p>
          {variant === "3d" ? (
            <Chart3D categories={months} series={trend3d} format={selected.format} />
          ) : (
            <TrendChart
              data={trendData}
              color={model.accent}
              unit={selected.label}
              format={selected.format}
              variant={variant}
            />
          )}
        </article>
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <h2 className="mb-2 font-display text-lg font-semibold text-snow">{model.compositionTitle}</h2>
          {model.viz === "radar" && model.radar ? (
            <RadarBoard items={model.radar} color={model.accent} />
          ) : (
            <CompositionChart
              items={composition}
              active={activeSegment?.label}
              onSelect={(label) => {
                const match = model.segments.find((segment) => segment.label === label);
                if (match) setSegmentId(match.id);
              }}
            />
          )}
        </article>
      </div>

      <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-snow">{model.heatmapTitle}</h2>
            <p className="text-sm text-mist">{model.heatmapHint}</p>
          </div>
        </div>
        <Heatmap
          rows={heatRows}
          months={months}
          accent={model.accent}
          activeRow={segmentId === "all" ? undefined : segmentId}
          onSelectRow={setSegmentId}
        />
      </article>

      <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
        <h2 className="font-display text-lg font-semibold text-snow">Volume e taxa no mesmo recorte</h2>
        <p className="mb-2 text-sm text-mist">
          {model.comboBarLabel} em barras e {model.comboLineLabel} em linha, no período selecionado.
        </p>
        <ComboChart
          data={comboData}
          color={model.accent}
          barLabel={model.comboBarLabel}
          lineLabel={model.comboLineLabel}
          barFormat={barMeta?.format ?? "number"}
          lineFormat={lineMeta?.format ?? "percent"}
        />
      </article>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
          <h2 className="mb-2 font-display text-lg font-semibold text-snow">{model.breakdownTitle}</h2>
          <p className="mb-3 text-sm text-mist">
            {activeSegment ? `Recorte em destaque: ${activeSegment.label}.` : "Clique em uma barra para filtrar."}
          </p>
          <BreakdownChart
            items={breakdown}
            color={model.accent}
            active={activeSegment?.label}
            onSelect={(label) => {
              const match = model.segments.find((segment) => segment.label === label);
              setSegmentId(match?.id ?? "all");
            }}
          />
        </article>
        <article className="overflow-hidden rounded-2xl border border-white/8 bg-[#07101f]">
          <h2 className="px-5 pt-5 font-display text-lg font-semibold text-snow">{model.tableTitle}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.14em] text-mist">
                <tr>
                  <th className="px-5 py-2 font-semibold">Recorte</th>
                  {model.kpis.slice(0, 3).map((kpi) => (
                    <th key={kpi.id} className="px-5 py-2 font-semibold">
                      {kpi.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {model.segments.map((segment) => (
                  <tr
                    key={segment.id}
                    className={cn(
                      "cursor-pointer border-t border-white/6 hover:bg-white/4",
                      segment.id === segmentId && "bg-white/4",
                    )}
                    onClick={() => setSegmentId(segment.id)}
                  >
                    <td className="px-5 py-3 text-snow">{segment.label}</td>
                    {model.kpis.slice(0, 3).map((kpi) => {
                      const series = sliceByPeriod(segment.series[kpi.id], period);
                      const value = series[series.length - 1] ?? 0;
                      return (
                        <td key={kpi.id} className="px-5 py-3 text-ink">
                          {formatBiValue(value, kpi.format)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {model.signals.map((signal) => (
          <aside
            key={signal.label}
            className={cn(
              "rounded-2xl border p-4",
              signal.level === "ok" && "border-emerald-400/20 bg-emerald-400/8",
              signal.level === "watch" && "border-amber-400/20 bg-amber-400/8",
              signal.level === "alert" && "border-rose-400/20 bg-rose-400/8",
            )}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-snow">{signal.label}</p>
            <p className="mt-2 text-sm leading-6 text-ink">{signal.detail}</p>
          </aside>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {model.insights.map((insight) => (
          <article key={insight.title} className="rounded-2xl border border-white/8 bg-[#07101f] p-5">
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.16em]",
                insight.tone === "up" && "text-emerald-300",
                insight.tone === "watch" && "text-amber-300",
                insight.tone === "alert" && "text-rose-300",
              )}
            >
              {insight.tone === "up" ? "Sinal positivo" : insight.tone === "watch" ? "Atenção" : "Risco"}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-snow">{insight.title}</h3>
            <p className="mt-2 text-sm leading-6 text-mist">{insight.text}</p>
          </article>
        ))}
      </div>

      <aside className="rounded-2xl border border-blue/25 bg-blue/8 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-soft">
          Leitura do painel
        </p>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-ink">{model.reading}</p>
        {selectedMeta.hint ? (
          <p className="mt-3 text-xs text-mist">
            Indicador em foco: {selected.label}. {selectedMeta.hint}.
          </p>
        ) : null}
      </aside>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring rounded-full border px-3 py-1.5 text-sm font-semibold",
        active ? "border-white bg-white text-navy-950" : "border-white/10 bg-white/5 text-mist hover:text-snow",
      )}
    >
      {children}
    </button>
  );
}
