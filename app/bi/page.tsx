import type { Metadata } from "next";
import { BiGallery } from "@/components/bi/BiGallery";
import { Container } from "@/components/ui/Container";
import { getBiModels } from "@/data/bi-models";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Modelos de BI | ${siteConfig.name}`,
  description:
    "Modelos ilustrativos de dashboards de Business Intelligence: pessoas, operação, qualidade de dados, território e painel executivo.",
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
          Sala de decisão
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-mist">
          {models.length} painéis interativos no visual do portfólio. Cada um usa um gráfico diferente —
          barras, linha, pizza, gauges, mapa de calor ou mapa do Brasil — para não repetir o mesmo
          desenho. Não são sistemas em produção. Todos usam dados fictícios.
        </p>
        <div className="mt-10">
          <BiGallery />
        </div>
      </Container>
    </article>
  );
}
