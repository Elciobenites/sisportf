import Link from "next/link";
import { Container } from "@/components/ui/Container";

type PageIntroProps = {
  title: string;
  current: string;
  description?: string;
};

export function PageIntro({ title, current, description }: PageIntroProps) {
  return (
    <Container className="pt-10 sm:pt-14">
      <p className="text-sm text-mist">
        <Link href="/" className="focus-ring rounded-md hover:text-snow">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{current}</span>
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-mist">{description}</p>
      ) : null}
    </Container>
  );
}
