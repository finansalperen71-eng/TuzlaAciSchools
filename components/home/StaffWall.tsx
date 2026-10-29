import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staff } from "@/content/institution";
import { photoFor } from "@/lib/staff";

// Anasayfadaki "Açı Ailesi" portre duvarı. /kadromuz'daki kademe
// bölümlerinin aksine burada başlık, renk ya da sıra farkı yok: herkes
// alfabetik ve aynı boyutta. Buradaki mesaj "kim hangi kademede" değil
// "bu okulun insanları" — kademe ayrımı /kadromuz'da kalıyor.
//
// Fotoğrafı olmayan üye duvara alınmaz: baş harf plakası bir portre
// duvarında boşluk gibi okunur. Fotoğrafı gelince kendiliğinden eklenir.
export function StaffWall() {
  const members = staff
    .map((member) => ({ ...member, photo: photoFor(member.slug) }))
    .filter((member): member is typeof member & { photo: string } => member.photo !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "tr"));

  if (members.length === 0) return null;

  return (
    <section className="border-b border-line">
      <Container className="flex flex-col items-center gap-12 py-20 md:py-24">
        <SectionHeading
          eyebrow="Kadromuz"
          title="Açı Ailesi"
          description="Öğrencilerimizin her gün birlikte yol yürüdüğü eğitimciler."
          align="center"
        />

        {/* Mobilde yatay kaydırmalı tek şerit (21 portre alt alta çok uzun
            bir sayfa yapardı); sm'den itibaren ortalanmış sarmal satırlar,
            lg'de 7'li ızgara — 21 kişi tam üç eşit satır. */}
        <ul className="-mx-6 flex w-[calc(100%+3rem)] snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:w-full sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid lg:grid-cols-7 lg:gap-x-4">
          {members.map((member) => (
            <li
              key={member.slug}
              className="flex w-28 shrink-0 snap-start flex-col items-center gap-2 text-center sm:w-32 lg:w-auto"
            >
              <div className="rounded-full bg-gradient-to-br from-signal to-ink p-1">
                <div className="relative size-24 overflow-hidden rounded-full border-[3px] border-chalk md:size-28">
                  {/* İsim hemen altta yazılı; alt metni tekrar etmek ekran
                      okuyucuda ismi iki kez okutur (bkz. kadromuz kartları). */}
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover object-[50%_18%]"
                  />
                </div>
              </div>
              <span className="font-display text-sm font-semibold leading-snug text-ink">
                {member.name}
              </span>
              <span className="text-xs leading-snug text-slate">{member.branch}</span>
            </li>
          ))}
        </ul>

        <Button href="/kadromuz" variant="ghost">
          Kadromuzu Tanıyın
        </Button>
      </Container>
    </section>
  );
}
