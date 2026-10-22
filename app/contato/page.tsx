import type { Metadata } from "next";
import { Contact } from "@/components/home/Contact";
import { PageIntro } from "@/components/ui/PageIntro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Contato | ${siteConfig.name}`,
  description: "Entre em contato para conversar sobre oportunidades e projetos.",
};

export default function ContatoPage() {
  return (
    <article className="pb-20">
      <PageIntro
        title="Contato"
        current="Contato"
        description="Aberto a novas oportunidades e projetos desafiadores."
      />
      <Contact />
    </article>
  );
}
