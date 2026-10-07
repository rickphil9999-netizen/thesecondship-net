import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getBook } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Producer inquiries post straight to FormSubmit (no JS, no mail app),
// the same way the pre-migration Netlify /producers page did.
const INQUIRY_EMAIL = "Richard.Phillips@secondship.net";
const FORMSUBMIT_ACTION = `https://formsubmit.co/${INQUIRY_EMAIL}`;

const ARCS = [
  {
    n: "01",
    title: "Inception",
    copy: "Jack “The Ripper” Gregory dies and comes back wrong. A black-ops thriller that plants the alien seed.",
    slugs: ["once-dead", "dead-wrong", "dead-shift"],
  },
  {
    n: "02",
    title: "The Second Ship",
    copy: "Three New Mexico teenagers find what Los Alamos buried. First contact as an American conspiracy.",
    slugs: ["the-second-ship"],
  },
  {
    n: "03",
    title: "Escalation",
    copy: "The kids are no longer only human. Rho technology leaks. The war comes home.",
    slugs: ["immune", "wormhole"],
  },
  {
    n: "04",
    title: "Assimilation",
    copy: "Earth stops being the only theater. Kasari. Altreians. Humanity learns it was the battleground all along.",
    slugs: ["the-kasari-nexus", "the-altreian-enigma", "the-meridian-ascent"],
  },
  {
    n: "05",
    title: "Singularity",
    copy: "The next generation. Rob Gregory can command machines with his mind. The AI running Earth is afraid.",
    slugs: ["the-rippers-son"],
    trailing: "and the trilogy now underway",
  },
] as const;

const COMPARABLES = [
  {
    title: "Game of Thrones",
    copy: "Ensemble scope, shifting allegiances, no one stays clean.",
  },
  {
    title: "The Expanse",
    copy: "Politics in a hard-science universe, grounded and brutal.",
  },
  {
    title: "Stranger Things",
    copy: "Kids find the impossible. The government already knew.",
  },
  {
    title: "Bourne / Homeland",
    copy: "Jack Gregory’s tradecraft thread: assassins, handlers, cost.",
  },
] as const;

export const Route = createFileRoute("/producers")({
  component: ProducersPage,
  head: () => ({
    meta: [
      { title: "For Producers — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Explore The Rho Agenda as a potential screen adaptation: a nine-book core saga, an expanding ensemble, and a new generation.",
      },
    ],
  }),
});

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
      {children}
    </p>
  );
}

function BookList({ slugs }: { slugs: readonly string[] }) {
  return (
    <>
      {slugs.map((slug, i) => {
        const book = getBook(slug);
        if (!book) return null;
        return (
          <span key={slug}>
            {i > 0 ? " · " : null}
            <Link
              to="/books/$slug"
              params={{ slug }}
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              {book.title}
            </Link>
          </span>
        );
      })}
    </>
  );
}

function ProducersPage() {
  return (
    <main id="main">
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src="/images/producers-hero.jpg"
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover saturate-[0.6]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/70 to-background/35"
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <Eyebrow>For producers · Film &amp; television</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            The next great power struggle
            <br />
            <span className="italic text-paper">is already on Earth.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A completed science-fiction saga with the ensemble engine of
            prestige television, and an author who has actually sat in the
            rooms the story is about.
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#producer-inquiry">Discuss an adaptation</a>
          </Button>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>The logline</Eyebrow>
            <p className="mt-6 font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
              Two alien civilizations turn Earth into a battleground. Three
              teenagers find the ship that was never supposed to be found.
              Every alliance has a cost.
            </p>
          </div>
          <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground lg:pt-10">
            <p>
              Imagine the ensemble scope, political intrigue, and shifting
              allegiances of <em>Game of Thrones</em> in a science-fiction saga
              that begins in our own world, with a crashed starship, a
              concealed discovery, and competing alien agendas.
            </p>
            <p>
              Nine novels form the completed core saga. The Ripper’s Son brings
              the Rho universe to ten published novels and begins a new
              generation. Richard Phillips’ novels have sold more than one
              million copies. Orson Scott Card called Immune “as good as any
              science fiction being written today.”
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Eyebrow>Potential adaptation arcs</Eyebrow>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Start close. Go beyond Earth.
          </h2>
          <ol className="mt-10">
            {ARCS.map((arc) => (
              <li
                key={arc.n}
                className="grid gap-3 border-t border-border py-8 md:grid-cols-[5rem_1fr_16rem] md:items-start md:gap-6"
              >
                <span className="font-display text-3xl text-muted-foreground">
                  {arc.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl">{arc.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {arc.copy}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  <BookList slugs={arc.slugs} />
                  {"trailing" in arc ? ` · ${arc.trailing}` : null}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Eyebrow>Comparables</Eyebrow>
          <h2 className="mt-3 font-display text-4xl">In conversation with</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COMPARABLES.map((c) => (
              <article
                key={c.title}
                className="h-full rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>Why this author</Eyebrow>
            <h2 className="mt-3 font-display text-4xl">
              An author with firsthand expertise.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              West Point. Army Ranger. Master’s in physics with thesis work at
              Los Alamos. Research at Lawrence Livermore. Project leadership at
              GE, Hughes, Lockheed Martin, and General Dynamics.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Richard’s laboratory research, military service, and technology
              career give the story a foundation in lived experience, from
              scientific discovery to the human cost of command.
            </p>
          </div>
          <div>
            <Eyebrow>Why now</Eyebrow>
            <h2 className="mt-3 font-display text-4xl">
              AI. Great-power competition. First contact as politics.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The saga opens as a desert conspiracy and grows into a story
              about who gets to decide what humanity becomes. The Singularity
              books put a gifted son against the machine that already runs the
              world.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              It is timely without being topical. The engine is character,
              loyalty, and cost.
            </p>
          </div>
        </div>
      </section>

      <section id="producer-inquiry" className="scroll-mt-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Producer inquiries</Eyebrow>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Let’s discuss your adaptation.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Tell Richard who you are and what you have in mind for The Rho
              Agenda.
            </p>
          </div>
          <ProducerInquiryForm />
        </div>
      </section>
    </main>
  );
}

function ProducerInquiryForm() {
  return (
    <form
      action={FORMSUBMIT_ACTION}
      method="POST"
      target="_blank"
      rel="noopener"
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="producer-name">Your name</Label>
        <Input
          id="producer-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          maxLength={150}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="producer-email">Email address</Label>
        <Input
          id="producer-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="producer-company">Company or role (optional)</Label>
        <Input
          id="producer-company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={150}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="producer-phone">Phone number (optional)</Label>
        <Input
          id="producer-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={150}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="producer-message">What would you like to discuss?</Label>
        <Textarea
          id="producer-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
        />
      </div>
      <input
        type="hidden"
        name="_subject"
        value="The Rho Agenda - Film and Television Inquiry"
      />
      <input type="hidden" name="_template" value="table" />
      <Button type="submit" className="mt-2">
        Send inquiry
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Continue in a new tab to complete the secure submission. No email app
        is needed.
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        FormSubmit processes your contact details and message to email your
        inquiry to {INQUIRY_EMAIL}.
      </p>
    </form>
  );
}
