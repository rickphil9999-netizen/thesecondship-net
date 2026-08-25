import { createFileRoute, Link } from "@tanstack/react-router";
import {
  READING_ORDER_FANTASY,
  READING_ORDER_FULL,
  READING_ORDER_SCIFI,
  getBook,
} from "@/data/books";
import { BookCover } from "@/components/book-cover";

export const Route = createFileRoute("/reading-order")({
  component: ReadingOrderPage,
  head: () => ({
    meta: [
      { title: "Reading order — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "How to read the Rho Agenda: full saga from Once Dead, straight science fiction from The Second Ship, or the Endarian Prophecy epic.",
      },
    ],
  }),
});

function ReadingOrderPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Paths
      </p>
      <h1 className="mt-3 font-display text-5xl">Reading order</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        There is more than one correct door. The spy-thrillers explain who Jack
        Gregory is before the crashed ships. You can also drop into The Second
        Ship and never look back. Fantasy is a complete six-book epic of its
        own.
      </p>

      <div className="mt-14 flex flex-col gap-16">
        <Path
          kicker="Recommended"
          title="The full Rho saga"
          copy="Inception, then the original trilogy, then Assimilation, then Singularity. This is the order Richard recommends if you want every knife in the drawer."
          slugs={READING_ORDER_FULL}
        />
        <Path
          kicker="Straight science fiction"
          title="Start with the second ship"
          copy="Skip the spy-thrillers. Three teenagers, a cavern, an AI, and everything that follows — including The Ripper’s Son."
          slugs={READING_ORDER_SCIFI}
        />
        <Path
          kicker="Fantasy"
          title="The Endarian Prophecy"
          copy="A finished epic. Begin at Mark of Fire and read through Prophecy’s End."
          slugs={READING_ORDER_FANTASY}
        />
      </div>
    </main>
  );
}

function Path({
  kicker,
  title,
  copy,
  slugs,
}: {
  kicker: string;
  title: string;
  copy: string;
  slugs: string[];
}) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {copy}
      </p>
      <ol className="mt-8 flex flex-col gap-3">
        {slugs.map((slug, i) => {
          const book = getBook(slug);
          if (!book) return null;
          return (
            <li key={slug}>
              <Link
                to="/books/$slug"
                params={{ slug: book.slug }}
                className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 hover:bg-muted"
              >
                <span className="w-8 text-center font-display text-xl text-muted-foreground">
                  {i + 1}
                </span>
                <div className="w-12 shrink-0">
                  <BookCover book={book} sizes="48px" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-lg leading-tight">
                    {book.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {book.seriesLabel} · {book.year}
                    {book.status === "forthcoming" ? " · Forthcoming" : ""}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
