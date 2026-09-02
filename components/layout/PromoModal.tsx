"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/ui/icons";

const SHOW_DELAY_MS = 900;
// Kayıt sürecinin kendi sayfasında bu duyuruyu tekrar göstermenin anlamı yok.
const SKIP_ON_PATHS = ["/erken-kayit"];

// Site her açıldığında sayfa ortasında beliren, kapatılabilir kayıt duyurusu.
// Her sayfa yenilemesinde yeniden gösterilir (kalıcı "kapatıldı" kaydı tutulmaz);
// /erken-kayit sayfasındayken hiç açılmaz, oraya client-side geçildiğinde de
// otomatik kapanır. İçerik public/images/promo-modal.png dosyasından gelen hazır
// kare promosyon görseli — başlık, CTA metni ve marka hepsi görselin içinde;
// görsele tıklamak /erken-kayit'e yönlendirir.
export function PromoModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (SKIP_ON_PATHS.includes(pathname)) return;

    const timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
    // Her sayfa yüklemesinde (yenileme dahil) yeniden planlanır.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (SKIP_ON_PATHS.includes(pathname)) close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="promo-modal-backdrop fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      onClick={close}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Avantajlı kayıt duyurusu"
        onClick={(event) => event.stopPropagation()}
        className="promo-modal-panel relative w-full max-w-sm overflow-hidden border-2 border-ink bg-chalk shadow-[0_24px_64px_rgba(23,48,101,0.35)] sm:max-w-md"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          aria-label="Kapat"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-chalk transition-colors hover:bg-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <Link href="/erken-kayit" onClick={close} className="block">
          <Image
            src="/images/promo-modal.png"
            alt="Avantajlı Kayıtla Hedefine İlerle — AÇI Eğitim Kurumları'nda hedef odaklı eğitimle geleceğine bugünden hazırlan."
            width={1080}
            height={1080}
            className="h-auto w-full"
            sizes="(min-width: 640px) 448px, 100vw"
          />
        </Link>
      </div>
    </div>
  );
}
