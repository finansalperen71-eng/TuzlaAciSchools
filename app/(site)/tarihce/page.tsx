import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { timeline } from "@/content/institution";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/tarihce"),
  path: "/tarihce",
});

export default function TarihcePage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <PageHero
          {...getRoute("/tarihce")}
          description="Kurumumuzun tarihçesi hazırlanıyor ve yakında bu sayfada yer alacak."
          breadcrumb={getBreadcrumbTrail("/tarihce")}
        />

        {timeline.length > 0 ? (
          <ol className="flex flex-col gap-6 border-l-2 border-signal pl-6">
            {timeline.map((entry) => (
              <li key={entry.year} className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {entry.year}
                </span>
                <p className="text-base leading-relaxed text-slate">{entry.description}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div>
            <Button href="/hakkimizda" variant="ghost">
              Hakkımızda Sayfasına Git
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
