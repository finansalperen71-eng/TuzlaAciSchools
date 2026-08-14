export const site = {
  name: "Tuzla Açı Koleji",
  legalName: "Özel Tuzla Açı İlkokulu ve Özel Tuzla Açı Ortaokulu",
  slogan: "AÇI'DA BAŞARI BİR GELENEKTİR",
  url: "https://tuzlaacikoleji.com.tr",
  description:
    "Tuzla'da anaokulu, ilkokul ve ortaokul kademelerinde çağdaş eğitim anlayışı benimseyen Açı Koleji.",
  address: {
    streetAddress: "Yayla Mahallesi, Cengiz Topel Caddesi, No:84",
    addressLocality: "Tuzla",
    addressRegion: "İstanbul",
    postalCode: "",
    addressCountry: "TR",
    full: "Yayla Mahallesi, Cengiz Topel Caddesi, No:84 Tuzla/İstanbul",
  },
  phone: "0 (216) 447 14 01",
  phoneHref: "+902164471401",
  email: "info@tuzlaacikoleji.com.tr",
  // TODO: Gerçek koordinatlar sağlandığında güncellenecek (JSON-LD geo + harita gömme için).
  geo: {
    latitude: null as number | null,
    longitude: null as number | null,
  },
  // TODO: Sosyal medya hesap URL'leri sağlanınca doldurulacak.
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  // TODO: Çalışma saatleri sağlanınca doldurulacak.
  openingHours: [] as { dayOfWeek: string; opens: string; closes: string }[],
  // public/video/hero.mp4 yüklendi, video aktif. Poster görseli henüz yok
  // (public/images/hero-poster.jpg) — eklenene kadar video ilk karesi
  // yüklenene kadar boş/siyah görünür, kritik değil.
  heroVideo: {
    enabled: true as boolean,
    src: "/video/hero.mp4",
    poster: "/images/hero-poster.jpg",
  },
} as const;
