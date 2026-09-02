import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { PostCard } from "@/components/blog/PostCard";
import { getBreadcrumbTrail, getRoute } from "@/content/routes";
import { getAllPosts } from "@/lib/mdx";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  ...getRoute("/blog"),
  path: "/blog",
});

// Container max-w-7xl (1280px), yani iki sütunda bir slot asla ~620px'i
// geçmiyor; naif "50vw" 1920px ekranda gereksiz yere 960px'lik görsel çekerdi.
const CARD_SIZES = "(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw";

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
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                sizes={CARD_SIZES}
                priority={index === 0}
                showExcerpt
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
