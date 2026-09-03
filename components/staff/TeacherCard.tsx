import Image from "next/image";
import type { StaffGroup, StaffMember } from "@/content/institution";
import { ACCENT_TEXT, type Accent } from "@/components/blog/accent";
import { photoFor } from "@/lib/staff";
import { InitialsPlate } from "./InitialsPlate";

// Branşa göre değil kademeye göre eşlenir: branş listesi sürekli büyür ve
// her yeni branş renksiz kalır (haritada yoksa yedek renk hash'e düşer,
// bu da kademe içindeki kartların birbirinden habersiz renklenmesi demek).
// Kademe sabit dörtlü, her biri sayfada zaten kendi başlığı altında.
const GROUP_ACCENT: Record<StaffGroup, Accent> = {
  yonetim: "lilac",
  anaokulu: "honey",
  ilkokul: "sky",
  ortaokul: "teal",
};

type TeacherCardProps = {
  member: StaffMember;
  sizes: string;
};

// PostCard'ın kart kabuğu (rounded-card + border + shadow-card) referans
// alındı, ama üç bilinçli sapma var:
// 1. <div>, <Link> değil — öğretmenin tıklanabilir bir detay sayfası yok.
// 2. Hover yükselmesi yok — tıklanamayan bir kartta hover:-translate-y
//    tıklanabilirlik vaat eder, yanlış sinyal.
// 3. İsim fotoğrafın altında, üstünde perde ile değil — blog'da görsel
//    atmosferik ve başlık içerik; burada tersi geçerli, fotoğraf içeriğin
//    kendisi, isim etiket. Karartma perdesi bu yüzden gereksiz.
export function TeacherCard({ member, sizes }: TeacherCardProps) {
  const photo = photoFor(member.slug);
  const accent = GROUP_ACCENT[member.group];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
      {/* rounded-t-card ayrıca burada: Safari, transform'lanan bir çocuğu
          ebeveynin overflow-hidden'ı ile kırparken köşeleri sızdırıyor
          (bkz. PostCard'daki aynı not). */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-card">
        {photo ? (
          <Image
            src={photo}
            alt={member.name}
            fill
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <InitialsPlate name={member.name} accent={accent} />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-ink">
          {member.name}
        </h3>
        <p className={`font-mono text-xs uppercase tracking-wide ${ACCENT_TEXT[accent]}`}>
          {member.branch}
        </p>
      </div>
    </div>
  );
}
