import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Education } from "@/components/home/Education";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Sobre | ${siteConfig.name}`,
  description:
    "Trajetória profissional de Elcio Benites: dados, BI, engenharia de dados, automação e desenvolvimento de sistemas.",
};

export default function SobrePage() {
  return (
    <article className="pb-20">
      <PageIntro
        title="Sobre mim"
        current="Sobre"
        description="Conhecimento de negócio, sistemas, dados e tecnologia aplicados a problemas reais."
      />
      <About hideHeading />
      <Education />
    </article>
  );
}
