import { cn } from "@/lib/utils";
import type { Book } from "@/data/books";

export function BookCover({
  book,
  className,
  sizes = "(max-width: 640px) 45vw, 240px",
}: {
  book: Book;
  className?: string;
  sizes?: string;
}) {
  if (!book.cover) {
    return (
      <div
        className={cn(
          "relative aspect-2/3 overflow-hidden rounded-sm bg-muted ring-1 ring-border",
          className,
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <p className="font-display text-xl leading-tight text-foreground">
            {book.title}
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Forthcoming
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-2/3 overflow-hidden rounded-sm bg-muted ring-1 ring-border",
        className,
      )}
    >
      <img
        src={book.cover}
        alt={`${book.title} cover`}
        sizes={sizes}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
