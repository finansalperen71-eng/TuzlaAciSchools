import Link from "next/link";
import { type BreadcrumbItem } from "@/content/routes";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  tone?: "ink" | "chalk";
};

export function Breadcrumb({ items, tone = "ink" }: BreadcrumbProps) {
  if (items.length === 0) return null;

  const linkClass = tone === "chalk" ? "text-chalk/60 hover:text-chalk" : "text-slate hover:text-signal";
  const currentClass = tone === "chalk" ? "text-chalk" : "text-ink";
  const separatorClass = tone === "chalk" ? "text-chalk/30" : "text-slate/40";

  return (
    <nav aria-label="Sayfa yolu">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.2em]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-x-2">
              {index > 0 ? (
                <span aria-hidden="true" className={separatorClass}>
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className={currentClass}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`transition-colors ${linkClass}`}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
