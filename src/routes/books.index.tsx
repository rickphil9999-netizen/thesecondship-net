import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { SERIES, booksInSeries } from "@/data/books";
import { BookCard } from "@/components/book-card";
import { cn } from "@/lib/utils";
import type { BooksSearch } from "@/data/books";

export const Route = createFileRoute("/books/")({
  component: BooksPage,
  head: () => ({
    meta: [
      { title: "Books — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "The complete catalog: Rho Agenda, Inception, Assimilation, Singularity, and the Endarian Prophecy.",
      },
    ],
  }),
});

function BooksPage() {
  const { series } = useSearch({ from: "/books" });

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Catalog
      </p>
      <h1 className="mt-3 font-display text-5xl">The books</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Five series. Sixteen novels. Spy-thrillers that open a crashed-starship
        saga, then a new Singularity trilogy — and a complete epic fantasy beside
        them.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterChip to="/books" search={{}} active={!series} label="All" />
        {SERIES.map((s) => (
          <FilterChip
            key={s.id}
            to="/books"
            search={{ series: s.id }}
            active={series === s.id}
            label={s.shortName}
          />
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-16">
        {(series ? SERIES.filter((s) => s.id === series) : SERIES).map((s) => {
          const books = booksInSeries(s.id);
          return (
            <section key={s.id}>
              <div className="mb-6 max-w-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.tag}
                </p>
                <h2 className="mt-1 font-display text-3xl">{s.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function FilterChip({
  to,
  search,
  active,
  label,
}: {
  to: "/books";
  search?: BooksSearch;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "inline-flex h-10 items-center rounded-full border px-4 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}
