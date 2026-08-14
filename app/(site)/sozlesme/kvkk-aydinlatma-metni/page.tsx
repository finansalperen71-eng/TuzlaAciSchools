import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { getLegalDoc } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

const doc = getLegalDoc("kvkk-aydinlatma-metni");

export const metadata = buildMetadata({
  ...getRoute("/sozlesme/kvkk-aydinlatma-metni"),
  path: "/sozlesme/kvkk-aydinlatma-metni",
});

export default function KvkkPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/sozlesme/kvkk-aydinlatma-metni")}
          breadcrumb={getBreadcrumbTrail("/sozlesme/kvkk-aydinlatma-metni")}
        />
        <LegalDocument sections={doc.sections} />
      </Container>
    </section>
  );
}
