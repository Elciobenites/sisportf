import { brazilUfs } from "@/data/brazil-ufs";

export type BrazilUfMetric = {
  cobertura: number;
  unidades: number;
  geocodificados: number;
};

const byRegion: Record<string, { cobertura: number; unidades: number }> = {
  Norte: { cobertura: 71, unidades: 9 },
  Nordeste: { cobertura: 78, unidades: 11 },
  "Centro-Oeste": { cobertura: 81, unidades: 8 },
  Sudeste: { cobertura: 91, unidades: 18 },
  Sul: { cobertura: 88, unidades: 12 },
};

const ufBoost: Record<string, number> = {
  SP: 6,
  RJ: 3,
  MG: 2,
  RS: 2,
  PR: 1,
  SC: 2,
  DF: 4,
  AM: -6,
  AC: -8,
  RR: -9,
  AP: -7,
  PA: -4,
  MA: -3,
  PI: -5,
  TO: -2,
  MT: -3,
  MS: 1,
  BA: -1,
  CE: 1,
  PE: 2,
  GO: 1,
};

export const brazilUfMetrics: Record<string, BrazilUfMetric> = Object.fromEntries(
  brazilUfs.map((uf) => {
    const base = byRegion[uf.regiao];
    const cobertura = Math.min(96, Math.max(58, base.cobertura + (ufBoost[uf.id] ?? 0)));
    const unidades = Math.max(3, Math.round(base.unidades * (0.55 + (ufBoost[uf.id] ?? 0) / 20)));
    const geocodificados = Math.max(1, Math.round(unidades * (cobertura / 100)));
    return [uf.id, { cobertura, unidades, geocodificados }];
  }),
);

export type BrazilGeoPoint = {
  id: string;
  uf: string;
  x: number;
  y: number;
  ok: boolean;
};

function hashed(value: string, salt: number): number {
  let total = salt;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 33 + value.charCodeAt(index)) % 1000;
  }
  return total / 1000;
}

export const brazilGeoPoints: BrazilGeoPoint[] = brazilUfs.flatMap((uf) => {
  const metric = brazilUfMetrics[uf.id];
  const count = Math.min(8, Math.max(3, metric.unidades));
  return Array.from({ length: count }, (_, index) => {
    const dx = (hashed(uf.id, index + 3) - 0.5) * 28;
    const dy = (hashed(uf.id, index + 9) - 0.5) * 22;
    const ok = hashed(uf.id, index + 17) < metric.cobertura / 100;
    return {
      id: `${uf.id}-${index}`,
      uf: uf.id,
      x: uf.cx + dx,
      y: uf.cy + dy,
      ok,
    };
  });
});
