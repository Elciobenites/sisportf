"use client";

import { useMemo, useState } from "react";
import { brazilUfMetrics, brazilGeoPoints } from "@/data/brazil-geo";
import { brazilUfs, brazilViewBox } from "@/data/brazil-ufs";
import { cn } from "@/lib/utils";

type BrazilMapProps = {
  accent: string;
  activeRegion?: string;
  activeUf?: string;
  onSelectUf?: (uf: string, regiao: string) => void;
  showPoints?: boolean;
};

function opacityFor(cobertura: number): number {
  return 0.22 + ((cobertura - 58) / 38) * 0.78;
}

export function BrazilMap({
  accent,
  activeRegion,
  activeUf,
  onSelectUf,
  showPoints = true,
}: BrazilMapProps) {
  const [hover, setHover] = useState<string | null>(null);
  const current = brazilUfs.find((uf) => uf.id === (hover ?? activeUf));
  const metric = current ? brazilUfMetrics[current.id] : undefined;

  const visiblePoints = useMemo(() => {
    if (!showPoints) return [];
    return brazilGeoPoints.filter((point) => {
      if (!activeRegion && !activeUf) return true;
      const uf = brazilUfs.find((item) => item.id === point.uf);
      if (activeUf) return point.uf === activeUf;
      return uf?.regiao === activeRegion;
    });
  }, [activeRegion, activeUf, showPoints]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="relative">
        <svg viewBox={brazilViewBox} className="h-auto w-full" role="img" aria-label="Mapa do Brasil por unidade da federação">
          {brazilUfs.map((uf) => {
            const value = brazilUfMetrics[uf.id]?.cobertura ?? 70;
            const selected = activeUf === uf.id;
            const inRegion = !activeRegion || uf.regiao === activeRegion || selected;
            return (
              <path
                key={uf.id}
                d={uf.d}
                fill={accent}
                fillOpacity={inRegion ? opacityFor(value) : 0.08}
                stroke={selected ? "#f5f8ff" : "rgba(3,8,20,0.85)"}
                strokeWidth={selected ? 2.4 : 0.8}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHover(uf.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelectUf?.(uf.id, uf.regiao)}
              />
            );
          })}
          {visiblePoints.map((point) => (
            <circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r={activeUf === point.uf ? 3.4 : 2.4}
              fill={point.ok ? "#67e8f9" : "#f59e0b"}
              fillOpacity={0.95}
              stroke="#030814"
              strokeWidth="0.6"
            />
          ))}
        </svg>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-mist">
          <span>Cobertura da UF</span>
          <span className="h-2 w-24 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}33, ${accent})` }} />
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#67e8f9]" />
            Geocodificado
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            Sem coordenada útil
          </span>
        </div>
      </div>
      <aside className="rounded-2xl border border-white/8 bg-white/4 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
          {current ? current.nome : "Clique em um estado"}
        </p>
        {current && metric ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm text-mist">
              {current.id} · {current.regiao}
            </p>
            <p className="font-display text-4xl font-semibold text-snow">{metric.cobertura}%</p>
            <p className="text-xs text-mist">cobertura geocodificada no recorte ilustrativo</p>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-mist">Unidades</dt>
                <dd className="font-semibold text-snow">{metric.unidades}</dd>
              </div>
              <div>
                <dt className="text-mist">Com coordenada</dt>
                <dd className="font-semibold text-snow">{metric.geocodificados}</dd>
              </div>
            </dl>
          </div>
        ) : (
          <p className="mt-3 text-sm leading-6 text-mist">
            O mapa mostra cobertura por UF e pontos fictícios de georreferência. Nenhum endereço real é exibido.
          </p>
        )}
        <UfRanking
          accent={accent}
          activeUf={activeUf}
          region={activeRegion}
          onSelect={onSelectUf}
        />
      </aside>
    </div>
  );
}

function UfRanking({
  accent,
  activeUf,
  region,
  onSelect,
}: {
  accent: string;
  activeUf?: string;
  region?: string;
  onSelect?: (uf: string, regiao: string) => void;
}) {
  const rows = brazilUfs
    .filter((uf) => !region || uf.regiao === region)
    .map((uf) => ({ ...uf, ...brazilUfMetrics[uf.id] }))
    .sort((a, b) => a.cobertura - b.cobertura)
    .slice(0, 6);

  return (
    <div className="mt-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
        Menor cobertura
      </p>
      <ul className="mt-2 space-y-1.5">
        {rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => onSelect?.(row.id, row.regiao)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm",
                activeUf === row.id ? "bg-white/8 text-snow" : "text-mist hover:bg-white/5 hover:text-snow",
              )}
            >
              <span>
                {row.id} · {row.nome}
              </span>
              <span className="font-semibold" style={{ color: accent }}>
                {row.cobertura}%
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MiniBrazilMap({ accent, tall = false }: { accent: string; tall?: boolean }) {
  return (
    <svg viewBox={brazilViewBox} className={tall ? "mx-auto h-48 w-full max-w-md" : "h-28 w-full"} aria-hidden="true">
      {brazilUfs.map((uf) => {
        const value = brazilUfMetrics[uf.id]?.cobertura ?? 70;
        return (
          <path
            key={uf.id}
            d={uf.d}
            fill={accent}
            fillOpacity={opacityFor(value)}
            stroke="rgba(3,8,20,0.7)"
            strokeWidth="0.8"
          />
        );
      })}
      {brazilGeoPoints.filter((_, index) => index % 3 === 0).map((point) => (
        <circle
          key={point.id}
          cx={point.x}
          cy={point.y}
          r="2.2"
          fill={point.ok ? "#67e8f9" : "#f59e0b"}
        />
      ))}
    </svg>
  );
}
