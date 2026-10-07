# thesecondship.net

Author site for Richard Phillips — *The Rho Agenda*, *The Ripper’s Son*, and related series.

If you are putting this live, open **START-HERE.txt** and follow it in order. Domain stays at GoDaddy. Hosting moves to Vercel. Email records are not touched.

## After it is on GitHub

Vercel → Add New Project → Import this repository → Deploy. Then add `thesecondship.net` and `www.thesecondship.net` under Settings → Domains, and copy the two DNS records into GoDaddy (A for `@`, CNAME for `www`). Leave MX records alone.

## Journal archive (from rhoagenda.me)

Every post, page, and approved comment from the old WordPress.com blog at rhoagenda.me lives under `/journal`.

- `src/data/journal/entries.gen.ts` and `src/data/journal/content/*.json` are generated from the WordPress export (HTML sanitized at import). Edit the generator, not these files.
- Images are in `public/journal/media/`. The RSS feed is `public/journal/rss.xml`.
- `server/rhoagenda-redirects.gen.json` maps every old rhoagenda.me URL to its new page. The rules only fire when the request Host is `rhoagenda.me` or `www.rhoagenda.me`. They are emitted as Vercel edge routes (see `vite.config.ts`) with a Nitro middleware backstop in `server/middleware/`.
- To switch them on: add `rhoagenda.me` and `www.rhoagenda.me` to this Vercel project, then point the domain's DNS at Vercel.
