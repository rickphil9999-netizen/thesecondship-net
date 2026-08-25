import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AUTHOR } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "rp-readers-list";

export const Route = createFileRoute("/readers")({
  component: ReadersPage,
  head: () => ({
    meta: [
      { title: "Readers — Richard Phillips Novels" },
      {
        name: "description",
        content:
          "Join Richard Phillips’ readers’ list for launch notes, or request a place on the beta reader list for early drafts.",
      },
    ],
  }),
});

function ReadersPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
        Stay close
      </p>
      <h1 className="mt-3 font-display text-5xl">Readers’ lists</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Two lists. The readers’ list is for new books and the occasional deal.
        Beta readers see unfinished drafts and can leave whenever they like.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <ReadersForm />
        <BetaForm />
      </div>
    </main>
  );
}

function ReadersForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const entry = { name, email, list: "readers", at: new Date().toISOString() };
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...prev, entry]));
    const subject = encodeURIComponent("Readers’ list");
    const body = encodeURIComponent(
      `Please add me to the readers’ list.\n\nName: ${name}\nEmail: ${email}`,
    );
    window.location.href = `${AUTHOR.mailto}?subject=${subject}&body=${body}`;
    toast.success("Opening a message to Richard. You can send it from your mail app.");
    setEmail("");
    setName("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <h2 className="font-display text-3xl">Readers’ list</h2>
      <p className="text-sm text-muted-foreground">
        Launch notes. No weekly newsletter. Unsubscribe any time by writing
        Richard at {AUTHOR.email}.
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="r-name">Name</Label>
        <Input
          id="r-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="r-email">Email</Label>
        <Input
          id="r-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <Button type="submit" className="mt-2">
        Join the readers’ list
      </Button>
    </form>
  );
}

function BetaForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const entry = {
      name,
      email,
      note,
      list: "beta",
      at: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...prev, entry]));
    const subject = encodeURIComponent("Beta reader request");
    const body = encodeURIComponent(
      `Please add me to the beta readers list.\n\nName: ${name}\nEmail: ${email}\n\n${note}`,
    );
    window.location.href = `${AUTHOR.mailto}?subject=${subject}&body=${body}`;
    toast.success("Opening a request to Richard. Send it from your mail app.");
    setEmail("");
    setName("");
    setNote("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <h2 className="font-display text-3xl">Beta readers</h2>
      <p className="text-sm text-muted-foreground">
        Early drafts of novels in progress — including DSAI of Darkness. Honest
        notes welcome. Leave the list whenever you like.
      </p>
      <div className="flex flex-col gap-2">
        <Label htmlFor="b-name">Name</Label>
        <Input
          id="b-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="b-email">Email</Label>
        <Input
          id="b-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="b-note">Why you’re a good fit (optional)</Label>
        <Textarea
          id="b-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Which series you know, how you read, anything useful."
        />
      </div>
      <Button type="submit" variant="secondary" className="mt-2">
        Request a place
      </Button>
    </form>
  );
}
