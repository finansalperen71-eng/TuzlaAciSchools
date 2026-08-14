import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function NotFoundContent() {
  return (
    <section>
      <Container narrow className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">404</span>
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
          Sayfa bulunamadı
        </h1>
        <p className="max-w-md text-base leading-relaxed text-slate">
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Anasayfaya dönerek devam
          edebilirsiniz.
        </p>
        <Button href="/" variant="primary">
          Anasayfaya Dön
        </Button>
      </Container>
    </section>
  );
}
