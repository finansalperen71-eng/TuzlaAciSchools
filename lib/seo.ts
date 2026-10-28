import type { Metadata } from "next";
import { site } from "@/content/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  // Sosyal medya paylaşım görseli (ör. blog kapağı); site köküne göre yol.
  image?: { src: string; alt: string };
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  image,
}: BuildMetadataInput): Metadata {
  const url = `${site.url}${path}`;
  const images = image ? [{ url: `${site.url}${image.src}`, alt: image.alt }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "tr_TR",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
