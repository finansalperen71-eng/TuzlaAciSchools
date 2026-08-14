import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { staff } from "@/content/institution";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/kadromuz"),
  path: "/kadromuz",
  noIndex: true,
});

export default function KadromuzPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <PageHero
            {...getRoute("/kadromuz")}
            description="Yönetim ve öğretmen kadromuz hazırlanıyor ve yakında bu sayfada yer alacak."
            breadcrumb={getBreadcrumbTrail("/kadromuz")}
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          {staff.length > 0 ? (
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:grid-cols-4">
              {staff.map((member) => (
                <div key={member.name} className="flex flex-col gap-1 bg-chalk p-6">
                  <span className="font-display text-lg font-semibold text-ink">
                    {member.name}
                  </span>
                  <span className="text-sm text-slate">{member.role}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-chalk" />
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/hakkimizda" variant="ghost">
                  Hakkımızda Sayfasına Git
                </Button>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
