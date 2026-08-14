import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { site } from "@/content/site";
import { legalNav } from "@/content/navigation";
import { routes, type RoutePath } from "@/content/routes";

// Footer bağlantıları menünün birebir kopyası değil: tek sütunda 16 madde
// dağınık okunuyordu. Burada veliye göre üç anlamlı gruba ayrıldı.
function link(href: RoutePath) {
  return { label: routes[href].label, href };
}

const footerGroups = [
  {
    label: "Kurumsal",
    items: [
      link("/hakkimizda"),
      link("/neden-aci-egitim-kurumlari"),
      link("/tarihce"),
      link("/kadromuz"),
      link("/insan-kaynaklari"),
    ],
  },
  {
    label: "Eğitim",
    items: [link("/anaokulu"), link("/ilkokul"), link("/ortaokul"), link("/basarilarimiz")],
  },
  {
    label: "Kayıt ve Medya",
    items: [
      link("/erken-kayit"),
      link("/kayit-sureci"),
      link("/fotograf-galerisi"),
      link("/video-galerisi"),
      link("/blog"),
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-chalk">
      <Container className="grid gap-x-10 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-5">
          <Logo tone="chalk" />
          <p className="max-w-xs text-sm leading-relaxed text-chalk/70">{site.slogan}</p>
          <div className="flex flex-col gap-2 text-sm text-chalk/70">
            <address className="not-italic leading-relaxed">{site.address.full}</address>
            <a href={`tel:${site.phoneHref}`} className="w-fit font-mono hover:text-chalk">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="w-fit hover:text-chalk">
              {site.email}
            </a>
          </div>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.label} aria-label={group.label} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-chalk/50">
              {group.label}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-chalk/75 hover:text-chalk">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-chalk/15">
        <Container className="flex flex-col gap-4 py-6 text-xs text-chalk/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Tüm hakları saklıdır.
          </p>
          <nav aria-label="Yasal bağlantılar" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-chalk">
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
