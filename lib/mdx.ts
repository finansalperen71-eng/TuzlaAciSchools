import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const COVER_DIR = path.join(process.cwd(), "public", "images", "blog");
const COVER_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

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

/**
 * Kapak dizinini tek bir readdir ile okuyup slug -> public URL haritası kurar.
 * Slug başına existsSync yerine tek çağrı: hem her yazıyı hem her uzantıyı
 * bedavaya karşılar, yani kullanıcı .webp bıraksa da çalışır. Dizin hiç yoksa
 * boş harita döner — "henüz fotoğraf yok" bir hata değil, normal durum.
 *
 * cache() modül sabiti yerine bilinçli tercih: modül sabiti olsaydı her yeni
 * fotoğrafta dev sunucuyu yeniden başlatmak gerekirdi, oysa kurulan iş akışı
 * tam olarak "klasöre dosya bırak, sayfayı yenile".
 */
const getCoverIndex = cache((): ReadonlyMap<string, string> => {
  let files: string[];
  try {
    files = fs.readdirSync(COVER_DIR);
  } catch {
    return new Map();
  }

  const index = new Map<string, string>();
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!COVER_EXTS.has(ext)) continue;
    index.set(path.basename(file, ext), `/images/blog/${file}`);
  }
  return index;
});

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
