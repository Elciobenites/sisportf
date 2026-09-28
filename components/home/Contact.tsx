import { ArrowIcon } from "@/components/icons/UiIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function Contact() {
  const { linkedin, github, email, cvHref } = siteConfig.contact;

  return (
    <section id="contato" className="scroll-mt-24 py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-white/8 px-6 py-10 sm:px-10 lg:px-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,109,255,0.16),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(62,198,255,0.08),transparent_24%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
                Vamos construir algo juntos?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-mist">
                Estou aberto a novas oportunidades e projetos desafiadores. Entre em
                contato para conversarmos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink
                  href={email ? `mailto:${email}` : linkedin || github || "/#projetos"}
                  external={Boolean(email || linkedin || github)}
                >
                  Falar comigo
                  <ArrowIcon className="h-4 w-4" />
                </ButtonLink>
                {linkedin ? (
                  <ButtonLink href={linkedin} external variant="secondary">
                    LinkedIn
                  </ButtonLink>
                ) : null}
                {github ? (
                  <ButtonLink href={github} external variant="secondary">
                    GitHub
                  </ButtonLink>
                ) : null}
                {email ? (
                  <ButtonLink href={`mailto:${email}`} variant="secondary">
                    E-mail
                  </ButtonLink>
                ) : null}
                <ButtonLink href={cvHref} variant="secondary">
                  Baixar currículo
                </ButtonLink>
              </div>
              {!linkedin && !github && !email ? (
                <p className="mt-5 text-sm text-mist">
                  LinkedIn, GitHub e e-mail entram aqui assim que os links forem
                  definidos.
                </p>
              ) : null}
            </div>
            <blockquote className="border-l border-white/15 pl-6 lg:justify-self-end">
              <p className="font-display text-xl leading-8 text-snow sm:text-2xl">
                “{siteConfig.quote}”
              </p>
              <footer className="mt-4 text-sm text-mist">{siteConfig.name}</footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
