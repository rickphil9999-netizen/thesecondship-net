import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    nitro({
      preset: "vercel",
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
