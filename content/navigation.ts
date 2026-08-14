import { routes, type RoutePath } from "./routes";

export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavLink[];
};

export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

// Etiketler content/routes.ts'ten türetilir — burada hardcode edilmez. Böylece
// bir href yazım hatası (yanlış rota adı) derleme hatası olur ve breadcrumb
// ile menü etiketi hiç ayrışmaz. NavGroup başlıkları (Kurumsal/Eğitim/Medya/
// Kayıt) burada kalır — bunlar menü organizasyonu, routes.ts'te karşılığı
// olan gerçek sayfalar değil.
function link(href: RoutePath): NavLink {
  return { label: routes[href].label, href };
}

export const primaryNav: NavEntry[] = [
  link("/"),
  {
    label: "Kurumsal",
    items: [
      link("/hakkimizda"),
      link("/neden-aci-egitim-kurumlari"),
      link("/tarihce"),
      link("/kadromuz"),
    ],
  },
  {
    label: "Eğitim",
    items: [link("/anaokulu"), link("/ilkokul"), link("/ortaokul")],
  },
  link("/basarilarimiz"),
  {
    label: "Medya",
    items: [link("/fotograf-galerisi"), link("/video-galerisi")],
  },
  link("/blog"),
  {
    label: "Kayıt",
    items: [link("/erken-kayit"), link("/kayit-sureci")],
  },
  link("/iletisim"),
  link("/insan-kaynaklari"),
];

export const legalNav: NavLink[] = [
  link("/sozlesme/kvkk-aydinlatma-metni"),
  link("/sozlesme/gizlilik-sozlesmesi"),
  link("/sozlesme/cerez-politikasi"),
];
