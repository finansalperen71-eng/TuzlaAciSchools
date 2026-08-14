export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalDoc = {
  slug: "kvkk-aydinlatma-metni" | "gizlilik-sozlesmesi" | "cerez-politikasi";
  sections: LegalSection[];
};

// ÖNEMLİ: Bu üç metin taslaktır ve hukuki onay bekliyor — KVKK aydınlatma
// metni, gizlilik ve çerez politikası bağlayıcı hukuki belgelerdir. Yayına
// almadan önce kurumun hukuk danışmanına onaylatılmalı ve gerçek veri
// işleme süreçleriyle (toplanan veri türleri, saklama süreleri, aktarım
// yapılan taraflar) eşleştirilmelidir. Aşağıdaki bölüm başlıkları standart
// bir KVKK/gizlilik/çerez metninin iskeletini yansıtır; gövde metinleri
// kuruma özgü ayrıntılar içermez.
export const legalDocs: LegalDoc[] = [
  {
    slug: "kvkk-aydinlatma-metni",
    sections: [
      {
        heading: "Veri Sorumlusu",
        paragraphs: [
          "6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") uyarınca, Özel Tuzla Açı İlkokulu ve Özel Tuzla Açı Ortaokulu veri sorumlusu sıfatıyla, aşağıda açıklanan kapsamda kişisel verilerinizi işleyebilecektir.",
        ],
      },
      {
        heading: "İşlenen Kişisel Veriler",
        paragraphs: [
          "Kayıt, iletişim ve başvuru formları aracılığıyla paylaştığınız kimlik, iletişim ve eğitim bilgileri işlenmektedir. İşlenen veri kategorilerinin tam listesi bu bölümde detaylandırılacaktır.",
        ],
      },
      {
        heading: "İşleme Amaçları",
        paragraphs: [
          "Kişisel verileriniz; kayıt ve başvuru süreçlerinin yürütülmesi, veli/öğrenci ile iletişimin sağlanması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.",
        ],
      },
      {
        heading: "Veri Sahibinin Hakları",
        paragraphs: [
          "KVKK'nın 11. maddesi kapsamında; işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Talepleriniz için iletişim sayfamızdan bize ulaşabilirsiniz.",
        ],
      },
    ],
  },
  {
    slug: "gizlilik-sozlesmesi",
    sections: [
      {
        heading: "Genel İlkeler",
        paragraphs: [
          "Tuzla Açı Koleji olarak ziyaretçilerimizin ve velilerimizin gizliliğine önem veriyoruz. Bu sayfada, web sitemiz üzerinden toplanan bilgilerin nasıl kullanıldığına dair genel çerçeve yer almaktadır.",
        ],
      },
      {
        heading: "Toplanan Bilgiler",
        paragraphs: [
          "İletişim, erken kayıt ve iş başvurusu formları aracılığıyla ad-soyad, telefon, e-posta ve form içeriğine bağlı diğer bilgiler tarafımızca toplanmaktadır.",
        ],
      },
      {
        heading: "Bilgilerin Kullanımı ve Paylaşımı",
        paragraphs: [
          "Toplanan bilgiler yalnızca ilgili talebin yanıtlanması amacıyla kullanılır ve yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.",
        ],
      },
    ],
  },
  {
    slug: "cerez-politikasi",
    sections: [
      {
        heading: "Çerez Nedir?",
        paragraphs: [
          "Çerezler, web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır; sitenin düzgün çalışmasını ve deneyiminizin iyileştirilmesini sağlar.",
        ],
      },
      {
        heading: "Kullanılan Çerez Türleri",
        paragraphs: [
          "Zorunlu çerezler sitenin temel işlevleri (ör. çerez tercihinizin hatırlanması) için kullanılır ve her zaman aktiftir. Analitik çerezler ise yalnızca onayınız halinde, site kullanımını anlamak amacıyla kullanılır.",
        ],
      },
      {
        heading: "Tercihlerinizi Yönetme",
        paragraphs: [
          "Sayfanın altında beliren çerez bildirimi üzerinden analitik çerezleri kabul edebilir veya reddedebilirsiniz. Tercihinizi tarayıcı ayarlarınız üzerinden de her zaman değiştirebilirsiniz.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: LegalDoc["slug"]): LegalDoc {
  const doc = legalDocs.find((entry) => entry.slug === slug);
  if (!doc) throw new Error(`Bilinmeyen hukuki metin: ${slug}`);
  return doc;
}
