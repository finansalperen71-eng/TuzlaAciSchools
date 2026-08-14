type AngleMarkProps = {
  className?: string;
  variant?: "signal" | "chalk" | "ink";
};

/**
 * Sitenin tek dekoratif işareti: 30°'lik açı motifi.
 * Bölüm başlıklarında, kart hover/focus durumunda ve hero çerçevesinde kullanılır.
 */
export function AngleMark({ className, variant = "signal" }: AngleMarkProps) {
  const stroke =
    variant === "signal"
      ? "var(--color-signal)"
      : variant === "chalk"
        ? "var(--color-chalk)"
        : "var(--color-ink)";

  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 32 L4 8 L29.86 24"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
