import Link from "next/link";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { CardPreview, previewLabel } from "@/components/bi/CardPreview";
import { MiniBrazilMap } from "@/components/bi/BrazilMap";
import { Sparkline } from "@/components/bi/charts";
import { formatBiValue, type BiModel } from "@/data/bi-models";
import { cn } from "@/lib/utils";

type BiCardProps = {
  model: BiModel;
  featured?: boolean;
};

export function BiCard({ model, featured = false }: BiCardProps) {
  return (
    <Link
      href={`/bi/${model.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#07101f] transition-colors hover:border-white/20",
        featured && "lg:min-h-[420px]",
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-70"
        style={{
          background: `radial-gradient(circle at 12% 0%, ${model.accent}22, transparent 58%)`,
        }}
      />
      <div className={cn("relative border-b border-white/6 bg-[#050d1c]", featured ? "p-5" : "p-4")}>
        {featured ? <FeaturedPreview model={model} /> : <CardPreview model={model} />}
      </div>
      <div className={cn("relative flex flex-1 flex-col", featured ? "p-6" : "p-5")}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: model.accent, background: `${model.accent}1f` }}
          >
            {model.category}
          </span>
          <span className="text-[11px] text-mist">{model.audience}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
            {previewLabel[model.preview]}
          </span>
        </div>
        <h3 className={cn("mt-3 font-display font-semibold text-snow", featured ? "text-3xl" : "text-xl")}>
          {model.nome}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-mist">{model.resumo}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-snow group-hover:text-blue-soft">
          {featured ? "Explorar painel interativo" : "Abrir painel"}
          <ArrowIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function FeaturedPreview({ model }: { model: BiModel }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
          Sala de decisão
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-mist">
          <span className="bi-pulse h-1.5 w-1.5 rounded-full bg-cyan" />
          Interativo
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {model.kpis.map((kpi) => {
          const value = kpi.series[kpi.series.length - 1];
          return (
            <div key={kpi.id} className="rounded-xl bg-white/4 px-3 py-2">
              <p className="truncate text-[10px] uppercase tracking-[0.12em] text-mist">{kpi.label}</p>
              <p className="mt-1 font-display text-lg font-semibold text-snow">
                {formatBiValue(value, kpi.format)}
              </p>
              <Sparkline values={kpi.series.slice(-6)} color={model.accent} />
            </div>
          );
        })}
      </div>
      {model.preview === "map" ? (
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-mist">Mapa do Brasil · georreferência</p>
          <MiniBrazilMap accent={model.accent} tall />
        </div>
      ) : (
        <CardPreview model={model} compact={false} />
      )}
    </div>
  );
}
