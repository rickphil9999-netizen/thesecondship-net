import { defineHandler } from "nitro/h3";
import { matchRedirect } from "../redirects.ts";

// Backstop for the Vercel edge routes (see server/redirects.ts):
// rhoagenda.me requests and old /journal URLs get a 301 to /blog.
export default defineHandler((event) => {
  const host =
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host");
  const location = matchRedirect(
    host,
    event.url.pathname,
    event.url.searchParams,
  );
  if (!location) return;
  return new Response(null, {
    status: 301,
    headers: { Location: location, "Cache-Control": "public, max-age=3600" },
  });
});
