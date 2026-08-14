import Link from "next/link";
import { AngleMark } from "@/components/ui/AngleMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementStats } from "@/content/achievements";
import { levels } from "@/content/levels";
import { site } from "@/content/site";
import { getLatestPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    title: site.name,
    description: site.description,
    path: "/",
  }),
  title: { absolute: site.name },
};

export default function HomePage() {
  const posts = getLatestPosts(3);

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <AngleMark className="h-5 w-5" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">
                {site.slogan}
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold text-ink md:text-6xl">
              Tuzla Açı Koleji
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate md:text-lg">
              Tuzla Açı Koleji, öğrencilerini akademik başarıya ulaştırırken aynı zamanda onları
              hayata hazırlamayı amaçlayan, çağdaş eğitim anlayışını benimsemiş güçlü bir eğitim
              kurumudur. Öğrencilerimizin bireysel yeteneklerini keşfetmelerine, özgüven
              kazanmalarına ve hedeflerine emin adımlarla ilerlemelerine rehberlik ediyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/erken-kayit" variant="primary">
                Erken Kayıt Başvurusu
              </Button>
              <Button href="/hakkimizda" variant="ghost">
                Bizi Tanıyın
              </Button>
            </div>
          </div>

          <div className="border border-ink bg-ink p-8 text-chalk md:p-10">
            <AngleMark className="h-8 w-8" variant="chalk" />
            <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
              Avantajlı Kayıt Fırsatları Devam Ediyor
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-chalk/75 md:text-base">
              Yeni eğitim dönemine avantajlı koşullarla başlamak isteyen öğrencilerimiz için erken
              kayıt süreci başladı.
            </p>
            <Button href="/erken-kayit" variant="primary" className="mt-6">
              Avantajlı Kayıt Başvurusu
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="py-20 md:py-24">
          <SectionHeading eyebrow="Eğitim Kademeleri" title="Anaokulundan Ortaokula" />
          <div className="mt-10 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {levels.map((level) => (
              <Link
                key={level.slug}
                href={`/${level.slug}`}
                className="group flex flex-col gap-4 bg-chalk p-8 transition-colors hover:bg-ink"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {level.ageRange}
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-chalk">
                  {level.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate group-hover:text-chalk/75">
                  {level.summary}
                </p>
                <span className="mt-auto font-mono text-xs uppercase tracking-wide text-signal">
                  İncele →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-chalk">
        <Container className="py-20 md:py-24">
          <SectionHeading
            eyebrow="Açı Eğitim Kurumları"
            title="Şampiyonlar Açı'dan"
            description="Açı Eğitim Kurumları bünyesindeki liselerimizin YKS başarıları."
            tone="chalk"
          />
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-chalk/15 bg-chalk/15 md:grid-cols-5">
            {achievementStats.map((stat, index) => (
              <div
                key={`${stat.value}-${index}`}
                className="flex flex-col items-center gap-2 bg-ink px-4 py-8 text-center"
              >
                <span className="font-display text-4xl font-semibold text-signal">{stat.value}</span>
                <span className="text-sm text-chalk/75">{stat.label}</span>
                <span className="font-mono text-xs text-chalk/50">{stat.year}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/basarilarimiz" variant="secondary">
              Tüm Başarılarımız
            </Button>
          </div>
        </Container>
      </section>

      {posts.length > 0 ? (
        <section className="border-b border-line">
          <Container className="py-20 md:py-24">
            <SectionHeading eyebrow="Blog" title="Blog Paylaşımları" />
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3 border border-line p-6 transition-colors hover:border-signal"
                >
                  <h3 className="font-display text-xl font-semibold text-ink group-hover:text-signal">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-slate">
                    {post.description}
                  </p>
                  <span className="mt-auto font-mono text-xs uppercase tracking-wide text-signal">
                    Devamını Oku →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/blog" variant="ghost">
                Tüm Blog Paylaşımları
              </Button>
            </div>
          </Container>
        </section>
      ) : null}

      <section>
        <Container className="flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <AngleMark className="h-8 w-8" />
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-ink md:text-4xl">
            Açı Koleji ailesiyle tanışmak ister misiniz?
          </h2>
          <p className="max-w-xl text-base text-slate">
            Kampüsümüzü yerinde görmek, eğitim programlarımız hakkında bilgi almak veya kayıt
            sürecini başlatmak için bize ulaşın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/erken-kayit" variant="primary">
              Erken Kayıt Başvurusu
            </Button>
            <Button href="/iletisim" variant="ghost">
              Bize Ulaşın
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
