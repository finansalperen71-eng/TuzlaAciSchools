import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AngleMark } from "@/components/ui/AngleMark";
import { type LevelContent } from "@/content/levels";

const sectionOrder = [
  "philosophy",
  "academics",
  "dailyFlow",
  "language",
  "clubs",
  "guidance",
] as const;

export function LevelPage({ level }: { level: LevelContent }) {
  const sections = sectionOrder
    .map((key) => level[key])
    .filter((section): section is NonNullable<LevelContent["philosophy"]> => section !== null);

  return (
    <>
      <section className="border-b border-line">
        <Container className="flex flex-col gap-6 py-16 md:py-20">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              {level.ageRange}
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            {level.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate md:text-lg">
            {level.summary}
          </p>
        </Container>
      </section>

      <section>
        <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-2">
          {sections.map((section) => (
            <div key={section.heading} className="flex flex-col gap-4">
              <SectionHeading title={section.heading} />
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-sm leading-relaxed text-slate md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-ink text-chalk">
        <Container className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="max-w-xl font-display text-2xl font-semibold md:text-3xl">
            {level.title} kademesi için kayıt sürecini başlatmak ister misiniz?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/erken-kayit" variant="primary">
              Erken Kayıt Başvurusu
            </Button>
            <Button href="/iletisim" variant="secondary">
              Bize Ulaşın
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
