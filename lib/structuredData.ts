import { site } from "@/content/site";
import { type BreadcrumbItem } from "@/content/routes";

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function getSchoolJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);

  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["School", "LocalBusiness"],
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.streetAddress,
      addressLocality: site.address.addressLocality,
      addressRegion: site.address.addressRegion,
      addressCountry: site.address.addressCountry,
    },
  };

  if (site.geo.latitude !== null && site.geo.longitude !== null) {
    json.geo = {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    };
  }

  if (site.openingHours.length > 0) {
    json.openingHoursSpecification = site.openingHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.dayOfWeek,
      opens: entry.opens,
      closes: entry.closes,
    }));
  }

  if (sameAs.length > 0) {
    json.sameAs = sameAs;
  }

  return json;
}
