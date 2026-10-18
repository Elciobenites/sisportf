"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { IsoBars } from "@/components/bi/IsoBars";
import { getBiModels } from "@/data/bi-models";
import { cn } from "@/lib/utils";

type SceneMode = "2d" | "3d";

export function BiShowcase() {
  const [mode, setMode] = useState<SceneMode>("3d");
  const models = getBiModels();
  const people = models.find((model) => model.slug === "gestao-de-pessoas") ?? models[0];
  const ops = models.find((model) => model.slug === "operacao-e-prazos") ?? models[0];
  const exec = models.find((model) => model.slug === "painel-executivo") ?? models[0];
  const quality = models.find((model) => model.slug === "qualidade-de-dados") ?? models[0];
  const pieItems = quality.segments.slice(0, 4);
  const pieTotal = pieItems.reduce((sum, item) => sum + item.share, 0) || 1;
  let pieAngle = 0;
  const pieStops = pieItems.map((item) => {
    const start = pieAngle;
    pieAngle += (item.share / pieTotal) * 360;
    return `${item.color} ${start}deg ${pieAngle}deg`;
  });
  const gauges = exec.kpis.filter((kpi) => kpi.format === "percent").slice(0, 3);
  const peopleBars = people.segments.map((segment) => {
    const series = segment.series[people.kpis[0].id] ?? people.kpis[0].series;
    return {
      value: series[series.length - 1] ?? 0,
      color: segment.color,
    };
  });
  const volumeBars = ops.kpis[0].series.slice(-6);
  const is3d = mode === "3d";

  return (
    <div className="bi-scene" data-mode={mode}>
      <div className="bi-scene-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-10 top-8 h-40 w-40 rounded-full bg-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 top-16 h-48 w-48 rounded-full bg-blue/20 blur-3xl" />

      <div className="relative z-10 mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-soft">
            Sala analítica
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-snow sm:text-2xl">
            Linha, barras, pizza, radar e combo no mesmo recorte
          </h3>
          <p className="mt-1 max-w-xl text-sm text-mist">
            Demonstração visual para a tela inicial. Os números são fictícios e não alteram os
            modelos de dashboard abaixo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["2d", "3d"] as SceneMode[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                className={cn(
                  "focus-ring rounded-full px-4 py-1.5 text-sm font-semibold",
                  mode === option ? "bg-white text-navy-950" : "text-mist hover:text-snow",
                )}
              >
                {option === "2d" ? "2D" : "3D"}
              </button>
            ))}
          </div>
          <Link
            href="/bi"
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-snow hover:text-blue-soft"
          >
            Abrir os painéis
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div key={mode} className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
        <GlassPanel className={cn(is3d && "bi-float", "xl:col-span-4")} title="Tendência">
          <LinePanel values={ops.kpis[0].series.slice(-8)} labels={ops.months.slice(-8)} />
        </GlassPanel>
        <GlassPanel className={cn(is3d && "bi-float bi-float-delay", "xl:col-span-4")} title="Radar executivo">
          <RadarPanel items={exec.radar ?? []} depth={is3d} />
        </GlassPanel>
        <GlassPanel className={cn(is3d && "bi-float", "xl:col-span-4")} title="Combo">
          <ComboPanel
            bars={ops.kpis[0].series.slice(-8)}
            line={ops.kpis[1].series.slice(-8)}
            labels={ops.months.slice(-8)}
          />
        </GlassPanel>

        <ChartSlot className="xl:col-span-3" title={is3d ? "Barras 3D" : "Barras"} platform={is3d}>
          {is3d ? (
            <IsoBars values={peopleBars.map((item) => item.value)} colors={peopleBars.map((item) => item.color)} />
          ) : (
            <FlatBars items={peopleBars} />
          )}
        </ChartSlot>
        <ChartSlot className="xl:col-span-3" title={is3d ? "Pizza 3D" : "Pizza"} platform={is3d}>
          <div className="flex h-[132px] items-center justify-center">
            <div
              className={is3d ? "pie3d" : "pie-flat"}
              style={{ background: `conic-gradient(${pieStops.join(", ")})` }}
            />
          </div>
        </ChartSlot>
        <GlassPanel className="xl:col-span-3" title="Indicadores">
          <ul className="space-y-3">
            {gauges.map((kpi, index) => {
              const value = kpi.series[kpi.series.length - 1];
              return (
                <li key={kpi.id}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="text-mist">{kpi.label}</span>
                    <span className="font-semibold text-snow">{value.toLocaleString("pt-BR")}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="bi-meter h-full rounded-full bg-gradient-to-r from-blue-soft to-cyan"
                      style={
                        {
                          width: `${Math.min(value, 100)}%`,
                          "--i": index,
                        } as CSSProperties
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </GlassPanel>
        <ChartSlot className="xl:col-span-3" title="Volume" platform={is3d}>
          {is3d ? (
            <IsoBars compact values={volumeBars} color="#5b8cff" />
          ) : (
            <FlatBars items={volumeBars.map((value) => ({ value, color: "#5b8cff" }))} />
          )}
        </ChartSlot>
      </div>
    </div>
  );
}

function GlassPanel({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={cn("bi-glass rounded-2xl p-4", className)}>
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">{title}</p>
      {children}
    </article>
  );
}

function ChartSlot({
  title,
  className,
  platform,
  children,
}: {
  title: string;
  className?: string;
  platform: boolean;
  children: React.ReactNode;
}) {
  if (!platform) {
    return (
      <GlassPanel className={className} title={title}>
        {children}
      </GlassPanel>
    );
  }

  return (
    <article className={cn("flex flex-col", className)}>
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
        {title}
      </p>
      <div className="bi-glass relative z-10 rounded-2xl px-3 pb-2 pt-4">{children}</div>
      <div className="bi-platform -mt-1" aria-hidden="true" />
    </article>
  );
}

function FlatBars({ items }: { items: { value: number; color: string }[] }) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="flex h-[132px] items-end gap-2 px-1 pb-1">
      {items.map((item, index) => (
        <span
          key={`${item.color}-${index}`}
          className="bi-flat-bar flex-1 rounded-t-md"
          style={
            {
              height: `${Math.max((item.value / max) * 118, 8)}px`,
              background: item.color,
              "--i": index,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function LinePanel({ values, labels }: { values: number[]; labels: string[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = 12 + (index / Math.max(values.length - 1, 1)) * 216;
    const y = 86 - ((value - min) / span) * 64;
    return { x, y, label: labels[index] };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} 98 L ${points[0].x} 98 Z`;

  return (
    <svg viewBox="0 0 240 112" className="h-[132px] w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((row) => (
        <line
          key={row}
          x1="12"
          x2="228"
          y1={18 + row * 20}
          y2={18 + row * 20}
          stroke="rgba(122,216,255,0.12)"
        />
      ))}
      <path className="bi-area-in" d={area} fill="url(#biLineFill)" />
      <path className="bi-stroke-draw" d={line} fill="none" stroke="#7ad8ff" strokeWidth="2.4" />
      <path className="bi-stroke-flow" d={line} fill="none" stroke="#3ec6ff" strokeWidth="2" opacity="0.7" />
      {points.map((point, index) => {
        const live = index === points.length - 1;
        return (
          <g key={point.label}>
            {live ? (
              <circle className="bi-live-ring" cx={point.x} cy={point.y} r="7" fill="none" stroke="#3ec6ff" strokeWidth="1.4" />
            ) : null}
            <circle
              className={live ? "bi-dot-live" : "bi-dot"}
              cx={point.x}
              cy={point.y}
              r="3.2"
              fill="#3ec6ff"
              style={{ animationDelay: live ? undefined : `${0.45 + index * 0.08}s` }}
            />
          </g>
        );
      })}
      <defs>
        <linearGradient id="biLineFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3ec6ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3ec6ff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ComboPanel({
  bars,
  line,
  labels,
}: {
  bars: number[];
  line: number[];
  labels: string[];
}) {
  const barMax = Math.max(...bars, 1);
  const lineMin = Math.min(...line);
  const lineMax = Math.max(...line);
  const lineSpan = lineMax - lineMin || 1;
  const linePoints = line.map((value, index) => {
    const x = 18 + (index / Math.max(line.length - 1, 1)) * 204;
    const y = 88 - ((value - lineMin) / lineSpan) * 58;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  });

  return (
    <svg viewBox="0 0 240 112" className="h-[132px] w-full" aria-hidden="true">
      {bars.map((value, index) => {
        const x = 14 + index * 28;
        const h = (value / barMax) * 62;
        return (
          <rect
            key={labels[index]}
            className="bi-combo-bar"
            x={x}
            y={92 - h}
            width="16"
            height={h}
            rx="3"
            fill="#2f6dff"
            opacity="0.7"
            style={{ "--i": index } as CSSProperties}
          />
        );
      })}
      <path className="bi-stroke-draw" d={linePoints.join(" ")} fill="none" stroke="#7ad8ff" strokeWidth="2.2" />
      <path className="bi-stroke-flow" d={linePoints.join(" ")} fill="none" stroke="#3ec6ff" strokeWidth="1.8" opacity="0.65" />
    </svg>
  );
}

function RadarPanel({ items, depth }: { items: { axis: string; value: number }[]; depth: boolean }) {
  const cx = 100;
  const cy = 76;
  const radius = 50;
  const count = Math.max(items.length, 3);
  const point = (index: number, value: number) => {
    const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
    return [cx + Math.cos(angle) * radius * (value / 100), cy + Math.sin(angle) * radius * (value / 100)];
  };
  const polygon = items.map((item, index) => point(index, item.value).join(",")).join(" ");

  return (
    <svg viewBox="0 0 200 150" className="mx-auto h-[132px] w-full" aria-hidden="true">
      {depth ? (
        <>
          <path d="M62 54 L100 32 L138 54 L100 76 Z" fill="rgba(62,198,255,0.04)" stroke="rgba(122,216,255,0.28)" />
          <path d="M62 54 L62 96 L100 118 L100 76" fill="none" stroke="rgba(122,216,255,0.18)" />
          <path d="M138 54 L138 96 L100 118" fill="none" stroke="rgba(122,216,255,0.18)" />
        </>
      ) : null}
      {[0.4, 0.7, 1].map((scale) => (
        <polygon
          key={scale}
          points={items.map((_, index) => point(index, 100 * scale).join(",")).join(" ")}
          fill="none"
          stroke="rgba(122,216,255,0.16)"
        />
      ))}
      {items.map((_, index) => {
        const [x, y] = point(index, 100);
        return <line key={index} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(122,216,255,0.16)" />;
      })}
      <polygon className="bi-radar-shape" points={polygon} fill="rgba(62,198,255,0.22)" stroke="#7ad8ff" strokeWidth="1.8" />
      {items.map((item, index) => {
        const [x, y] = point(index, item.value);
        const live = index === 0;
        return (
          <g key={item.axis}>
            {live ? (
              <circle className="bi-live-ring" cx={x} cy={y} r="7" fill="none" stroke="#3ec6ff" strokeWidth="1.3" />
            ) : null}
            <circle className={live ? "bi-dot-live" : "bi-dot"} cx={x} cy={y} r="2.8" fill="#3ec6ff" />
          </g>
        );
      })}
    </svg>
  );
}
