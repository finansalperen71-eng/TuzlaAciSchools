import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/video-galerisi"),
  path: "/video-galerisi",
});

export default function VideoGalerisiPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
        <PageHero
          {...getRoute("/video-galerisi")}
          description="Kampüsümüzü ve okul hayatımızı tanıtan videolar hazırlanıyor. Video galerisi kısa süre içinde yayında olacak."
          breadcrumb={getBreadcrumbTrail("/video-galerisi")}
        />
        <div className="mt-4 flex flex-wrap gap-4">
          <Button href="/iletisim" variant="ghost">
            Bize Ulaşın
          </Button>
        </div>
      </Container>
    </section>
  );
}
