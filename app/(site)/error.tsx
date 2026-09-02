"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <Container narrow className="flex min-h-[50vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal-deep">Hata</span>
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
          Bir şeyler ters gitti
        </h1>
        <p className="max-w-md text-base leading-relaxed text-slate">
          Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar deneyebilir veya anasayfaya
          dönebilirsiniz.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => reset()} variant="primary">
            Tekrar Dene
          </Button>
          <Button href="/" variant="ghost">
            Anasayfaya Dön
          </Button>
        </div>
      </Container>
    </section>
  );
}
