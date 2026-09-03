import Image from "next/image";
import { type ReactNode } from "react";
import { DecorField } from "@/components/layout/DecorField";
import { site } from "@/content/site";

type HeroCurtainProps = {
  children: ReactNode;
};

// Anasayfa hero videosu: topnavbar'ın hemen altında tam genişlikte, sessiz,
// otomatik oynayan, kontrolsüz video. Aşağı kaydırıldıkça sonraki içerik
// (children) videonun üstüne kayıp onu örter — "perde" efekti.
//
// Nasıl çalışır: sabitlenen video katmanı ile perde katmanı kardeş, ortak
// `relative` ebeveyn içinde. Sticky öğe ebeveyninin kutusuyla sınırlıdır;
// ebeveynin toplam yüksekliği (video + tüm sayfa içeriği) videoya tam scroll
// yolu verir. Video `top: var(--header-h)`'de kilitlenir (bkz. globals.css);
// perde DOM'da sonra + z-10 + opak olduğu için üstüne kayar. Scroll
// dinleyicisi yok, tamamen compositor'da — sıfır JS.
export function HeroCurtain({ children }: HeroCurtainProps) {
  return (
    <div className="relative">
      <div
        className="sticky top-[var(--header-h)] z-0 h-[calc(100svh-var(--header-h))] overflow-hidden bg-ink"
      >
        {site.heroVideo.enabled ? (
          <>
            {/* HTML poster attribute yerine next/image: aynı kaynak dosya
                AVIF/WebP'ye ve gerçek görüntülenen boyuta indirgenir, ham
                JPEG'den belirgin ölçüde daha az bayt. Video ilk kareyi
                çözene kadar bu görsel görünür kalır, video başlayınca
                DOM sırası gereği üstüne kayar (ikisi de position: absolute,
                sticky ebeveyn zaten positioned bir containing block). */}
            <Image
              src={site.heroVideo.poster}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={site.heroVideo.src} type="video/mp4" />
            </video>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-chalk/40">
              Tuzla Açı Koleji
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 bg-chalk shadow-[0_-24px_48px_rgba(23,48,101,0.18)]">
        <DecorField />
        {children}
      </div>
    </div>
  );
}
