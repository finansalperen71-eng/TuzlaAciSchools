"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isNavGroup, primaryNav } from "@/content/navigation";

export function MegaMenu() {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openLabel) return;

    function onDocumentClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenLabel(null);
      }
    }

    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, [openLabel]);

  function closeAndFocusTrigger(label: string) {
    setOpenLabel(null);
    triggerRefs.current[label]?.focus();
  }

  function focusFirstItem(label: string) {
    const panel = panelRefs.current[label];
    const firstLink = panel?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();
  }

  function onTriggerKeyDown(event: React.KeyboardEvent, label: string) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenLabel(label);
      requestAnimationFrame(() => focusFirstItem(label));
    } else if (event.key === "Escape") {
      setOpenLabel(null);
    }
  }

  function onPanelKeyDown(event: React.KeyboardEvent, label: string) {
    const panel = panelRefs.current[label];
    if (!panel) return;
    const items = Array.from(panel.querySelectorAll<HTMLAnchorElement>("a"));
    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeAndFocusTrigger(label);
    } else if (event.key === "Tab") {
      setOpenLabel(null);
    }
  }

  return (
    <nav ref={navRef} aria-label="Ana menü" className="hidden lg:flex items-center gap-1">
      {primaryNav.map((entry) => {
        if (!isNavGroup(entry)) {
          const active = pathname === entry.href;
          return (
            <Link
              key={entry.label}
              href={entry.href}
              aria-current={active ? "page" : undefined}
              className={`px-3 py-2 text-[0.9375rem] font-semibold transition-colors hover:text-signal ${
                active ? "text-signal" : "text-ink"
              }`}
            >
              {entry.label}
            </Link>
          );
        }

        const isOpen = openLabel === entry.label;
        const panelId = `menu-panel-${entry.label}`;

        return (
          <div key={entry.label} className="relative">
            <button
              type="button"
              ref={(node) => {
                triggerRefs.current[entry.label] = node;
              }}
              aria-haspopup="true"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenLabel(isOpen ? null : entry.label)}
              onKeyDown={(event) => onTriggerKeyDown(event, entry.label)}
              className={`flex items-center gap-1 px-3 py-2 text-[0.9375rem] font-semibold transition-colors hover:text-signal ${
                isOpen ? "text-signal" : "text-ink"
              }`}
            >
              {entry.label}
              <span aria-hidden="true" className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>
            {isOpen ? (
              <div
                id={panelId}
                ref={(node) => {
                  panelRefs.current[entry.label] = node;
                }}
                role="menu"
                onKeyDown={(event) => onPanelKeyDown(event, entry.label)}
                className="absolute left-0 top-full z-40 mt-2 min-w-56 border border-line bg-chalk py-2"
              >
                {entry.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setOpenLabel(null)}
                    className="block px-4 py-2.5 text-[0.9375rem] text-ink hover:bg-ink hover:text-chalk"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
