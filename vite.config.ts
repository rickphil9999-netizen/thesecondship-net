import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
import { redirectVercelRoutes } from "./server/redirects.ts";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: "vercel",
      // server/middleware/redirects.ts (backstop for the redirects below).
      serverDir: "./server",
      // Old rhoagenda.me URLs -> /blog (only when the Host is rhoagenda.me) and
      // old /journal URLs -> /blog. Prepended to the routes in
      // .vercel/output/config.json so they run at the edge. vercel.json
      // redirects are not applied to Build Output API deploys.
      vercel: { config: { version: 3, routes: redirectVercelRoutes() } },
      // Old Netlify-era URL. The beta-reader list now lives on /readers.
      // Nitro emits these as Vercel edge redirects in .vercel/output/config.json.
      routeRules: {
        "/beta-readers": { redirect: { to: "/readers", status: 301 } },
        "/beta-readers/": { redirect: { to: "/readers", status: 301 } },
        // Working title changed from "DSAI of Darkness" to "Unpunished" (Oct 2026).
        "/books/dsai-of-darkness": { redirect: { to: "/books/unpunished", status: 301 } },
        "/books/dsai-of-darkness/": { redirect: { to: "/books/unpunished", status: 301 } },
      },
    }),
    viteReact(),
  ],
});
