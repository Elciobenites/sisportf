import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/site";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <SectionHeading title={about.title} />
        <div className="mt-6 max-w-4xl space-y-5 text-base leading-7 text-mist">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <Reveal>
          <div className="card-surface mt-10 rounded-3xl p-6 sm:p-7">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-soft">
              Minha trajetória
            </p>
            <ol className="flex flex-col gap-0 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-3 lg:gap-y-4">
              {about.evolution.map((step, index) => (
                <li key={step} className="relative flex items-start gap-4 pb-5 last:pb-0 lg:items-center lg:pb-0">
                  {index < about.evolution.length - 1 ? (
                    <span
                      className="absolute left-[11px] top-6 h-[calc(100%-8px)] w-px bg-line lg:hidden"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-blue/40 bg-navy-800 text-[11px] font-semibold text-blue-soft lg:mt-0">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm font-medium text-snow lg:pt-0 lg:whitespace-nowrap">
                    {step}
                  </span>
                  {index < about.evolution.length - 1 ? (
                    <span className="hidden text-mist lg:inline" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
