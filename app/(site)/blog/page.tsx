import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/blog"),
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
          <PageHero {...getRoute("/blog")} description={undefined} breadcrumb={getBreadcrumbTrail("/blog")} />
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
