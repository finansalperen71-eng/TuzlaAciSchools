import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeacherCard } from "@/components/staff/TeacherCard";
import { getStaffByGroup, STAFF_GROUP_LABEL } from "@/content/institution";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/kadromuz"),
  path: "/kadromuz",
});

// Container max-w-7xl (1280px) − px-6 md:px-10 (~80px) − 3 × gap-6 (72px)
// ≈ 282px/kart en geniş kırılımda. Daha dar kırılımlarda sütun sayısını
// grid zaten azaltıyor, sizes onu izliyor (bkz. /blog'daki CARD_SIZES notu).
const CARD_SIZES =
  "(min-width: 1280px) 282px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

const EMPTY_DESCRIPTION =
  "Yönetim ve öğretmen kadromuz hazırlanıyor ve yakında bu sayfada yer alacak.";

export default function KadromuzPage() {
  const groups = getStaffByGroup();
  const hasStaff = groups.length > 0;

  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <PageHero
            {...getRoute("/kadromuz")}
            description={hasStaff ? getRoute("/kadromuz").description : EMPTY_DESCRIPTION}
            breadcrumb={getBreadcrumbTrail("/kadromuz")}
          />
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-14 py-16 md:py-20">
          {hasStaff ? (
            groups.map(({ group, members }) => (
              <div key={group} className="flex flex-col gap-8">
                <SectionHeading eyebrow="Kadromuz" title={STAFF_GROUP_LABEL[group]} />
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                  {members.map((member) => (
                    <TeacherCard key={member.slug} member={member} sizes={CARD_SIZES} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-start gap-6">
              <p className="max-w-xl text-base leading-relaxed text-slate">
                Kadromuz sayfası hazırlanıyor. Bu arada kurumumuz hakkında daha fazla bilgi
                edinmek isterseniz aşağıdaki sayfayı ziyaret edebilirsiniz.
              </p>
              <Button href="/hakkimizda" variant="ghost">
                Hakkımızda Sayfasına Git
              </Button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
