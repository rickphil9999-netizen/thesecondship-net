import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  AUTHOR,
  BOOKS,
  FEATURED_SLUG,
  SERIES,
  START_HERE_SLUGS,
  getBook,
} from "@/data/books";
import { NEWS } from "@/data/news";
import { BookCover } from "@/components/book-cover";
import { BookCard } from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { BuyLinks } from "@/components/buy-links";
import { ReadersSignup } from "@/components/readers-signup";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const featured = getBook(FEATURED_SLUG)!;
  const startHere = START_HERE_SLUGS.map((s) => getBook(s)!);

  return (
    <main id="main">
      <section className="border-b border-border bg-black">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <Link
            to="/books/$slug"
            params={{ slug: "unpunished" }}
            className="mx-auto w-full max-w-xs overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Unpunished, first look"
          >
            <video
              className="aspect-[9/16] w-full object-cover"
              src="/video/unpunished-first-look-loop.mp4"
              poster="/video/unpunished-first-look-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </Link>
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Coming next · First look
            </p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Unpunished
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              The storm has a name. Book Two of the Rho Agenda Singularity and
              the sequel to The Ripper’s Son. Richard is writing it now and aims
              to finish by the new year.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/books/$slug" params={{ slug: "unpunished" }}>
                  See what’s coming <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/trailers">Watch the trailer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div className="flex flex-col gap-6">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Out now · May 2025
            </p>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl">
              The Ripper’s Son
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {AUTHOR.tagline}. A perfect world. A lethal secret. Rob Gregory
              lights the fuse — Book One of the Rho Agenda Singularity.
            </p>
            <BuyLinks book={featured} size="lg" />
            <p className="text-sm text-muted-foreground">
              New to the saga?{" "}
              <Link to="/reading-order" className="text-foreground underline-offset-4 hover:underline">
                Start here
              </Link>
              .
            </p>
          </div>
          <Link
            to="/books/$slug"
            params={{ slug: featured.slug }}
            className="mx-auto w-full max-w-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BookCover book={featured} sizes="320px" />
          </Link>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Orson Scott Card on Immune
          </p>
          <blockquote className="mt-6 font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
            “Richard Phillips has led such a life that he absolutely nails the
            science aspect of this new sci-fi classic — and yet also gets the
            action and the political aspects exactly right as well… as good as
            any science fiction being written today.”
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            — Orson Scott Card, on Immune (The Rho Agenda, Book Two)
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Three doors in
              </p>
              <h2 className="mt-3 font-display text-4xl">Where to start</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/reading-order">
                Full order <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {startHere.map((book, i) => (
              <div key={book.slug} className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {i === 0
                    ? "The spy door"
                    : i === 1
                      ? "The crashed ship"
                      : "The fantasy door"}
                </p>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Sixteen novels
              </p>
              <h2 className="mt-3 font-display text-4xl">The series</h2>
            </div>
            <Button asChild variant="ghost">
              <Link to="/books">
                All books <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SERIES.map((series) => {
              const count = BOOKS.filter((b) => b.seriesId === series.id).length;
              return (
                <Link
                  key={series.id}
                  to="/books"
                  search={{ series: series.id }}
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {series.tag} · {count} books
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{series.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {series.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
          {[
            ["1M+", "Copies sold"],
            ["West Point", "USMA 1979 · Ranger"],
            ["Physics", "M.S. · Los Alamos · Livermore"],
            ["16", "Novels across five series"],
          ].map(([k, v]) => (
            <div key={v}>
              <p className="font-display text-3xl">{k}</p>
              <p className="mt-1 text-sm text-muted-foreground">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-4xl">From the blog</h2>
            <Button asChild variant="ghost">
              <Link to="/blog">
                All posts <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {NEWS.map((item) => (
              <Link
                key={item.slug}
                to="/blog/$slug"
                params={{ slug: item.slug }}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 hover:bg-muted"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="font-display text-xl leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.dek}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <ReadersSignup />
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-16 sm:px-6">
          <h2 className="font-display text-4xl">Read early. Write back.</h2>
          <p className="max-w-xl text-muted-foreground">
            Beta readers see drafts before anyone else. The readers’ list gets
            launch notes and the occasional deal — nothing else.
          </p>
          <Button asChild size="lg">
            <Link to="/readers">Join the lists</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
