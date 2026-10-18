"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { formatBiValue, type BiFormat } from "@/data/bi-models";
import { IsoBars } from "@/components/bi/IsoBars";
import { cn } from "@/lib/utils";

export type Chart3DSeries = {
  id: string;
  label: string;
  color: string;
  values: number[];
};

export type Chart3DProps = {
  categories: string[];
  series: Chart3DSeries[];
  format: BiFormat;
  activeSeriesId?: string;
  onSelectSeries?: (id: string) => void;
  className?: string;
};

type HoverInfo = {
  seriesId: string;
  seriesLabel: string;
  category: string;
  value: number;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class SceneGuard extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Columns({
  categories,
  series,
  max,
  activeSeriesId,
  onHover,
  onSelectSeries,
}: {
  categories: string[];
  series: Chart3DSeries[];
  max: number;
  activeSeriesId?: string;
  onHover: (info: HoverInfo | null) => void;
  onSelectSeries?: (id: string) => void;
}) {
  const gapX = categories.length > 8 ? 0.78 : 0.95;
  const gapZ = series.length > 1 ? 1.08 : 0.9;
  const startX = -((categories.length - 1) * gapX) / 2;
  const startZ = -((series.length - 1) * gapZ) / 2;
  const colW = categories.length > 8 ? 0.46 : 0.58;

  return (
    <group>
      {series.map((row, zi) =>
        row.values.map((value, xi) => {
          const height = Math.max((value / max) * 4.4, 0.08);
          const dimmed = Boolean(activeSeriesId && activeSeriesId !== row.id);
          return (
            <mesh
              key={`${row.id}-${xi}`}
              position={[startX + xi * gapX, height / 2, startZ + zi * gapZ]}
              onPointerOver={(event) => {
                event.stopPropagation();
                onHover({
                  seriesId: row.id,
                  seriesLabel: row.label,
                  category: categories[xi] ?? "",
                  value,
                });
              }}
              onPointerOut={() => onHover(null)}
              onClick={(event) => {
                event.stopPropagation();
                onSelectSeries?.(row.id);
              }}
            >
              <boxGeometry args={[colW, height, colW]} />
              <meshStandardMaterial
                color={row.color}
                metalness={0.2}
                roughness={0.38}
                emissive={row.color}
                emissiveIntensity={dimmed ? 0.02 : activeSeriesId === row.id ? 0.3 : 0.08}
                transparent
                opacity={dimmed ? 0.28 : 1}
              />
            </mesh>
          );
        }),
      )}
    </group>
  );
}

function CssFallback({
  series,
  categories,
}: {
  series: Chart3DSeries[];
  categories: string[];
}) {
  const last = series.map((row) => row.values[row.values.length - 1] ?? 0);
  return (
    <div className="flex h-[320px] flex-col justify-end rounded-xl bg-[#06101c] px-4 pb-4 pt-6">
      <IsoBars values={last} colors={series.map((row) => row.color)} labels={series.map((row) => row.label)} />
      <p className="mt-3 text-center text-[11px] text-mist">
        Visão 3D em modo compatível · último mês {categories[categories.length - 1] ?? ""}
      </p>
    </div>
  );
}

export function Chart3D({
  categories,
  series,
  format,
  activeSeriesId,
  onSelectSeries,
  className,
}: Chart3DProps) {
  const [engine, setEngine] = useState<"pending" | "webgl" | "css">("pending");
  const [reduce, setReduce] = useState(false);
  const [hover, setHover] = useState<HoverInfo | null>(null);

  useEffect(() => {
    setEngine(supportsWebGL() ? "webgl" : "css");
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(media.matches);
    const onChange = () => setReduce(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const max = useMemo(() => Math.max(...series.flatMap((row) => row.values), 1), [series]);
  const fallback = <CssFallback series={series} categories={categories} />;
  const camera: [number, number, number] = series.length <= 1 ? [5.6, 4.4, 6.8] : [7.6, 5.8, 8.4];

  if (engine === "pending") {
    return <div className={cn("h-[340px] animate-pulse rounded-xl bg-white/4", className)} />;
  }

  if (engine === "css") {
    return fallback;
  }

  return (
    <div className={cn("relative", className)}>
      <SceneGuard fallback={fallback}>
        <div className="h-[340px] overflow-hidden rounded-xl bg-[#06101c] [touch-action:none]">
          <Canvas
            camera={{ position: camera, fov: 36 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            onCreated={({ gl }) => {
              gl.setClearColor("#06101c");
            }}
          >
            <ambientLight intensity={0.42} />
            <directionalLight position={[8, 12, 6]} intensity={1.25} />
            <directionalLight position={[-6, 4, -4]} intensity={0.38} color="#5b8cff" />
            <Suspense fallback={null}>
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[18, 12]} />
                <meshStandardMaterial color="#081525" />
              </mesh>
              <gridHelper args={[14, 14, "#1a3a5c", "#102033"]} position={[0, 0.01, 0]} />
              <Columns
                categories={categories}
                series={series}
                max={max}
                activeSeriesId={activeSeriesId}
                onHover={setHover}
                onSelectSeries={onSelectSeries}
              />
              <ContactShadows opacity={0.38} scale={16} blur={2.4} far={10} />
              <OrbitControls
                enablePan={false}
                minPolarAngle={0.5}
                maxPolarAngle={1.22}
                minDistance={6.5}
                maxDistance={16}
                autoRotate={!reduce}
                autoRotateSpeed={0.55}
                enableDamping
              />
            </Suspense>
          </Canvas>
        </div>
      </SceneGuard>
      {hover ? (
        <div className="pointer-events-none absolute right-4 top-4 rounded-xl border border-white/12 bg-[#07101f]/92 px-3 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-[0.14em] text-mist">{hover.category}</p>
          <p className="mt-1 text-sm font-semibold text-snow">{hover.seriesLabel}</p>
          <p className="mt-0.5 font-display text-lg text-snow">{formatBiValue(hover.value, format)}</p>
        </div>
      ) : (
        <p className="pointer-events-none absolute left-4 top-4 max-w-[220px] text-[11px] leading-4 text-mist">
          {onSelectSeries ? "Arraste para girar · clique na coluna para filtrar" : "Arraste para girar a série"}
        </p>
      )}
      {series.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {series.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => onSelectSeries?.(row.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                activeSeriesId === row.id
                  ? "border-white bg-white text-navy-950"
                  : "border-white/10 bg-white/5 text-mist hover:text-snow",
              )}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: row.color }} />
              {row.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
