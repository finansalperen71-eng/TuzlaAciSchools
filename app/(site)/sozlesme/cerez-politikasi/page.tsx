import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const doc = getLegalDoc("cerez-politikasi");

export const metadata = buildMetadata({
  ...getRoute("/sozlesme/cerez-politikasi"),
  path: "/sozlesme/cerez-politikasi",
});

export default function CerezPolitikasiPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/sozlesme/cerez-politikasi")}
          breadcrumb={getBreadcrumbTrail("/sozlesme/cerez-politikasi")}
        />
        <LegalDocument sections={doc.sections} />
      </Container>
    </section>
  );
}
