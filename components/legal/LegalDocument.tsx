import { type LegalSection } from "@/content/legal";

type LegalDocumentProps = {
  sections: LegalSection[];
};

// Taslak uyarısı kasıtlı olarak burada, tek yerde basılır: üç hukuki
// sayfanın (KVKK, gizlilik, çerez) hepsi bu bileşeni kullanır, uyarı
// unutulamaz. Bkz. content/legal.ts'teki not.
export function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="border-l-2 border-signal bg-chalk py-3 pl-6 text-sm leading-relaxed text-slate">
        Bu metin taslak niteliğindedir ve hukuki onay sürecindedir. Kurumun hukuk danışmanı
        tarafından onaylanana kadar bağlayıcı değildir.
      </div>

      {sections.map((section) => (
        <div key={section.heading} className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-ink">{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
