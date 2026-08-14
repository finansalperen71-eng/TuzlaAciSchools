import Link from "next/link";
import { marqueeItems } from "@/content/announcements";

function MarqueeCopy({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex min-w-full shrink-0 items-center justify-around gap-10 py-2.5 font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap"
    >
      {marqueeItems.map((item, index) => (
        <li key={index} className="flex items-center gap-3">
          {item.href ? (
            <Link
              href={item.href}
              tabIndex={duplicate ? -1 : undefined}
              className="text-chalk transition-colors hover:text-chalk/70"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-chalk">{item.label}</span>
          )}
          <span aria-hidden="true" className="text-chalk/30">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

// Header'ın üstünde, sonsuz döngüde akan duyuru şeridi. Sıfır JS: döngü
// globals.css'teki .marquee-track keyframe animasyonuyla sağlanır — iki eş
// kopya yan yana durur, track -50% kaydırılır (tam bir kopya genişliği),
// böylece dikiş görünmeden baştan başlar. Header'ın sticky/z-index
// mantığına dokunmaz; şerit scroll ile birlikte akıp gider, sabitlenmez
// (bkz. plan: Header zaten sticky top-0, ikisini üst üste sabitlemek
// mobilde kalıcı ~8.5rem yer kaplardı).
export function Marquee() {
  return (
    <div className="bg-ink text-chalk">
      <div className="marquee-viewport overflow-hidden" role="region" aria-label="Duyurular">
        <div className="marquee-track flex">
          <MarqueeCopy />
          <MarqueeCopy duplicate />
        </div>
      </div>
    </div>
  );
}
