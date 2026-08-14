import { AngleMark } from "@/components/ui/AngleMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Fotoğraf Galerisi",
  description: "Tuzla Açı Koleji kampüsünden fotoğraflar.",
  path: "/fotograf-galerisi",
});

export default function FotografGalerisiPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">Medya</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            Fotoğraf Galerisi
          </h1>
          <p className="text-base leading-relaxed text-slate md:text-lg">
            Kampüsümüzden fotoğraflar hazırlanıyor. Galeri kısa süre içinde yayında olacak.
          </p>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex aspect-square items-center justify-center bg-chalk"
              >
                <AngleMark className="h-8 w-8 opacity-30" />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/iletisim" variant="ghost">
              Kampüsü Yerinde Görmek İçin Bize Ulaşın
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
