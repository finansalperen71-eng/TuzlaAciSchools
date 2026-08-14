import { NotFoundContent } from "@/components/layout/NotFoundContent";

// (site) grubu içindeki bir sayfadan notFound() çağrıldığında (ör.
// blog/[slug]'de geçersiz slug) burası render olur — Header/Footer/Marquee
// zaten app/(site)/layout.tsx'ten geliyor, sadece içerik yeterli.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
