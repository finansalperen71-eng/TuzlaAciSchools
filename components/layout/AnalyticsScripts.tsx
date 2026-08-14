"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsentCookie } from "@/lib/consent";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

// TODO: NEXT_PUBLIC_GA_ID .env'de tanımlanınca ve kullanıcı onay verince yüklenir.
// Onay reddedilirse veya ID tanımlı değilse hiçbir script mount edilmez.
// Cookie istemcide okunur (bkz. CookieBanner) — böylece bu bileşen sunucu
// tarafında cookies() tüketmez ve sayfaların statik üretimini bozmaz.
export function AnalyticsScripts() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    function sync() {
      setAllowed(readConsentCookie() === "accepted");
    }

    sync();
    window.addEventListener("aci-consent-change", sync);
    return () => window.removeEventListener("aci-consent-change", sync);
  }, []);

  if (!allowed || !gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
