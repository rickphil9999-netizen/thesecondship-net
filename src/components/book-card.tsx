import { Link } from "@tanstack/react-router";
import type { Book } from "@/data/books";
import { BookCover } from "@/components/book-cover";
import { Badge } from "@/components/ui/badge";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to="/books/$slug"
      params={{ slug: book.slug }}
      className="group flex flex-col gap-3 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="overflow-hidden rounded-sm">
        <BookCover
          book={book}
          className="transition-transform duration-250 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-col gap-1 px-0.5">
        <div className="flex items-center gap-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Book {book.bookNumber}
          </p>
          {book.status === "forthcoming" ? (
            <Badge variant="outline">Forthcoming</Badge>
          ) : null}
        </div>
        <h3 className="font-display text-xl leading-snug text-foreground">
          {book.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {book.hook}
        </p>
      </div>
    </Link>
  );
}
