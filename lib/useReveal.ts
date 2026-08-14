"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll'da görünüre girdiğinde .is-visible ekleyen tek reveal mekanizması.
 * prefers-reduced-motion zaten globals.css'te .reveal'ı görünür tutuyor,
 * bu yüzden burada ayrıca kontrol etmeye gerek yok.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
