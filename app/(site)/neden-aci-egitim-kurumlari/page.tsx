import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

const intro = [
  "İlkeli, çevresine duyarlı ve karakterli eğitim anlayışının, bireyin sağlıklı gelişiminde son derece önemli olduğunu biliyoruz.",
  "Doğru ve uygulanabilir programlarla öğrencilerimizi; öz güveni yüksek, sorgulayıcı, araştıran, incitmeyen, ahlaki değerlere bağlı insanlar olarak yetiştiriyoruz.",
];

const studentOutcomes = [
  "Bilgileri ezberlemez, öğrenmeyi öğrenirler.",
  "Bir problemi tanımlamayı, çözüm yollarını keşfetmeyi ve iş birliği içinde sonuca götürmeyi tecrübe ederler.",
  "Yaptığı işlerin, bireysel ve toplumsal faydalarını kavrayabilen kişiler olurlar.",
  "Gelecekte sahip olacakları iş ve sosyal hayatlarını, ilkesel duruşlarını bozmadan sürdürebilirler.",
];

const institutionTraits = [
  "Sosyal sorumluluk projelerinde öğrencilerine görev vererek onların öz farkındalıklarını geliştirir.",
  "Ulusal-uluslararası akademik, kültürel ve sportif faaliyetlerde öğrencilerinin destekçisi, yönlendiricisi olarak onların kendilerini keşfetmelerine yardımcı olur.",
];

export const metadata = buildMetadata({
  ...getRoute("/neden-aci-egitim-kurumlari"),
  path: "/neden-aci-egitim-kurumlari",
});

export default function NedenAciPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-8 py-16 md:py-20">
        <PageHero
          {...getRoute("/neden-aci-egitim-kurumlari")}
          description={undefined}
          breadcrumb={getBreadcrumbTrail("/neden-aci-egitim-kurumlari")}
        />

        <div className="flex flex-col gap-5">
          {intro.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-l-2 border-signal pl-6">
          <h2 className="font-display text-xl font-semibold text-ink">Burada öğrenciler</h2>
          <ul className="flex flex-col gap-3">
            {studentOutcomes.map((item) => (
              <li key={item} className="text-base leading-relaxed text-slate">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 border-l-2 border-signal pl-6">
          <h2 className="font-display text-xl font-semibold text-ink">Açı Eğitim Kurumları</h2>
          <ul className="flex flex-col gap-3">
            {institutionTraits.map((item) => (
              <li key={item} className="text-base leading-relaxed text-slate">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-base leading-relaxed text-slate md:text-lg">
          Eğitim alanındaki 30 yılı aşkın birikimiyle; kendini, yaşadığı toplumu ve dünyayı
          tanıyan insanlar yetiştirme misyonu ve her şeyin temeline ahlakı koyan vizyonu ile
          hizmete devam etmektedir.
        </p>
      </Container>
    </section>
  );
}
