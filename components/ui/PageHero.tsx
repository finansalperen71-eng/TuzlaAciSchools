import { type ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { type BreadcrumbItem } from "@/content/routes";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  eyebrowTone?: "slate" | "signal";
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  /** CTA satırı veya ek içerik — h1/description'ın hemen altına gelir. */
  children?: ReactNode;
};

// Sayfa üstü ortak blok: breadcrumb + eyebrow + h1 + açıklama. Kasıtlı olarak
// kendi <section>/<Container>'ını basmaz — bazı sayfalar bunu tek sütunlu bir
// border-b bölümü içinde kullanır (blog, başarılarımız), bazıları kendi özel
// grid düzeninin (iletişim, erken kayıt) bir parçası olarak. Yerleşimi çağıran
// sayfa belirler, PageHero yalnızca içeriği tutarlı üretir.
export function PageHero({
  title,
  eyebrow,
  eyebrowTone = "slate",
  description,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <div className="flex flex-col gap-6">
      {breadcrumb && breadcrumb.length > 0 ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumb)) }}
          />
          <Breadcrumb items={breadcrumb} />
        </>
      ) : null}

      {eyebrow ? (
        <span
          className={`font-mono text-xs uppercase tracking-[0.2em] ${
            eyebrowTone === "signal" ? "text-signal-deep" : "text-slate"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}

      <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">{title}</h1>

      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate md:text-lg">{description}</p>
      ) : null}

      {children}
    </div>
  );
}
