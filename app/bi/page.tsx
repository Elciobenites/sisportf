import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { Container } from "@/components/ui/Container";
import { getBiModels } from "@/data/bi-models";
import { Sparkline } from "@/components/bi/charts";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Modelos de BI | ${siteConfig.name}`,
  description:
    "Modelos ilustrativos de dashboards de Business Intelligence: gestão de pessoas, operação e painel executivo.",
};

export default function BiGalleryPage() {
  const models = getBiModels();

  return (
    <article className="pb-20 pt-10 sm:pt-14">
      <Container>
        <p className="text-sm text-mist">
          <a href="/#modelos-bi" className="focus-ring rounded-md hover:text-snow">
            Início
          </a>
          <span className="mx-2">/</span>
          <span className="text-ink">Modelos de BI</span>
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
          Modelos de dashboards
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-mist">
          Três painéis interativos no visual do portfólio. Servem como referência de leitura gerencial,
          não como sistemas em produção. Todos usam dados fictícios.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {models.map((model) => (
            <Link
              key={model.slug}
              href={`/bi/${model.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#07101f] transition-colors hover:border-blue/35"
            >
              <div className="border-b border-white/6 bg-[#050d1c] p-4">
                <div className="grid grid-cols-3 gap-2">
                  {model.kpis.slice(0, 3).map((kpi) => (
                    <div key={kpi.id} className="rounded-xl bg-white/4 px-2.5 py-2">
                      <p className="truncate text-[10px] uppercase tracking-[0.12em] text-mist">
                        {kpi.label}
                      </p>
                      <Sparkline values={kpi.series.slice(-6)} color={model.accent} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl font-semibold text-snow">{model.nome}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-mist">{model.resumo}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-snow group-hover:text-blue-soft">
                  Abrir painel
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </article>
  );
}
