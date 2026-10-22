import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DashboardView } from "@/components/bi/DashboardView";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getBiModel, getBiSlugs } from "@/data/bi-models";
import { siteConfig } from "@/data/site";

type BiPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBiSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BiPageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getBiModel(slug);

  if (!model) {
    return { title: "Modelo não encontrado" };
  }

  return {
    title: `${model.nome} | Modelos de BI | ${siteConfig.name}`,
    description: model.resumo,
  };
}

export default async function BiDashboardPage({ params }: BiPageProps) {
  const { slug } = await params;
  const model = getBiModel(slug);

  if (!model) {
    notFound();
  }

  return (
    <article className="pb-20 pt-10 sm:pt-14">
      <Container>
        <p className="text-sm text-mist">
          <Link href="/bi" className="focus-ring rounded-md hover:text-snow">
            Modelos de BI
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{model.nome}</span>
        </p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: model.accent, background: `${model.accent}1f` }}
              >
                {model.category}
              </span>
              <span className="text-sm text-mist">{model.audience}</span>
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
              {model.nome}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-mist">{model.contexto}</p>
          </div>
          <ButtonLink href="/bi" variant="secondary" className="self-start lg:self-auto">
            Ver todos os modelos
          </ButtonLink>
        </div>
        <div className="mt-10">
          <DashboardView model={model} />
        </div>
      </Container>
    </article>
  );
}
