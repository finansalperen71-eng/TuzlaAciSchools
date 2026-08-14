"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  CloseIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  NewspaperIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon,
} from "@/components/ui/icons";

type RadialItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  accent?: boolean;
};

const radialItems: RadialItem[] = [
  { label: "Anasayfa", href: "/", icon: HomeIcon },
  { label: "Hakkımızda", href: "/hakkimizda", icon: InfoIcon },
  { label: "Blog", href: "/blog", icon: NewspaperIcon },
  { label: "Galeri", href: "/fotograf-galerisi", icon: ImageIcon },
  { label: "Erken Kayıt", href: "/erken-kayit", icon: StarIcon, accent: true },
  { label: "İletişim", href: "/iletisim", icon: PhoneIcon },
];

// Köşeye yaslı FAB'dan yukarı-sola açılan çeyrek yay: sağ/alt kenardan
// taşmadan 6 öğeye yetecek en geniş açıklık.
const RADIUS = 108;
const START_ANGLE = 100;
const END_ANGLE = 190;

function getOffset(index: number, total: number) {
  const angle =
    total === 1 ? START_ANGLE : START_ANGLE + ((END_ANGLE - START_ANGLE) * index) / (total - 1);
  const rad = (angle * Math.PI) / 180;
  return {
    x: Math.cos(rad) * RADIUS,
    y: -Math.sin(rad) * RADIUS,
  };
}

export function RadialMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-6 bottom-6 z-[60] sm:right-8 sm:bottom-8">
      <div
        role="menu"
        aria-label="Hızlı erişim menüsü"
        className="pointer-events-none absolute right-0 bottom-0 h-0 w-0"
      >
        {radialItems.map((item, index) => {
          const { x, y } = getOffset(index, radialItems.length);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              onClick={() => setOpen(false)}
              className={`group pointer-events-auto absolute right-0 bottom-0 flex h-12 w-12 items-center justify-center border-2 shadow-[0_2px_10px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-300 ease-out ${
                item.accent
                  ? "border-chalk bg-signal text-chalk hover:bg-[color-mix(in_srgb,var(--color-signal)_85%,var(--color-ink))]"
                  : "border-signal bg-ink text-chalk hover:bg-slate"
              } ${open ? "opacity-100" : "opacity-0"}`}
              style={{
                transform: open
                  ? `translate(${x}px, ${y}px) scale(1)`
                  : "translate(0, 0) scale(0.4)",
                transitionDelay: open ? `${index * 35}ms` : "0ms",
              }}
            >
              <Icon className="h-5 w-5" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-line bg-chalk px-2 py-1 font-mono text-xs uppercase tracking-wide text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Hızlı erişim menüsünü kapat" : "Hızlı erişim menüsünü aç"}
        className={`relative z-10 flex h-14 w-14 items-center justify-center border-2 shadow-[0_2px_14px_rgba(0,0,0,0.45)] transition-colors ${
          open
            ? "border-chalk bg-signal text-chalk hover:bg-[color-mix(in_srgb,var(--color-signal)_85%,var(--color-ink))]"
            : "border-signal bg-ink text-chalk hover:bg-slate"
        }`}
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
