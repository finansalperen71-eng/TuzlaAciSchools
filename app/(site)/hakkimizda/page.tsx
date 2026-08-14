import { AngleMark } from "@/components/ui/AngleMark";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

const paragraphs = [
  "Tuzla Açı Koleji, öğrencilerini akademik başarıya ulaştırırken aynı zamanda onları hayata hazırlamayı amaçlayan, çağdaş eğitim anlayışını benimsemiş güçlü bir eğitim kurumudur. Öğrencilerimizin bireysel yeteneklerini keşfetmelerine, özgüven kazanmalarına ve hedeflerine emin adımlarla ilerlemelerine rehberlik ediyoruz.",
  "Deneyimli eğitim kadromuz, güncel öğretim yöntemleri ve öğrenci odaklı yaklaşımımız sayesinde her öğrencinin potansiyelini en üst seviyeye çıkarmayı hedefliyoruz. Akademik başarının yanında sosyal, kültürel ve kişisel gelişimi de destekleyen eğitim modelimizle öğrencilerimizin çok yönlü bireyler olarak yetişmelerini sağlıyoruz.",
  "Tuzla Açı Koleji olarak; disiplinli çalışma, bilimsel düşünce, etik değerler ve sürekli gelişim ilkelerini eğitim anlayışımızın merkezine yerleştiriyoruz. Modern eğitim ortamlarımız, güçlü rehberlik hizmetlerimiz ve sınav hazırlık programlarımızla öğrencilerimizin hem bugünün hem de geleceğin dünyasına hazır bireyler olmalarına katkı sunuyoruz.",
  "Geleceğe güvenle bakan, sorgulayan, üreten ve başarılı bireyler yetiştirmek için çıktığımız bu yolda, öğrencilerimiz ve velilerimizle birlikte güçlü bir eğitim ailesi oluşturmaktan gurur duyuyoruz.",
];

export const metadata = buildMetadata({
  title: "Hakkımızda",
  description: paragraphs[0],
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-8 py-16 md:py-20">
        <div className="flex items-center gap-2">
          <AngleMark className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">
            Kurumsal
          </span>
        </div>
        <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">Hakkımızda</h1>
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
