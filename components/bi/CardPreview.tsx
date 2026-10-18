import { MiniBrazilMap } from "@/components/bi/BrazilMap";
import { HeatStrip } from "@/components/bi/charts";
import { formatBiValue, type BiModel, type BiPreview } from "@/data/bi-models";

export const previewLabel: Record<BiPreview, string> = {
  bars: "Barras",
  line: "Linha",
  pie: "Pizza",
  gauges: "Gauges",
  heatmap: "Calor",
  map: "Mapa",
};

type CardPreviewProps = {
  model: BiModel;
  compact?: boolean;
};

export function CardPreview({ model, compact = true }: CardPreviewProps) {
  const hero = model.kpis[0];
  const current = hero.series[hero.series.length - 1];

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-mist">{hero.label}</p>
          <p className="font-display text-2xl font-semibold text-snow">
            {formatBiValue(current, hero.format)}
          </p>
        </div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-mist">{previewLabel[model.preview]}</p>
      </div>
      {model.preview === "map" ? <MiniBrazilMap accent={model.accent} tall={!compact} /> : null}
      {model.preview === "pie" ? <MiniPie model={model} /> : null}
      {model.preview === "bars" ? <MiniBars model={model} /> : null}
      {model.preview === "line" ? <MiniLine model={model} /> : null}
      {model.preview === "gauges" ? <MiniGauges model={model} /> : null}
      {model.preview === "heatmap" ? <MiniHeat model={model} /> : null}
    </div>
  );
}

function MiniPie({ model }: { model: BiModel }) {
  const items = model.segments.slice(0, 5);
  const total = items.reduce((sum, item) => sum + item.share, 0) || 1;
  const cx = 56;
  const cy = 56;
  const radius = 50;
  let angle = 0;

  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 112 112" className="h-[104px] w-[104px] shrink-0" aria-hidden="true">
        {items.map((item) => {
          const sweep = (item.share / total) * 360;
          const start = angle;
          const end = angle + sweep;
          angle = end;
          return <path key={item.id} d={pieSlice(cx, cy, radius, start, end)} fill={item.color} />;
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-1.5">
        {items.slice(0, 4).map((item) => (
          <li key={item.id} className="grid grid-cols-[8px_minmax(0,1fr)_auto] items-center gap-2 text-[11px] text-mist">
            <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
            <span className="truncate">{item.label}</span>
            <span className="font-semibold text-snow">{item.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniBars({ model }: { model: BiModel }) {
  const hero = model.kpis[0];
  const items = model.segments.map((segment) => {
    const series = segment.series[hero.id] ?? hero.series;
    return {
      id: segment.id,
      label: segment.label,
      value: series[series.length - 1] ?? 0,
      color: segment.color,
    };
  });
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="flex h-[108px] items-end gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
          <span className="text-[10px] font-semibold text-snow">
            {formatBiValue(item.value, hero.format)}
          </span>
          <span
            className="w-full rounded-t-md"
            style={{
              height: `${Math.max((item.value / max) * 72, 8)}px`,
              background: item.color,
            }}
          />
          <span className="w-full truncate text-center text-[9px] uppercase tracking-[0.08em] text-mist">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function MiniLine({ model }: { model: BiModel }) {
  const values = model.kpis[0].series.slice(-8);
  const labels = model.months.slice(-8);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = 8 + (index / Math.max(values.length - 1, 1)) * 184;
    const y = 78 - ((value - min) / span) * 58;
    return { x, y, label: labels[index] };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} 88 L ${points[0].x} 88 Z`;

  return (
    <svg viewBox="0 0 200 100" className="h-[108px] w-full" aria-hidden="true">
      <path d={area} fill={model.accent} opacity="0.18" />
      <path d={line} fill="none" stroke={model.accent} strokeWidth="2.4" strokeLinecap="round" />
      {points.map((point) => (
        <circle key={point.label} cx={point.x} cy={point.y} r="2.6" fill={model.accent} />
      ))}
      {points.map((point, index) =>
        index % 2 === 0 || index === points.length - 1 ? (
          <text key={`t-${point.label}`} x={point.x} y="98" textAnchor="middle" fill="#8ea4c0" fontSize="8">
            {point.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}

function MiniGauges({ model }: { model: BiModel }) {
  const items = model.kpis.filter((kpi) => kpi.format === "percent").slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((kpi) => {
        const value = kpi.series[kpi.series.length - 1];
        const target = kpi.target ?? 100;
        const pct = Math.min((value / target) * 100, 100);
        return (
          <div key={kpi.id} className="flex flex-col items-center">
            <svg viewBox="0 0 72 48" className="h-12 w-full" aria-hidden="true">
              <path
                d="M8 44 A 28 28 0 0 1 64 44"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M8 44 A 28 28 0 0 1 64 44"
                fill="none"
                stroke={model.accent}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 88} 88`}
              />
            </svg>
            <p className="font-display text-sm font-semibold text-snow">{formatBiValue(value, "percent")}</p>
            <p className="truncate text-[9px] uppercase tracking-[0.08em] text-mist">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function MiniHeat({ model }: { model: BiModel }) {
  return (
    <div className="space-y-1.5">
      {model.segments.slice(0, 4).map((segment) => (
        <div key={segment.id} className="flex items-center gap-2">
          <span className="w-16 truncate text-[10px] text-mist">{segment.label}</span>
          <div className="flex-1">
            <HeatStrip values={segment.heatmap.slice(-10)} color={model.accent} />
          </div>
        </div>
      ))}
    </div>
  );
}

function pieSlice(cx: number, cy: number, radius: number, start: number, end: number) {
  const polar = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };
  const [x1, y1] = polar(start);
  const [x2, y2] = polar(end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
}
