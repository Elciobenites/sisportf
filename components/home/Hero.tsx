import Image from "next/image";
import { ArrowIcon, ChatIcon } from "@/components/icons/UiIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";

export function Hero() {
  const [before] = siteConfig.headline.split(siteConfig.headlineAccent);

  return (
    <section id="inicio" className="relative overflow-hidden scroll-mt-24 pb-6 pt-10 sm:pt-14 lg:pt-16">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
        <div className="max-w-xl">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
            {siteConfig.role}
          </p>
          <h1 className="font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-snow sm:text-5xl lg:text-[3.55rem]">
            {before}
            <span className="text-[#3d7bff]">{siteConfig.headlineAccent}.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-mist sm:text-lg">
            {siteConfig.heroText}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#projetos">
              Conheça meus projetos
              <ArrowIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/#contato" variant="secondary">
              <ChatIcon className="h-4 w-4" />
              Entre em contato
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[720px]">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-[#2f6dff]/20 blur-3xl" />
          <Image
            src="/images/hero-dashboard.png"
            alt="Composição visual de dashboards, gráficos, mapa e fluxos de dados em um notebook"
            width={980}
            height={620}
            priority
            className="relative h-auto w-full"
          />
        </div>
      </Container>
    </section>
  );
}
