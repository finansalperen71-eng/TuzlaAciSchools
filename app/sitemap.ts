import type { MetadataRoute } from "next";
import { routes, type RouteMeta } from "@/content/routes";
import { site } from "@/content/site";
import { getPostSlugs } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  // noIndex sayfalar (taslak hukuki metinler, henüz içeriği olmayan
  // tarihçe/kadromuz) sitemap'ten hariç tutulur — aksi halde meta robots
  // noindex ile sitemap'e ekleme birbirine çelişen sinyal olur.
  const pageEntries = (Object.entries(routes) as [string, RouteMeta][])
    .filter(([, route]) => !route.noIndex)
    .map(([path]) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    }));

  const blogEntries = getPostSlugs().map((slug) => ({
    url: `${site.url}/blog/${slug}`,
    lastModified: new Date(),
  }));

  return [...pageEntries, ...blogEntries];
}
