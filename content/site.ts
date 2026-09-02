export const site = {
  name: "Tuzla Açı Koleji",
  legalName: "Özel Tuzla Açı İlkokulu ve Özel Tuzla Açı Ortaokulu",
  slogan: "AÇI'DA BAŞARI BİR GELENEKTİR",
  url: "https://tuzlaacikoleji.com.tr",
  description:
    "Tuzla'da anaokulu, ilkokul ve ortaokul kademelerinde çağdaş eğitim anlayışı benimseyen Açı Koleji.",
  address: {
    streetAddress: "Yayla Mahallesi, Fevzi Çakmak Caddesi, No:84",
    addressLocality: "Tuzla",
    addressRegion: "İstanbul",
    postalCode: "34944",
    addressCountry: "TR",
    full: "Açı Eğitim Kurumları Tuzla, Yayla Mahallesi, Fevzi Çakmak Caddesi No:84, 34944 Tuzla/İstanbul",
  },
  phone: "0 (216) 447 14 01",
  phoneHref: "+902164471401",
  email: "info@tuzlaacikoleji.k12.tr",
  geo: {
    latitude: 40.8289077 as number | null,
    longitude: 29.3103892 as number | null,
  },
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.957020652675!2d29.310389199999996!3d40.828907699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caddb5a4b7fca5%3A0x976afcabb426bff3!2zQcOnxLEgRcSfaXRpbSBLdXJ1bWxhcsSxIFR1emxh!5e0!3m2!1str!2str!4v1788330711995!5m2!1str!2str",
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
