import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-signal text-ink hover:bg-[color-mix(in_srgb,var(--color-signal)_85%,var(--color-ink))]",
  secondary:
    "bg-transparent text-chalk border border-chalk/60 hover:border-chalk",
  ghost: "bg-transparent text-ink border border-ink/20 hover:border-ink",
};

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wide transition-colors";

type LinkButtonProps = BaseProps & {
  href: string;
};

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  href,
  ...rest
}: LinkButtonProps | (BaseProps & { href?: undefined } & NativeButtonProps)) {
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
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
