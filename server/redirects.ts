// Redirects for retired URLs, applied in two places:
//  1. As Vercel Build Output routes (see vite.config.ts), which run at the
//     edge before the filesystem and the server function.
//  2. As a Nitro middleware (server/middleware/redirects.ts), a backstop
//     that also makes the rules testable with `vite preview`.
//
// Two rule sets:
//  - rhoagenda.me: generated from the WordPress export
//    (server/rhoagenda-redirects.gen.json). Only fires when the Host is
//    rhoagenda.me or www.rhoagenda.me, and always lands on
//    https://thesecondship.net/blog/... in a single hop.
//  - /journal: the Blog used to live at /journal. Any host, same-host
//    relative Location, single hop to /blog.
import rules from "./rhoagenda-redirects.gen.json" with { type: "json" };

export const RHOAGENDA_TARGET = "https://thesecondship.net";
export const RHOAGENDA_HOSTS = ["rhoagenda.me", "www.rhoagenda.me"];
const HOST_PATTERN = "(?:www\\.)?rhoagenda\\.me";

export type RedirectRule = {
  src: string;
  to: string;
  query?: { key: string; value: string };
};

export const RHOAGENDA_RULES = rules as RedirectRule[];

export const JOURNAL_RULES: RedirectRule[] = [
  { src: "^/journal/?$", to: "/blog" },
  { src: "^/journal/rss\\.xml$", to: "/blog/rss.xml" },
  { src: "^/journal/media/(.+)$", to: "/blog/media/$1" },
  { src: "^/journal/([^/]+?)/?$", to: "/blog/$1" },
];

/** Vercel Build Output API routes (config.json), prepended before Nitro's own. */
export function redirectVercelRoutes() {
  const hostRoutes = RHOAGENDA_RULES.map((r) => ({
    src: r.src,
    has: [
      { type: "host" as const, value: HOST_PATTERN },
      ...(r.query
        ? [{ type: "query" as const, key: r.query.key, value: r.query.value }]
        : []),
    ],
    status: 301,
    headers: { Location: RHOAGENDA_TARGET + r.to },
  }));
  const journalRoutes = JOURNAL_RULES.map((r) => ({
    src: r.src,
    status: 301,
    headers: { Location: r.to },
  }));
  return [...hostRoutes, ...journalRoutes];
}

const compile = (list: RedirectRule[]) =>
  list.map((r) => ({ ...r, re: new RegExp(r.src) }));
const HOST_COMPILED = compile(RHOAGENDA_RULES);
const JOURNAL_COMPILED = compile(JOURNAL_RULES);

function apply(
  list: ReturnType<typeof compile>,
  path: string,
  searchParams: URLSearchParams,
): string | null {
  for (const r of list) {
    if (r.query && searchParams.get(r.query.key) !== r.query.value) continue;
    const m = r.re.exec(path);
    if (!m) continue;
    return r.to.replace(/\$(\d)/g, (_, i) => m[Number(i)] ?? "");
  }
  return null;
}

/** Returns the Location for a request that should be redirected, or null. */
export function matchRedirect(
  host: string | null | undefined,
  pathname: string,
  searchParams: URLSearchParams,
): string | null {
  let path = pathname;
  try {
    path = decodeURI(pathname);
  } catch {
    // keep raw path
  }
  const h = (host ?? "").toLowerCase().replace(/:\d+$/, "");
  if (RHOAGENDA_HOSTS.includes(h)) {
    const to = apply(HOST_COMPILED, path, searchParams);
    return to ? RHOAGENDA_TARGET + to : null;
  }
  return apply(JOURNAL_COMPILED, path, searchParams);
}
