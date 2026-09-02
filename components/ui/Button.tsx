import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

// primary zemini signal yerine signal-deep: bg-signal + text-ink yalnızca 3.03
// kontrast veriyordu (beyaz metinle bile 4.21), yani sitenin ana CTA'sı AA'yı
// düşürüyordu. signal-deep + beyaz ~5.2 ile geçiyor.
const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-signal-deep text-white hover:bg-[color-mix(in_srgb,var(--color-signal-deep)_85%,var(--color-ink))]",
  secondary:
    "bg-transparent text-chalk border border-chalk/60 hover:border-chalk",
  ghost: "bg-transparent text-ink border border-ink/20 hover:border-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";

type LinkButtonProps = BaseProps & {
  href: string;
  /** Dış bağlantı: next/link yerine düz <a> + yeni sekme. */
  external?: boolean;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  external = false,
  ...rest
}: LinkButtonProps | (BaseProps & { href?: undefined; external?: undefined } & NativeButtonProps)) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    // Dış bağlantılar next/link ile çalışmadığı için sayfalar bu sınıfları
    // elle kopyalıyordu; o kopyalar buradaki değişiklikleri takip etmiyordu.
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as NativeButtonProps)}>
      {children}
    </button>
  );
}
