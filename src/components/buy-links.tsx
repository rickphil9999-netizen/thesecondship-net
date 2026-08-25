import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { amazonDp } from "@/lib/utils";
import type { Book } from "@/data/books";
import { AUTHOR } from "@/data/books";

export function BuyLinks({
  book,
  size = "default",
}: {
  book: Book;
  size?: "default" | "lg" | "sm";
}) {
  if (book.status === "forthcoming" || !book.asin) {
    return (
      <Button asChild variant="secondary" size={size}>
        <Link to="/readers">Get notified</Link>
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size={size}>
        <a href={amazonDp(book.asin)} target="_blank" rel="noreferrer">
          Buy on Amazon
        </a>
      </Button>
      <Button asChild variant="outline" size={size}>
        <a href={AUTHOR.amazonAuthor} target="_blank" rel="noreferrer">
          All editions
        </a>
      </Button>
    </div>
  );
}
