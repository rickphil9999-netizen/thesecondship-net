import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AUTHOR } from "@/data/books";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/books", label: "Books" },
  { to: "/reading-order", label: "Reading order" },
  { to: "/trailers", label: "Trailers" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/readers", label: "Readers" },
] as const;

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        aria-hidden
        className="flex size-8 items-center justify-center border border-border text-foreground"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none">
          <path
            d="M4 16 L12 8 L20 16"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M7 16 L12 11 L17 16"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-tight">
          Richard Phillips
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Novels
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Wordmark onClick={() => setOpen(false)} />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => {
            const active =
              pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild size="sm">
            <a href={AUTHOR.amazonAuthor} target="_blank" rel="noreferrer">
              Order books
            </a>
          </Button>
        </nav>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center text-base text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <a href={AUTHOR.amazonAuthor} target="_blank" rel="noreferrer">
                Order books
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
