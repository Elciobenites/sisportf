import Link from "next/link";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { BiCard } from "@/components/bi/BiCard";
import { BiShowcase } from "@/components/bi/BiShowcase";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getBiModels } from "@/data/bi-models";

export function BiModels() {
  const models = getBiModels();
  const featured = models.find((model) => model.featured) ?? models[0];
  const others = models.filter((model) => model.slug !== featured.slug);

  return (
    <section id="modelos-bi" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-soft">
              Business Intelligence
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
              Modelos de dashboards
            </h2>
            <p className="mt-3 max-w-2xl text-base text-mist">
              Painéis no formato de sala de decisão, cada um com um gráfico diferente: barras, linha,
              pizza, gauges, mapa de calor e mapa do Brasil. São modelos ilustrativos, com dados
              fictícios, para mostrar como a informação chega à decisão.
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

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-ink">
            {models.length} modelos
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-ink">
            Barras · linha · pizza
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-ink">
            Gauges · calor · mapa
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-ink">
            Dados fictícios
          </span>
        </div>

        <Reveal className="mt-10">
          <BiShowcase />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-6">
          <Reveal className="lg:col-span-4">
            <BiCard model={featured} featured />
          </Reveal>
          {others.slice(0, 2).map((model, index) => (
            <Reveal key={model.slug} className="lg:col-span-2" delay={0.05 * (index + 1)}>
              <BiCard model={model} />
            </Reveal>
          ))}
          {others.slice(2).map((model, index) => (
            <Reveal key={model.slug} className="lg:col-span-2" delay={0.08 + index * 0.04}>
              <BiCard model={model} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
