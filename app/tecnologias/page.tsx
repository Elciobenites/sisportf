import type { Metadata } from "next";
import { Technologies } from "@/components/home/Technologies";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Tecnologias | ${siteConfig.name}`,
  description:
    "Tecnologias e competências em dados, SQL, BI, engenharia de dados, automação e desenvolvimento de sistemas.",
};

export default function TecnologiasPage() {
  return (
    <article className="pb-20">
      <PageIntro
        title="Tecnologias e competências"
        current="Tecnologias"
        description="O trabalho combina dados, negócio, arquitetura, SQL, programação, integração, análise, automação e desenvolvimento de sistemas."
      />
      <Technologies hideHeading />
    </article>
  );
}
