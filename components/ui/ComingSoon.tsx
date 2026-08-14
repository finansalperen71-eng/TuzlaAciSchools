import { type ReactNode } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: { href: string; label: string };
  children?: ReactNode;
};

export function ComingSoon({ eyebrow, title, description, action, children }: ComingSoonProps) {
  return (
    <section>
      <Container narrow className="flex flex-col gap-6 py-20 md:py-28">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">{eyebrow}</span>
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">{title}</h1>
        <p className="text-base leading-relaxed text-slate md:text-lg">{description}</p>
        {children}
        <div>
          <Button href={action?.href ?? "/iletisim"} variant="ghost">
            {action?.label ?? "Bize Ulaşın"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
