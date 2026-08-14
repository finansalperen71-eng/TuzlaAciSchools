import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Marquee } from "@/components/layout/Marquee";
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
      <main id="main-content">{children}</main>
      <Footer />
      <RadialMenu />
      <CookieBanner />
      <AnalyticsScripts />
    </>
  );
}
