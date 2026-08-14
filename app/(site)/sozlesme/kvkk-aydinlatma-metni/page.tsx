import { ComingSoon } from "@/components/ui/ComingSoon";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: "Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.",
  path: "/sozlesme/kvkk-aydinlatma-metni",
  noIndex: true,
});

export default function KvkkPage() {
  return (
    <ComingSoon
      eyebrow="Yasal"
      title="KVKK Aydınlatma Metni"
      description="Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metnimiz kurumumuz tarafından hazırlanmaktadır ve yayına alınana kadar bu sayfa güncellenecektir."
    />
  );
}
