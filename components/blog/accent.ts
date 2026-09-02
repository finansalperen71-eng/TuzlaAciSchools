import type { PostMeta } from "@/lib/mdx";

export type Accent = "sky" | "teal" | "honey" | "lilac";

// Yazının birincil etiketi rengini belirler; hem etiket çipi hem kapak yedeği
// aynı aksanı kullanır, böylece bir yazı listede her yerde aynı renkle okunur.
const TAG_ACCENT: Record<string, Accent> = {
  "Yabancı Dil": "sky",
  "İngilizce": "sky",
  "Almanca": "sky",
  "Gelişim": "sky",
  STEM: "teal",
  "Akademik Destek": "teal",
  Teknoloji: "lilac",
  Kodlama: "lilac",
  LGS: "honey",
  "Sınav Hazırlığı": "honey",
};

const FALLBACK: Accent[] = ["sky", "teal", "honey", "lilac"];

/** Deterministik — sunucu ve istemci aynı sonucu görür. */
export function hashString(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (Math.imul(h, 31) + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function accentForPost(post: PostMeta): Accent {
  for (const tag of post.tags) {
    const mapped = TAG_ACCENT[tag];
    if (mapped) return mapped;
  }
  // Haritada olmayan yeni bir etiket renksiz kalmasın.
  return FALLBACK[hashString(post.slug) % FALLBACK.length];
}

// Sınıf adları statik string olmak zorunda: Tailwind kaynak tarayıcısı
// `bg-${accent}-soft` gibi üretilmiş adları göremez ve hiç CSS yazmaz.
export const ACCENT_CHIP: Record<Accent, string> = {
  sky: "bg-sky-soft text-sky-deep",
  teal: "bg-teal-soft text-teal-deep",
  honey: "bg-honey-soft text-honey-deep",
  lilac: "bg-lilac-soft text-lilac-deep",
};

export const ACCENT_PLATE_BG: Record<Accent, string> = {
  sky: "bg-sky-soft",
  teal: "bg-teal-soft",
  honey: "bg-honey-soft",
  lilac: "bg-lilac-soft",
};

export const ACCENT_PLATE_MARK: Record<Accent, string> = {
  sky: "bg-sky",
  teal: "bg-teal",
  honey: "bg-honey",
  lilac: "bg-lilac",
};
