import { AngleMark } from "@/components/ui/AngleMark";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İletişim",
  description: "Tuzla Açı Koleji ile iletişime geçin.",
  path: "/iletisim",
});

export default function IletisimPage() {
  const mapQuery = encodeURIComponent(site.address.full);

  return (
    <section>
      <Container className="grid gap-16 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">
              İletişim
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            Bize Ulaşın
          </h1>

          <div className="flex flex-col gap-4 text-base text-slate">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink">Adres</p>
              <address className="not-italic leading-relaxed">{site.address.full}</address>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink">Telefon</p>
              <a href={`tel:${site.phoneHref}`} className="font-mono hover:text-signal">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink">E-posta</p>
              <a href={`mailto:${site.email}`} className="hover:text-signal">
                {site.email}
              </a>
            </div>
          </div>

          <div className="aspect-[4/3] border border-line">
            <iframe
              title="Tuzla Açı Koleji Konumu"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl font-semibold text-ink">Mesaj Gönderin</h2>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
