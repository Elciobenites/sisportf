"use client";

import { useEffect, useRef, useState } from "react";
import {
  BoltIcon,
  DatabaseIcon,
  GearIcon,
  UsersIcon,
} from "@/components/icons/UiIcons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { impactItems } from "@/data/site";

const icons = {
  registros: UsersIcon,
  solucoes: GearIcon,
  integracao: DatabaseIcon,
  eficiencia: BoltIcon,
} as const;

export function Impact() {
  return (
    <section aria-labelledby="impacto-titulo" className="py-8 sm:py-10">
      <Container>
        <h2
          id="impacto-titulo"
          className="font-display text-2xl font-semibold tracking-tight text-snow sm:text-3xl"
        >
          Dados que geram resultados
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {impactItems.map((item, index) => {
            const Icon = icons[item.id as keyof typeof icons];
            return (
              <Reveal key={item.id} delay={index * 0.05}>
                <article className="rounded-2xl border border-white/8 px-5 py-5">
                  {Icon ? <Icon className="mb-3 h-6 w-6 text-snow/80" /> : null}
                  <p className="font-display text-xl font-semibold text-snow sm:text-2xl">
                    {"animated" in item && item.animated ? <AnimatedValue /> : item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-mist">{item.label}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function AnimatedValue() {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1100;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(7000 * progress));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref}>
      {value >= 7000 ? "7 mil+" : `${value.toLocaleString("pt-BR")}+`}
    </span>
  );
}
