type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "chalk";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const textTone = tone === "chalk" ? "text-chalk" : "text-ink";
  const subTone = tone === "chalk" ? "text-chalk/70" : "text-slate";

  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow ? (
        <span className={`font-mono text-xs uppercase tracking-[0.2em] ${subTone}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-display text-3xl md:text-4xl font-semibold ${textTone}`}>
        {title}
      </h2>
      {description ? (
        <p className={`font-body text-base md:text-lg max-w-2xl ${subTone}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
