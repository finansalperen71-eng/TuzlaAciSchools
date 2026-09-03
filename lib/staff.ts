import { createImageIndex } from "@/lib/imageIndex";
import { staff } from "@/content/institution";

// lib/mdx.ts'teki kapak çözümlemesiyle aynı desen: public/images/kadro
// tek seferde okunur, slug -> public URL haritasına dönüşür. Fotoğraf
// eklenmemiş bir üye hata değil, normal durumdur (bkz. TeacherCard'daki
// baş harf plakası yedeği).
const getStaffPhotoIndex = createImageIndex(["public", "images", "kadro"], "/images/kadro");

export function photoFor(slug: string): string | null {
  return getStaffPhotoIndex().get(slug) ?? null;
}

// Yanlış adlandırılmış bir fotoğraf sessizce kaybolurdu ve kullanıcı neden
// görünmediğini anlayamazdı. Yalnızca geliştirmede uyarır (bkz. lib/mdx.ts
// aynı desenin blog kapakları için uyguladığı hâli).
if (process.env.NODE_ENV === "development") {
  const knownSlugs = new Set(staff.map((member) => member.slug));
  const orphans = [...getStaffPhotoIndex().keys()].filter((slug) => !knownSlugs.has(slug));
  if (orphans.length > 0) {
    console.warn(
      `[kadro] public/images/kadro içinde hiçbir kadro üyesiyle eşleşmeyen fotoğraf(lar): ${orphans.join(", ")}`,
    );
  }
}
