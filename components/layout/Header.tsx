"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowIcon } from "@/components/icons/UiIcons";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#020611]/75 backdrop-blur-xl">
      <Container className="grid h-[76px] grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/#inicio"
          className="focus-ring flex items-center gap-3 rounded-lg"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-3xl font-semibold tracking-tight text-snow">
            {siteConfig.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-snow">
              {siteConfig.name}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-mist">
              {siteConfig.brandLine}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {siteConfig.navigation.map((item) => {
            const active = isHome && item.href === "/#inicio";
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring relative rounded-md text-sm text-mist transition-colors hover:text-snow",
                  active && "text-snow",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-snow/80" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <ButtonLink href="/#contato" className="hidden sm:inline-flex">
            Vamos Conversar
            <ArrowIcon className="h-4 w-4" />
          </ButtonLink>
          <p className="hidden max-w-[88px] text-right text-[10px] uppercase leading-3 tracking-[0.16em] text-mist xl:block">
            {siteConfig.values.join(" ")}
          </p>
          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-snow lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-5 bg-current transition-transform",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-white/5 bg-[#020611] lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-xl px-3 py-3 text-base text-ink hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <ButtonLink href="/#contato" className="mt-2 w-full">
            Vamos Conversar
            <ArrowIcon className="h-4 w-4" />
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
