import Link from "next/link";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getBiModels } from "@/data/bi-models";
import { Sparkline } from "@/components/bi/charts";

export function BiModels() {
  const models = getBiModels();

  return (
    <section id="modelos-bi" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-soft">
              Business Intelligence
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
              Modelos de dashboards
            </h2>
            <p className="mt-3 max-w-2xl text-base text-mist">
              Painéis interativos para mostrar como a informação pode chegar à decisão.
              São modelos ilustrativos, com dados fictícios, no mesmo padrão visual do portfólio.
            </p>
          </div>
          <Link
            href="/bi"
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-snow hover:text-blue-soft"
          >
            Abrir galeria de BI
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {models.map((model, index) => (
            <Reveal key={model.slug} delay={index * 0.05}>
              <Link
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
                    Modelo de BI
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-snow">{model.nome}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-mist">{model.resumo}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-snow group-hover:text-blue-soft">
                    Abrir painel
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
