import { ArrowIcon } from "@/components/icons/UiIcons";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projetos" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
              Projetos em Destaque
            </h2>
            <p className="mt-3 max-w-xl text-base text-mist">
              Soluções desenvolvidas com foco em dados, processos e pessoas.
            </p>
          </div>
          <a
            href="#outros-projetos"
            className="focus-ring inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-snow hover:text-blue-soft"
          >
            Ver todos os projetos
            <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
