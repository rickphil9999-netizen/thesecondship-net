import { createFileRoute, Link } from "@tanstack/react-router";
import { AUTHOR } from "@/data/books";
import { AUTHOR_VIDEO_ID } from "@/data/trailers";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Richard Phillips is the million-copy bestselling author of The Rho Agenda. West Point. Army Ranger. Physicist. Novelist.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        The author
      </p>
      <h1 className="mt-3 font-display text-5xl">Richard Phillips</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-start">
        <div className="flex flex-col gap-4">
          <img
            src="/images/author.jpg"
            alt="Richard Phillips"
            className="w-full rounded-xl border border-border object-cover"
          />
          <img
            src="/images/bio.jpg"
            alt="Richard and Carol Phillips"
            className="w-full rounded-xl border border-border object-cover"
          />
          <p className="text-xs text-muted-foreground">
            With Carol, his wife of 45 years.
          </p>
        </div>

        <div className="flex max-w-2xl flex-col gap-5 text-[1.05rem] leading-relaxed text-foreground/90">
          <p>
            Richard Phillips is the author of sixteen science fiction and fantasy
            novels across five series: The Rho Agenda Inception (Once Dead, Dead
            Wrong, Dead Shift); The Rho Agenda (The Second Ship, Immune, and
            Wormhole); The Rho Agenda Assimilation (The Kasari Nexus, The
            Altreian Enigma, and The Meridian Ascent); The Rho Agenda
            Singularity (The Ripper’s Son, with DSAI of Darkness in progress);
            and The Endarian Prophecy (Mark of Fire through Prophecy’s End).
          </p>
          <p>
            He was born in Roswell, New Mexico, in 1956, and graduated from the
            United States Military Academy at West Point in 1979. He qualified
            as a U.S. Army Ranger and served as an officer in the Army. He
            earned a master’s degree in physics from the Naval Postgraduate
            School in 1989, completing his thesis work at Los Alamos National
            Laboratory. After a research associateship at Lawrence Livermore
            National Laboratory, he returned to the Army to finish his tour of
            duty.
          </p>
          <p>
            Later he was a project manager and senior software developer at
            General Electric, Hughes Aircraft, Lockheed Martin Space Operations,
            and General Dynamics. He retired in 2013 to write full-time. Richard
            lives with Carol, his wife of 45 years, in Georgetown, Texas.
          </p>
          <p className="text-muted-foreground">
            The books have sold more than a million copies. Orson Scott Card
            wrote that the science, the action, and the politics of the Rho
            Agenda are all exactly right — “as good as any science fiction being
            written today.”
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link to="/books">The books</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact</Link>
            </Button>
            <Button asChild variant="ghost">
              <a href={AUTHOR.blog} target="_blank" rel="noreferrer">
                Journal
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden rounded-xl border border-border bg-muted">
        <div className="relative aspect-video max-h-[480px]">
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${AUTHOR_VIDEO_ID}`}
            title="Richard Phillips"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}
