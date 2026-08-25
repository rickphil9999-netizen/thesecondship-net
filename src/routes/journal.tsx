import { createFileRoute } from "@tanstack/react-router";
import { NEWS } from "@/data/news";
import { AUTHOR } from "@/data/books";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal")({
  component: JournalPage,
  head: () => ({
    meta: [
      { title: "Journal — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Launch notes, excerpts, and work-in-progress posts from Richard Phillips.",
      },
    ],
  }),
});

function JournalPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        In progress
      </p>
      <h1 className="mt-3 font-display text-5xl">Journal</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Draft excerpts, launch days, and the long work of the next book live on
        the Rho Agenda journal. Featured posts are collected here.
      </p>
      <Button asChild variant="outline" className="mt-6">
        <a href={AUTHOR.blog} target="_blank" rel="noreferrer">
          Open rhoagenda.me
        </a>
      </Button>

      <ol className="mt-12 flex flex-col gap-4">
        {NEWS.map((item) => (
          <li key={item.title}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-border bg-card p-6 hover:bg-muted"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {item.date}
              </p>
              <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {item.dek}
              </p>
            </a>
          </li>
        ))}
      </ol>
    </main>
  );
}
