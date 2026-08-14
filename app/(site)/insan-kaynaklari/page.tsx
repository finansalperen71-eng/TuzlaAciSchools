import { AngleMark } from "@/components/ui/AngleMark";
import { Container } from "@/components/ui/Container";
import { IsBasvuruForm } from "@/components/forms/IsBasvuruForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "İnsan Kaynakları",
  description: "Tuzla Açı Koleji ile çalışmak ister misiniz? İş başvurusu formunu doldurun.",
  path: "/insan-kaynaklari",
});

export default function InsanKaynaklariPage() {
  return (
    <section>
      <Container narrow className="flex flex-col gap-10 py-16 md:py-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">
              İnsan Kaynakları
            </span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            Bizimle Çalışmak İster misiniz?
          </h1>
          <p className="text-base leading-relaxed text-slate md:text-lg">
            İş Başvurusu Formu&apos;nu doldurarak başvuruda bulunabilirsiniz.
          </p>
        </div>

        <div className="border border-line p-6 md:p-10">
          <IsBasvuruForm />
        </div>
      </Container>
    </section>
  );
}
