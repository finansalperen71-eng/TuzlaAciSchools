import {
  ACCENT_PLATE_BG,
  ACCENT_PLATE_MARK,
  hashString,
  type Accent,
} from "./accent";

const SPRITES = ["education", "graduation", "notebook", "puzzle"] as const;

type CoverPlateProps = {
  slug: string;
  accent: Accent;
};

// Kapak fotoğrafı henüz yokken devreye giren yedek. Gri kutu ya da "görsel yok"
// ikonu değil: sitenin kendi kelime dağarcığı — public/decor'daki maskeli SVG'ler
// aksan renginde, DecorField ile birebir aynı teknikle (bg-* + mask-image).
// Sprite slug'dan deterministik seçilir, yani her yazı farklı ama sabit bir
// plaka alır; hydration uyuşmazlığı ve ekstra ağ isteği yok.
//
// Gerçek fotoğrafla aynı kutuda render olur (aspect oranını ebeveyn verir), bu
// yüzden fotoğraf eklendiğinde sıfır layout kayması olur — kartın fotoğraflar
// gelmeden gönderilebilir olmasını sağlayan özellik bu.
export function CoverPlate({ slug, accent }: CoverPlateProps) {
  const sprite = SPRITES[hashString(slug) % SPRITES.length];

  return (
    <div
      aria-hidden
      className={`flex h-full w-full items-center justify-center ${ACCENT_PLATE_BG[accent]}`}
    >
      <span
        className={`block h-20 w-20 opacity-70 md:h-24 md:w-24 ${ACCENT_PLATE_MARK[accent]} [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]`}
        style={{
          WebkitMaskImage: `url(/decor/${sprite}.svg)`,
          maskImage: `url(/decor/${sprite}.svg)`,
        }}
      />
    </div>
  );
}
