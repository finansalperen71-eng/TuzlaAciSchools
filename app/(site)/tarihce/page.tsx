import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tarihçe",
  description: "Tuzla Açı Koleji'nin tarihçesi.",
  path: "/tarihce",
  noIndex: true,
});

export default function TarihcePage() {
  return (
    <ComingSoon
      eyebrow="Kurumsal"
      title="Tarihçemiz"
      description="Kurumumuzun tarihçesi hazırlanıyor ve yakında bu sayfada yer alacak."
      action={{ href: "/hakkimizda", label: "Hakkımızda Sayfasına Git" }}
    />
  );
}
