import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type IsoBarsProps = {
  values: number[];
  color?: string;
  colors?: string[];
  labels?: string[];
  compact?: boolean;
};

export function IsoBars({
  values,
  color = "#5b8cff",
  colors,
  labels,
  compact = false,
}: IsoBarsProps) {
  const max = Math.max(...values, 1);
  const minH = compact ? 16 : 26;
  const span = compact ? 64 : 100;

  return (
    <div className={cn("iso-stage", compact ? "iso-stage-sm" : "iso-stage-lg")} aria-hidden="true">
      <div className="iso-world">
        {values.map((value, index) => {
          const height = minH + (value / max) * span;
          const fill = colors?.[index] ?? color;
          return (
            <div
              key={`${fill}-${index}`}
              className="iso-bar"
              style={{ "--h": `${height}px`, "--c": fill, "--i": index } as CSSProperties}
            >
              <span className="iso-front" />
              <span className="iso-side" />
              <span className="iso-top" />
            </div>
          );
        })}
      </div>
      {labels && !compact ? (
        <div className="iso-labels">
          {labels.map((label, index) => (
            <span key={`${label}-${index}`} className="truncate">
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
