import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getOtherProjects } from "@/data/projects";

export function OtherProjects() {
  const others = getOtherProjects();

  if (others.length === 0) return null;

  return (
    <section id="outros-projetos" className="scroll-mt-24 py-12 sm:py-16">
      <Container>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-snow sm:text-3xl">
          Outros Projetos
        </h2>
        <p className="mt-3 max-w-xl text-base text-mist">
          Demais sistemas desenvolvidos e disponíveis para consulta.
        </p>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {others.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
