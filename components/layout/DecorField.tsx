import { type CSSProperties } from "react";

// Sayfaların açık (chalk) zeminine dağılan, düşük opaklıkta marka ikonları —
// kitap, mezuniyet, defter, yapboz. Tamamen dekoratif: aria-hidden,
// pointer-events yok, negatif z ile tüm içeriğin arkasında. bg-ink bölümler
// (hero, koyu şeritler, footer CTA'ları) ikonları doğal olarak örter, yani
// yalnızca "beyaz kısımlarda" görünürler.
//
// Yerleşim modül yüklenirken sabit bir tohumla bir kez üretilir: sunucu ve
// istemci aynı sonucu görür, dağılım her render'da yeniden akmaz. Dikey konum
// sabit piksel ritmiyle verilir (viewport'tan bağımsız) — kısa sayfada birkaç
// ikon görünür, uzun sayfada daha fazlası; alta taşanları field'in
// overflow-hidden'ı kırpar. Kenar ikonları sırayla sol/sağ değiştiği için
// ardışık ikonlar asla çakışmaz. Sıfır JS, sıfır animasyon.

type IconName = "education" | "graduation" | "notebook" | "puzzle";

const ICONS: IconName[] = ["education", "graduation", "notebook", "puzzle"];

// mulberry32 — küçük, deterministik PRNG.
function mulberry32(seed: number) {
  return function next() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Sprite = {
  icon: IconName;
  className: string;
  style: CSSProperties;
};

const MASK =
  "block bg-ink [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain] " +
  "[-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] [-webkit-mask-size:contain]";

// Kaç dikey yuva üretilir — sayfadan uzunsa fazlası kırpılır.
const SLOTS = 32;
// Ardışık iki kenar ikonu arası dikey aralık (px).
const STEP = 300;

function buildSprites(): Sprite[] {
  const rand = mulberry32(20_240_902);
  const between = (min: number, max: number) => min + (max - min) * rand();
  const pick = () => ICONS[Math.floor(rand() * ICONS.length)];

  const sprites: Sprite[] = [];

  // Kenarlara yaslı ana dağılım: her ~STEP px'de bir, sol/sağ alternatif,
  // çapraz döndürülmüş, kısmen taşan ikonlar.
  for (let i = 0; i < SLOTS; i += 1) {
    const onLeft = i % 2 === 0;
    // İlk ikon sabit header'ın altında başlasın diye ~120px'lik pay.
    const top = Math.round(120 + i * STEP + between(-46, 46));
    // Kenardan içeri/dışarı: çok hafif taşma olabilir ama ikonun büyük kısmı
    // her zaman ekranda kalır.
    const edge = between(-1, 5);
    const size = between(4, 6);

    sprites.push({
      icon: pick(),
      className: `absolute ${MASK} ${i % 3 === 2 ? "hidden sm:block" : ""}`,
      style: {
        top: `${top}px`,
        [onLeft ? "left" : "right"]: `${edge}%`,
        width: `${size}rem`,
        height: `${size}rem`,
        transform: `rotate(${between(-24, 24)}deg)`,
        opacity: between(0.11, 0.16),
      },
    });
  }

  // İç aksanlar: yalnızca geniş ekranlarda, seyrek ve çok sönük — bir başlığın
  // ya da iki sütun arasındaki boşluğun arkasına düşse bile fark edilmesin.
  for (let j = 0; j < Math.ceil(SLOTS / 3); j += 1) {
    const size = between(3.75, 5.25);

    sprites.push({
      icon: pick(),
      className: `absolute hidden lg:block ${MASK}`,
      style: {
        // Kenar ikonlarının arasına düşsün diye 1.5 adım kaydırılmış başlangıç.
        top: `${Math.round(120 + j * STEP * 3 + STEP * 1.5 + between(-80, 80))}px`,
        left: `${between(40, 58)}%`,
        width: `${size}rem`,
        height: `${size}rem`,
        transform: `rotate(${between(-18, 18)}deg)`,
        opacity: between(0.055, 0.085),
      },
    });
  }

  return sprites;
}

const SPRITES = buildSprites();

export function DecorField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-50 md:opacity-100"
    >
      {SPRITES.map((sprite, index) => (
        <span
          key={index}
          className={sprite.className}
          style={{
            ...sprite.style,
            WebkitMaskImage: `url(/decor/${sprite.icon}.svg)`,
            maskImage: `url(/decor/${sprite.icon}.svg)`,
          }}
        />
      ))}
    </div>
  );
}
