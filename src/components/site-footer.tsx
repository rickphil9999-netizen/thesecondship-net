import { Link } from "@tanstack/react-router";
import { AUTHOR } from "@/data/books";

const FOOTER_NAV = [
  { to: "/books", label: "Books" },
  { to: "/reading-order", label: "Reading order" },
  { to: "/trailers", label: "Trailers" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/readers", label: "Readers’ list" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <p className="font-display text-2xl">Richard Phillips</p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {AUTHOR.tagline}. {AUTHOR.company}.
          </p>
          <a
            href={AUTHOR.mailto}
            className="text-sm text-foreground underline-offset-4 hover:underline"
          >
            {AUTHOR.email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            On this site
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {FOOTER_NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-foreground/90 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href={AUTHOR.amazonAuthor} target="_blank" rel="noreferrer">
                Amazon author page
              </a>
            </li>
            <li>
              <a href={AUTHOR.blog} target="_blank" rel="noreferrer">
                Rho Agenda journal
              </a>
            </li>
            <li>
              <a href={AUTHOR.x} target="_blank" rel="noreferrer">
                X / @RhoAgenda
              </a>
            </li>
            <li>
              <a href={AUTHOR.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href={AUTHOR.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={AUTHOR.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © 2026 {AUTHOR.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
