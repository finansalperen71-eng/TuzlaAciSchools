import fs from "fs";
import path from "path";
import { cache } from "react";

const DEFAULT_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Bir public/ alt dizinini tek bir readdir ile okuyup slug -> public URL
 * haritası kuran fabrika. Blog kapakları için yazıldı (bkz. lib/mdx.ts),
 * kadro fotoğrafları da aynı ihtiyacı duyunca ortaklaştırıldı.
 *
 * Slug başına existsSync yerine tek çağrı: hem her kaydı hem her uzantıyı
 * bedavaya karşılar, yani kullanıcı .webp bıraksa da çalışır. Dizin hiç
 * yoksa boş harita döner — "henüz görsel yok" bir hata değil, normal durum.
 *
 * Döndürülen fonksiyon `cache()` ile sarmalı: modül sabiti olsaydı her yeni
 * görselde dev sunucuyu yeniden başlatmak gerekirdi, oysa kurulan iş akışı
 * tam olarak "klasöre dosya bırak, sayfayı yenile". `cache()` çağrısı
 * fabrika içinde bir kez yapılır (her çağrıda değil) — aksi hâlde her
 * kullanımda yeni bir memoizasyon kapsamı doğar ve önbellek hiç tutmaz.
 */
export function createImageIndex(dirSegments: string[], urlPrefix: string) {
  const absDir = path.join(process.cwd(), ...dirSegments);

  return cache((): ReadonlyMap<string, string> => {
    let files: string[];
    try {
      files = fs.readdirSync(absDir);
    } catch {
      return new Map();
    }

    const index = new Map<string, string>();
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!DEFAULT_EXTS.has(ext)) continue;
      index.set(path.basename(file, ext), `${urlPrefix}/${file}`);
    }
    return index;
  });
}
