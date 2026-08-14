import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ErkenKayitForm } from "@/components/forms/ErkenKayitForm";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/erken-kayit"),
  path: "/erken-kayit",
});

export default function ErkenKayitPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/erken-kayit")}
          eyebrowTone="signal"
          breadcrumb={getBreadcrumbTrail("/erken-kayit")}
        />

        <div className="border border-line p-6 md:p-10">
          <ErkenKayitForm />
        </div>
      </Container>
    </section>
  );
}
