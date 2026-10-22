import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { OtherProjects } from "@/components/home/OtherProjects";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Projetos | ${siteConfig.name}`,
  description:
    "Sistemas e soluções de dados, BI, automação e desenvolvimento desenvolvidos com foco em processos e pessoas.",
};

export default function ProjetosPage() {
  return (
    <article className="pb-20">
      <PageIntro
        title="Projetos"
        current="Projetos"
        description="Sistemas e soluções desenvolvidos com foco em dados, processos e pessoas."
      />
      <FeaturedProjects />
      <OtherProjects />
    </article>
  );
}
