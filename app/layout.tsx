import type { Metadata } from "next";
import { IBM_Plex_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

// Doğa Koleji'nin kullandığı aile: Open Sans (Light/Regular/Semibold).
// Variable sürüm tek dosyada tüm ağırlıkları taşır.
const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-open-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${openSans.variable} ${plexMono.variable}`}>
      <body className="font-body bg-chalk text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
