import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { achievementStats } from "@/content/achievements";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/basarilarimiz"),
  path: "/basarilarimiz",
});

export default function BasarilarimizPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <PageHero
            {...getRoute("/basarilarimiz")}
            description="Tuzla Açı Koleji, anaokulu, ilkokul ve ortaokul kademelerinde eğitim vermektedir. Aşağıdaki YKS dereceleri, Açı Eğitim Kurumları bünyesindeki liselerimize aittir ve kurumumuzun eğitim anlayışının bir parçası olarak paylaşılmaktadır."
            breadcrumb={getBreadcrumbTrail("/basarilarimiz")}
          />
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line md:grid-cols-5">
            {achievementStats.map((stat, index) => (
              <div
                key={`${stat.value}-${index}`}
                className="flex flex-col items-center gap-2 bg-chalk px-4 py-10 text-center"
              >
                <span className="font-display text-5xl font-semibold text-signal">
                  {stat.value}
                </span>
                <span className="text-sm text-slate">{stat.label}</span>
                <span className="font-mono text-xs text-slate/70">{stat.year}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/erken-kayit" variant="primary">
              Erken Kayıt Başvurusu
            </Button>
            <a
              href="https://aciegitimkurumlari.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink/20 px-6 py-3 font-mono text-sm uppercase tracking-wide text-ink transition-colors hover:border-ink"
            >
              Açı Eğitim Kurumları
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
