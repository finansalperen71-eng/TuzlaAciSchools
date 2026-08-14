import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/layout/Marquee";
import { NotFoundContent } from "@/components/layout/NotFoundContent";

// Kök not-found.tsx yalnızca app/layout.tsx içinde render olur, (site) grup
// layout'unu (dolayısıyla Header/Footer/Marquee'yi) atlar. Tamamen eşleşmeyen
// URL'ler (yazım hatası, eski link) buraya düşer — bu yüzden Header/Footer'ı
// burada elle kuruyoruz. RadialMenu/CookieBanner/AnalyticsScripts kasıtlı
// dahil edilmedi: 404 sayfası minimal kalsın.
export default function NotFound() {
  return (
    <>
      <Marquee />
      <Header />
      <main id="main-content">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
