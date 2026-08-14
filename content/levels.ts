export type LevelSection = {
  heading: string;
  paragraphs: string[];
};

export type LevelFaqItem = {
  question: string;
  answer: string;
};

export type LevelSlug = "anaokulu" | "ilkokul" | "ortaokul";

export type LevelContent = {
  slug: LevelSlug;
  title: string;
  ageRange: string;
  summary: string;
  philosophy: LevelSection | null;
  academics: LevelSection | null;
  // TODO: Günlük akış saatleri sağlanınca doldurulacak.
  dailyFlow: LevelSection | null;
  clubs: LevelSection | null;
  language: LevelSection | null;
  guidance: LevelSection | null;
  // TODO: Seviyeye özel sık sorulan sorular sağlanınca doldurulacak.
  faq: LevelFaqItem[];
};

export const levels: LevelContent[] = [
  {
    slug: "anaokulu",
    title: "Anaokulu",
    ageRange: "36-71 Ay",
    summary:
      "36-71 aylık (3-4 ve 5 yaş) çocukların zihinsel, sosyal ve duygusal psiko-motor becerilerini kullanmaları ve geliştirmeleri hedeflenmektedir.",
    philosophy: {
      heading: "Eğitim Felsefesi",
      paragraphs: [
        "36-71 aylık (3-4 ve 5 yaş) çocukların zihinsel, sosyal ve duygusal psiko-motor becerilerini kullanmaları ve geliştirmeleri hedeflenmektedir.",
        "Empati, öz güven, eşitlik, saygı, sevgi ve farkındalık değerleriyle beslenen çocuklarımız; üretkenlik, hayal gücü, merak, keşfetme, sorumluluk, liderlik, duyarlı olma özellikleri ve takım olma bilinci kazanırlar.",
      ],
    },
    academics: {
      heading: "Akademik Yaklaşım",
      paragraphs: [
        "Okul öncesi sınıflarımızda alanında uzman 1 Okul Öncesi Öğretmeni ve 1 Çocuk Gelişim Uzmanı ile eğitim verilmektedir.",
      ],
    },
    dailyFlow: null,
    clubs: {
      heading: "Kulüpler ve Atölyeler",
      paragraphs: [
        "Çocuklarımız için planlanan açık hava öğrenme bahçesi, gündelik yaşam atölyesi ile mutfak deneyimleri, tiyatro, gezi, mekânsız etkileşimli masal-hikâye saatleri ile yaparak yaşayarak deneyim elde ettikleri süreçler planlanmaktadır.",
        "Orman okulu oturumları ile çevreye duyarlı, doğayı seven ve koruyan çocuklar yetiştirmenin yanı sıra onların gelişimlerinde duyusal bütünlük, özgüven ve çözüm odaklı bakış açısı gibi katkılar sağlanmaktadır.",
        "Branş dersleri: ergoterapi, drama, müzik, görsel sanatlar, temel hareket eğitimi, jimnastik, yüzme, robotik kodlama ve değerler eğitimi.",
      ],
    },
    language: {
      heading: "Yabancı Dil",
      paragraphs: [
        "Half-Day English Programme (Yarım Günlük İngilizce Programı) sistemimiz çerçevesinde her derste alanında yetkin iki öğretmen bulunmaktadır. Oxford Early Years Programı müfredatı kullanılmaktadır.",
      ],
    },
    guidance: {
      heading: "Rehberlik",
      paragraphs: [
        "Rehberlik Biriminde Klinik Psikolog ve PDR Uzmanı sınıflara destek sağlamaktadır.",
      ],
    },
    faq: [],
  },
  {
    slug: "ilkokul",
    title: "İlkokul",
    ageRange: "1-4. Sınıf",
    summary:
      "Öğrencilerin eleştirel düşünme, problem çözme, okuduğunu anlama, araştırma yapma gibi bilişsel, duyusal, psiko-motor becerilerini kullanmaları ve geliştirmeleri sağlanır.",
    philosophy: {
      heading: "Eğitim Felsefesi",
      paragraphs: [
        "Öğrencilerin eleştirel düşünme, problem çözme, okuduğunu anlama, araştırma yapma gibi bilişsel, duyusal, psiko-motor becerilerini kullanmaları ve geliştirmeleri sağlanır.",
        "İlkokulda bu temeller oluşturularak ortaokula hazır bireyler yetiştirilir.",
        "Doğayı tanıyan, seven ve bir doğa dostu olarak çevreyi her durumda koruma bilincine sahip, dürüst, erdemli, iyi ve mutlu bireyler olmaları için her açıdan destek sağlanır.",
      ],
    },
    academics: {
      heading: "Akademik Yaklaşım",
      paragraphs: [
        "Bu eğitim düzeyinde öğrencilerin oyunlar ve sportif aktivitelerle dikkat, denge, konsantrasyon ve esneklik gibi yetenekleri en üst düzeye getirilir.",
        "Öğrenme hızını ve potansiyelini arttırmaya yönelik akıl yürütme, düşünme, hafıza ve dil becerilerini geliştirecek uygulamalar eğitim-öğretimin temelini oluşturur.",
        "Sağlıklı beslenme ve sağlıklı yaşam konularında bilimsel bakış açısıyla karar verme alışkanlığı kazanması sağlanır.",
      ],
    },
    dailyFlow: null,
    clubs: {
      heading: "Sosyal Sorumluluk ve Etkinlikler",
      paragraphs: [
        "Sosyal sorumluluk projeleri, kültürel, sanatsal ve çeşitli gezi programlarıyla öğrencilerin beceri ve yetenekleri geliştirilir. Sanatsal beceriler, sportif ilgi ve yetenekler belirlenip geliştirilir.",
      ],
    },
    language: null,
    guidance: {
      heading: "Rehberlik",
      paragraphs: [
        "Rehberlik servisi ve sınıf öğretmenleri tarafından akademik başarıyı destekleyen çalışmalar geliştirilip takip edilir.",
      ],
    },
    faq: [],
  },
  {
    slug: "ortaokul",
    title: "Ortaokul",
    ageRange: "5-8. Sınıf",
    summary:
      "Temel hedef öğrencilerimizin öğrenme sorumluluklarını geliştirerek yeterliliklerini arttırmak ve harekete geçirmektir.",
    philosophy: {
      heading: "Eğitim Felsefesi",
      paragraphs: [
        "Temel hedef öğrencilerimizin öğrenme sorumluluklarını geliştirerek yeterliliklerini arttırmak ve harekete geçirmektir.",
        "Çocukların fiziksel, zihinsel, duygusal, sosyal ve ruhsal potansiyelleri bütünsel olarak desteklenerek öğrenme sürecine dâhil edilir.",
      ],
    },
    academics: {
      heading: "Akademik Yaklaşım",
      paragraphs: [
        "Kitlesel ve bireysel başarıyı destekleyen; planlı grup ve bire bir etüt çalışmaları, kaliteli kaynak kitap, test ve deneme sınavları, uzman eğitim ve öğretim kadrosuyla, öğrencilerin liselere giriş sınavlarına ve lise öğrenimine sağlam bir akademik altyapı oluşturulur.",
      ],
    },
    dailyFlow: null,
    clubs: {
      heading: "Kulüpler ve Atölyeler",
      paragraphs: [
        "Müzik, resim, sinema, tiyatro ya da spor alanlarında öğrencilerin yetenekleri değerlendirilerek uygun branşlarda profesyonelleşmelerine zemin hazırlanır.",
      ],
    },
    language: {
      heading: "Yabancı Dil",
      paragraphs: [
        "Avrupa Dilleri Ortak Çerçeve Programı kriterlerine göre 5. sınıfta A1 düzeyinden başlayarak 8. sınıfa kadar B2 düzeyine ulaşan öğrencilerimiz Dinleme-Konuşma, Okuma-Yazma becerilerini kazanırlar.",
      ],
    },
    guidance: {
      heading: "Rehberlik",
      paragraphs: [
        "Ayrıca akademik başarılarını destekleyecek tüm çalışmalar rehberlik servisi ve branş öğretmenleri tarafından geliştirilip takip edilir.",
      ],
    },
    faq: [],
  },
];

export function getLevel(slug: LevelSlug): LevelContent {
  const level = levels.find((entry) => entry.slug === slug);
  if (!level) throw new Error(`Bilinmeyen seviye: ${slug}`);
  return level;
}
