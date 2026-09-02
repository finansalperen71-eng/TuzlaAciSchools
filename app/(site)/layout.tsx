import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { DecorField } from "@/components/layout/DecorField";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/layout/Marquee";
import { PromoModal } from "@/components/layout/PromoModal";
import { RadialMenu } from "@/components/layout/RadialMenu";
import { getSchoolJsonLd } from "@/lib/structuredData";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchoolJsonLd()) }}
      />
      <a href="#main-content" className="skip-link">
        İçeriğe geç
      </a>
      <Marquee />
      <Header />
      <main id="main-content" className="relative isolate bg-chalk">
        <DecorField />
        {children}
      </main>
      <Footer />
      <RadialMenu />
      <CookieBanner />
      <PromoModal />
      <AnalyticsScripts />
    </>
  );
}
