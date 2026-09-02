import type { NextConfig } from "next";
import path from "path";

// Content-Security-Policy.
//
// Bilinçli ödün: script-src içinde 'unsafe-inline' var. Nonce tabanlı katı
// bir CSP, nonce'un middleware'de istek başına üretilmesini gerektirir; bu da
// tüm sayfaları dinamik render'a zorlayıp sitenin statik üretimini (SSG)
// bozar. Site hiçbir yerde kullanıcı üretimi HTML render etmiyor
// (dangerouslySetInnerHTML yalnızca content/ içindeki statik JSON-LD için
// kullanılıyor), dolayısıyla XSS yüzeyi pratikte yok. frame-ancestors,
// base-uri, form-action ve object-src direktifleri bu haliyle de gerçek
// koruma sağlıyor.
//
// 'unsafe-eval' SADECE development'ta ekleniyor: Next.js dev sunucusu
// (webpack HMR / React Refresh) modülleri eval() ile çalıştırıyor. Bu
// olmadan CSP tüm client-side JS'i engelliyor, React hiç hydrate olmuyor
// ve dolayısıyla hiçbir useEffect (ör. PromoModal'ın açılma zamanlayıcısı)
// çalışmıyor. Production build'de webpack eval kullanmadığı için orada
// gerekmiyor — üretim CSP'si sıkı kalıyor.
const isDev = process.env.NODE_ENV !== "production";
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  // İletişim sayfasındaki Google Maps embed'i için.
  "frame-src https://www.google.com",
  "media-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/blog-detay/code-org-ile-yapay-zek%C3%A2-destekli-egitim",
        destination: "/blog/code-org-ile-yapay-zeka-destekli-egitim",
        permanent: true,
      },
      {
        source:
          "/blog-detay/dil-ogrenimi-icin-en-dogru-yas%3A-cocugunuza-nasil-destek-olabilirsiniz-",
        destination: "/blog/dil-ogreniminde-dogru-yas",
        permanent: true,
      },
      {
        source: "/blog-detay/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
