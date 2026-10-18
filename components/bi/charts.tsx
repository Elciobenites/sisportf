type SparklineProps = {
  values: number[];
  color: string;
};

export function HeatStrip({ values, color }: SparklineProps) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, max);
  const span = max - min || 1;

  return (
    <div className="flex h-8 gap-[3px]" aria-hidden="true">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="h-full flex-1 rounded-[3px]"
          style={{ background: color, opacity: 0.16 + ((value - min) / span) * 0.84 }}
        />
      ))}
    </div>
  );
}

export function Sparkline({ values, color }: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const d = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 28 - ((value - min) / span) * 24;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 32" className="h-8 w-full" aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type LineAreaProps = {
  values: number[];
  labels: string[];
  color: string;
  unit: string;
};

export function LineAreaChart({ values, labels, color, unit }: LineAreaProps) {
  const min = Math.min(...values) * 0.96;
  const max = Math.max(...values) * 1.04;
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = 36 + (index / Math.max(values.length - 1, 1)) * 620;
    const y = 150 - ((value - min) / span) * 118;
    return { x, y, value, label: labels[index] };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const area = `${line} L ${points[points.length - 1].x} 168 L ${points[0].x} 168 Z`;

  return (
    <svg viewBox="0 0 680 190" className="h-auto w-full" role="img" aria-label={`Série em ${unit}`}>
      {[0, 1, 2, 3].map((lineIndex) => (
        <line
          key={lineIndex}
          x1="36"
          x2="656"
          y1={32 + lineIndex * 34}
          y2={32 + lineIndex * 34}
          stroke="rgba(148,180,212,0.12)"
        />
      ))}
      <path d={area} fill={color} opacity="0.16" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" />
      {points.map((point) => (
        <circle key={point.label} cx={point.x} cy={point.y} r="3.2" fill={color} />
      ))}
      {points.map((point, index) =>
        index % 2 === 0 || index === points.length - 1 ? (
          <text
            key={`label-${point.label}`}
            x={point.x}
            y="184"
            textAnchor="middle"
            fill="#8ea4c0"
            fontSize="11"
          >
            {point.label}
          </text>
        ) : null,
      )}
    </svg>
  );
}

type BarListProps = {
  items: { label: string; value: number }[];
  color: string;
};

export function BarList({ items, color }: BarListProps) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-ink">{item.label}</span>
            <span className="font-semibold text-snow">{item.value.toLocaleString("pt-BR")}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full"
              style={{ width: `${(item.value / max) * 100}%`, background: color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

type DonutProps = {
  items: { label: string; value: number; color: string }[];
};

export function DonutChart({ items }: DonutProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="h-36 w-36" role="img" aria-label="Composição percentual">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="16" />
        {items.map((item) => {
          const length = (item.value / total) * circumference;
          const circle = (
            <circle
              key={item.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="16"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
            />
          );
          offset += length;
          return circle;
        })}
        <text x="70" y="66" textAnchor="middle" fill="#f5f8ff" fontSize="16" fontWeight="700">
          100%
        </text>
        <text x="70" y="84" textAnchor="middle" fill="#8ea4c0" fontSize="10">
          composição
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2 text-mist">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
            <span>{item.label}</span>
            <span className="ml-auto font-semibold text-snow">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
