import { AngleMark } from "@/components/ui/AngleMark";
import { Container } from "@/components/ui/Container";
import { ErkenKayitForm } from "@/components/forms/ErkenKayitForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Erken Kayıt",
  description: "Erken kayıt kontenjanları sınırlıdır. Bilgileri eksiksiz doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.",
  path: "/erken-kayit",
});

export default function ErkenKayitPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
              Kontenjanlar Sınırlı
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            Erken Kayıt
          </h1>
          <p className="text-base leading-relaxed text-slate md:text-lg">
            Erken kayıt kontenjanları sınırlıdır. Bilgileri eksiksiz doldurun, ekibimiz en kısa
            sürede sizinle iletişime geçsin.
          </p>
        </div>

        <div className="border border-line p-6 md:p-10">
          <ErkenKayitForm />
        </div>
      </Container>
    </section>
  );
}
