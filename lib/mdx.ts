import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { createImageIndex } from "@/lib/imageIndex";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  order: number;
};

// cover frontmatter'da tutulmuyor: dosya adı ile frontmatter birbirinden
// sapabildiği için sekiz kapağın sekizi de kırık kalmıştı. Konvansiyon sapamaz —
// kapak public/images/blog/<slug>.<uzantı> olarak aranır ve yalnızca diskte
// gerçekten görülen dosyalar için yol döner. Tip `string | null` olduğu için
// TypeScript her tüketiciyi dallanmaya zorlar; <Image src={undefined}>
// üretebilecek bir kod yolu yok.
export type PostMeta = PostFrontmatter & { slug: string; cover: string | null };

export type Post = PostMeta & { content: string };

// Kapak çözümleme lib/imageIndex.ts'teki ortak fabrikayı kullanır (kadro
// fotoğrafları da aynı deseni public/images/kadro için kurdu, bkz. lib/staff.ts).
// Davranış birebir aynı: tek readdir, uzantıdan bağımsız, dizin yoksa boş harita.
const getCoverIndex = createImageIndex(["public", "images", "blog"], "/images/blog");

export const getPostSlugs = cache((): string[] =>
  fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, "")),
);

function coverFor(slug: string): string | null {
  return getCoverIndex().get(slug) ?? null;
}

export const getPostBySlug = cache((slug: string): Post => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    cover: coverFor(slug),
    ...(data as PostFrontmatter),
  };
});

export const getPostMeta = cache((slug: string): PostMeta => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return { slug, cover: coverFor(slug), ...(data as PostFrontmatter) };
});

export const getAllPosts = cache((): PostMeta[] =>
  getPostSlugs()
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) return dateDiff;
      return a.order - b.order;
    }),
);

export function getLatestPosts(count: number): PostMeta[] {
  return getAllPosts().slice(0, count);
}

// Yanlış adlandırılmış bir kapak sessizce yedek plakaya düşerdi ve kullanıcı
// neden görünmediğini anlayamazdı. Yalnızca geliştirmede uyarır.
if (process.env.NODE_ENV === "development") {
  const orphans = [...getCoverIndex().keys()].filter(
    (name) => !getPostSlugs().includes(name),
  );
  if (orphans.length > 0) {
    console.warn(
      `[blog] public/images/blog içinde hiçbir yazıyla eşleşmeyen kapak(lar): ${orphans.join(", ")}`,
    );
  }
}
