"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBiValue, type BiFormat, type BiRadarAxis } from "@/data/bi-models";

const tooltipStyle = {
  backgroundColor: "#07101f",
  border: "1px solid rgba(148,180,212,0.18)",
  borderRadius: 12,
  color: "#f5f8ff",
  fontSize: 12,
  padding: "8px 10px",
};

type TrendPoint = { name: string; valor: number };

type TrendChartProps = {
  data: TrendPoint[];
  color: string;
  unit: string;
  format: BiFormat;
  variant: "area" | "bar";
};

function paddedDomain(dataMin: number, dataMax: number): [number, number] {
  const span = Math.abs(dataMax - dataMin);
  const pad = span === 0 ? Math.max(Math.abs(dataMax) * 0.08, 1) : span * 0.18;
  const min = dataMin - pad;
  const max = dataMax + pad;
  const safeMin = min < 0 && dataMin >= 0 ? 0 : min;
  if (span < 8) {
    return [Number(safeMin.toFixed(1)), Number(max.toFixed(1))];
  }
  return [Math.floor(safeMin), Math.ceil(max)];
}

function tickLabel(value: number): string {
  return Number(value).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function TrendChart({ data, color, unit, format, variant }: TrendChartProps) {
  const formatter = (value: number) => [formatBiValue(value, format), unit] as const;
  const gradientId = `fill-${color.replace("#", "")}`;
  const values = data.map((point) => point.valor);
  const domain = paddedDomain(Math.min(...values), Math.max(...values));

  if (variant === "bar") {
    return (
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,180,212,0.12)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: "#8ea4c0", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={46}
              domain={domain}
              tickFormatter={tickLabel}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => formatter(Number(value))}
              labelStyle={{ color: "#8ea4c0" }}
            />
            <Bar dataKey="valor" fill={color} radius={[8, 8, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.38} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148,180,212,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#8ea4c0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={46}
            domain={domain}
            tickFormatter={tickLabel}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => formatter(Number(value))}
            labelStyle={{ color: "#8ea4c0" }}
          />
          <Area
            type="monotone"
            dataKey="valor"
            stroke={color}
            strokeWidth={2.4}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 5, stroke: "#f5f8ff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

type ComboPoint = { name: string; volume: number; taxa: number };

type ComboChartProps = {
  data: ComboPoint[];
  color: string;
  barLabel: string;
  lineLabel: string;
  barFormat: BiFormat;
  lineFormat: BiFormat;
};

export function ComboChart({
  data,
  color,
  barLabel,
  lineLabel,
  barFormat,
  lineFormat,
}: ComboChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="rgba(148,180,212,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            yAxisId="left"
            tick={{ fill: "#8ea4c0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={46}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "#8ea4c0", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => {
              const format = name === lineLabel ? lineFormat : barFormat;
              return [formatBiValue(Number(value), format), String(name)];
            }}
            labelStyle={{ color: "#8ea4c0" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#8ea4c0" }} />
          <Bar
            yAxisId="left"
            dataKey="volume"
            name={barLabel}
            fill={color}
            fillOpacity={0.35}
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="taxa"
            name={lineLabel}
            stroke="#f5f8ff"
            strokeWidth={2.2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

type BreakdownChartProps = {
  items: { label: string; value: number }[];
  color: string;
  active?: string;
  onSelect?: (label: string) => void;
};

export function BreakdownChart({ items, color, active, onSelect }: BreakdownChartProps) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid stroke="rgba(148,180,212,0.08)" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            width={108}
            tick={{ fill: "#d5e0f0", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [Number(value).toLocaleString("pt-BR"), "volume"]}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            maxBarSize={22}
            onClick={(data) => {
              const point = data as { label?: string; payload?: { label?: string } };
              const label = point.label ?? point.payload?.label;
              if (label) onSelect?.(label);
            }}
            cursor="pointer"
          >
            {items.map((item) => (
              <Cell
                key={item.label}
                fill={item.label === active ? "#f5f8ff" : color}
                fillOpacity={item.label === active ? 0.95 : 0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

type CompositionChartProps = {
  items: { label: string; value: number; color: string }[];
  active?: string;
  onSelect?: (label: string) => void;
};

export function CompositionChart({ items, active, onSelect }: CompositionChartProps) {
  const [hovered, setHovered] = useState(items[0]?.label ?? "");
  const currentLabel = active ?? hovered;
  const current = items.find((item) => item.label === currentLabel) ?? items[0];

  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-4 sm:flex-row">
      <div className="h-[200px] w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              onMouseEnter={(_, index) => {
                setHovered(items[index].label);
                onSelect?.(items[index].label);
              }}
            >
              {items.map((item) => (
                <Cell
                  key={item.label}
                  fill={item.color}
                  stroke="transparent"
                  opacity={item.label === current?.label ? 1 : 0.45}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value, name) => [`${value}%`, String(name)]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="w-full space-y-2 text-sm sm:w-auto sm:min-w-[150px]">
        {items.map((item) => (
          <li key={item.label}>
            <button
              type="button"
              onMouseEnter={() => {
                setHovered(item.label);
                onSelect?.(item.label);
              }}
              onFocus={() => onSelect?.(item.label)}
              onClick={() => onSelect?.(item.label)}
              className="flex w-full items-center gap-2 text-left text-mist"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
              <span className={item.label === current?.label ? "text-snow" : undefined}>{item.label}</span>
              <span className="ml-auto font-semibold text-snow">{item.value}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

type RadarBoardProps = {
  items: BiRadarAxis[];
  color: string;
};

export function RadarBoard({ items, color }: RadarBoardProps) {
  const data = items.map((item) => ({ ...item, full: 100 }));

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(148,180,212,0.2)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "#d5e0f0", fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar dataKey="value" stroke={color} fill={color} fillOpacity={0.28} strokeWidth={2} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => [`${value}`, "score"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

type GaugeProps = {
  value: number;
  target?: number;
  color: string;
  label: string;
};

export function Gauge({ value, target, color, label }: GaugeProps) {
  const data = [{ name: label, value: Math.min(value, 100), fill: color }];

  return (
    <div className="relative h-[132px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={data}
          innerRadius="72%"
          outerRadius="100%"
          startAngle={220}
          endAngle={-40}
          barSize={10}
        >
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "rgba(255,255,255,0.06)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2">
        <p className="font-display text-xl font-semibold text-snow">{formatBiValue(value, "percent")}</p>
        {target ? <p className="text-[10px] uppercase tracking-[0.12em] text-mist">meta {target}%</p> : null}
      </div>
    </div>
  );
}
