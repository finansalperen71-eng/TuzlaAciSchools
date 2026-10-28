"use client";

import Image from "next/image";
import { useState } from "react";

type YouTubeProps = {
  id: string;
  title: string;
  channel?: string;
  duration?: string;
  caption?: string;
  // Altyazı dili (ör. "tr"). Verilirse altyazı varsayılan olarak açılır.
  subtitles?: string;
};

// Tıklanana kadar yalnızca kapak görseli gösterilir; YouTube oynatıcısı
// (ve onunla gelen üçüncü taraf istekleri) ziyaretçi oynat'a basınca
// youtube-nocookie.com üzerinden yüklenir. Kapak görseli next/image ile
// sunucudan geçtiği için ziyaretçinin tarayıcısı o ana kadar Google'a
// hiç istek atmaz.
export function YouTube({ id, title, channel, duration, caption, subtitles }: YouTubeProps) {
  const [playing, setPlaying] = useState(false);
  // Bazı eski videolarda maxresdefault yok; o durumda hqdefault'a düşülür.
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  const params = new URLSearchParams({ autoplay: "1", rel: "0", hl: "tr" });
  if (subtitles) {
    params.set("cc_load_policy", "1");
    params.set("cc_lang_pref", subtitles);
  }

  const meta = [channel, duration].filter(Boolean).join(" · ");

  return (
    <figure className="my-4 flex flex-col gap-3">
      <div className="relative aspect-video overflow-hidden rounded-card border border-line bg-ink shadow-card">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?${params}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Videoyu oynat: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer text-left"
          >
            <Image
              src={thumb}
              alt=""
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 via-45% to-ink/10" />
            <span className="absolute top-[42%] left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-control bg-signal text-chalk shadow-card transition-transform duration-300 group-hover:scale-110 sm:top-1/2 md:h-20 md:w-20">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-5 w-5 md:ml-1 md:h-8 md:w-8">
                <path d="M7 4.5v15L19.5 12z" fill="currentColor" />
              </svg>
            </span>
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 md:p-6">
              {meta ? (
                <span className="hidden font-mono text-xs uppercase tracking-wide text-chalk/75 sm:block">
                  {meta}
                </span>
              ) : null}
              <span className="font-display text-sm font-semibold text-chalk sm:text-base md:text-xl">
                {title}
              </span>
            </span>
          </button>
        )}
      </div>
      {caption ? <figcaption className="text-sm leading-relaxed text-slate">{caption}</figcaption> : null}
    </figure>
  );
}
