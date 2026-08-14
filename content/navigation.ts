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

export const primaryNav: NavEntry[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Kurumsal",
    items: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Neden Açı Koleji", href: "/neden-aci-egitim-kurumlari" },
      { label: "Tarihçe", href: "/tarihce" },
      { label: "Kadromuz", href: "/kadromuz" },
    ],
  },
  {
    label: "Eğitim",
    items: [
      { label: "Anaokulu", href: "/anaokulu" },
      { label: "İlkokul", href: "/ilkokul" },
      { label: "Ortaokul", href: "/ortaokul" },
    ],
  },
  { label: "Başarılarımız", href: "/basarilarimiz" },
  {
    label: "Medya",
    items: [
      { label: "Fotoğraf Galerisi", href: "/fotograf-galerisi" },
      { label: "Video Galerisi", href: "/video-galerisi" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Kayıt",
    items: [
      { label: "Erken Kayıt Başvurusu", href: "/erken-kayit" },
      { label: "Kayıt Süreci", href: "/kayit-sureci" },
    ],
  },
  { label: "İletişim", href: "/iletisim" },
  { label: "İnsan Kaynakları", href: "/insan-kaynaklari" },
];

export const legalNav: NavLink[] = [
  { label: "KVKK Aydınlatma Metni", href: "/sozlesme/kvkk-aydinlatma-metni" },
  { label: "Gizlilik Sözleşmesi", href: "/sozlesme/gizlilik-sozlesmesi" },
  { label: "Çerez Politikası", href: "/sozlesme/cerez-politikasi" },
];
