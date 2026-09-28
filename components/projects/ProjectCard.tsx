import Link from "next/link";
import { ArrowIcon, ProjectTypeIcon } from "@/components/icons/UiIcons";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative mb-4 overflow-hidden rounded-xl border border-white/8 bg-[#07101f] transition-colors duration-300 group-hover:border-blue/35">
        <div className="relative aspect-[16/10]">
          <SafeImage
            src={project.imagens.capa.src}
            alt={project.imagens.capa.alt}
            fit={project.imagens.capa.fit ?? "cover"}
            className="transition duration-500 group-hover:scale-[1.015] group-hover:brightness-[1.04]"
          />
        </div>
        {project.imagens.capa.placeholder ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#020611]/80 px-2.5 py-1 text-[10px] text-mist">
            Imagem provisória
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="flex items-start gap-2 font-display text-lg font-semibold text-snow">
          <ProjectTypeIcon name={project.icone} className="mt-0.5 h-5 w-5 shrink-0 text-snow/80" />
          <span>{project.nome}</span>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-mist">{project.resumo}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tecnologias.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <Link
          href={`/projetos/${project.slug}`}
          className="focus-ring mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-snow hover:text-blue-soft"
        >
          Ver estudo de caso
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
