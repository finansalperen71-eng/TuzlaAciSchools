import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const doc = getLegalDoc("gizlilik-sozlesmesi");

export const metadata = buildMetadata({
  ...getRoute("/sozlesme/gizlilik-sozlesmesi"),
  path: "/sozlesme/gizlilik-sozlesmesi",
  noIndex: true,
});

export default function GizlilikPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/sozlesme/gizlilik-sozlesmesi")}
          breadcrumb={getBreadcrumbTrail("/sozlesme/gizlilik-sozlesmesi")}
        />
        <LegalDocument sections={doc.sections} />
      </Container>
    </section>
  );
}
