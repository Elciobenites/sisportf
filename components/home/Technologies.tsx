import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologyCategories } from "@/data/technologies";

export function Technologies() {
  return (
    <section id="tecnologias" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Competências"
          title="Tecnologias e competências"
          description="O trabalho combina dados, negócio, arquitetura, SQL, programação, integração, análise, automação e desenvolvimento de sistemas."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {technologyCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.04}>
              <article className="card-surface h-full rounded-2xl p-5">
                <h3 className="font-display text-base font-semibold text-snow">
                  {category.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                {category.note ? (
                  <p className="mt-3 text-xs leading-6 text-mist">{category.note}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
