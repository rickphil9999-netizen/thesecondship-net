import { createFileRoute, Link } from "@tanstack/react-router";
import { Rss } from "lucide-react";
import { NEWS } from "@/data/news";
import { BLOG_PAGES, BLOG_POSTS, blogPostsByYear } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog | Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Launch notes, excerpts, and work-in-progress posts from Richard Phillips.",
      },
    ],
    links: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Richard Phillips Blog",
        href: "/blog/rss.xml",
      },
    ],
  }),
});

function BlogPage() {
  const years = blogPostsByYear();
  const first = BLOG_POSTS[BLOG_POSTS.length - 1];

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        In progress
      </p>
      <h1 className="mt-3 font-display text-5xl">Blog</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Draft excerpts, launch days, and the long work of the next book. Every
        post from the original Rho Agenda blog now lives here, going back to{" "}
        {first ? first.dateLabel : "2009"}.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <span>
          {BLOG_POSTS.length} posts · {years.length} years
        </span>
        <a
          href="/blog/rss.xml"
          className="inline-flex items-center gap-2 hover:text-foreground"
        >
          <Rss className="size-4" /> RSS feed
        </a>
      </div>

      <section aria-labelledby="featured" className="mt-12">
        <h2
          id="featured"
          className="font-sans text-xs font-normal uppercase tracking-[0.28em] text-muted-foreground"
        >
          Featured
        </h2>
        <ol className="mt-4 flex flex-col gap-4">
          {NEWS.map((item) => (
            <li key={item.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: item.slug }}
                className="block rounded-xl border border-border bg-card p-6 hover:bg-muted"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {item.dek}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <nav
        aria-label="Years"
        className="mt-16 flex flex-wrap gap-x-4 gap-y-2 border-y border-border py-4 text-sm text-muted-foreground"
      >
        {years.map(({ year }) => (
          <a key={year} href={`#year-${year}`} className="hover:text-foreground">
            {year}
          </a>
        ))}
        <a href="#pages" className="hover:text-foreground">
          Pages
        </a>
      </nav>

      <div className="mt-4 flex flex-col">
        {years.map(({ year, posts }) => (
          <section
            key={year}
            id={`year-${year}`}
            aria-labelledby={`year-${year}-h`}
            className="scroll-mt-24 border-b border-border py-10 lg:grid lg:grid-cols-[160px_1fr] lg:gap-10"
          >
            <h2
              id={`year-${year}-h`}
              className="font-display text-4xl text-muted-foreground lg:sticky lg:top-24 lg:self-start"
            >
              {year}
            </h2>
            <ol className="mt-4 flex flex-col gap-1 lg:mt-0">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group -mx-3 block rounded-lg px-3 py-3 hover:bg-muted"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                      <time
                        dateTime={post.date}
                        className="shrink-0 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:w-44"
                      >
                        {post.dateLabel}
                      </time>
                      <div className="min-w-0">
                        <h3 className="font-display text-xl leading-snug group-hover:underline group-hover:underline-offset-4">
                          {post.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                        {post.commentCount > 0 ? (
                          <p className="mt-1 text-xs text-muted-foreground/80">
                            {post.commentCount}{" "}
                            {post.commentCount === 1 ? "comment" : "comments"}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section
          id="pages"
          aria-labelledby="pages-h"
          className="scroll-mt-24 py-10 lg:grid lg:grid-cols-[160px_1fr] lg:gap-10"
        >
          <h2
            id="pages-h"
            className="font-display text-4xl text-muted-foreground lg:sticky lg:top-24 lg:self-start"
          >
            Pages
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-0">
            {BLOG_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: page.slug }}
                  className="block h-full rounded-xl border border-border bg-card p-5 hover:bg-muted"
                >
                  <h3 className="font-display text-xl leading-snug">
                    {page.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {page.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
