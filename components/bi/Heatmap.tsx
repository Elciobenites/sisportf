"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type HeatmapProps = {
  rows: { id: string; label: string; values: number[] }[];
  months: string[];
  accent: string;
  activeRow?: string;
  onSelectRow?: (id: string) => void;
};

function intensity(value: number, min: number, max: number): number {
  if (max <= min) return 0.45;
  return 0.16 + ((value - min) / (max - min)) * 0.84;
}

export function Heatmap({ rows, months, accent, activeRow, onSelectRow }: HeatmapProps) {
  const [cell, setCell] = useState<{ row: string; month: string; value: number } | null>(null);
  const values = rows.flatMap((row) => row.values);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, max);

  return (
    <div>
      <div className="overflow-x-auto">
        <div
          className="min-w-[640px]"
          style={{
            display: "grid",
            gridTemplateColumns: `132px repeat(${months.length}, minmax(0, 1fr))`,
            gap: 6,
          }}
        >
          <div />
          {months.map((month) => (
            <p key={month} className="text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-mist">
              {month}
            </p>
          ))}
          {rows.map((row) => (
            <div key={row.id} className="contents">
              <button
                type="button"
                onClick={() => onSelectRow?.(row.id)}
                className={cn(
                  "truncate rounded-md px-2 py-1 text-left text-xs font-semibold",
                  activeRow === row.id ? "text-snow" : "text-mist hover:text-snow",
                )}
              >
                {row.label}
              </button>
              {row.values.map((value, index) => {
                const selected = activeRow === row.id;
                const month = months[index];
                return (
                  <button
                    key={`${row.id}-${month}`}
                    type="button"
                    aria-label={`${row.label}, ${month}: ${value}`}
                    onMouseEnter={() => setCell({ row: row.label, month, value })}
                    onFocus={() => setCell({ row: row.label, month, value })}
                    onClick={() => onSelectRow?.(row.id)}
                    className={cn(
                      "h-9 rounded-md transition-transform",
                      selected ? "ring-1 ring-white/50" : "hover:scale-[1.04]",
                    )}
                    style={{
                      background: accent,
                      opacity: intensity(value, min, max),
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-mist">
        {cell
          ? `${cell.row} · ${cell.month} · intensidade ${cell.value}`
          : "Passe o mouse nas células. Clique em um recorte para filtrar o painel."}
      </p>
    </div>
  );
}
