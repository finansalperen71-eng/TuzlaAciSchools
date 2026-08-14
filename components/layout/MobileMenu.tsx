"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isNavGroup, primaryNav } from "@/content/navigation";
import { Logo } from "./Logo";

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
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
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-drawer"
        aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-ink transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`block h-0.5 w-6 bg-ink transition-opacity ${isOpen ? "opacity-0" : ""}`} />
        <span
          className={`block h-0.5 w-6 bg-ink transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {isOpen ? (
        <div
          id="mobile-menu-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Ana menü"
          className="fixed inset-0 z-50 flex flex-col bg-chalk"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <Logo />
            <button
              type="button"
              aria-label="Menüyü kapat"
              onClick={() => setIsOpen(false)}
              className="text-2xl leading-none text-ink"
            >
              ×
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="flex flex-col">
              {primaryNav.map((entry) => {
                if (!isNavGroup(entry)) {
                  return (
                    <li key={entry.label} className="border-b border-line">
                      <Link
                        href={entry.href}
                        aria-current={pathname === entry.href ? "page" : undefined}
                        className="block py-4 font-display text-lg text-ink"
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }

                const expanded = Boolean(openGroups[entry.label]);

                return (
                  <li key={entry.label} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`mobile-group-${entry.label}`}
                      onClick={() =>
                        setOpenGroups((prev) => ({ ...prev, [entry.label]: !prev[entry.label] }))
                      }
                      className="flex w-full items-center justify-between py-4 font-display text-lg text-ink"
                    >
                      {entry.label}
                      <span aria-hidden="true" className={`text-sm transition-transform ${expanded ? "rotate-180" : ""}`}>
                        ▾
                      </span>
                    </button>
                    {expanded ? (
                      <ul id={`mobile-group-${entry.label}`} className="pb-3 pl-4">
                        {entry.items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} className="block py-2.5 text-base text-slate">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
