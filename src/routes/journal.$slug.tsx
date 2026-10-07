import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JournalComments } from "@/components/journal-comments";
import { Button } from "@/components/ui/button";

const SITE = "https://thesecondship.net";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }) => {
    // Imported lazily so the Journal index data stays out of the main bundle.
    const { getJournalEntry, journalNeighbors, loadJournalContent } =
      await import("@/data/journal");
    const entry = getJournalEntry(params.slug);
    if (!entry) throw notFound();
    const content = await loadJournalContent(entry.slug);
    if (!content) throw notFound();
    const { older, newer } = journalNeighbors(entry.slug);
    return {
      entry,
      content,
      older: older ? { slug: older.slug, title: older.title } : null,
      newer: newer ? { slug: newer.slug, title: newer.title } : null,
    };
  },
  head: ({ loaderData }) => {
    const entry = loaderData?.entry;
    if (!entry) return {};
    const url = `${SITE}/journal/${entry.slug}`;
    const meta = [
      { title: `${entry.title} | Journal | Richard Phillips Novels` },
      { name: "description", content: entry.excerpt.slice(0, 160) },
      { property: "og:type", content: "article" },
      { property: "og:title", content: entry.title },
      { property: "og:description", content: entry.excerpt.slice(0, 200) },
      { property: "og:url", content: url },
      { name: "twitter:title", content: entry.title },
      { name: "twitter:description", content: entry.excerpt.slice(0, 200) },
      { property: "article:published_time", content: entry.date },
    ];
    if (entry.image) {
      meta.push(
        { property: "og:image", content: `${SITE}${entry.image}` },
        { name: "twitter:image", content: `${SITE}${entry.image}` },
      );
    }
    return { meta };
  },
  component: JournalEntryPage,
});

function JournalEntryPage() {
  const { entry, content, older, newer } = Route.useLoaderData();
  const isPage = entry.type === "page";

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/journal"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Journal
      </Link>

      <article className="mx-auto mt-10 max-w-3xl">
        <header>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {isPage ? (
              "From the Rho Agenda blog"
            ) : (
              <time dateTime={entry.date}>{entry.dateLabel}</time>
            )}
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            {entry.title}
          </h1>
        </header>

        {content.featuredImage ? (
          <img
            src={content.featuredImage}
            alt=""
            className="mt-8 w-full rounded-xl border border-border object-cover"
          />
        ) : null}

        <div
          className="journal-content mt-8"
          // Sanitized with an allowlist when the archive was imported.
          dangerouslySetInnerHTML={{ __html: content.html }}
        />

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
          {isPage
            ? "Originally a page on the Rho Agenda blog (rhoagenda.me)."
            : `Originally published on the Rho Agenda blog (rhoagenda.me) on ${entry.dateLabel}.`}
        </p>

        {content.comments.length > 0 ? (
          <JournalComments
            comments={content.comments}
            count={entry.commentCount}
          />
        ) : null}
      </article>

      {older || newer ? (
        <nav
          aria-label="More posts"
          className="mx-auto mt-16 flex max-w-3xl flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between"
        >
          {older ? (
            <Button asChild variant="ghost" className="h-auto justify-start whitespace-normal py-2 text-left">
              <Link to="/journal/$slug" params={{ slug: older.slug }}>
                <ArrowLeft className="shrink-0" />
                <span>
                  <span className="block text-xs text-muted-foreground">Older</span>
                  {older.title}
                </span>
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {newer ? (
            <Button asChild variant="ghost" className="h-auto justify-end whitespace-normal py-2 text-right">
              <Link to="/journal/$slug" params={{ slug: newer.slug }}>
                <span>
                  <span className="block text-xs text-muted-foreground">Newer</span>
                  {newer.title}
                </span>
                <ArrowRight className="shrink-0" />
              </Link>
            </Button>
          ) : null}
        </nav>
      ) : null}
    </main>
  );
}
