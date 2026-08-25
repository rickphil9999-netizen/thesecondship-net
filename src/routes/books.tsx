import { Outlet, createFileRoute } from "@tanstack/react-router";

const SERIES_IDS = [
  "inception",
  "rho",
  "assimilation",
  "singularity",
  "endarian",
] as const;

type SeriesId = (typeof SERIES_IDS)[number];
export type BooksSearch = { series?: SeriesId };

export const Route = createFileRoute("/books")({
  validateSearch: (search: Record<string, unknown>): BooksSearch => {
    const raw = search.series;
    if (typeof raw === "string" && (SERIES_IDS as readonly string[]).includes(raw)) {
      return { series: raw as SeriesId };
    }
    return {};
  },
  component: BooksLayout,
});

function BooksLayout() {
  return <Outlet />;
}
