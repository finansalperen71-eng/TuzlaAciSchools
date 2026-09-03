import { ACCENT_PLATE_BG, ACCENT_TEXT, type Accent } from "@/components/blog/accent";

type InitialsPlateProps = {
  name: string;
  accent: Accent;
};

// Fotoğrafı henüz olmayan bir kadro üyesi için yedek. CoverPlate'teki maskeli
// nesne sprite'ları (eğitim/mezuniyet/defter/yapboz) burada uygun değil — bir
// insanın yerine yapboz parçası koymak yanlış okunur ve public/decor'da insan
// silüeti de yok. Gmail/Slack konvansiyonuna uyan baş harf monogramı, bir
// kişi için doğru yedek.
//
// Gerçek fotoğrafla aynı kutuda render olur (aspect oranını TeacherCard
// verir), bu yüzden fotoğraf eklendiğinde sıfır layout kayması olur.
export function InitialsPlate({ name, accent }: InitialsPlateProps) {
  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-center justify-center ${ACCENT_PLATE_BG[accent]}`}
    >
      <span className={`font-display text-3xl font-semibold md:text-4xl ${ACCENT_TEXT[accent]}`}>
        {getInitials(name)}
      </span>
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";

  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";

  // toUpperCase() Türkçe "i" harfini yanlış büyütür ("ilker" -> "ILKER" değil
  // "İLKER" beklenir); toLocaleUpperCase("tr-TR") doğru dönüşümü yapar.
  return (first + last).toLocaleUpperCase("tr-TR");
}
