import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { admissionSteps } from "@/content/admissions";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/kayit-sureci"),
  path: "/kayit-sureci",
});

export default function KayitSureciPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <PageHero
            {...getRoute("/kayit-sureci")}
            description="Kayıt şartları ve süreciyle ilgili detaylı bilgi hazırlanıyor. Kayıt başvurunuzu şimdiden başlatmak için erken kayıt formunu doldurabilirsiniz."
            breadcrumb={getBreadcrumbTrail("/kayit-sureci")}
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-4">
            {admissionSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col gap-3 bg-chalk p-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal-deep">
                  Adım {index + 1}
                </span>
                <h2 className="font-display text-xl font-semibold text-ink">{step.title}</h2>
                <p className="text-sm leading-relaxed text-slate">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/erken-kayit" variant="primary">
              Erken Kayıt Başvurusu
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
