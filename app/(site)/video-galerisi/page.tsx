import { AngleMark } from "@/components/ui/AngleMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Video Galerisi",
  description: "Tuzla Açı Koleji kampüsünden videolar.",
  path: "/video-galerisi",
});

export default function VideoGalerisiPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
        <div className="flex items-center gap-2">
          <AngleMark className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">Medya</span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
          Video Galerisi
        </h1>
        <p className="text-base leading-relaxed text-slate md:text-lg">
          Kampüsümüzü ve okul hayatımızı tanıtan videolar hazırlanıyor. Video galerisi kısa süre
          içinde yayında olacak.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <Button href="/iletisim" variant="ghost">
            Bize Ulaşın
          </Button>
        </div>
      </Container>
    </section>
  );
}
