"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatBiValue, type BiKpi } from "@/data/bi-models";

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
  format: BiKpi["format"];
  variant: "area" | "bar";
};

export function TrendChart({ data, color, unit, format, variant }: TrendChartProps) {
  const formatter = (value: number) => [formatBiValue(value, format), unit] as const;

  if (variant === "bar") {
    return (
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,180,212,0.12)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
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
            <linearGradient id={`fill-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.38} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(148,180,212,0.12)" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#8ea4c0", fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
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
            fill={`url(#fill-${color.replace("#", "")})`}
            activeDot={{ r: 5, stroke: "#f5f8ff", strokeWidth: 2 }}
          />
        </AreaChart>
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
        <BarChart
          data={items}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
        >
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
};

export function CompositionChart({ items }: CompositionChartProps) {
  const [active, setActive] = useState(items[0]?.label ?? "");
  const current = items.find((item) => item.label === active) ?? items[0];

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
              onMouseEnter={(_, index) => setActive(items[index].label)}
            >
              {items.map((item) => (
                <Cell
                  key={item.label}
                  fill={item.color}
                  stroke="transparent"
                  opacity={item.label === active ? 1 : 0.55}
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
              onMouseEnter={() => setActive(item.label)}
              onFocus={() => setActive(item.label)}
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
