import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getBreadcrumbTrail } from "@/content/routes";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";
import { getBreadcrumbJsonLd } from "@/lib/structuredData";

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type PageParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageParams) {
  const { slug } = await params;
  const posts = getAllPosts();
  const exists = posts.some((post) => post.slug === slug);
  if (!exists) return {};

  const post = getPostBySlug(slug);
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const posts = getAllPosts();
  const exists = posts.some((post) => post.slug === slug);
  if (!exists) notFound();

  const post = getPostBySlug(slug);
  const breadcrumb = [...getBreadcrumbTrail("/blog"), { label: post.title, href: `/blog/${post.slug}` }];

  return (
    <article>
      <section className="border-b border-line">
        <Container narrow className="flex flex-col gap-6 py-16 md:py-20">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumb)) }}
          />
          <Breadcrumb items={breadcrumb} />
          <time dateTime={post.date} className="font-mono text-xs uppercase tracking-[0.2em] text-slate">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="font-display text-3xl font-semibold text-ink md:text-5xl">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-slate md:text-lg">{post.description}</p>
          {post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs uppercase tracking-wide text-signal">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section>
        <Container narrow className="py-16 md:py-20">
          <div
            className="flex flex-col gap-5 text-base leading-relaxed text-slate md:text-lg
              [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink
              [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6
              [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2"
          >
            <MDXRemote source={post.content} />
          </div>
        </Container>
      </section>
    </article>
  );
}
