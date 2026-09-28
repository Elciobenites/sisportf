import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-soft">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-snow">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-lg text-mist">
        O endereço acessado não existe ou o projeto ainda não foi cadastrado.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">Voltar ao início</ButtonLink>
      </div>
    </Container>
  );
}
