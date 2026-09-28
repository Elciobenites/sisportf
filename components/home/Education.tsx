import { Container } from "@/components/ui/Container";
import { education } from "@/data/site";

export function Education() {
  return (
    <section aria-labelledby="formacao-titulo" className="pb-8">
      <Container>
        <div className="rounded-2xl border border-white/8 px-6 py-5 sm:px-8">
          <h2
            id="formacao-titulo"
            className="font-display text-base font-semibold text-snow"
          >
            Formação
          </h2>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {education.map((item) => (
              <li key={item.title} className="text-sm leading-6 text-mist">
                <span className="font-medium text-ink">{item.title}</span>
                {item.institution ? ` — ${item.institution}` : null}
                {item.status === "em-andamento" ? (
                  <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-[11px] text-cyan-soft">
                    em andamento
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
