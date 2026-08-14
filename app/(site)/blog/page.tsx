import Link from "next/link";
import { AngleMark } from "@/components/ui/AngleMark";
import { Container } from "@/components/ui/Container";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Eğitim, gelişim ve okul hayatı üzerine yazılarımız.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <div className="flex items-center gap-2">
            <AngleMark className="h-5 w-5" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate">Blog</span>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink md:text-5xl">
            Blog Paylaşımları
          </h1>
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 bg-chalk p-8 transition-colors hover:bg-ink"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <time
                    dateTime={post.date}
                    className="font-mono text-xs uppercase tracking-wide text-signal"
                  >
                    {dateFormatter.format(new Date(post.date))}
                  </time>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wide text-slate group-hover:text-chalk/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-2xl font-semibold text-ink group-hover:text-chalk">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate group-hover:text-chalk/75">
                  {post.description}
                </p>
                <span className="mt-auto font-mono text-xs uppercase tracking-wide text-signal">
                  Devamını Oku →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
