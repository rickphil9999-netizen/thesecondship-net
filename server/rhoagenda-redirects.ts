// Host-based 301s for the retired WordPress.com blog at rhoagenda.me.
//
// The rule list is generated from the WordPress export
// (server/rhoagenda-redirects.gen.json). It is applied in two places:
//  1. As Vercel Build Output routes (see vite.config.ts), which run at the
//     edge before the filesystem and the server function.
//  2. As a Nitro middleware (server/middleware/rhoagenda-redirect.ts), a
//     backstop that also makes the rules testable with `vite preview`.
// Both only fire when the Host is rhoagenda.me or www.rhoagenda.me, so
// thesecondship.net requests are never affected.
import rules from "./rhoagenda-redirects.gen.json" with { type: "json" };

export const RHOAGENDA_TARGET = "https://thesecondship.net";
export const RHOAGENDA_HOSTS = ["rhoagenda.me", "www.rhoagenda.me"];
const HOST_PATTERN = "(?:www\\.)?rhoagenda\\.me";

export type RhoagendaRule = {
  src: string;
  to: string;
  query?: { key: string; value: string };
};

export const RHOAGENDA_RULES = rules as RhoagendaRule[];

/** Vercel Build Output API routes (config.json), prepended before Nitro's own. */
export function rhoagendaVercelRoutes() {
  return RHOAGENDA_RULES.map((r) => ({
    src: r.src,
    has: [
      { type: "host", value: HOST_PATTERN },
      ...(r.query
        ? [{ type: "query", key: r.query.key, value: r.query.value }]
        : []),
    ],
    status: 301,
    headers: { Location: RHOAGENDA_TARGET + r.to },
  }));
}

const COMPILED = RHOAGENDA_RULES.map((r) => ({ ...r, re: new RegExp(r.src) }));

/** Returns the absolute Location for a rhoagenda.me request, or null. */
export function matchRhoagendaRedirect(
  host: string | null | undefined,
  pathname: string,
  searchParams: URLSearchParams,
): string | null {
  const h = (host ?? "").toLowerCase().replace(/:\d+$/, "");
  if (!RHOAGENDA_HOSTS.includes(h)) return null;
  let path = pathname;
  try {
    path = decodeURI(pathname);
  } catch {
    // keep raw path
  }
  for (const r of COMPILED) {
    if (r.query && searchParams.get(r.query.key) !== r.query.value) continue;
    const m = r.re.exec(path);
    if (!m) continue;
    return (
      RHOAGENDA_TARGET + r.to.replace(/\$(\d)/g, (_, i) => m[Number(i)] ?? "")
    );
  }
  return null;
}
