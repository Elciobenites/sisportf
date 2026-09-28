import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArchitectureFlow } from "@/components/projects/ArchitectureFlow";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { siteConfig } from "@/data/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado" };
  }

  return {
    title: `${project.nome} | ${siteConfig.name}`,
    description: project.resumo,
    openGraph: {
      title: `${project.nome} | ${siteConfig.name}`,
      description: project.resumo,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="pb-20 pt-10 sm:pt-14">
      <Container>
        <p className="text-sm text-mist">
          <a href="/#projetos" className="focus-ring rounded-md hover:text-snow">
            Projetos
          </a>
          <span className="mx-2">/</span>
          <span className="text-ink">{project.nome}</span>
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
          {project.nome}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-mist">{project.resumo}</p>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/8 bg-[#07101f]">
          <div className="relative aspect-[16/9]">
            <SafeImage
              src={project.imagens.capa.src}
              alt={project.imagens.capa.alt}
              fit={project.imagens.capa.fit ?? "contain"}
              priority
            />
          </div>
          {project.imagens.capa.placeholder ? (
            <p className="absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs text-mist">
              Imagem provisória — substitua em /public/projects/{project.slug}/
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-12">
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                O desafio
              </h2>
              <p className="mt-4 leading-7 text-mist">{project.desafio}</p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                A solução
              </h2>
              <p className="mt-4 leading-7 text-mist">{project.solucao}</p>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                Minha participação
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.participacao.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                Arquitetura
              </h2>
              <div className="mt-4">
                <ArchitectureFlow steps={project.arquitetura} />
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                Resultados
              </h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {project.resultados.qualitativos.length > 0 ? (
                  <div className="card-surface rounded-2xl p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-soft">
                      Qualitativos
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-mist">
                      {project.resultados.qualitativos.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {project.resultados.quantitativos.length > 0 ? (
                  <div className="card-surface rounded-2xl p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-soft">
                      Quantitativos
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-mist">
                      {project.resultados.quantitativos.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-semibold text-snow">
                Galeria
              </h2>
              {project.imagens.galeria.some((image) => image.placeholder) ? (
                <p className="mt-3 text-sm text-mist">
                  Screenshots reais devem ser colocados em{" "}
                  <code className="text-ink">/public/projects/{project.slug}/</code>.
                </p>
              ) : null}
              <div className="mt-5">
                <ProjectGallery images={project.imagens.galeria} />
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="card-surface rounded-2xl p-5">
              <h2 className="font-display text-lg font-semibold text-snow">
                Tecnologias
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tecnologias.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
              <div className="mt-6">
                <ButtonLink href="/#contato" className="w-full">
                  Vamos Conversar
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}
