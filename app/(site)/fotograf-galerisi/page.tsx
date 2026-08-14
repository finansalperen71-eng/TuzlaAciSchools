import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/fotograf-galerisi"),
  path: "/fotograf-galerisi",
});

export default function FotografGalerisiPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <PageHero
            {...getRoute("/fotograf-galerisi")}
            description="Kampüsümüzden fotoğraflar hazırlanıyor. Galeri kısa süre içinde yayında olacak."
            breadcrumb={getBreadcrumbTrail("/fotograf-galerisi")}
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square bg-chalk" />
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
