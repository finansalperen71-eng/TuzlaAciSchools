import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { IsBasvuruForm } from "@/components/forms/IsBasvuruForm";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/insan-kaynaklari"),
  path: "/insan-kaynaklari",
});

export default function InsanKaynaklariPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/insan-kaynaklari")}
          description="İş Başvurusu Formu'nu doldurarak başvuruda bulunabilirsiniz."
          breadcrumb={getBreadcrumbTrail("/insan-kaynaklari")}
        />

        <div className="border border-line p-6 md:p-10">
          <IsBasvuruForm />
        </div>
      </Container>
    </section>
  );
}
