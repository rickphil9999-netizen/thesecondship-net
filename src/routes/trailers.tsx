import { createFileRoute, Link } from "@tanstack/react-router";
import { TRAILERS } from "@/data/trailers";
import { getBook } from "@/data/books";

export const Route = createFileRoute("/trailers")({
  component: TrailersPage,
  head: () => ({
    meta: [
      { title: "Trailers — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Watch trailers for Once Dead, The Rho Agenda, and The Endarian Prophecy.",
      },
    ],
  }),
});

function TrailersPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Video
      </p>
      <h1 className="mt-3 font-display text-5xl">Trailers</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Three introductions: the assassin who would not stay dead, the crashed
        starship, and the fantasy epic.
      </p>

      <div className="mt-12 flex flex-col gap-16">
        {TRAILERS.map((t) => (
          <article key={t.id} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-border bg-muted">
              <div className="relative aspect-video">
                <iframe
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube-nocookie.com/embed/${t.youtubeId}`}
                  title={t.title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t.series}
              </p>
              <h2 className="font-display text-3xl">{t.title}</h2>
              <p className="leading-relaxed text-muted-foreground">{t.copy}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                {t.relatedSlugs.map((slug) => {
                  const book = getBook(slug);
                  if (!book) return null;
                  return (
                    <Link
                      key={slug}
                      to="/books/$slug"
                      params={{ slug }}
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      {book.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
