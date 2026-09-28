import { StackIcon } from "@/components/icons/TechIcons";
import { Container } from "@/components/ui/Container";
import { mainStack, siteConfig } from "@/data/site";

export function StackBar() {
  return (
    <section aria-label="Tecnologias principais" className="py-8 sm:py-10">
      <Container>
        <div className="flex flex-col items-stretch gap-6 border-y border-white/8 py-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="grid flex-1 grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-7">
            {mainStack.map((item) => (
              <li key={item.id} className="flex flex-col items-center gap-2 text-center">
                <span className="grid h-11 w-11 place-items-center text-snow/85">
                  <StackIcon id={item.id} className="h-7 w-7" />
                </span>
                <span className="text-xs font-medium text-mist sm:text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
          <p className="shrink-0 text-center font-display text-lg font-semibold leading-tight text-snow sm:text-xl lg:text-right lg:whitespace-nowrap">
            {siteConfig.stackPhrase}
          </p>
        </div>
      </Container>
    </section>
  );
}
