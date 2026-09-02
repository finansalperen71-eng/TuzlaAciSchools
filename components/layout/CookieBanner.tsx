"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONSENT_COOKIE, CONSENT_MAX_AGE, readConsentCookie, type ConsentValue } from "@/lib/consent";

// Sunucu tarafında cookies() okumuyoruz: bu, paylaşılan layout üzerinden
// tüm sayfaları dinamik render'a zorlayıp SSG'yi bozar. Onay durumu
// yalnızca istemcide document.cookie üzerinden okunur — ilk boyamada
// (SSR/hydration) banner hiç görünmez, sadece efekt çalışınca kararı verir.
export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    setVisible(readConsentCookie() === "unset");
  }, []);

  function setConsent(value: ConsentValue) {
    // HTTPS altında çerez yalnızca güvenli bağlantıda gönderilsin.
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
    setVisible(false);
    window.dispatchEvent(new Event("aci-consent-change"));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez tercihleri"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-chalk"
    >
      <Container className="flex flex-col gap-4 py-6">
        <p className="max-w-2xl font-body text-sm text-ink">
          Sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. Zorunlu çerezler her
          zaman aktiftir; analitik çerezleri yalnızca onayınızla kullanırız. Detaylar için{" "}
          <Link
            href="/sozlesme/cerez-politikasi"
            className="underline underline-offset-2 hover:text-signal-deep"
          >
            Çerez Politikası
          </Link>
          &apos;nı inceleyebilirsiniz.
        </p>

        {showPreferences ? (
          <div className="flex max-w-md flex-col gap-3 border border-line px-4 py-4">
            <label className="flex items-center justify-between gap-4 text-sm text-slate">
              Zorunlu Çerezler
              <input
                type="checkbox"
                checked
                disabled
                className="h-4 w-4 accent-[color:var(--color-signal)]"
              />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm text-ink">
              Analitik Çerezler
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(event) => setAnalyticsEnabled(event.target.checked)}
                className="h-4 w-4 accent-[color:var(--color-signal)]"
              />
            </label>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setConsent("accepted")}>
            Tümünü Kabul Et
          </Button>
          <Button variant="ghost" onClick={() => setConsent("declined")}>
            Tümünü Reddet
          </Button>
          {showPreferences ? (
            <Button
              variant="ghost"
              onClick={() => setConsent(analyticsEnabled ? "accepted" : "declined")}
            >
              Tercihleri Kaydet
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setShowPreferences(true)}>
              Tercihler
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}
