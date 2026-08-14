import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kayıt Süreci",
  description: "Tuzla Açı Koleji kayıt süreci ve şartları.",
  path: "/kayit-sureci",
  noIndex: true,
});

export default function KayitSureciPage() {
  return (
    <ComingSoon
      eyebrow="Kayıt"
      title="Kayıt Süreci"
      description="Kayıt şartları ve süreciyle ilgili detaylı bilgi hazırlanıyor. Kayıt başvurunuzu şimdiden başlatmak için erken kayıt formunu doldurabilirsiniz."
      action={{ href: "/erken-kayit", label: "Erken Kayıt Başvurusu" }}
    />
  );
}
