import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";
import { CoverPlate } from "./CoverPlate";
import { ACCENT_CHIP, accentForPost } from "./accent";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type PostCardProps = {
  post: PostMeta;
  /** Yalnızca kıvrımın üstündeki ilk kart. */
  priority?: boolean;
  /** Sütun sayısını ızgara bilir, kart bilmez. */
  sizes?: string;
  /** Liste sayfasında tarih + açıklama; anasayfa teaser'ında yok. */
  showExcerpt?: boolean;
};

// Anasayfa ve /blog tek bir karttan besleniyor. className prop'u bilinçli
// olarak yok: iki sayfanın kart tasarımının yeniden ayrışmasına izin veren
// kapı orasıydı. Sütun sayısı ızgaranın işi, kart h-full ile uyum sağlar.
//
// Hover'da eski "tüm kartı laciverte çevir" davranışı yok — renkli bir fotoğraf
// lacivert zemin üzerinde render hatası gibi duruyordu ve eşli group-hover
// sınıflarının bir kısmı hiç yazılmadığı için kırmızı-üstüne-lacivert
// (kontrast ~3.0) çiftler oluşuyordu. Yerine yükselme + görselde hafif zoom.
export function PostCard({
  post,
  priority = false,
  sizes = "100vw",
  showExcerpt = false,
}: PostCardProps) {
  const accent = accentForPost(post);
  const tag = post.tags[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* rounded-t-card ayrıca burada: Safari, transform'lanan bir çocuğu
          ebeveynin overflow-hidden'ı ile kırparken köşeleri sızdırıyor. */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-card">
        {post.cover ? (
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="transition-transform duration-500 group-hover:scale-[1.04]">
            <CoverPlate slug={post.slug} accent={accent} />
          </div>
        )}

        {/* Başlık görselin üzerinde okunuyor. Kararma bilinçli olarak alt
            yarıya sınırlı: tüm yüzeye yayılan bir perde, kapak yedeğindeki
            dekor plakasını boğup kartın üstünü düz laciverde çeviriyordu.
            Alt %55'te opaklık yeterli, üst yarı görsel için temiz kalıyor. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 from-0% via-ink/45 via-28% to-transparent to-58%" />

        {tag ? (
          <span
            className={`absolute left-4 top-4 rounded-control px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wide ${ACCENT_CHIP[accent]}`}
          >
            {tag}
          </span>
        ) : null}

        <h3 className="absolute inset-x-4 bottom-4 font-display text-lg font-semibold leading-snug text-chalk">
          {post.title}
        </h3>
      </div>

      {showExcerpt ? (
        <div className="flex flex-1 flex-col gap-3 p-6">
          <time
            dateTime={post.date}
            className="font-mono text-xs uppercase tracking-wide text-slate"
          >
            {dateFormatter.format(new Date(post.date))}
          </time>
          {/* Sabit oranlı kapağın altında düzensiz açıklama yüksekliği satırı
              bozuk gösteriyor — clamp her yerde zorunlu. */}
          <p className="line-clamp-3 text-sm leading-relaxed text-slate">
            {post.description}
          </p>
          <span className="mt-auto font-mono text-xs uppercase tracking-wide text-signal-deep">
            Devamını Oku →
          </span>
        </div>
      ) : null}
    </Link>
  );
}
