import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/UiIcons";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function Footer() {
  const { linkedin, github, email } = siteConfig.contact;

  return (
    <footer className="border-t border-white/8">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto_1fr] lg:items-center">
          <div className="flex items-center gap-3">
            <span className="font-display text-3xl font-semibold text-snow">
              {siteConfig.initials}
            </span>
            <span>
              <span className="block text-sm font-semibold text-snow">
                {siteConfig.name}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">
                {siteConfig.brandLine}
              </span>
            </span>
          </div>

          <nav className="flex flex-wrap gap-5 text-sm text-mist" aria-label="Rodapé">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href} className="focus-ring rounded-md hover:text-snow">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {linkedin ? (
              <a
                href={linkedin}
                className="focus-ring rounded-full border border-white/10 p-2 text-snow hover:bg-white/5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            ) : null}
            {github ? (
              <a
                href={github}
                className="focus-ring rounded-full border border-white/10 p-2 text-snow hover:bg-white/5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            ) : (
              <span className="rounded-full border border-white/10 p-2 text-mist" aria-hidden="true">
                <GitHubIcon />
              </span>
            )}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="focus-ring rounded-full border border-white/10 p-2 text-snow hover:bg-white/5"
                aria-label="E-mail"
              >
                <MailIcon />
              </a>
            ) : (
              <span className="rounded-full border border-white/10 p-2 text-mist" aria-hidden="true">
                <MailIcon />
              </span>
            )}
            {!linkedin ? (
              <span className="rounded-full border border-white/10 p-2 text-mist" aria-hidden="true">
                <LinkedInIcon />
              </span>
            ) : null}
          </div>

          <p className="text-sm leading-6 text-mist lg:text-right">
            {siteConfig.footerPhrase}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
          <p>Conhecimento • Tecnologia • Pessoas • Resultados</p>
        </div>
      </Container>
    </footer>
  );
}
