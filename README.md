# thesecondship.net

Author site for Richard Phillips — *The Rho Agenda*, *The Ripper’s Son*, and related series.

If you are putting this live, open **START-HERE.txt** and follow it in order. Domain stays at GoDaddy. Hosting moves to Vercel. Email records are not touched.

## After it is on GitHub

Vercel → Add New Project → Import this repository → Deploy. Then add `thesecondship.net` and `www.thesecondship.net` under Settings → Domains, and copy the two DNS records into GoDaddy (A for `@`, CNAME for `www`). Leave MX records alone.

## Blog archive (from rhoagenda.me)

Every post, page, and approved comment from the old WordPress.com blog at rhoagenda.me lives under `/blog`.

- `src/data/blog/entries.gen.ts` and `src/data/blog/content/*.json` are generated from the WordPress export (HTML sanitized at import). Edit the generator, not these files.
- Images are in `public/blog/media/`. The RSS feed is `public/blog/rss.xml`.
- The Blog used to live at `/journal`. Old `/journal` URLs 301 to their `/blog` equivalents on every host.
- `server/rhoagenda-redirects.gen.json` maps every old rhoagenda.me URL to its new page. Those rules only fire when the request Host is `rhoagenda.me` or `www.rhoagenda.me`.
- All of these are emitted as Vercel edge routes (see `vite.config.ts` and `server/redirects.ts`) with a Nitro middleware backstop in `server/middleware/`.
- To switch on the rhoagenda.me redirects: add `rhoagenda.me` and `www.rhoagenda.me` to this Vercel project, then point the domain's DNS at Vercel.
