import { defineHandler } from "nitro/h3";
import { matchRhoagendaRedirect } from "../rhoagenda-redirects.ts";

// Backstop for the Vercel edge routes: 301 any rhoagenda.me request to its
// new home on thesecondship.net. Other hosts fall through untouched.
export default defineHandler((event) => {
  const host =
    event.req.headers.get("x-forwarded-host") ?? event.req.headers.get("host");
  const location = matchRhoagendaRedirect(
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
