import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 font-display text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        That address is not a book, a series, or a page on this site.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to the books</Link>
      </Button>
    </main>
  );
}
