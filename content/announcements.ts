import { site } from "./site";

export type MarqueeItem = { label: string; href?: string };

// TopNavbar üstündeki duyuru şeridinin içeriği — iletişim ve kayıt bilgileri.
export const marqueeItems: MarqueeItem[] = [
  { label: "Erken kayıt kontenjanları sınırlıdır", href: "/erken-kayit" },
  { label: site.phone, href: `tel:${site.phoneHref}` },
  { label: site.email, href: `mailto:${site.email}` },
  { label: site.address.full },
  { label: "Kampüsü yerinde görmek için bize ulaşın", href: "/iletisim" },
];
