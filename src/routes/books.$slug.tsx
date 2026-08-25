import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getBook, getSeries, neighbors } from "@/data/books";
import { BookCover } from "@/components/book-cover";
import { BuyLinks } from "@/components/buy-links";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.book.title ?? "Book"} — Richard Phillips Novels`,
      },
      {
        name: "description",
        content: loaderData?.book.blurb.slice(0, 160) ?? "",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();
  const series = getSeries(book.seriesId);
  const { prev, next } = neighbors(book.slug);

  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/books"
        search={{ series: book.seriesId }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> {series?.name}
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
        <BookCover book={book} sizes="280px" />
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>
              {series?.shortName} · Book {book.bookNumber}
            </Badge>
            <span className="text-sm text-muted-foreground">{book.year}</span>
            {book.status === "forthcoming" ? (
              <Badge variant="outline">Forthcoming</Badge>
            ) : null}
          </div>
          <h1 className="font-display text-5xl leading-none">{book.title}</h1>
          <p className="max-w-xl text-lg text-muted-foreground">{book.hook}</p>
          <p className="max-w-2xl leading-relaxed text-foreground/90">
            {book.blurb}
          </p>
          {book.pages ? (
            <p className="text-sm text-muted-foreground">{book.pages} pages</p>
          ) : null}
          <BuyLinks book={book} size="lg" />
        </div>
      </div>

      <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-border pt-8">
        {prev ? (
          <Button asChild variant="ghost">
            <Link to="/books/$slug" params={{ slug: prev.slug }}>
              <ArrowLeft /> {prev.title}
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button asChild variant="ghost">
            <Link to="/books/$slug" params={{ slug: next.slug }}>
              {next.title} <ArrowRight />
            </Link>
          </Button>
        ) : null}
      </div>
    </main>
  );
}
