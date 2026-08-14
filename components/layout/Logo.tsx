import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  tone?: "ink" | "chalk";
  className?: string;
};

// Gerçek Açı Koleji marka logosu (tuzlaacikoleji.com.tr'den alınan orijinal
// varlıklar): açık zeminde renkli logo, koyu zeminde (Footer) beyaz varyant.
export function Logo({ tone = "ink", className = "" }: LogoProps) {
  if (tone === "chalk") {
    return (
      <Link href="/" className={`flex items-center ${className}`} aria-label="Tuzla Açı Koleji anasayfa">
        <Image
          src="/images/brand/aci-koleji-logo-white.png"
          alt="Tuzla Açı Koleji"
          width={496}
          height={100}
          className="h-12 w-auto"
          priority
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="Tuzla Açı Koleji anasayfa">
      <Image
        src="/images/brand/aci-koleji-logo.png"
        alt="Tuzla Açı Koleji"
        width={3403}
        height={1231}
        className="h-14 w-auto md:h-16"
        priority
      />
    </Link>
  );
}
