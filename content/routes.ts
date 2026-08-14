import { site } from "./site";

export type BreadcrumbItem = { label: string; href: string };

export type RouteMeta = {
  /** Kısa: nav ve breadcrumb kırıntısında kullanılır. */
  label: string;
  /** Uzun: <title> ve sayfa <h1>'i için. */
  title: string;
  description: string;
  eyebrow?: string;
  eyebrowTone?: "slate" | "signal";
  /** RoutePath olmalı ama RouteMeta<->RoutePath döngüsünü kırmak için string tutulur. */
  parent?: string;
};

// Site genelindeki tüm sayfaların tek doğruluk kaynağı: breadcrumb, sitemap ve
// (navigation.ts / Footer.tsx üzerinden) menü etiketleri buradan türetilir.
// Yeni bir rota eklerken önce burada tanımlanır, sonra app/(site)/... altında
// page.tsx oluşturulur. content/blog/[slug] buraya dahil değildir — kendi
// breadcrumb kırıntısını lib/mdx.ts verisinden üretir (bkz. blog/[slug]/page.tsx).
export const routes = {
  "/": {
    label: "Anasayfa",
    title: site.name,
    description: site.description,
  },
  "/hakkimizda": {
    label: "Hakkımızda",
    title: "Hakkımızda",
    eyebrow: "Kurumsal",
    description:
      "Tuzla Açı Koleji, öğrencilerini akademik başarıya ulaştırırken aynı zamanda onları hayata hazırlamayı amaçlayan, çağdaş eğitim anlayışını benimsemiş güçlü bir eğitim kurumudur.",
    parent: "/",
  },
  "/neden-aci-egitim-kurumlari": {
    label: "Neden Açı Koleji",
    title: "Neden Açı Eğitim Kurumları?",
    eyebrow: "Kurumsal",
    description:
      "İlkeli, çevresine duyarlı ve karakterli eğitim anlayışının, bireyin sağlıklı gelişiminde son derece önemli olduğunu biliyoruz.",
    parent: "/",
  },
  "/tarihce": {
    label: "Tarihçe",
    title: "Tarihçemiz",
    eyebrow: "Kurumsal",
    description: "Tuzla Açı Koleji'nin kuruluşundan bugüne uzanan yolculuğu.",
    parent: "/",
  },
  "/kadromuz": {
    label: "Kadromuz",
    title: "Kadromuz",
    eyebrow: "Kurumsal",
    description: "Yönetim ve öğretmen kadromuz hakkında bilgi.",
    parent: "/",
  },
  "/anaokulu": {
    label: "Anaokulu",
    title: "Anaokulu",
    description: "Anaokulu kademesi hakkında bilgi alın.",
    parent: "/",
  },
  "/ilkokul": {
    label: "İlkokul",
    title: "İlkokul",
    description: "İlkokul kademesi hakkında bilgi alın.",
    parent: "/",
  },
  "/ortaokul": {
    label: "Ortaokul",
    title: "Ortaokul",
    description: "Ortaokul kademesi hakkında bilgi alın.",
    parent: "/",
  },
  "/basarilarimiz": {
    label: "Başarılarımız",
    title: "Başarılarımız",
    eyebrow: "Şampiyonlar Açı'dan",
    description: "Açı Eğitim Kurumları bünyesindeki liselerimizin YKS başarıları.",
    parent: "/",
  },
  "/fotograf-galerisi": {
    label: "Fotoğraf Galerisi",
    title: "Fotoğraf Galerisi",
    eyebrow: "Medya",
    description: "Tuzla Açı Koleji kampüsünden fotoğraflar.",
    parent: "/",
  },
  "/video-galerisi": {
    label: "Video Galerisi",
    title: "Video Galerisi",
    eyebrow: "Medya",
    description: "Tuzla Açı Koleji kampüsünden videolar.",
    parent: "/",
  },
  "/blog": {
    label: "Blog",
    title: "Blog Paylaşımları",
    eyebrow: "Blog",
    description: "Eğitim, gelişim ve okul hayatı üzerine yazılarımız.",
    parent: "/",
  },
  "/erken-kayit": {
    label: "Erken Kayıt Başvurusu",
    title: "Erken Kayıt",
    eyebrow: "Kontenjanlar Sınırlı",
    eyebrowTone: "signal",
    description:
      "Erken kayıt kontenjanları sınırlıdır. Bilgileri eksiksiz doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.",
    parent: "/",
  },
  "/kayit-sureci": {
    label: "Kayıt Süreci",
    title: "Kayıt Süreci",
    eyebrow: "Kayıt",
    description: "Tuzla Açı Koleji kayıt süreci ve şartları.",
    parent: "/",
  },
  "/iletisim": {
    label: "İletişim",
    title: "Bize Ulaşın",
    eyebrow: "İletişim",
    description: "Tuzla Açı Koleji ile iletişime geçin.",
    parent: "/",
  },
  "/insan-kaynaklari": {
    label: "İnsan Kaynakları",
    title: "Bizimle Çalışmak İster misiniz?",
    eyebrow: "İnsan Kaynakları",
    description: "Tuzla Açı Koleji ile çalışmak ister misiniz? İş başvurusu formunu doldurun.",
    parent: "/",
  },
  "/sozlesme/kvkk-aydinlatma-metni": {
    label: "KVKK Aydınlatma Metni",
    title: "KVKK Aydınlatma Metni",
    eyebrow: "Yasal",
    description: "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
    parent: "/",
  },
  "/sozlesme/gizlilik-sozlesmesi": {
    label: "Gizlilik Sözleşmesi",
    title: "Gizlilik Sözleşmesi",
    eyebrow: "Yasal",
    description: "Gizlilik sözleşmesi.",
    parent: "/",
  },
  "/sozlesme/cerez-politikasi": {
    label: "Çerez Politikası",
    title: "Çerez Politikası",
    eyebrow: "Yasal",
    description: "Çerez politikası.",
    parent: "/",
  },
} as const satisfies Record<string, RouteMeta>;

export type RoutePath = keyof typeof routes;

export function getRoute(path: RoutePath): RouteMeta {
  return routes[path];
}

/** "/" için boş dizi döner — tek öğelik breadcrumb basılmaz (bkz. Breadcrumb.tsx). */
export function getBreadcrumbTrail(path: RoutePath): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [];
  let current: RoutePath | undefined = path;

  while (current) {
    const route: RouteMeta = routes[current];
    trail.unshift({ label: route.label, href: current });
    current = route.parent as RoutePath | undefined;
  }

  return trail.length > 1 ? trail : [];
}
